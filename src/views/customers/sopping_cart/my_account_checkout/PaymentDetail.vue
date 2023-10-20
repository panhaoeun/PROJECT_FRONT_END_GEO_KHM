<template>
    <div id="payment">
        <div class="payment-method">
            <p>Choose payment</p>  
             <ul class="shipping-list list-group">
                <li  
                    id="listPay"
                    v-for="(method, index) in paymentType"
                    v-bind:key="index"
                    :class="{ selected: selectedPaymentMethod(method) }"
                    @click="choosePaymentMethod(method)"
                    class="list-group-item cursor-pointer"
                    :content="paymentType?.aliasName" 
                    @set-active="activeIndex = $event"
                >
                   <el-card shadow="hover"> 
                       <el-radio 
                            style="text-color: #fff"
                            tet-color="#ffffff"
                            fill="#409EFF"
                            :label="parseInt(method?.id) ?? 0" 
                            v-model="selectedActivePaymentMethod"  
                            size="large"
                        >
                            <img :src="method.thumbnail" width="30"/>
                            <span class="pl-2">{{ method?.paymentBy ? method?.paymentBy : '' }}</span>
                        </el-radio>
                    </el-card>
                </li>
             </ul>
        </div>
        <hr />
    </div>
    <!-- Dialog show information transaction amount to order payment by wallet -->
    <el-dialog
        v-model="dialogVisibleOpenWallet"
        title="Wallet payment"
        width="30%"
        :before-close="handleClose"
    >
        <!-- Form -->
        <el-form
            label-position="top"
            label-width="100px"
            :model="frmPaymentMethod"
            style="max-width: 460px"
        >
            <el-form-item label="Your current balance">
                <el-input v-model="getCurrentBalance" disabled />
            </el-form-item> 
            <el-form-item label="Order amount">
                <template v-if="getTotalAmount !== undefined">
                    <el-input v-model="getTotalAmount" disabled/>
                </template>
                <template v-else>
                    <el-input v-model="frmPaymentMethod.orderAmount" disabled/>
                </template>
            </el-form-item>
            <el-form-item label="Remaining balance">
                <el-input v-model="getRemainingAmountBalanceWallet" disabled/>
                <el-text class="mx-1 text-red-500" size="small">
                    <span>{{ remainingAmountOrder?.balanceAccountMS }}</span>
                </el-text>
            </el-form-item>
        </el-form>
        <!-- Footer Wallet -->
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisibleOpenWallet = false" class="surface-hover font-bold hover:surface-300 w-7rem">Cancel</el-button>
                <template v-if="checkBalanceWallet === true">
                    <el-button @click="confirmToPaymentByWallet()" class="bg-red-500 border-none font-bold hover:surface-300 w-7rem text-white">Confirm</el-button>
                </template>
            </span>
        </template>
    </el-dialog>
</template>
<!-- Script -->
<script>
import { ElMessageBox, ElNotification } from "element-plus";
import _ from "lodash";
import {mapGetters} from "vuex";
import { isLoggedIn } from "@/utils/auth/auth";
export default {
    components: {},
    props: {
        currentBalanceUSD: {
            required: true,
            type: Number,
        },
        orderPayNoted: {
            required: false,
            type: String,
        },
        currentBalanceKHR: {
            required: true,
            type: Number,
        },
        orderTotalAmountBalance: {
            required: true,
            type: Number,
        },
    },
    data() {
        return {
            indexActive: 0,
            activeIndex: 1,
            selectedActivePaymentMethod : 1,
            dialogVisibleOpenWallet: false,
            selectedItems: [],
            paymentType: [
                {
                    id: 1,
                    aliasName: 'CashOnDelivery',
                    paymentBy: 'Cash On Delivery',
                    class: 'selected',
                    thumbnail: require('@/assets/img/payments/delivery_icons.png')
                },
                {
                    id: 2,
                    aliasName: 'PayByWallet',
                    paymentBy: 'Payment By Wallet',
                    class: '',
                    thumbnail: require('@/assets/img/payments/wallet_icons.png')
                }
            ],
            frmPaymentMethod: {
                currentBalance: this.currentBalanceKHR ? this.currentBalanceKHR : 0,
                orderAmount: 0,
                remainingBalance: 0
            },
            shippingAddress: [],
            billingAddressAll: [],
            selectedAddressShip: {},
            selectedAddressBill: {},
            paymentMethod: '',
            customerOrderNoted: '',
            shopId: null,
            vendorId: null,
            emailPhoneId: null
        };
    },
    computed: {
        getCurrentBalance(){
            return this.currentBalanceKHR + ' ' + '(' + this.currentBalanceUSD+ ')';
        },
        currentUser() {
            return this.currentUser ? this.currentUser : null;
        },
        shippingMethods: {
            get() {
                return this.$store.getters['shippingStore/shippingMethod'];
            },
            set(val) {
                this.$store.commit('shippingStore/setShippingMethod', val);
            },
        },
        getTotalAmount(){
            return this.currencyFormattedKHRiel(this.dynamicAmountOrder?.amountTotalKHR) +' '+ '('+ this.currencyFormattedUSD(this.dynamicAmountOrder?.amountTotalUSD) +')';
        },
        getRemainingAmountBalanceWallet(){
            return '៛' + this.remainingAmountOrder.remainingMoneyKHR  +  ' ' + '(' + '$'+ this.remainingAmountOrder.remainingMoneyUSD + ')'  
        },  
        ...mapGetters({
            dynamicAmountOrder:'myWallet/getTotalAmountOrderShip',
            remainingAmountOrder: 'myWallet/getRemainingAmountOrder',
            checkBalanceWallet: 'myWallet/checkRemainingAccSubmit',
            getSelectedAddressShip: 'shippingStore/getSelectedAddress',
            selectedAddressBilling: 'billingStore/getSelectedBillingAddress',
            carts: 'cart/getCart',
            checkoutInitiated: 'cart/checkoutInitiated',
            orderDetaiL: 'cart/getCartAuthItem',
            currentUser: 'auth/currentUserAuth',
            payMethod: 'cart/getPayMethod',
            currentBalanceKHR: 'myWallet/getCurrentBalanceKHR',
            currentBalanceUSD: 'myWallet/getCurrentBalanceUSD',
        }),
        paymentMethods(){
            return this.getPaymentMethod();
        }
    },
    async created() {
        if (!this.paymentType) {
            console.log(this.paymentType)
            this.$emit('selected', this.paymentType);
        }
    },
    methods: {
        isSessionActive(){
            return isLoggedIn();
        },
        currencyFormattedKHRiel: function (value) {
            return new Intl.NumberFormat("km-KH", {
                style: "currency",
                currency: "KHR",
                currencyDisplay: "symbol",
            })
                .format(value ? value : 0)
                .replace(/\b(\w*KHR\w*)\b/, "៛");
        },
        currencyFormattedUSD: function (value) {
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
        getCurrentUser(){
            if(this.currentUser !== null && this.currentUser.length > 0){
                return {
                    userPhoneNumber: this.currentUser[0].user_phonenumber ?? '',
                    userEmail: this.currentUser[0].user_email ?? ''
                }
            }
        }, 
        getPaymentMethod(){
            if(this.payMethod !== null && this.payMethod !== undefined){    
                return this.payMethod.aliasName ? this.payMethod.aliasName : 'PayByWallet';
            }
        },
        selectedPaymentMethod(add){
            return _.isEqual(add, this.paymentType);
        },
        choosePaymentMethod(add){
            this.$emit('selected', add);
            this.selectedActivePaymentMethod = add?.id; 
            this.$store.commit('cart/selectPayMethodOrder', add);
            if(add.aliasName === "PayByWallet"){
                const loading = this.$loading({
                    lock: true,
                    text: 'Please Waiting...',
                    background: 'rgba(0, 0, 0, 0.1)'
                });
                setTimeout(() => {
                    // Show Dialog
                    this.dialogOpenMyWallet(add);
                    loading.close();
                }, 2000);
            }else{
                this.dialogVisibleOpenWallet = false;
            }
        },
        async dialogOpenMyWallet(item) {
            this.dialogVisibleOpenWallet = true;
            // Get Current Balance
            await this.$store.dispatch('myWallet/myWalletCurrentBalance');
            const typePayment = item?.aliasName ? item?.aliasName : '';
            if(typePayment === 'PayByWallet'){
                await this.$store.dispatch('myWallet/remainingBalanceToOrder', {
                    currentBalanceKHR: this.currentBalanceKHR ? this.currentBalanceKHR : 0,
                    currentBalanceUSD: this.currentBalanceUSD ? this.currentBalanceUSD : 0,
                    balanceUSD: this.dynamicAmountOrder?.amountTotalUSD ? this.dynamicAmountOrder?.amountTotalUSD : 0, 
                    balanceKHR: this.dynamicAmountOrder?.amountTotalKHR ?  this.dynamicAmountOrder?.amountTotalKHR : 0
                });
            }
        },
        confirmToPaymentByWallet: function(){
            ElMessageBox.confirm('Are you confirm to payment by wallet?', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'info',
                cancelButtonClass: "surface-hover font-bold hover:bg-pink-500 w-7rem",
                confirmButtonClass: "bg-red-500 border-none font-bold hover:bg-teal-700 w-10rem",
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = 'Waiting...';
                        // Clear Loading
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                        }, 1500);
                    } else {
                        instance.confirmButtonLoading = false
                        done();
                    }
            }}).then(async() => {
                if(this.isSessionActive() !== null){
                    if (!this.getSelectedAddressShip || !this.selectedAddressBilling) {
                        this.$notify.warning({
                            title: 'Please select shipping method first',
                            message: 'The shipping method and address should be selected first.',
                            showClose: false
                        });
                        return;
                    } 
                }
                // Subtract Amount Order
                const confirmOrderPaymentWallet = {
                    remainingAmountBalanceKHR: this.remainingAmountOrder?.remainingMoneyKHR ?? 0,
                    remainingAmountBalanceUSD: this.remainingAmountOrder?.remainingMoneyUSD ?? 0,
                    orderAmountKHR: this.dynamicAmountOrder?.amountTotalKHR ?? 0,
                    orderAmountUSD: this.dynamicAmountOrder?.amountTotalUSD ?? 0
                };
                // Payments with Wallets
                await this.$store.dispatch('myWallet/confirmWithdrawMoneyOrderPayment', { confirmOrderPaymentWallet });
                // Handle Checkout Orders
                await this.$store.dispatch('cart/createCheckout', {
                    shopId: this.shopId ? this.shopId : 0,
                    vendorId: this.vendorId ? this.vendorId : 0,
                    emailPhoneId: this.getCurrentUser().userEmail ? this.getCurrentUser().userEmail : '',
                    phoneNumberId: this.getCurrentUser().userPhoneNumber ? this.getCurrentUser().userPhoneNumber : 0 ,
                    customerOrderNoted: this.orderPayNoted ? this.orderPayNoted : 0,
                    orderDetaiL: this.orderDetaiL ? this.orderDetaiL : 0,
                    getSelectedAddressShip: this.getSelectedAddressShip ? this.getSelectedAddressShip : '',
                    selectedAddressBilling: this.selectedAddressBilling ? this.selectedAddressBilling : '',
                    shippingMethod: this.shippingMethod ? this.shippingMethod : '',
                    paymentMethods: this.paymentMethods ? this.paymentMethods: 'PayByWallet'
                });
                this.dialogVisibleOpenWallet = false;
            }).catch(() => {
                ElNotification.warning({
                    title: 'Unsuccessfully to payment by e-wallet',
                    message: 'You are cancel to payment by e-wallet',
                });
            })
        }
    }
};
</script>
<!-- Style -->
<style>
    .selected{
        background: red;
    }
</style>