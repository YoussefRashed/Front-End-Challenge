import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ProfileView from "../views/profile/ProfileView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/payment",
    name: "payment",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/payment/PaymentView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
