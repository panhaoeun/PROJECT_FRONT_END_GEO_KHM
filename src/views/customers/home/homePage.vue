<template>
    <!-- Hero Section -->
    <HeroSection/>
    <!--=============Content==========-->
    <ProductVariation/>
    <!--Group My Products-->
    <group-my-product/>        
    <!-- Best Selling Stores -->
    <best-selling-store/>
    <!-- Today best for you -->
    <today-best-for-you/>
    <!-- To Days Area -->
    <TodayAreaSeller/>     
</template>

<script>
    import HeroSection from "../../../components/customers/HeroSection.vue";
    import bestSellingStore from "../../../components/customers/homepage/sellingStore/bestSellingStore.vue";
    import todayBestForYou from "../../../components/customers/homepage/bestforYou/todayBestForYou.vue";
     /*
        Contents Home Page
    */ 
    import ProductVariation from "./productVariation.vue";
    import TodayAreaSeller from "./todayAreaSeller.vue";

    export default {
        components: {
            // ProductVariation,
            HeroSection,
            // BannerDiscount,
            // BrandCategoryList,
            bestSellingStore,
            todayBestForYou,
            ProductVariation,
            TodayAreaSeller,
        },

    }
</script>