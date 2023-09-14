<template>
    <!-- Auth Login -->
   <div class="card" v-if="isLoggedIn()">
        <div class="px-2 py-2"> 
            <!-- My Wallet total balance -->
            <MyWalletBalanceTotal :balanceKHR='totalBalanceKHR ? totalBalanceKHR : 0' :balanceUSD="totalBalanceByUSDConvert ? totalBalanceByUSDConvert : 0"/>
            <!--Button Wallets-->
            <div>
                <div class="gap-2 flex justify-between px-2 py-2">
                    <!--==== Recharge Deposit to wallet ===-->
                    <Button label="Deposit" severity="danger" style="width:8rem;" @click="dialogTableVisibleOpeDeposit = true" size="small"/>
                    <!-- Dialog of Recharge Deposits -->
                    <PopupDepositToWallet :dialogPopupDeposited="dialogTableVisibleOpeDeposit"/>                
                    <!--==== Recharge Withdraw to wallet ===-->
                    <Button label="Withdraw" severity="success" style="width:8rem;" @click="dialogTableVisibleOpeWithdraw = true" size="small"/>
                    <!-- Dialog of Recharge Withdraw -->
                    <el-dialog v-model="dialogTableVisibleOpeWithdraw" width="50%" centerwidth="50%" title="Withdraw to Wallet">
                        <!-- Contents of Recharge Withdraw -->
                        <PopupWithDrawToWallet/>
                    </el-dialog>
                </div>
            </div>
            <!--Button Wallets-->
            <el-tabs v-model="activeMenuBalanced" class="px-2 py-2 gap-3">
                <el-tab-pane style="color: #ff4040;" label="Deposit Record" name="deposit_deposit_balance">
                    <!-- Deposit money to be deposit my wallets -->
                    <DepositBalanceToWallets/>
                </el-tab-pane>
                <el-tab-pane label="Withdraw Record" name="deposit_withdraw_balance">
                    <!-- Withdraw money to be withdraw my wallets -->
                    <WithDrawBalanceToWallets/>
                </el-tab-pane>
            </el-tabs>
        </div>
   </div>
   <!-- Module -->
   <div v-else> 
        <p>Please login use this module</p>
   </div>
</template>
<script>
import MyWalletBalanceTotal from "./MyWalletsTotalBalance.vue";
import DepositBalanceToWallets from "./deposit/DepositToWalletList";
import PopupDepositToWallet from "./deposit/PopupDepositToWallet";
import WithDrawBalanceToWallets from "./withdraw/WithdrawToWalletsList.vue";
import PopupWithDrawToWallet from "./withdraw/PopupWithDrawToWallet.vue";
import CustomerDepositedToWalletService from '../../.././../services/my_wallets/deposited/CustomersDepositedServices';
import {isLoggedIn} from '@/utils/auth/auth';
export default {
    components: {
        MyWalletBalanceTotal,
        DepositBalanceToWallets,
        PopupDepositToWallet,
        WithDrawBalanceToWallets,
        PopupWithDrawToWallet
    },
    props: {},
    data() {
        return {
            dialogTableVisibleOpeDeposit: false,
            dialogTableVisibleOpeWithdraw: false,
            activeMenuBalanced: 'deposit_deposit_balance',
            totalBalanceKHR: 0,
            totalBalanceByUSDConvert: 0
        };
    },
    created() {
        this.customerDepositedWallet = new CustomerDepositedToWalletService();
    },
    methods: {
        // Check login
        isLoggedIn() {
            return isLoggedIn();
        },
        // Call the method
        getCurrentAmountDepositedByCustomerID(){
            this.customerDepositedWallet.getCustomerDepositedBalanceInCurrent()
            .then((amountDeposited) => {
                if (!amountDeposited) {
                    this.totalBalanceKHR = 0;
                    this.totalBalanceByUSDConvert = 0;
                }
                this.totalBalanceKHR = amountDeposited?.balanceKHR ? amountDeposited?.balanceKHR : 0;
                this.totalBalanceByUSDConvert = amountDeposited?.balanceUSD ? amountDeposited?.balanceUSD : ''
            }).catch(err => {
                this.$notify.error({
                    title: 'Error Get Amount Deposit to Wallet',
                    message: err.response.data?.error ?? '' 
                });
                return false;
            })
        },
    },
    mounted() {
        const userId = this.$store.state.auth.userArr;
        this.getCurrentAmountDepositedByCustomerID(userId);
    }
};
</script>
<!--Customize Style -->
<style>
.el-tabs__item:hover{
    color:#D32F2F;
}
.el-tabs__active-bar{
    background-color:#D32F2F !important ;
}
.el-tabs__item.is-active{
    color:#D32F2F;
}
</style>