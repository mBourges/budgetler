import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

import Layout from "./layouts/layout.vue";
import Dashboard from "./pages/dashboard.vue";
import Login from "./pages/login.vue";
import SignUp from "./pages/signUp.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          redirect: "/login"
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "accounts",
          name: "accounts",
          component: () =>
            import(/* webpackChunkName: "accounts" */ "./pages/accounts.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: "transactions",
          name: "transactions",
          component: () =>
            import(/* webpackChunkName: "transactions" */ "./pages/transactions.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: "budget",
          name: "budget",
          component: () =>
            import(/* webpackChunkName: "budget" */ "./pages/budget.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: "settings",
          name: "settings",
          component: () =>
            import(/* webpackChunkName: "settings" */ "./pages/settings.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: "addTransaction",
          name: "addTransaction",
          component: () =>
            import(/* webpackChunkName: "settings" */ "./pages/addTransaction.vue"),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUp
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.requireAuth);

  if (requireAuth && !currentUser) {
    next("login");
  } else if (!requireAuth && currentUser) {
    next("dashboard");
  } else {
    next();
  }
});

export default router;
