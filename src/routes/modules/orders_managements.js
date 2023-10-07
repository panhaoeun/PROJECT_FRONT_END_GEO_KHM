import DefaultLayoutVendor from "../../components/layouts/vendors/DefaultLayouts.vue";

const defaultChildRoutesOrdersMS = (prefix) => [
    // Orders Managements
    {
        path: "/vendor/order_managements/order_list",
        name: prefix + '.order-list',
        meta: {
            title: "orderProductModule",
            requiresAuth: true,
            icon: 'cart',
            permissions: ['report_managements_module']
        },
        component: () => import('../../views/vendors/order/OrderList.vue'),
    },
    {
        path: "/vendor/order_managements/customer_detail/customer_order/order_detail/:orderId",
        name: prefix + '.customer_orders_detail',
        meta: {
            title: "orderProductModule",
            requiresAuth: true,
            icon: '',
            permissions: ['report_managements_module']
        },
        hidden: true,
        component: () => import('../../views/vendors/order/orders_managements_detail/OrderDetailsCustomer.vue'),
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
        requiresAuth: true,
        permissions: ['report_managements_module'],
        template: 'panel'
    },
    children: defaultChildRoutesOrdersMS('defaults')
}
export default moduleOrdersManagementRouters;