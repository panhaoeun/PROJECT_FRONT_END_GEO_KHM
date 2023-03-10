<template>

    <div class="wrapper">
        <!-- Sidebar -->
       <Sidebar/>
        <div class="main">
            <!-- Navbar -->
            <Navbar :menu-list-item="menuListItems" :message="Hello" />
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
                icon: "#c-icon-dashboard",
                title: "Overview",
                url: "/"
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
