export default [
    {
        path:'/',
        name:'customers',
        meta: {
            template: 'website',
            title: "Online Shopping | 7Day",
        },
        children:[
          {
            path:'/', 
            component:()=> import('../views/customers/home/homePage.vue'),
          },
        /**
         * @Router My Order Payment & My Accounts
         * */   
          {
            path: "/customer/product-details/product/:id?",
            name:'product-details',
            component: () => import("../views/customers/product_item/product_details/ProductDetails.vue"),
          },
          {
            path: "/customer/shopping-cart/product-list/cart-items",
            name:'shopping-cart',
            component: () => import("../views/customers/sopping_cart/MainOfShoppingCart.vue"),
          },
          {
            path: "/customer/more-product",
            name:'more-product',
            component: () => import("../views/customers/sopping_cart/MoreProductRecommend.vue"),
          },
         {
            path: "/customer/my-account/shopping-cart/orders/checkout",
            name:'my-acc-checkouts',
            component: () => import("../views/customers/sopping_cart/MyAccCheckOut.vue"),
          },
          {
            path: "/customer/order/account_detail",
            name:'account-detail',
            component: () => import("../views/customers/my_profiles/MyProfileDetails.vue"),
          },
         /**
         * @Router Products
         * @Filter Product By Query Product
         * */   
         {
            path: "/customer/search-product/query-product/filter-product-by-name",
            name:'query-product-detail',
            component: () => import("../views/customers/product_filter/ProductFilters.vue"),
          },
          {
            path: "/customer/search-product/query-product/filter-product-by-name-02",
            name:'query-product-detail-02',
            component: () => import("../views/customers/product_filter/ProductFilter02.vue"),
          },
           {
            path: "/customer/search-product/query-product/filter-product-by-name-03",
            name:'query-product-detail-03',
            component: () => import("../views/customers/product_filter/ProductFilter03.vue"),
          }
        ]
    },
]