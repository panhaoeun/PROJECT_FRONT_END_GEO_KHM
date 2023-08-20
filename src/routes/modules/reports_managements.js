import DefaultLayoutVendor from "../../components/layouts/vendors/DefaultLayouts.vue";

const defaultChildRoutesReportMS = (prefix) => [
    // Orders Managements
    {
        path: "/vendor/order_managements/order_list",
        name: prefix + '.order-list',
        meta: {
            title: "orderProductModule",
            requiresAuth: true,
            // permissions: ['orders_report_modules']
        },
        component: () => import('../../views/vendors/order/OrderList.vue'),
    },
]
const moduleOrdersManagementRouters = {
    path: '/vendor/product_managements/order_reports/management_orders',
    components: DefaultLayoutVendor,
    name: 'ordersMSProduct',
    alwaysShow: true,
    meta: {
        title: 'ordersMSProduct',
        icon: 'admin',
        // permissions: ['report_managements_module'],
        template: 'panel'
    },
    children: defaultChildRoutesReportMS('defaults')
}
export default moduleOrdersManagementRouters;