// Generated from topic: "How does GPS know where you are?"
export default {
 "title": "How GPS Knows Your Location",
 "width": 576,
 "height": 1024,
 "fps": 30,
 "scenes": [
  {
   "say": "How does your phone know your exact location anywhere on Earth?",
   "items": [
    {
     "type": "icon",
     "kit": "phone",
     "size": 180,
     "at": 0.2,
     "float": 3,
     "x": 288,
     "y": 380,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "globe",
     "size": 90,
     "at": 0.6,
     "x": 150,
     "y": 200,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "question",
     "size": 80,
     "at": 0.8,
     "float": 2,
     "x": 420,
     "y": 200,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "GPS Mystery",
     "sub": "how does it find you?",
     "at": 1.1,
     "x": 288,
     "y": 570,
     "enter": "rise"
    }
   ]
  },
  {
   "say": "First surprise: your phone never sends any signal back into space.",
   "items": [
    {
     "type": "icon",
     "id": "ph",
     "kit": "phone",
     "size": 170,
     "at": 0.2,
     "x": 288,
     "y": 420,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "cross",
     "size": 100,
     "at": 0.6,
     "x": 288,
     "y": 210,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "arrow",
     "size": 70,
     "at": 0.8,
     "x": 288,
     "y": 310,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "One-Way Only",
     "sub": "phones only receive data",
     "at": 1.2,
     "x": 288,
     "y": 600,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Instead, dozens of satellites orbit above, constantly shouting one message.",
   "items": [
    {
     "type": "icon",
     "id": "earth",
     "kit": "globe",
     "size": 180,
     "at": 0.2,
     "x": 288,
     "y": 460,
     "enter": "pop"
    },
    {
     "type": "icon",
     "id": "s1",
     "kit": "star",
     "size": 80,
     "at": 0.5,
     "float": 3,
     "x": 130,
     "y": 200,
     "enter": "pop"
    },
    {
     "type": "icon",
     "id": "s2",
     "kit": "star",
     "size": 90,
     "at": 0.7,
     "float": 4,
     "x": 288,
     "y": 150,
     "enter": "pop"
    },
    {
     "type": "icon",
     "id": "s3",
     "kit": "star",
     "size": 80,
     "at": 0.9,
     "float": 3,
     "x": 446,
     "y": 200,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "31 Satellites",
     "at": 1.3,
     "x": 288,
     "y": 640,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Every satellite simply broadcasts its exact position and the current time.",
   "items": [
    {
     "type": "icon",
     "kit": "star",
     "size": 140,
     "at": 0.2,
     "float": 3,
     "x": 288,
     "y": 220,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "wifi",
     "size": 80,
     "at": 0.6,
     "x": 288,
     "y": 360,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "document",
     "size": 90,
     "at": 0.9,
     "x": 288,
     "y": 480,
     "enter": "rise"
    },
    {
     "type": "pill",
     "text": "Time + Location",
     "at": 1.2,
     "x": 288,
     "y": 610,
     "enter": "rise",
     "style": {
      "background": "#9bd400"
     }
    }
   ],
   "clear": true
  },
  {
   "say": "Each satellite carries super accurate atomic clocks that never lose a second.",
   "items": [
    {
     "type": "icon",
     "kit": "clock",
     "size": 190,
     "at": 0.2,
     "float": 4,
     "x": 288,
     "y": 330,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "chip",
     "size": 80,
     "at": 0.6,
     "x": 150,
     "y": 210,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "bolt",
     "size": 80,
     "at": 0.8,
     "x": 426,
     "y": 210,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Atomic Clocks",
     "sub": "accurate to nanoseconds",
     "at": 1.2,
     "x": 288,
     "y": 550,
     "enter": "rise"
    }
   ],
   "clear": true,
   "camera": {
    "from": {
     "x": 288,
     "y": 400,
     "z": 1
    },
    "to": {
     "x": 288,
     "y": 400,
     "z": 1.12
    }
   }
  },
  {
   "say": "Their radio signals travel down at the speed of light.",
   "items": [
    {
     "type": "icon",
     "kit": "star",
     "size": 100,
     "at": 0.2,
     "x": 288,
     "y": 180,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "bolt",
     "size": 120,
     "at": 0.6,
     "float": 4,
     "x": 288,
     "y": 340,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "phone",
     "size": 120,
     "at": 0.9,
     "x": 288,
     "y": 510,
     "enter": "rise"
    },
    {
     "type": "pill",
     "text": "300,000 km/s",
     "at": 1.2,
     "x": 288,
     "y": 640,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Your phone checks the signal arrival time to calculate exact distance.",
   "items": [
    {
     "type": "icon",
     "kit": "clock",
     "size": 110,
     "at": 0.2,
     "x": 170,
     "y": 310,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "arrow",
     "size": 70,
     "at": 0.6,
     "x": 288,
     "y": 310,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "search",
     "size": 110,
     "at": 0.9,
     "x": 406,
     "y": 310,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Time Delay",
     "sub": "distance = speed × delay",
     "at": 1.3,
     "x": 288,
     "y": 520,
     "enter": "rise"
    },
    {
     "type": "pill",
     "text": "Distance solved",
     "at": 1.6,
     "x": 288,
     "y": 640,
     "enter": "rise",
     "style": {
      "background": "#9bd400"
     }
    }
   ],
   "clear": true
  },
  {
   "say": "One satellite tells you you are somewhere on a giant sphere.",
   "items": [
    {
     "type": "icon",
     "id": "s1",
     "kit": "star",
     "size": 100,
     "at": 0.2,
     "x": 288,
     "y": 190,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "id": "g1",
     "kit": "globe",
     "size": 190,
     "at": 0.6,
     "x": 288,
     "y": 430,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "pill",
     "text": "1 Sphere",
     "at": 1.1,
     "x": 288,
     "y": 620,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "A second satellite overlaps, narrowing you down to a single ring.",
   "items": [
    {
     "type": "icon",
     "kit": "star",
     "size": 90,
     "at": 0.2,
     "x": 160,
     "y": 190,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "star",
     "size": 90,
     "at": 0.5,
     "x": 416,
     "y": 190,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Two Spheres",
     "sub": "narrowed to a ring",
     "at": 1,
     "x": 288,
     "y": 630,
     "enter": "rise"
    }
   ],
   "remove": [
    "s1"
   ]
  },
  {
   "say": "Add a third satellite, and only two possible points remain.",
   "items": [
    {
     "type": "icon",
     "kit": "star",
     "size": 76,
     "at": 0.2,
     "x": 130,
     "y": 180,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "star",
     "size": 76,
     "at": 0.4,
     "x": 288,
     "y": 130,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "star",
     "size": 76,
     "at": 0.6,
     "x": 446,
     "y": 180,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "globe",
     "size": 140,
     "at": 0.8,
     "x": 288,
     "y": 380,
     "enter": "pop"
    },
    {
     "type": "text",
     "text": "2 Points",
     "color": "#2a8a00",
     "size": 64,
     "at": 1.2,
     "x": 288,
     "y": 550,
     "enter": "rise"
    },
    {
     "type": "pill",
     "text": "Almost there",
     "at": 1.5,
     "x": 288,
     "y": 640,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "A fourth satellite eliminates the false spot and fixes clock errors.",
   "items": [
    {
     "type": "icon",
     "kit": "star",
     "size": 90,
     "at": 0.2,
     "x": 288,
     "y": 170,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "phone",
     "size": 150,
     "at": 0.5,
     "x": 288,
     "y": 370,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "check",
     "size": 90,
     "at": 0.9,
     "x": 420,
     "y": 270,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "4 Satellites",
     "sub": "precise spot locked in",
     "at": 1.3,
     "x": 288,
     "y": 570,
     "enter": "rise"
    }
   ],
   "clear": true,
   "camera": {
    "from": {
     "x": 288,
     "y": 400,
     "z": 1
    },
    "to": {
     "x": 288,
     "y": 400,
     "z": 1.12
    }
   }
  },
  {
   "say": "This math is called trilateration, pinpointing you within a few feet.",
   "items": [
    {
     "type": "icon",
     "kit": "globe",
     "size": 170,
     "at": 0.2,
     "float": 3,
     "x": 288,
     "y": 330,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "shield",
     "size": 80,
     "at": 0.6,
     "x": 170,
     "y": 450,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "check",
     "size": 80,
     "at": 0.8,
     "x": 406,
     "y": 450,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Trilateration",
     "sub": "instant global accuracy",
     "at": 1.2,
     "x": 288,
     "y": 600,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Follow for more mind-blowing everyday tech explained simply.",
   "items": [
    {
     "type": "icon",
     "kit": "rocket",
     "size": 210,
     "at": 0.2,
     "float": 5,
     "x": 288,
     "y": 350,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "+ Follow",
     "at": 0.8,
     "x": 288,
     "y": 560,
     "enter": "pop",
     "style": {
      "background": "#2a8a00",
      "color": "#ffffff"
     }
    }
   ],
   "clear": true
  }
 ]
};
