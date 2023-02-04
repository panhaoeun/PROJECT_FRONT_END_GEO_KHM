
<template id="customerApp">
   <div class="container">
        <!-- Top NavigationBar -->
        <navigation-bar/>
        <!-- Hero Section -->
        <HeroSection/>
        <!--Group My Products-->
        <group-my-product/>        
        <!-- Discount products of Banner-->
        <banner-discount/>
        <!-- Brand & Category Product -->
        <brand-category-list/>
        <!-- Footer -->
        <Footer></Footer>
   </div>
</template>

<!-- @Componet: Control all components for create standard master page  -->
<script type="text/x-template">
    import NavigationBar from "../components/customers/Navigation.vue";
    import HeroSection from "../components/customers/HeroSection.vue";
    import groupMyProduct from "../views/customers/home/homePage.vue";
    import Footer from "../components/customers/Footer.vue";
    import BannerDiscount from "../components/customers/homepage/bannerDiscount/BannerDiscount.vue";
    import BrandCategoryList from "../components/customers/homepage/brand_category/brandCategoryList.vue";
    export default {
        components: {
            NavigationBar,
            Footer,
            HeroSection,
            groupMyProduct,
            BannerDiscount,
            BrandCategoryList
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
