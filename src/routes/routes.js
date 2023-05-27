/*
|-------------------------------------------------------------------------------
| routes.js
|-------------------------------------------------------------------------------
| Contains all of the routes for the application
*/

/*
    Imports Vue and VueRouter to extend with the routes.
*/
import { createRouter, createWebHistory } from "vue-router";
import moduleRouteVendor from  "./vendors";
import moduleRouteCustomer from "./customers";
import moduleAuthencation from "./authencation";
import moduleGlobalStep from "./globaStepper";
import moduleErrorPage from "./errorPage";
import { storeToRefs } from "pinia";
import { useAuthStoreToken } from "../utils/auth/AuthStoreTokenJWT";

/*
    Makes a new VueRouter that we will use to run all of the routes
    for the app.
*/
const router = new createRouter({
    history: createWebHistory(),
    base: '/',
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    routes: [
        ...moduleRouteCustomer,
        ...moduleRouteVendor,
        ...moduleAuthencation,   
        ...moduleGlobalStep,   
        ...moduleErrorPage
    ]
});
//
router.beforeEach( async(to, from, next) => {
    const {user} = storeToRefs(useAuthStoreToken());
    const publicPages = ['/auth/login', '/auth/register', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn && !user.value) {
        next('/auth/login');
    }else{
        next();
    }
    /*
     @Authentications  Customer 
    **/
    if (authRequired && loggedIn && user.value[1].typeUser == 'Customer') {
        next('/');
    }
    /*
     @Authentications  Vendor 
    **/ 
    if (authRequired && loggedIn && user.value[1].typeUser == 'Vendor' || user.value[1].typeUser == 'Admin') {
        next('/vendor-dashboard/default-layouts');
    }
});
export default router;