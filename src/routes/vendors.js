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
        name:'product-create',
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
      //Sellers
       {
        path: "/vendor/sellers/list",
        name:'seller-list',
        component: () => import("../views/vendors/sellers/ListsSeller.vue"),
      },
      //Customer
        {
            path: "/vendor/sellers/customer",
            name:'customer-list',
            component: () => import("../views/vendors/customers/ListCustomers.vue"),
        },
      //   profile
        {
            path:'/profile',
            component:()=> import('../views/vendors/vendors_profile/ProfileVue.vue'),
        },
        {
            path:'/login-activities',
            component:()=> import('../views/vendors/vendors_profile/LogInActivityVue'),
        },
        {
            path:'/change-password',
            component:()=> import('../views/vendors/vendors_profile/ChangePasswordVue.vue'),
        },
        
        {
            path: "/customer/productdetail",
            name: "",
            component: () => import("../views/customers/product_item/product_details/ProductDetails.vue"),
        },

    ],
  },
]