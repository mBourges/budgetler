import Vue from "vue";
import { auth } from "./middlewares/firebase";
import App from "./layouts/App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./plugins/vuetify";

Vue.config.productionTip = false;

let app = null;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      created() {
        this.$store.dispatch("settings/getSettings");
        this.$store.dispatch("accounts/getAccounts");
      },
      render: h => h(App)
    }).$mount("#app");
  }
});
