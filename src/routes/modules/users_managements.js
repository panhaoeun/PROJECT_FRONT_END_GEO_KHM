import DefaultLayoutVendor from "../../components/layouts/vendors/DefaultLayouts.vue";

const defaultChildRoutesUsersMS = (prefix) => [
    /*
        @Customer Managements
    */
    {
        path: "/vendor/user/list/admin/seller_lists",
        name: prefix + '.customer_list',
        meta: {
            title: "customerMS",
            requiresAuth: true,
            icon: 'userGroup',
            permissions: ['customers_module'],
        },
        component: () => import("../../views/vendors/customers/ListCustomers.vue"),
    },
    {
         path: "/vendor/user/customer_info/list/admin/customer_view_details/:customerId",
         name: prefix + '.customer_view_details',
         hidden: true,
         meta: {
             title: "customerMS",
             requiresAuth: true,
             icon: 'userGroup',
             permissions: ['customers_module']
         },
         component: () => import("../../views/vendors/customers/ViewDetailCustomers.vue"),
    },
    /**
     * @Wallet Customer Managements
     * **/
    /*
    */
    {
        path: "/vendor/user/list/admin/customer_wallet_list",
        name: prefix + '.customer_wallet_list',
        meta: {
            title: "walletCustomer",
            requiresAuth: true,
            icon: 'wallet',
            permissions: ['wallet_customer_module'],
        },
        component: () => import("../../views/vendors/customers/my_wallets/deposited/ListDepositToWalletsCustomer.vue"),
    },
    /**
      * @Withdraw Wallet Vendor Managements
      * **/
     /*
     */
    {
        path: "/vendor/user/list/admin/sellers/withdraw_request_balance_in_account/list",
        name: prefix + '.withdraw_request_balanced_seller',
        meta: {
            title: "sellerWithdrawRequest",
            requiresAuth: true,
            icon: 'wallet',
            permissions: ['withdraw_seller_module_request']
        },
        component: () => import("../../views/vendors/withdraw_vendor_wallets/WithdrawVendorWallets.vue"),
    },
     {
        path: "/vendor/user/list/admin/sellers/withdraw_request_balance_in_account/confirm_to_wallet_vendor/:withdrawId",
        name: prefix + '.withdraw_request_balanced_seller_request',
        hidden: true,
        meta: {
            title: "sellerWithdrawRequest",
            requiresAuth: true,
            icon: 'wallet',
            permissions: ['withdraw_seller_module_request']
        },
        component: () => import("../../views/vendors/withdraw_vendor_wallets/ConfirmDialogWithdrawWallet.vue"),
     },
    /**
     * @Role and Permissions Managements
     * **/
    /*
      @Sellers Managements
    */
     {
        path: "/vendor/user/list/admin/sellers/list",
        name: prefix + '.seller-list',
        meta: {
            title: "sellerMS",
            requiresAuth: true,
            icon:'i',
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
            title: "usersMS",
            requiresAuth: true,
            icon: 'user',
            permissions: ['users_modules']
        },
        component: () => import("../../views/administrators/user_managements/users/UsersMSList.vue"),
    }, 
    {
        path: "/vendor/user/list/crete-user-auth/ui-user-create",
        name: prefix + '.user_auth_crud_user_create',
        meta: {
            title: "usersMS",
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
            title: "usersMS",
            requiresAuth: true,
            permissions: ['users_modules']
        },
        hidden: true,
        component: () => import("../../views/administrators/user_managements/users/UserMSCreateUpdated.vue"),
    }, 
    /*
      @Vendor Managements
    */
    {
         path: "/vendor/vendor-list/create-account-vendor",
         name: prefix + '.create_vendor_account',
         meta: {
             title: "usersMS",
             requiresAuth: true,
             permissions: ['users_modules']
         },
         hidden: true,
         component: () => import("../../views/vendors/vendor_management_account/CreateVendorAccount.vue"),
    },
    {
        path: "/vendor/vendor-list/updated-account-vendor/:id",
        name: prefix + '.updated_vendor_account',
        meta: {
            title: "usersMS",
            requiresAuth: true,
            permissions: ['users_modules']
        },
        hidden: true,
        component: () => import("../../views/vendors/vendor_management_account/UpdatedVendorAccount.vue"),
    },
    /**
     * @Role and Permissions Managements
    * **/
    {
        path: "/vendor/user/permission/list/crete-user-auth/ui-permission-list",
        name: prefix + '.user_auth_crud_permission',
        meta: {
            title: "permissionMS",
            icon:'shieldCheck',
            requiresAuth: true
        },
        hidden: true,
        component: () => import("../../views/administrators/user_managements/permissions/PermissionMSList.vue"),
    },
    {
        path: "/vendor/user/permission/list/crete-user-auth/ui-permission-edit-updated/:id/:funId",
        name: prefix + '.user_auth_crud_permission_add',
        meta: {
            title: "permissionMS",
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
            title: "permissionMS",
            requiresAuth: true,
            icon: 'shieldCheck',
            permissions: ['permissions_module']
        },
        component: () => import("../../views/administrators/user_managements/role_permission_module_new/PermissionModuleRoleMSList.vue"),
    },
    {
        path: "/vendor/user/permission/role-module/crete-user-auth/ui-permission-auth-role-module-create-new",
        name: prefix + '.user_create_new_auth_crud_permission_auth_role_module',
        hidden: true,
        meta: {
            title: "permissionMS",
            requiresAuth: true,
            icon: 'shieldCheck',
            permissions: ['permissions_module']
        },
        component: () => import("../../views/administrators/user_managements/role_permission_module_new/CreatePermissionRole.vue"),
    },
    /**
    * @Manage All Permission By Geo-fence
    * @Manage on position by department with multiple level on geo-fence
    * @Assign Position to user on geo-fence
    * **/
]
const moduleUsersManagementRouters = {
    path: '/vendor/users_managements',
    components: DefaultLayoutVendor,
    name: 'userMSModule',
    alwaysShow: true,
    meta: {
        title: 'userMSModule',
        icon: 'admin',
        requiresAuth: true,
        // permissions: ['users_management_module'],
        template: 'panel'
    },
    children: defaultChildRoutesUsersMS('defaults')
}
export default moduleUsersManagementRouters;