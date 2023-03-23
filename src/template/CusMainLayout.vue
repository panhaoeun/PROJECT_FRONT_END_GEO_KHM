
<template id="customerApp">
    <!-- Top NavigationBar -->
    <navigation-bar/>
    <!-- Router Views -->
    <router-view/>
   <!-- Footer -->
   <Footer/>
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
