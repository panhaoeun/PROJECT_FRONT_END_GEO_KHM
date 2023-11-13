<template>
  <div>
    <product-list
      :result-title="category?.catNameEn"
      :has-breadcrumb="true"
      :categories="[subCategories]"
      :fetching-product-data="fetchingProductData"
      @fetch-data="fetchingData"
    />
  </div>
</template>
<script>
//   import { useAsyncState } from '@vueuse/core';
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
        this.$nextTick(function () {
            this.fetchingProductData = true
            const self = this;
            try {
                setTimeout(async () => {
                    if(this.$route?.params?.categoriesName !== this.$route?.params?.categoriesName){
                    return
                    }
                    //Empty Products
                    this.emptyProducts()

                    const data = await this.getRequest({params: {
                        category: this.$route?.params?.categoriesName,
                        sortby: this.sortByData,
                        shipping: this.shippingFromRoute,
                        brand: this.brandFromRoute,
                        all_categories: true,
                        collection: this.collectionFromRoute,
                        rating: this.ratingFromRoute,
                        max: this.maxPriceFromRoute,
                        min: this.minPriceFromRoute,
                        page: this.pageData,
                        sidebar_data: !this.brands || !this.shippingRules ||  !this.collections
                    }, api: 'all'
                    });
                    self.setProducts(data);
                    self.fetchingProductData = false;
                    if(!data){
                        return Promise.reject('No item found.');
                    }
                    if(data?.category.length > 0){
                        this.category = data?.category[0];
                        this.subCategories = data?.all_categories;
                    }else{
                        this.category = null;
                    }
                }, 200)
            } catch (e) {
                return Promise.reject(e);
            }
        });
       
      },
      ...mapActions('listing', ['emptyProducts', 'setProducts']),
      ...mapActions('common', ['getRequest']),
    },
    
    async mounted() {
        this.$nextTick(function () {
            this.$forceUpdate();
            this.fetchingData();
        });
    },
  }
</script>
