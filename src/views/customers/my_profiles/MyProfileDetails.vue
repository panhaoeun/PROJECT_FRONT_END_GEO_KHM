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
                    <div class="col-md-5 col-xl-4 gap-2">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Settings</h5>
                            </div>
                            <div class="list-group p-2 my-2" role="tablist">
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
                                        role="tab" aria-controls="wallets-customer"
                                            data-toggle="list" to="#wallets-customer">
                                        <i class="pi pi-wallet  pl-2" style="font-size: 1.5rem"></i>
                                        Wallet
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7 col-xl-8  gap-2">
                        <div class="tab-content">
                                <!-- My Profile Details -->
                                <div class="tab-pane fade active show" id="account-tab" role="tabpanel" aria-labelledby="account-tab">
                                    <MyAccountSettings/>
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
                                    <MyWalletBalance/>
                                </div>   
                        </div>
                        
                    </div>
                </div>
        </div> 
   </div>
</template>


<!-- Script -->
<script setup>
    import MyAccountSettings from "../../../views/customers/my_profiles/subpage_order_detail/MyAccountSettings.vue";
    import ChangePassword from "../../../views/customers/my_profiles/subpage_order_detail/ChangePassword.vue";
    import ShippingAddress from "../../../views/customers/my_profiles/subpage_order_detail/ShippingAddress.vue";
    import MyWalletBalance from "../../../views/customers/my_profiles/my_wallet/MyWalletBalance.vue";
    import { ArrowRight } from '@element-plus/icons-vue';    
</script>
