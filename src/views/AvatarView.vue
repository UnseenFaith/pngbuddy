<script setup>
import { useAvatarStore } from "../store/index.js";
import OBSWebSocket, { EventSubscription } from "obs-websocket-js";
import { ref } from "vue";

const store = useAvatarStore();
const speaking = ref(false);
const blinking = ref(false);
const muted = ref(false);

const obs = new OBSWebSocket();

obs.on("InputVolumeMeters", ({ inputs }) => {
  const input = inputs.filter((i) => i.inputName == store.inputDevice)[0];
  if (!input) return;
  const currentVolume = 20 * Math.log10(input.inputLevelsMul[0][0]);
  if (currentVolume > store.threshold) {
    speaking.value = true;
  } else {
    speaking.value = false;
  }
});

obs.on("InputMuteStateChanged", (input) => {
  if (input.inputName == store.inputDevice) {
    muted.value = input.inputMuted;
  }
});

obs.on("InputCreated", (input) => {
  if (!input.inputKind.startsWith("wasapi")) return;
  store.$patch({
    inputs: [...store.inputs, input.inputName],
  });
});

obs.on("InputNameChanged", (input) => {
  if (store.inputDevice == input.oldInputName) {
    store.inputDevice = input.inputName;
  }
  store.$patch({
    inputs: [
      ...store.inputs.filter((i) => i != input.oldInputName),
      input.inputName,
    ],
  });
});

async function connectToOBS(password, port) {
  try {
    await obs.connect("ws://127.0.0.1:" + port, password, {
      eventSubscriptions:
        EventSubscription.Inputs | EventSubscription.InputVolumeMeters,
    });

    const { inputs } = await obs.call("GetInputList");
    const audioInputs = inputs.filter((i) => i.inputKind.startsWith("wasapi"));
    store.inputs = audioInputs.map((i) => i.inputName);
  } catch (err) {
    console.error(err);
  }
}

// Set up blinking interval
setInterval(() => {
  if (blinking.value) return;
  blinking.value = true;
  setTimeout(() => {
    blinking.value = false;
  }, store.blinkDuration);
}, store.blinkInterval);

await connectToOBS(store.password, store.port);
</script>

<template>
  <v-container fluid>
    <div class="imgWrap">
      <div class="image">
        <v-img
          width="1920"
          height="1080"
          :class="speaking ? 'inactive' : 'active'"
          v-bind:src="store.idle"
        ></v-img>
      </div>
      <div class="image">
        <v-img
          width="1920"
          height="1080"
          :class="speaking ? 'active' : 'inactive'"
          v-bind:src="store.speak"
        ></v-img>
      </div>
      <div class="image">
        <v-img
          width="1920"
          height="1080"
          :class="
            !speaking && blinking && store.blinkEnabled ? 'active' : 'inactive'
          "
          v-bind:src="store.blink"
        ></v-img>
      </div>
      <div class="image">
        <v-img
          width="1920"
          height="1080"
          :class="
            speaking && blinking && store.blinkSpeakEnabled
              ? 'active'
              : 'inactive'
          "
          v-bind:src="store.blinkSpeak"
        ></v-img>
      </div>
      <div class="image">
        <v-img
          width="1920"
          height="1080"
          :class="store.grayscale && muted ? 'grayscale active' : 'inactive'"
          v-bind:src="store.idle"
        ></v-img>
      </div>
    </div>
  </v-container>
</template>

<style>
html {
  overflow-y: hidden !important;
}

.v-application {
  background-color: transparent;
}

.imgWrap {
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.image {
  position: absolute;
}

.active {
  opacity: 1;
}

.inactive {
  opacity: 0;
}

.grayscale {
  filter: grayscale(1);
}
</style>
