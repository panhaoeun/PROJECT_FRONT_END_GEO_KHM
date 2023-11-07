<template>
  <div
    class="main-slider"
    v-if="slider && slider.length"
  >
    <div
      class="slider-wrapper"
      :class="{'has-right': rightTop || rightBottom}"
    >
      <div
        class="left "
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
              <!-- <img alt="Slider image" height="100" width="100" src="https://cdn.ishop.cholobangla.com/uploads/slider-1.webp" class="full-dimen placeholder-img img-loaded">  -->
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
                        class="slider-content-inner"
                        >
                        <img
                            :id="generateElemId(index)"
                            class="full-dimen"
                            alt="Slider image - Product Banner"
                            :data-source="imagePath"
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
            alt="Slider image"
            :src="slider[0].imagePath"
          >
        </div>
      </div>
      <!--left-->
      <div
        v-if="rightTop || rightBottom"
        class="right"
      >
        <router-link
          v-if="rightTop"
          :to="sourceUrl(slider.right_top)"
          class="img-wrap block"
        >
          <template
            v-if="slider && slider.right_top"
          >
            <img
              :src="imageURL(slider.right_top)"
              height="100"
              width="100"
              alt="Slider image"
            />
          </template>
        </router-link>

        <router-link
          v-if="rightBottom"
          :to="sourceUrl(slider.right_bottom)"
          class="img-wrap block"
        >
          <template
            v-if="slider && slider.right_bottom"
          >
            <img
              :src="imageURL(slider.right_bottom)"
              height="100"
              width="100"
              alt="Slider image"
            />
          </template>
        </router-link>
      </div>
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


