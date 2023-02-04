<template>
  <body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <Navbar></Navbar>
      <Sidebar class="fixed-top"></Sidebar>
      <ContentHeader></ContentHeader>

<<<<<<< HEAD:src/layouts/MainLayout.vue
      <div class="content-wrapper mt-5">
        <section class="content">
          <div class="container-fluid">
            <router-view />
=======
      <div class="content-wrapper">
        
       
        <section class="content">
          <div class="container-fluid">
            <!-- Routers Views -->
               <router-view/>
>>>>>>> ad0942ec675a5821d9642fbdf0ff11ac2d6fafa8:src/template/VendorsMainLayout.vue
          </div>
        </section>
      </div>
      <Footer></Footer>
      <ControlSidebar></ControlSidebar>
    </div>
  </body>
</template>

<script>
import $ from "jquery";
// import Preloader from "../dashboard/Preloader.vue"
// import ContentHeader from "../dashboard/ContentHeader.vue"
// import ExampleForm from "../components/ExampleForm.vue"
import Navbar from "../dashboard/Navbar.vue";
import Sidebar from "../dashboard/Sidebar.vue";
import Footer from "../dashboard/Footer.vue";
import ControlSidebar from "../dashboard/ControlSidebar.vue";
<<<<<<< HEAD:src/layouts/MainLayout.vue

export default {
  name: "MainLayout",
  components: {
=======
export default {
  name: "MainLayout",
  components: {
    ContentHeader,
>>>>>>> ad0942ec675a5821d9642fbdf0ff11ac2d6fafa8:src/template/VendorsMainLayout.vue
    Navbar,
    Sidebar,
    Footer,
    ControlSidebar,
  },
  methods: {
    initializeSelect2() {
      $(".select2").select2();

      $(".select2bs4").select2({
        theme: "bootstrap4",
      });
    }
  },
  mounted() {
    this.initializeSelect2();
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
