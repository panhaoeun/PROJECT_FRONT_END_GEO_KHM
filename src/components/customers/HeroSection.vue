<template>
   <!-- Banners -->
   <banner/>
   <!-- Choice Category -->
    <product-type/>
</template>

<script>
    import Banner from "./banner/Banner.vue";
    import ProductType from "./productType/ProductType.vue";
    export default{
        components:  {
            Banner,
            ProductType
        }
    }
</script>