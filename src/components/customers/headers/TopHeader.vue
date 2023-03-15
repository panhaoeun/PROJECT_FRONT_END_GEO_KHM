<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo bg-color-standard-gray" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <!-- Nav Left -->
            <!--Be a Seller-->
            <el-menu-item index="be-seller-index">Be as Seller</el-menu-item>
            <!--Languages-->
            <el-sub-menu index="eng-menu">
                <template #title>English</template>
                <el-menu-item index="eng-menu">English</el-menu-item>
                <el-menu-item index="khmer-menu">Khmer</el-menu-item>
            </el-sub-menu>

        <!-- Nav Right -->
            <div class="flex-grow" />
            <!-- Track Order -->
        <el-menu-item index="track-order-index">
            <el-icon><location/></el-icon>
            <span>Track Order</span> 
        </el-menu-item> 
        <!--Help-->
        <el-menu-item index="help-index">
            <el-icon><Headset/></el-icon>
            <span>Help</span> 
        </el-menu-item> 
    </el-menu>
</template>

<!-- Script -->
<script>
        import {
        Location,
        Headset
    } from '@element-plus/icons-vue';
    export default{
        components: {
            Location,
            Headset
        }
    }
</script>
