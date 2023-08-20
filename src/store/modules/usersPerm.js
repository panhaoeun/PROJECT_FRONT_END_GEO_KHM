import Cookies from "js-cookie";
import {
    constantRoutes,
    asyncRoutes
} from "../../routes/routes";
import UserPermissionsModuleMSServices from "../../services/vendors/user_permissions/UserPermissionModuleMSServices";
const userPermModuleMSServices = new UserPermissionsModuleMSServices();
/**
 * Check if it matches the current user right by meta.role
 * @param {String[]} roles
 * @param {String[]} permissions
 * @param route
 */
function canAccess(roles, permissions, route) {
    if (route.meta) {
        let hasRole = true;
        let hasPermission = true;   
        if (route.meta.roles || route.meta.permissions) {
            // If it has meta.roles or meta.permissions, accessible = hasRole || permission
            hasRole = false;
            hasPermission = false;
            if (route.meta.roles) {
                hasRole = roles.some(role => route.meta.roles.includes(role));
            }
            if (route.meta.permissions && route.meta.permissions !== undefined) {
                hasPermission = permissions.some(permission =>route.meta.permissions.includes(permission?.module_alias));
            }
        }   
        return hasRole || hasPermission;
    }
    // If no meta.roles/meta.permissions inputted - the route should be accessible
    return true;
}
/**
 * Find all routes of this role
 * @param routes asyncRoutes
 * @param roles
*  */
function filterAsyncRoutes(routes,roles,permissions){
    const res = [];
    routes.forEach(route => {
        const tmp = {...route};
        if (canAccess(roles, permissions, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(
                    tmp.children,
                    roles,
                    permissions
                );
            }
            res.push(tmp);
        }
    });
    return res;
}
const state = {
    namespaced: true,
    roles: [],
    permissions: [],
    routes: [],
    addRoutes: [],
    canAccPermission: []
}
const getters = {
    permissionModules: (state) => state.canAccPermission,
    roles: (state) => state.roles,
    routes: (state) => state.routes,
}
const mutations = {
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions;
    },
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes);
    },
    SET_CHECK_PERMISSION: (state, canAccPermission) => {
        state.canAccPermission = canAccPermission;
    }
}
const actions = {
    setRolesModules({commit}) {
       return new Promise((resolve, reject) => {
           userPermModuleMSServices.getUserInfoMSByAuth().then((userInfo) => {
                if (userInfo!== undefined){
                      const {
                          usersRoles,
                          permissionModules
                      } = userInfo;
                      if (!userInfo) {
                          reject('Verification failed, please login again');
                      }
                      if (!usersRoles || usersRoles.length <= 0) {
                          reject('No Permissions access use...!');
                      }
                      const roles = usersRoles;
                      commit("SET_ROLES", roles);
                      commit("SET_PERMISSIONS", {
                          permissions: permissionModules
                      });
                      resolve(userInfo);
                }else{
                    reject(userInfo);
                }
           }).catch((error) => {
               reject(error);
           });
       })
    },
    async generateRoutes({commit}, {roles, permissions}){
        return new Promise(resolve => {
            let accessedRoutes;
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles,permissions);
            commit('SET_ROUTES', accessedRoutes);   
            resolve(accessedRoutes);
        });
    },
    /**User Can Access Modules*/ 
    async permUserCanAccModule({ commit}, {functionName, moduleName}) {
        return new Promise((resolve, reject) => {
            userPermModuleMSServices.checkPermissionsModuleCanAccess(functionName,moduleName)
                .then((resultModuleAcc) => {
                    if (!resultModuleAcc) {
                        Promise.reject('Not Found Module User Can Access');
                    }
                    commit("SET_CHECK_PERMISSION", resultModuleAcc);
                    //Resolve Check Permissions Modules
                    resolve(resolve);
                }).catch((err) => {
                    reject(err);
                });
        }); 
    },
    // remove token
    resetToken({
        commit
    }) {
        return new Promise(resolve => {
            commit('SET_ROLES', []);
            // Remove Token
            Cookies.remove('token');
            localStorage.removeItem('token');
            localStorage.removeItem('expiresIn');
            localStorage.removeItem('user');
            localStorage.removeItem('userId');
            localStorage.removeItem('tokenExpiry');
            resolve();
        });
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
