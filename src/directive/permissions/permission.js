import store from "../../store";

export default {
    async inserted(el, binding) {
        const { value} = binding;
        if (value && value instanceof Array && value.length > 0) {
            const functionName = value[0].functionName;
            const moduleName = value[0].moduleName;
            const resultModuleAcc = await store.dispatch('users/permUserCanAccModule', {
                functionName,
                moduleName
            });
            const permissionModule = store.getters && store.getters['users/permissionModules'];
            if (!resultModuleAcc) {
               console.warn(`${moduleName}.${functionName}: You don't have access to this module`);
            }
            const requiredPermissions = value;
            const hasPermission = permissionModule.some((permission) => {
                if (!permission) {
                    return false;
                }
                return requiredPermissions.push(permission)
            });
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(`Permissions are required! Example: v-permission="['dashboard','view create']"`);
        }
    }
}