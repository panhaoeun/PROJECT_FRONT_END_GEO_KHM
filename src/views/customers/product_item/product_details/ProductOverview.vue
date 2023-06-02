<template>
    <div>
        <!-- Product Single Area -->
        <div class="container my-0 my-md-4">
            <div class="row align-items-center justify-content-between">
                <div class="col-12 col-md-5 p-0 p-md-2">
                    <div class="d-flex flex-column">
                        <div class="col-12 px-md-2 d-none d-md-block">
                            <div class="" style="cursor: pointer">
                                <b-img :src="mainImage" alt="" style="width: 100%" class="image"></b-img>
                            </div>
                        </div>

                        <div class="d-block d-md-none col-12 px-0">
                            {{ getImageUrl(getDetail.images[1].src) }}
                            <b-carousel v-model="slide" controls :interval="0">
                                <b-carousel-slide v-for="(image, index) in getDetail.images" :key="index"
                                    :img-src="getImageUrl(image.src)">
                                    {{ getImageUrl(image.src) }}
                                </b-carousel-slide>
                            </b-carousel>
                        </div>

                        <div class="col-12 d-none d-md-block my-2">
                            <div class="row">
                                <div class="col-3" v-for="(image, index) in getDetail.images" :key="index">
                                    <div class="thumbnail" @click="changeMainImage(image.src)">
                                        <b-img :src="getImageUrl(image.src)" style="width: 100%" alt="" class="image"
                                            :class="mainImage === image.src ? 'activess' : ''"></b-img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Product Overviews -->
                <div class="col-12 col-md-6 text-left my-3">
                    <div class="container">
                        <div>
                            <span style="font-size: 13px; letter-spacing: 1px; color: hsl(26, 100%, 55%); font-weight: 700">
                                SNEAKER COMPANY
                            </span>
                        </div>

                        <div class="mt-2 mb-4">
                            <span style="font-size: 40px; font-weight: 900; color: black; line-height: 2.8rem">
                                {{ getDetail.title }}
                            </span>
                        </div>

                        <div class="my-3">
                            <span class="text-muted">
                                {{ getDetail.description }}
                            </span>
                        </div>

                        <div class="row">
                            <div class="col-8 col-md-12 d-flex flex-row align-items-center">
                                <div>
                                    <span style="font-size: 24px; font-weight: 900">
                                        ${{ parseFloat(getDetail.price).toFixed(2) }}
                                    </span>
                                </div>
                                <div class="">
                                    <span class="mx-3 discount px-2 py-1 rounded"
                                        style="font-weight: 900; font-size: 14px; color: hsl(26, 100%, 55%)">
                                        50%
                                    </span>
                                </div>
                            </div>

                            <div class="col-4 col-md-12 my-1">
                                <span class=""
                                    style="font-weight: 700; color: rgb(183, 183, 183); text-decoration: line-through;">
                                    $250.00
                                </span>
                            </div>
                        </div>

                        <div class="my-3 row">
                            <div class="col-12 col-md-4 text-center px-md-0 mt-3">
                                <div class="bg-quantity d-flex flex-row justify-content-between" style="font-weight: 700">
                                    <div class="plus-minus">
                                        <i class="fas fa-minus" @click="decrement()"></i>
                                    </div>
                                    <div class="">
                                        {{ count }}
                                    </div>
                                    <div class="plus-minus">
                                        <i class="fas fa-plus" @click="increment()"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-8 text-center mt-3">
                                <b-button class="bg-add-cart border-0" :disabled="this.count == 0" style="width: 100%"
                                    @click="addToCart(getDetail)">
                                    <span class="mx-3">
                                        <i class="fas fa-shopping-cart text-white"></i>
                                    </span>
                                    <span style="font-weight: 700">
                                        Add to cart
                                    </span>
                                </b-button>
                                <div class="d-none bg-add-cart" @click="addToCart(getDetail)">
                                    <span class="mx-3">
                                        <i class="fas fa-shopping-cart text-white"></i>
                                    </span>
                                    <span style="font-weight: 700">
                                        Add to cart
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// Import Swiper Vue.js components
import 'swiper/css';
import 'swiper/css/scrollbar';
export default {
    name: "product-single",
    data() {
        return {
            mainImage: require('@/assets/img/product-image/10.png'),
            activeColor: "",
            selectedSize: "",
            qty: "",
            size: [],
            productType: "",
            productId: "",
            // Breadcrumb Items Data
            breadcrumbItems: [
                {
                    text: "Home",
                    to: "/",
                },
                {
                    text: "Product Single",
                    to: "/product",
                }
            ],
            slide: 0,
            count: 1,
            // Product Quanity Increment/ Decrement Data
            quantity: 1,
            cartProduct: {},
            compareProduct: {},
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 20,
                freeMode: true,
            }
        };
    },
    computed: {
        getDetail: function () {
            return this.$store.getters["products/getProductById"](
                this.$route.params.id
            );
        }
    },
    mounted() {
        // For displaying default color and size on pageload
        this.uniqColor = this.getDetail.variants[0].color;
        this.sizeVariant(this.getDetail.variants[0].image_id);
        // Active default color
        this.activeColor = this.uniqColor;
        this.changeSizeVariant(this.getDetail.variants[0].size);
        this.relatedProducts();

        // For scroll page top for every Route
        window.scrollTo(0, 0);
    },

    methods: {
        changeMainImage(image) {
            this.mainImage = image;
        },
        getImageUrl(path) {
            return require("@/assets/img/product-image/" + path);
        },
        discountedPrice(product) {
            const price = product.price - (product.price * product.discount) / 100;
            return price;
        },
        increment() {
            this.count += 1;
        },
        decrement() {
            if (this.count - 1 >= 1) {
                this.count -= 1;
            }
        },
        // add to cart
        addToCart: function (product, qty) {
            product.quantity = qty || 1;
            this.$store.dispatch("cart/addToCart", product);
        },
        // add to wishlist
        addToWishlist: function (product) {
            this.$store.dispatch("products/addToWishlist", product);
        },
        // add to compare
        addToCompare: function (product) {
            this.$store.dispatch("products/addToCompare", product);
        },
        // Related Product Display
        relatedProducts() {
            this.productType = this.getDetail.type;
            this.productId = this.getDetail.id;
        },
        // Display Unique color
        Color(variants) {
            const uniqColor = [];
            for (let i = 0; i < Object.keys(variants).length; i++) {
                if (uniqColor.indexOf(variants[i].color) === -1) {
                    uniqColor.push(variants[i].color);
                }
            }
            return uniqColor;
        },
        // Change Size Variant
        changeSizeVariant(variant) {
            this.selectedSize = variant;
        },
        slideTo(id) {
            console.log(id)
            // this.swiper.slideTo(id, 1000, false);
        },
        sizeVariant(id, slideId, color) {
            console.log(slideId)
            // this.swiper.slideTo(slideId, 1000, false);
            this.size = [];
            this.activeColor = color;
            this.getDetail.variants.filter((item) => {
                if (id === item.image_id) {
                    this.size.push(item.size);
                }
            });
        },
    },
    // Page head() Title, description for SEO
    head() {
        return {
            title: this.title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Shop page - AndShop Ecommerce Vue js, Nuxt js Template",
                },
            ],
        };
    },
};
</script>

<style scoped>
.image {
    border-radius: 10px;
}

@media (max-width: 768px) {
    .image {
        border-radius: 0px !important;
    }
}

.discount {
    /* border-radius: 10px; */
    background-color: hsl(25, 100%, 94%);
}

.bg-quantity {
    background-color: #f1f1f1;
    border-radius: 10px;
    font-size: 16px;
    padding: 14px;
}

.bg-add-cart {
    background-color: hsl(26, 100%, 55%);
    color: white !important;
    border-radius: 10px;
    font-size: 15px;
    padding: 14px;
    transition: 0.3s;
    cursor: pointer;
    box-shadow: 0px 23px 19px 10px hsl(25, 100%, 94%);
}

.bg-add-cart:hover {
    background-color: hsl(24, 91%, 86%);
}

.plus-minus {
    color: hsl(26, 100%, 55%);
    cursor: pointer;
}

.thumbnail img {
    cursor: pointer;
    opacity: 1;
    transition: .3s;
}

.thumbnail:hover img {
    /* background-color: #d2d2d2 !important;  */
    opacity: 0.3 !important;
}

.activess {
    opacity: 0.4 !important;
    border: 3px solid hsl(26, 100%, 55%) !important;
}

i {
    transition: 0.3s;
}

i:hover {
    color: hsl(24, 91%, 86%);
}

/* navbar */
.avatar:hover {
    border: 2px solid hsl(26, 100%, 55%) !important;
}

.category {
    transition: 0.1s;
}

.category:hover {
    border-bottom: 3px solid hsl(26, 100%, 55%);
}

.category:hover .text {
    color: black !important;
}

.checkout-btn {
    transition: 0.3s;
}

.checkout-btn:hover {
    background-color: hsl(24, 91%, 86%) !important;
}

.cart-count {
    position: absolute;
    top: 3px;
    left: 22px;
    padding: 0px 7px;
    font-size: 9px;
    background-color: hsl(26, 100%, 55%);
    color: white;
    border-radius: 5px;
}</style>