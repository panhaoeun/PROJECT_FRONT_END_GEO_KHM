<template>
  <div class="container-fluid">

    <breadcrumb
      :page="pageTitle"
    />


    <h1>{{ $t('sitemap.find') }}</h1>
    <p class="mtb-10 f-12">{{ $t('sitemap.stock') }}</p>

    <div class="mb-30 mb-sm-20">
      <h3 class="mb-20 mb-sm-15">{{ $t('searchPopup.categories') }}</h3>

      <div class="flex gap-15 wrap start">
        <div v-for="(value, index) in page.categories" :key="index">
          <p class="title">
            <router-link :to="categoryLink(value)">{{ value.title }}</router-link>
          </p>
        </div>
      </div>
    </div>

    <div class="">
      <h3 class="mb-20 mb-sm-15">{{ $t('searchPopup.products') }}</h3>

      <div class="flex gap-15 wrap start">
        <div v-for="(value, index) in page.products" :key="index">
          <p class="title">
            <router-link :to="productLink(value)">{{ value.title }}</router-link>
          </p>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
//   import SitemapItem from "./SitemapItem";
  import Breadcrumb from "./Breadcrumb";
  import util from '@/mixin/util'
  export default {
    name: 'Sitemap',
    components: {Breadcrumb},
    data() {
      return {}
    },
    mixins: [util],
    watch: {},
    props: {
      pageTitle: {
        type: String,
        default: ''
      },
      page: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {},
    methods: {}
  }
</script>
<style lang="stylus">
</style>
