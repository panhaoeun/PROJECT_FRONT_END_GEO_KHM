
<template id="customerApp">
    <!-- Headers -->
    <!-- <MainHeaderMenu/> -->
    <!-- New Header Customer Page -->
    <HeaderNewCustomer/>
    <!-- Content of Main Customer -->
     <router-view/>
    <!-- Footer -->
    <Footer/>
</template>

<!-- @Componet: Control all components for create standard master page  -->
<script type="text/x-template">
    // import MainHeaderMenu from "@/components/customers/home_frontend_component/headers_menu/HeaderMenu.vue";
    import HeaderNewCustomer from "../views/customer_new_ui/layout_new_customer/partials/HeaderNewCustomer.vue";
    import Footer from "../components/customers/Footer.vue";
    export default {
        components: {
            // MainHeaderMenu,
            HeaderNewCustomer,
            Footer,
        },
        data(){
            return {
                displayBasic: false,
            }
        },
        methods: {
            openBasic(){
                this.displayBasic = true;
            }
        }
    };
</script>
