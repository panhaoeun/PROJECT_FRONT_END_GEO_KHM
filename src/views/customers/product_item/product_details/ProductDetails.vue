<template>
    <!-- Headers -->
    <HeaderOfSubPage/>
    <!-- Product Details -->
    <ProductOverview/>
    <!-- Details of company or vendor show about their product -->
    <StoreProductDetail/>
    <!-- Seller Recommendation and More love Product -->
    
</template>

<!-- Script -->
<script>
    import HeaderOfSubPage from '../../header_of_subpage/HeaderSubPage.vue';
    import ProductOverview from './ProductOverview.vue';
    import StoreProductDetail from './StoreProductDetail.vue';
    
    export default{
        components: {
            HeaderOfSubPage,
            ProductOverview,
            StoreProductDetail
        }
    }
</script>