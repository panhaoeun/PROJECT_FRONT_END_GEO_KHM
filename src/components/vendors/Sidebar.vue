<template>
    <nav id="sidebar" class="sidebar js-sidebar">
            <div class="sidebar-content js-simplebar">
                <router-link  class="sidebar-brand" to="">
                      <span class="align-middle text-2xl">E-Commerce</span>
                </router-link>
                <!--Dynamic Sidebar -->
                <ul class="sidebar-nav">
                   <div v-for="item in menuListItem" :key="item.id">
                        <li :class="{'sidebar-item active' : item.isActive }">
                             <router-link :to="item.url" class="sidebar-link">
                                <i :class="{'align-middle text-xl pi pi-wallet' : item.icon }" data-feather="user"></i> 
                                <span class="align-middle text-xl">{{ item.title }}</span>
                            </router-link>
                        </li>    
                   </div>
                </ul>
            </div>
        </nav>
</template>

<!-- Sidebar -->
<script>
    export default{
        name: 'Sidebar',
        props: {
            name: String,
            menuListItem: Array,
        }
    }
</script>