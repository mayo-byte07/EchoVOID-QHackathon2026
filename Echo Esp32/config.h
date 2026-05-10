#ifndef CONFIG_H
#define CONFIG_H

// --- MIC PAIR A (I2S Bus 0) ---
// Captures Mic 1 (L/R to GND) and Mic 2 (L/R to 3.3V)
#define I2S_A_SCK 14
#define I2S_A_WS  15
#define I2S_A_SD  21

// --- MIC PAIR B (I2S Bus 1) ---
// Captures Mic 3 (L/R to GND) and Mic 4 (L/R to 3.3V)
#define I2S_B_SCK 18
#define I2S_B_WS  19
#define I2S_B_SD  23

// --- TACTICAL FEEDBACK ---
// Pin connected to the positive leg of your passive buzzer
#define BUZZER_PIN 25

// --- AUDIO DSP SETTINGS ---
#define SAMPLE_RATE   16000 
#define DMA_BUF_LEN   128   
#define DMA_BUF_COUNT 8     

#endif