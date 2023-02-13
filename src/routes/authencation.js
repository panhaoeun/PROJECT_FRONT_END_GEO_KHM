export default [
    {
        path:'/auth/login',
        name:'auth-login',
        meta: {template: 'authencation-login'},
        children:[
          {
            path: "/auth/login",
            name:'login',
            component: () => import("../views/authencation/AuthLogin.vue"),
          },
        ]
    },
    {
        path:'/auth/register',
        name:'auth-register',
        meta: {template: 'authencation-register'},
        children:[
          {
            path: "/auth/register",
            name:'register',
            component: () => import("../views/authencation/AuthRegister.vue"),
          },
        ]
    },
    // OPT Verify - Phone Numbers
    {
        path:'/auth/opt-verify/:verify='+encodeURI('phone-5digit'),
        name:'auth/opt-verify?verify=phone-5-digit',
        meta: {template: 'opt-verify-authentication'},
        children:[
          {
            path: "/auth/opt-verify?verify=phone-5-digit",
            name:'opt-verify',
            component: () => import("../views//authencation/opt_verify/OPTVerify.vue"),
          },
        ]
    }
]