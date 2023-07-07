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
import { createRouter, createWebHistory } from "vue-router";
import moduleRouteVendor from  "./vendors";
import moduleRouteCustomer from "./customers";
import moduleAuthencation from "./authencation";
import moduleGlobalStep from "./globaStepper";
import moduleErrorPage from "./errorPage";
// import permissionsRoutes from "./errorPage";
// import { storeToRefs } from "pinia";
// import { useAuthStoreToken } from "../utils/auth/AuthStoreTokenJWT";

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
    ...moduleAuthencation,
    // GLobal Customer Routes
    ...moduleRouteVendor,
    ...moduleRouteCustomer,
    ...moduleGlobalStep,

]
export const asyncRoutes = [
    ...moduleErrorPage,
]
const router = new createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ y: 0 }),
    base: '/',
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    routes: constantRoutes
});
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

//
// router.beforeEach( async(to, from, next) => {
//     const {user} = storeToRefs(useAuthStoreToken());
//     const publicPages = ['/auth/login', '/auth/register', '/'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');
//     /**
//      * @Check Router Required Auth
//     * */ 
//     document.title = to.meta.title;
//     const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//     if (!loggedIn && requiresAuth){
//         next('/error/401');
//     }else{
//         next();
//     }
//     if (authRequired && !loggedIn) {
//         next('/auth/login');
//     }else{
//         next();
//     }
//     /*
//      @Authentications  Customer 
//     **/
//     if (authRequired && loggedIn && user.value[1].typeUser == 'Customer') {
//         next('/');
//     }
//     /*
//      @Authentications  Vendor 
//     **/ 
//     if (authRequired && loggedIn && user.value[1].typeUser == 'Vendor' || user.value[1].typeUser == 'Admin') {
//         next('/vendor-dashboard/default-layouts');
//     }
// });
export default router;