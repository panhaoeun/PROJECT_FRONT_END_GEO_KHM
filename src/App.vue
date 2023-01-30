<script setup></script>
<template>
   <CusMainLayout v-if="$route.meta.template == 'website'"/>
   <VendorsMainLayout v-if="$route.meta.template == 'panel'"/>
</template>

<!-- Config Style -->
<style>
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
<!--Extend module customer page vs vendor page-->
<script>
    import VendorsMainLayout from '../src/template/VendorsMainLayout.vue';
    import CusMainLayout from './template/CusMainLayout.vue';
    export default {
        computed:{
            currentTemplate(){
                return this.$route.meta.template
            }
        },
        components : {
          CusMainLayout,
          VendorsMainLayout 
        }
  }
</script>
<style scoped></style>