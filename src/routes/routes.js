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

/*
    Makes a new VueRouter that we will use to run all of the routes
    for the app.
*/
const router = new createRouter({
    history: createWebHistory(),
    routes: [
        ...moduleRouteCustomer,
        ...moduleRouteVendor,
    ]
});
export default router;