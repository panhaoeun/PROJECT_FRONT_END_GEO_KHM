<template>
    <!-- Hero Section -->
    <HeroSection/>
    <!-- Product variation -->
    <!-- <ProductVariation/> -->
    <!--Group My Products-->
    <group-my-product/>        
    <!-- Best Selling Stores -->
    <best-selling-store/>
    <!-- Today best for you -->
    <today-best-for-you/>
    <!-- Our Recommendation for you -->
    <our-recommend-for-you/>
     
</template>

<script>
    // import ProductVariation from "../../../views/customers/productVariation.vue";
    import HeroSection from "../../../components/customers/HeroSection.vue";
    // import BannerDiscount from "../../../components/customers/homepage/bannerDiscount/BannerDiscount.vue";
    import bestSellingStore from "../../../components/customers/homepage/sellingStore/bestSellingStore.vue";
    import todayBestForYou from "../../../components/customers/homepage/bestforYou/todayBestForYou.vue";
    import ourRecommendForYou from "../../../components/customers/homepage/ourRecommed/ourRecommedPro.vue";
    export default {
        components: {
            // ProductVariation,
            HeroSection,
            // BannerDiscount,
            // BrandCategoryList,
            bestSellingStore,
            todayBestForYou,
            ourRecommendForYou
        },

    }
</script>