import DefaultLayoutVendor from "../../../components/layouts/vendors/DefaultLayouts.vue";

const defaultChildRoutesProMS = (prefix) => [
    {
        path: "/vendor/products/category/list",
        name: prefix + '.product_category_list',
        meta: {
            title: "shippingOrderMS",
            requiresAuth: true,
            icon: 'adjustment',
            permissions: ['delivery_shipping_order_module']
        },
        component: () => import("../../../views/delivery_shipping_company/DeliveryProductConfirmByVendor.vue"),
    }
]
const moduleProductManagementRouters = {
    path: '/vendor/product_managements',
    components: DefaultLayoutVendor,
    name: 'Delivery Managements',
    // redirect: '/vendor/product_managements/index',
    alwaysShow: true,
    meta: {
        title: 'proManagement',
        icon: 'admin',
        permissions: ['delivery_shipping_managements_modules'],
        template: 'panel'
    },
    requiresAuth: true,
    children: defaultChildRoutesProMS('defaults')
}
export default moduleProductManagementRouters;