<template>
    <!-- Header -->
    <Header/>
    <!-- Tab Menu - Sidebar -->
    <div class="account-tab">
        <div class="px-2 py-2 w-full">
            <!--Nav Crumb-->
            <div class="p-4 w-full">
                <div class="p-0 m-0">
                    <!--Bread Crumbs-->
                    <div class="px-2 py-2 my-2">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/' }">Homw</el-breadcrumb-item>
                            <el-breadcrumb-item
                            ><a href="/">Account</a></el-breadcrumb-item
                            >
                            <el-breadcrumb-item>My Accounts</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <!--Page Menu-->
                    <el-row :gutter="10">
                        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                            <div class="bg-white px-2 py-2 page-menu min-vh-100 w-full">
                                <!--Tabs-->
                                <el-tabs :tab-position="this.tabPosition" style="height: 200px" class="demo-tabs">
                                    <el-tab-pane label="User">User</el-tab-pane>
                                    <el-tab-pane label="Config">Config</el-tab-pane>
                                    <el-tab-pane label="Role">Role</el-tab-pane>
                                    <el-tab-pane label="Task">Task</el-tab-pane>
                                </el-tabs>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import Header from '../../../components/customers/Header.vue';
    export default{
        components: {
            Header,
        },
        data(){
            return{
                tabPosition: 'left'
            }
        }
    }
</script>

<style>
.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>