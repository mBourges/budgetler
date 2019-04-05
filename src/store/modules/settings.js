import { firestore, auth } from "@/middlewares/firebase";

const state = {
  baseCurrency: null,
  additionalCurrencies: []
};

const mutations = {
  updateBaseCurrency(state, baseCurrencyInformation) {
    state.baseCurrency = baseCurrencyInformation;
    console.log('store', state)
  },
  updateAdditionalCurrencies(state, additionalCurrenciesInformation) {
    state.additionalCurrencies = additionalCurrenciesInformation;
    console.log('store', state)
  }
};

const actions = {
  getSettings({ commit }) {
    const currentUser = auth.currentUser;
    firestore.collection("Users").doc(currentUser.uid).get()
    .then(doc => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          const { baseCurrency, additionalCurrencies }  = doc.data();
          commit("updateBaseCurrency", baseCurrency);
          commit("updateAdditionalCurrencies", additionalCurrencies);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    })
  },
  saveSettings({ state }) {
    const currentUser = auth.currentUser;

    firestore.collection("Users").doc(currentUser.uid).set(state, { merge: true })
      .then(function(docRef) {
          console.log("Document written", docRef);
      })
      .catch(function(error) {
          console.error("Error adding document", error);
      });
  }
}

const getters = {
  userCurrencies: (state) => {
    return [ state.baseCurrency, ...state.additionalCurrencies ];
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
