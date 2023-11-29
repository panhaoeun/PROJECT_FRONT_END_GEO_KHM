<template>
  <div
    v-if="banner2 || banner3 || banner4"
    class="product-banner mb-20"
  >
    <BannerSlider
      v-if="banner2"
      :banner="banner2"
    />
    <BannerSlider
      v-if="banner3"
      :banner="banner3"
    />
    <BannerSlider
      v-if="banner4"
      :banner="banner4"
    />
  </div>
</template>

<script>

  import BannerSlider from "./BannerSlider.vue";
  export default {
    name: 'ProductBanner',
    data() {
      return {

      }
    },
    watch: {
    },
    props: {
      bannerData: {
        type: Object,
        default() {
          return null
        },
      },
    },
    components: {
      BannerSlider

    },
    computed: {
      banner2(){
        return this.bannerData?.banner2
      },
      banner3(){
        return this.bannerData?.banner3
      },
      banner4(){
        return this.bannerData?.banner4
      }
    },
    mixins: [],
    methods: {

    },
    created() {
    },
    async mounted() {
    }


  }
</script>

