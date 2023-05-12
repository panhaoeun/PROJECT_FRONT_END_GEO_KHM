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
router.beforeEach((to, from, next) => {
    const publicPages = ['/auth/login', '/auth/register', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if(authRequired && !loggedIn){
        next('/auth/login');
    }else{
        next();
    }
    
});
export default router;