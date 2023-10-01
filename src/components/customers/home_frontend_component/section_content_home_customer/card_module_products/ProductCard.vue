<template>
    <div class="custom-col-5">
        <div class="single-product-wrap mb-60 product__card">
            <div class="product-img product-img-zoom mb-15">
                <!-- Product Image -->
                <router-link
                    to="#"
                    @click="$router.push({path: '/customer/product-details/product/view-product-detail',
                    query: {
                        pid: productId,
                        pname:encodeURIComponent(productName).replace(/[!'()]/g, escape).replace('\'', '%27')}
                    })"
                    aria-label="View Item"
                >   
                    <img v-if="imageUrl" class="product__image" :src="productImgRULFormate" :alt="productName"> 
                    <img 
                        v-else
                        class="product__image"
                        src="../../../../../assets/img/product/product-62.jpg" 
                        loading="lazy"
                    alt="">
                </router-link>
            </div>
            <div class="product-content-wrap-3">
                <!-- Product Name -->
                <h3 class="mrg-none">
                    <a class="product_name " href="#">{{ productName ?? 'E24-Market' }}</a>
                </h3>
                <!-- Ratings -->
                <div class="product-rating-wrap-2">
                    <div class="product-rating-4">
                        <i v-for="rating in ratings" :key="rating" class="icon_star"></i>
                    </div>
                </div>
                <!-- Product Price -->
                <div class="product-price-4">
                    <span class="font-bold text-red-500">៛{{ exchangeRateRielMorePro }}</span>
                    <input hidden :value="convertRielAmountMorePro(parseInt(productPrice))"/>
                    <p class="font-bold">{{ formattedPrice ?? [] }}</p>
                </div>
                <!-- Product Stock -->
                <div class="product-author">
                    <span>Stock: <a href="#" class="text-red-500">{{ inStock ? "In Stock" : "Out of Stock" }}</a></span>
                </div>
            </div>
            <div class="product-content-wrap-3 px-2 py-2 product-content-position-2 pro-position-2-padding-dec">
                <!-- Product Name -->
                <h3 class="mrg-none">
                    <a class="blue" href="#">{{ productName ?? 'E24-Market' }}</a>
                </h3>
                <!-- Ratings -->
                <div class="product-rating-wrap-2">
                    <div class="product-rating-4">
                        <i v-for="rating in ratings" :key="rating" class="icon_star"></i>
                    </div>
                </div>
                <!-- Product Price -->
                <div class="product-price-4">
                    <span class="font-bold text-red-500">៛{{ exchangeRateRielMorePro }}</span>
                    <input hidden :value="convertRielAmountMorePro(parseInt(productPrice))"/>
                    <p class="font-bold">{{ formattedPrice ?? [] }}</p>
                </div>
                <!-- Product Stock -->
                <div class="product-author">
                    <span>Stock: <a href="#" class="text-red-500">{{ inStock ? "In Stock" : "Out of Stock" }}</a></span>
                </div>
                <div class="pro-add-to-cart-2">
                    <button title="Add to Cart">Add To Cart</button>
                </div>
            </div>
        </div>
    </div>     
</template>
<script>
import convertUSDToRiel from '@/utils/convertUSDTORiel';
export default {
    components: {},
    props: [
        "productId",
        "imageUrl",
        "brand",
        "productName",
        "productPrice",
        "currency",
        "ratings",
        "inStock",
    ],
    computed:{
        formattedPrice(){
            return this.currencyFormattedUSD(this.productPrice);
        },
        productImgRULFormate(){
            return this.ENV_HOST_PATH_FILE + `uploads/products_img/thumbnail/` + this.imageUrl;
        },
    },
    data() {
        return {
            exchangeRateRielMorePro: 0,
            ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE.replace("https", "http")
        };
    },
    created() {},
    methods: {
        // Formate Currency 
        currencyFormattedKHRiel: function(value) {
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD: function(value) {
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
        async convertRielAmountMorePro(usdAmount){
           try {
                const amountConvertRiel =  parseInt(usdAmount) ? parseInt(usdAmount) : 0;
                this.exchangeRateRielMorePro = await convertUSDToRiel(amountConvertRiel) ?? 0;
                const result = await Promise.resolve(amountConvertRiel)
                return result;
           } catch (error) {
                return Promise.reject(error);
           }
        },
    },
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>


<style scoped>
.product__card {
    transition: transform 0.05s ease-in;
    text-align: left;
    border-radius: 2px;
    color: #222;
}

.product__image {
    height: 100%;
    max-width: 100%;
    border-radius: 5px;
}

.product__name {
    padding-block: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
