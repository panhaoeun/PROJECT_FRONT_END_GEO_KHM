<template>
   <div class="bg-white">
        <!-- Product Details -->
        <ProductOverview/>
        <!-- Details of company or vendor show about their product -->
        <ProductsDescription/>
        <!-- Relaid More Product -->
        <StoreProductDetail/>
   </div>
</template>

<!-- Script -->
<script>
    import ProductsDescription from "./product_description/ProductDetailDescription.vue";
    import ProductOverview from './ProductOverview.vue';
    import StoreProductDetail from './StoreProductDetail.vue';
    export default{
        components: {
            ProductOverview,
            ProductsDescription,
            StoreProductDetail,
        }
    }
</script>