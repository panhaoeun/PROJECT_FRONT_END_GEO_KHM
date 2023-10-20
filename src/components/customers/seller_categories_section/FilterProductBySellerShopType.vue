<template>
     <div class="breadcrumb-area bg-red-50">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <div class="pb-5">
                        <div class="row rtl" v-if="filtersProductByShopBrand">
                            <div class="col-lg-12 mt-2">
                                <el-card class="bg-white border-red-500 border-round-lg">
                                    <!-- Banner -->
                                    <img 
                                        class="__shop-page-banner" 
                                        :src="`${ENV_HOST_PATH_FILE}uploads/sellers/shop_banner/${filtersProductByShopBrand?.sh_banner}`"
                                        alt=""
                                        style="max-height: 14.75rem;"
                                    >
                                </el-card>
                            </div>
                            <div class="pb-3"></div>
                            <!-- Logo and Shop Detail -->
                            <div class="col-lg-3 rtl gap3">
                                <el-card :body-style="{ padding: '0px' }" class="bg-white-alpha-50 border-primary">
                                    <img 
                                        :src="`${ENV_HOST_PATH_FILE}uploads/sellers/shop_logo/${filtersProductByShopBrand?.shop_logo}`"
                                        class="w-5rem"
                                    >
                                    <div style="padding: 14px;">
                                        <span class="text-lg h3">{{ filtersProductByShopBrand?.shop_eng }}</span>
                                        <div class="bottom clearfix">
                                            <span class="font-bold text-md">Shop Location: </span>
                                            <span>
                                                {{ shopLocationSeller?.shopAddr01 }},
                                                {{ shopLocationSeller?.shopAddr02 }},
                                                {{ shopLocationSeller?.shop_city }}
                                            </span>
                                        </div>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </div>
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
                                <template v-if="filtersProductByShopList!== null && filtersProductByShopList.length > 0">
                                    <div id="shop-2" class="tab-pane active" v-for="(productFilter, index) in filtersProductByShopList" :key="index">
                                        <div class="shop-list-wrap mb-30">
                                            <div class="row"> 
                                                <div class="col-xl-4 col-lg-5 col-md-6 col-sm-6">
                                                    <div class="product-list-img">
                                                        <router-link 
                                                            to="#"
                                                            @click="gotoProductPageFilterById(productFilter?.id,productFilter?.product_eng)"
                                                        >
                                                            <template v-if="productFilter?.product_picture !== undefined">
                                                                <img 
                                                                    :src="`${ENV_HOST_PATH_FILE}uploads/products_img/thumbnail/${productFilter?.product_picture}`" 
                                                                    :alt="productFilter?.product_eng"
                                                                >
                                                            </template>
                                                            <template v-else>
                                                                <img src="../../../assets/img/photos/not_image.jpeg"/>
                                                            </template>
                                                        </router-link>
                                                    </div>
                                                </div>
                                                <div class="col-xl-8 col-lg-7 col-md-6 col-sm-6">
                                                    <div class="shop-list-content">
                                                        <h3>
                                                            <router-link 
                                                                to="#"
                                                                @click="gotoProductPageFilterById(productFilter?.id,productFilter?.product_eng)"
                                                            >
                                                                {{ productFilter?.product_eng ? productFilter?.product_eng : '' }}
                                                            </router-link>
                                                        </h3>
                                                        <div class="pro-list-price">
                                                            <span class="new-price">{{ currencyFormattedKHRiel(productFilter?.product_unit_price_khr) }}
                                                            </span>
                                                            <span class="old-price">
                                                                {{ currencyFormattedUSD(productFilter?.product_unit_price) }}
                                                            </span>
                                                        </div>
                                                        <div class="product-list-action">
                                                            <button 
                                                                title="View Product Detail" 
                                                                @click="gotoProductPageFilterById(productFilter?.id,productFilter?.product_eng)"
                                                            >
                                                                <i class="icon-eye"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <el-empty description="Empty product" />
                                </template>
                            </div>
                            <!-- Pagination's -->
                            <!-- <template v-if="filtersProductByShopList!== null && filtersProductByShopList.length > 0">
                                <div class="pro-pagination-style text-center mt-10">
                                    <ul>
                                        <li><a class="prev" href="#"><i class="icon-arrow-left"></i></a></li>
                                        <li><a class="active" href="#">1</a></li>
                                        <li><a href="#">2</a></li>
                                        <li><a class="next" href="#"><i class="icon-arrow-right"></i></a></li>
                                    </ul>
                                </div>
                            </template> -->
                        </div>
                    </div>
                    <!-- Search and Categories -->
                    <!-- <div class="col-lg-3">
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
                                            <a href="#">{{ categories?.catNameEn ? categories?.catNameEn : '' }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
</template>
<!-- Script of JS -->
<script>
import CommonListPublicServices from "@/services/customers/common_list/CommonListPublicServices.js";
import CommonPublicStoreServices from '../../../services/common_public/CommonPublicStoreServices';
export default {
    data() {
        return {
            customerType: null,
            customerId: {},
            commonCategoriesFilterList: null,
            commonSubCategoriesFilterList: null,
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
            loadingProductList: false,
            filtersProductByShopList: [],
            filtersProductByShopBrand: [],
            shopLocationSeller: []
        };
    },
    created(){
        this.commonPublic = new CommonPublicStoreServices();
        this.commonServices = new CommonListPublicServices();
    },
    mounted() {
        // Common Categories
        this.getCommonCategoriesFIlter();
        // ProductList
        this.getSellerProductTypeByShopFilter();
    },
    methods: {
        // Convert Currency Amount
        currencyFormattedKHRiel(value){
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD(value){
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
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
        gotoProductPageFilterById(productId, productName){
            if (!productId && !productName) return;
            this.$router.push(
                {
                    path: '/customer/product-details/product/view-product-detail',
                    query: {
                        pid: productId ? productId : 0,
                        pname:encodeURIComponent(productName ? productName : '').replace(/[!'()]/g, escape).replace('\'', '%27')
                    }
                }
            );  
        },
        // Get Seller By Product Type
        async getSellerProductTypeByShopFilter(){
            const shopTypeIdFilter = this.$route.query.sId ? this.$route.query.sId : 0;
            this.commonPublic.searchProductByShopCategoriesSeller(shopTypeIdFilter)
                .then((sellerProduct) => {
                    if (!Array.isArray(sellerProduct) || !sellerProduct.length > 0) {
                        this.filtersProductByShopList = [];
                        this.filtersProductByShopBrand = [];
                    }
                    if (!Array.isArray(sellerProduct) || sellerProduct !== undefined || sellerProduct !== null) {
                        this.filtersProductByShopList = sellerProduct.productFilter ? sellerProduct.productFilter : '';
                        this.filtersProductByShopBrand = sellerProduct.shop ? sellerProduct.shop : '';
                        this.shopLocationSeller = sellerProduct.locationShop ? sellerProduct.locationShop : '';
                        this.loadingProductList = false;
                    }
                });
        }
    }
}
</script>