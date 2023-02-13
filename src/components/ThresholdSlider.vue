<script setup>
import { ref } from "vue";
import { useAvatarStore } from "../store/index.js";

const store = useAvatarStore();

const min = ref(-80);
const max = ref(0);
</script>

<template>
  <v-slider
    v-model="store.threshold"
    :max="max"
    :min="min"
    :step="1"
    hide-details
  >
    <template v-slot:append>
      <v-text-field
        label="Mic Threshold"
        v-model="store.threshold"
        hide-details
        density="compact"
        type="number"
        readonly
        style="width: 115px"
      ></v-text-field>
    </template>
  </v-slider>
</template>
