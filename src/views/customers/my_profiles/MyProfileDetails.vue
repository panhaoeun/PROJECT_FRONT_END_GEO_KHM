<template>
    <!-- Tab Menu - Sidebar -->
   <div class="bg-white">
        <div class="container p-2 text-lg">
              <!-- Breadcrumbs -->       
              <div class="py-4">
                  <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                    <el-breadcrumb-item>My Account</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
                <div class="row">
                    <div class="col-md-5 col-xl-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Settings</h5>
                            </div>
                            <div class="list-group p-2 px-4 py-4 my-2" role="tablist">
                                <router-link class="list-group-item list-group-item-action active nav-link my-2"
                                    data-bs-toggle="pill" data-bs-target="#account-tab" 
                                    aria-selected="true" to="#account-tab" role="tab"
                                >
                                    <i class="pi pi-user pl-2" style="font-size: 1.5rem"></i>
                                    Account
                                </router-link>
                                <router-link class="list-group-item list-group-item-action nav-link" 
                                    data-bs-toggle="pill" data-bs-target="#password" 
                                    type="button" 
                                    role="tab" aria-controls="password" aria-selected="false"
                                    to="#password"
                                >
                                      <i class="pi pi-lock  pl-2" style="font-size: 1.5rem"></i>
                                       Password
                                </router-link>
                                <router-link 
                                     class="list-group-item list-group-item-action nav-link my-2"
                                       data-bs-toggle="pill" 
                                      role="tab" aria-controls="shipaddress"
                                        data-toggle="list" to="#shipaddress">
                                    <i class="pi pi-map  pl-2" style="font-size: 1.5rem"></i>
                                    Shipping Address
                                </router-link>
                                <!-- Wallet -->
                                <div class="font-bold my-2 text-xl">
                                    <p class="font-bold">Asset center</p>
                                </div>
                                <div class="my-2">
                                    <router-link 
                                        class="list-group-item list-group-item-action nav-link my-2"
                                        data-bs-toggle="pill" 
                                        role="tab" aria-controls="shipaddress"
                                            data-toggle="list" to="#shipaddress">
                                        <i class="pi pi-map  pl-2" style="font-size: 1.5rem"></i>
                                        Wallet
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7 col-xl-8">
                        <div class="tab-content">
                                <!-- My Profile Details -->
                                <div class="tab-pane fade active show" id="account-tab" role="tabpanel" aria-labelledby="account-tab">
                                   <div class="card">
                                        <h3 class="mb-4">Account Settings</h3>
                                        <!-- Account Settings -->
                                        <div class="p-fluid">
                                            <!-- User Profile -->
                                            <div class="field gird">
                                            <div class="row">
                                                <div class="col-2 md:col-3 xl:col-2 lg:2 flex align-items-center justify-content-center">
                                                    <span class="text-500 text-lg">Profile Picture</span>
                                                </div>
                                                <!-- Upload Image -->
                                                <div class="col-6">
                                                    <UploadPreviewAvatar imageData="imageFile"/>
                                                </div>
                                            </div>
                                            </div>
                                            <!-- Name -->
                                            <div class="field grid">
                                                <label for="name" class="col-12 mb-2 xl:col-2 md:col-4 md:mb-0">Name</label>
                                                <div class="col-12 md:col-12">
                                                    <InputText id="name" v-model="value" />
                                                </div>
                                            </div>
                                            <!--Date Of birth-->
                                            <div class="field grid">
                                                <label for="name" class="col-12 mb-2 xl:col-2 md:col-4 md:mb-0">Date of Birth</label>
                                                <div class="col-12 md:col-12">
                                                    <Calendar id="name" v-model="value" showIcon showButtonBar/>
                                                </div>
                                            </div>
                                            <!--Gender-->
                                            <div class="field grid">
                                                <label for="name" class="col-12 mb-2 xl:col-2 md:col-4 md:mb-0">Gender</label>
                                                <div class="col-12 md:col-12">
                                                    <Dropdown v-model="selectGenderCus" :options="genderCus" optionLabel="name" placeholder="Select a Gender" class="w-full" />
                                                </div>
                                            </div>
                                            <!--Gender-->
                                            <div class="field grid">
                                                <label for="name" class="col-12 mb-2 xl:col-2 md:col-4 md:mb-0">Email</label>
                                                <div class="col-12 md:col-12">
                                                     <InputText id="name" v-model="value" type="email" />
                                                </div>
                                            </div>
                                            <!-- Button Submitted -->
                                            <div class="gap-3 py-4">
                                                <Button label="UPDATE" severity="danger" style="width:12rem;" size="large"/>
                                            </div>
                                        </div>
                                   </div>
                                </div> 
                                <!-- Change Password -->
                                <div class="tab-pane fade" id="password" role="tabpanel">
                                    <ChangePassword/>
                                </div>    
                                <!-- Shipping Address -->
                                <div class="tab-pane fade" id="shipaddress" role="tabpanel">
                                    <ShippingAddress/>
                                </div>    
                                <!-- Wallets -->
                                <div class="tab-pane fade" id="wallets-customer" role="tabpanel">
                                    <ShippingAddress/>
                                </div>   
                        </div>
                        
                    </div>
                </div>
        </div> 
   </div>
</template>


<!-- Script -->
<script setup>
    import UploadPreviewAvatar from "../../../components/component/UploadPreviewAvatar.vue";
    import ChangePassword from "../../../views/customers/my_profiles/subpage_order_detail/ChangePassword.vue";
    import ShippingAddress from "../../../views/customers/my_profiles/subpage_order_detail/ShippingAddress.vue";
    import { ref } from "vue";
    import { ArrowRight } from '@element-plus/icons-vue';
    const selectGenderCus = ref();
    const imageFile = ref(null);
    console.log(imageFile);
    const genderCus = ref([
        { name: 'Male', code: 'male' },
        { name: 'Female', code: 'female' }
    ]);
    //Get Current Uer Profile login or registers
    
</script>
