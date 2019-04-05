import Vue from "vue";
import Vuex from "vuex";
import Accounts from "./modules/accounts";
import Settings from "./modules/settings";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    accounts: Accounts,
    settings: Settings
  }
});
