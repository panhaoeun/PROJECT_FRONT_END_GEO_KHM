<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between px-2 py-2">
            <h2 class="relative text-black text-3xl section section-title:before">Order Details</h2>
        </div>
        <!-- Data Details -->
        <div class="px-2 w-full">
            <div class="row">
                <!-- List order item -->
                <div class="col-lg-8 col-xl-9">
                    <el-card class="box-card h-100">
                        <div class="flex justify-content-between">
                            <div class="relative text-black text-xl section section-title:before">
                                <p class="h6">Order ID #100184</p>
                                <span class="text-sm">10 Jan 2023 02:59:53</span>
                            </div>
                        </div>
                        <div class="flex justify-content-center align-items-center">
                            <div class="justify-content-center flex">
                                <div class="flex flex-column align-items-center justify-content-center mr-2">
                                   <div class="text-sm pb-3">
                                        <span class="text-sm mr-2">Status:</span>
                                        <Tag severity="danger" value="Pending"></Tag>
                                   </div>
                                   <div class="text-sm">   
                                      <span class="text-sm mr-2">Payment Method:</span> 
                                      <span class="h6 mr-2">Cash On Delivery</span> 
                                   </div>
                                    <div class="text-sm p-2">   
                                      <span class="text-sm mr-2">Payment Status:</span> 
                                      <span class="h6 mr-2 text-danger">Unpaid</span> 
                                   </div>
                                </div>
                            </div>
                        </div>
                         <!-- List items detail -->
                        <div class="flex flex-column align-items-center justify-content-center">
                            <div class="px-2 my-2">
                                <el-table :data="tableDataCusOrderDetails" class="text-sm" stripe style="width: 100%">
                                    <el-table-column prop="date" label="SL"/>
                                    <el-table-column prop="name" label="Item Details"/>
                                    <el-table-column prop="address" label="Variations"/>
                                    <el-table-column prop="address" label="Discount"/>
                                    <el-table-column prop="address" label="Price"/>
                                </el-table>
                                <div class="flex justify-content-end">
                                    <div class="flex flex-column py-3 my-2">
                                        <div class="border-round">
                                            <span class="mr-3">Shipping:</span>
                                            <span class="font-bold">$10.00</span>
                                        </div>
                                        <div class="border-round">
                                            <span class="mr-3 font-bold">Total:</span>
                                            <span class="font-bold">$485.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>  
                </div>
                <!-- Detail of Orders -->
                <div class="col-lg-4 col-xl-3 d-flex flex-column gap-3">
                   <div class="gap-3 column-gap-4 row-gap-6">
                        <!--================= Order & Shipping Info===============-->
                        <el-card class="box-card">
                            <div class="flex justify-content-between flex flex-wrap gap-3">
                                <div class="relative text-black text-sm section section-title:before">
                                    <p class="h6">Order & Shipping Info</p>
                                </div>
                                <!-- Options Orders -->
                                <div class="grid formgrid text-sm">
                                    <div class="col-12 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm font-semibold">Order Status</label>
                                            <Dropdown v-model="selectedPaymentStatus" optionLabel="name" placeholder="Select a Order Status" class="w-full text-sm" />
                                        </div>
                                    </div>
                                    <div class="col-12 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm font-semibold">Payment Status</label>
                                            <Dropdown v-model="selectedPaymentStatus" optionLabel="name" placeholder="Select a Payment Status" class="w-full text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                        <!--================Customer Information============-->
                        <el-card class="box-card">
                            <div class="flex justify-content-between flex flex-wrap gap-3">
                                <div class="relative text-black text-sm section section-title:before">
                                    <p class="h6">Shipping Address</p>
                                </div>
                            </div>
                             <!-- Options Orders -->
                            <div class="px-2 py-2">
                                <div class="mb-4 d-flex align-items-center gap-2">
                                    <img class="justify" src="../../../../../src/assets/img/product_icons/customer_icon_default_order.png" alt="Image" width="50"/>
                                    <div class="flex flex-column title-customer-information">
                                        <span>Demo user</span>
                                        <span>3 Orders</span>
                                        <span>demo2@demo.com</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                        <!--=========== Shipping Address ===========-->
                        <el-card class="box-card">
                            <div class="flex justify-content-between flex flex-wrap gap-3">
                                <div class="relative text-black text-sm section section-title:before">
                                    <p class="h6">Shipping Address</p>
                                </div>
                            </div>
                             <!-- Options Orders -->
                            <div class="py-2">
                                <div class="d-flex flex-column gap-2">
                                    <div>
                                        <span>Name :</span>
                                        <strong>Dev</strong>
                                    </div>
                                    <div class="d-flex align-items-start gap-2">
                                       <i class="pi pi-map-marker" style="font-size: 1.2rem"></i>
                                        Phnom Penh
                                    </div>
                                </div>
                            </div>
                        </el-card>
                        <!-- ===============Billing address ===========-->
                        <el-card class="box-card">
                            <div class="flex justify-content-between flex flex-wrap gap-3">
                                <div class="relative text-black text-sm section section-title:before">
                                    <p class="h6">Billing Address</p>
                                </div>
                            </div>
                             <!-- Options Orders -->
                            <div class="py-2">
                                <div class="d-flex flex-column gap-2">
                                    <div>
                                        <span>Name :</span>
                                        <strong>Dev</strong>
                                    </div>
                                    <div class="d-flex align-items-start gap-2">
                                       <i class="pi pi-map-marker" style="font-size: 1.2rem"></i>
                                        Phnom Penh
                                    </div>
                                </div>
                            </div>
                        </el-card>
                        <!-- ===============Shop Information ===========-->
                        <el-card class="box-card">
                            <div class="flex justify-content-between flex flex-wrap gap-3">
                                <div class="relative text-black text-sm section section-title:before">
                                    <p class="h6">Shop Information</p>
                                </div>
                            </div>
                            <div class="py-2">
                                <div class="mb-4 d-flex align-items-center gap-2">
                                    <img class="justify" src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f38e9ce54.png" alt="Image" width="80"/>
                                    <div class="flex flex-column title-customer-information">
                                        <span>Demo user</span>
                                        <span>3 Orders</span>
                                        <span>demo2@demo.com</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- Scripts -->
<script>
    export default{
        data(){
            return {
                selectedPaymentStatus: null,
                tableDataCusOrderDetails: []
            }
        }
    }
</script>