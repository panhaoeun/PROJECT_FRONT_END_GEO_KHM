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
                <el-text class="mx-1" size="small">{{ remainingAmountOrder?.balanceAccountMS }}</el-text>
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
export default {
    components: {},
    props: {
        currentBalanceUSD: {
            required: true,
            type: Number,
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
            }
        };
    },
    computed: {
        getCurrentBalance(){
            return this.currentBalanceKHR + ' ' + '(' + this.currentBalanceUSD + '$' + ')';
        },
        getTotalAmount(){
            return '៛ ' + this.dynamicAmountOrder?.amountTotalKHR +' '+ '(' + ' $ ' + this.dynamicAmountOrder?.amountTotalUSD+ ')';
        },
        getRemainingAmountBalanceWallet(){
            return '៛ ' + this.remainingAmountOrder.remainingMoneyKHR  +  ' ' + '(' + this.remainingAmountOrder.remainingMoneyUSD + ' $' + ')'  
        },  
        ...mapGetters({
            dynamicAmountOrder:'myWallet/getTotalAmountOrderShip',
            remainingAmountOrder: 'myWallet/getRemainingAmountOrder',
            checkBalanceWallet: 'myWallet/checkRemainingAccSubmit'
        }),
    },
    async created() {
        if (!this.paymentType) {
            console.log(this.paymentType)
            this.$emit('selected', this.paymentType);
        }
        // Get Current Balance
        await this.$store.dispatch('myWallet/myWalletCurrentBalance');
    },
    methods: {
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
                type: 'warning',
                cancelButtonClass: "surface-hover font-bold hover:surface-300 w-7rem",
                confirmButtonClass: "bg-red-500 border-none font-bold hover:surface-300 w-7rem",
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
            }}).then(() => {
                    ElNotification.success({
                        title: 'Successfully to payment by e-wallet for order',
                        message: 'You have successfully placed order.'
                    })
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