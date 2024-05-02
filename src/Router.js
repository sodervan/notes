import { createRouter, createWebHistory } from "vue-router";
import AllNotes from "./Pages/AllNotes.vue";
import myNotes from "./Pages/MyNotes.vue";
import Favourites from "./Pages/Favourites.vue";
import RecentlyDeleted from "./Pages/RecentlyDeleted.vue";
import Signup from "./Auth/Signup.vue";
import Login from "./Auth/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: "/", redirect: "/allnotes" },
    { path: "/notes4you", redirect: "/signup" },
    { path: "/login", component: Login, name: "login" },
    { path: "/signup", component: Signup, name: "signup" },
    {
      path: "/recentlydeleted",
      component: RecentlyDeleted,
      name: "recentlydeleted",
    },
    { path: "/favourites", component: Favourites },
    { path: "/allnotes", component: AllNotes, name: "allnotes" },
    { path: "/mynotes", component: myNotes },
  ],
});

export default router;
