import { firestore, auth } from "@/middlewares/firebase";

const state = {
  accounts: {}
};

const mutations = {
  loadAccounts(state, accounts) {
    state.accounts = accounts;
  },
  addAccount(state, account) {
    const { id, ...rest } = account;
    state.accounts = Object.assign({}, state.accounts, { [id]: rest });
  }
};

const actions = {
  getAccounts({ commit }) {
    const currentUser = auth.currentUser;

    firestore
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Accounts")
      .get()
      .then(querySnapshot => {
        let accounts = {};

        querySnapshot.forEach(doc => {
          accounts = Object.assign(accounts, { [doc.id]: doc.data() });
        });

        commit("loadAccounts", accounts);
      });
  },
  addAccount({ commit }, account) {
    const currentUser = auth.currentUser;

    firestore
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Accounts")
      .add(account)
      .then(function(docRef) {
        const formattedAccount = {
          id: docRef.id,
          ...account
        };

        commit("addAccount", formattedAccount);
        console.log("Document written", docRef);
      })
      .catch(function(error) {
        console.error("Error adding document", error);
      });
  }
};

const getters = {
  accountList(state) {
    return Object.keys(state.accounts).map(key => ({
      key,
      ...state.accounts[key]
    }));
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
