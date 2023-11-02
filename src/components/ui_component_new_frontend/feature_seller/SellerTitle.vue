<template>
  <router-link
    class="block page-link"
    :to="`/customer/search-product/filter-product-shop/shop-by-name-filter/${brand?.shop_type_id}/${convertToSlug(brand?.shop_eng)}`"
    :title="brand?.shop_eng"
  >
    <div class="img-wrapper">
        <lazy-image
            :data-src="`${ENV_HOST_PATH_FILE}uploads/sellers/shop_logo/${brand?.shop_logo}`"
            :title="brand.shop_eng"
            :alt="brand.shop_eng"
        />
    </div>
    <h5 class="item-title ellipsis ellipsis-1">
        {{brand?.shop_eng}}
    </h5>
  </router-link>
</template>

<script>
  import LazyImage from '../LazyImage'
  import util from '@/mixin/util'

  export default {
    name: 'SellerTitle',
    props: {
      brand: {
        type: Object,
        default() {
          return null
        },
      },
    },
    data() {
      return {
        ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
        image: 'uploads/sellers/shop_logo'
      }
    },
    components: {
      LazyImage
    },
    mixins: [util],
    computed: {
    },
    mounted() {
    },
    methods: {
    },
  };
</script>
