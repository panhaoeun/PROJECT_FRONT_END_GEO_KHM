import DefaultLayoutVendor from "../../components/layouts/vendors/DefaultLayouts.vue";

const defaultChildRoutesProMS = (prefix) => [
    // Products Managements
    /**Categories*/ 
    {
        path: "/vendor/products/category/list",
        name: prefix + '.product_category_list',
        meta: {
            title: "Categories",
            requiresAuth: true,
            permissions: ['categories_module']
        },
        component: () => import("../../views/vendors/category/CategoryView.vue"),
    },
    {
        path: "/vendor/products/category/create",
        name: prefix + '.product-category-create',
        hidden: true,
        meta: {
            title: "Categories",
            requiresAuth: true,
            permissions: ['categories_module']
        },
        component: () => import("../../views/vendors/category/CategoryCreate.vue"),
    }, 
    {
        path: "/vendor/products/category/edit/:id",
        name: prefix + '.product-category-edit',
        meta: {
            title: "Categories",
            requiresAuth: true,
            permissions: ['categories_module']
        },
        hidden: true,
        component: () => import("../../views/vendors/category/UpdatedProductCategory.vue"),
    },
    /**Sub Categories*/
    {
        path: "/vendor/products/sub-category/list",
        name: prefix + '.sub_product_category_list',
        meta: {
            title: "Sub Categories",
            requiresAuth: true,
            permissions: ['sub_categories']
        },
        component: () => import("../../views/vendors/category/sub_category/SubCategoryView.vue"),
    }, 
    {
         path: "/vendor/products/sub-category/create/:superCatID",
         name: prefix + '.product-sub-category-create',
         hidden: true,
         meta: {
            title: "Sub Categories",
            requiresAuth: true,
            permissions: ['sub_categories']
         },
         component: () => import("../../views/vendors/category/sub_category/SubCategoryCreate.vue"),
    },
    {
         path: "/vendor/products/sub-category/edit/:id",
         name: prefix + '.product-sub-category-edit',
         meta: {
            title: "Sub Categories",
            requiresAuth: true,
            permissions: ['sub_categories']
         },
         hidden: true,
         component: () => import("../../views/vendors/category/sub_category/UpdatedProductSubCategory.vue"),
    },
     /*
     @Products Managements
    */
     {
        path: "/vendor/products/list",
        name: prefix + '.products-list',
        meta: {
            title: 'Products',
            permissions: ['product_module']
        },
        component: () => import("../../views/vendors/products/ProductList.vue"),
     }, 
     {
        path: "/vendor/products/create",
        name: prefix + '.product_create',
        meta: {
            title: 'Products Create',
            permissions: ['product_module']
        },
        hidden: true,
        component: () => import("../../views/vendors/products/ProductCreate.vue"),
     }, 
     {
        path: "/vendor/products/product_list/edit",
        name: prefix + '.product_edit',
        component: () => import("../../views/vendors/products/ProductUpdated.vue"),
        hidden: true,
        meta: {
            title: 'Products Update',
            permissions: ['product_module']
        },
     },
]
const moduleProductManagementRouters = {
    path: '/vendor/product_managements',
    components: DefaultLayoutVendor,
    name: 'Product Managements',
    // redirect: '/vendor/product_managements/index',
    alwaysShow: true,
    meta: {
        title: 'proManagement',
        icon: 'admin',
        permissions: ['product_managements_modules'],
        template: 'panel'
    },
    children: defaultChildRoutesProMS('defaults')
}
export default moduleProductManagementRouters;