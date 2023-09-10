import store from "../../store";

export default {
    async inserted(el, binding) {
        const {
            value
        } = binding;
         const {
             permissionModules
         } = await store.dispatch('users/setRolesModules');

        if (value && value instanceof Array && value.length > 0) {
            const requiredRoles = value;
            const hasRole = permissionModules.some(role => {
                return requiredRoles.includes(role);
            });
            if (!hasRole) {
                el.parentNode && el.parentNode.removeChild(el);
                return false;
            }
        } else {
            throw new Error(`Roles are required! Example: v-role="['admin','editor']"`);
        }
    },
};
