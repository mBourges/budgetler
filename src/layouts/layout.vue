<template>
  <v-app>
    <v-navigation-drawer app clipped width="200" v-model="isOpen">
      <v-list>
        <v-list-tile to="dashboard">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="accounts">
          <v-list-tile-action>
            <v-icon>account_balance</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Accounts</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="transactions">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Transactions</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="budget">
          <v-list-tile-action>
            <v-icon>donut_large</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Budget</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="settings">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app clipped-left dark color="primary">
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        Budgetler - {{ routeName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="addTransaction"><v-icon>add</v-icon> Transaction</v-btn>
      <v-btn icon @click="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app color="grey" class="lighten-2 justify-center">
      &copy;2019 — <strong>Budgetler</strong>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "layout",
  data() {
    return {
      isOpen: null
    };
  },
  computed: {
    routeName: function() {
      return this.$route.name;
    }
  },
  methods: {
    toggleDrawer: function() {
      this.isOpen = !this.isOpen;
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  }
};
</script>
