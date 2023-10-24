<template>
    <!-- Billing Address -->
    <div class="align-left shipping card">
        <div class="font-bold text-xl pb-2 text-black">
            Choose billing address
        </div>
        <!-- <div class="font-bold text-xl pb-2 text-black">
            <el-checkbox v-model="showHideElCollapseAddBilling" label="Same as shipping address" size="large"/>
        </div> -->
        <!-- Check Show/Hide Same address or New Billing Address -->
        <!-- <template v-if="showHideElCollapseAddBilling === false"> -->
            <!-- Choose Billing Address--->
            <div v-if="allBillingAddresses.length > 0" class="addresses">
                <ul class="shipping-list list-group">
                    <li
                        v-for="(add, aIndex) in allBillingAddresses"
                        v-bind:key="aIndex"
                        :class="{'selectedBillAddr' : addressEqualBillAddr(add)}"
                        @click="chooseAddressBill(add)"
                        class="list-group-item"
                        style="padding: .75rem 1.25rem;"
                    >
                        <!-- Billing Address -->
                        <template v-if="add.addressType === 'Billing'">
                            <div class="row">
                                <div class="col">
                                    <el-radio 
                                        :label="add.id" 
                                        size="default"  
                                        v-model="activeShippingAddrSelected"
                                        border
                                    >
                                        Billing Address
                                    </el-radio>
                                    <small>
                                        <i class="pi pi-phone"></i> 
                                        <span class="pl-2">{{ add?.phone_number_contact ?? '' }}</span>
                                    </small>
                                    <hr>
                                    <div class="d-flex">
                                        <div class="w-0 flex-grow-1 justify-content-between my-2">
                                            <span>
                                                <label class="font-bold">Contact name:</label>
                                                {{ add?.contact_name }},
                                            </span>
                                            <br/>
                                            <span>
                                                <label class="font-bold"> Address : </label>
                                                    {{ add?.billAdd01 }},
                                                    {{add?.billAdd02}},
                                                    {{add?.billCity }},
                                                {{ add?.billZipCode }}.
                                            </span>
                                            <div class="float-right">
                                                <div class="align-right">
                                                    <a @click="editBillAddrClicked(add)" class="pl-3">Edit</a> &nbsp;&nbsp;&nbsp;
                                                    <a @click="deletedBillAddrIdClicked(add)" class="pl-3">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <!-- Nothing billing address to display -->
                        <template v-else>
                            <div class="empty-info">
                                <p>Nothing to display</p>
                            </div>
                        </template>
                    </li>
                </ul>
            </div>
            <div v-else-if="allBillingAddresses.length <= 0 && !isShowAddBillAddress">
                <div class="empty-info">
                    <p>Nothing to display billing address</p>
                </div>
            </div>
            <!-- Show list of existing addresses here with choice to choose -->
            <a @click="showAddAddress()" v-if="isSessionActive()">
                <i class="pi pi-plus"></i>
                &nbsp;&nbsp; 
                Add a new address
            </a>
            <!-- Input form to add new address for the user -->
            <transition
                name="shipping-form-anim"
                enter-active-class="animated slideInLeft faster"
                leave-active-class="animated slideOutLeft faster"
            >
                    <div v-if="isShowAddBillAddress" class="shipping-form">
                        <el-form 
                            :model="modelFormAddNewBilling" 
                            :rules="rulesFormAddNewBilling" 
                            ref="ruleFormAddShip" 
                            label-width="120px" 
                            label-position="top"
                            class="demo-ruleForm border border-1 px-4 py-4"
                        >
                            <!-- Contact -->
                            <el-form-item required>
                                <el-col :span="11">
                                    <el-form-item prop="contact_name" label="Contact">
                                        <el-input v-model="modelFormAddNewBilling.contact_name" class=""></el-input>
                                    </el-form-item> 
                                </el-col>
                                <el-col class="line" :span="2"></el-col>
                                <el-col :span="11">
                                    <el-form-item prop="phone_number_contact" label="Phone Number">
                                        <el-input v-model="modelFormAddNewBilling.phone_number_contact" :formatter="(value) => value.replace(/\D/g, '')" ></el-input>
                                    </el-form-item> 
                                </el-col>
                            </el-form-item>
                            <el-form-item label="Address 01:" prop="billAdd01">
                                <el-input type="text" v-model="modelFormAddNewBilling.billAdd01" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="Address 02:" prop="billAdd02">
                                <el-input type="text" v-model="modelFormAddNewBilling.billAdd02" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item required>
                                <el-col :span="11">
                                    <el-form-item prop="billCity" label="City" >
                                        <el-input v-model="modelFormAddNewBilling.billCity"></el-input>
                                    </el-form-item> 
                                </el-col>
                                <el-col class="line" :span="2"></el-col>
                                <el-col :span="11">
                                    <el-form-item prop="billZipCode" label="Zip Code">
                                        <el-input v-model="modelFormAddNewBilling.billZipCode"></el-input>
                                    </el-form-item> 
                                </el-col>
                            </el-form-item>
                            <!-- Submitted Shipping -->
                            <el-form-item>
                                <el-button type="primary" class="primary-button" v-if="!isUpdate" @click="saveAddressBilling('ruleFormAddShip')" >Save</el-button>
                                <el-button type="primary" class="primary-button" v-else @click="saveAddressBilling('ruleFormAddShip')">Edit</el-button>
                                <el-button @click="cancelForm()" class="cancel-btn hover:bg-red-500">Cancel</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
            </transition>
        <!-- </template> -->
    </div>
</template>
<script>
import ShippingBillDTO from './BillingAddress.json';
import {mapGetters} from "vuex";
import { isLoggedIn } from "@/utils/auth/auth";
import _ from "lodash";
export default {
    components: {},
    props: {
        allAddressesShipping: {
            required: true,
            type: Array,
        },
        selected: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
            payment: {},
            addShippingAddress: false,
            showHideElCollapseAddBilling: false,
            activeShippingAddrSelected: null,
            isUpdate: false,
            shippingDeet: null,
            isShowAddBillAddress: false,
            modelFormAddNewBilling: {
                contact_name: '',
                phone_number_contact: '',
                billAdd01: '',
                billAdd02: '',
                billCity: '',
                billZipCode: '',
                addressType: 'Billing'
            },
            rulesFormAddNewBilling: {
                contact_name: [
                    { required: true, message: 'Please enter name for contact', trigger: 'blur' }
                ],
                phone_number_contact: [
                    { required: true, message: 'Please enter phone number for contact', trigger: 'blur' }
                ],
                billAdd01: [
                    { required: true, message: 'Please enter your address line 01', trigger: 'blur' }
                ],
                billAdd02: [
                    { required: true, message: 'Please enter your address line 02', trigger: 'blur' }
                ],
                billCity: [
                    { required: true, message: 'Please enter your city before continuing', trigger: 'blur' }
                ],
                billZipCode:[
                    { required: true, message: 'Please enter your zip code', trigger: 'blur' }
                ],
            }
        };
    },
    async created() {
        this.modelFormAddNewBilling = ShippingBillDTO;
        await this.$store.dispatch('billingStore/addressBillingAction', {
            address: null,
            action: 'get',
        });
        if (this.allBillingAddresses.length > 0 && !this.selectedAddressBilling) {
            this.$emit('selectedBillAddr', this.allBillingAddresses[0]);
        }
        this.getAddressBillingAsync();
    },
    methods: {
        showAddAddress() {
            this.isShowAddBillAddress = true;
        },
        hideAddAddress() {
            this.isShowAddBillAddress = false;
        },
        isSessionActive(){
            return isLoggedIn();
        },
        resetFields() {
            // eslint-disable-next-line
            for (const key in this.modelFormAddNewBilling) {
                this.modelFormAddNewBilling[key] = null;
            }
        },
        cancelForm() {
            this.resetFields();
            this.isShowAddBillAddress = false;
            this.isUpdate = false;
        },
        chooseAddressBill(add) {
            this.activeShippingAddrSelected = add?.id;
            this.$emit('selected', add);
        },
        addressEqualBillAddr(givenAdd) {
            return _.isEqual(givenAdd, this.selectedAddressBilling);
        },
        editBillAddrClicked(address) {
            this.isUpdate = true;
            this.modelFormAddNewBilling = _.cloneDeep(address);
            this.isShowAddBillAddress = true;
        },

        deletedBillAddrIdClicked(address) {
            const cloned = _.cloneDeep(address);
            this.$store.dispatch('billingStore/addressBillingAction', {
                address: cloned,
                action: 'delete',
            });
        },
        async getAddressBillingAsync(){
            try {
                await this.$store.dispatch('billingStore/getAddressBilling');
            } catch (error) {
               return Promise.reject(error);
            }
        },
        async saveAddressBilling(ship) {
            this.$refs[ship].validate((valid) => {
                if (valid) {
                        for (const key in this.modelFormAddNewBilling) {
                            if (this.modelFormAddNewBilling[key] == null) {
                                this.modelFormAddNewBilling[key] = '';
                            }
                        }
                        const cloned = _.cloneDeep(this.modelFormAddNewBilling);
                        const res = this.$store.dispatch('billingStore/addressBillingAction', {
                            address: cloned,
                            action: this.isUpdate ? 'put' : 'post',
                        });
                        if (res) {
                            this.isUpdate = false;
                            this.resetFields();
                            this.isShowAddBillAddress = false;
                        }
                    } else {
                        return false;
                    }
            });
        }
    },
    computed: {
        ...mapGetters({
            allBillingAddresses: 'billingStore/allBillingAddresses',
            selectedAddressBilling: 'billingStore/getSelectedBillingAddress'
        }),     
    },
};
</script>
<!-- Style SCSS Shipping Address -->
<style lang="scss" scoped>
@import '../../../../assets/scss/global.scss';
.shipping-form {
  padding: 10px 0px;
  // background: white;

  .cancel-btn {
    margin-right: 10px;
    margin-top: 2em;
  }

  .action-buttons {
    padding: 10px 0px;
  }
}

.shipping {
  margin-top: 30px;
}

.shipping-list {
  list-style-type: none;
  padding: 0px;
  margin-bottom: 1px;
  li {
    padding: 2px;
    padding-left: 1.2em;
    margin-bottom: 1px;

    &.selected {
      // background: $gradient-color;
      background: blue($color: #000000);
      color: rgb(176, 14, 14);
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>