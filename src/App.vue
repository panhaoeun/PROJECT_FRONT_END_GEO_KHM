<script setup></script>
<template>
    <CusMainLayout v-if="$route.meta.template == 'website'"/>
    <VendorsMainLayout v-if="$route.meta.template == 'panel'"/>
    <!-- Authentications -->
    <Login v-if="$route.meta.template == 'authencation-login'"/>
    <Register v-if="$route.meta.template == 'authencation-register'"/>
    <OPTVerifyAuth v-if="$route.meta.template == 'opt-verify-authentication'"/>
    <!-- Page Error -->
    <PageError v-if="$route.meta.template == 'error-page'"/>
    <!-- Page Not Found! -->
    <!--Register Account Vendor -->
    <StepAccRegVendor v-if="$route.meta.template == 'step-acc-vendor-reg'"/>
    <!-- Main Page Register -->
    <AccGlobalSeller v-if="$route.meta.template == 'acc-reg-seller'"/>
</template>


=======
<!-- Config Style -->

<style>
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
<!--Extend module customer page vs vendor page-->
<script>
    import VendorsMainLayout from '../src/template/VendorsMainLayout.vue';
    import CusMainLayout from './template/CusMainLayout.vue';
    import AccGlobalSeller from './template/AccGlobalSeller.vue';
    // Authentications 
    import Login from './views/authencation/AuthLogin.vue';
    import Register from './views/authencation/AuthRegister.vue';
    import OPTVerifyAuth from './views/authencation/opt_verify/OPTVerify.vue';
    import PageError from './components/error_page/mainPageError.vue';
    //Register Account Vendors
    import StepAccRegVendor from './views/authencation/steps_acc_register_seller/StepAccRegSeller.vue';
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
          Register,
          OPTVerifyAuth,
          PageError,
          StepAccRegVendor,
          AccGlobalSeller
        }
    }

</script>
<style scoped></style>