<script setup>
import { useAvatarStore } from "../store/index";

import ThresholdSlider from "@/components/ThresholdSlider.vue";

const store = useAvatarStore();

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

async function onIdleChange([file]) {
  try {
    store.idle = await convertToBase64(file);
  } catch (err) {
    alert(err);
  }
}

async function onSpeakChange([file]) {
  try {
    store.speak = await convertToBase64(file);
  } catch (err) {
    alert(err);
  }
}

async function onBlinkChange([file]) {
  try {
    store.blink = await convertToBase64(file);
  } catch (err) {
    alert(err);
  }
}

async function onBlinkSpeakChange([file]) {
  try {
    store.blinkSpeak = await convertToBase64(file);
  } catch (err) {
    alert(err);
  }
}

function updateBlinkInterval(number) {
  store.blinkInterval = parseInt(number);
}

function updateBlinkDuration(number) {
  store.blinkDuration = parseInt(number);
}
</script>

<template>
  <div class="about">
    <h1>
      <center>Settings</center>
    </h1>
    <v-container>
      <v-row no-gutters>
        <v-col>
          <v-container>
            <v-select
              label="Input Device"
              color="success"
              :items="store.inputs"
              :model-value="store.inputDevice"
              @update:model-value="store.updateInputDevice"
            />
            <v-checkbox
              color="success"
              v-model="store.grayscale"
              label="Grayscale Mute"
            />
            <v-checkbox
              label="Blinking"
              color="success"
              v-model="store.blinkEnabled"
            />
            <v-checkbox
              label="Blinking while Speaking"
              color="success"
              v-model="store.blinkSpeakEnabled"
            />
            <v-text-field
              label="Blink Duration (in milliseconds)"
              color="success"
              type="number"
              v-model="store.blinkDuration"
              @update:model-value="updateBlinkDuration"
            />
            <v-text-field
              label="Blink Interval (in milliseconds)"
              color="success"
              type="number"
              v-model="store.blinkInterval"
              @update:model-value="updateBlinkInterval"
            />
            <ThresholdSlider />
          </v-container>
        </v-col>
        <v-col>
          <v-container>
            <v-file-input
              label="Idle Image"
              accept="image/*"
              @update:model-value="onIdleChange"
            />
            <v-file-input
              label="Speaking Image"
              accept="image/*"
              @update:model-value="onSpeakChange"
            />
            <v-file-input
              label="Blinking Image"
              accept="image/*"
              @update:model-value="onBlinkChange"
            />
            <v-file-input
              label="Blinking while Speaking Image"
              accept="image/*"
              @update:model-value="onBlinkSpeakChange"
            />
            <v-text-field label="Websocket Password" />
            <v-text-field label="Websocket Port" />
          </v-container>
        </v-col>
        <v-responsive width="100%" />
      </v-row>
    </v-container>
  </div>
</template>
