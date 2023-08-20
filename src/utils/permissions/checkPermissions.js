import store from "../../store";

export default function checkPermission(value) {
    if (value && value instanceof Array && value.length > 0) {
        const permissions = store.setting.getters && store.setting.getters.permissions;
        const requiredPermissions = value;
        const hasPermissions = permissions.some(permission => {
            return requiredPermissions.includes(permission);
        });
        return hasPermissions;
    } else {
        console.error("Invalid permission parameter"); // eslint-disable-line no-console
        throw new Error('Invalid permission');
    }
}