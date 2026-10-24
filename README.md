# 🚗 Road Trip Quest

A read-aloud car game for a little explorer (~3 yrs) and a big explorer (~8 yrs).
The passenger holds the phone; the app reads every question out loud so nobody has to read.

## How to play

1. Type the kids' names on the home screen (saved on the phone).
2. Pick a topic (Animals, Space, Dinosaurs, Vehicles, Weather, My Body, Ocean) or **Surprise Mix**.
3. Each topic card has three turns:
   - 🐣 **Little Explorer**: a simple question, often with big emoji to tap.
   - 🦁 **Big Explorer**: a "why/how" question on the same topic.
   - 💬 **Family Talk**: an open question everyone answers, grown-ups too.
4. Between cards you get breaks from the topic: 👀 **Spot It!** (look out the window), 🐾 **Guess Who?** (animal clues that get easier) and 🤔 **Would You Rather**.
5. Tap **⭐ got it!** to give stars. A round is 9 cards, about 15–25 minutes.

**Quick games** on the home screen play just Spot It!, Guess Who? or Would You Rather.

## Tech

Plain HTML/CSS/JS with no build step and no dependencies.

- `data.js`: all questions and activities. Add new cards here.
- `app.js`: game logic, read-aloud (Web Speech API), stars, screen wake lock.
- `sw.js`: offline cache, so it keeps working with no signal. **Bump `CACHE` (e.g. `rtq-v2`) whenever you change files** so phones pick up the update.

The app avoids repeating cards you've played recently and only starts them over once a topic is used up.

### Run locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

### Install on a phone

Once it's on GitHub Pages, open the URL on the phone:
- **iPhone (Safari):** Share → *Add to Home Screen*
- **Android (Chrome):** ⋮ menu → *Add to Home screen*

Open it once on Wi-Fi before the trip so it gets cached for offline use.
