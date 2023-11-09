import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/PostListView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignupView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/post",
    redirect: "/",
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      next("/");
    },
  },
  {
    path: "/post/create",
    name: "post-create",
    component: () => import("../views/PostCreateView.vue"),
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("../views/PostDetailView.vue"),
  },
  {
    path: "/post/:id/edit",
    name: "post-edit",
    component: () => import("../views/PostEditView.vue"),
  },
  {
    path: "/user",
    redirect: "/login",
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      next("/login");
    },
  },
  {
    path: "/user/:id",
    name: "user-profile",
    component: () => import("../views/UserView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
