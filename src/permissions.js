import { ElMessage } from "element-plus";
import router from "./routes/routes";
import store from "./store";
router.beforeEach(async (to, from, next) => {
/**
 * * @Check Permission for Only Vendor and Administrator Type of user
* */ 
const whiteList = ['/auth/login', '/auth-redirect']; // no redirect whitelist
    // determine whether the user has logged in
    const isUserLogged = localStorage.getItem('token');
    if(isUserLogged){
        if (to.path === '/auth/login'){
             next({ path: '/' });
        }else{
            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = store.getters['users/roles'] && store.getters['users/roles'].length > 0;
            if (hasRoles){
                next();
            }else{
                try {
                    // get user info
                    const {
                        usersRoles,
                        permissionModules
                    } = await store.dispatch('users/setRolesModules');
                    const accessRoutes = await store.dispatch('users/generateRoutes', {
                        roles: usersRoles,
                        permissions: permissionModules
                    });
                    router.addRoute(accessRoutes)
                    // NEXT
                    next({
                        ...to,
                        replace: true
                    });
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('users/resetToken');
                    ElMessage.error(error || 'Has Error');
                    next(`/auth/login`);
                }
            }
        }
    }else{
        /*Has no token*/
        if(whiteList.indexOf(to.matched[0] ? to.matched[0].path : '' ) !== -1){
            // in the free login whitelist, go directly
            next();
        }else{
            // other pages that do not have permission to access are redirected to the login page.
            next(`/auth/login?redirect=${to.path}`);
        }
    }
})
router.afterEach(() => {
    // finish progress bar
    // NProgress
});