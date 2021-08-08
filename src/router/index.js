import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import AddLink from "@/views/AddLink";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/add-link", name: "add-link", component: AddLink },
];

export const router = new VueRouter({
  mode: "history",
  routes,
});
