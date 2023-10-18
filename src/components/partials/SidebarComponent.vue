<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
    <!-- Sidebar Component Start Here-->
    <default-sidebar>
        <ul class="navbar-nav iq-main-menu text-sm" id="sidebar-menu" v-for="routes in routesModules" :key="routes.path">
            <template v-if="!routes.hidden && routes.children">
                <template v-if="routes?.meta.title !== null">
                    <side-menu  :title="$te('route.' + routes?.meta.title) ? $t('route.'+routes?.meta.title) : $t('route.'+routes?.meta.title)" :static-item="true"></side-menu>  
                </template>
                <!-- Visible Children -->
                <template v-for="(child,index) in routes.children" :key="index">
                    <!-- Children -->
                    <template v-if="!child.hidden">
                        <side-menu isTag="router-link"  class="text-sm" :title="$te('route.' + child?.meta.title) ? $t('route.'+child?.meta.title) : $t('route.'+child?.meta.title)" :icon="child.meta?.icon" :icon-size="10" icon-type="solid" miniTitle="CAT" :route="{ to: `${child.name}` }"></side-menu>
                    </template>
                </template>
            </template>
        </ul>
    </default-sidebar>  
<!-- Sidebar Component End Here-->
</template>

<!-- Script of JS  -->
<script setup>
import DefaultSidebar from '../../components/custom/sidebar/DefaultSidebar';
import SideMenu from '../../components/custom/nav/SideMenu.vue';
import store from "../../store";
import { ref,computed} from 'vue'
import { useRoute } from 'vue-router';
const currentRoute = ref('');
const route = useRoute();
const toggle = (route) => {
    // Toggles 
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
toggle(route?.name);
// Resolve Path Sidebar Menu
// Store Routes base Permissions
const routesModules = computed(() => {
    return store.state.users.routes;
})
</script>
