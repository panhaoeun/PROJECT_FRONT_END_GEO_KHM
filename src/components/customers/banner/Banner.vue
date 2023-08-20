<template>
    <div class="home-page">
        <!-- Banner Area -->
        <section id="furniture_banner">
            <swiper
                :spaceBetween="30"
                class="electronics_slider_box"
                :grabCursor="true"
                :effect="'creative'"
                :modules="modules"
                :centeredSlides="true"
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
                :keyboard="{
                    enabled: true,
                }"
                :scrollbar="true"
                :pagination="{
                    clickable: true,
                }"
                @autoplayTimeLeft="onAutoplayTimeLeft"
            >
                <swiper-slide v-for="sliderItem in sliderItems" :key="sliderItem.id" 
                    class="furniture_slider background_bg" 
                    v-bind:style="{ 'background-image': `url(${sliderItem.imagepath})` }"
                >
                    <div class="container">
                        <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12 col-12">
                            <div class="furniture_slider_content">
                                <h5>{{sliderItem.subTitle}}</h5>
                                <h2>{{sliderItem.title}}</h2>
                                <p>{{sliderItem.description}}</p>
                                <router-link to="/shop/shop-2" class="theme-btn-one bg-black btn_sm">Shop Now</router-link>
                            </div>
                        </div>
                        </div>
                    </div>
                </swiper-slide>
                <!-- Progress Loading Change Background Images -->
                <template #container-end>
                    <div class="autoplay-progress">
                        <svg viewBox="0 0 48 48" ref="progressCircle">
                        <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref="progressContent"></span>
                    </div>
                </template>
            </swiper>
        </section>
    </div>
</template>

<!-- Banner Carousel Product or Promotion -->
<script>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from "swiper/vue";
    import "swiper/css/scrollbar";
    import "swiper/css/navigation";
    import "swiper/css/pagination";
    // Import Swiper styles
    import "swiper/css";
    // import required modules
    import {Autoplay,Keyboard, Scrollbar, Navigation, Pagination} from 'swiper';
    import 'swiper/css/effect-creative';
import { ref } from "vue";
    export default {
        components:{
            Swiper,
            SwiperSlide
        },
        setup() {
            const progressCircle = ref(null);
            const progressContent = ref(null);
            const onAutoplayTimeLeft = (s, time, progress) => {
                progressCircle.value.style.setProperty('--progress', 1 - progress);
                progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
            };
            return {
                onAutoplayTimeLeft,
                progressCircle,
                progressContent,
                modules: [Autoplay,Keyboard, Scrollbar, Navigation, Pagination],
            };
        },
        data() {
            return { 
            title: 'Furniture Home',
            // Furniture Banner Slider Items 
            sliderItems: [
                {
                    id: 1,
                    imagepath: require('@/assets/img/banner/big-banner01.png'),
                    title: 'Sofa Collection',
                    subTitle: 'NEW TRANDING',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.'
                },
                {
                    id: 2,
                    imagepath: require('@/assets/img/banner/big-banner02.png'),
                    title: 'Sofa Collection',
                    subTitle: 'NEW TRANDING',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.'
                },
                {
                    id: 3,
                    imagepath: require('@/assets/img/banner/bg-banner03.png'),
                    title: 'Sofa Collection',
                    subTitle: 'NEW TRANDING',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.'
                },
                {
                    id: 4,
                    imagepath: require('@/assets/img/banner/bg-banner04.png'),
                    title: 'Sofa Collection',
                    subTitle: 'NEW TRANDING',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.'
                }
            ],
            products: [],
            category: [],
            cartproduct: {},
            compareproduct: {},
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
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        300: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        }
                    },
                        autoplay: false,
                },
            }
        }
        
    } 
</script>

<!-- Style -->
<style>
.autoplay-progress {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.autoplay-progress svg {
  --progress: 0;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: #cc1c20;
  fill: none;
  stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
  animation: progress 1s ease-out forwards;
}
</style>