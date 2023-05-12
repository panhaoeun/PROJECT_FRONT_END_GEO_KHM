
<template id="customerApp">
    <div class="home-page">
        <!-- NavigationBar -->
        <NavigationBar/>
        <!-- Content -->
        <ProductVariation/>
        <!-- To Days Area -->
        <TodayAreaSeller/>
        <!-- Footer -->
        <Footer/>
    </div>
   
</template>

<!-- @Componet: Control all components for create standard master page  -->
<script type="text/x-template">
    import NavigationBar from "../components/customers/Navigation.vue";
    /*
        Contents
    */ 
    import ProductVariation from "../views/customers/home/productVariation.vue";
    import TodayAreaSeller from "../views/customers/home/todayAreaSeller.vue";
    import Footer from "../components/customers/Footer.vue";
    export default {
        components: {
            NavigationBar,
            ProductVariation,
            TodayAreaSeller,
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
