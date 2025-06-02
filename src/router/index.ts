import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "../layouts/Main.vue";
import ROUTE_NAMES from "./routeNames";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: ROUTE_NAMES.HOME,
        component: () => import("../views/Home.vue"),
        meta: {
          title: "home.title",
          auth: true
        }
      },
      {
        path: "/:pathMatch(.*)*",
        name: ROUTE_NAMES.NOT_FOUND,
        component: () => import("../views/NotFound.vue")
      }
    ]
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "nav-item active"
});

export default router;
