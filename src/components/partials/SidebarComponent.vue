<template>
    <!-- Sidebar Component Start Here-->
    <default-sidebar>
         <!-- <h1 v-if="can('view', 'Dashboards')">Can access</h1> -->
        <ul class="navbar-nav iq-main-menu text-sm" id="sidebar-menu" v-for="routes in routesModules" :key="routes.path">
            <!-- {{routes.children}} -->
            <template v-if="!routes.hidden && routes.children">
                <template v-if="hasOneShowingChild(routes.children, routes) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
                    <app-link :to="resolvePath(onlyOneChild.path)">
                        <side-menu  :title="$te('route.' + routes?.meta.title) ? $t('route.'+routes?.meta.title) : $t('route.'+routes?.meta.title)" :static-item="true"></side-menu>  
                    </app-link>
                </template>
                <!-- Visible Children -->
                <template v-for="child in routes.children" :key="child">
                    {{child}}
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
import { ref,computed,defineProps} from 'vue'
import { useRoute } from 'vue-router';
import {isExternal} from "../../utils/validate"; 
// import AppLink from "./sidebar/Link";
const currentRoute = ref('');
const route = useRoute();
const onlyOneChild = ref(null);
const props = defineProps({
    // route object
    item: {
        type: Object,
        required: true,
    },
    isNest: {
        type: Boolean,
        default: false,
    },
    basePath: {
        type: String,
        default: '',
    },
})

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
//Showing on child
const hasOneShowingChild = (children,parent) => {
   const showingChildren = children.filter(item => {
        if(item.hidden){
            return false;
        }else{
            // Temp set(will be used if only has one showing child)
            onlyOneChild.value = item;
            return true;
        }
   });
    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length >0) {
        return true;
    }
   //Show parent if there are no child router to display
   if(showingChildren.length === 0){
        onlyOneChild.value = {... parent, path: '', noShowingChildren: ''};
        return true;
   }
   return false;
}
const resolvePath = (routePath) => {
    if (isExternalLink(routePath)) {
        return routePath;
    }
   return props.basePath, routePath;
}
const isExternalLink = (routePath)  => {
    return isExternal(routePath);
}
</script>
