<template>
  <div>
    <product-list
      :result-title="$route?.params.categoriesName"
      :has-breadcrumb="true"
      :categories="[category]"
      :fetching-product-data="fetchingProductData"
      @fetch-data="fetchingData"
    />
  </div>
</template>
<script>
  import metaHelper from '@/mixin/metaHelper'
  import ProductList from "@/components/ui_component_new_frontend/ProductListCustomer";
  import util from '@/mixin/util'
  import listingParams from '@/mixin/listingParams'
  import {mapGetters, mapActions} from 'vuex';

  export default {
    middleware: ['common-middleware'],
    data() {
      return {
        fetchingProductData: false,
        category: {},
        subCategories: {}
      }
    },
    components: {
      ProductList
    },
    head(){
      return {
        productList: null,
        title: this.category?.meta_title,
        meta: [
          this.generatingMeta('description', this.category?.meta_description),
          this.generatingMeta('og:image', this.imageURL(this.category)),
          this.generatingMeta('og:title', this.category?.meta_title),
          this.generatingMeta('og:description', this.category?.meta_description)
        ]
      }
    },
    mixins: [util, metaHelper, listingParams],
    computed: {
      ...mapGetters('listing', ['brands', 'shippingRules', 'collections', 'categoryData']),
    },
    methods:{
      async fetchingData() {

        this.fetchingProductData = true
        const self = this

        try {
          setTimeout(async () => {
            // if(this.$route.params?.categoriesId !== this.category){
            //   return
            // }
            this.emptyProducts()

            const data = await this.getRequest({params: {
                category: this.$route?.params.categoriesName,
                all_categories: true,
                sortby: this.sortByData,
                shipping: this.shippingFromRoute,
                brand: this.brandFromRoute,
                collection: this.collectionFromRoute,
                rating: this.ratingFromRoute,
                max: this.maxPriceFromRoute,
                min: this.minPriceFromRoute,
                page: this.pageData,
                sidebar_data: !this.brands || !this.shippingRules ||  !this.collections
              }, api: 'all'
            });
            // this.$sto.commit('listing/SET_PRODUCTS', data)
            this.category = data?.category;
            this.subCategories = data?.all_categories;
            self.setProducts(data)
            self.fetchingProductData = false
          }, 200)

        } catch (e) {
          return Promise.reject(e);
        }
      },
      ...mapActions('listing', ['emptyProducts', 'setProducts']),
      ...mapActions('common', ['getRequest']),
    },
    mounted() {
        this.fetchingData();
    }
  }
</script>
