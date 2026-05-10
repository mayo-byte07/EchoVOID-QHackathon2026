# EchoVOID

> **QHackathon 2026 Project** — Short-distance loud clap detection system with spatial audio visualization.

A full-stack IoT project combining ESP32-based acoustic sensing with a modern Next.js web interface for real-time event visualization and analytics.

---

## Architecture

```
┌─────────────────┐      WiFi/Serial       ┌─────────────────┐
│   ESP32 + 4x    │ ─────────────────────> │   Next.js App   │
│   INMP441 Mics  │      Clap Events       │   (Dashboard)   │
└─────────────────┘                        └─────────────────┘
                                                    │
                                                    ▼
                                           ┌─────────────────┐
                                           │    Supabase     │
                                           │  (Events DB)    │
                                           └─────────────────┘
```

---

## Hardware (ESP32)

### Components
| Part | Quantity | Purpose |
|------|----------|---------|
| ESP32 DevKit | 1 | Main controller |
| INMP441 I2S Mic | 4 | Quad-channel audio capture |
| Passive Buzzer | 1 | Tactile feedback |

### Pinout
```cpp
// Mic Pair A (I2S Bus 0)
I2S_A_SCK = 14   // Bit Clock
I2S_A_WS  = 15   // Word Select
I2S_A_SD  = 21   // Serial Data

// Mic Pair B (I2S Bus 1)
I2S_B_SCK = 18
I2S_B_WS  = 19
I2S_B_SD  = 23

// Buzzer
BUZZER_PIN = 25
```

### Key Parameters
```cpp
int CLAP_THRESHOLD = 25000;  // Detection sensitivity (higher = louder required)
int BUZZ_DURATION  = 150;    // Feedback duration (ms)
```

---

## Web Application

### Tech Stack
- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS v4
- **3D Viz**: React Three Fiber + Three.js
- **Maps**: MapLibre GL
- **State**: Zustand
- **Database**: Supabase

### Installation

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start dev server
npm run dev
```

---

## Project Structure

```
echo-void-web/
├── Echo Esp32/
│   ├── Echo.ino          # Main firmware
│   └── config.h          # Pin & audio settings
├── src/
│   ├── app/              # Next.js routes
│   ├── components/       # React components
│   ├── store/            # Zustand state
│   └── lib/              # Utilities
├── public/               # Static assets
└── package.json
```

---

## How It Works

1. **Audio Capture**: 4x INMP441 microphones stream 16kHz audio via dual I2S buses
2. **Detection**: ESP32 compares peak amplitude against `CLAP_THRESHOLD`
3. **Feedback**: Buzzer sounds for 150ms on valid detection
4. **Transmission**: Events sent to web dashboard via WebSocket/Serial
5. **Visualization**: 3D spatial map shows clap location and intensity

---

## License

MIT — Built for QHackathon 2026
