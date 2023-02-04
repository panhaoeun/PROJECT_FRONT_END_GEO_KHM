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
    }
]