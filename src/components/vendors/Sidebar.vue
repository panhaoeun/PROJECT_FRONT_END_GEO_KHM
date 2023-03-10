<template>
    <nav id="sidebar" class="sidebar js-sidebar">
            <div class="sidebar-content js-simplebar">
                <router-link  class="sidebar-brand" to="">
                      <span class="align-middle text-2xl">AdminKit</span>
                </router-link>
                {{ message }}
                <ul class="sidebar-nav">
                   <div v-for="item in menuListItem" :key="item.id">
                        <li class="sidebar-item active">
                             <router-link to="/" class="sidebar-link">
                                <i class="align-middle text-xl pi pi-sliders-v" data-feather="user"></i> 
                                <span class="align-middle text-xl">Dashboard</span>
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
            message:String
        },
          setup(props) {
        // setup() receives props as the first argument.
            console.log(props)
         }
        
    }
</script>