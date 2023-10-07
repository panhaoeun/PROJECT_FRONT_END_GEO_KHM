import DefaultLayoutVendor from "../../../components/layouts/vendors/DefaultLayouts.vue";

const defaultChildRoutesOrdersReportMS = (prefix) => [
    // Orders Managements
    {
        path: "/vendor/reports_management/orders_report/orders_report_list",
        name: prefix + '.orders_report_list',
        meta: {
            title: "ordersReportMS",
            requiresAuth: true,
            permissions: ['order_report_module']
        },
        component: () => import('../../../views/vendors/reports_managements/OrdersReport.vue'),
    }
]
const moduleOrdersReportManagementRouters = {
    path: '/vendor/product_managements/order_reports/management_orders',
    components: DefaultLayoutVendor,
    name: 'orderReportAnalysisMS',
    alwaysShow: true,
    meta: {
        title: 'orderReportAnalysisMS',
        icon: 'admin',
        requiresAuth: true,
        permissions: ['reports_analysis_module'],
        template: 'panel'
    },
    children: defaultChildRoutesOrdersReportMS('defaults')
}
export default moduleOrdersReportManagementRouters;