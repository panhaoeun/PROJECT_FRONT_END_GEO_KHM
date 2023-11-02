<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-4 py-4" v-if="productListDetailID.length > 0 && productListDetailID !== '' || productListDetailID !== null">
        <!-- Titles -->
        <div class="flex justify-content-between">
            <h2 class="flex relative text-black text-xl section section-title:before">
                <img class="flex align-items-center justify-content-center " src="../../../../../src/assets/img/product_icons/package.png" alt="Image" width="50"/>
                <span class="flex align-items-center justify-content-center pl-2">{{ String(productListDetailID?.product_eng) ? productListDetailID?.product_eng : '7 Day' }}</span>
            </h2>
            <el-button class="btn btn-primary text-sm"  type="info" size="large" @click="$router.push('/vendor/products/list')">
                <div class="flex justify-between pl-2">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">Back</span>
                </div>
            </el-button>
        </div>
        <!-- Contents of View Products -->
        <div class="gird">
            <div class="col-12">
                <!-- Product Details -->
                 <el-card class="box-card mb-3 my-2">
                        <b-container class="bv-example-row">
                            <b-row>
                                <!-- Right Image -->
                                <b-col cols="5" class="md:col-5 col-8">
                                    <div class="col-md-auto mb-3 mb-md-0">
                                        <div class="d-flex align-items-center">
                                            <!-- Product Thumbnail -->
                                            <template  v-if="productListDetailID?.product_picture !== '' 
                                                    || productListDetailID?.product_picture 
                                                    !== null && productListDetailID?.product_picture !== undefined">
                                                    <img 
                                                    
                                                        class="avatar w-2 h-10rem mr-4" 
                                                    :src="`${ENV_HOST_PATH_FILE}uploads/products_img/thumbnail/${productListDetailID?.product_picture}`" 
                                                        :alt="productListDetailID?.product_eng ?? 'E-24market'"
                                                    />
                                            </template>
                                          <template v-else>
                                                    <img 
                                                    class="avatar w-2 h-10rem mr-4" 
                                                    src="../../../../../src/assets/img/product_icons/package.png" 
                                                    :alt="productListDetailID?.product_eng ?? 'E-24market'"/>
                                          </template>
                                           
                                            <!-- <div class="d-block">
                                                <h4 class="display-2 text-dark mb-0">0</h4>
                                                <p> Of 0 Reviews
                                                    <span class="badge badge-soft-dark badge-pill ml-1"></span>
                                                </p>
                                            </div> -->
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                            <!-- Bottom -->
                            <b-row>
                               <hr/>
                            </b-row>
                            <!-- Product Details -->
                            <b-row>
                                <b-col cols="4" col-lg="5" class="flex-column gap-1 d-flex">
                                    <div class="flex-start">
                                        <h5 class="">{{ String(productListDetailID?.product_eng) ? productListDetailID?.product_eng : '7 Day' }}</h5>
                                    </div>
                                    <div class="flex-start">
                                        <span class="font-bold">Price : </span>
                                        <span class="mx-1">
                                            {{ currencyFormattedKHRiel(productListDetailID?.product_unit_price_khr) ?? 0 }}
                                            ({{ currencyFormattedUSD(productListDetailID?.product_unit_price) ?? 0 }})
                                        </span>
                                    </div>
                                </b-col>
                                <b-col cols="8" col-lg="7" class="gap-1 d-flex border-lg-left">
                                    <div>
                                        <div class="mb-2">Product Image</div>
                                        <div class="row g-2">
                                            <template  v-if="productImageListID.length > 0 && productImageListID !== '' || productImageListID !== null || productImageListID !== undefined">
                                                <div class="col-6 col-md-4 col-lg-3" v-for="(image, index) in productImageListID" :key="index">
                                                    <div class="card" v-if="image?.fileName !== undefined || image?.fileName !== '' || image?.fileName !== null">
                                                        <div class="card-body">
                                                            <img class="w-10" :src="`${ENV_HOST_PATH_FILE}uploads/products_img/list_img_products/${image?.fileName ?? ''}`"  alt="Product image">
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                            <template v-else>
                                                 <el-empty :image-size="200" description="No product image" />
                                            </template>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-container>
                    </el-card>
                    <!-- Review  Product by customers -->
                    <!-- <el-card class="box-card">
                       <table class="table">
                            <thead>
                               <tr>
                                    <th>Reviewer</th>
                                    <th>Review</th>
                                    <th>Date</th>
                               </tr>
                            </thead>
                            <tbody>
                               <Empty/>
                            </tbody>
                       </table>
                       <el-empty :image-size="200" description="No data to show" />
                    </el-card> -->
            </div>
        </div>
    </div>
    <div v-else>
        <el-empty :image-size="500" description="No data to show" />
    </div>
</template>


<!-- Data Tables -->
<script>
    import ProductServices from "../../../../services/vendors/products/ProductServices";
    export default {
        data(){
            return {
                ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE,
                customerRatingModel: 3.7,
                mainProps: { width: 200, height: 200, class: 'm1' },
                productListDetailID: [],
                productImageListID: []
            }
        },
        created(){
            this.productServiceClass = new ProductServices();
            this.getViewProductDetails();
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
            async getViewProductDetails() {
                const productId = this.$route.params?.proId ? this.$route.params?.proId : 0;
                // Product Services
                this.productServiceClass.productDetailByID(productId).then((product) => {
                    if (product.data.success) {
                        if (!Array.isArray(product.data.result?.resultStatus) || !product.data.result?.resultStatus.length > 0) {
                            this.productListDetailID = [];
                            this.productImageListID = [];
                        }
                        if (!Array.isArray(product.data.result?.resultStatus) || product.data.result?.resultStatus !== undefined || product.data.result?.resultStatus !== null) {
                            this.productListDetailID = product.data.result?.resultStatus?.products;
                            this.productImageListID = product.data.result?.resultStatus?.imgList;
                        }
                    }
                }).catch((error) => {
                    this.$toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
                })
            }
        }
    }
</script>
