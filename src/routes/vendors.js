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
      //Products
      {
        path: "/vendor/products",
        name:'products-list',
        component: () => import("../views/vendors/products/ProductList.vue"),
      },
      {
        path: "/vendor/products/create",
        name:'product',
        component: () => import("../views/vendors/products/ProductCreate.vue"),
      },
      {
        path: "/vendor/products-tabs/eng-tab",
        name:'products',
        component: () => import("../views/vendors/products/tabs/ProductTabsEng.vue"),
      },
      {
        path: "/vendor/products/category/list",
        name:'product-category',
        component: () => import("../views/vendors/category/CategoryView.vue"),
      },
      {
        path: "/vendor/products/type/list",
        name:'product-types-list',
        component: () => import("../views/vendors/product_type/ProductTypesView.vue"),
      },
      //My Shops
      {
        path: "/vendor/shop/list",
        name:'shop-list',
        component: () => import("../views/vendors/shops/ShopInfoView.vue"),
      },
      {
        path: "/vendor/shop/create",
        name:'shop-create',
        component: () => import("../views/vendors/shops/ShopInfoCreate.vue"),
      }
    ],
  },
]