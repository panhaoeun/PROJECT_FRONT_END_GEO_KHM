
<template id="customerApp">
   <div class="">
        <!-- Routers Views -->
        <router-view/>
   </div>
   <!-- Footer -->
    <Footer/>
</template>

<!-- @Componet: Control all components for create standard master page  -->
<script type="text/x-template">
    import Footer from "../components/customers/Footer.vue";
    export default {
        components: {
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
