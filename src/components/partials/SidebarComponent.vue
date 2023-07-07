<template>
    <!-- Sidebar Component Start Here-->
    <default-sidebar>
         <!-- <h1 v-if="can('view', 'Dashboards')">Can access</h1> -->
        <ul class="navbar-nav iq-main-menu" id="sidebar-menu" v-for="routes in routesModules" :key="routes">
            {{ routes.path }}
            <side-menu title="HOME" :static-item="true"></side-menu>
        </ul>
    </default-sidebar>  
<!-- Sidebar Component End Here-->
</template>

<!-- Script of JS  -->
<script setup>
// import { useAbility } from "@casl/vue";
import DefaultSidebar from '../../components/custom/sidebar/DefaultSidebar';
import SideMenu from '../../components/custom/nav/SideMenu.vue';
// import { generateTitle } from '@/utils/i18n';
import store from "../../store";

import { ref,computed } from 'vue'
import { useRoute } from 'vue-router'
const currentRoute = ref('')
const route = useRoute();
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
// Store Routes base Permissions
const routesModules = computed(() => {
    return store.getters['users/routes'];
});
console.log(routesModules)
</script>
