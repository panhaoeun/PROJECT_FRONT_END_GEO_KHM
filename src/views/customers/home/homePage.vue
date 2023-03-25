<template>
    
    <!-- Hero Section -->
    <HeroSection/>
    <!--Group My Products-->
    <group-my-product/>        
    <!-- Best Selling Stores -->
    <best-selling-store/>
    <!-- Today best for you -->
    <today-best-for-you/>
    <!-- Our Recommendation for you -->
    <our-recommend-for-you/>
     <!-- Discount products of Banner-->
     <!-- <banner-discount/> -->
    <!-- Brand & Category Product -->
    <!-- <brand-category-list/> -->
</template>

<script>

    import HeroSection from "../../../components/customers/HeroSection.vue";
    // import BannerDiscount from "../../../components/customers/homepage/bannerDiscount/BannerDiscount.vue";
    // import BrandCategoryList from "../../../components/customers/homepage/brand_category/brandCategoryList.vue";
    import bestSellingStore from "../../../components/customers/homepage/sellingStore/bestSellingStore.vue";
    import todayBestForYou from "../../../components/customers/homepage/bestforYou/todayBestForYou.vue";
    import ourRecommendForYou from "../../../components/customers/homepage/ourRecommed/ourRecommedPro.vue";
    export default {
        components: {
        
            HeroSection,
            // BannerDiscount,
            // BrandCategoryList,
            bestSellingStore,
            todayBestForYou,
            ourRecommendForYou
        },

    }
</script>