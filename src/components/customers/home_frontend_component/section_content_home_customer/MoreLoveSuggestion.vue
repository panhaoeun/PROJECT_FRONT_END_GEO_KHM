<template>
    <div class="product-area pt-115 pb-120">
    <div class="container">
        <div class="section-title-btn-wrap border-bottom-3 mb-50 pb-20">
            <div class="section-title-deal-wrap">
                <div class="section-title-3">
                    <h2>More Love</h2>
                </div>
            </div>
            <div class="btn-style-7">
                <a href="#">All Product</a>
            </div>
        </div>
        <div class="row" v-if="loadingData">
           <!-- Product Flash Deal-->
            <product-card
                v-for="(product, index) in productMoreLove"
                :productId="parseInt(product.productId) ?? 1"
                :key="index"
                :imageUrl="product?.product_picture ?? []"
                :productName="product?.product_eng ?? []"
                currency="KHR"
                :productPrice="product?.product_unit_price ?? []"
                :inStock="product.product_qty ?? []"
            />
        </div>
        <!-- Product Loader -->
        <product-preloader v-else> Loading products... </product-preloader>
        <div class="more-product-btn text-center">
            <a href="#" @click.prevent="loadMoreProductResult(pageNum,pageSize)">More Product...</a>
        </div>
    </div>
</div>
</template>
<script>
import ProductServices from '../../../../services/vendors/products/ProductServices'; 
import ProductPreloader from "../../../../components/preloaders/ProductPreloader.vue";
import ProductCard from './card_module_products/ProductCard.vue';
import { ElMessage } from 'element-plus';
export default {
    components: {
        ProductCard, 
        "product-preloader": ProductPreloader
    },
    props: {},
    data() {
        return {
            totalPage: null,
            productMoreLove: [],
            ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE.replace("https", "http"),
            pageNum: 1,
            pageSize: 8,
            loadingData: false
        };
    },
    created() {
        this.productServicesMS = new ProductServices();
        this.getProductFlashDeal();
    },
    methods: {
        async getProductFlashDeal(){    
            try{
                var requestURL = 'https://api.exchangerate.host/symbols'; 
                // var request = new XMLHttpRequest(); 
                console.log(requestURL)
                this.loadingData = false;
                this.productServicesMS.getCustomerProductsData(this.pageNum,this.pageSize)
                    .then((proResult) => {
                        if(!Array.isArray(proResult) || !proResult.length > 0){
                            this.totalPage = [];
                            this.productMoreLove = [];
                        }
                        this.productMoreLove = Array.isArray(proResult?.products) ? proResult?.products.slice() : [];
                        this.totalPage = proResult.pages?.totalPages ?? [];
                        this.loadingData = true;
                    }    
                );
            }catch(error){
                ElMessage.error(error.message ?? 'Some error entries of product...');
                this.loadingData = false;
            }
        },
        loadMoreProductResult(page, size){
            this.pageNum = page;
            this.pageSize = size + this.totalPage;
            this.getProductFlashDeal();
            window.scrollTo(0, 0);
        }
    },
    mounted() {},
}
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>