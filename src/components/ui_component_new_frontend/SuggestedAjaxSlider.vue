<template>
  <div
    ref="main-slider"
    class="flow-hidden glide__track"
  >

       <div class="area-content shimmer-wrapper">
            <image-slider
                :image-count="itemList.length"
                :per-view="7"
                :gap="15"
                :responsive="[7, 5, 4, 3, 2]"
                class="img-wrapper"
            >
                <template v-slot:content>
                    <li
                        v-for="(value, index) in itemList"
                        :key="index"
                        style="max-width: 100px"
                        :style="itemWidthStyle"
                    >
                        <product-tile
                            v-if="value"
                            :product="value"
                            class="mb-20 mb-sm-15"
                        />
                        <tile-shimmer
                        v-else
                        />
                    </li>
                </template>
            </image-slider>
        </div>
  </div>
</template>

<script>
  import ProductTile from './ProductTile'
  import TileShimmer from './TileShimmer';
  import ImageSlider from './ImageSlider';

  export default {
    name: 'SuggestedAjaxSlider',
    data() {
      return {
        sliderContainerWidth: 0,
      }
    },
    watch: {
    },
    props: {
      itemList: {
        type: Array,
        default() {
          return []
        }
      },
      currentPagination: {
        type: Number
      },
      totalPage: {
        type: Number
      },
      currentPage: {
        type: Number
      },
      draggedWidth: {
        type: Number
      }
    },
    components: {
      ProductTile,
      TileShimmer,
      ImageSlider
    },
    computed: {
        sliderOptions(){
            if(this.hasFeaturedBanner){
              return {
                perView: 3,
                responsive: [7, 5, 4, 3, 2]
              }
            }
            return {
              perView: 20,
              responsive: [6, 5, 4, 3, 2]
            }
        },
      parentWidthStyle(){
        return {
          'flex-basis': `${this.totalPage * this.sliderContainerWidth}px`,
          'width': `${this.totalPage * this.sliderContainerWidth}px`,
          'max-width': `${this.totalPage * this.sliderContainerWidth}px`,
          'min-width': `${this.totalPage * this.sliderContainerWidth}px`
        }
      },
      translateXInPx(){
        return `translateX(${(((this.currentPage - 1) * this.sliderContainerWidth) + this.draggedWidth) * -1}px)`
      },
      itemWidthStyle(){
        return {
         'flex-basis': `${this.itemWidthInPx}px`,
          'width': `${this.itemWidthInPx}px`,
          'max-width': `${this.itemWidthInPx}px`,
          'min-width': `${this.itemWidthInPx}px`
        }
      },
      itemWidthInPx(){
        return this.sliderContainerWidth / this.currentPagination
      },
    },
    mixins: [],
    methods: {
    },
    created() {
    },
    mounted() {
      this.$nextTick(()=> {
        this.sliderContainerWidth = this.$refs['main-slider'].clientWidth
      })
    }
  }
</script>
