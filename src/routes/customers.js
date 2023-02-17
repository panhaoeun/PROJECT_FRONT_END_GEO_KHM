

export default [
    {
        path:'/',
        name:'customers',
        meta: {template: 'website'},
        children:[
            {
                path:'/', 
                component:()=> import('../views/customers/home/homePage.vue'),
            },
          {
            path: "/customer/product-details",
            name:'product-details',
            component: () => import("../views/customers/product_item/product_details/ProductDetails.vue"),
          }
        ]
      }
]