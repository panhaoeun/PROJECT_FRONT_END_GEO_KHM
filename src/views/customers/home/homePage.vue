<template>
    <!-- Best Selling Stores -->
    <best-selling-store/>
    <!-- Today best for you -->
    <today-best-for-you/>
    <!-- Our Recommendation for you -->
    <our-recommend-for-you/>
</template>

<script>
    import bestSellingStore from "../../../components/customers/homepage/sellingStore/bestSellingStore.vue";
    import todayBestForYou from "../../../components/customers/homepage/bestforYou/todayBestForYou.vue";
    import ourRecommendForYou from "../../../components/customers/homepage/ourRecommed/ourRecommedPro.vue";
    export default {
        components: {
            bestSellingStore,
            todayBestForYou,
            ourRecommendForYou
        },

    }
</script>