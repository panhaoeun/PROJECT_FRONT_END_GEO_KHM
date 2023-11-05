<template>
    
  <product-list
    ref="productList"
    :products="products"
    :categories="allCategories"
    :result-title="sourceTitle || resultTitle"
    :product-params="productParams"
    :back-btn="false"
    :fetching-product-data="fetchingProductData"
    @fetch-data="fetchingData"
  />

</template>

<!-- Script of javascript -->
<script>
    import listingParams from '@/mixin/listingParams';
    import {mapGetters, mapActions} from 'vuex';
    import ProductList from "./ProductListCustomer";
    export default{
        name: 'ListingLayout',
        data() {
            return {
                sourceTitle: "",
                products: null,
                fetchingProductData: false,
            }
        },
        mixins: [listingParams],
        watch: {},
        props: {
            productParams: {
                type: Object,
                default() {
                return {}
                }
            },
            resultTitle: {
                type: String,
                default: ''
            },
        },
        computed: {
            ...mapGetters('language', ['langCode']),
            ...mapGetters('listing', ['brands', 'shippingRules', 'collections', 'allCategories']),
        },
        components: {
            ProductList
        },
        methods: {
            clearQuery() {
                this.$refs.productList.clearQuery()
            },
            fetchingData(){
                this.fetchingProductData = true;
                setTimeout(async () => {
                    try {
                        const data = await this.getRequest({
                                params: {
                                    ...this.productParams,
                                    ...{
                                        sortby: this.sortByData,
                                        shipping: this.shippingFromRoute,
                                        brand: this.brandFromRoute,
                                        collection: this.collectionFromRoute,
                                        rating: this.ratingFromRoute,
                                        max: this.maxPriceFromRoute,
                                        min: this.minPriceFromRoute,
                                        q: this.searchedKeyword,
                                        page: this.pageData,
                                        all_categories: !this.allCategories,
                                        sidebar_data: !this.brands || !this.shippingRules || !this.collections
                                    }
                                },
                                lang: this.langCode,
                                api: 'products'
                        });
                        this.sourceTitle = data.data?.source?.title;
                        this.setProducts(data);
                        // Product item
                        this.products = data?.result;
                        this.fetchingProductData = false
                    } catch (error) {
                        return Promise.reject(error);
                    }

                },100);
            },
            ...mapActions('listing', ['setProducts', 'emptyProducts']),
            ...mapActions('common', ['getRequest']),
        },
        async mounted() {
            this.emptyProducts()
            await this.fetchingData()
        }
    }
</script>