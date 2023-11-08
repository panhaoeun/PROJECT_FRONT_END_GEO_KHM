<template>
  <div
    class="main-slider"
    v-if="slider && slider.length"
  >
    <div
      class="slider-wrapper bg-cover"
      :class="{'has-right': rightTop || rightBottom}"
    >
      <div
        class="left flow-hidden"
      >
        <div
          class="pos-rel"
        >
          <client-only>
            <image-slider
              class="opacity-0"
              :image-count="slider.length"
              :bullets="true"
              :autoplay="6000"
              :loop="true"
              :lazy-image="true"
              @glide="glideSlider"
              @loaded="firstImgLoaded"
              @change="changed"
            >
                <template v-slot:content>
                    <li
                    v-for="(value, index) in slider"
                    :key="index"
                    >
                    <router-link
                        :to="sourceUrl(value)"
                        class="slider-content block"
                    >
                        <div
                        class="slider-content-inner bg-cover bg-center"
                        >
                            <img
                                :id="generateElemId(index)"
                                class="full-dimen bg-cover placeholder-img"
                                :alt="value?.title"
                                height="3000"
                                width="500"
                                :data-source="imageBannerURL(value)"
                            >
                        </div>
                    </router-link>
                    </li>
                </template>
            </image-slider>
          </client-only>
          <!-- Load Image - 01 -->
          <img
            class="full-dimen placeholder-img"
            :class="{'img-loaded': imgLoaded}"
            alt="Slider image - Default"
            :data-source="imageBannerURL(slider[0])"
            :src="imageBannerURL(slider[0])"
          >
        </div>
      </div>
      <!--left-->
      <!--right-->
    </div>
    <!--main-slider-->
  </div>
  <!--main-slider-->
</template>

<script>
  import util from '@/mixin/util'
  import sliderHelper from '@/mixin/sliderHelper'
  import ImageSlider from './ImageSlider'
// import LazyImage from '~/components/LazyImage'

  export default {
    name: 'HomeHero',
    data() {
      return {
        imgLoaded: false
      }
    },
    watch: {},
    props: {
      slider: {
        type: Object,
        default() {
          return null
        }
      }
    },
    components: {
      ImageSlider,
    },
    computed: {
      rightBottom(){
        return this.slider?.right_bottom
      },
      rightTop(){
        return this.slider?.right_top
      },

    },
    mixins: [util, sliderHelper],
    methods: {
    },
    created() {
    },
    mounted() {
    }
  }
</script>


