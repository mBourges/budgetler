<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login to your budgtler</v-toolbar-title>
              </v-toolbar>
              <v-form @submit.prevent="login">
                <v-card-text>
                  <v-text-field
                    autofocus
                    v-model="email"
                    prepend-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" color="primary">Login</v-btn>
                </v-card-actions>
              </v-form>
              <v-card-text>
                or Sign In with
                <v-btn
                  color="primary"
                  class="white--text"
                  @click="loginWithGoogle"
                >
                  <v-icon left dark>mdi-google</v-icon>
                  Google
                </v-btn>
              </v-card-text>
              <v-card-text>
                <p>
                  You don't have an account? You can
                  <router-link to="/sign-up">create one</router-link>.
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("dashboard");
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    },
    loginWithGoogle: function() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace("dashboard");
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    }
  }
};
</script>
