import DefaultLayoutVendor from "../components/layouts/vendors/DefaultLayouts.vue";

/*
  @Default Routes
*/ 
const defaultChildRoutes = (prefix) => [
     /*
     @Dashboard Managements
    */
    {
        path:'/vendor-dashboard/default-layouts',
        name: prefix + '.dashboard',
        meta: { auth: true, name: 'Home', isBanner: false, title: 'Dashboard | 7Day' },
        component:()=> import('../dashboard/DashboardLayout.vue'),
    },
    /*
     @Authentications Managements
    */
    //   profile
    {
        path:'/profile',
        name: prefix + '.ven-profile',
        component:()=> import('../views/vendors/vendors_profile/ProfileVue.vue'),
    },
    {
        path:'/login-activities',
        component:()=> import('../views/vendors/vendors_profile/LogInActivityVue'),
    },
    {
        path: prefix + '/change-password',
        component:()=> import('../views/vendors/vendors_profile/ChangePasswordVue.vue'),
    },
    /*
     @Products Managements
    */
    {
        path: "/vendor/products/list",
        name: prefix + '.products-list',
        meta: {
         title: 'Products | 7Day'   
        },
        component: () => import("../views/vendors/products/ProductList.vue"),
    },
    {
        path: "/vendor/products/create",
        name: prefix + '.product-create',
        meta: {
             title: 'Products Create| 7Day'
         },
        component: () => import("../views/vendors/products/ProductCreate.vue"),
    },
    {
        path: "/vendor/products/product_list/edit/:id",
        name: prefix + '.product-edit',
        component: () => import("../views/vendors/products/ProductUpdated.vue"),
    },
    /*
      @Categories Managements
    */
    {
        path: "/vendor/products/category/list",
        name: prefix + '.product-category-list',
        component: () => import("../views/vendors/category/CategoryView.vue"),
    },
    {
        path: "/vendor/products/category/create",
        name: prefix + '.product-category-create',
        component: () => import("../views/vendors/category/CategoryCreate.vue"),
    },
    {
        path: "/vendor/products/category/edit/:id",
        name: prefix + '.product-category-edit',
        component: () => import("../views/vendors/category/UpdatedProductCategory.vue"),
    },
    /*Sub Category*/
    {
        path: "/vendor/products/sub-category/list",
        name:prefix + '.sub-product-category-list',
        component: () => import("../views/vendors/category/sub_category/SubCategoryView.vue"),
    },
    {
        path: "/vendor/products/sub-category/create/:superCatID",
        name:prefix + '.product-sub-category-create',
        component: () => import("../views/vendors/category/sub_category/SubCategoryCreate.vue"),
    },
    {
        path: "/vendor/products/sub-category/edit/:id",
        name:prefix + '.product-sub-category-edit',
        component: () => import("../views/vendors/category/sub_category/UpdatedProductSubCategory.vue"),
    },
     /*
      @Shops Managements
    */
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
    /*
      @Sellers Managements
    */
    {
        path: "/vendor/sellers/list",
        name:prefix + '.seller-list',
        component: () => import("../views/vendors/sellers/ListsSeller.vue"),
    },
    /*
      @Customer Managements
    */
    {
        path: "/vendor/sellers/customer",
        name:prefix +  '.customer-list',
        component: () => import("../views/vendors/customers/ListCustomers.vue"),
    },
    
    {
        path: "/customer/productdetail",
        name: "",
        component: () => import("../views/customers/product_item/product_details/ProductDetails.vue"),
    },
    /*
      @Order Managements
    */
    {
        path: "/vendor/order-list",
        name: prefix + '.order-list',
        component: () => import('../views/vendors/order/OrderList.vue'),
    },
    // {
    //     path: "/vendor/order-invoice",
    //     name: prefix  + '.invoice-detail',
    //     component: () => import('../views/vendors/order/InvoiceDetailView.vue'),
    // },
    /*
      @Users Managements
    */
    {
        path: "/vendor/user/list/crete-user-auth/ui-user-list",
        name: prefix + '.user-auth-crud',
        meta: {
            title: "Users | 7Day",
            requiresAuth: true,
         },
        component: () => import("../views/administrators/user_managements/users/UsersMSList.vue"),
    },
    {
        path: "/vendor/user/list/crete-user-auth/ui-user-create",
        name: prefix + '.user-auth-crud-user-create',
        component: () => import("../views/administrators/user_managements/users/UserMSCreate.vue"),
    },
    {
        path: "/vendor/user/list/crete-user-auth/ui-user-edit/:id",
        name: prefix + '.user-auth-crud-user-edit',
        component: () => import("../views/administrators/user_managements/users/UserMSCreateUpdated.vue"),
    },
    {
        path: "/vendor/user/permission/list/crete-user-auth/ui-permission-list",
        name: prefix + '.user-auth-crud-permission',
        meta: {
            title: "Permission | 7Day",
            requiresAuth: true,
        },
        component: () => import("../views/administrators/user_managements/permissions/PermissionMSList.vue"),
    },
    {
        path: "/vendor/user/permission/list/crete-user-auth/ui-permission-edit-updated/:id/:funId",
        name: prefix + '.user-auth-crud-permission-add',
        component: () => import("../views/administrators/user_managements/permissions/PermissionsMSCreate.vue"),
    },
];
export default [
    {
        meta: {template: 'panel'},
        path: "/vendor-dashboard/default-layouts",
        name: "home-vendor-dashboard",
        component: DefaultLayoutVendor,
        children: defaultChildRoutes('defaults')
    }
];