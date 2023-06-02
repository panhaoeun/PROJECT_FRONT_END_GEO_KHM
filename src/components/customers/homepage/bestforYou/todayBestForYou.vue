<template>
    <div class="container py-4">
          <div class="product-main">
            <!-- Title -->
            <h1 class="title">
                More to love
            </h1>
            <!-- List of Products -->
            <div class="product-grid" v-if="productListMoreLove!== null">
                <!-- Products -->
                <div class="showcase" v-for="(product,index) in productListMoreLove" :key="index">
                    <!-- {{ product?.id }} -->
                   <router-link to="/" style="text-decoration: none;">
                    <div class="showcase-banner">
                        <img :src="`${envVueHost}uploads/products_img/thumbnail/${product?.product_picture}`" :alt="product?.product_eng" width="300" class="product-img default">
                        <img :src="`${envVueHost}uploads/products_img/thumbnail/${product?.product_picture}`" :alt="product?.product_eng" width="300" class="product-img hover">
                    </div>
                    <div class="showcase-content">
                        <!-- Sold -->
                        <div class="price-box flex-column">
                            <h6 class="price">{{ product?.product_unit_price + '' + 'KHR' }}</h6>
                                <span class="showcase-category">    
                                Extra 5% off with coins
                            </span>
                                <h6 class="showcase-title">  {{ product?.product_eng }}</h6>
                        </div>
                    </div>
                     
                   </router-link>
                </div>
            </div>
            <!-- Empty of products -->
            <div v-else>
                Empty of Product...
            </div>
        </div>
    </div>
</template>
<!-- Product Best for you card group -->
 <!-- process.env.VUE_APP_PATH_FILE -->
<script>
    export default{
        data(){
            return {
                productListMoreLove: null,
                productListMoreLoveByID: null,
                envVueHost: process.env.VUE_APP_PATH_FILE
            }
        },
        async mounted() {
            this.productListMoreLove = await this.$store.dispatch("products/getProductCollListMoreLoveData");
            this.productListMoreLoveByID = await this.$store.dispatch("products/getProductCollListMoreLoveData");
            console.log(this.productListMoreLove)
        },
    }
</script>