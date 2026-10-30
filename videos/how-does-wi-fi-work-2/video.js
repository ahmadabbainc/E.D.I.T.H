// Generated from topic: "How does Wi-Fi work?"
export default {
 "title": "How Wi-Fi Actually Works",
 "width": 576,
 "height": 1024,
 "fps": 30,
 "scenes": [
  {
   "say": "How does invisible air connect your phone to the entire internet?",
   "items": [
    {
     "type": "icon",
     "kit": "phone",
     "size": 110,
     "at": 0.2,
     "float": 4,
     "x": 180,
     "y": 340,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "wifi",
     "size": 90,
     "at": 0.5,
     "float": 3,
     "x": 390,
     "y": 340,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "question",
     "size": 60,
     "at": 0.8,
     "x": 450,
     "y": 240,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Invisible magic?",
     "sub": "How wireless data really moves",
     "at": 1.1,
     "x": 288,
     "y": 520,
     "enter": "rise"
    }
   ],
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
   "say": "Inside your phone, every photo and video is just pure binary data.",
   "items": [
    {
     "type": "icon",
     "kit": "phone",
     "size": 130,
     "at": 0.2,
     "float": 3,
     "x": 288,
     "y": 300,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "0 1 0 1 1 0 0 1",
     "at": 0.6,
     "x": 288,
     "y": 440,
     "enter": "rise",
     "style": {
      "background": "#2a8a00",
      "color": "#ffffff"
     }
    },
    {
     "type": "label",
     "text": "Binary Code",
     "sub": "billions of 1s and 0s",
     "at": 1,
     "x": 288,
     "y": 550,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "A tiny internal radio chip translates those numbers into electromagnetic waves.",
   "items": [
    {
     "type": "icon",
     "id": "chip1",
     "kit": "chip",
     "size": 110,
     "at": 0.3,
     "x": 160,
     "y": 320,
     "enter": "left"
    },
    {
     "type": "icon",
     "id": "bolt1",
     "kit": "bolt",
     "size": 80,
     "at": 0.7,
     "float": 4,
     "x": 400,
     "y": 320,
     "enter": "pop"
    },
    {
     "type": "line",
     "color": "#2a8a00",
     "w": 4,
     "at": 1,
     "from": "chip1",
     "toId": "bolt1",
     "enter": "draw"
    },
    {
     "type": "label",
     "text": "Signal Converter",
     "sub": "data turns into radio waves",
     "at": 1.2,
     "x": 288,
     "y": 520,
     "enter": "rise"
    }
   ]
  },
  {
   "say": "Radio waves are just ripples of energy traveling straight through the air.",
   "items": [
    {
     "type": "icon",
     "kit": "wifi",
     "size": 140,
     "at": 0.2,
     "float": 5,
     "x": 288,
     "y": 320,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Light-speed waves",
     "at": 0.7,
     "x": 288,
     "y": 460,
     "enter": "rise"
    },
    {
     "type": "label",
     "text": "Radio Spectrum",
     "sub": "invisible electromagnetic energy",
     "at": 1.1,
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
     "z": 1.08
    }
   }
  },
  {
   "say": "Wi-Fi vibrates at billions of cycles per second to carry all that information.",
   "items": [
    {
     "type": "pill",
     "text": "2.4 GHz = 2.4B/sec",
     "at": 0.3,
     "x": 200,
     "y": 230,
     "enter": "left",
     "style": {
      "background": "#2a8a00",
      "color": "#fff"
     }
    },
    {
     "type": "pill",
     "text": "5 GHz = 5.0B/sec",
     "at": 0.6,
     "x": 376,
     "y": 230,
     "enter": "right",
     "style": {
      "background": "#0066cc",
      "color": "#fff"
     }
    },
    {
     "type": "icon",
     "kit": "clock",
     "size": 80,
     "at": 0.9,
     "float": 3,
     "x": 288,
     "y": 440,
     "enter": "pop"
    }
   ]
  },
  {
   "say": "Your phone's antenna broadcasts these pulsing waves in every direction.",
   "items": [
    {
     "type": "icon",
     "id": "ph",
     "kit": "phone",
     "size": 100,
     "at": 0.2,
     "x": 100,
     "y": 380,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "id": "rt",
     "kit": "tower",
     "size": 100,
     "at": 0.5,
     "x": 466,
     "y": 380,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "id": "wave",
     "kit": "wifi",
     "size": 50,
     "at": 0.8,
     "x": 190,
     "y": 380,
     "enter": "pop",
     "to": [
      {
       "at": 0.9,
       "dur": 1.3,
       "x": 375,
       "y": 380,
       "ease": "inOut"
      }
     ]
    },
    {
     "type": "label",
     "text": "Broadcast Out",
     "sub": "pulsing across your room",
     "at": 1.1,
     "x": 288,
     "y": 540,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "The router's antenna catches that faint vibration in the air.",
   "items": [
    {
     "type": "icon",
     "kit": "check",
     "size": 60,
     "at": 0.4,
     "x": 466,
     "y": 260,
     "enter": "pop"
    },
    {
     "type": "pill",
     "text": "Signal captured",
     "at": 0.8,
     "x": 466,
     "y": 480,
     "enter": "rise",
     "style": {
      "background": "#9bd400"
     }
    }
   ]
  },
  {
   "say": "It decodes the wave patterns back into the exact same binary code.",
   "items": [
    {
     "type": "icon",
     "id": "rt2",
     "kit": "tower",
     "size": 110,
     "at": 0.2,
     "x": 160,
     "y": 350,
     "enter": "pop"
    },
    {
     "type": "icon",
     "id": "code1",
     "kit": "code",
     "size": 100,
     "at": 0.5,
     "x": 400,
     "y": 350,
     "enter": "pop"
    },
    {
     "type": "line",
     "color": "#2a8a00",
     "w": 4,
     "at": 0.8,
     "from": "rt2",
     "toId": "code1",
     "enter": "draw"
    },
    {
     "type": "label",
     "text": "Wave Demodulation",
     "sub": "pulses convert back into data",
     "at": 1.1,
     "x": 288,
     "y": 530,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Then, the router sends that data through physical fiber-optic cables.",
   "items": [
    {
     "type": "icon",
     "id": "rt3",
     "kit": "tower",
     "size": 90,
     "at": 0.2,
     "x": 100,
     "y": 360,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "icon",
     "id": "globe",
     "kit": "globe",
     "size": 90,
     "at": 0.5,
     "x": 470,
     "y": 360,
     "enter": "pop",
     "keep": true
    },
    {
     "type": "line",
     "color": "#0088ff",
     "w": 4,
     "at": 0.8,
     "from": "rt3",
     "toId": "globe",
     "enter": "draw",
     "keep": true
    },
    {
     "type": "pill",
     "text": "Physical glass cable",
     "at": 1.1,
     "x": 288,
     "y": 450,
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
   "say": "A remote server answers your request and fires the webpage back.",
   "items": [
    {
     "type": "icon",
     "kit": "server",
     "size": 80,
     "at": 0.3,
     "x": 470,
     "y": 230,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "document",
     "size": 46,
     "at": 0.7,
     "x": 380,
     "y": 360,
     "enter": "pop",
     "to": [
      {
       "at": 0.8,
       "dur": 1.2,
       "x": 190,
       "y": 360,
       "ease": "inOut"
      }
     ]
    },
    {
     "type": "label",
     "text": "Instant Response",
     "sub": "data traveling back to home",
     "at": 1.2,
     "x": 288,
     "y": 550,
     "enter": "rise"
    }
   ]
  },
  {
   "say": "The router instantly beams that response straight back into your phone.",
   "items": [
    {
     "type": "icon",
     "id": "rt4",
     "kit": "tower",
     "size": 90,
     "at": 0.2,
     "x": 100,
     "y": 380,
     "enter": "pop"
    },
    {
     "type": "icon",
     "id": "ph2",
     "kit": "phone",
     "size": 90,
     "at": 0.5,
     "x": 470,
     "y": 380,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "wifi",
     "size": 50,
     "at": 0.8,
     "x": 190,
     "y": 380,
     "enter": "pop",
     "to": [
      {
       "at": 0.9,
       "dur": 1.3,
       "x": 380,
       "y": 380,
       "ease": "inOut"
      }
     ]
    },
    {
     "type": "label",
     "text": "Back to You",
     "sub": "radio wave decoded on phone",
     "at": 1.2,
     "x": 288,
     "y": 540,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "This whole two-way radio chat happens thousands of times every second.",
   "items": [
    {
     "type": "text",
     "text": "20ms",
     "color": "#2a8a00",
     "size": 90,
     "at": 0.2,
     "x": 288,
     "y": 300,
     "enter": "pop"
    },
    {
     "type": "icon",
     "kit": "bolt",
     "size": 80,
     "at": 0.6,
     "float": 4,
     "x": 288,
     "y": 420,
     "enter": "pop"
    },
    {
     "type": "label",
     "text": "Near Instant",
     "sub": "faster than a blink of an eye",
     "at": 1,
     "x": 288,
     "y": 550,
     "enter": "rise"
    }
   ],
   "clear": true
  },
  {
   "say": "Follow for more simple explanations of the tech you use every day.",
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
     "type": "pill",
     "text": "+ Follow",
     "at": 0.8,
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
