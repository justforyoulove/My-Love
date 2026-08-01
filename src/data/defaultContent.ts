import { AppCustomization } from '../types';

export const DEFAULT_CUSTOMIZATION: AppCustomization = {
  girlfriendName: "My Dearest Love",
  boyfriendName: "Yours Forever",
  anniversaryDate: "2026-07-20T04:00:00",
  notificationTitle: "💌 Special Delivery for You",
  notificationMessage: "I only love you, and I will love you forever. Happy Girlfriend's Day, my world! Tap to open...",
  letterTitle: "To the One Who Holds My Heart",
  letterSubtitle: "Happy Girlfriend's Day",
  letterContent: `My Dearest,

From the very moment you walked into my life, everything changed for the better. The world suddenly became brighter, softer, and infinitely more beautiful. Your laughter is my favorite sound, your smile is my daily inspiration, and your warmth is my favorite comfort.

Every day with you feels like a gift I get to unwrap again and again. Thank you for your kindness, your gentle grace, your patience, and the boundless love you give so effortlessly. You make my worst days manageable and my best days unforgettable.

I promise to cherish you, to listen to you, to hold your hand through every chapter of life, and to remind you every single morning how deeply and unconditionally you are loved.

You are my best friend, my soulmate, and my forever home.

With all my heart and eternal love,`,
  theme: "rosegold",
  musicPreset: "soothing_piano",
  customAudioUrl: "",
  flowerNotes: [
    {
      id: "flower-1",
      name: "Velvet Rose",
      flowerType: "rose",
      color: "#f43f5e",
      icon: "🌹",
      title: "Your Unmatched Beauty",
      message: "Just like a blooming rose, your presence fills my world with color and grace. You are breathtaking in every single way, inside and out."
    },
    {
      id: "flower-2",
      name: "Golden Sunflower",
      flowerType: "sunflower",
      color: "#eab308",
      icon: "🌻",
      title: "My Ray of Sunshine",
      message: "No matter how dark or tough the day gets, your sweet smile instantly brightens everything. You bring pure joy into my life."
    },
    {
      id: "flower-3",
      name: "Pink Tulip",
      flowerType: "tulip",
      color: "#ec4899",
      icon: "🌷",
      title: "My Favorite Laugh",
      message: "Your laughter is my absolute favorite sound in the universe. Hearing you giggle makes my heart skip a beat every time."
    },
    {
      id: "flower-4",
      name: "Royal Orchid",
      flowerType: "orchid",
      color: "#a855f7",
      icon: "🪻",
      title: "Our Quiet Moments",
      message: "My favorite place in the world is simply lying next to you in silence, wrapped in your warmth and feeling your heartbeat."
    },
    {
      id: "flower-5",
      name: "Pure White Lily",
      flowerType: "lily",
      color: "#f8fafc",
      icon: "🌸",
      title: "My Safe Haven",
      message: "With you, I can be 100% myself. You accept me, love me, and encourage me to be the best version of who I am."
    },
    {
      id: "flower-6",
      name: "Blossoming Cherry",
      flowerType: "cherry",
      color: "#f472b6",
      icon: "🌺",
      title: "Our Forever Promise",
      message: "My promise to you today and every day: I will stand by you, cherish you, and love you more with every passing second."
    }
  ],
  scratchCards: [
    {
      id: "card-1",
      title: "Romantic Dinner Coupon",
      icon: "🍷",
      category: "coupon",
      secretReward: "🎟️ Redeemable for: 1 Candlelight Home Dinner cooked with all your favorite dishes + dessert of your choice!"
    },
    {
      id: "card-2",
      title: "Lifetime Hug Pass",
      icon: "🫂",
      category: "coupon",
      secretReward: "🎟️ Unlimited Pass: Redeemable anytime, anywhere for an extra tight 5-minute warm cuddle hug!"
    },
    {
      id: "card-3",
      title: "Late Night Date",
      icon: "🍦",
      category: "coupon",
      secretReward: "🎟️ Late Night Movie & Ice Cream Marathon: You pick the movies, I bring the ice cream & popcorn!"
    },
    {
      id: "card-4",
      title: "A Heartfelt Promise",
      icon: "💍",
      category: "promise",
      secretReward: "💌 Forever Promise: I promise to always listen with an open heart, hold your hand during tough days, and never stop making you smile."
    },
    {
      id: "card-5",
      title: "Foot & Back Massage",
      icon: "💆‍♀️",
      category: "coupon",
      secretReward: "🎟️ Pamper Pass: A relaxing 30-minute foot and back massage with scented essential oils whenever you feel tired."
    },
    {
      id: "card-6",
      title: "My Favorite Secret",
      icon: "🤫",
      category: "secret",
      secretReward: "💖 Secret Confession: The exact second I knew I was irrevocably in love with you was when you laughed so hard your eyes crinkled!"
    }
  ],
  quizQuestions: [
    {
      id: "q-1",
      question: "What is my absolute favorite thing about you?",
      options: [
        "Your contagious laugh & sweet smile",
        "Your beautiful soul & kindness",
        "How safe I feel when holding you",
        "Literally everything about you!"
      ],
      correctIndex: 3,
      explanation: "Correct! It's impossible to pick just one thing because I am completely in love with everything that makes you, you! ❤️"
    },
    {
      id: "q-2",
      question: "Where is our dream romantic vacation spot?",
      options: [
        "A cozy cabin in snow-covered mountains",
        "A private overwater bungalow in Maldives",
        "A quiet historic cottage in Tuscany",
        "Anywhere in the world as long as we're together"
      ],
      correctIndex: 3,
      explanation: "Yes! Location doesn't matter at all — as long as I get to hold your hand, anywhere is paradise. 💕"
    },
    {
      id: "q-3",
      question: "Who loved who first?",
      options: [
        "I loved you from the very first second!",
        "You fell for me first!",
        "We both fell at the exact same moment",
        "It was written in the stars long before we met"
      ],
      correctIndex: 0,
      explanation: "Bingo! My heart was yours from the moment you smiled at me. 🥰"
    },
    {
      id: "q-4",
      question: "What happens when you have a rough or tired day?",
      options: [
        "I bring your favorite treats & snacks",
        "I give you non-stop warm hugs & kisses",
        "I listen to you & pamper you completely",
        "All of the above without hesitation!"
      ],
      correctIndex: 3,
      explanation: "Spot on! Your comfort and happiness will always be my highest priority! 👑"
    }
  ],
  reasons: [
    "The way your eyes twinkle when you get excited about something.",
    "How soft your hand feels wrapped inside mine.",
    "Your sweet morning sleepy voice.",
    "The unconditional kindness you show to everyone around you.",
    "How you make even mundane grocery trips feel like an adventure.",
    "Your warm, reassuring hugs that instantly heal a hard day.",
    "The cute little habit you have when you get concentrated.",
    "Because you love me for who I am, flaws and all.",
    "How your forehead kisses feel like pure magic.",
    "Because you are my home, wherever we go."
  ]
};

export const ROMANTIC_REASONS = [
  "The way your eyes twinkle when you get excited about something.",
  "How soft your hand feels wrapped inside mine.",
  "Your sweet morning sleepy voice.",
  "The unconditional kindness you show to everyone around you.",
  "How you make even mundane grocery trips feel like an adventure.",
  "Your warm, reassuring hugs that instantly heal a hard day.",
  "The cute little habit you have when you get concentrated.",
  "Because you love me for who I am, flaws and all.",
  "How your forehead kisses feel like pure magic.",
  "Because you are my home, wherever we go."
];

