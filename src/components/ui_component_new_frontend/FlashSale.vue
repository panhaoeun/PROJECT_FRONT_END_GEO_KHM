<template>
  <div
    v-if="(flashSales && flashSales.length) || !flashSales"
  >
      <div
        v-if="!sliderLoaded"
        class="shimmer-wrapper"
      >
        <div
          class="shimmer"
          style="height: 281px"
        />
      </div>

    <div
      class="opacity-0 flash-slider"
      :class="{'opacity-1': sliderLoaded}"
    >
      <div
        v-if="flashSales && flashSales.length"
      >
        <div
          class="area home-section"
          v-for="(flashSale, index) in flashSales"
          :key="index"
        >
          <div class="flex sided title ">
            <div class="flex gap-10">
              <h4>Seller</h4>
            </div>
            <router-link
              class="link"
              :to="`/flash-sale/${flashSale.id}`"
            >
             Show All
            </router-link>
          </div>
          <!-- Contents -->
          <div
            class="area-content"
          >
            <!-- <client-only> -->
              <image-slider
                v-if="flashSales && flashSales.length"
                :image-count="flashSales.length"
                :per-view="7"
                :gap="20"
                :responsive="[5, 4, 3, 2, 1]"
                @loaded="glideLoaded"
              >
                <template v-slot:content>
                  <li
                    v-for="(value, index) in flashSale"
                    :key="index"
                    class="center-text"
                  >
                  {{ value }}
                  Product Test
                    <flash-product-tile
                      :product="value"
                    />
                  </li>
                </template>
              </image-slider>

            <!-- </client-only> -->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import util from '@/mixin/util'
  import ImageSlider from './ImageSlider'
//   import LazyImage from '~/components/LazyImage'
  import FlashProductTile from "./FlashProductTile";

  export default {
    name: 'FlashSale',
    data() {
      return {
        sliderLoaded: false
      }
    },
    watch: {},
    props: {
      deactivate: {
        type: Boolean,
        default: true,
      },
      flashSales: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      FlashProductTile,
      ImageSlider,
    //   LazyImage,
    //   Countdown
    },
    computed: {
    },
    mixins: [util],
    methods: {
      glideLoaded(){
        this.sliderLoaded = true
      }
    },
    created() {
    },
    mounted() {
    }
  }
</script>