<template>
    <div class="slider-area pb-65">
        <div class="hero-slider-active-1 nav-style-1 dot-style-2 dot-style-2-position-2 dot-style-2-active-black">
            <div
                v-for="sliderItem in sliderHeroSectionItems" :key="sliderItem.id" 
                class="single-hero-slider single-animation-wrap slider-height-2 custom-d-flex custom-align-item-center bg-img hm2-slider-bg res-white-overly-xs" 
                v-bind:style="{ 'background-image': `url(${sliderItem?.imagePath})`}"
            >
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="hero-slider-content-4 slider-animated-1 h1 pb-100">
                                <h4 class="animated">Lookbook</h4>
                                <h1 class="animated">{{sliderItem?.title }}</h1>
                                <p class="animated">{{ sliderItem?.description }}</p>
                                <!-- <div class="btn-style-1">
                                    <a class="animated btn-1-padding-1" href="product-details.html">Explore Now</a>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
    setup() {
        return {    
        };
    },
    props: {},
    data() {
        return {
            imagepath: require('@/assets/img/product/hm-4-slider-1.jpg'),
            sliderHeroSectionItems: [
                {
                    id: 1,
                    imagePath: require('@/assets/img/banner/banner_01.jpg'),
                    title: 'Special Offer',
                    subTitle: 'NEW TRANDING',
                    description: 'Brown Minimalist Fashion Sale Banner'
                },
                {
                    id: 2,
                    imagePath: require('@/assets/img/banner/banner_02.jpg'),
                    title: 'Time to go shopping',
                    subTitle: 'NEW TRANDING',
                    description: '+123-456-7890 / www.reallygreatsite.com / @reallygreatsite'
                },
                {
                    id: 3,
                    imagePath: require('@/assets/img/banner/banner_03.jpg'),
                    title: 'Online Store',
                    subTitle: 'NEW TRANDING',
                    description: 'Flash Sale 9.9 Promotion'
                },
            ]
        };
    },
    created() {},
    mounted() {
        this.heroSliderBannerSection();
    },
    methods: {
        async heroSliderBannerSection(){
            $(document).ready(function () {
                /*------ Hero slider active 1 ----*/
                $('.hero-slider-active-1').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    fade: true,
                    loop: true,
                    dots: true,
                    arrows: true,
                    prevArrow: '<span class="slider-icon-1-prev"><i class="icon-arrow-left"></i></span>',
                    nextArrow: '<span class="slider-icon-1-next"><i class="icon-arrow-right"></i></span>',
                });
                
            });
        }
    },

};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>