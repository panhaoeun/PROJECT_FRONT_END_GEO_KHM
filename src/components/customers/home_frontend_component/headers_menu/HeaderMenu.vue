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
                                    <li><i class="icon-phone "></i> +054 8371 65 66</li>
                                    <li><i class="icon-envelope-open "></i> norda@domain.com</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4">
                            <div class="header-offer-wrap-3 text-center">
                                <p>Free shipping worldwide for orders over $99 <a href="#">Learn More</a></p>
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
                                <div class="hm4-currency-language-wrap same-style-wrap">
                                    <div class="same-style same-style-mrg-3 language-wrap">
                                        <a class="language-dropdown-active" href="#">ENG <i class="icon-arrow-down"></i></a>
                                        <div class="language-dropdown">
                                            <ul>
                                                <li><a href="#">English</a></li>
                                                <li><a href="#">German</a></li>
                                                <li><a href="#">Spanish</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="same-style same-style-mrg-3 currency-wrap">
                                        <a class="currency-dropdown-active" href="#"> USD <i class="icon-arrow-down"></i></a>
                                        <div class="currency-dropdown">
                                            <ul>
                                                <li><a href="#">USD</a></li>
                                                <li><a href="#">EUR</a></li>
                                                <li><a href="#">BDT</a></li>
                                            </ul>
                                        </div>
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
                                            <li>
                                                <a href="#">All Categories </a>
                                                <ul class="mega-menu-style mega-menu-mrg-2">
                                                    <li>
                                                        <ul>
                                                            <li>
                                                                <a class="dropdown-title" href="#">Shop Layout</a>
                                                                <ul>
                                                                    <li><a href="shop.html">standard style</a></li>
                                                                    <li><a href="shop-list.html">shop list style</a></li>
                                                                    <li><a href="shop-fullwide.html">shop fullwide</a></li>
                                                                    <li><a href="shop-no-sidebar.html">grid no sidebar</a></li>
                                                                    <li><a href="shop-list-no-sidebar.html">list no sidebar</a></li>
                                                                    <li><a href="shop-right-sidebar.html">shop right sidebar</a></li>
                                                                    <li><a href="store-location.html">store location</a></li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <a href="#"><img src="../../../../assets/img/product/banner-12.png" alt=""></a>
                                                            </li>
                                                             <li>
                                                                <a href="#"><img src="../../../../assets/img/product/banner-12.png" alt=""></a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li><a href="blog.html">BLOG </a>
                                                <ul class="sub-menu-style">
                                                    <li><a href="blog.html">blog standard </a></li>
                                                    <li><a href="blog-no-sidebar.html">blog no sidebar </a></li>
                                                    <li><a href="blog-right-sidebar.html">blog right sidebar</a></li>
                                                    <li><a href="blog-details.html">blog details</a></li>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
import $ from "jquery";
import MobileMenu from "./MobileMenu.vue";
import ProductCategoriesHeader from "./header_categories/HeaderCategoriesArea";
export default {
    components: { MobileMenu ,ProductCategoriesHeader},
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {
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
        }
    },
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>