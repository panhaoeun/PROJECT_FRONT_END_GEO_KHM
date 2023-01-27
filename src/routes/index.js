import { createRouter, createWebHistory } from "vue-router";

// import Dashboard from "../views/master/DashboardView.vue";
import home from "../views/HomeView.vue";
// import profile from "../views/ProfileView.vue";
// import login from "../views/auth/LoginView.vue";
// import Main from "../views/MainView.vue";
// import MainDashboard from "../views/master/MainDashboard.vue";

const routes = [
  {
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
        path:'/category', 
        component:()=> import('../views/category/CategoryView.vue'),
      },
      {
        path: "/user",
        name:'user',
        component: () => import("../views/users/UserListView.vue"),
      },
      {
        path: "/product",
        name:'product',
        component: () => import("../views/products/ProductView.vue"),
      },
      {
        path:'/profile',
        component:()=> import('../views/setting/ProfileView.vue'),
      }
    ],
  },
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
