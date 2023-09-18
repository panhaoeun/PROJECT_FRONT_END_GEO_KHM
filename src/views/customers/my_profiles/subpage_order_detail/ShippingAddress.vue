<template>
    <div class="card">
        <h3 class="mb-4">My Shipping Address</h3>
        <Button label="Add New Address" type="danger" class="bg-red-400 check-btn sqr-btn" @click="visibleShippingDiaLog = true" style="width: 15rem;" :title="getAddresses"/>
    <!--================ List Shipping Address ================-->
    <div class="py-4">
        <template v-if="addresses.length > 0">
            <el-row :gutter="18">
                <!--Address -->
                <!-- Shipping Address -->
                <template :key=index v-for="(address,index) in addresses">
                    <el-col :span="12">
                        <el-card shadow="always"> 
                            <div class="gold-members p-4">
                                    <div class="media">
                                        <div class="media-body">
                                            <!-- Contact Information -->
                                            <h6 class="mb-1 text-secondar text-lg flex pb-4">
                                                <i class="pi pi-user" style="font-size: 2rem"></i>
                                                <span class="pl-4">
                                                    <template v-if="address?.addressType  === 'Residence'">
                                                        Residence Address 
                                                    </template>
                                                    <template v-if="address?.addressType === 'Shipping'">
                                                        Shipping address
                                                    </template>
                                                    <template v-if="address?.addressType === 'Billing'">
                                                        Billing address
                                                    </template>
                                                </span>
                                            </h6>
                                            <!-- Address -->
                                            <p class="text-black text-lg flex pb-2">
                                                <i class="pi pi-building" style="font-size: 2rem"></i>
                                                <!-- Residence Address -->
                                                <template v-if="address?.addressType  === 'Residence'">
                                                        <span class="pl-4"> 
                                                            {{ address?.reAdd01 ?? '' }},
                                                            {{ address?.reAdd02 ?? '' }},
                                                            {{ address?.reCity ?? '' }}
                                                            <template v-if="address?.reZipCode !== null">
                                                                ,{{ address?.reZipCode }}
                                                            </template>
                                                        </span>
                                                </template>
                                                <!-- Shipping Address -->
                                                <template v-if="address?.addressType === 'Shipping'">
                                                    <span class="pl-4"> 
                                                        {{ address?.shipAdd01 ?? '' }},
                                                        {{ address?.shipAdd02 ?? '' }},
                                                        {{ address?.shipCity ?? '' }}
                                                        <template v-if="address?.shipZipCode !== null">
                                                            ,{{ address?.shipZipCode }}
                                                        </template>
                                                    </span>
                                                </template>
                                                <!-- Billing Address -->
                                                <template v-if="address?.addressType === 'Billing'">
                                                    <span class="pl-4"> 
                                                        {{ address?.billAdd01 ?? '' }},
                                                        {{ address?.billAdd02 ?? '' }},
                                                        {{ address?.billCity ?? '' }}
                                                        <template v-if="address?.billZipCode !== null">
                                                            ,{{ address?.billZipCode }}
                                                        </template>
                                                    </span>
                                                </template>
                                            </p>
                                            <!-- Edited Shipping Address -->
                                            <p class="mb-0 text-black font-weight-bold">
                                                <EditedShippingAddress :addressId="parseInt(address?.id ? address?.id : 0)"/>
                                            </p>
                                        </div>
                                    </div>
                                </div>    
                        </el-card>
                    </el-col> 
                </template>     
            </el-row>
        </template>
        <template v-else>
            You have no orders made yet
        </template>
    </div>
    <!--================ List Shipping Address ================-->
    <!--=============== Dialog My Shipping Address =================--> 
    <el-dialog v-model="visibleShippingDiaLog" title="Shipping address">
        <!-- Form Submit Address and Billing -->
        <el-form
            ref="shippingBillingFormSubmitRef"
            :model="addShippingFormModelSubmit"
            :rules="rulesAddress"
            class="demo-ruleForm"
        >
            <!-- Radio Choose Type Address Option -->
            <el-form-item prop="typeAddrAddFormOption" class="pb-2">
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
            <el-form-item prop="contactName"  name="Please enter a Contact Name">
                <el-input v-model="addShippingFormModelSubmit.contactName"  placeholder="Please Enter Name"/>
            </el-form-item>
            <el-form-item prop="phoneNumberContact">
                <el-input v-model="addShippingFormModelSubmit.phoneNumberContact" placeholder="Please Enter Phone Number"/>
            </el-form-item>
            <!--  -->
            <el-form-item  prop="addr01" name="Please enter a address 01">
                <el-input v-model="addShippingFormModelSubmit.addr01" placeholder="Address 01"/>
            </el-form-item>
            <el-form-item prop="addr02" name="Please enter a address 02" >
                <el-input v-model="addShippingFormModelSubmit.addr02" placeholder="Address 02"/>
            </el-form-item>
            <el-form-item prop="cityAddr" name="Please enter a city">
                <el-input v-model="addShippingFormModelSubmit.cityAddr" placeholder="City"/>
            </el-form-item>
            <el-form-item>
                <el-input v-model="addShippingFormModelSubmit.postalCodeAddr" placeholder="Postal Code"/>
            </el-form-item>
        </el-form> 
        <!-- Form Submit Address and Billing -->
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visibleShippingDiaLog = false">Cancel</el-button>
                <el-button type="primary" @click="submitShippingBillingAddress('shippingBillingFormSubmitRef')" :loading="loadingAddAddr">
                    Add Address
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!--=============== Dialog My Shipping Address =================-->
    </div>
</template>

<!-- Scripts -->
<script>
import ShippingBillingAddressServices from "../../../../services/customers/address/ShippingBillingAddressServices";
import EditedShippingAddress from "../subpage_order_detail/shippingAddress/EditedShippingAddr";
export default{
    created() {
        this.shippingAddressServices = new ShippingBillingAddressServices();
    },  
    components: {
        EditedShippingAddress
    },  
    data(){
        return {
            classNames: ['card bg-light mb-3', 'card text-white bg-dark mb-3'],
            addresses: [],
            visibleShippingDiaLog: false,
            loadingAddAddr: false,
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
            ],
            rulesAddress: {
                typeAddrAddFormOption: [
                    { required: true, message: 'Please select type of address', trigger: 'change' },
                ],
                contactName: [
                    { required: true, message: 'Please enter contact name', trigger: 'blur' },
                    { min: 3, max: 5, message: 'contact name should be 3 to 5', trigger: 'blur' }
                ],
                phoneNumberContact: [
                    { required: true, message: 'Please enter phone number for contact', trigger: 'blur' },
                    { min: 9, message: 'contact phone number should be 10', trigger: 'blur' }
                ],
                addr01: [
                    { required: true, message: 'Please enter address 01', trigger: 'blur' },
                ],
                addr02: [
                    { required: true, message: 'Please enter address 02', trigger: 'blur' },
                ],
                cityAddr: [
                    { required: true, message: 'Please enter city', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        getAddresses() {
            return this.getAddressCustomer();
        }
    },
    methods:{
        getAddressCustomer(){
            try{
                new Promise((resolve, reject) => {
                    this.shippingAddressServices.getBillingOrShippingAddress()
                    .then((address) => {
                        if(!address){
                            this.addresses = Array.isArray() ?? [];
                            reject(address);
                        }
                        this.addresses  = address ? address : [];
                        resolve(address);
                    })
                    .catch((error) => {
                        Promise.reject(error);
                    })
                });
                
            }catch(error){
                return Promise.reject(error);
            }
        },
        // Created Address
        submitShippingBillingAddress(submit) {
            this.$refs[submit].validate((valid) => {
                if (valid) {
                   //Shipping Address
                    const addAddressCustomerShipping =  {
                        contactName: this.addShippingFormModelSubmit.contactName  ? this.addShippingFormModelSubmit.contactName : '',
                        phoneNumberContact: this.addShippingFormModelSubmit.phoneNumberContact  ? this.addShippingFormModelSubmit.phoneNumberContact : '',
                        addressType: this.addShippingFormModelSubmit.typeAddrAddFormOption ? this.addShippingFormModelSubmit.typeAddrAddFormOption : '',
                        residentAddr: {
                            reAddr01: '',
                            reAddr02: '',
                            reCity: '',
                            reZipcode: ''
                        },
                        buildingAddr: {
                            billAddr01: '',
                            billAddr02: '',
                            billAddrCity: '',
                            billAddrZipcode: ''
                        },
                        shippingAddr: {
                            shippingAddr01: this.addShippingFormModelSubmit.addr01 ? this.addShippingFormModelSubmit.addr01 : '',
                            shippingAddr02: this.addShippingFormModelSubmit.addr02 ? this.addShippingFormModelSubmit.addr02 : '',
                            shippingAddrCity: this.addShippingFormModelSubmit.cityAddr ? this.addShippingFormModelSubmit.cityAddr : '',
                            shippingAddrZipcode: this.addShippingFormModelSubmit.postalCodeAddr ? this.addShippingFormModelSubmit.postalCodeAddr : ''
                        }
                    }
                    //Billing Address
                    const addBillingAddressCustomer =  {
                       contactName: this.addShippingFormModelSubmit.contactName  ? this.addShippingFormModelSubmit.contactName : '',
                       phoneNumberContact: this.addShippingFormModelSubmit.phoneNumberContact  ? this.addShippingFormModelSubmit.phoneNumberContact : '',
                       addressType: this.addShippingFormModelSubmit.typeAddrAddFormOption ? this.addShippingFormModelSubmit.typeAddrAddFormOption : '',
                        residentAddr: {
                            reAddr01: '',
                            reAddr02: '',
                            reCity: '',
                            reZipcode: ''
                        },
                        buildingAddr: {
                            billAddr01:  this.addShippingFormModelSubmit.addr01 ? this.addShippingFormModelSubmit.addr01 : '',
                            billAddr02: this.addShippingFormModelSubmit.addr02 ? this.addShippingFormModelSubmit.addr02 : '',
                            billAddrCity: this.addShippingFormModelSubmit.cityAddr ? this.addShippingFormModelSubmit.cityAddr : '',
                            billAddrZipcode: this.addShippingFormModelSubmit.postalCodeAddr ? this.addShippingFormModelSubmit.postalCodeAddr : ''
                        },
                        shippingAddr: {
                            shippingAddr01:'',
                            shippingAddr02:'',
                            shippingAddrCity: '',
                            shippingAddrZipcode: ''
                        }
                    }
                    let addAddress;
                    const shippingType = this.addShippingFormModelSubmit.typeAddrAddFormOption 
                                        ? this.addShippingFormModelSubmit.typeAddrAddFormOption : '';
                    switch(shippingType){
                        case "Shipping":
                            addAddress = addAddressCustomerShipping ? addAddressCustomerShipping : [];
                        break;
                        case "Billing":
                            addAddress = addBillingAddressCustomer ? addBillingAddressCustomer : [];
                        break;
                        default:
                            addAddress;  
                    }
                    // Shipping Address
                    this.shippingAddressServices.addShippingBillingAddress(addAddress).then((address) => {
                        if(address.data.success === true){
                            this.loadingAddAddr = true;
                            this.$notify.success({
                                title: `Successfully Create ${shippingType ? shippingType : ''} Address`,
                                message: address.data?.message ? address.data?.message : '' ,
                                showClose: false
                            });
                            this.visibleShippingDiaLog = false;
                            this.addShippingFormModelSubmit = {};
                            window.location.reload();
                        }
                        setTimeout(() => {
                                this.loadingAddAddr = false
                            }, 1500);
                    }).catch((error) => {
                        if(error){
                            this.$notify.error({
                                title: 'Error Create Address',
                                message: error.response.data.error.message ?? 'Unsuccessfully for create address',
                                showClose: false
                            });   
                        }
                        // Validation Error
                        if(error.response.data.error.error.errors){
                            for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                this.$notify.error({
                                    title: 'Error Updated Address Address',
                                    message: messageValidation ?? 'Unsuccessfully for updated address',
                                    showClose: false
                                });   
                            }
                        }
                    });
                } else {
                    this.$notify.error({
                        title: `Error Add ${this.addShippingFormModelSubmit.typeAddrAddFormOption ? this.addShippingFormModelSubmit.typeAddrAddFormOption : ''}  Address`,
                        message: 'Please enter address to shipping or billing',
                        showClose: false
                    });   
                    return false;
                }
            });
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