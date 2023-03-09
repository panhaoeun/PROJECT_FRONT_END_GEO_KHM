<template>
    <header class="header">
        <!-- Header Main -->
        <div class="header_main">
            <div class="container">
                <div class="row">
                    <!-- Logo -->
                    <div class="col-lg-2 col-sm-3 col-3 order-1">
                        <div class="layout-topbar-logo">
                            <router-link to="/" >
                                <div class="layout-topbar-logos logo_container">
                                    <img  alt="logo" src="../../../assets/logo/ecommerce.png"/>
                                </div>
                            </router-link>
                        </div>
                    </div>

                    <!-- Search -->
                    <div class="col-lg-8 col-12 order-lg-2 order-3 text-lg-left text-right">
                        <div class="header_search">
                            <div class="header_search_content">
                                <div class="header_search_form_container">
                                    <form action="#" class="header_search_form clearfix">
                                        <input type="search" required="required" class="header_search_input" placeholder="Search for products...">
                                        <button type="submit" class="header_search_button trans_300" value="Submit">
                                            <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918770/search.png" alt="">
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 col-9 order-lg-2 order-2 text-lg-left text-right">
                        <div class="wishlist_cart d-flex flex-row align-items-center justify-content-end addtocartPro">
                            <!-- Profile -->
                            <div class="cart ">
                                <div class="cart_container d-flex flex-row align-items-center justify-content-end">
                                    <a href="">
                                        <div class="cart_icon">
                                            <img src="https://img.icons8.com/external-thin-kawalan-studio/96/null/external-user-users-thin-kawalan-studio-7.png" class="w-5"/>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <!-- Cart -->
                            <div class="cart">
                                <div class="cart_container d-flex flex-row align-items-center justify-content-end mr-2">
                                    <a href="">
                                        <div class="cart_icon ">
                                            <img src="https://img.icons8.com/external-others-zufarizal-robiyanto/64/000000/external-sale-garis-black-friday-others-zufarizal-robiyanto-11.png" class="w-8"/>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main Navigation -->
        <nav class="main_nav text-gray-100 flex bg-light-subtle justify-content-between lg:justify-content-center align-items-center flex-wrap">
            <div class="container">
                <div class="row">
                    <div class="p-2">
                        <div class="main_nav_content d-flex flex-row " style="max-width:100%;">
                            <!-- Popular Search -->
                            <div class="flex align-items-start flex-column lg:justify-content-between lg:flex-row h-auto" style="margin-top: -16px;">
                               <div class="flex align-items-center text-700 flex-wrap">
                                    <div class="mr-5 flex align-items-center mt-3">
                                        <span>Category's</span>
                                    </div>
                                    <div class="mr-5 flex align-items-center mt-3">
                                        <span>Deals</span>
                                    </div>
                                    <div class="mr-5 flex align-items-center mt-3">
                                        <span>What's New</span>
                                    </div>
                                    <div class="mr-5 flex align-items-center mt-3">
                                        <span>Pickup & Delivery</span>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
<script setup></script>