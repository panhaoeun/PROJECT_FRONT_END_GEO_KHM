<template>
  <router-link
    class="block page-link"
    :to="categoryLink(subCategory)"
    :title="subCategory"
  >
    <div class="img-wrapper">
      <lazy-image
        :data-src="`${ENV_HOST_PATH_FILE}uploads/${subCategory.catLogo}`"
        :title="subCategory.catNameEn"
        :alt="subCategory.catNameEn"
      />
    </div>
    <h6 class="item-title ellipsis ellipsis-1">
        {{ subCategory?.catNameEn }}
    </h6>
  </router-link>
</template>

<script>
  import LazyImage from '../LazyImage'
  import util from '@/mixin/util'

  export default {
    name: 'SubCategoryTile',
    props: {
      category: {
        type: Object,
        default() {
          return null
        },
      },
      subCategory: {
        type: Object,
        default() {
          return null
        },
      },
    },
    data() {
      return {
         ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
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