<template>
    <el-menu :default-active="activeIndex" class="" mode="horizontal" :ellipsis="false" @select="handleSelect" >
        <!-- Nav Right -->
        <div class="flex-grow" />
            <!-- Track Order -->
        <el-menu-item index="track-order-index">
            <el-icon><Position /></el-icon>
            <span>Track Order</span> 
        </el-menu-item> 
        <!--Help-->
        <el-menu-item index="help-index">
            <el-icon><Service /></el-icon>
            <span>Help</span> 
        </el-menu-item> 
        <!--Be a Seller-->
        <el-menu-item index="be-seller-index">
           <el-icon><Suitcase /></el-icon>
            <span>Be as Seller</span>
        </el-menu-item>
        <!--Languages-->
        <el-sub-menu index="eng-menu">
            <template #title>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/255px-Flag_of_the_United_Kingdom.svg.png" width="35" height="23"/>
                <span class="pl-2">English</span>
            </template>
            <el-menu-item index="eng-menu">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/255px-Flag_of_the_United_Kingdom.svg.png" width="35" height="23"/>
                <span class="pl-2">English</span>
            </el-menu-item>
            <el-menu-item index="khmer-menu">
                <img src="https://cdn.britannica.com/27/4027-004-B57F84E9/Flag-Cambodia.jpg" width="35" height="23"/>
                <span class="pl-2">Khmer</span>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<!-- Script -->
<script>
        import {
        Position,
        Service,
        Suitcase
    } from '@element-plus/icons-vue';
    export default{
        components: {
            Position,
            Service,
            Suitcase
        }, 
        methods: {
            handleSelect(){}
        }
    }
</script>
