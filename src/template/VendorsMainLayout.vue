<template>
<<<<<<< HEAD
    <body class="hold-transition sidebar-mini layout-fixed">
        <div class="wrapper">
            <Navbar></Navbar>
            <Sidebar class="fixed-top"></Sidebar>
            <ContentHeader></ContentHeader>

            <div class="content-wrapper mt-5">
                <section class="content">
                    <div class="container-fluid">
                        <!-- Routers Views -->
                        <router-view />
                    </div>
                </section>
            </div>
            <Footer></Footer>
            <ControlSidebar></ControlSidebar>
        </div>
    </body>
</template>
=======

    <div class="wrapper">
        <!-- Sidebar -->
       <Sidebar :menu-list-item="menuListItems"/>
        <div class="main">
            <!-- Navbar -->
            <Navbar />
            <!--Contents-->
            <main class="content">
                <router-view></router-view>
            </main>
            <!-- Footers -->
            <Footer/>
        </div>
    </div>
>>>>>>> 54dd7cbb8fbccf8c5cb2372f4dd647c92818c828

</template>
<script>
<<<<<<< HEAD
import $ from "jquery";
// import Preloader from "../dashboard/Preloader.vue"
// import ContentHeader from "../dashboard/ContentHeader.vue"
// import ExampleForm from "../components/ExampleForm.vue"
import Navbar from "../dashboard/Navbar.vue";
import Sidebar from "../dashboard/Sidebar.vue";
import Footer from "../dashboard/Footer.vue";
import ControlSidebar from "../dashboard/ControlSidebar.vue";

export default {
    name: "MainLayout",
    components: {
        // ContentHeader,
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
        },
    },
    mounted() {
        this.initializeSelect2();
    },
=======
import Navbar from '../components/vendors/Navbar.vue';
import Sidebar from '../components/vendors/Sidebar.vue';
import Footer from '../components/vendors/Footer.vue';
export default {
  name: "MainLayout",
  data(){
    return{
        message: "Hello World",
        menuListItems: [
            {
                id: 0,
                icon: "pi pi-check",
                title: "Dashboard",
                url: "/vendor/dashboard",
                isActive: 'active'
            },
            {
                id: 1,
                icon: "pi pi-check",
                title: "Product",
                url: "/vendor/products/list",
      
            },
            {
                id: 2,
                icon: "#c-icon-dashboard",
                title: "Categories",
                url: "/vendor/products/category/list"
            },
            {
                id: 3,
                icon: "#c-icon-dashboard",
                title: "Shops",
                url: "/vendor/shop/list"
            }
        ]
    }
  },
  components: {
    Navbar,
    Sidebar,
    Footer
  },
  mounted() {
  }
>>>>>>> 54dd7cbb8fbccf8c5cb2372f4dd647c92818c828
};
</script>
