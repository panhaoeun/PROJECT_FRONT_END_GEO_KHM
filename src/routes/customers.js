import { isLoggedIn } from "@/utils/auth/auth";
// auth guard or route guard
// requires to be authenticated
const requireAuth = (to, from, next) => {
    let user = isLoggedIn();
    if (!user) {
        next({
            name: 'auth-login'
        })
    }
    next()
}
export default [
    
    {
        path:'/',
        name:'customers',
        hidden: true,
        meta: {
            template: 'website',
            title: "Online Shopping | 7Day",
        },
        children:[
          {
            path:'/', 
            meta: { 
                title: "Online Shopping | 7Day"
            },
            component:()=> import('../views/customers/MainCustomerPage.vue'),
          },
        //Contact Info
        {
            path: '/contact-info',
            name: 'contact-info',
            component: () => import('../components/customers/home_frontend_component/contact_us/ContactInfo.vue'),
        },
        {
            path: "/customer/product-details/product/view-product-detail",
            name:'product-details',
            meta: {
                title: "View Product Detail",
                isCustomer: true
            },
            component: () => import("../views/customers/product_item/product_details/ProductDetails.vue"),
            beforeEnter: (to, from, next) => {
                // Check Empty Queries
                let typePID = typeof to.query?.pid;
                let typePName = typeof to.query?.pname;
                if (Object.keys(to.query).length < 1 || typePID === 'undefined' || typePName === 'undefined') {
                     next({
                         path: '/customer/shopping-cart/product-list/cart-items'
                     });
                     
                }else if(to.query?.pname === '' || to.query?.id === ''){
                    next({
                        path: '/'
                    })
                }
                if (Object.keys(to.query).length > 0) {
                    if (!Object.prototype.hasOwnProperty.call(to.query)) {
                       next();
                       return true;
                    }
                }
            }
          },
        /**
         * @Router My Order Payment & My Accounts
         * */
        /**
         * @api {post} /api/product Add Product API
         * @apiGroup Product
        */
            {
                path: "/customer/shopping-cart/product-list/cart-items",
                name: 'shopping-cart',
                component: () => import("../views/customers/sopping_cart/MainOfShoppingCart.vue"),
            },
           {
                path: "/customer/my-account/shopping-cart/orders/checkout",
                name: 'my-acc-checkouts',
                meta: {
                    isCustomer: true,
                    requiresAuth: true
                },
               beforeEnter: requireAuth,
               component: () => import("../views/customers/sopping_cart/MyAccCheckOut.vue"),
           },
          {
            path: "/customer/my-account/wishlist",
            name: 'wishlist-my-account-cart',
            meta: {
                isCustomer: true,
                requiresAuth: true
            },
            beforeEnter: requireAuth,
            component: () => import("../views/customers/sopping_cart/WishlistOfProduct.vue"),
          },
          {
            path: "/customer/more-product",
            name:'more-product',
            component: () => import("../views/customers/sopping_cart/MoreProductRecommend.vue"),
          },
          {
            path: "/customer/order/account_detail",
            name:'account-detail',
            meta: {
                isCustomer: true,
                requiresAuth: true
            },
            beforeEnter: requireAuth,
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
        ]
    },
]