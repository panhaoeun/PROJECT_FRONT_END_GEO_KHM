<template>
    <!-- Shipping Address -->
    <div class="align-left shipping card">
        <div class="font-bold text-xl pb-2 text-black">
            Choose shipping address
        </div>
        <!-- Choose Shipping Address--->
        <div v-if="allAddresses.length > 0" class="addresses">
            <ul class="shipping-list list-group">
                <li
                    v-for="(add, aIndex) in allAddresses"
                    v-bind:key="aIndex"
                    :class="{'selected' : addressEqual(add)}"
                    @click="chooseAddress(add)"
                    class="list-group-item"
                    style="padding: .75rem 1.25rem;"
                >
                    <template v-if="add.addressType === 'Shipping' && add.addressType !== 'Billing'">
                        <div class="row" >
                            <div class="col">
                                <el-radio 
                                    :label="add.id" 
                                    size="default"  
                                    v-model="activeShippingAddrSelected"
                                    border
                                >
                                    Shipping Address
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
                                                {{ add?.shipAdd01 }},
                                                {{add?.shipAdd02}},
                                                {{add?.shipCity }},
                                            {{ add?.shipZipCode }}.
                                        </span>
                                        <div class="float-right">
                                            <div class="align-right">
                                                <a @click="editClicked(add)" class="pl-3">Edit</a> &nbsp;&nbsp;&nbsp;
                                                <a @click="deleteClicked(add)" class="pl-3">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </li>
            </ul>
        </div>
        <div v-else-if="allAddresses.length <= 0 && !isShowAddAddress">
            <div class="empty-info">
                <p>Nothing to display</p>
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
                <div v-if="isShowAddAddress" class="shipping-form">
                    <el-form 
                        :model="modelFormAddNewShip" 
                        :rules="rulesFormAddNewShip" 
                        ref="ruleFormAddShip" 
                        label-width="120px" 
                        label-position="top"
                        class="demo-ruleForm border border-1 px-4 py-4"
                    >
                        <!-- Contact -->
                        <el-form-item required>
                            <el-col :span="11">
                                <el-form-item prop="contact_name" label="Contact">
                                      <el-input v-model="modelFormAddNewShip.contact_name" class=""></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col class="line" :span="2"></el-col>
                            <el-col :span="11">
                                <el-form-item prop="phone_number_contact" label="Phone Number">
                                    <el-input v-model="modelFormAddNewShip.phone_number_contact" :formatter="(value) => value.replace(/\D/g, '')" ></el-input>
                                </el-form-item> 
                            </el-col>
                        </el-form-item>
                        <el-form-item label="Address 01:" prop="shipAdd01">
                            <el-input type="text" v-model="modelFormAddNewShip.shipAdd01" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Address 02:" prop="shipAdd02">
                            <el-input type="text" v-model="modelFormAddNewShip.shipAdd02" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item required>
                            <el-col :span="11">
                                <el-form-item prop="shipCity" label="City" >
                                      <el-input v-model="modelFormAddNewShip.shipCity"></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col class="line" :span="2"></el-col>
                            <el-col :span="11">
                                <el-form-item prop="shipZipCode" label="Zip Code">
                                    <el-input v-model="modelFormAddNewShip.shipZipCode"></el-input>
                                </el-form-item> 
                            </el-col>
                        </el-form-item>
                        <!-- Submitted Shipping -->
                        <el-form-item>
                            <el-button type="primary" class="primary-button" v-if="!isUpdate" @click="saveAddressShipping('ruleFormAddShip')" >Save</el-button>
                            <el-button type="primary" class="primary-button" v-else @click="saveAddressShipping('ruleFormAddShip')">Edit</el-button>
                            <el-button @click="cancelForm()" class="cancel-btn hover:bg-red-500">Cancel</el-button>
                        </el-form-item>
                    </el-form>
                </div>
        </transition>
    </div>
    <!-- Show list of existing addresses here with choice to choose -->
    <a @click="showAddAddress()" v-if="!isSessionActive()">
      <i class="pi pi-plus"></i>
      &nbsp;&nbsp; Add a new address
    </a>

</template>
<script>
import ShippingDTO from './ShippingAddress.json';
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
            activeElCollapseAddShipping: null,
            activeShippingAddrSelected: null,
            isUpdate: false,
            shippingDeet: null,
            isShowAddAddress: false,
            modelFormAddNewShip: {
                contact_name: '',
                phone_number_contact: '',
                shipAdd01: '',
                shipAdd02: '',
                shipCity: '',
                shipZipCode: '',
                addressType: 'Shipping'
            },
            rulesFormAddNewShip: {
                contact_name: [
                    { required: true, message: 'Please enter name for contact', trigger: 'blur' }
                ],
                phone_number_contact: [
                    { required: true, message: 'Please enter phone number for contact', trigger: 'blur' }
                ],
                shipAdd01: [
                    { required: true, message: 'Please enter your address line 01', trigger: 'blur' }
                ],
                shipAdd02: [
                    { required: true, message: 'Please enter your address line 02', trigger: 'blur' }
                ],
                shipCity: [
                    { required: true, message: 'Please enter your city before continuing', trigger: 'blur' }
                ],
                shipZipCode:[
                    { required: true, message: 'Please enter your zip code', trigger: 'blur' }
                ],
            }
        };
    },
    async created() {
        this.modelFormAddNewShip = ShippingDTO;
        await this.$store.dispatch('shippingStore/addressAction', {
            address: null,
            action: 'get',
        });
        if (this.allAddresses.length > 0 && !this.selectedAddress) {
            this.$emit('selected', this.allAddresses[0]);
        }
        this.getAddressShippingAsync();
    },
    methods: {
        showAddAddress() {
            this.isShowAddAddress = true;
        },
        hideAddAddress() {
            this.isShowAddAddress = false;
        },
        isSessionActive(){
            return isLoggedIn();
        },
        resetFields() {
            // eslint-disable-next-line
            for (const key in this.modelFormAddNewShip) {
                this.modelFormAddNewShip[key] = null;
            }
        },
        cancelForm() {
            this.resetFields();
            this.isShowAddAddress = false;
            this.isUpdate = false;
        },
        chooseAddress(add) {
            this.activeShippingAddrSelected = add?.id;
            this.$emit('selected', add);
        },
        addressEqual(givenAdd) {
            return _.isEqual(givenAdd, this.selectedAddress);
        },
        editClicked(address) {
            this.isUpdate = true;
            this.modelFormAddNewShip = _.cloneDeep(address);
            this.isShowAddAddress = true;
        },

        deleteClicked(address) {
            const cloned = _.cloneDeep(address);
            this.$store.dispatch('shippingStore/addressAction', {
                address: cloned,
                action: 'delete',
            });
        },
        async getAddressShippingAsync(){
            try {
                await this.$store.dispatch('shippingStore/getAddressShipping');
            } catch (error) {
               return Promise.reject(error);
            }
        },
        async saveAddressShipping(ship) {
            this.$refs[ship].validate((valid) => {
                if (valid) {
                        for (const key in this.modelFormAddNewShip) {
                            if (this.modelFormAddNewShip[key] == null) {
                                this.modelFormAddNewShip[key] = '';
                            }
                        }
                        const cloned = _.cloneDeep(this.modelFormAddNewShip);
                        const res = this.$store.dispatch('shippingStore/addressAction', {
                            address: cloned,
                            action: this.isUpdate ? 'put' : 'post',
                        });
                        if (res) {
                            this.isUpdate = false;
                            // this.allAddresses.push(cloned);
                            // this.$emit('selected', cloned);
                            this.resetFields();
                            this.isShowAddAddress = false;
                        }
                    } else {
                        return false;
                    }
            });
        }
    },
    computed: {
        ...mapGetters({
            allAddresses: 'shippingStore/allAddresses',
            selectedAddress: 'shippingStore/getSelectedAddress'
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