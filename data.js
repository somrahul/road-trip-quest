// All game content. Each topic card has a question for the little one (~3 yrs),
// a question for the big kid (~8 yrs), and an open "family talk" question.
// Little questions may have emoji `choices` with the index of the `correct` one.
window.RTQ_DATA = (() => {
  const topics = [
    {
      id: 'animals', name: 'Animals', emoji: '🐘', color: '#F4A261',
      cards: [
        {
          little: { q: 'What sound does a cow make?', a: 'Moo! 🐄' },
          big: { q: 'A cow has one stomach, but it has how many parts?', a: 'Four parts! That helps cows digest tough grass.' },
          talk: 'If you could have any animal as a pet, what would it be and why?',
        },
        {
          little: { q: 'Which animal is bigger?', choices: ['🐘', '🐭'], correct: 0, a: 'The elephant! It is HUGE.' },
          big: { q: 'What does an elephant use its trunk for?', a: 'Smelling, breathing, drinking, grabbing food, and even saying hello! It is like a nose and a hand in one.' },
          talk: 'What animal would you want to be for one whole day?',
        },
        {
          little: { q: 'How many legs does a dog have? Let\'s count!', a: 'Four legs! 1, 2, 3, 4! 🐕' },
          big: { q: 'How many legs does a spider have? And is a spider an insect?', a: 'Eight legs! Insects have 6 legs, so spiders are NOT insects. They are called arachnids.' },
          talk: 'Spiders help us by eating pesky bugs. What other animals help people?',
        },
        {
          little: { q: 'Which animal says "hoo hoo" at night?', choices: ['🦉', '🐷', '🐸'], correct: 0, a: 'An owl! 🦉' },
          big: { q: 'Why can owls see so well at night?', a: 'Their huge eyes collect lots of light. Their eyes are so big they can\'t move them, so owls turn their whole head instead!' },
          talk: 'Are you more of a morning person or a night owl?',
        },
        {
          little: { q: 'What color is a frog?', choices: ['🟢', '🔵', '🟣'], correct: 0, a: 'Green! (Some frogs are other colors too.) 🐸' },
          big: { q: 'A baby frog doesn\'t look like a frog. What is it called?', a: 'A tadpole! It lives in water, has a tail, and slowly grows legs.' },
          talk: 'What other animals change a lot as they grow up? (Hint: think of butterflies!)',
        },
        {
          little: { q: 'Can a fish live out of the water?', a: 'No! Fish need water to breathe. 🐟' },
          big: { q: 'How do fish breathe underwater?', a: 'With gills! Gills pull oxygen out of the water.' },
          talk: 'If you lived under the sea, what would your house look like?',
        },
        {
          little: { q: 'Which animal is very tall with a long, long neck?', choices: ['🐢', '🦒', '🐇'], correct: 1, a: 'A giraffe! 🦒' },
          big: { q: 'A giraffe\'s tongue is a funny color. What color is it?', a: 'Dark blue-purple! Scientists think the dark color protects it from sunburn while it eats leaves all day.' },
          talk: 'If you had a super long neck like a giraffe, what would you peek at?',
        },
        {
          little: { q: 'What yummy thing do bees make?', a: 'Honey! 🍯' },
          big: { q: 'Bees carry pollen from flower to flower so plants can make seeds and fruit. What is that called?', a: 'Pollination!' },
          talk: 'What is your favorite fruit? Lots of fruits need bees to grow!',
        },
        {
          little: { q: 'Which animal hops?', choices: ['🦘', '🐌'], correct: 0, a: 'The kangaroo! Boing, boing! 🦘' },
          big: { q: 'Where does a baby kangaroo live, and what is it called?', a: 'In its mom\'s pouch! A baby kangaroo is called a joey.' },
          talk: 'If you had a pouch like a kangaroo, what would you carry in it?',
        },
        {
          little: { q: 'What does a cat say?', a: 'Meow! 🐱' },
          big: { q: 'Lions and pet cats are in the same family. What do they have in common?', a: 'Whiskers, sharp claws, pouncing when they hunt, and LOTS of naps. Cats can sleep up to 16 hours a day!' },
          talk: 'What do you think animals dream about?',
        },
      ],
    },
    {
      id: 'space', name: 'Space', emoji: '🚀', color: '#6C63FF',
      cards: [
        {
          little: { q: 'What is big and bright in the sky in the daytime?', choices: ['☀️', '🌙', '⭐'], correct: 0, a: 'The Sun! ☀️' },
          big: { q: 'Is the Sun a planet or a star?', a: 'A star! It is the closest star to Earth.' },
          talk: 'If you could visit space, what would you pack in your bag?',
        },
        {
          little: { q: 'What comes out at night?', choices: ['☀️', '🌙'], correct: 1, a: 'The Moon! 🌙' },
          big: { q: 'Why does the Moon look like it changes shape?', a: 'The Sun always lights up half the Moon. As the Moon goes around Earth, we see different amounts of the lit-up part. These are called phases.' },
          talk: 'If you could walk on the Moon, what would you do first?',
        },
        {
          little: { q: 'Can you count down like a rocket? 5, 4, 3, 2, 1...', a: 'BLAST OFF! 🚀' },
          big: { q: 'What planet do we live on, and which number planet is it from the Sun?', a: 'Earth, the third planet from the Sun!' },
          talk: 'If you built a rocket, what color would it be and what would you name it?',
        },
        {
          little: { q: 'What color is the planet Mars?', choices: ['🔴', '🟢', '🔵'], correct: 0, a: 'Red! Mars is called the Red Planet.' },
          big: { q: 'Why is Mars red?', a: 'Its dirt has lots of rust in it, just like a rusty old bike!' },
          talk: 'Would you like to live on Mars someday? What would you miss from Earth?',
        },
        {
          little: { q: 'What twinkles in the night sky?', a: 'Stars! ✨ Twinkle, twinkle!' },
          big: { q: 'What is the biggest planet in our solar system?', a: 'Jupiter! More than 1,000 Earths could fit inside it.' },
          talk: 'If you could name a star, what would you call it?',
        },
        {
          little: { q: 'Do astronauts float in space?', a: 'Yes! They float like a balloon. 🎈' },
          big: { q: 'Which planet is famous for its big, beautiful rings?', a: 'Saturn! Its rings are made of chunks of ice and rock.' },
          talk: 'What would be the funniest thing about living where everything floats?',
        },
        {
          little: { q: 'Is the Sun hot or cold?', a: 'HOT! Super, super hot. 🔥' },
          big: { q: 'Why do we have day and night?', a: 'Earth spins like a top! The side facing the Sun has day, and the other side has night. One spin takes about 24 hours.' },
          talk: 'What is your favorite part of the day: morning, afternoon, or night? Why?',
        },
        {
          little: { q: 'Who goes to space in a rocket?', choices: ['👩‍🚀', '👨‍🍳', '🧑‍🌾'], correct: 0, a: 'Astronauts! 👩‍🚀' },
          big: { q: 'Who was the first person to walk on the Moon?', a: 'Neil Armstrong, in 1969!' },
          talk: 'What job would you want on a spaceship?',
        },
        {
          little: { q: 'How many moons does Earth have?', a: 'Just one! 🌕' },
          big: { q: 'What is a shooting star, really?', a: 'A tiny space rock burning up as it zooms into our air. It is called a meteor, not a star at all!' },
          talk: 'If you saw a shooting star, what would you wish for?',
        },
        {
          little: { q: 'What do astronauts wear on their heads in space?', choices: ['⛑️', '🎩', '🧢'], correct: 0, a: 'A helmet! It is part of the space suit and gives them air to breathe.' },
          big: { q: 'Which planet is closest to the Sun?', a: 'Mercury! It is also the smallest planet.' },
          talk: 'If aliens visited, what is one thing you would want to show them on Earth?',
        },
      ],
    },
    {
      id: 'dinos', name: 'Dinosaurs', emoji: '🦖', color: '#52B788',
      cards: [
        {
          little: { q: 'What sound does a dinosaur make? Let\'s all ROAR!', a: 'ROOOAAAR! 🦖' },
          big: { q: 'Are there any dinosaurs alive today?', a: 'Yes, sort of! Most died out 66 million years ago, but birds are living dinosaurs!' },
          talk: 'Which bird do you think looks the most like a dinosaur?',
        },
        {
          little: { q: 'Was T. rex big or small?', choices: ['🐜', '🚌'], correct: 1, a: 'BIG! About as long as a school bus.' },
          big: { q: 'T. rex had giant jaws. What were its arms like?', a: 'Tiny! Each arm was about as long as a grown-up\'s arm, with only two fingers.' },
          talk: 'Why do you think T. rex had such tiny arms?',
        },
        {
          little: { q: 'Lots of dinosaurs ate plants. Can you name a plant?', a: 'Trees, leaves, grass, flowers... 🌿' },
          big: { q: 'What do we call an animal that eats only plants?', a: 'An herbivore! Meat-eaters are carnivores, and animals that eat both are omnivores.' },
          talk: 'Are you an herbivore, a carnivore, or an omnivore? What is your favorite food?',
        },
        {
          little: { q: 'Did baby dinosaurs come out of eggs?', a: 'Yes! They hatched from eggs. 🥚' },
          big: { q: 'How do we know about dinosaurs if no one ever saw one?', a: 'From fossils: bones, teeth, footprints and eggs that turned to stone over millions of years.' },
          talk: 'If you found a fossil, what would you hope it was?',
        },
        {
          little: { q: 'Triceratops had horns on its face. Let\'s count them: how many?', a: 'Three! "Tri" means three.' },
          big: { q: 'What does the word "dinosaur" mean?', a: '"Terrible lizard"! But dinosaurs weren\'t really lizards.' },
          talk: 'If you discovered a brand-new dinosaur, what would you name it?',
        },
        {
          little: { q: 'Some dinosaurs had super long necks. Can you stretch your neck up tall?', a: 'Tall like a Brachiosaurus! 🦕' },
          big: { q: 'Why did long-necked dinosaurs have such long necks?', a: 'To reach leaves high in the trees, and to munch lots of plants without walking much.' },
          talk: 'Would you rather ride a long-necked dinosaur or a fast running one? Why?',
        },
        {
          little: { q: 'Did dinosaurs live at the same time as people?', a: 'No! They lived long, long before people.' },
          big: { q: 'Which flying reptile lived with the dinosaurs but wasn\'t a dinosaur?', a: 'Pterosaurs, like Pteranodon!' },
          talk: 'What would happen if a dinosaur showed up at our house?',
        },
        {
          little: { q: 'Stegosaurus had plates on its back. Can you make a spiky back with your fingers?', a: 'Spiky! Stegosaurus had a spiky tail too.' },
          big: { q: 'What did a Stegosaurus use its spiky tail for?', a: 'Defense! It could swing its tail spikes at hungry predators.' },
          talk: 'If you got one dinosaur superpower: horns, spikes, or a giant tail, which would you pick?',
        },
        {
          little: { q: 'Who digs up dinosaur bones?', choices: ['🧑‍🔬', '👮', '🧑‍🚒'], correct: 0, a: 'Scientists called paleontologists! (pay-lee-on-TOL-oh-jists)' },
          big: { q: 'How long ago did the dinosaurs disappear?', a: 'About 66 million years ago, most likely after a giant asteroid hit Earth.' },
          talk: 'What would you want to dig up if you were a scientist?',
        },
        {
          little: { q: 'Velociraptor was about the size of which one?', choices: ['🚌', '🦃'], correct: 1, a: 'A turkey! It was small, and it had feathers!' },
          big: { q: 'Some dinosaurs had feathers. Which animals have feathers today?', a: 'Birds! They are the dinosaurs\' great-great-great... grandchildren.' },
          talk: 'Would a dinosaur covered in feathers be scary or cute?',
        },
      ],
    },
    {
      id: 'vehicles', name: 'Vehicles', emoji: '🚒', color: '#E63946',
      cards: [
        {
          little: { q: 'What color is a fire truck?', choices: ['🔴', '🟡', '🔵'], correct: 0, a: 'Red! 🚒' },
          big: { q: 'Why do fire trucks have sirens and flashing lights?', a: 'So other cars know to move over and let them through fast in an emergency.' },
          talk: 'What should our car do when we hear a siren?',
        },
        {
          little: { q: 'How many wheels does a car have? Let\'s count!', a: 'Four! 1, 2, 3, 4!' },
          big: { q: 'What makes an electric car go?', a: 'A big battery powers electric motors that turn the wheels. No gas needed!' },
          talk: 'If our car could talk, what would it say right now?',
        },
        {
          little: { q: 'What goes choo-choo on tracks?', choices: ['🚂', '🚁', '⛵'], correct: 0, a: 'A train! 🚂' },
          big: { q: 'Why do trains run on tracks instead of roads?', a: 'Steel wheels on steel rails roll very smoothly, so one engine can pull lots of heavy cars.' },
          talk: 'If you could take a train anywhere, where would you go?',
        },
        {
          little: { q: 'What flies in the sky and takes people far away?', a: 'An airplane! ✈️' },
          big: { q: 'How do airplanes stay up in the air?', a: 'Their wings are shaped so moving air pushes them UP as the plane zooms forward. That push is called lift.' },
          talk: 'What is the farthest place you have ever been?',
        },
        {
          little: { q: 'What color is a school bus?', choices: ['🟢', '🟡', '🟣'], correct: 1, a: 'Yellow! 🚌' },
          big: { q: 'What does each traffic light color mean?', a: 'Green means go, yellow means slow down, and red means stop!' },
          talk: 'If you invented a new traffic light color, what would it mean?',
        },
        {
          little: { q: 'Which machine digs big holes in the dirt?', choices: ['🚜', '🚲'], correct: 0, a: 'A digger! (It\'s called an excavator.)' },
          big: { q: 'What does a dump truck do?', a: 'It carries dirt, rocks, or sand, then tips its back up to dump it all out.' },
          talk: 'Which construction truck would you most want to drive?',
        },
        {
          little: { q: 'What do boats float on?', a: 'Water! 🚤' },
          big: { q: 'How can a giant metal ship float?', a: 'Its shape pushes lots of water out of the way, and the water pushes back up. It\'s also full of air inside!' },
          talk: 'Would you rather be a pirate captain or a submarine explorer?',
        },
        {
          little: { q: 'Does our car drink gas or juice?', a: 'Gas (or electricity)! Juice is for us. 🧃' },
          big: { q: 'What does a helicopter have instead of wings?', a: 'Spinning blades on top called rotors. They let it go straight up and hover in one spot!' },
          talk: 'If you were a car inventor, what cool thing would you add to cars?',
        },
        {
          little: { q: 'Which one helps people who are hurt?', choices: ['🚑', '🚜'], correct: 0, a: 'The ambulance! 🚑' },
          big: { q: 'What do police cars, fire trucks and ambulances have in common?', a: 'They are all emergency vehicles. They help people, and other cars let them go first when the sirens are on.' },
          talk: 'Who are some helpers in our town?',
        },
        {
          little: { q: 'Does a bike have 2 wheels or 4?', a: 'Two! A tricycle has three. 🚲' },
          big: { q: 'What is the fastest thing people have ever ridden in?', a: 'A spacecraft! The Apollo astronauts came back from the Moon at almost 25,000 miles per hour.' },
          talk: 'Would you pick a car that flies, a car that swims, or a car that drives up walls?',
        },
      ],
    },
    {
      id: 'weather', name: 'Weather', emoji: '🌦️', color: '#4EA8DE',
      cards: [
        {
          little: { q: 'What falls from the clouds and makes puddles?', choices: ['🌧️', '🍎'], correct: 0, a: 'Rain! 🌧️' },
          big: { q: 'Where does rain come from?', a: 'The Sun warms water so it rises as invisible vapor. High up, it cools into tiny drops that make clouds. When the drops get heavy, they fall as rain!' },
          talk: 'What is the most fun thing to do on a rainy day?',
        },
        {
          little: { q: 'Is snow hot or cold?', a: 'Cold! Brrrr! ❄️' },
          big: { q: 'Are any two snowflakes exactly the same?', a: 'Almost never! Each flake grows its own way as it falls.' },
          talk: 'If you could make it snow anywhere in the world, where would it be?',
        },
        {
          little: { q: 'Let\'s name the colors in a rainbow!', a: 'Red, orange, yellow, green, blue, and purple! 🌈' },
          big: { q: 'What do you need to see a rainbow?', a: 'Sunlight and raindrops! Light bends inside the drops and splits into colors. Stand with the Sun behind you.' },
          talk: 'If you could add a new color to the rainbow, what would it be?',
        },
        {
          little: { q: 'What do we use when it rains?', choices: ['☂️', '🕶️'], correct: 0, a: 'An umbrella! And a raincoat and boots.' },
          big: { q: 'What makes the BOOM of thunder?', a: 'Lightning heats the air super fast, and the air bursts outward with a BOOM!' },
          talk: 'Is thunder scary or exciting to you? Why?',
        },
        {
          little: { q: 'What is fluffy, white, and floats in the sky?', a: 'Clouds! ☁️' },
          big: { q: 'How can you tell how far away lightning is?', a: 'Count the seconds between the flash and the thunder. Every 5 seconds is about 1 mile away!' },
          talk: 'Look out the window. What shapes can you see in the clouds?',
        },
        {
          little: { q: 'Can you blow like the wind? Whoooosh!', a: 'Whoooosh! 🌬️' },
          big: { q: 'What is wind?', a: 'Moving air! Air rushes from one place to another when some places are warmer than others.' },
          talk: 'What toys need wind to work? (Kites! Pinwheels! What else?)',
        },
        {
          little: { q: 'It\'s super sunny! What should we wear?', choices: ['🕶️', '🧤'], correct: 0, a: 'Sunglasses! 😎' },
          big: { q: 'Why is it hotter in summer?', a: 'Earth is tilted. In summer, our part of Earth tilts toward the Sun, so sunlight hits more directly and days are longer.' },
          talk: 'What is your favorite season, and why?',
        },
        {
          little: { q: 'What can we build with snow?', choices: ['⛄', '🏰'], correct: 0, a: 'A snowman! ⛄ (Snow forts too!)' },
          big: { q: 'What is a tornado?', a: 'A spinning tube of wind that reaches down from a storm cloud all the way to the ground.' },
          talk: 'If you were the weather reporter, what would you say about today\'s weather?',
        },
        {
          little: { q: 'In which season do leaves fall off the trees?', choices: ['🍂', '🌸'], correct: 0, a: 'Fall! 🍂' },
          big: { q: 'Why do leaves change color in the fall?', a: 'Trees stop making the green stuff (chlorophyll), so the hidden yellow and orange colors show. Some trees make red too!' },
          talk: 'Can you spot any trees with colorful leaves outside right now?',
        },
        {
          little: { q: 'Look outside! Is it sunny or cloudy right now?', a: 'You tell me! 🌤️' },
          big: { q: 'What is fog?', a: 'A cloud that is down on the ground!' },
          talk: 'What is the weirdest weather you have ever seen?',
        },
      ],
    },
    {
      id: 'body', name: 'My Body', emoji: '🫀', color: '#F28482',
      cards: [
        {
          little: { q: 'Point to your nose! What does your nose do?', a: 'It smells things! 👃' },
          big: { q: 'How many bones does a grown-up have?', a: '206! Babies are born with about 300, and some join together as they grow.' },
          talk: 'What is your favorite smell in the whole world?',
        },
        {
          little: { q: 'What do we hear with?', choices: ['👂', '👃', '🦶'], correct: 0, a: 'Our ears! 👂' },
          big: { q: 'What does your heart do?', a: 'It pumps blood all around your body, about 100,000 times every day!' },
          talk: 'What makes your heart beat really fast?',
        },
        {
          little: { q: 'How many fingers on one hand? Let\'s count!', a: 'Five! 🖐️' },
          big: { q: 'What are the tiny building blocks your whole body is made of?', a: 'Cells! You are made of trillions of them.' },
          talk: 'What is something amazing your hands can do?',
        },
        {
          little: { q: 'What do we chew our food with?', choices: ['🦷', '👂'], correct: 0, a: 'Our teeth! 🦷' },
          big: { q: 'How many sets of teeth do people get?', a: 'Two! 20 baby teeth fall out, and up to 32 grown-up teeth grow in.' },
          talk: 'What is the best way to keep your teeth healthy?',
        },
        {
          little: { q: 'What do we see with?', choices: ['👀', '👄'], correct: 0, a: 'Our eyes! 👀' },
          big: { q: 'Why do we blink?', a: 'Blinking cleans and wets your eyes, like a tiny windshield wiper!' },
          talk: 'Staring contest time! Who can go longest without blinking? (Not the driver!)',
        },
        {
          little: { q: 'Where is your tummy? Pat it!', a: 'Right there! That\'s where your food goes.' },
          big: { q: 'Where does food go after you swallow it?', a: 'Down a tube called the esophagus into your stomach, which mashes it up. Then it goes into your intestines.' },
          talk: 'What healthy food makes you feel super strong?',
        },
        {
          little: { q: 'What do we do when we\'re sleepy?', a: 'Yaaawn and go to sleep! 😴' },
          big: { q: 'Why do we need sleep?', a: 'Sleep helps your body grow, heals you, and helps your brain remember what you learned!' },
          talk: 'What is the best dream you have ever had?',
        },
        {
          little: { q: 'Show me your muscles! Flex!', a: 'Wow, so strong! 💪' },
          big: { q: 'What is the biggest organ of your body?', a: 'Your skin!' },
          talk: 'What makes you feel brave?',
        },
        {
          little: { q: 'Do we breathe air or water?', a: 'Air! Take a big breath in... and out.' },
          big: { q: 'What do your lungs do?', a: 'They take in oxygen from the air, and push out carbon dioxide when you breathe out.' },
          talk: 'Let\'s all take 3 big, slow breaths together. How do you feel now?',
        },
        {
          little: { q: 'What grows on top of your head?', choices: ['💇', '🌳'], correct: 0, a: 'Hair! 💇' },
          big: { q: 'What does your brain do?', a: 'Everything! It controls thinking, moving, and feeling, and it even keeps you breathing while you sleep.' },
          talk: 'What is something new your brain learned this week?',
        },
      ],
    },
    {
      id: 'ocean', name: 'Ocean', emoji: '🐳', color: '#219EBC',
      cards: [
        {
          little: { q: 'What is the biggest animal in the ocean?', choices: ['🐋', '🐠'], correct: 0, a: 'The blue whale! 🐋' },
          big: { q: 'Is a whale a fish?', a: 'No! Whales are mammals. They breathe air through a blowhole and feed their babies milk.' },
          talk: 'If you could swim with any sea animal, which would you pick?',
        },
        {
          little: { q: 'What color is the ocean?', a: 'Blue! (Sometimes green or gray.) 🌊' },
          big: { q: 'Why is ocean water salty?', a: 'Rivers carry tiny bits of salt from rocks into the ocean. Water dries up into clouds, but the salt stays behind.' },
          talk: 'What do you like to do best at the beach?',
        },
        {
          little: { q: 'How many arms does an octopus have? Let\'s count!', a: 'Eight! 🐙' },
          big: { q: 'What tricks can an octopus use to hide?', a: 'It can change its color and skin bumps to match the rocks around it, and squirt ink!' },
          talk: 'If you could change color like an octopus, what color would you be right now?',
        },
        {
          little: { q: 'Does a crab walk forwards or sideways?', a: 'Sideways! 🦀 Let\'s wiggle sideways in our seats!' },
          big: { q: 'Why do crabs have a hard shell?', a: 'It\'s armor that protects their soft body. When they grow, they wiggle out and grow a bigger one!' },
          talk: 'If you were a crab, what would your armor look like?',
        },
        {
          little: { q: 'Which one has a big fin and lots of sharp teeth?', choices: ['🦈', '🐢'], correct: 0, a: 'A shark! 🦈' },
          big: { q: 'Are sharks fish? And what is special about their skeleton?', a: 'Yes, sharks are fish! Their skeleton is made of cartilage, the bendy stuff in your ears, not bone.' },
          talk: 'Sharks help keep the ocean healthy. Why do you think every animal matters?',
        },
        {
          little: { q: 'Can you name a color of a fish?', a: 'Orange like a clownfish! Yellow, blue, stripes... so many! 🐠' },
          big: { q: 'What is coral?', a: 'Coral looks like a plant, but it is made of tiny animals! Coral reefs are homes for lots of fish.' },
          talk: 'If you lived on a coral reef, who would your neighbors be?',
        },
        {
          little: { q: 'Which ocean animal loves to jump and play?', choices: ['🐬', '🦀'], correct: 0, a: 'Dolphins! 🐬' },
          big: { q: 'How do dolphins find food in dark, cloudy water?', a: 'Echolocation! They make clicking sounds and listen for the echoes bouncing back.' },
          talk: 'If you could talk to dolphins, what would you ask them?',
        },
        {
          little: { q: 'What pretty things can we find on the beach?', choices: ['🐚', '🍕'], correct: 0, a: 'Seashells! 🐚' },
          big: { q: 'How much of Earth is covered by ocean?', a: 'About 70%, more than two-thirds of the whole planet!' },
          talk: 'Why do you think people call Earth the "Blue Planet"?',
        },
        {
          little: { q: 'Is a sea turtle slow or fast on land?', a: 'Slow on land, but a great swimmer in the sea! 🐢' },
          big: { q: 'Where do sea turtles lay their eggs?', a: 'On sandy beaches! The babies hatch and race to the ocean.' },
          talk: 'How can we help keep the ocean clean for the turtles?',
        },
        {
          little: { q: 'Is ocean water good to drink?', a: 'No! It\'s way too salty. Yuck! 🧂' },
          big: { q: 'What is the deepest part of the ocean called?', a: 'The Mariana Trench. It\'s almost 7 miles deep!' },
          talk: 'What do you think lives at the very bottom of the ocean?',
        },
      ],
    },
  ];

  // "Spot It!" — look out the window. Little = colors/shapes, Big = reading/counting.
  const spot = [
    { little: 'Find something RED! 🔴', big: 'Spot 3 red cars. Count them out loud!' },
    { little: 'Can you see a TRUCK? 🚚', big: 'Find a truck with more than 4 wheels. How many wheels does it have?' },
    { little: 'Find a TREE! 🌳', big: 'Find a tree with orange, red, or yellow leaves.' },
    { little: 'Find something BLUE! 🔵', big: 'Find a sign with a number on it. What is the number?' },
    { little: 'Can you see an ANIMAL? 🐄', big: 'Find an animal, real or on a sign or truck!' },
    { little: 'Find a CIRCLE! ⭕ (Wheels count!)', big: 'Find a sign shaped like a triangle or an octagon.' },
    { little: 'Find something YELLOW! 🟡', big: 'Find a license plate from a different state.' },
    { little: 'Can you see a CLOUD? ☁️', big: 'Find a cloud that looks like an animal. What is it?' },
    { little: 'Find a BUS or a big van! 🚌', big: 'Find a word on a sign that starts with the letter S.' },
    { little: 'Can you spot a BIRD? 🐦', big: 'Find a license plate with the letter Z, Q, or X.' },
    { little: 'Find a WHITE car! ⚪', big: 'Find a bridge, a tunnel, or a water tower.' },
    { little: 'Find something GREEN! 🟢', big: 'Add up the numbers on a license plate. What is the total?' },
    { little: 'Find a MOTORCYCLE or a BIKE! 🏍️', big: 'Find a car that is the same color as our car.' },
    { little: 'Find a FLAG! 🚩', big: 'Find a restaurant sign. What would you order there?' },
    { little: 'Can you see an AIRPLANE in the sky? ✈️', big: 'Find a speed limit sign. How fast can cars go here?' },
    { little: 'Find something ORANGE! 🟠 (Cones count!)', big: 'Find a sign with an arrow. Which way does it point?' },
  ];

  // "Guess Who?" — clues go from tricky to easy; the last one is a giveaway for the little one.
  const guess = [
    { a: 'A lion! 🦁', clues: ['I can sleep up to 20 hours a day.', 'I live in a family group called a pride.', 'I have a big, fluffy mane.', 'I go ROAR!'] },
    { a: 'An elephant! 🐘', clues: ['I can\'t jump.', 'I am the biggest animal that lives on land.', 'I have big, floppy ears.', 'I have a long trunk!'] },
    { a: 'A penguin! 🐧', clues: ['I am a bird, but I can\'t fly.', 'I am a super swimmer.', 'I live where it is very, very cold.', 'I waddle, and I am black and white!'] },
    { a: 'A monkey! 🐒', clues: ['I can swing from tree to tree.', 'I use my hands and feet to grab things.', 'I love bananas!', 'I go ooh-ooh, ah-ah!'] },
    { a: 'A dog! 🐶', clues: ['My nose smells WAY better than yours.', 'I wag my tail when I\'m happy.', 'I love to fetch a ball.', 'I go WOOF WOOF!'] },
    { a: 'A duck! 🦆', clues: ['My feathers are waterproof.', 'I have webbed feet for paddling.', 'I like to swim in ponds.', 'I go QUACK QUACK!'] },
    { a: 'A snake! 🐍', clues: ['I have no legs at all.', 'I smell with my tongue.', 'I wiggle out of my old skin as I grow.', 'I go hissssss!'] },
    { a: 'An owl! 🦉', clues: ['I can turn my head almost all the way around.', 'I hunt at night.', 'I have big, round eyes.', 'I go HOO HOO!'] },
    { a: 'A zebra! 🦓', clues: ['I am related to horses.', 'No two of us have the same pattern.', 'I live in Africa and eat grass.', 'I have black and white stripes!'] },
    { a: 'A bear! 🐻', clues: ['I sleep through most of the winter.', 'I love to eat fish and berries.', 'I am big and furry with sharp claws.', 'I love honey and go GRRR!'] },
    { a: 'A frog! 🐸', clues: ['I start my life as a tadpole.', 'I catch bugs with my long, sticky tongue.', 'I am usually green.', 'I go RIBBIT!'] },
    { a: 'A pig! 🐷', clues: ['I am very smart.', 'I roll in mud to stay cool.', 'I have a curly tail.', 'I go OINK OINK!'] },
  ];

  // "Would you rather...?" — everyone answers and says why.
  const wyr = [
    'have a pet dinosaur or a pet dragon?',
    'be able to fly or be invisible?',
    'eat only pizza forever or only ice cream forever?',
    'live in a treehouse or an underwater house?',
    'be as tall as a giraffe or as small as an ant?',
    'have a robot friend or a talking dog?',
    'go to the Moon or to the bottom of the ocean?',
    'have super speed or super strength?',
    'ride a dolphin or ride an elephant?',
    'splash in puddles or jump in a pile of leaves?',
    'be a firefighter or an astronaut?',
    'have a car that flies or a car that swims?',
    'talk to animals or talk to trees?',
    'have a bath full of jelly or a pool full of bubbles?',
    'sleep in a tent outside or in a castle?',
    'be a superhero or a wizard?',
  ];

  topics.forEach((t) => t.cards.forEach((c, i) => { c.id = `${t.id}-${i}`; }));
  return {
    topics,
    spot: spot.map((s, i) => ({ id: `spot-${i}`, ...s })),
    guess: guess.map((g, i) => ({ id: `guess-${i}`, ...g })),
    wyr: wyr.map((q, i) => ({ id: `wyr-${i}`, q })),
  };
})();
