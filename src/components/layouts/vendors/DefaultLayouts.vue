<template>
    <!-- Loader Components -->
    <loader-component :show="isLoader"></loader-component>
    <!-- Sidebar Component Start Here-->
    <sidebar-component
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"   
    />
    <!-- Sidebar Component End Here-->
    <main class="main-content">
        <div :class="`position-relative  ${isBanner ? 'iq-banner ' + bannerStyle : ''}`">
          <!-- Header Component Start Here -->
          <header-component></header-component>
          <template v-if="isBanner">
            <!-- Sub Header Component Start Here-->
            <sub-header></sub-header>
            <!-- Sub Header Component End Here-->
          </template>
          <!-- Header Component End Here -->
        </div>

        <!-- Main Content Start Here -->
        <main-content-component>
          <!-- Router View For Pages -->
          <router-view></router-view>
        </main-content-component>
        <!-- Main Content Start Here -->

        <!-- Footer Component Start Here -->
        <footer-component></footer-component>
        <!-- Footer Component End Here -->

        <!-- Live Customized Component Start Here -->
        <setting-offcanvas></setting-offcanvas>
        <!-- Live Customized Component End Here-->

    </main>
</template>

<script setup>
    // Library
    import { computed,ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    const isLoader = ref(null);
    const routes = computed(() => {
        return this.$store.state.users.routes;
    });
    // Components
    // import LoaderComponent from '../../../components/loader/LoaderComponent.vue';
    import SidebarComponent from '../../../components/partials/SidebarComponent.vue';
    import HeaderComponent from '../../../components/partials/HeaderComponent.vue';
    import SubHeader from '../../../components/custom/header/SubHeader.vue';
    import MainContentComponent from '../../../components/partials/MainContentComponent.vue';
    import FooterComponent from '../../../components/partials/FooterComponent.vue';
    import SettingOffcanvas from '../../../components/setting/SettingOffcanvas.vue';

    const route = useRoute()
    const store = useStore()
    const isBanner = computed(() => route.meta.isBanner)
    const bannerStyle = computed(() => store.getters['setting/header_banner'])
</script>