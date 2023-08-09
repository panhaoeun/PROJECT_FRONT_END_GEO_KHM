<template>
    <div class="main-wrapper bg-white">
        <!-- Content of Customer Main -->
        <!-- Sidebar Menu -->
        <HeroSectionBanner/>
        <!-- Product Area -->
        <ProductsAreaContent/>
        <!-- SUGGUEST TODAY -->
        <MoreLoveSuggestion/>
    </div>
</template>
<script>
import HeroSectionBanner from "../../components/customers/home_frontend_component/banner_home/HeroSectionBanner.vue";
import ProductsAreaContent from "../../components/customers/home_frontend_component/section_content_home_customer/product_area_sections/ProductSectionArea";
import MoreLoveSuggestion from "../../components/customers/home_frontend_component/section_content_home_customer/MoreLoveSuggestion.vue";
export default {
    components: {HeroSectionBanner,ProductsAreaContent,MoreLoveSuggestion},
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>