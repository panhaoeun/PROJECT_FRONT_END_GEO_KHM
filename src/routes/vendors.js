import home from "../views/vendors/HomeView.vue";

export default [
  {
    path: "/vendors/dashboard",
    name: "vendors-index",
    meta: {template: 'panel'},
    children: [
      {
        path: "/home",
        name: "home",
        component: home,
      },
      {
        path: "/vendor/dashboard",
        name:'vendor-dashboard',
        component: () => import("../views/vendors/dashboard/VenDashboard.vue"),
      },
      //Products
      {
        path: "/vendor/products/list",
        name:'products-list',
        component: () => import("../views/vendors/products/ProductList.vue"),
      },
      {
        path: "/vendor/products/create",
        name:'product',
        component: () => import("../views/vendors/products/ProductCreate.vue"),
      },
      {
        path: "/vendor/products/product_list/edit/:id",
        name:'product',
        component: () => import("../views/vendors/products/ProductUpdated.vue"),
      },
      //Category 
      {
        path: "/vendor/products/category/list",
        name:'product-category',
        component: () => import("../views/vendors/category/CategoryView.vue"),
      },
      {
        path: "/vendor/products/category/create",
        name:'product-category-create',
        component: () => import("../views/vendors/category/CategoryCreate.vue"),
      },
      {
        path: "/vendor/products/category/edit/:id",
        name:'product-category-edit',
        component: () => import("../views/vendors/category/UpdatedProductCategory.vue"),
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
      },
      {
        path: "/vendor/shop/edit/:id",
        name:'shop-updated',
        component: () => import("../views/vendors/shops/ShopInfoUpdated.vue"),
      },
    //   order list 
     //   order 
     {
        path: "/vendor/order-list",
        name:'order-list',
        component: () => import('../views/vendors/order/OrderList.vue'),
      },
       {
        path: "/vendor/order-invoice",
        name:'invoice-detail',
        component: () => import('../views/vendors/order/InvoiceDetailView.vue'),
      }

    ],
  },
]