import ManagesRolePermissionsAuth from '../../services/authencations/roles_perms_managements/RolesPermissionsManagementsServices';
const userPermMSServices = new ManagesRolePermissionsAuth();
import {
    defineAbility
} from "@casl/ability";
// * Defines how to detect object 's type: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html *
export default function defineAbilityFor(userId) {
    return defineAbility((can) => {
        userPermMSServices.getCheckPermissionAuthByRoles("Owner", userId, "Dashboards").then((data) => {
        can(['view'], 'Dashboards');
            can(['view', 'create'], data?.user_fun_name);
            can(['update', 'delete'], data?.user_fun_name, {
                user: userId
            });
            // const rules = [{
            //         action: "view-any",
            //         subject: data?.user_fun_name,
            //         conditions: data?.user_fun_view,
            //     },
            //     {
            //         action: "view",
            //         subject: data?.user_fun_name,
            //         conditions: data?.user_fun_view,
            //     },
            //     {
            //         action: "create",
            //         subject: data?.user_fun_name,
            //         conditions: data?.user_fun_add,
            //     },
            //     {
            //         action: "update",
            //         subject: data?.user_fun_name,
            //         conditions: data?.user_fun_edit,
            //     },
            //     {
            //         action: "delete",
            //         subject: data?.user_fun_name,
            //         conditions: data?.user_fun_delete,
            //     },
            // ];
            // if (!data.user_id) return new Ability(rules);
            // ability.update(rules);
        });

    });
}
