
<template id="customerApp">
   <div class="container">
        <!-- Routers Views -->
        <router-view/>
      
    
   </div>
   <!-- Footer -->
   <div class="gfoot">
     <!-- Footer -->
     <Footer></Footer>
   </div>
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
