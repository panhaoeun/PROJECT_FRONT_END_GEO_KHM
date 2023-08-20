export default [
    {
        path:'/auth/login',
        name:'auth-login',
        hidden: true,
        meta: {
            template: 'authencation-login',
            title: "Sign In | 7Day",
        },
        children:[
          {
            path: "/auth/login",
            name:'login',
            pathToRegexOptions: { strict: true },
            component: () => import("../views/authencation/AuthLogin.vue"),
          },
        ]
    },
    {
        path:'/auth/register',
        name:'auth-register',
        hidden: true,
        meta: {
            template: 'authencation-register',
            title: "Sign Up | 7Day",
        },
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
        hidden: true,
        children:[
          {
            path: "/auth/opt-verify?verify=phone-5-digit",
            name:'opt-verify',
            component: () => import("../views/authencation/opt_verify/OPTVerify.vue"),
          },
        ]
    },
    //Step Register Account Vendors
    {
        path: "/customer/onboarding/multi-vendor/shop-info/preferences",
        name:'step-acc-vendor-reg',
        hidden: true,
        meta: {template: 'step-acc-vendor-reg', title: "Seller Apply | 7Day"},
        component: () => import("../views/authencation/steps_acc_register_seller/StepAccRegSeller.vue"),
    }
    
]