import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import IndexView from "@/views/IndexView.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import CartView from "@/views/CartView.vue";
import OrdersView from "@/views/OrdersView.vue";
import LoginView from "@/views/LoginView.vue";
import UserDataView from "@/views/UserDataView.vue";
import PopupView from "@/views/PopupView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: IndexView,
    },
    {
      path: "/welcome",
      name: "Welcome",
      component: WelcomeView,
    },
    {
      path: "/main",
      name: "Main",
      component: MainView,
    },
    {
      path: "/cart",
      name: "Cart",
      component: CartView,
    },
    {
      path: "/orders",
      name: "Orders",
      component: OrdersView,
    },
    {
      path: "/sign-in",
      name: "SignIn",
      component: LoginView,
    },
    {
      path: "/user-data",
      name: "UserData",
      component: UserDataView,
    },
    {
      path: "/popup",
      name: "Popup",
      component: PopupView,
    },
  ],
});

export default router;
