<template>
    <router-link class="text-primary mr-3" @click="editedAddressDialogCustomer()" to="#">
        <i class="icofont-ui-edit"></i>
        EDIT
    </router-link> 
    <router-link class="text-danger" @click="deletedAddressDialogCustomer()" to="#">
        <i class="icofont-ui-delete"></i> 
        DELETE
    </router-link>
<!--================ Edited Address Dialogs ================-->
<el-dialog
  title="Edited Adress"
  v-model="editedAddressDialog"
  width="50%"
>
    <!-- Edited Form Submit Address and Billing -->
    <el-form
        ref="updatedShippingBillingFormSubmitRef"
        :model="editedShippingFormModelSubmit"
        :rules="rulesEditedAddress"
        class="demo-ruleForm"
    >
        <!-- Radio Choose Type Address Option -->
        <el-form-item prop="editTypeAddrAddFormOption" class="pb-2">
            <el-radio-group 
                autocomplete="off"  
                class="w-full"
                style="width: 100%"
                v-model="editedShippingFormModelSubmit.editTypeAddrAddFormOption"
            >
                <el-radio border label="Shipping" name="shipping-addr-type"/>
                <el-radio border label="Billing"  name="billing-addr-type"/>
            </el-radio-group>
        </el-form-item>
        <!--Contact person name-->
        <el-form-item prop="editContactName"  name="Please enter a Contact Name">
            <el-input v-model="editedShippingFormModelSubmit.editContactName"  placeholder="Please Enter Name"/>
        </el-form-item>
        <el-form-item prop="editPhoneNumberContact">
            <el-input v-model="editedShippingFormModelSubmit.editPhoneNumberContact" placeholder="Please Enter Phone Number"/>
        </el-form-item>
        <!--  -->
        <el-form-item  prop="editAddr01" name="Please enter a address 01">
            <el-input v-model="editedShippingFormModelSubmit.editAddr01" placeholder="Address 01"/>
        </el-form-item>
        <el-form-item prop="editAddr02" name="Please enter a address 02" >
            <el-input v-model="editedShippingFormModelSubmit.editAddr02" placeholder="Address 02"/>
        </el-form-item>
        <el-form-item prop="editCityAddr" name="Please enter a city">
            <el-input v-model="editedShippingFormModelSubmit.editCityAddr" placeholder="City"/>
        </el-form-item>
        <el-form-item>
            <el-input v-model="editedShippingFormModelSubmit.editPostalCodeAddr" placeholder="Postal Code"/>
        </el-form-item>
    </el-form> 
    <!-- Edited Form Submit Address and Billing -->
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="editedAddressDialog= false">Cancel</el-button>
            <el-button type="primary" @click="submitUpdatedShippingBillingAddress('updatedShippingBillingFormSubmitRef')" :loading="loadingUpdatedAddr">
                Update
            </el-button>
        </span>
    </template>
</el-dialog>
<!--================ Deleted Address Dialogs ================-->
</template>
<!-- Script -->
<script>
    import ShippingBillingAddressServices from "../../../../../services/customers/address/ShippingBillingAddressServices";
    export default{
        props: {
            addressId: {
                type: Number,
                required: true
            },
        },
        created() {
            this.shippingAddressServicesEdited = new ShippingBillingAddressServices();
        }, 
        data(){
            return{
                editedAddressDialog: false,
                deletedAddressDialog: false,
                loadingUpdatedAddr: false,
                editedShippingFormModelSubmit: [
                    {
                        editTypeAddrAddFormOption: '',
                        editContactName: '',
                        editPhoneNumberContact: '',
                        editCityAddr: '',
                        editPostalCodeAddr: '',
                        editAddr01: '',
                        editAddr02: ''
                    }
                ],
                rulesEditedAddress: {
                    editTypeAddrAddFormOption: [
                        { required: true, message: 'Please select type of address', trigger: 'change' },
                    ],
                    editContactName: [
                        { required: true, message: 'Please enter contact name', trigger: 'blur' },
                        { max: 8, message: 'contact name should be 3 to 10', trigger: 'blur' }
                    ],
                    editPhoneNumberContact: [
                        { required: true, message: 'Please enter phone number for contact', trigger: 'blur' },
                        { min: 10, message: 'contact phone number should be 10', trigger: 'blur' }
                    ],
                    editAddr01: [
                        { required: true, message: 'Please enter address 01', trigger: 'blur' },
                    ],
                    editAddr02: [
                        { required: true, message: 'Please enter address 02', trigger: 'blur' },
                    ],
                    editCityAddr: [
                        { required: true, message: 'Please enter city', trigger: 'blur' },
                    ]
                }
            }
        },
        methods:{
            editedAddressDialogCustomer(){
                this.editedAddressDialog=true;
                const addressId = parseInt(this.addressId) ? parseInt(this.addressId)  : 0;
                this.shippingAddressServicesEdited.editBillingOrShippingAddress(addressId ? addressId : 0)
                    .then((editAddId) => {
                        if(!editAddId) {
                            this.editedShippingFormModelSubmit = Array.isArray() ?? {};
                        }
                        const {
                            phone_number_contact,
                            contact_name,
                            reAdd01,
                            reAdd02,
                            reCity,
                            reZipCode,
                            billAdd01,
                            billAdd02,
                            billCity,
                            billZipCode,
                            shipAdd01,
                            shipAdd02,
                            shipCity,
                            shipZipCode,
                            addressType,
                        } = editAddId ? editAddId : '';
                        const editShippingAddr = {
                            contactName: contact_name,
                            contactPhone: phone_number_contact,
                            editAddr01: shipAdd01,
                            editAddr02: shipAdd02,
                            editAddrCity: shipCity,
                            editAddrZipCode: shipZipCode
                        }
                        const editBillingAddr = {
                            contactName: contact_name,
                            contactPhone: phone_number_contact,
                            editAddr01: billAdd01,
                            editAddr02: billAdd02,
                            editAddrCity: billCity,
                            editAddrZipCode: billZipCode
                        }
                        const editResidenceAddr = {
                            contactName: contact_name,
                            contactPhone: phone_number_contact,
                            editAddr01: reAdd01,
                            editAddr02: reAdd02,
                            editAddrCity: reCity,
                            editAddrZipCode: reZipCode
                        }
                        let editCustomerAddress;
                        switch(addressType){
                            case "Shipping":
                                editCustomerAddress = editShippingAddr ? editShippingAddr : [];
                            break;
                            case "Billing":
                                editCustomerAddress = editBillingAddr ? editBillingAddr : [];
                            break;
                            case "Residence":
                                editCustomerAddress = editResidenceAddr ? editResidenceAddr : [];
                            break;
                            default:
                                editCustomerAddress;  
                        } 
                        this.editedShippingFormModelSubmit.editTypeAddrAddFormOption = addressType ? addressType : '';
                        this.editedShippingFormModelSubmit.editContactName=  editCustomerAddress?.contactName ? editCustomerAddress?.contactName : '' ;
                        this.editedShippingFormModelSubmit.editPhoneNumberContact=  editCustomerAddress?.contactPhone ? editCustomerAddress?.contactPhone : '';
                        this.editedShippingFormModelSubmit.editCityAddr=  editCustomerAddress?.editAddrCity ? editCustomerAddress?.editAddrCity : '';
                        this.editedShippingFormModelSubmit.editPostalCodeAddr =  editCustomerAddress?.editAddrZipCode  ? editCustomerAddress?.editAddrZipCode : '';
                        this.editedShippingFormModelSubmit.editAddr01 =  editCustomerAddress?.editAddr01 ? editCustomerAddress?.editAddr01 : '';
                        this.editedShippingFormModelSubmit.editAddr02 = editCustomerAddress?.editAddr02 ? editCustomerAddress?.editAddr02 : '';
                    })
                    .catch((error) => {
                        if(error){
                            this.$notify.error({
                                title: 'Error Edited Address',
                                message: error.response.data.error.message ?? 'Unsuccessfully for edited address',
                                showClose: false
                            });   
                        }
                    });
            },  
            submitUpdatedShippingBillingAddress(editedSubmitted){
                 this.$refs[editedSubmitted].validate((valid) => {
                    if (valid) {
                        const addressId = parseInt(this.addressId) ? parseInt(this.addressId)  : 0;
                        const updatedAddrShipping = {
                            addressType:  this.editedShippingFormModelSubmit.editTypeAddrAddFormOption ?  this.editedShippingFormModelSubmit.editTypeAddrAddFormOption : '',
                            contactName: this.editedShippingFormModelSubmit.editContactName ?? '',
                            phoneNumberContact: this.editedShippingFormModelSubmit.editPhoneNumberContact?? '',
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
                                shippingAddr01: this.editedShippingFormModelSubmit.editAddr01 ?? '',
                                shippingAddr02: this.editedShippingFormModelSubmit.editAddr02 ?? '',
                                shippingAddrCity: this.editedShippingFormModelSubmit.editCityAddr ?? '',
                                shippingAddrZipcode: this.editedShippingFormModelSubmit.editPostalCodeAddr ?? '' 
                            }
                        }
                        const updatedAddrBilling = {
                            addressType:  this.editedShippingFormModelSubmit.editTypeAddrAddFormOption ?  this.editedShippingFormModelSubmit.editTypeAddrAddFormOption : '',
                            contactName: this.editedShippingFormModelSubmit.editContactName ?? '',
                            phoneNumberContact: this.editedShippingFormModelSubmit.editPhoneNumberContact?? '',
                            residentAddr: {
                                reAddr01: '',
                                reAddr02: '',
                                reCity: '',
                                reZipcode: ''
                            },
                            buildingAddr: {
                                billAddr01: this.editedShippingFormModelSubmit.editAddr01 ?? '',
                                billAddr02: this.editedShippingFormModelSubmit.editAddr02 ?? '',
                                billAddrCity: this.editedShippingFormModelSubmit.editCityAddr ?? '',
                                billAddrZipcode: this.editedShippingFormModelSubmit.editPostalCodeAddr ?? ''
                            },
                            shippingAddr: {
                                shippingAddr01:'',
                                shippingAddr02: '',
                                shippingAddrCity: '',
                                shippingAddrZipcode: '' 
                            }
                        }
                        const updatedAddrResidence = {
                            addressType:  this.editedShippingFormModelSubmit.editTypeAddrAddFormOption ?  this.editedShippingFormModelSubmit.editTypeAddrAddFormOption : '',
                            contactName: this.editedShippingFormModelSubmit.editContactName ?? '',
                            phoneNumberContact: this.editedShippingFormModelSubmit.editPhoneNumberContact?? '',
                            residentAddr: {
                                reAddr01: this.editedShippingFormModelSubmit.editAddr01 ?? '',
                                reAddr02: this.editedShippingFormModelSubmit.editAddr02 ?? '',
                                reCity: this.editedShippingFormModelSubmit.editCityAddr ?? '',
                                reZipcode: this.editedShippingFormModelSubmit.editPostalCodeAddr ?? ''
                            },
                            buildingAddr: {
                                billAddr01: '',
                                billAddr02: '',
                                billAddrCity: '',
                                billAddrZipcode: ''
                            },
                            shippingAddr: {
                                shippingAddr01:'',
                                shippingAddr02: '',
                                shippingAddrCity: '',
                                shippingAddrZipcode: '' 
                            }
                        }
                        let updatedAddressCustomer;
                        const addressTypeCustomer = this.editedShippingFormModelSubmit.editTypeAddrAddFormOption ? this.editedShippingFormModelSubmit.editTypeAddrAddFormOption : '';
                        switch(addressTypeCustomer){
                            case "Shipping":
                                updatedAddressCustomer = updatedAddrShipping ? updatedAddrShipping : [];
                            break;
                            case "Billing":
                                updatedAddressCustomer = updatedAddrBilling ? updatedAddrBilling : [];
                            break;
                            case "Residence":
                                updatedAddressCustomer = updatedAddrResidence ? updatedAddrResidence : [];
                            break;
                            default:
                                updatedAddressCustomer;  
                        } 
                        // Updated 
                        this.shippingAddressServicesEdited.updatedShippingBillingAddress(addressId ? addressId : 0, updatedAddressCustomer)
                            .then((updateAddr) => {
                                this.loadingUpdatedAddr = true;
                                if(updateAddr.data.success === true){
                                    this.$notify.success({
                                        title: `Successfully Updated ${addressTypeCustomer ? addressTypeCustomer : ''} Address`,
                                        message: updateAddr.data?.message ? updateAddr.data?.message : '' ,
                                        showClose: false
                                    });
                                    this.editedAddressDialog = false;
                                    this.editedShippingFormModelSubmit = {};
                                    window.location.reload();
                                }
                            })
                            .catch((error) => {
                                if(error){
                                    this.$notify.error({
                                        title: 'Error Updated Address Address',
                                        message: error.response.data.error.message ?? 'Unsuccessfully for updated address',
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
                            setTimeout(() => {
                                    this.loadingUpdatedAddr = false
                            }, 1500);
                    }else{
                        this.$notify.error({
                            title: 'Error Edit Shipping Address',
                            message: 'Please enter address to shipping or billing',
                            showClose: false
                        });   
                        return false;
                    }
                 });
            },
            deletedAddressDialogCustomer(){
                // this.editedAddressDialog=true;
                this.$confirm('Are you sure you want to Delete Address?', 'Deleted Address', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = 'Loading...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                        instance.confirmButtonLoading = false;
                                    }, 300);
                                }, 1000);
                            } else {
                                 done();
                            }
                        }
                    }).then(() => {
                        const addressId = parseInt(this.addressId) ? parseInt(this.addressId)  : 0;
                        this.shippingAddressServicesEdited.deletedShippingBillingAddress(addressId ? addressId : 0)
                            .then((delAddrId) => {
                                if(delAddrId){
                                    this.$notify.success({
                                        title: `Successfully Deleted Address`,
                                        message: delAddrId.data?.message ? delAddrId.data?.message : '' ,
                                        showClose: false
                                    });
                                    window.location.reload();
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                                if(error){
                                    this.$notify.error({
                                        title: 'Error Deleted Address',
                                        message: error.response.data.error.message ?? 'Unsuccessfully for deleted address',
                                        showClose: false
                                    });   
                                }
                            });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Delete canceled'
                        });          
                    });
            }
        }
    }
</script>