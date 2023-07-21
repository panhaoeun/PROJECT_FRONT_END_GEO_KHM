import DefaultLayoutVendor from "../../components/layouts/vendors/DefaultLayouts.vue";

const defaultChildRoutesBusinessMS = (prefix) => [
    /*
      @Business Sections Managements
    */
    {
        path: "/vendor/sellers/shop/my_shop_vendor",
        name: prefix + '.my_shop_vendor-list',
        meta: {
            title: "My Shop",
            requiresAuth: true,
            permissions: ['vendor_shop_info_module']
        },
         component: () => import("../../views/vendors/my_shop/MyShopsVendor.vue"),
    }, 
    {
        path: "/vendor/sellers/shop/my_shop_vendor/edit_my_shop",
        name: prefix + '.my_shop_vendor-edit-shop',
        meta: {
            title: "Business Section",
            requiresAuth: true,
            permissions: ['vendor_shop_info_module']
        },
        hidden: true,
        component: () => import("../../views/vendors/my_shop/EditMyShop.vue"),
    },
]
const moduleProductManagementRouters = {
    path: '/vendor/product_managements/business_sections',
    components: DefaultLayoutVendor,
    name: 'Business Section',
    alwaysShow: true,
    meta: {
        title: 'Business Section',
        icon: 'admin',
        permissions: ['business_section_module'],
        template: 'panel'
    },
    children: defaultChildRoutesBusinessMS('defaults')
}
export default moduleProductManagementRouters;