<template>
    <section id="to_days_area" class="ptb-100 slider_arrows_one">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="center_heading">
                        <h2>ToDay's Deal</h2>
                        <span class="text-center">Mauris luctus nisi sapien tristique dignissim ornare</span>
                    </div>
                </div>
            </div>
            <!-- SWIPER OPTIONS -->
            <div class="row">
                <div class="col-lg-12">
                    <swiper
                      class="swiper todays_slider position-relative"
                      :options="swiperOption"
                      :slides-per-view="4"
                      :spaceBetween="30"
                    >
                        <swiper-slide v-for="(product, index) in products" :key="index">
                            <ProductBox01
                            :product="product"
                            :index="index"
                            @showAlert="alert"
                            @alertSeconds="alert"
                            />
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
        </section>
</template>
<script>
import { mapState } from "vuex";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import ProductBox01 from "../../../components/customers/product-box/ProductBox01.vue"; 
export default {
    components: {
        Swiper,
        SwiperSlide,
        ProductBox01
    },
    props: {},
    data() {
        return {
            products: [],
            category: [],
            cartProduct: {},
            compareProduct: {},
            dismissCountDown: 0,
            // Todays Slider options
            swiperOption: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 30,
                loop: false,
                mousewheel: false,
                keyboard: {
                    enabled: false,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                },
                autoplay: false,
            },
        };
    },
    computed: {
        ...mapState({
            productList: (state) => state.products.productList
        }),
    },  
    mounted() {
        // For scroll page top for every Route
        window.scrollTo(0, 0);
        this.productsArray();
    },
    created() {},
    methods: {
        productsArray: function(){
            this.productList.map((item) => {
                if (item.type === "fashion") {
                    this.products.push(item);
                    item.collection.map((i) => {
                        const index = this.category.indexOf(i);
                        if (index === -1) this.category.push(i);
                    });
                }
            })
        },
        // For Product Tab
        getCategoryProduct(collection) {
            return this.products.filter((item) => {
                if (item.collection.find((i) => i === collection)) {
                return item;
                }
            });
        },
        // Page head() Title, description for SEO
        head() {
            return {
            title: this.title,
            meta: [
                {
                hid: "description",
                name: "description",
                content: "Home page - AndShop Ecommerce Vue js, Nuxt js Template ",
                },
            ],
            };
        },
    },
};
</script>