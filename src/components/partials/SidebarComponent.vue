<template>
    <!-- Sidebar Component Start Here-->
    <default-sidebar>
         <h1 v-if="can('view', 'Dashboards')">Can access</h1>
        <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
            <side-menu title="HOME" :static-item="true"></side-menu>
            <side-menu  isTag="router-link" title="Dashboard" icon="view-grid" :route="{ to: 'defaults.vendor-dashboard' }"></side-menu>
            <!-- Sidebar Menu -->
            <!-- Product Managements -->
            <side-menu title="PRODUCTS MANAGEMENT" :static-item="true"></side-menu>
            <side-menu title="Category Set Up" icon="adjustment" toggle-id="menu-style" :caret-icon="true" :route="{ popup: 'false', to: 'menu-style' }" @onClick="toggle" :active="currentRoute.includes('menu-style')">
                <b-collapse tag="ul" class="sub-nav" id="menu-style" accordion="sidebar-menu" :visible="currentRoute.includes('menu-style')">
                    <side-menu  isTag="router-link" title="Categories" icon="circle" :icon-size="10" icon-type="solid" miniTitle="CAT" :route="{ to: 'defaults.product-category-list' }"></side-menu>
                    <side-menu  isTag="router-link" title="Sub Categories" icon="circle" :icon-size="10" icon-type="solid" miniTitle="SCAT" :route="{ to: 'defaults.sub-product-category-list' }"></side-menu>
                </b-collapse>
            </side-menu>
            <side-menu  isTag="router-link" title="Products" icon="cart" :route="{ to: 'defaults.products-list' }"></side-menu>
            <!-- Order Managements -->
            <side-menu title="ORDERS MANAGEMENT" :static-item="true"></side-menu>
            <side-menu  isTag="router-link" title="Order" icon="circle" :icon-size="10" icon-type="solid" miniTitle="CAT" :route="{ to: 'defaults.order-list' }"></side-menu>
            <!-- Business Section -->
            <side-menu title="BUSINESS SECTION" :static-item="true"></side-menu>
            <side-menu  isTag="router-link" title="My Shop" icon="home" :route="{ to: 'defaults.my_shop_vendor-list' }"></side-menu>
            <!-- REPORTS & ANALYSIS -->
            <side-menu title="REPORTS & ANALYSIS" :static-item="true"></side-menu>
            <side-menu  isTag="router-link" title="Order Report" icon="bookmark" :route="{ to: 'defaults.products-list' }"></side-menu>
            <!-- User Managements -->
            <side-menu title="USER MANAGEMENT" :static-item="true"></side-menu>
            <side-menu  isTag="router-link" title="Customers" icon="user" :route="{ to: 'defaults.customer-list' }"></side-menu>
            <side-menu  isTag="router-link" title="Sellers" icon="purse" :route="{ to: 'defaults.seller-list' }"></side-menu>
            <side-menu title="Authentications" icon="adjustment" toggle-id="auth-managements" :caret-icon="true" :route="{ popup: 'false', to: 'auth-managements' }" @onClick="toggle" :active="currentRoute.includes('auth-managements')">
                <b-collapse tag="ul" class="sub-nav" id="auth-managements" accordion="sidebar-menu" :visible="currentRoute.includes('auth-managements')">
                    <side-menu  isTag="router-link" title="Users" icon="circle" :icon-size="10" icon-type="solid" miniTitle="USER" :route="{ to: 'defaults.user-auth-crud' }"></side-menu>
                    <side-menu  isTag="router-link" title="Permissions" icon="circle" :icon-size="10" icon-type="solid" miniTitle="CAT" :route="{ to: 'defaults.user-auth-crud-permission' }"></side-menu>
                </b-collapse>
            </side-menu>
        </ul>
    </default-sidebar>  
<!-- Sidebar Component End Here-->
</template>

<script setup>
import { useAbility } from "@casl/vue";
import DefaultSidebar from '../../components/custom/sidebar/DefaultSidebar';
import SideMenu from '../../components/custom/nav/SideMenu.vue';
 const { can } = useAbility();

import { ref } from 'vue'
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
</script>
<style></style>
