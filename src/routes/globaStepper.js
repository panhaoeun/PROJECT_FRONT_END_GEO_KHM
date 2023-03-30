export default [
    {   
        path: '/acc-reg-seller',
        name:'acc-reg-seller',
        meta: {template: 'acc-reg-seller'},
        children:[
          {
            path: "/reg-acc/onboarding/multi-vendor/shop-info/preferences/business-information",
            name:'business-information',
            component: () => import("../views/authencation/steps_acc_register_seller/stepper_acc/BusinessInformation.vue"),
          },
          {
            path: "/reg-acc/onboarding/multi-vendor/shop-info/preferences/open-store-option-type",
            name:'open-store-option-type',
            component: () => import("../components/customers/open-store-option/OpenStoreOptionType.vue"),
          },
        ]
    },
]