<template>
    <!-- Sidebar Component Start Here-->
    <default-sidebar>
        <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
            <side-menu title="Home" :static-item="true"></side-menu>
            <side-menu isTag="router-link" title="Dashboard" icon="view-grid" :route="{path: '/' }"></side-menu>
            <!-- Sidebar Menu -->
            <side-menu title="Menu Style" icon="adjustment" toggle-id="menu-style" :caret-icon="true" :route="{ popup: 'false', to: 'menu-style' }" @onClick="toggle" :active="currentRoute.includes('menu-style')">
            <b-collapse tag="ul" class="sub-nav" id="menu-style" accordion="sidebar-menu" :visible="currentRoute.includes('menu-style')">
              <side-menu title="Horizontal" icon="circle" :icon-size="10" icon-type="solid" miniTitle="H" :route="{ to: 'horizontal.dashboard' }"></side-menu>
              <side-menu title="Dual Horizontal" icon="circle" :icon-size="10" icon-type="solid" miniTitle="D" :route="{ to: 'dual-horizontal.dashboard' }"></side-menu>
              <side-menu title="Dual Compact" icon="circle" :icon-size="10" icon-type="solid" miniTitle="D" :route="{ to: 'dual-compact' }"></side-menu>
              <side-menu title="Boxed Horizontal" icon="circle" :icon-size="10" icon-type="solid" miniTitle="B" :route="{ to: 'boxed.dashboard' }"></side-menu>
              <side-menu title="Boxed Fancy" icon="circle" :icon-size="10" icon-type="solid" miniTitle="B" :route="{ to: 'boxed-fancy.dashboard' }"></side-menu>
            </b-collapse>
            </side-menu>
        </ul>
    </default-sidebar>  
<!-- Sidebar Component End Here-->
</template>

<script setup>
import DefaultSidebar from '../../components/custom/sidebar/DefaultSidebar';
import SideMenu from '../../components/custom/nav/SideMenu.vue';
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
