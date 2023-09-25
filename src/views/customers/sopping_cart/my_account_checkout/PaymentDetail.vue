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
                <el-input v-model="frmPaymentMethod.orderAmount" />
            </el-form-item>
            <el-form-item label="Remaining balance">
                <el-input v-model="frmPaymentMethod.remainingBalance" />
                <el-text class="mx-1" size="small">You do not have sufficient balance for pay this order!!</el-text>
            </el-form-item>
        </el-form>
        <!-- Footer Wallet -->
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisibleOpenWallet = false">Cancel</el-button>
                <el-button @click="confirmToPaymentByWallet()">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<!-- Script -->
<script>
import { ElMessageBox, ElNotification } from "element-plus";
import _ from "lodash";
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
                orderAmount: '',
                remainingBalance: ''
            }
        };
    },
    computed: {
        getCurrentBalance(){
            return this.currentBalanceKHR + ' ' + '(' + this.currentBalanceUSD  + ')';
        }
    },
    async created() {
        if (!this.paymentType) {
            this.$emit('selected', this.paymentType);
        }
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
                this.dialogOpenMyWallet(add);
            }else{
                this.dialogVisibleOpenWallet = false;
            }
        },
        dialogOpenMyWallet(item) {
            this.dialogVisibleOpenWallet = true;
            const typePayment = item?.aliasName ? item?.aliasName : '';
            console.log(typePayment)
        },
        confirmToPaymentByWallet: function(){
            ElMessageBox.confirm('Are you confirm to payment by wallet?', {
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
            }}).then((wallet) => {
                console.log(wallet)
                    ElNotification.success({
                        title: 'Successfully to payment by wallet for order',
                        message: 'You have successfully placed order.'
                    })
            }).catch(() => {
                ElNotification.error({
                    title: 'Unsuccessfully to payment to wallet',
                    message: 'You are cancel to payment to wallet',
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