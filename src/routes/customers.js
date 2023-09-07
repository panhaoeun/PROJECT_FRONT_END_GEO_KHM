export default [
    {
        path: '/',
        name: 'customers',
        hidden: true,
        meta: {
            template: 'website',
            title: "Online Shopping | 7Day",
        },
        children: [
            {
                path: '/',
                component: () => import('../views/customers/MainCustomerPage1.vue'),
            },
            {
                path: '/profile',
                name: "profile",
                component: () => import('../views/customers/my_profiles/new_profile/ProfilePage.vue'),
                children: [
                    {
                        path: "/profile",
                        name: 'account-order',
                        component: () => import('../views/customers/my_profiles/new_profile/order.vue')
                    },
                    {
                        path: "/profile/my-wallet",
                        name: 'account-my-wallet',
                        component: () => import('../views/customers/my_profiles/new_profile/wallet/MyWallet.vue'),
                        children: [
                            {
                                path: "/profile/my-wallet",
                                component: () => import('../views/customers/my_profiles/new_profile/wallet/CreateDeposit.vue'),
                            },
                            {
                                path: "/profile/my-wallet/history",
                                component: () => import('../views/customers/my_profiles/new_profile/wallet/History.vue'),
                            },
                        ]
                    },
                    {
                        path: "/profile/favorite",
                        name: 'account-favorite',
                        component: () => import('../views/customers/my_profiles/new_profile/Favorite.vue')
                    },
                    {
                        path: "/profile/address",
                        name: 'account-address',
                        component: () => import('../views/customers/my_profiles/new_profile/Address.vue')
                    },
                    {
                        path: "/profile/change-password",
                        name: 'change-password',
                        component: () => import('../views/customers/my_profiles/new_profile/ChangePassword.vue')
                    },
                    {
                        path: "/profile/acount-info",
                        name: 'account-info',
                        component: () => import('../views/customers/my_profiles/new_profile/DataInfo.vue')
                    }
                ]
            },
            /**
             * @Router My Order Payment & My Accounts
             * */
            {
                path: "/customer/product-details/product/view-product-detail",
                name: 'product-details',
                component: () => import("../views/customers/product_item/product_details/ProductDetails.vue"),
                beforeEnter: (to, from, next) => {
                    // Check Empty Queries
                    let typePID = typeof to.query?.pid;
                    let typePName = typeof to.query?.pname;
                    if (Object.keys(to.query).length < 1 || typePID === 'undefined' || typePName === 'undefined') {
                        next({
                            path: '/customer/shopping-cart/product-list/cart-items'
                        });

                    } else if (to.query?.pname === '' || to.query?.id === '') {
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
            /*
            @Add to cart
            * */
            {
                path: "/customer/shopping-cart/product-list/cart-items",
                name: 'shopping-cart',
                component: () => import("../views/customers/sopping_cart/MainOfShoppingCart.vue"),
            },
            {
                path: "/customer/my-account/shopping-cart/orders/checkout",
                name: 'my-acc-checkouts',
                component: () => import("../views/customers/sopping_cart/MyAccCheckOut.vue"),
            },
            {
                path: "/customer/my-account/wishlist",
                name: 'wishlist-my-account-cart',
                component: () => import("../views/customers/sopping_cart/WishlistOfProduct.vue"),
            },
            {
                path: "/customer/more-product",
                name: 'more-product',
                component: () => import("../views/customers/sopping_cart/MoreProductRecommend.vue"),
            },
            {
                path: "/customer/order/account_detail",
                name: 'account-detail',
                component: () => import("../views/customers/my_profiles/MyProfileDetails.vue"),
            },
            /**
            * @Router Products
            * @Filter Product By Query Product
            * */
            {
                path: "/customer/search-product/query-product/filter-product-by-name",
                name: 'query-product-detail',
                component: () => import("../views/customers/product_filter/ProductFilters.vue"),
            },
            //Contact Info
            {
                path: '/n',
                name: 'contact-info',
                component: () => import('../components/customers/home_frontend_component/contact_us/ContactInfo.vue'),
            },
        ]
    },

]