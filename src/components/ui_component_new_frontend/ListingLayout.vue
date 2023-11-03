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
            ...mapActions('listing', ['setProducts', 'emptyProducts']),
            ...mapActions('common', ['getRequest']),
        }
    }
</script>