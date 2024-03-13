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
            icon: 'i',
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
     * @Manage User Auth Role Module Base organization
     ***/
    {
        path: "/admin/admin-management-employee-assign/list-hrm-assign-employee-role-module",
        name: prefix + '.hrm_assign_employee',
        meta: {
            title: "userEmployee",
            icon: 'bag',
            requiresAuth: true,
            permissions: ['users_modules']
        },
        component: () => import("../../views/administrators/user_managements/users/employee_assign_manage/ListEmployeeGlobalAdminGeo.vue"),
    },
    {
        path: "/admin/admin-management-employee-assign/hrm-add-new-employee-role-module",
        name: prefix + '.hrm_assign_employee_add_new',
        meta: {
            title: "userEmployee",
            icon: 'bag',
            requiresAuth: true,
            permissions: ['users_modules']
        },
        hidden: true,
        component: () => import("../../views/administrators/user_managements/users/employee_assign_manage/AddNewEmployeeGlobalAdminGeo.vue"),
    },
    // Position 
    {
        path: "/admin/admin-position-org-structure-dept",
        name: prefix + '.hrm_assign_employee_position_org',
        meta: {
            title: "userPosition",
            icon: 'setting',
            requiresAuth: true,
            permissions: ['users_modules']
        },
        component: () => import("../../views/administrators/user_managements/users/manage_new_assign_position_org_str_dept/ListManageOrgPositionAssignNew.vue"),
    },
    // Job Descriptions 
    {
        path: "/admin/admin-job-description-org-structure-dept",
        name: prefix + '.hrm_assign_employee_job_des_org',
        meta: {
            title: "jobDescription",
            icon: 'file',
            requiresAuth: true,
            permissions: ['users_modules']
        },
        component: () => import("../../views/administrators/user_managements/users/manage_new_assign_position_org_str_dept/ListManageOrgJobDescriptionAssignNew.vue"),
    },




    /**
     * @Role and Permissions Managements
     * **/
    {
        path: "/vendor/user/permission/list/crete-user-auth/ui-permission-list",
        name: prefix + '.user_auth_crud_permission',
        meta: {
            title: "permissionMS",
            icon: 'shieldCheck',
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
        component: () => import("../../views/administrators/user_managements/PermissionModuleRoleMSList-BACKUP.vue"),
    },
    {
        path: "/vendor/user/list/crete-user-auth/ui-user-list",
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