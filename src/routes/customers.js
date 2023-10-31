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
            // Product Filters
         {
            path: '/customer/customer_filter/filter_product_name',
            name: 'customer-filter-product',
            component: () => import('../components/customers/home_frontend_component/shop_product_filter_by_category/ProductFilterByCategoryName.vue'),
         },
          {
            path:'/', 
            meta: { 
                title: "Online Shopping | 7Day"
            },
            component:()=> import('../views/customers/MainCustomerPage.vue'),
          },
        //Contact Info
        {
            path: '/customer/admin_contact_info/contact_info',
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
         * @Router New Customer Order cart
        * **/ 
        {
            path: "/customer/shopping-cart/new-custom-cart-item-order",
            name: 'shopping-cart-customer-item',
            component: () => import("../views/customer_new_ui/customer_cart_item/CustomerCartItemNew.vue"),
        },
        {
            path: "/product-details/product/:slugName/:productId",
            name: 'view-customer-detail-by-id-slug',
            component: () => import("../views/customer_new_ui/product/_id.vue"),
        },
        {
            path: "/customer/shipping-address/check-out-customer",
            name: 'shipping-address',
            beforeEnter: requireAuth,
            component: () => import("../views/customer_new_ui/checkout_payment/shipping_billing_address/ShippingAddressCheckout.vue"),
        },
        {
            path: "/customer/checkout-payment/payment-method",
            name: 'payment-check-gate-way',
            beforeEnter: requireAuth,
            component: () => import("../views/customer_new_ui/checkout_payment/PaymentMethodCheckOut.vue"),
        },
        // My Profile
        {
             path: "/user/profile",
             name: 'my-account-profile',
             beforeEnter: requireAuth,
             component: () => import("../views/customer_new_ui/my_customer_profile/users_profile/UsersProfile.vue"),
        },
        {
            path: "/user/orders",
            name: 'my-account-order-history',
            beforeEnter: requireAuth,
            component: () => import("../views/customer_new_ui/my_customer_profile/customer_orders/CustomerOrderHistory.vue"),
         },
        {
            path: "/user/addresses",
            name: 'my-account-user-address',
            beforeEnter: requireAuth,
            component: () => import("../views/customer_new_ui/my_customer_profile/users_profile/AccountUserAddress.vue"),
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
            path: '/customer/my-account/checkout-complete',
            name: 'customer-checkout-completed',
            meta: {
                isCustomer: true,
                requiresAuth: true
            },
            component: () => import('../views/customers/sopping_cart/CustomerCheckOutCompleted.vue'),
            beforeEnter: (to, from, next) => {
                 // Check Empty Queries
                 let typeOrderId = typeof to.query?.orderId;
                 if (Object.keys(to.query).length < 1 || typeOrderId === 'undefined') {
                     next({
                         path: '/'
                     });

                 } else if (to.query?.orderId === '' || to.query?.orderId === '') {
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
         * @Router Products
         * @Filter Product By Query Product
         * */   
         {
            path: "/customer/search-product/query-product/filter-product-by-name",
            name:'query-product-detail',
            component: () => import("../views/customers/product_filter/ProductFilters.vue"),
            beforeEnter: (to, from, next) => {
                // Check Empty Queries
                let typeCatId = typeof to.query?.cateId;
                if (Object.keys(to.query).length < 1 || typeCatId === 'undefined') {
                     next({
                         path: '/'
                     });
                     
                }else if(to.query?.cateId === '' || to.query?.cateId === ''){
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
         * @Router Products Filter By Shop
         * @Filter Filter By Shop
         * */
        {
            path: "/customer/search-product/filter-product-shop/shop-type-search",
            name: 'filter-search-product-detail',
            component: () => import("../components/customers/seller_categories_section/FilterProductBySellerShopType.vue"),
            beforeEnter: (to, from, next) => {
                // Check Empty Queries
                let typePID = typeof to.query?.sId;
                if (Object.keys(to.query).length < 1 || typePID === 'undefined') {
                     next({
                         path: '/'
                     });
                     
                }else if(to.query?.sId === '' || to.query?.sId === ''){
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
         * @Router Customer 
         * @Customer Profile
         * 
        * */
           {
               path: '/customer/my_profile/view-customer-detail',
               name: "customer-view-profile",
               beforeEnter: requireAuth,
               component: () => import("../views/customers/my_profiles/MyProfileDetails.vue"), 
           },
        ]
    },
]