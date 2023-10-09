<template>
     <div class="breadcrumb-area bg-gray-200">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li class="active">Shop List</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Shop Area -->
        <div class="shop-area pt-40 pb-120 bg-white">
            <div class="container">
                <div class="row flex-row-reverse">
                    <div class="col-lg-9">
                        <div class="shop-bottom-area">
                            <div class="tab-content jump">
                                <div id="shop-2" class="tab-pane active">
                                    <div class="shop-list-wrap mb-30">
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-5 col-md-6 col-sm-6">
                                                <div class="product-list-img">
                                                    <a href="product-details.html">
                                                        <img src="assets/images/product/product-13.jpg" alt="Product Style">
                                                    </a>
                                                    <div class="product-list-quickview">
                                                        <button title="Quick View" data-toggle="modal" data-target="#exampleModal"><i class="icon-size-fullscreen icons"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-8 col-lg-7 col-md-6 col-sm-6">
                                                <div class="shop-list-content">
                                                    <h3><a href="product-details.html">Basic Joggin Shorts</a></h3>
                                                    <div class="pro-list-price">
                                                        <span class="new-price">$35.45</span>
                                                        <span class="old-price">$45.80</span>
                                                    </div>
                                                    <div class="product-list-rating-wrap">
                                                        <div class="product-list-rating">
                                                            <i class="icon_star"></i>
                                                            <i class="icon_star"></i>
                                                            <i class="icon_star"></i>
                                                            <i class="icon_star gray"></i>
                                                            <i class="icon_star gray"></i>
                                                        </div>
                                                        <span>(3)</span>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipic it, sed do eiusmod tempor labor incididunt ut et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                                                    <div class="product-list-action">
                                                        <button title="Add To Cart"><i class="icon-basket-loaded"></i></button>
                                                        <button title="Wishlist"><i class="icon-heart"></i></button>
                                                        <button title="Compare"><i class="icon-refresh"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                          
                                </div>
                            </div>
                            <div class="pro-pagination-style text-center mt-10">
                                <ul>
                                    <li><a class="prev" href="#"><i class="icon-arrow-left"></i></a></li>
                                    <li><a class="active" href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a class="next" href="#"><i class="icon-arrow-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- Search and Categories -->
                    <div class="col-lg-3">
                        <div class="sidebar-wrapper sidebar-wrapper-mrg-right">
                            <div class="sidebar-widget mb-40">
                                <h4 class="sidebar-widget-title">Search </h4>
                                <div class="sidebar-search">
                                    <form class="sidebar-search-form" action="#">
                                        <input type="text" placeholder="Search here...">
                                        <button>
                                            <i class="icon-magnifier"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div class="sidebar-widget shop-sidebar-border mb-35 pt-40">
                                <h4 class="sidebar-widget-title">Categories </h4>
                                <div class="shop-catigory">
                                    <ul>
                                        <li v-for="(categories, index) in commonCategoriesFilterList" :key="index">
                                            <a href="#">{{ categories?.catNameEn }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<!-- Script of JS -->
<script>
import  CommonListPublicServices from "@/services/customers/common_list/CommonListPublicServices.js";
export default {
    data() {
        return {
            customerType: null,
            customerId: {},
            commonCategoriesFilterList: null,
            commonSubCategoriesFilterList: null
        };
    },
    created(){
        this.commonServices = new CommonListPublicServices();
    },
    mounted() {
        // Common Categories
        this.getCommonCategoriesFIlter();
    },
    methods: {
         // Categories
        getCommonCategoriesFIlter(){
            this.commonServices.getCommonCategoriesSubCategories()
            .then((common)=> {
                if (!common) {
                    this.commonCategoriesFilterList = Array.isArray() ?? [];
                    this.commonSubCategoriesFilterList = Array.isArray() ?? [];
                }
                this.commonCategoriesFilterList = common?.categories;
                this.commonSubCategoriesFilterList = common?.subCategory;
            })
        },
    }
}
</script>