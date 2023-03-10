

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
          },
          {
            path: "/customer/shopping-cart",
            name:'shopping-cart',
            component: () => import("../views/customers/sopping_cart/MainOfShoppingCart.vue"),
          },
          {
            path: "/customer/more-product",
            name:'more-product',
            component: () => import("../views/customers/sopping_cart/MoreProductRecommend.vue"),
          //Overview Details
          },
          {
            path: "/customer/order/account_detail",
            name:'account-detail',
            component: () => import("../views/customers/my_profiles/MyProfileDetails.vue"),
          }
          
        ]
      }
]