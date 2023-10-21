import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/PostListView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignupView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/post",
    beforeEnter(to, from, next) {
      next("/");
    },
  },
  {
    path: "/post/create",
    name: "post-create",
    component: () =>
      import(
        /* webpackChunkName: "create-post" */ "../views/PostCreateView.vue"
      ),
  },
  {
    path: "/post/:id",
    name: "post",
    component: () =>
      import(/* webpackChunkName: "post" */ "../views/PostDetailView.vue"),
  },
  {
    path: "/post/:id/edit",
    name: "post-edit",
    component: () =>
      import(/* webpackChunkName: "edit-post" */ "../views/PostEditView.vue"),
  },
  {
    path: "/user",
    beforeEnter(to, from, next) {
      next("/");
    },
  },
  {
    path: "/user/:id",
    name: "user-profile",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/UserView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
