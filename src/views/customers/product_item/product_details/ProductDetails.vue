<template>
   <div class="bg-white">
        <div class="product-detail">
            <div class="space"></div>
            <div v-if="productDetailResultArr != null">
                <p class="align-left">Shop &nbsp; / &nbsp; {{productDetailResultArr[0]?.product[0].product_eng}}</p>
                <hr>
                <div class="row">
                    <div class="col-md-7 beginner">
                        <div>
                            <product-image-gallery
                                :base-images="productImages"
                                :base-zoomer-options="zoomerOptions"
                            />
                        </div>
                    </div>
                    <div class="col-md-5">
                        <product-description 
                            :countQty="parseInt(productDetailResultArr[0]?.product[0].product_qty) ?? 0" 
                            :data="productDetailResultArr"
                        />
                    </div>
                </div>
            </div>
            <div v-else>
                Product Not Found...
            </div>
        </div>
   </div>
</template>

<!-- Script -->
<script>
    import ProductImageGallery from '@/components/customers/product_detail_overview/ProductImageGallery.vue';
    import ProductDescription from '@/components/customers/product_detail_overview/ProductDescription.vue';
    import ProductServices from '../../../../services/vendors/products/ProductServices'; 
    // import StoreProductDetail from './StoreProductDetail.vue';
    export default{
        components: {
            ProductImageGallery,
            ProductDescription
        }, 
        data() {
            return {
                ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE,
                product: null,
                zoomerOptions: {
                    zoomFactor: 1.5,
                    pane: 'container',
                    hoverDelay: 300,
                    namespace: 'zoomer',
                    move_by_click: false,
                    scroll_items: 4,
                    choosed_thumb_border_color: '#2c3e50',
                },
                productImages: {
                    normal_size: [],
                },
                productDetailResultArr: [],
                activeImage: ''
            }
        },
        created() {
            this.productServicesMS = new ProductServices();
            if(this.$route.query){
                this.productDetailOverview(this.$route.query);
            }   
        },
        methods: {
            /**
             * Product Thumbnail
             * Product Small Carousel 
             * */ 
            productMultiImgURLFormate(filePath){ 
                return this.ENV_HOST_PATH_FILE + `uploads/products_img/list_img_products/` + String(filePath);
            },
            productThumbnailRULFormate(thumbnail){
                return this.ENV_HOST_PATH_FILE + `uploads/products_img/thumbnail/` + thumbnail ? thumbnail : '';
            },
            async productDetailOverview(routeRaw){
                try{
                    this.productServicesMS.getCustomerProductsDetailByID(parseInt(routeRaw?.pid) ?? 1)
                        .then(async(proResult) => {
                            if(!Array.isArray(proResult) || !proResult.length > 0){
                                this.productDetailResultArr = [];
                            }
                            // Product Multiple Image
                            proResult.productImages.forEach((product, pid) => {
                                const productImg = this.productMultiImgURLFormate(product.fileName) ?? '';
                                this.productImages.normal_size.push({
                                    id: pid,
                                    url:productImg ? productImg : ''
                                });
                            })
                            proResult.productImages
                           
                            this.productDetailResultArr =  Array(proResult) ?? [];
                            this.loadingDataProDetail = true;
                            this.activeImage = proResult?.product[0].thumbnail ?? '';
                        }    
                    );
                }catch(error){
                    this.$notify.error({
                        title: `Product detail could not be retrieved at the moment. Please try again later.`,
                        showClose: true
                    });   
                    return false;
                }
            }
        }
    }
</script>
<!-- Styles -->
<style lang="scss" scoped>
.product-detail {
  width: 80%;
  margin: auto;
  margin-bottom: 10px;
}
</style>
