
<template id="customerApp">
    <div class="home-page bg-white">
        <!-- NavigationBar -->
        <NavigationBar/>
        <!-- Router View -->
         <router-view/>
        <!-- Footer -->
        <Footer/>
    </div>
   
</template>

<!-- @Componet: Control all components for create standard master page  -->
<script type="text/x-template">
    import NavigationBar from "../components/customers/Navigation.vue";
   
    import Footer from "../components/customers/Footer.vue";
    export default {
        components: {
            NavigationBar,
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
