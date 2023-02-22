<template>
    <!-- Headers -->
    <HeaderOfSubPage/>
    <!--Shopping Cart -->
    <ShoppingCart/>
    <!-- Seller Recommendation and More love Product -->
    <MoreProductRecommend/>
</template>

<!-- Script -->
<script>
    import HeaderOfSubPage from '../../customers/header_of_subpage/HeaderSubPage.vue';
    import ShoppingCart from './ShoppingCart.vue';
    import MoreProductRecommend from "./MoreProductRecommend.vue";
  
    export default{
        components: {
            HeaderOfSubPage,
            ShoppingCart,
            MoreProductRecommend
        }
    }
</script>