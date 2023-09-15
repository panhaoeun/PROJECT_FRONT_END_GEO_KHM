<template>
    <div class="card">
        <h3 class="mb-4">My Shipping Address</h3>
        <Button label="Add New Address" class="py-2" @click="visibleShippingDiaLog = true" style="width: 15rem;;"/>
        <!--=============== Dialog My Shipping Address =================-->
       <el-dialog v-model="visibleShippingDiaLog" title="Shipping address">
            <!-- Form Submit Address and Billing -->
            <el-form
                ref="shippingBillingFormSubmit"
                :model="addShippingFormModelSubmit"
                :rules="rulesDepositedWallet"
                class="demo-ruleForm"
            >
                <!-- Radio Choose Type Address Option -->
                <el-form-item prop="typeAddrAddFormOption">
                    <el-radio-group 
                        autocomplete="off"  
                        class="w-full"
                        style="width: 100%"
                        v-model="addShippingFormModelSubmit.typeAddrAddFormOption"
                    >
                        <el-radio border label="Shipping" name="shipping-addr-type"/>
                        <el-radio border label="Billing"  name="billing-addr-type"/>
                    </el-radio-group>
                </el-form-item>
                <!--Contact person name-->
                <el-form-item prop="contactPerson" name="Please enter a Contact Name">
                   <el-input v-model="addShippingFormModelSubmit.contactName"  placeholder="Please Enter Name"/>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="addShippingFormModelSubmit.phoneNumberContact" placeholder="Please Enter Phone Number"/>
                </el-form-item>
                <!--  -->
                <el-form-item  prop="shippingAddressFormSubmitted" name="Please enter a Location">
                    <el-input v-model="addShippingFormModelSubmit.addr01" placeholder="Address 01"/>
                </el-form-item>
                <el-form-item>
                   <el-input v-model="addShippingFormModelSubmit.addr02" placeholder="Address 02"/>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="addShippingFormModelSubmit.cityAddr" placeholder="City"/>
                    <el-col class="text-center" :span="1" style="margin: 0.5rem"></el-col>
                    <el-input v-model="addShippingFormModelSubmit.postalCodeAddr" placeholder="Postal Code"/>
                </el-form-item>
            </el-form> 
            <!-- Form Submit Address and Billing -->
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visibleShippingDiaLog = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                      Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!--=============== Dialog My Shipping Address =================-->
        <!--================ List Shipping Address ================-->
        <div class="py-4">
              <el-row :gutter="18">
                <!-- Address -->
                <el-col :span="12">
                        <el-card shadow="always"> 
                            <div class="gold-members p-4">
                                    <div class="media">
                                        <div class="mr-3"><i class="icofont-ui-home icofont-3x"></i></div>
                                        <div class="media-body">
                                            <!-- Contact Information -->
                                            <h6 class="mb-1 text-secondar text-lg flex pb-4">
                                                <i class="pi pi-user" style="font-size: 2rem"></i>
                                                <span class="pl-4">Dev Panha,+855 016387467</span>
                                            </h6>
                                            <!-- Address -->
                                            <p class="text-black text-lg flex pb-2">
                                             <i class="pi pi-building" style="font-size: 2rem"></i>
                                              <span class="pl-4"> Phnom Penh
                                                    Phnom Penh
                                                    Phnom Penh, Cambodia, 23536
                                                    Default
                                                </span>
                                            </p>
                                            <p class="mb-0 text-black font-weight-bold">
                                                <a class="text-primary mr-3" data-toggle="modal" data-target="#add-address-modal" href="#">
                                                    <i class="icofont-ui-edit"></i> EDIT
                                                </a> 
                                                <a class="text-danger" data-toggle="modal" data-target="#delete-address-modal" href="#">
                                                    <i class="icofont-ui-delete"></i> 
                                                    DELETE
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>    
                        </el-card>
                </el-col>
                <!-- Default Address -->
                <el-col :span="12">
                    <el-card shadow="always" class="box-card"> 
                        <div class="gold-members p-4">
                                <div class="media">
                                    <div class="mr-3"><i class="icofont-ui-home icofont-3x"></i></div>
                                    <div class="media-body">
                                        <!-- Contact Information -->
                                        <h6 class="mb-1 text-secondar text-lg flex pb-4">
                                            <i class="pi pi-user" style="font-size: 2rem"></i>
                                            <span class="pl-4">Dev Panha,+855 016387467</span>
                                        </h6>
                                        <!-- Address -->
                                        <p class="text-black text-lg flex pb-2">
                                            <i class="pi pi-building" style="font-size: 2rem"></i>
                                            <span class="pl-4"> Phnom Penh
                                                Phnom Penh
                                                Phnom Penh, Cambodia, 23536
                                                Default
                                            </span>
                                        </p>
                                        <p class="mb-0 text-black font-weight-bold">
                                            <a class="text-primary mr-3" data-toggle="modal" data-target="#add-address-modal" href="#">
                                                <i class="icofont-ui-edit"></i> EDIT
                                            </a> 
                                            <a class="text-danger" data-toggle="modal" data-target="#delete-address-modal" href="#">
                                                <i class="icofont-ui-delete"></i> 
                                                DELETE
                                            </a>
                                        </p>
                                    </div>
                                </div>
                        </div>    
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <!--================ List Shipping Address ================-->
    </div>
</template>

<!-- Scripts -->
<script>
// import CrateShippingAddress from "./shippingAddress/CreateShippingAddr.vue";
export default{
    data(){
        return {
            visibleShippingDiaLog: false,
            addShippingFormModelSubmit: [
                {
                    typeAddrAddFormOption: '',
                    contactName: '',
                    phoneNumberContact: '',
                    cityAddr: '',
                    postalCodeAddr: '',
                    addr01: '',
                    addr02: ''
                }
            ]
        }
    }
}
</script>
<!-- Style Of Add Shipping -->
<style>
/* My Account */
.box-card{
    border-color: #e52e02;
    background-color: #fff4f2;
}
.payments-item img.mr-3 {
    width: 47px;
}
.order-list .btn {
    border-radius: 2px;
    min-width: 121px;
    font-size: 13px;
    padding: 7px 0 7px 0;
}
.osahan-account-page-left .nav-link {
    padding: 18px 20px;
    border: none;
    font-weight: 600;
    color: #535665;
}
.osahan-account-page-left .nav-link i {
    width: 28px;
    height: 28px;
    background: #535665;
    display: inline-block;
    text-align: center;
    line-height: 29px;
    font-size: 15px;
    border-radius: 50px;
    margin: 0 7px 0 0px;
    color: #fff;
}
.osahan-account-page-left .nav-link.active {
    background: #f3f7f8;
    color: #282c3f !important;
}
.osahan-account-page-left .nav-link.active i {
    background: #282c3f !important;
}
.osahan-user-media img {
    width: 90px;
}
.card offer-card h5.card-title {
    border: 2px dotted #000;
}
.card.offer-card h5 {
    border: 1px dotted #daceb7;
    display: inline-table;
    color: #17a2b8;
    margin: 0 0 19px 0;
    font-size: 15px;
    padding: 6px 10px 6px 6px;
    border-radius: 2px;
    background: #fffae6;
    position: relative;
}
.card.offer-card h5 img {
    height: 22px;
    object-fit: cover;
    width: 22px;
    margin: 0 8px 0 0;
    border-radius: 2px;
}
.card.offer-card h5:after {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #daceb7;
    content: "";
    left: 30px;
    position: absolute;
    bottom: 0;
}
.card.offer-card h5:before {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #daceb7;
    content: "";
    left: 30px;
    position: absolute;
    top: 0;
}
.payments-item .media {
    align-items: center;
}
.payments-item .media img {
    margin: 0 40px 0 11px !important;
}
.reviews-members .media .mr-3 {
    width: 56px;
    height: 56px;
    object-fit: cover;
}
.order-list img.mr-4 {
    width: 70px;
    height: 70px;
    object-fit: cover;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075)!important;
    border-radius: 2px;
}
.osahan-cart-item p.text-gray.float-right {
    margin: 3px 0 0 0;
    font-size: 12px;
}
.osahan-cart-item .food-item {
    vertical-align: bottom;
}

.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    color: #000000;
}

.shadow-sm {
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
}

.rounded-pill {
    border-radius: 50rem!important;
}
a:hover{
    text-decoration:none;
}
</style>