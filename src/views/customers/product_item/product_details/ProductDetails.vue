<template>
   <div class="bg-white">
        <!-- Product Details -->
        <template v-if="productDetailResultArr">  
            <ProductOverview
            :title="String(productDetailResultArr[0]?.product[0].product_eng) ?? ''"
            :productThumbnail="String(productDetailResultArr[0]?.product[0].thumbnail) ?? ''"
            :productImgMulti="Array(productDetailResultArr[0]?.productImages)"
            :productSpec="productDetailResultArr[0]?.product[0].product_spec ?? []"
            :productQty="Number((parseInt(productDetailResultArr[0]?.product[0].product_qty ?? 0)))"
            :productUnitPrice="Number((parseFloat(productDetailResultArr[0]?.product[0].product_unit_price)))"
            :categories="String(productDetailResultArr[0]?.product[0].catNameEn) ?? ''"
            :productArrDetail="Array(productDetailResultArr[0].product) ?? []"
            />
            <!-- Details of company or vendor show about their product -->
            <ProductsDescription :productDescEng="productDetailResultArr[0]?.product[0].product_description_eng"/>
            <!-- Relaid More Product -->
            <StoreProductDetail/>
        </template>
   </div>
</template>

<!-- Script -->
<script>
    import ProductServices from '../../../../services/vendors/products/ProductServices'; 
    import ProductsDescription from "./product_description/ProductDetailDescription.vue";
    import ProductOverview from './ProductOverview.vue';
    import StoreProductDetail from './StoreProductDetail.vue';
    import { ElMessage } from "element-plus";
    export default{
        components: {
            ProductOverview,
            ProductsDescription,
            StoreProductDetail,
        }, 
        data() {
            return {
                productDetailResultArr: [],
                activeImage: ''
            }
        },
        created() {
            this.productServicesMS = new ProductServices();
            this.productDetailOverview(this.$route.query);
        },
        methods: {
            async productDetailOverview(routeRaw){
                try{
                    this.productServicesMS.getCustomerProductsDetailByID(parseInt(routeRaw?.pid) ?? 1)
                        .then(async(proResult) => {
                            if(!Array.isArray(proResult) || !proResult.length > 0){
                                this.productDetailResultArr = [];
                            }
                            this.productDetailResultArr =  Array(proResult) ?? [];
                            this.loadingDataProDetail = true;
                            this.activeImage = proResult?.product[0].thumbnail ?? '';
                        }    
                    );
                }catch(error){
                  ElMessage.error(error.message  ?? []);
                }
            }
        }
    }
</script>