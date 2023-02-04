import { createRouter, createWebHistory } from "vue-router";
import home from "../views/HomeView.vue";

const routes = [
  {
    // dashboard
    path: "/",
    name: "mainlayout",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("../components/ExampleForm"),
      },
      {
        path: "/home",
        name: "home",
        component: home,
      },
      {
        path: "/category",
        component: () => import("../views/category/CategoryView.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/users/UserListView.vue"),
      },
      {
        path: "/product",
        name: "product",
        component: () => import("../views/products/ProductView.vue"),
      },
      {
        path: "/product/addproduct",
        component: () => import("../views/products/AddProductView.vue"),
      },
      {
        path: "/profile",
        component: () => import("../views/setting/ProfileView.vue"),
      },
      {
        path: "/i",
        component: () => import("../views/users/MyAccount.vue"),
      },
    ],
  },

  {
    path:'/login',
    component:()=> import('../views/auth/LoginView.vue'),
  },
  {
    path:'/register',
    component:()=> import('../views/auth/RegisterView.vue'),
  }
];

const router = Router();
export default router;
function Router() {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  return router;
}
