import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCI_rYJz_PfJlVZlH70UbaVvM21kFc-zPA",
  authDomain: "budgetler-app.firebaseapp.com",
  databaseURL: "https://budgetler-app.firebaseio.com",
  projectId: "budgetler-app",
  storageBucket: "budgetler-app.appspot.com",
  messagingSenderId: "322467053446"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();