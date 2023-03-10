<template>

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

</template>
<script>
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
                url: "/vendor/products/create",
                isActive: 'active'
            },
            {
                id: 1,
                icon: "#c-icon-dashboard",
                title: "Shops",
                url: "/vendor/products/create"
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
};
</script>
