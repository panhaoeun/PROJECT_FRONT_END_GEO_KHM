import router from "./routes/routes";
import store from "./store";
import 'nprogress/nprogress.css'; // progress bar style
import { isLoggedIn } from "./utils/auth/auth";
import { ElNotification } from 'element-plus';
const whiteList = ['/auth/login', '/auth/register', '/auth-redirect', '/']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    const userRoleAuth = localStorage.getItem('userRole');
    /**
     * * @Check Permission for Only Vendor and Administrator Type of user
     * */
    if (isLoggedIn() && JSON.parse(userRoleAuth) === "Vendor" || JSON.parse(userRoleAuth) == "Admin" || JSON.parse(userRoleAuth) == "Delivery" && userRoleAuth !== "Customer") {
        if (to.path === '/auth/login'){
            // if is logged in, redirect to the home page
            next({ path: '/' });
        }else{
            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = store.getters['users/roles'] && store.getters['users/roles'].length > 0;
            if (hasRoles) {
                next();
            }else{
                try {
                    // get user info
                    // generate accessible routes map based on roles
                    const { usersRoles,permissionModules} = await store.dispatch('users/setRolesModules');
                    const accessRoutes = await store.dispatch('users/generateRoutes', {roles: usersRoles,permissions: permissionModules});
                    // const resRoute = [];
                    accessRoutes.forEach(route => {
                        // console.log(route)
                        router.addRoute({
                            name: route?.name,
                            meta: route?.meta,
                            path: route?.path,
                            component: route?.components,
                            alwaysShow: route?.alwaysShow,
                            children: route?.children
                        })
                    });
                    // NEXT
                    next({
                        ...to,
                        replace: true
                    });
                   
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('users/resetToken');
                    window.localStorage.clear();
                    const token = localStorage.getItem('token');
                    const role = localStorage.getItem('userRole');
                    localStorage.removeItem(token);
                    localStorage.removeItem(role)
                    window.localStorage.clear();
                    // Message
                    ElNotification.error({
                        title: 'Unauthorized Access Module',
                        message: error?.message ? error?.message : '',
                        showClose: true
                    });  
                    next(`/auth/login`);
                }
            }
        }
    }else{
         /*Has no token*/
         if (whiteList.indexOf(to.matched[0] ? to.matched[0].path : '') !== -1) {
             // in the free login whitelist, go directly
             next();
         } else {
             // other pages that do not have permission to access are redirected to the login page.
             next(`/auth/login?redirect=${to.path}`);
         }
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.allowAnonymous === true && isLoggedIn()) {
        next({
            path: '/'
        });
    } else if (!to.meta.allowAnonymous && !isLoggedIn()) {
        next();
    } else {
        next();
    }
    /**
      * * @Check Permission for Vendors
    * */
     if (to.matched.some(record => record.meta.requiresAuth)) {
         if (!isLoggedIn()) {
             next(`/auth/login?redirect=${to.path}`);
         } else {
             const userRoleCustomer = localStorage.getItem('userRole')
             if (to.matched.some(record => record.meta.isCustomer)) {
                 if (JSON.parse(userRoleCustomer) === "Customer") {
                     return next();
                 } else {
                     return next({
                         name: 'auth-register'
                     });
                 }
             }

         }
     } else {
         next();
     }
});