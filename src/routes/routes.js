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
import moduleOrdersReportManagementRouters from "./modules/orders_managements";
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
    moduleOrdersReportManagementRouters
]
const routerModules = () => new createRouter({
    // mode: 'history', // require service support
    history: createWebHistory(),
    scrollBehavior: () => ({
        y: 0
    }),
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