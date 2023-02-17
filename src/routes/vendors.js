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
        path: "/product",
        name:'product',
        component: () => import("../views/vendors/products/ProductView.vue"),
      },
      {
        path:'/profile',
        component:()=> import('../views/vendors/setting/ProfileView.vue'),
      },
      {
        path: "/customer/productdetail",
        name: "",
        component: () => import("../views/customers/product_item/product_details/ProductDetails.vue"),
      },
      {
        path: "/seller-vendor-list",
        name: "",
        component: () => import("../views/vendors/sellers/listSeller.vue"),
      },
      {
        path: "/seller-vendor-add",
        name: "",
        component: () => import("../views/vendors/sellers/addSeller.vue"),
      },
    ],
  },
]