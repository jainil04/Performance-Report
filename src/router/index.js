import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import UrlRunnerPage from "../pages/UrlRunnerPage.vue";
import CompareCsvPage from "../pages/CompareCsvPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/url-runner", component: UrlRunnerPage },
  { path: "/compare-csv", component: CompareCsvPage },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
