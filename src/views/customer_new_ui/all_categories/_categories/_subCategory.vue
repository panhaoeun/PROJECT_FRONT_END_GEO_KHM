<template>
  <div>
    <product-list
      :result-title="subCategoryTitle"
      :slugs="slug"
      :has-breadcrumb="true"
      :fetching-product-data="fetchingResult"
      @fetch-data="fetchingData"
    />
  </div>
</template>
<!-- Script of javascript -->
<script>
  import metaHelper from '@/mixin/metaHelper'
  import ProductList from "@/components/ui_component_new_frontend/ProductListCustomer";
  import util from '@/mixin/util'
  import listingParams from '@/mixin/listingParams'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    middleware: ['common-middleware'],
    data() {
      return {
        fetchingResult: false,
        subCategory: null,
      }
    },
    components: {
      ProductList
    },
    head(){
      return {
        productList: null,
        title: this.subCategory?.meta_title,
        meta: [
          this.generatingMeta('description', this.subCategory?.meta_description),
          this.generatingMeta('og:image', this.imageURL(this.subCategory)),
          this.generatingMeta('og:title', this.subCategory?.meta_title),
          this.generatingMeta('og:description', this.subCategory?.meta_description)
        ]
      }
    },
    mixins: [util, metaHelper, listingParams],
    computed: {
      currentItems() {
        return this.products || null
      },
      subCategoryTitle(){

        return this.subCategory?.catNameEn || null;
      },
      currentCategory(){
        return this.subCategory;
      },
      slug(){
       return [{
          title: this.currentCategory?.catNameEn,
          link: ''
        }]
      },
      ...mapGetters('listing', ['brands', 'shippingRules', 'collections', 'products']),
    },
    methods:{
      async fetchingData() {
        this.$nextTick(function () {
            this.fetchingResult = true;
            this.emptyProducts();
            try {
                setTimeout(async () => {
                    const data = await this.getRequest({
                    params: {
                        sub_category: this.$route?.params?.subCategory,
                        sortby: this.sortByData,
                        shipping: this.shippingFromRoute,
                        brand: this.brandFromRoute,
                        collection: this.collectionFromRoute,
                        rating: this.ratingFromRoute,
                        max: this.maxPriceFromRoute,
                        min: this.minPriceFromRoute,
                        page: this.pageData,
                        all_categories: true,
                        sidebar_data: !this.brands || !this.shippingRules ||  !this.collections
                    },
                    api: 'all'
                    });
                    if(!data){
                        return Promise.reject('No item found.');
                    }
                    if(data?.all_categories.length > 0){
                        this.subCategory = data?.all_categories[0];
                    }else{
                        this.subCategory = null;
                    }
                    this.fetchingResult = false;
                    this.setProducts(data);
                }, 100)
            } catch (e) {
                return Promise.reject(e);
            }
        });
        
      },
      ...mapActions('listing', ['emptyProducts', 'setProducts']),
      ...mapActions('common', ['getRequest'])
    },
    async mounted() {

    },
  }
</script>
