<template>
    <!-- Sidebar Component Start Here-->
    <default-sidebar>
        <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
            sdsfdsf
        </ul>
    </default-sidebar>  
<!-- Sidebar Component End Here-->
</template>

<script setup>
import DefaultSidebar from '../../components/custom/sidebar/DefaultSidebar';
// import SideMenu from '../../components/custom/nav/SideMenu.vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const currentRoute = ref('')
const route = useRoute()
const toggle = (route) => {
    if (route === currentRoute.value && route.includes('.')) {
        const menu = currentRoute.value.split('.')
        return (currentRoute.value = menu[menu.length - 2])
    }
    if (route !== currentRoute.value && currentRoute.value.includes(route)) {
        return (currentRoute.value = '')
    }
    if (route !== currentRoute.value) {
        return (currentRoute.value = route)
    }
    if (route === currentRoute.value) {
        return (currentRoute.value = '')
    }
    return (currentRoute.value = '')
}
toggle(route.name)
</script>
<style></style>
