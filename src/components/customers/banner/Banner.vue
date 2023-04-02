<template>
 <main>
    <div class="banner">
        <div class="container">
            <div class="slider-container has-scrollbar">
                <!-- Slider Items -->
                <div class="slider-item">
                    <img src="https://codewithsadee.github.io/anon-ecommerce-website/assets/images/banner-2.jpg" alt="women's latest fashion sale" class="banner-img">
                    <div class="banner-content">
                    <p class="banner-subtitle">Trending item</p>

                    <h2 class="banner-title">Women's latest fashion sale</h2>

                    <p class="banner-text">
                        starting at &dollar; <b>20</b>.00
                    </p>
                    <a href="#" class="banner-btn">Shop now</a>
                    </div>
                </div>
                <div class="slider-item">
                <img src="https://codewithsadee.github.io/anon-ecommerce-website/assets/images/banner-1.jpg" alt="women's latest fashion sale" class="banner-img">
                <div class="banner-content">
                    <p class="banner-subtitle">Trending item</p>

                    <h2 class="banner-title">Women's latest fashion sale</h2>

                    <p class="banner-text">
                    starting at &dollar; <b>20</b>.00
                    </p>
                    <a href="#" class="banner-btn">Shop now</a>
                </div>
                </div>
                <div class="slider-item">
                    <img src="https://codewithsadee.github.io/anon-ecommerce-website/assets/images/banner-3.jpg" alt="women's latest fashion sale" class="banner-img">
                    <div class="banner-content">
                        <p class="banner-subtitle">Trending item</p>

                        <h2 class="banner-title">Women's latest fashion sale</h2>

                        <p class="banner-text">
                        starting at &dollar; <b>20</b>.00
                        </p>
                        <a href="#" class="banner-btn">Shop now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
     </main>
  
</template>

<!-- Banner Carousel Product or Promotion -->
<script>
    // import { VueperSlides, VueperSlide } from 'vueperslides'
    import '../../../assets/styles/vueslider/vueslider.css'
    export default {
        components:{

        },
        data: () => ({
            breakpoints: {
                1200: {
                     slideRatio: 1 / 5
                },
                900: {
                     slideRatio: 1 / 3
                },
                600: {
                    slideRatio: 1 / 2,
                    arrows: false,
                    bulletsOutside: true
                },
                // The order you list breakpoints does not matter, Vueper Slides will sort them for you.
                1100: {
                    slideRatio: 1 / 4
                }
            },
            pauseOnHover: true,
            autoPlaying: true,
            internalAutoPlaying: true,
            slides: [
                {
                    id: 'slide-1',
                    title: 'Slide <b style="font-size: 1.3em;color: yellow">#1</b>',
                    image:'https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg',
                    content: 'Slider'
                },
                {
                    id: 'slide-2',
                    title: 'Slide <b style="font-size: 1.3em;color: yellow">#1</b>',
                    image:'https://m.media-amazon.com/images/I/71N3Vmy5V4L._SX3000_.jpg',
                    content: 'Slider'
                },
            ]
        })
    } 
</script>
<!-- Style oof fraction progress of carousel slider -->
<style>
    .vueperslides__progress {
        background: rgba(0, 0, 0, 0.25);
        color: #E22D37;
    }
    .vueperslides__arrows{
         margin-top: -220px;
    }
    .vueperslides--fixed-height { height: 900px; }
    .vueperslides__parallax-wrapper{
        padding-bottom: 500px;
    }
    .vueperslides__progress{
        margin-bottom: 10px;
    }
</style>