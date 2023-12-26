import DefaultLayoutVendor from "../../../components/layouts/vendors/DefaultLayouts.vue";

const defaultChildRoutesLocationUserGroupChat = (prefix) => [{
        path: "/admin/user-group-chat/group-chat-realtime/manage-user-access-conversation",
        name: prefix + '.management_user_group_chat',
        meta: {
            title: "groupChat",
            requiresAuth: true,
            icon: 'chat',
            permissions: ['location_ms_system_module']
        },
        component: () => import("../../../views/user_group_chat_realtime/UsersGroupChatRealtime.vue"),
    },
]
const moduleUserGroupChatManagementRouters = {
    path: '/admin/user-group-chat',
    components: DefaultLayoutVendor,
    name: 'User Group Chat',
    alwaysShow: true,
    meta: {
        title: 'groupChat',
        icon: 'chat',
        permissions: ['system_module_settings'],
        template: 'panel'
    },
    requiresAuth: true,
    children: defaultChildRoutesLocationUserGroupChat('defaults')
}
export default moduleUserGroupChatManagementRouters;