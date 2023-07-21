import DefaultLayoutVendor from "../../components/layouts/vendors/DefaultLayouts.vue";

const defaultChildRoutesUsersMS = (prefix) => [
    /*
        @Customer Managements
    */
    {
        path: "/vendor/user/list/admin/seller_lists",
        name: prefix + '.customer_list',
        meta: {
            title: "Customers",
            requiresAuth: true,
            permissions: ['customers_module']
        },
        component: () => import("../../views/vendors/customers/ListCustomers.vue"),
    },
    /*
      @Sellers Managements
    */
     {
        path: "/vendor/user/list/admin/sellers/list",
        name: prefix + '.seller-list',
        meta: {
            title: "Sellers",
            requiresAuth: true,
            permissions: ['sellers_module']
        },
        component: () => import("../../views/vendors/sellers/ListsSeller.vue"),
     },
    /*
      @Users Managements
    */
    {
        path: "/vendor/user/list/crete-user-auth/ui-user-list",
        name: prefix + '.user_auth_crud_list',
        meta: {
            title: "Users",
            requiresAuth: true,
            permissions: ['users_modules']
        },
        component: () => import("../../views/administrators/user_managements/users/UsersMSList.vue"),
    }, 
    {
        path: "/vendor/user/list/crete-user-auth/ui-user-create",
        name: prefix + '.user_auth_crud_user_create',
        meta: {
            title: "Users",
            requiresAuth: true,
            permissions: ['users_modules']
        },
        hidden: true,
        component: () => import("../../views/administrators/user_managements/users/UserMSCreate.vue"),
    }, 
    {
        path: "/vendor/user/list/crete-user-auth/ui-user-edit/:id",
        name: prefix + '.user_auth_crud_user_edit',
        meta: {
            title: "Users",
            requiresAuth: true,
            permissions: ['users_modules']
        },
        hidden: true,
        component: () => import("../../views/administrators/user_managements/users/UserMSCreateUpdated.vue"),
    }, 
    /**
     * @Role and Permissions Managements
    * **/
    {
        path: "/vendor/user/permission/list/crete-user-auth/ui-permission-list",
        name: prefix + '.user_auth_crud_permission',
        meta: {
            title: "Permissions",
            requiresAuth: true
        },
        hidden: true,
        component: () => import("../../views/administrators/user_managements/permissions/PermissionMSList.vue"),
    },
    {
        path: "/vendor/user/permission/list/crete-user-auth/ui-permission-edit-updated/:id/:funId",
        name: prefix + '.user_auth_crud_permission_add',
        meta: {
            title: "Permission",
            requiresAuth: true,
            permissions: ['permissions_module']
        },
        hidden: true,
        component: () => import("../../views/administrators/user_managements/permissions/PermissionsMSCreate.vue"),
    },
    {
        path: "/vendor/user/permission/role-module/crete-user-auth/ui-permission-auth-role-module",
        name: prefix + '.user-auth_crud_permission_auth_role_module',
        meta: {
            title: "Permissions",
            requiresAuth: true,
            icon: 'role',
            permissions: ['permissions_module']
        },
        component: () => import("../../views/administrators/user_managements/role_permission_module_new/PermissionModuleRoleMSList.vue"),
    }
]
const moduleUsersManagementRouters = {
    path: '/vendor/users_managements',
    components: DefaultLayoutVendor,
    name: 'Users Management',
    alwaysShow: true,
    meta: {
        title: 'Users Management',
        icon: 'admin',
        // permissions: ['users_management_module'],
        template: 'panel'
    },
    children: defaultChildRoutesUsersMS('defaults')
}
export default moduleUsersManagementRouters;