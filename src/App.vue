<script setup></script>
<template>
   <div class="bg-white">
        <CusMainLayout v-if="$route.meta.template == 'website'"/>
        <VendorsMainLayout v-if="$route.meta.template == 'panel'"/>
        <!-- Authencation -->
        <Login v-if="$route.meta.template == 'authencation-login'"/>
        <Register v-if="$route.meta.template == 'authencation-register'"/>
   </div>
</template>

<<<<<<< HEAD

=======
<!-- Config Style -->
>>>>>>> ad0942ec675a5821d9642fbdf0ff11ac2d6fafa8
<style>
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
<!--Extend module customer page vs vendor page-->
<script>
    import VendorsMainLayout from '../src/template/VendorsMainLayout.vue';
    import CusMainLayout from './template/CusMainLayout.vue';
    // Authencation 
    import Login from './views/authencation/AuthLogin.vue';
    import Register from './views/authencation/AuthRegister.vue';
    export default {
        computed:{
            currentTemplate(){
                return this.$route.meta.template
            }
        },
        components : {
          CusMainLayout,
          VendorsMainLayout,
          Login,
          Register
        }
    }

</script>
<style scoped></style>