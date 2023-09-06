
<template id="customerApp">
    <!-- Headers -->
    <!-- <MainHeaderMenu/> -->
    <!-- Content of Main Customer -->
    <router-view />
    <!-- Footer -->
    <!-- <Footer/> -->
</template>

<!-- @Componet: Control all components for create standard master page  -->
<script type="text/x-template">
// import MainHeaderMenu from "@/components/customers/home_frontend_component/headers_menu/HeaderMenu.vue";
// import Footer from "../components/customers/Footer.vue";
export default {
    components: {
        // MainHeaderMenu,
        // Footer,
    },
    data() {
        return {
            displayBasic: false,
        }
    },
    methods: {
        openBasic() {
            this.displayBasic = true;
        }
    }
};
</script>
