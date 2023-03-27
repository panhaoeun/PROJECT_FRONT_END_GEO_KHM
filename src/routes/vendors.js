import home from "../views/vendors/HomeView.vue";

export default [
  {
    path: "/vendors/dashboard",
    name: "customer-index",
    meta: {template: 'panel'},
    children: [
      {
        path: "/home",
        name: "home",
        component: home,
      },
      {
        path:'/category', 
        component:()=> import('../views/vendors/category/CategoryView.vue'),
      },
      {
        path: "/user",
        name:'user',
        component: () => import("../views/vendors/users/UserListView.vue"),
      },
      {
        path: "/i",
        name:'i',
        component: () => import("../views/vendors/users/MyAccount.vue"),
      },
      {
        path: "/product",
        name:'product',
        component: () => import("../views/vendors/products/ProductView.vue"),
      },
      {
        path:'/profile',
        component:()=> import('../views/vendors/profile/ProfileVue.vue'),
      },
      {
        path: "/customer/productdetail",
        name: "",
        component: () => import("../views/customers/ProductDetail.vue"),
    },
     
    ],
  },
  
]