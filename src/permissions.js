import {
    ElMessage
} from "element-plus";
import router from "./routes/routes";
import store from "./store";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'; // progress bar style
import {
    isLoggedIn
} from "./utils/auth/auth";
// import getPageTitle from '@/utils/getPageTitle';
// import DefaultLayoutVendor from "./components/layouts/vendors/DefaultLayouts.vue";

NProgress.configure({
    showSpinner: false
}); // NProgress Configuration
const whiteList = ['/auth/login', '/auth/register', '/auth-redirect', '/']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();
    // set page title
    // document.title
    /**
     * * @Check Permission for Only Vendor and Administrator Type of user
     * */
    // determine whether the user has logged in
    const isUserLogged = localStorage.getItem('token');
    if (isUserLogged) {
        if (to.path === '/auth/login') {
            // if is logged in, redirect to the home page
            next({
                path: '/'
            });
            NProgress.done();
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = store.getters['users/roles'] && store.getters['users/roles'].length > 0;
            if (hasRoles) {
                next();
            } else {
                try {
                    // get user info
                    // generate accessible routes map based on roles
                    const {
                        usersRoles,
                        permissionModules
                    } = await store.dispatch('users/setRolesModules');
                    const accessRoutes = await store.dispatch('users/generateRoutes', {
                        roles: usersRoles,
                        permissions: permissionModules
                    });
                    // const resRoute = [];
                    accessRoutes.forEach(route => {
                        // console.log(route)
                        router.addRoute({
                            name: route ? .name,
                            meta: route ? .meta,
                            path: route ? .path,
                            component: route ? .components,
                            alwaysShow: route ? .alwaysShow,
                            children: route ? .children
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
                    ElMessage.error(error || 'Can not Access Module- Has Error');
                    next(`/auth/login`);
                    NProgress.done();
                }
            }
        }
    } else {
        /*Has no token*/
        if (whiteList.indexOf(to.matched[0] ? to.matched[0].path : '') !== -1) {
            // in the free login whitelist, go directly
            next();
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/auth/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
})
router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});