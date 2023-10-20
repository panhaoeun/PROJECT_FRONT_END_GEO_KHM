<template>
     <div class="breadcrumb-area bg-gray-200">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li class="active">Category Products</li>
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
                                <template v-if="filtersProductByCatProList.length > 0 && filtersProductByCatProList !== null || filtersProductByCatProList !== ''">
                                    <div id="shop-2" class="tab-pane active" v-for="(proByCatId,index) in filtersProductByCatProList" :key="index">
                                        <div class="shop-list-wrap mb-30">
                                            <div class="row">
                                                <div class="col-xl-4 col-lg-5 col-md-6 col-sm-6">
                                                    <div class="product-list-img">
                                                       <router-link @click="goToURLPageProductDetailByCatId(proByCatId?.id,proByCatId?.product_eng)"  to="#">
                                                            <template v-if="productFilter?.product_picture !== undefined">
                                                                    <img
                                                                        :src="`${ENV_HOST_PATH_FILE}uploads/products_img/thumbnail/${productFilter?.product_picture}`" 
                                                                        :alt="proByCatId?.product_eng"
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
                                                            <router-link @click="goToURLPageProductDetailByCatId(proByCatId?.id,proByCatId?.product_eng)"  to="#">
                                                                {{ proByCatId?.product_eng ? proByCatId?.product_eng : '' }}
                                                            </router-link>
                                                        </h3>
                                                        <div class="pro-list-price">
                                                            <span class="new-price">{{ currencyFormattedKHRiel(proByCatId?.product_unit_price_khr) }}
                                                            </span>
                                                            <span class="old-price">
                                                                {{ currencyFormattedUSD(proByCatId?.product_unit_price) }}
                                                            </span>
                                                        </div>
                                                        <div class="product-list-rating-wrap">
                                                        </div>
                                                        <div class="product-list-action">
                                                            <button title="Add To Cart"><i class="icon-eye"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <el-empty description="Not Product" />
                                </template>
                            </div>
                            <!-- Pagination -->
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<!-- Script of JS -->
<script>
import  CommonListPublicServices from "@/services/customers/common_list/CommonListPublicServices.js";
import CommonPublicStoreServices from '../../../services/common_public/CommonPublicStoreServices';

export default {
    data() {
        return {
            customerType: null,
            customerId: {},
            commonCategoriesFilterList: null,
            commonSubCategoriesFilterList: null,
            filtersProductByCatProList: [],
            loadingProductCatList: false,
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
        };
    },
    created(){
        this.commonServices = new CommonListPublicServices();
        this.commonPublic = new CommonPublicStoreServices();
    },
    mounted() {
        // Common Categories
        this.getCommonCategoriesFIlter();
        // Product By Categories
        this.getProductByCategoriesId();
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
         // Get Seller By Categories
        async getProductByCategoriesId(){
            const cateIdSearchId = this.$route.query.cateId ? this.$route.query.cateId : 0;
            this.commonPublic.searchProductByCategories(cateIdSearchId,10)
                .then((productCat) => {
                    if (!Array.isArray(productCat) || !productCat.length > 0) {
                        this.filtersProductByCatProList = [];
                        this.loadingProductCatList = false;
                    }
                    if (!Array.isArray(productCat) || productCat !== undefined || productCat !== null) {
                        this.filtersProductByCatProList = productCat ? productCat : '';
                        this.loadingProductCatList = false;
                    }
                });
        },
        // Goto Page
        async goToURLPageProductDetailByCatId(productId,productName){
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
        // Filter
        handleCurrentChangePaginationProductFilter(){

        }
    }
}
</script>