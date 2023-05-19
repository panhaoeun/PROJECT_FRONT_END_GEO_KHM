<template>
    <!-- Loader Components -->
    <loader-component :show="isLoader"></loader-component>
    <!-- Sidebar Component Start Here-->
    <sidebar-component></sidebar-component>
</template>

<script setup>
    import LoaderComponent from '../../../components/loader/LoaderComponent.vue';
    import SidebarComponent from '../../../components/partials/SidebarComponent.vue';
</script>