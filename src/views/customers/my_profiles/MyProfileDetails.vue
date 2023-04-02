<template>
    <!-- Tab Menu - Sidebar -->
    <div class="account-tab">
        <div class="px-2 py-2 w-full">
            <!--Nav Crumb-->
            <div class="p-4 w-full">
                <div class="p-0 m-0">
                    <!--Bread Crumbs-->
                    <div class="px-2 py-2 my-2">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                            <el-breadcrumb-item
                            ><a href="/">Account</a></el-breadcrumb-item
                            >
                            <el-breadcrumb-item>My Accounts</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <!--Page Menu-->
                    <el-row :gutter="10">
                        <el-col>
                            <div class="px-2 py-2 page-menu min-vh-100 w-full text-xl">
                                <!--Tabs-->
                                <el-tabs :tab-position="this.tabPosition" style="height: 500px" type="border" class="demo-tabs">
                                    <el-tab-pane label="Accounts">
                                        <div class="px-2 py-2">
                                            <div class="flex items-center justify-between mx-auto max-w-full">
                                                <!-- My Profile -->
                                              <div class="col-12">
                                                <div class="border-300 border-1 bg-white px-2 py-2 border-round surface-overlay font-bold m-2 align-items-center">
                                                    <!-- Aviators -->
                                                    <div class="flex align-items-center px-3 py-2">
                                                        <Avatar v-badge.danger="4" class="p-overlay-badge" image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" size="xlarge" shape="circle" style="width:80px !important; height: auto;"/>
                                                        <p class="text-xl pl-4 font-bold text-black">Panha Developer</p>
                                                    </div>
                                                    <!-- Grid -->
                                                    <div class="my-order container">
                                                        <div class="title text-black text-xl">My Order</div>
                                                        <el-row :gutter="12">
                                                            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                                                                asdasd
                                                            </el-col>
                                                        </el-row>
                                                    </div>                                                  
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                    </el-tab-pane>
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
    export default{
        components: {
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