import DefaultLayoutVendor from "../../../components/layouts/vendors/DefaultLayouts.vue";

const defaultChildRoutesLocationSystemMS = (prefix) => [
    {
        path: "/admin/locations/management_location_system-list",
        name: prefix + '.management_location_system',
        meta: {
            title: "locationMS",
            requiresAuth: true,
            icon: 'location',
            permissions: ['location_ms_system_module']
        },
        component: () => import("../../../views/administrators/location_management_system/LocationSystemManagement.vue"),
    },
    {
        path: "/admin/locations/management_location_system/create-location",
        name: prefix + '.management_location_system_location',
        hidden: true,
        meta: {
            title: "locationMS",
            requiresAuth: true,
            icon: 'location',
            permissions: ['location_ms_system_module']
        },
        component: () => import("../../../views/administrators/location_management_system/CreateNewLocation.vue"),
    },

    {
        path: "/admin/setting-languages-for-translate",
        name: prefix + '.setting_languages',
        // hidden: true,
        meta: {
            title: "languagesMS",
            requiresAuth: true,
            icon: 'location',
            permissions: ['location_ms_system_module']
        },
        component: () => import("../../../views/administrators/settings/languages/CreateSetTranlates.vue"),
    },

    {
        path: "/admin/setting-languages-for-translate/create-translate",
        name: prefix + '.setting-languages-for-translate',
        hidden: true,
        meta: {
            title: "languagescreateMS",
            requiresAuth: true,
            icon: 'location',
            permissions: ['location_ms_system_module']
        },
        component: () => import("../../../views/administrators/settings/languages/DefaultAddNewLanguage.vue"),
    },

]
const moduleProductManagementRouters = {
    path: '/admin/locations',
    components: DefaultLayoutVendor,
    name: 'Locations Managements',
    alwaysShow: true,
    meta: {
        title: 'locationMS',
        icon: 'location',
        permissions: ['system_module_settings'],
        template: 'panel'
    },
    requiresAuth: true,
    children: defaultChildRoutesLocationSystemMS('defaults')
}
export default moduleProductManagementRouters;