<template>
    <div class="main-wrapper bg-white">
        <!-- Content of Customer Main -->
        <!-- Sidebar Menu -->
        <HeroSectionBanner/>
        <!-- Banner By Categories -->
        <AdvertSection/>
        <!-- Product Area -->
        <ProductsAreaContent/>
        <!-- SUGGUEST TODAY -->
        <MoreLoveSuggestion/>
    </div>
</template>
<script>
import HeroSectionBanner from "../../components/customers/home_frontend_component/banner_home/HeroSectionBanner.vue";
import AdvertSection from "../../components/customers/home_frontend_component/banner_home/AdvertSection.vue";
import ProductsAreaContent from "../../components/customers/home_frontend_component/section_content_home_customer/product_area_sections/ProductSectionArea";
import MoreLoveSuggestion from "../../components/customers/home_frontend_component/section_content_home_customer/MoreLoveSuggestion.vue";
export default {
    components: {HeroSectionBanner,ProductsAreaContent,MoreLoveSuggestion,AdvertSection},
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