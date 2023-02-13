import { createApp, watch } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import { PiniaSharedState } from "pinia-shared-state";

loadFonts();

const pinia = createPinia();

var avatarState = localStorage.getItem("avatarState");
if (avatarState) {
  pinia.state.value.avatar = JSON.parse(avatarState);
}

watch(
  () => pinia.state.value.avatar,
  (state) => {
    try {
      localStorage.setItem("avatarState", JSON.stringify(state));
    } catch (err) {
      console.error(err);
    }
  },
  {
    deep: true,
  }
);

pinia.use(
  PiniaSharedState({
    enable: true,
    initialize: true,
    type: "idb",
  })
);

createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
