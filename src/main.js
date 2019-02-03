import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./plugins/vuetify";
// import Vuetify, {
//   VApp,
//   VBtn,
//   VNavigationDrawer,
//   VToolbar,
//   VContent,
//   VContainer,
//   VFooter,
//   VToolbarSideIcon,
//   VToolbarTitle,
//   VSpacer,
//   VIcon
// } from "vuetify/lib";
// import { Ripple } from "vuetify/lib/directives";

// import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

// Vue.use(Vuetify, {
//   iconfont: "mdi",
//   components: {
//     VApp,
//     VBtn,
//     VNavigationDrawer,
//     VToolbar,
//     VContent,
//     VContainer,
//     VFooter,
//     VToolbarSideIcon,
//     VToolbarTitle,
//     VSpacer,
//     VIcon
//   },
//   directives: { Ripple }
// });

Vue.config.productionTip = false;

let app = null;
const config = {
  apiKey: "AIzaSyCI_rYJz_PfJlVZlH70UbaVvM21kFc-zPA",
  authDomain: "budgetler-app.firebaseapp.com",
  databaseURL: "https://budgetler-app.firebaseio.com",
  projectId: "budgetler-app",
  storageBucket: "budgetler-app.appspot.com",
  messagingSenderId: "322467053446"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
