<template>
    <nav id="sidebar" class="sidebar js-sidebar">
            <div class="sidebar-content js-simplebar">
                <router-link  class="sidebar-brand" to="">
                      <span class="align-middle text-2xl">E-Commerce</span>
                </router-link>
                <!--Dynamic Sidebar -->
                <ul class="sidebar-nav">
                     <li class="sidebar-item active">
                        <a data-bs-target="#dashboards" data-bs-toggle="collapse" class="sidebar-link" aria-expanded="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders align-middle"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg> <span class="align-middle">Dashboards</span>
                        </a>
                        <ul id="dashboards" class="sidebar-dropdown list-unstyled collapse show" data-bs-parent="#sidebar" style="">
                            <li class="sidebar-item active"><a class="sidebar-link" href="index.html">Analytics</a></li>
                            <li class="sidebar-item"><a class="sidebar-link" href="dashboard-ecommerce.html">E-Commerce <span class="sidebar-badge badge bg-primary">Pro</span></a></li>
                            <li class="sidebar-item"><a class="sidebar-link" href="dashboard-crypto.html">Crypto <span class="sidebar-badge badge bg-primary">Pro</span></a></li>
                        </ul>
                    </li>
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