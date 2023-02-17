

export default [
    {
        path:'/',
        name:'customers-index',
        meta: {template: 'website'},
        children:[
          {
            path: "/customer/product",
            name:'dev',
            component: () => import("../views/vendors/products/ProductView.vue"),
          }
        ]
      }
]