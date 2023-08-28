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
            icon: 'viewGrid',
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
            icon: 'bookmark',
            noCache: false,
            permissions: ['vendor_profile']
        },
        hidden: true,
        component: () => import('../views/vendors/vendors_profile/ProfileVue.vue'),
    }
];
export default [
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