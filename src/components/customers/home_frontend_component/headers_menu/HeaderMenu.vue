<template>
    <!-- Desktop Header Menu -->
    <header class="header-area bg-white">
        <div class="header-large-device section-padding-2">
            <div class="header-top header-top-ptb-3 bg-black">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-xl-4 col-lg-3">
                            <div class="header-quick-contect">
                                <ul>
                                    <li><i class="icon-phone "></i> +016 387 467</li>
                                    <li><i class="icon-envelope-open "></i>e-24market@gmail.com</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4">
                            <div class="header-offer-wrap-3 text-center">
                                <!-- <p>Free shipping worldwide for orders over $99 <a href="#">Learn More</a></p> -->
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-5">
                            <div class="header-top-right">
                                <div class="social-hm4-wrap">
                                    <span>Follow us</span>
                                    <div class="social-style-1 social-style-1-white">
                                        <a href="#"><i class="icon-social-twitter"></i></a>
                                        <a href="#"><i class="icon-social-facebook"></i></a>
                                        <a href="#"><i class="icon-social-instagram"></i></a>
                                        <a href="#"><i class="icon-social-youtube"></i></a>
                                        <a href="#"><i class="icon-social-pinterest"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-bottom">
                <div class="container-fluid">
                    <div class="border-bottom-6">
                        <div class="row align-items-center">
                            {{ get }}
                            <!-- Menu Sidebar Left -->
                            <div class="col-xl-3 col-lg-2">
                                <div class="logo">
                                    <router-link to="/">
                                        <img src="../../../../assets/company_logo/ecommerce_logo.png" width="100" alt="logo">
                                    </router-link>
                                </div>
                            </div>
                            <!-- Menu Sidebar Center -->
                            <div class="col-xl-6 col-lg-7">
                                <div class="main-menu main-menu-padding-1 main-menu-lh-3 main-menu-hm4 main-menu-center">
                                    <nav>
                                        <ul>
                                            <li>
                                                <router-link class="active" to="/">HOME </router-link>
                                            </li>
                                            <!--All Categories -->
                                            <li>
                                                <router-link to="/customer/search-product/query-product/filter-product-by-name">All Categories </router-link>
                                                <ul class="mega-menu-style mega-menu-mrg-2">
                                                    <li>
                                                        <ul v-if="commonCategoriesList !== null">
                                                            <li v-for="(category,index) in commonCategoriesList" :key="index">
                                                                <a class="dropdown-title" href="#">{{ category.catNameEn }} {{ category.catID }}</a>                                                                                                                               <ul>
                                                                    <template v-if="commonSubCategoriesList !== null">
                                                                        <li v-for="(subCat, index) in commonSubCategoriesList" :key="index" >
                                                                            <router-link to="#" v-if="subCat.superCatId === category.catID">
                                                                                {{ subCat.categoryNameEng }}
                                                                                {{ subCat.catID }}
                                                                            </router-link>
                                                                        </li>
                                                                    </template>
                                                                </ul>
                                                            </li>
                                                            
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li><a href="/">BECOME SELLER </a>
                                                <ul class="sub-menu-style">
                                                    <li><router-link to="/auth/register">Become Seller </router-link></li>
                                                    <li><router-link to="/auth/login">Seller Login </router-link></li>
                                                </ul>
                                            </li>
                                            <li><router-link to="/customer/admin_contact_info/contact_info">CONTACT </router-link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <!-- Menu Sidebar Right -->
                            <div class="col-xl-3 col-lg-3">
                                <div class="header-action header-action-flex header-action-mrg-right">
                                    <div class="same-style-2 header-search-1">
                                        <p class="search-toggle cursor-pointer" style="font-size: 1.4rem" @click.prevent="searchToggleProduct()" href="#">
                                            <i class="icon-magnifier s-open"></i>
                                            <i class="icon_close s-close"></i>
                                        </p>
                                        <div class="search-wrap-1">
                                            <form action="#">
                                                <input placeholder="Search products…" type="text">
                                                <button class="button-search"><i class="icon-magnifier"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                    <!-- Menu Dropdown -->
                                    <div class="same-style-2 same-style-2-font-inc">
                                        <el-dropdown :hide-on-click="false">
                                            <div class="el-dropdown-link">
                                                <i class="icon-user" style="font-size: 20px;"></i>         
                                            </div>
                                            <!-- Dropdown menu for login successfully-->
                                            <template #dropdown v-if="isLoggedIn()">
                                                <el-dropdown-menu>
                                                    <el-dropdown-item>
                                                        <div class="flex justify-content-center px-2 py-2" @click="$router.push('/auth/login')">
                                                            <i class="icon-basket" style="font-size: 15px;"></i>   
                                                            <p class="font-semibold pl-2">My Order</p>      
                                                        </div>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item>
                                                        <div class="flex justify-content-center px-2 py-2" @click="$router.push('/customer/my_profile/view-customer-detail')">
                                                            <i class="icon-user-follow" style="font-size: 15px;"></i>   
                                                            <p class="font-semibold pl-2">
                                                                My Profile
                                                            </p>      
                                                        </div>
                                                    </el-dropdown-item>
                                                    <!-- Logout -->
                                                    <el-dropdown-item divided>
                                                        <div class="flex justify-content-center px-2 py-2" @click="currentCustomerLogout()">
                                                            <i class="icon-logout" style="font-size: 15px;"></i>   
                                                            <p class="font-semibold pl-2">Logout</p>      
                                                        </div>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                            <!-- Login first -> Return Login or Register Account -->
                                            <template #dropdown v-else>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item>
                                                        <div class="flex justify-content-center px-2 py-2" @click="$router.push('/auth/login')">
                                                            <i class="icon-login" style="font-size: 15px;"></i>   
                                                            <p class="font-semibold pl-2">Sing In</p>      
                                                        </div>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item>
                                                        <div class="flex justify-content-center px-2 py-2" @click="$router.push('/auth/register')">
                                                            <i class="icon-lock" style="font-size: 15px;"></i>   
                                                            <p class="font-semibold pl-2">Sing up</p>      
                                                        </div>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>    
                                    </div>
                                    <div class="same-style-2 same-style-2-font-inc header-cart">
                                       <!-- Item of cart -->
                                       <template v-if="isLoggedIn()">
                                            <router-link class="cart-active" to="/customer/shopping-cart/product-list/cart-items">
                                                <i class="icon-basket-loaded"></i>
                                                <span class="pro-count black">
                                                    <template v-if="cart.length >=1">
                                                        {{ cart.length ? cart.length : 0  }}
                                                    </template>
                                                    <template v-else>
                                                        0
                                                    </template>
                                                </span>
                                            </router-link>
                                       </template>
                                       <!-- Cart item localstorage -->
                                        <template v-else>
                                            <router-link class="cart-active" to="/customer/shopping-cart/product-list/cart-items">
                                                <i class="icon-basket-loaded"></i>
                                                <span class="pro-count black">
                                                    <template v-if="cart.length >=1">
                                                        {{ cart.length ? cart.length : 0  }}
                                                    </template>
                                                    <template v-else>
                                                        0
                                                    </template>
                                                </span>
                                            </router-link>
                                       </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Categories -->
        <div class="header-small-device small-device-ptb-1 border-bottom-2">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-5">
                        <div class="mobile-logo">
                            <a href="index.html">
                                <img alt="" src="assets/images/logo/logo.png">
                            </a>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="header-action header-action-flex">
                            <div class="same-style-2 same-style-2-font-inc">
                                <a href="login-register.html"><i class="icon-user"></i></a>
                            </div>
                            <div class="same-style-2 same-style-2-font-inc">
                                <a href="wishlist.html"><i class="icon-heart"></i><span class="pro-count black">03</span></a>
                            </div>
                            <div class="same-style-2 same-style-2-font-inc header-cart">
                                <a class="cart-active" href="#">
                                    <i class="icon-basket-loaded"></i><span class="pro-count black">02</span>
                                </a>
                            </div>
                            <div class="same-style-2 main-menu-icon">
                                <router-link to="#" class="mobile-header-button-active" @click.prevent="mobileHeaderActive()" >
                                    <i class="icon-menu"></i> 
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- mobile header start -->
    <MobileMenu/>
    <!--Product Categories-->
    <ProductCategoriesHeader/>
</template>
<script>
import axios from 'axios'
import $ from "jquery";
import MobileMenu from "./MobileMenu.vue";
import ProductCategoriesHeader from "./header_categories/HeaderCategoriesArea";
import CustomerServicesBaseAdmin from '../../../../services/administrator/customers/CustomerServices';
import AuthenticationsDataService from '@/services/authencationDataService';
import router from "../../../../routes/routes";
import {isLoggedIn} from '@/utils/auth/auth';
import { mapGetters } from "vuex";
import  CustomerOrderCheckOutServices from "@/services/customers/CustomerOrdersServices.js";
import  CommonListPublicServices from "@/services/customers/common_list/CommonListPublicServices.js";
export default {
    components: { MobileMenu ,ProductCategoriesHeader},
    props: {},
    data() {
        return {
            customerType: null,
            customerId: {},
            commonCategoriesList: null,
            commonSubCategoriesList: null
        };
    },
    computed: {
        ...mapGetters({
            cart: 'cart/getCartAuthItem',  
            cartTotal: 'cart/getTotal',
            subtotal: 'cart/getSubTotal',
            totalShipping: 'cart/cartTotalShipping',
        }),
    },
    created() {
        this.customerCurrentId = new CustomerServicesBaseAdmin();
        this.customerCurrentOrder = new CustomerOrderCheckOutServices();
        this.commonServices = new CommonListPublicServices();
        // Login
        if(isLoggedIn()){
            this.initiateApp();
        }else{
            this.$store.commit('shippingStore/resetAddresses');
            this.$store.commit('cart/resetOrders');
        }
    },
    mounted() {
        const userId = this.$store.state.auth.userArr;
        this.getProfileCurrentAccount(userId);
        // Common Categories
        this.getCommonCategories();
    },
    methods: {
        // Categories
        getCommonCategories(){
            this.commonServices.getCommonCategoriesSubCategories()
            .then((common)=> {
                if (!common) {
                    this.commonCategoriesList = Array.isArray() ?? [];
                    this.commonSubCategoriesList = Array.isArray() ?? [];
                }
                this.commonCategoriesList = common?.categories;
                this.commonSubCategoriesList = common?.subCategory;
            })
        },
        // Check login
        isLoggedIn() {
            return isLoggedIn();
        },
        async initiateApp(){
            try{
               if(isLoggedIn()){
                 await this.$store.dispatch('cart/getCartByCurrentCustomer');
               }
            }catch(error){
                return Promise.reject(error);
            }
        },
        searchToggleProduct: function(){
            /*-------------------------------
                  Header Search Toggle
            -----------------------------------*/
            if($('.search-toggle').hasClass('open')){
                    $('.search-toggle').removeClass('open');
                    $('.search-toggle').siblings('.search-wrap-1').removeClass('open');
            }else{
                $('.search-toggle').addClass('open');
                $('.search-toggle').siblings('.search-wrap-1').addClass('open');
            }
        },
        /*====== Sidebar menu Active ======*/
        mobileHeaderActive: function() {
            var navbarTrigger = $('.mobile-header-button-active'),
                endTrigger = $('.sidebar-close'),
                container = $('.mobile-header-active'),
                wrapper4 = $('.main-wrapper');
            wrapper4.prepend('<div class="body-overlay-1"></div>');

            navbarTrigger.on('click', function (e) {
                e.preventDefault();
                container.addClass('sidebar-visible');
                wrapper4.addClass('overlay-active-1');
            });

            endTrigger.on('click', function () {
                container.removeClass('sidebar-visible');
                wrapper4.removeClass('overlay-active-1');
            });

            $('.body-overlay-1').on('click', function () {
                container.removeClass('sidebar-visible');
                wrapper4.removeClass('overlay-active-1');
            });
        },
        getProfileCurrentAccount(customerId){
            try{
                if(!Array.isArray(customerId) || !customerId.length > 0){
                    this.customerType = null;
                    this.customerId = null;
                }else{
                    this.customerType = customerId[1].typeUser ? customerId[1].typeUser : '';   
                    this.customerId = customerId[0] ? customerId[0] : ''; 
                }
            }catch(error){
                this.customerType = null;
                this.customerId = null;
            }
        },
        currentCustomerLogout(){
            AuthenticationsDataService.authLogout().then((response) => {
                console.log(response)
                this.$toast.add({ severity: 'Logout Successfully', summary: 'Info', detail: response.data.message, life: 3000 });
                localStorage.clear('token');
                localStorage.clear('tokenExpiry');
                localStorage.clear('expiresIn')
                localStorage.clear('user');
                localStorage.clear('userId');
                router.push("/auth/login");
                window.location.reload();
                /**
                 * Delete Cookies
                 * */
                this.deleteAllCookies();
                // Remove token
                axios.defaults.headers.common['Authorization'] = ''
                const token = localStorage.getItem('token');
                localStorage.removeItem(token);
            }).catch((error) => {
                Promise.reject(error);
            });
        },
        deleteAllCookies() {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + `=;expires=${new Date(
                    0
                ).toUTCString()}`;
            }
        },
        // Get Current Order
        getCustomerCartOrderItem(){
            const proItem = {
                productId: 10,
                productQty: 1,
                productPrice: 25,
                type: 'new'
            }   
            this.customerCurrentOrder.createCartOrderItemCustomer(proItem).then((proItem) => console.log(proItem)).catch((error) => console.log(error));
        },

    }
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>