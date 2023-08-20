<template>
  <router-view />
</template>
<script>
import { onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
// import '@/plugins/styles'
export default {
<<<<<<< HEAD
  name: "MainLayout",
  data(){
    return{
        message: "Hello World",
        menuListItems: [
            {
                id: 0,
                icon: "pi pi-check",
                title: "Dashboard",
                url: "/vendor/dashboard",
                isActive: 'active'
            },
            {
                id: 0,
                icon: "pi pi-check",
                title: "Orders",
                url: "/vendor/order-list",
                isActive: 'active'
            },
            {
                id: 1,
                icon: "pi pi-check",
                title: "Customers",
                url: "/vendor/sellers/customer",
      
            },
            {
                id: 1,
                icon: "pi pi-check",
                title: "Product",
                url: "/vendor/products/list",

            },
            {
                id: 3,
                icon: "#c-icon-dashboard",
                title: "Seller",
                url: "/vendor/sellers/list"
            },
            {
                id: 4,
                icon: "#c-icon-dashboard",
                title: "Shops",
                url: "/vendor/shop/list"
=======
    name: 'App',
    setup() {
        const store = useStore()
        store.dispatch('setting/setSetting')
        const sidebarType = computed(() => store.getters['setting/sidebar_type'])
        const resizePlugin = () => {
            const sidebarResponsive = document.querySelector('[data-sidebar="responsive"]')
            if (window.innerWidth < 1025) {
                if (sidebarResponsive !== null) {
                    if (!sidebarResponsive.classList.contains('sidebar-mini')) {
                        sidebarResponsive.classList.add('on-resize')
                        store.dispatch('setting/sidebar_type', [...sidebarType.value, 'sidebar-mini'])
                    }
                }
            } else {
                if (sidebarResponsive !== null) {
                    if (sidebarResponsive.classList.contains('sidebar-mini') && sidebarResponsive.classList.contains('on-resize')) {
                        sidebarResponsive.classList.remove('on-resize')
                        store.dispatch(
                            'setting/sidebar_type',
                            sidebarType.value.filter((item) => item !== 'sidebar-mini')
                        )
                    }
                }
>>>>>>> main
            }
        }
        onMounted(() => {
            window.addEventListener('resize', resizePlugin)
            setTimeout(() => {
                resizePlugin()
            }, 200)
        })
        onUnmounted(() => {
            window.removeEventListener('resize', resizePlugin)
        })
    }
}
</script>

