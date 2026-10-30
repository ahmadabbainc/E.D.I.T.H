// Generated from topic: "How do noise-cancelling headphones work?"
export default {
 "title": "How Noise-Cancelling Headphones Work",
 "width": 576,
 "height": 1024,
 "fps": 30,
 "scenes": [
  {
   "say": "Ever wondered how noise-cancelling headphones magically wipe out background roar?",
   "items": [
    {
     "type": "icon",
     "kit": "person",
     "size": 130,
     "at": 0.2,
     "float": 4,
     "x": 288,
     "y": 330,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "question",
     "size": 70,
     "at": 0.6,
     "float": 3,
     "x": 392,
     "y": 240,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Noise Cancelling",
     "sub": "Pure physics at work",
     "at": 1,
     "x": 288,
     "y": 520,
     "enter": "rise"
    }
   ]
  },
  {
   "say": "All sound travels through the air as invisible ripples of physical pressure.",
   "items": [
    {
     "type": "icon",
     "kit": "wifi",
     "size": 120,
     "at": 0.2,
     "float": 4,
     "x": 288,
     "y": 330,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Sound Wave",
     "sub": "Air molecules vibrating",
     "at": 0.7,
     "x": 288,
     "y": 500,
     "enter": "rise"
    },
    {
     "type": "pill",
     "text": "Pressure wave",
     "at": 1.1,
     "x": 288,
     "y": 590,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Every wave consists of high-pressure peaks and low-pressure valleys.",
   "items": [
    {
     "type": "icon",
     "kit": "arrow",
     "size": 80,
     "at": 0.2,
     "x": 200,
     "y": 320,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "arrow",
     "size": 80,
     "at": 0.5,
     "x": 376,
     "y": 360,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "High peak (+1)",
     "at": 0.8,
     "x": 200,
     "y": 440,
     "enter": "rise"
    },
    {
     "type": "pill",
     "text": "Low valley (-1)",
     "at": 1.1,
     "x": 376,
     "y": 440,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Wave Structure",
     "sub": "Peaks push, valleys pull",
     "at": 1.4,
     "x": 288,
     "y": 560,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Standard headphones just use thick foam to block sound mechanically.",
   "items": [
    {
     "type": "icon",
     "kit": "shield",
     "size": 120,
     "at": 0.2,
     "float": 3,
     "x": 288,
     "y": 340,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Passive isolation",
     "at": 0.7,
     "x": 288,
     "y": 480,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Foam Barrier",
     "sub": "Muffles high pitches only",
     "at": 1.1,
     "x": 288,
     "y": 570,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Active noise cancelling fights back using live digital processing.",
   "items": [
    {
     "type": "icon",
     "kit": "chip",
     "size": 120,
     "at": 0.2,
     "float": 4,
     "x": 288,
     "y": 330,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "bolt",
     "size": 60,
     "at": 0.6,
     "x": 390,
     "y": 250,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "gear",
     "size": 60,
     "at": 0.8,
     "x": 186,
     "y": 250,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Active ANC",
     "sub": "Fighting sound with sound",
     "at": 1.2,
     "x": 288,
     "y": 520,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Tiny external microphones continuously listen to incoming ambient noise.",
   "items": [
    {
     "type": "icon",
     "id": "ear",
     "kit": "person",
     "size": 100,
     "at": 0.2,
     "x": 160,
     "y": 370,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "id": "sensor",
     "kit": "search",
     "size": 80,
     "at": 0.5,
     "x": 350,
     "y": 320,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "kit": "wifi",
     "size": 70,
     "at": 0.8,
     "x": 450,
     "y": 260,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Outward Microphones",
     "sub": "Samples noise in real time",
     "at": 1.2,
     "x": 288,
     "y": 540,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "An internal processor calculates an inverted mirror copy within microseconds.",
   "items": [
    {
     "type": "icon",
     "id": "chip2",
     "kit": "chip",
     "size": 110,
     "at": 0.2,
     "x": 370,
     "y": 350,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "kit": "clock",
     "size": 56,
     "at": 0.6,
     "x": 440,
     "y": 260,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Speed: microsecond",
     "at": 0.9,
     "x": 370,
     "y": 450,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Wave Inversion",
     "sub": "Flipping phase 180 degrees",
     "at": 1.3,
     "x": 288,
     "y": 570,
     "enter": "rise"
    }
   ],
   "remove": [
    "sensor"
   ]
  },
  {
   "say": "The speaker immediately fires this anti-noise straight into your ear canal.",
   "items": [
    {
     "type": "icon",
     "id": "spk",
     "kit": "bolt",
     "size": 100,
     "at": 0.2,
     "x": 180,
     "y": 350,
     "enter": "pop"
    },
    {
     "type": "icon",
     "id": "anti",
     "kit": "wifi",
     "size": 90,
     "at": 0.6,
     "x": 380,
     "y": 350,
     "enter": "pop"
    },
    {
     "type": "line",
     "color": "#2a8a00",
     "w": 4,
     "at": 0.9,
     "from": "spk",
     "toId": "anti",
     "enter": "draw"
    },
    {
     "type": "label",
     "text": "Anti-Sound Wave",
     "sub": "Exact opposite polarity",
     "at": 1.3,
     "x": 288,
     "y": 540,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "When the peak of outside noise meets this created valley, they collide.",
   "items": [
    {
     "type": "icon",
     "id": "in_wave",
     "kit": "arrow",
     "size": 90,
     "at": 0.2,
     "x": 160,
     "y": 340,
     "enter": "left",
     "keep": true
    },
    {
     "type": "icon",
     "id": "out_wave",
     "kit": "arrow",
     "size": 90,
     "at": 0.5,
     "x": 416,
     "y": 340,
     "enter": "right",
     "keep": true
    },
    {
     "type": "pill",
     "text": "Incoming Peak",
     "at": 0.8,
     "x": 160,
     "y": 440,
     "enter": "rise"
    },
    {
     "type": "pill",
     "text": "Anti-Wave Valley",
     "at": 1.1,
     "x": 416,
     "y": 440,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Interference",
     "sub": "Two opposing forces meet",
     "at": 1.4,
     "x": 288,
     "y": 560,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Mathematically, plus one and minus one cancel each other out to zero.",
   "items": [
    {
     "type": "text",
     "text": "1 - 1 = 0",
     "color": "#2a8a00",
     "size": 72,
     "at": 0.2,
     "x": 288,
     "y": 310,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "check",
     "size": 80,
     "at": 0.7,
     "x": 288,
     "y": 420,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Pure Silence",
     "sub": "Air vibrations flatten flat",
     "at": 1.1,
     "x": 288,
     "y": 550,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "This works brilliantly against steady drones, like airplane cabins and trains.",
   "items": [
    {
     "type": "icon",
     "kit": "truck",
     "size": 110,
     "at": 0.2,
     "float": 3,
     "x": 180,
     "y": 340,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "tower",
     "size": 110,
     "at": 0.5,
     "float": 3,
     "x": 396,
     "y": 340,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Predictable droning",
     "at": 0.9,
     "x": 288,
     "y": 460,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Constant Low Frequencies",
     "sub": "Easy for chips to anticipate",
     "at": 1.3,
     "x": 288,
     "y": 560,
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
     "z": 1.1
    }
   }
  },
  {
   "say": "Sudden random noises like people talking change too fast to cancel.",
   "items": [
    {
     "type": "icon",
     "kit": "chat",
     "size": 110,
     "at": 0.2,
     "float": 4,
     "x": 200,
     "y": 340,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "cross",
     "size": 80,
     "at": 0.6,
     "x": 376,
     "y": 340,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Voices leak through",
     "at": 1,
     "x": 288,
     "y": 460,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Unpredictable Pitch",
     "sub": "Zero time for microchips to react",
     "at": 1.4,
     "x": 288,
     "y": 560,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Follow for more hidden everyday technology explained in simple terms.",
   "items": [
    {
     "type": "icon",
     "kit": "rocket",
     "size": 130,
     "at": 0.2,
     "float": 5,
     "x": 288,
     "y": 330,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "star",
     "size": 60,
     "at": 0.6,
     "float": 3,
     "x": 390,
     "y": 230,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "+ Follow",
     "at": 1,
     "x": 288,
     "y": 510,
     "enter": "pop",
     "style": {
      "background": "#2a8a00",
      "color": "#fff"
     }
    }
   ],
   "clear": true
  }
 ]
};
