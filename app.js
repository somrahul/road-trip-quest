(() => {
  'use strict';

  const D = window.RTQ_DATA;
  const app = document.getElementById('app');

  // ---------- Storage (never required; the game works without it) ----------
  const store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(`rtq.${key}`);
        return v == null ? fallback : JSON.parse(v);
      } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(`rtq.${key}`, JSON.stringify(value)); } catch { /* ignore */ }
    },
  };

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const KIDS = {
    little: { icon: '🐣', label: 'Little Explorer' },
    big: { icon: '🦁', label: 'Big Explorer' },
  };
  const names = store.get('names', { little: '', big: '' });
  let voiceOn = store.get('voice', true);
  const nameOf = (who) => (names[who] || '').trim() || KIDS[who].label;

  // ---------- Read aloud ----------
  const synth = window.speechSynthesis;
  let voice = null;
  function pickVoice() {
    const voices = synth.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
    voice = voices.find((v) => /Samantha|Google US English|Aria|Jenny|Ava/i.test(v.name))
      || voices.find((v) => /en[-_]US/i.test(v.lang))
      || voices[0] || null;
  }
  if (synth) {
    pickVoice();
    synth.addEventListener?.('voiceschanged', pickVoice);
  }
  // Emoji get read out by name ("red circle"), so strip them before speaking.
  const forSpeech = (t) => t.replace(/\p{Extended_Pictographic}|️|‍/gu, '').replace(/\s+/g, ' ').trim();
  function speak(text) {
    if (!voiceOn || !synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(forSpeech(text));
    if (voice) u.voice = voice;
    u.lang = voice ? voice.lang : 'en-US';
    u.rate = 0.95;
    u.pitch = 1.1;
    synth.speak(u);
  }

  // ---------- Keep the screen on while playing ----------
  let wakeLock = null;
  async function keepAwake(on) {
    try {
      if (on && !wakeLock && 'wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => { wakeLock = null; });
      } else if (!on && wakeLock) {
        await wakeLock.release();
        wakeLock = null;
      }
    } catch { /* not supported or denied */ }
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && game && !game.done) keepAwake(true);
  });

  // ---------- Building a round ----------
  // Prefer items we haven't played recently; once a pool is used up, start it over.
  function pick(pool, n) {
    const seen = new Set(store.get('seen', []));
    let chosen = shuffle(pool.filter((x) => !seen.has(x.id))).slice(0, n);
    if (chosen.length < n) {
      pool.forEach((x) => seen.delete(x.id));
      const rest = shuffle(pool.filter((x) => !chosen.includes(x)));
      chosen = chosen.concat(rest.slice(0, n - chosen.length));
    }
    chosen.forEach((x) => seen.add(x.id));
    store.set('seen', [...seen]);
    return chosen;
  }

  const topicById = Object.fromEntries(D.topics.map((t) => [t.id, t]));
  const topicOfCard = (card) => topicById[card.id.split('-')[0]];

  const QUICK = {
    spot: { name: 'Spot It!', emoji: '👀', color: '#2A9D8F' },
    guess: { name: 'Guess Who?', emoji: '🐾', color: '#E5487A' },
    wyr: { name: 'Would You Rather', emoji: '🤔', color: '#8338EC' },
  };

  function buildDeck(mode) {
    if (mode === 'spot') return pick(D.spot, 8).map((x) => ({ type: 'spot', ...x }));
    if (mode === 'guess') return pick(D.guess, 6).map((x) => ({ type: 'guess', ...x }));
    if (mode === 'wyr') return pick(D.wyr, 8).map((x) => ({ type: 'wyr', ...x }));

    const pool = mode === 'mix' ? D.topics.flatMap((t) => t.cards) : topicById[mode].cards;
    const cards = pick(pool, 6).map((card) => ({ type: 'card', card, topic: topicOfCard(card) }));
    const extras = shuffle([
      { type: 'spot', ...pick(D.spot, 1)[0] },
      { type: 'guess', ...pick(D.guess, 1)[0] },
      { type: 'wyr', ...pick(D.wyr, 1)[0] },
    ]);
    // Two topic cards, then a break from the topic, and so on.
    const deck = [];
    cards.forEach((c, i) => {
      deck.push(c);
      if (i % 2 === 1) deck.push(extras.shift());
    });
    return deck;
  }

  function stepsFor(item, cardNo) {
    const base = { cardNo };
    switch (item.type) {
      case 'card': {
        const { card, topic } = item;
        return [
          { ...base, kind: 'q', who: 'little', topic, ...card.little },
          { ...base, kind: 'q', who: 'big', topic, ...card.big },
          { ...base, kind: 'talk', topic, q: card.talk },
        ];
      }
      case 'spot':
        return [
          { ...base, kind: 'spot', who: 'little', q: item.little },
          { ...base, kind: 'spot', who: 'big', q: item.big },
        ];
      case 'guess':
        return [{ ...base, kind: 'guess', clues: item.clues, a: item.a }];
      default:
        return [{ ...base, kind: 'wyr', q: item.q }];
    }
  }

  // ---------- Game state ----------
  let game = null;
  let lastRendered = -1;

  function startGame(mode) {
    const deck = buildDeck(mode);
    game = {
      mode,
      total: deck.length,
      steps: deck.flatMap((item, i) => stepsFor(item, i + 1)),
      i: 0,
      revealed: false,
      clue: 1,
      picked: null,
      stars: { little: 0, big: 0 },
      awarded: new Set(),
      done: false,
    };
    lastRendered = -1;
    keepAwake(true);
    renderStep();
    speakStep();
  }

  const step = () => game.steps[game.i];

  function speakStep() {
    const s = step();
    switch (s.kind) {
      case 'q': return speak(`${nameOf(s.who)}, ${s.q}`);
      case 'talk': return speak(`Family talk! ${s.q}`);
      case 'spot': return speak(`${nameOf(s.who)}, spot it! ${s.q}`);
      case 'guess': return speak(`Guess who I am! Clue ${game.clue}: ${s.clues[game.clue - 1]}`);
      default: return speak(`Would you rather ${s.q}`);
    }
  }

  function next() {
    if (game.i >= game.steps.length - 1) return finish();
    game.i += 1;
    game.revealed = false;
    game.clue = 1;
    game.picked = null;
    renderStep();
    speakStep();
  }

  function finish() {
    game.done = true;
    keepAwake(false);
    renderEnd();
    const { little, big } = game.stars;
    speak(`Quest complete! ${nameOf('little')} earned ${little} ${little === 1 ? 'star' : 'stars'}, and ${nameOf('big')} earned ${big} ${big === 1 ? 'star' : 'stars'}. Great job, team!`);
    confetti(30);
  }

  function toggleStar(who) {
    const key = `${game.i}:${who}`;
    if (game.awarded.has(key)) {
      game.awarded.delete(key);
      game.stars[who] -= 1;
    } else {
      game.awarded.add(key);
      game.stars[who] += 1;
      speak(`${nameOf(who)} gets a star!`);
      confetti(12);
    }
    renderStep();
    const score = document.querySelector(`.score.${who}`);
    score?.classList.add('pop');
  }

  // ---------- Rendering ----------
  function renderHome() {
    game = null;
    keepAwake(false);
    const tile = (mode, t) => `
      <button class="tile" style="--tile:${t.color}" data-action="start" data-mode="${mode}">
        <span class="tile-emoji">${t.emoji}</span><span class="tile-name">${esc(t.name)}</span>
      </button>`;
    app.innerHTML = `
      <header class="hero">
        <div class="hero-car" aria-hidden="true">🚗<span>💨</span></div>
        <h1>Road Trip Quest</h1>
        <p>Learn, laugh, and spot things on the road!</p>
      </header>

      <section class="players" aria-label="Players">
        ${['little', 'big'].map((who) => `
          <label class="player ${who}">
            <span class="player-icon">${KIDS[who].icon}</span>
            <span class="player-field">
              <span class="player-label">${KIDS[who].label}</span>
              <input data-name="${who}" value="${esc(names[who] || '')}" placeholder="Name" autocomplete="off" enterkeyhint="done">
            </span>
          </label>`).join('')}
      </section>

      <h2 class="section-title">Pick a topic</h2>
      <div class="tiles">
        ${tile('mix', { name: 'Surprise Mix', emoji: '🎲', color: '#FFB703' })}
        ${D.topics.map((t) => tile(t.id, t)).join('')}
      </div>

      <h2 class="section-title">Quick games</h2>
      <div class="tiles">
        ${Object.entries(QUICK).map(([mode, t]) => tile(mode, t)).join('')}
      </div>

      <div class="home-footer">
        <button class="pill" data-action="voice" aria-pressed="${voiceOn}">
          ${voiceOn ? '🔊 Read aloud: On' : '🔇 Read aloud: Off'}
        </button>
        <p class="tip">The passenger holds the phone. Grown-ups can play too!</p>
      </div>`;
  }

  const kindClass = (s) => `kind-${s.kind}${s.who ? ` who-${s.who}` : ''}`;

  function chipFor(s) {
    switch (s.kind) {
      case 'q': return `${KIDS[s.who].icon} ${esc(nameOf(s.who))}'s turn <span class="chip-sub">${s.topic.emoji} ${esc(s.topic.name)}</span>`;
      case 'talk': return `💬 Family Talk <span class="chip-sub">Everyone answers</span>`;
      case 'spot': return `👀 Spot It! <span class="chip-sub">${KIDS[s.who].icon} ${esc(nameOf(s.who))}</span>`;
      case 'guess': return `🐾 Guess Who? <span class="chip-sub">Shout it out!</span>`;
      default: return `🤔 Would You Rather <span class="chip-sub">Everyone answers</span>`;
    }
  }

  const starBtn = (who, label) => {
    const on = game.awarded.has(`${game.i}:${who}`);
    return `<button class="btn star ${who}${on ? ' on' : ''}" data-action="star" data-who="${who}" aria-pressed="${on}">
      ${on ? '⭐' : '☆'} ${esc(label)}</button>`;
  };
  const nextBtn = (primary = false) => `<button class="btn ${primary ? 'primary' : 'next'}" data-action="next">${
    game.i >= game.steps.length - 1 ? 'Finish 🏁' : 'Next ➜'}</button>`;

  function bodyFor(s) {
    if (s.kind === 'q') {
      const choices = s.choices ? `
        <div class="choices">
          ${s.choices.map((c, i) => `<button class="choice${game.picked === i ? ' right' : ''}" data-action="choice" data-i="${i}" aria-label="Choice ${i + 1}">${c}</button>`).join('')}
        </div>` : '';
      const answer = game.revealed ? `<div class="answer"><span class="answer-label">Answer</span>${esc(s.a)}</div>` : '';
      const controls = game.revealed
        ? `${starBtn(s.who, `${nameOf(s.who)} got it!`)}${nextBtn()}`
        : `<button class="btn primary" data-action="reveal">👀 Show answer</button>`;
      return { main: `<h2 class="question">${esc(s.q)}</h2>${choices}${answer}`, controls };
    }
    if (s.kind === 'spot') {
      return {
        main: `<h2 class="question">${esc(s.q)}</h2><p class="hint">Look out the window!</p>`,
        controls: `${starBtn(s.who, 'Found it!')}${nextBtn()}`,
      };
    }
    if (s.kind === 'guess') {
      const clues = s.clues.slice(0, game.clue).map((c, i) => `<li class="${i === game.clue - 1 ? 'new' : ''}"><span>Clue ${i + 1}</span>${esc(c)}</li>`).join('');
      const answer = game.revealed ? `<div class="answer"><span class="answer-label">I am...</span>${esc(s.a)}</div>` : '';
      let controls;
      if (game.revealed) {
        controls = `<div class="star-row">${starBtn('little', nameOf('little'))}${starBtn('big', nameOf('big'))}</div>${nextBtn()}`;
      } else {
        controls = `${game.clue < s.clues.length ? '<button class="btn primary" data-action="clue">Next clue 🔍</button>' : ''}
          <button class="btn ${game.clue < s.clues.length ? 'ghost' : 'primary'}" data-action="reveal">Show answer</button>`;
      }
      return { main: `<h2 class="question small">Who am I?</h2><ol class="clues">${clues}</ol>${answer}`, controls };
    }
    if (s.kind === 'talk') {
      return {
        main: `<h2 class="question">${esc(s.q)}</h2><p class="hint">Everyone takes a turn. Grown-ups too!</p>`,
        controls: nextBtn(true),
      };
    }
    return {
      main: `<p class="wyr-lead">Would you rather...</p><h2 class="question">${esc(s.q)}</h2><p class="hint">Everyone picks one and says <b>why</b>!</p>`,
      controls: nextBtn(true),
    };
  }

  function renderStep() {
    const s = step();
    const { main, controls } = bodyFor(s);
    const pct = Math.round(((s.cardNo - 1) / game.total) * 100);
    const entering = lastRendered !== game.i;
    lastRendered = game.i;
    app.innerHTML = `
      <header class="bar">
        <button class="icon-btn" data-action="quit" aria-label="Back to home">✕</button>
        <div class="progress" role="progressbar" aria-valuenow="${s.cardNo}" aria-valuemin="1" aria-valuemax="${game.total}" aria-label="Card ${s.cardNo} of ${game.total}">
          <div class="progress-fill" style="width:${pct}%"></div>
          <span class="progress-text">${s.cardNo} / ${game.total}</span>
        </div>
        <div class="scores">
          <span class="score little" title="${esc(nameOf('little'))}">🐣 <b>${game.stars.little}</b></span>
          <span class="score big" title="${esc(nameOf('big'))}">🦁 <b>${game.stars.big}</b></span>
        </div>
      </header>
      <section class="stage ${kindClass(s)}${entering ? ' enter' : ''}">
        <div class="chip">${chipFor(s)}</div>
        <div class="stage-main">${main}</div>
        <button class="read-again" data-action="speak" aria-label="Read it again">🔊 Read again</button>
      </section>
      <footer class="controls ${kindClass(s)}">${controls}</footer>`;
  }

  function renderEnd() {
    const { little, big } = game.stars;
    app.innerHTML = `
      <section class="end">
        <div class="trophy" aria-hidden="true">🏆</div>
        <h1>Quest complete!</h1>
        <div class="finals">
          ${['little', 'big'].map((who) => `
            <div class="final ${who}">
              <span class="final-icon">${KIDS[who].icon}</span>
              <b>${esc(nameOf(who))}</b>
              <span class="final-stars">⭐ ${game.stars[who]}</span>
            </div>`).join('')}
        </div>
        <p class="end-note">Together you earned <b>${little + big}</b> stars. Great team! 🎉</p>
        <div class="end-actions">
          <button class="btn primary" data-action="again">Play another round</button>
          <button class="btn ghost" data-action="home">Pick a new topic</button>
        </div>
      </section>`;
  }

  function confetti(n) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = document.createElement('div');
    box.className = 'confetti';
    box.setAttribute('aria-hidden', 'true');
    const bits = ['⭐', '🎉', '✨', '🌟', '🎈'];
    for (let k = 0; k < n; k++) {
      const s = document.createElement('span');
      s.textContent = bits[k % bits.length];
      s.style.left = `${Math.random() * 100}%`;
      s.style.animationDelay = `${Math.random() * 0.4}s`;
      s.style.fontSize = `${18 + Math.random() * 20}px`;
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 2600);
  }

  // ---------- Events ----------
  app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;

    switch (action) {
      case 'start': return startGame(el.dataset.mode);
      case 'voice':
        voiceOn = !voiceOn;
        store.set('voice', voiceOn);
        if (!voiceOn) synth?.cancel();
        renderHome();
        return speak('Read aloud is on!');
      case 'quit':
        if (game && game.i > 0 && !confirm('Leave this round? Stars will reset.')) return;
        synth?.cancel();
        return renderHome();
      case 'home':
        synth?.cancel();
        return renderHome();
      case 'again': return startGame(game.mode);
      case 'speak': return speakStep();
      case 'next': return next();
      case 'star': return toggleStar(el.dataset.who);
      case 'reveal': {
        game.revealed = true;
        renderStep();
        return speak(step().a);
      }
      case 'clue': {
        game.clue += 1;
        renderStep();
        return speak(`Clue ${game.clue}: ${step().clues[game.clue - 1]}`);
      }
      case 'choice': {
        const s = step();
        const i = Number(el.dataset.i);
        if (i === s.correct) {
          game.picked = i;
          game.revealed = true;
          renderStep();
          confetti(14);
          return speak(`Yes! ${s.a}`);
        }
        el.classList.remove('wrong');
        void el.offsetWidth; // restart the wiggle animation
        el.classList.add('wrong');
        return speak('Hmm, try again!');
      }
      default:
    }
  });

  app.addEventListener('input', (e) => {
    const who = e.target.dataset?.name;
    if (!who) return;
    names[who] = e.target.value.slice(0, 20);
    store.set('names', names);
  });
  app.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.dataset?.name) e.target.blur();
  });

  renderHome();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
