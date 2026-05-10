/* ECHO VOID - Short Distance Loud Clap Detector
   Hardware: ESP32 + 4x INMP441 + Buzzer
   Purpose: Ignores surround sound, triggers only on loud, close-range impacts.
*/

#include <driver/i2s.h>
#include "config.h"

int32_t buf_A[DMA_BUF_LEN * 2];
int32_t buf_B[DMA_BUF_LEN * 2];

// ==========================================
// 🎯 SENSITIVITY TUNING (CHANGE THESE)
// ==========================================
// Raise this number to make it require a LOUDER/CLOSER clap.
// Lower this number if it's missing your claps.
int CLAP_THRESHOLD = 25000; 

// How long the buzzer stays on after a clap (in milliseconds)
int BUZZ_DURATION = 150; 
// ==========================================

unsigned long buzzerTimer = 0;
bool isBuzzing = false;

void setup_i2s_drivers() {
  i2s_config_t i2s_config = {
    .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
    .sample_rate = SAMPLE_RATE,
    .bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT,
    .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT,
    .communication_format = I2S_COMM_FORMAT_STAND_I2S,
    .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
    .dma_buf_count = DMA_BUF_COUNT,
    .dma_buf_len = DMA_BUF_LEN,
    .use_apll = false
  };

  i2s_driver_install(I2S_NUM_0, &i2s_config, 0, NULL);
  i2s_pin_config_t pins0 = {.mck_io_num=-1, .bck_io_num=I2S_A_SCK, .ws_io_num=I2S_A_WS, .data_out_num=-1, .data_in_num=I2S_A_SD};
  i2s_set_pin(I2S_NUM_0, &pins0);

  i2s_driver_install(I2S_NUM_1, &i2s_config, 0, NULL);
  i2s_pin_config_t pins1 = {.mck_io_num=-1, .bck_io_num=I2S_B_SCK, .ws_io_num=I2S_B_WS, .data_out_num=-1, .data_in_num=I2S_B_SD};
  i2s_set_pin(I2S_NUM_1, &pins1);
}

void setup() {
  Serial.begin(115200);
  delay(1500); 

  ledcAttach(BUZZER_PIN, 2000, 8); 
  setup_i2s_drivers();             
  
  Serial.println("\n=== CLAP DETECTOR READY ===");
  Serial.print("Requires a peak above: ");
  Serial.println(CLAP_THRESHOLD);
}

void loop() {
  size_t bytes_A, bytes_B;
  
  i2s_read(I2S_NUM_0, &buf_A, sizeof(buf_A), &bytes_A, 5);
  i2s_read(I2S_NUM_1, &buf_B, sizeof(buf_B), &bytes_B, 5);

  if (bytes_A > 0 && bytes_B > 0) {
    int32_t m1 = abs(buf_A[0] >> 14);
    int32_t m2 = abs(buf_A[1] >> 14);
    int32_t m3 = abs(buf_B[0] >> 14);
    int32_t m4 = abs(buf_B[1] >> 14);

    int current_peak = max(max(m1, m2), max(m3, m4));

    // --- 1. CLAP DETECTION LOGIC ---
    if (current_peak > CLAP_THRESHOLD && !isBuzzing) {
      ledcWriteTone(BUZZER_PIN, 1500); // Turn buzzer ON
      buzzerTimer = millis();          // Start the stopwatch
      isBuzzing = true;
      
      Serial.print("💥 CLAP! Power: ");
      Serial.println(current_peak);
    }

    // --- 2. BUZZER SHUTOFF LOGIC ---
    // If it's currently buzzing, and the duration has passed, turn it off
    if (isBuzzing && (millis() - buzzerTimer > BUZZ_DURATION)) {
      ledcWriteTone(BUZZER_PIN, 0); // Turn buzzer OFF
      isBuzzing = false;
    }

    // --- 3. BACKGROUND NOISE MONITOR (Prints every 2 seconds) ---
    static unsigned long lastLog = 0;
    if (millis() - lastLog > 2000) {
      Serial.print("Background noise floor: ");
      Serial.println(current_peak);
      lastLog = millis();
    }
  }
}