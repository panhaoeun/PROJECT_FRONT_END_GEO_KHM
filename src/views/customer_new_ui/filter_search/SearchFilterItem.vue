<template>
    <listing-layout
      :result-title="searchedKeyword"
      ref="productListElem"
    />
</template>

<!-- Script Filter or Search Product -->
<script>
    import {mapGetters, mapActions} from 'vuex';
    import util from '@/mixin/util';
    import metaHelper from '@/mixin/metaHelper';
    import ListingLayout from "@/components/ui_component_new_frontend/ListingLayout";
    export default{
        middleware: ['common-middleware'],
        name: 'search',
        mixins: [util, metaHelper],
        components: {
            ListingLayout
        },
        watch: {
            async searched(){
                try{
                    this.$refs.productListElem.clearQuery()
                    await this.$refs.productListElem.fetchingData()
                }catch (e) {
                    return Promise.reject(e);
                }
            }
        },
        computed: {
            searchedKeyword(){
                return this.$route.query?.q || ''
            },
            ...mapGetters('listing', ['searched']),
        },
        methods: {
            async loadData() {
                setTimeout(async ()=>{
                    await this.$refs.productListElem.fetchingData()
                }, 200)
            },
            ...mapActions('listing', ['emptyProducts'])
        },
        mounted() {
            this.emptyProducts()
        }
    }
</script>