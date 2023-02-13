import { defineStore } from "pinia";
import { ref } from "vue";

export const useAvatarStore = defineStore("avatar", () => {
  const idle = ref("");
  const speak = ref("");
  const blink = ref("");
  const blinkSpeak = ref("");
  const inputDevice = ref("");
  const grayscale = ref(false);
  const blinkEnabled = ref(true);
  const blinkSpeakEnabled = ref(true);
  const blinkDuration = ref(250);
  const blinkInterval = ref(15000);
  const threshold = ref(30);
  const inputs = ref([]);

  function updateInputDevice(name) {
    inputDevice.value = name;
  }

  function updateBlink(str) {
    blinkSpeak.value = str;
  }

  return {
    idle,
    speak,
    blink,
    blinkSpeak,
    inputDevice,
    grayscale,
    blinkEnabled,
    blinkSpeakEnabled,
    blinkDuration,
    blinkInterval,
    threshold,
    inputs,
    updateInputDevice,
    updateBlink,
  };
});
