import DefaultLayoutVendor from "../../components/layouts/vendors/DefaultLayouts.vue";
const permissionsRoutes = {
    path: '/vendor/user/permission/',
    components: DefaultLayoutVendor,
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
        title: 'permissions',
        icon: 'admin',
        // permissions: ['view menu permissions'],
    },
    children: [
        /**@User Managements**/
        {
            path: '/vendor-dashboard/default-layouts',
            name: 'sadasd',
            meta: {
                title: 'dashboard',
                icon: 'dashboard',
                noCache: false,
                permissions: ['']
            },
            component: () => import('@/dashboard/DashboardLayout.vue'),
        },
        /**@Role and Permissions Managements**/

    ]
}
export default permissionsRoutes;