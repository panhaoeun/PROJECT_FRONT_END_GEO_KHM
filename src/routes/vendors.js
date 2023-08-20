import DefaultLayoutVendor from "../components/layouts/vendors/DefaultLayouts.vue";

/*
  @Default Routes
*/ 
const defaultChildRoutes = (prefix) => [
    /**@User Managements**/
    {
        path: '/vendor-dashboard/default-layouts',
        // redirect: '/vendor/product_managements/index',
        name: prefix + '.dashboard_modules',
        meta: {
            title: 'dashboard',
            icon: 'dashboard',
            noCache: false,
            permissions: ['dashboard_module']
        },
        component: () => import('../dashboard/DashboardLayout.vue'),
    },
    {
        path: '/vendor-profile/vendor-profile/:currentUserId',
        name: prefix + '.vendor_profile_info',
        meta: {
            title: 'vendorProfile',
            icon: 'vendorProfile',
            noCache: false,
            permissions: ['vendor_profile']
        },
        hidden: true,
        component: () => import('../views/vendors/vendors_profile/ProfileVue.vue'),
    }
];
export default [
<<<<<<< HEAD
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
      //================Category============
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
      /*Sub Category*/
      {
         path: "/vendor/products/sub-category/list",
        name:'sub-product-category-list',
        component: () => import("../views/vendors/category/sub_category/SubCategoryView.vue"),
      },
      {
        path: "/vendor/products/sub-category/create",
        name:'product-sub-category-create',
        component: () => import("../views/vendors/category/sub_category/SubCategoryCreate.vue"),
      },
      {
        path: "/vendor/products/sub-category/edit/:id",
        name:'product-sub-category-edit',
        component: () => import("../views/vendors/category/sub_category/UpdatedProductSubCategory.vue"),
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
=======
    {
        meta: {
            template: 'panel',
            icon: 'icons',
            permissions: ['home_modules'],
            title: 'homeModule'
        },
        path: "/vendor-dashboard/default-layouts",
        name: "home-vendor-dashboard",
        component: DefaultLayoutVendor,
        alwaysShow: true,
        // redirect: '/vendor-dashboard/default-layouts/dashboard',
        children: defaultChildRoutes('defaults'), 
    }
];
>>>>>>> main
