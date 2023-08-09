<template>
    <div class="slider-area pb-65">
            <swiper 
                :grabCursor="true"
                :effect="'creative'"
                :modules="modules"
                :centeredSlides="true"
                :autoplay="{
                    delay: 8000,
                    disableOnInteraction: false,
                }"
                :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
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
                :keyboard="{
                    enabled: true,
                }"
                :pagination="{
                    clickable: true,
                }"
                class="hero-slider-active-1 nav-style-1 dot-style-2 dot-style-2-position-2 dot-style-2-active-black"
            >
                <swiper-slide 
                    class="single-hero-slider single-animation-wrap slider-height-2 custom-d-flex custom-align-item-center bg-img hm2-slider-bg res-white-overly-xs" 
                    v-bind:style="{ 'background-image': `url(${imagepath})` }"
                >
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="hero-slider-content-4 slider-animated-1">
                                    <h4 class="animated">Lookbook</h4>
                                    <h1 class="animated">Denim Mixed <br>Layering Combine <br>collect</h1>
                                    <p class="animated">We love seeing how our Raifa wearers like to wear their Norda</p>
                                    <div class="btn-style-1">
                                        <a class="animated btn-1-padding-1" href="product-details.html">Explore Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </swiper-slide>
                <!-- If we need navigation buttons -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </swiper>
        </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import {Autoplay,Keyboard, Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import "swiper/css/scrollbar";
export default {
    components: {Swiper, SwiperSlide},
    setup() {
        return {
            modules: [Autoplay,Keyboard, Navigation, Pagination],
        };
    },
    props: {},
    data() {
        return {
             imagepath: require('@/assets/img/product/hm-4-slider-1.jpg'),
        };
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