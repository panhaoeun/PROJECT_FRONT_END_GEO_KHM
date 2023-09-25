<template>
    <div class="product-area pt-110">
        <div class="container">
            <div class="section-title-tab-wrap border-bottom-3 mb-30 pb-20">
                <div class="section-title-6">
                    <h2><i class="icon-screen-desktop"></i> consumer electric</h2>
                </div>
            </div>
            <div class="tab-content jump">
                <div id="product-6" class="tab-pane active">
                    <swiper 
                        modules="modules"
                        :slidesPerView="5"
                        :spaceBetween="30"
                        :pagination="{
                            dynamicBullets: true,
                        }"
                        :navigation="{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }"
                        :autoplay="{
                            delay: 8000,
                            disableOnInteraction: false,
                        }"
                        :creativeEffect="{
                            prev: {
                                shadow: true,
                                translate: [0, 0, -300],
                            },
                            next: {
                                translate: ['100%', 0, 0],
                            },
                        }"
                        :breakpoints="{
                            '640': {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            '768': {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            '1024': {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }"
                         class="product-slider-active-3 nav-style-3">
                        <!--Swiper Slide-->
                        <swiper-slide class="product-plr-1 px-2 py-2 hover:border-red-500 hover:border-1  bg-white border-red-400 border-1 border-round">
                            <div class="single-product-wrap">
                                <div class="product-img product-img-zoom mb-15">
                                    <router-link to="#">
                                        <img src="../../../../../assets/img/product/product-16.jpg" class="border-round">
                                    </router-link>
                                </div>
                                  <div class="product-content-wrap-3">
                                        <h3>
                                            <router-link  to="#" class="blue" >
                                                Mini Protector 
                                            </router-link >
                                        </h3>
                                        <div class="product-price-4">
                                            <span>$19.98 </span>
                                        </div>
                                    </div>
                                    <div class="product-content-wrap-3 product-content-position-2 py-2 px-2 pro-position-2-padding-dec">
                                        <h3>
                                            <router-link  to="#" class="blue" >
                                                Mini Protector 
                                            </router-link >
                                        </h3>
                                        <div class="product-price-4">
                                            <span>$19.98 </span>
                                        </div>
                                        <div class="pro-add-to-cart-2">
                                            <button title="Add to Cart">Add To Cart</button>
                                        </div>
                                    </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import {Autoplay,Keyboard, Scrollbar, Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
export default {
    components: {Swiper, SwiperSlide},
    setup() {
        return {
            modules: [Autoplay,Keyboard, Scrollbar, Navigation, Pagination],
        };
    },
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>