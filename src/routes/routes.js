/*
|-------------------------------------------------------------------------------
| routes.js
|-------------------------------------------------------------------------------
| Contains all of the routes for the application
*/
import DefaultLayoutVendor from "../components/layouts/vendors/DefaultLayouts.vue";

/*
    Imports Vue and VueRouter to extend with the routes.
*/
import { createWebHistory,createRouter } from "vue-router";
import moduleRouteVendor from  "./vendors";
import moduleRouteCustomer from "./customers";
import moduleAuthentication from "./authencation";
import moduleGlobalStep from "./globaStepper";
import moduleErrorPage from "./errorPage";
// Manager Vendor or Admin base on modules have permissions can access modules
import moduleProductManagementRouters from "./modules/product_managements";
import moduleUsersManagementRouters from "./modules/users_managements";
import moduleBusinessManagementRouters from "./modules/business_sections";
import moduleOrderManagementRouters from "./modules/orders_managements";
import moduleOrderReportManagementRouters from "./modules/report_managements/orders_report_managements";
// Delivery Tracking
import moduleDeliveryTracking from "./modules/delivery_company_shipping/delivery_company_management";
// Location system 
import modulesLocationSystem from "./modules/location_geo_country/module_location_system_management";
// Translate Language

/*
    Makes a new VueRouter that we will use to run all of the routes
    for the app.
*/
export const constantRoutes = [
    {
        component: DefaultLayoutVendor,
        path: '/redirect',
        children: {
            path: '/redirect/:path*',
            component: () => import('../views/authencation/AuthRedirect.vue'),
        },
        hidden: true,
    },
    ...moduleErrorPage,
    ...moduleAuthentication,
    ...moduleRouteCustomer,
    ...moduleGlobalStep,
    ...moduleRouteVendor
]
export const asyncRoutes = [
    moduleProductManagementRouters,
    moduleUsersManagementRouters,
    moduleBusinessManagementRouters,
    moduleOrderManagementRouters,
    moduleOrderReportManagementRouters,
    moduleDeliveryTracking,
    modulesLocationSystem
]
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        // savedPosition is only available for popstate navigation's.
        return savedPosition
    } else {
        const position = {}
        // new navigation.
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash;
            // console.log("scrolling to == ",to)
            // specify offset of the element
            if (to.hash === '#products') {
                position.offset = {
                    y: 10
                }
            }
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
    }
}
const routerModules = () => new createRouter({
    mode: 'history', // require service support
    history: createWebHistory(),
    scrollBehavior,
    base: process.env.BASE_URL,
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    routes: constantRoutes,
});
const router = routerModules();
export function resetRouter() {
    const newRouter = routerModules();
    router.matcher = newRouter.matcher; // reset router
}
export default router;