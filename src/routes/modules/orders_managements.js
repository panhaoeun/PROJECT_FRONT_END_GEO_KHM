import DefaultLayoutVendor from "../../components/layouts/vendors/DefaultLayouts.vue";

const defaultChildRoutesOrdersMS = (prefix) => [
    // Orders Managements
    {
        path: "/vendor/order_managements/order_list",
        name: prefix + '.order-list',
        meta: {
            title: "Orders",
            requiresAuth: true,
            permissions: ['orders_report_modules']
        },
        component: () => import('../../views/vendors/order/OrderList.vue'),
     },
]
const moduleOrdersManagementRouters = {
    path: '/vendor/product_managements/order_reports/management_orders',
    components: DefaultLayoutVendor,
    name: 'Order Managements',
    alwaysShow: true,
    meta: {
        title: 'Order Managements',
        icon: 'admin',
        permissions: ['report_managements_module'],
        template: 'panel'
    },
    children: defaultChildRoutesOrdersMS('defaults')
}
export default moduleOrdersManagementRouters;