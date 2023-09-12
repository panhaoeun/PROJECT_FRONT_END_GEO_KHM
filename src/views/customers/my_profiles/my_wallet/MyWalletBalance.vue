<template>
   <div class="card">
        <div class="px-2 py-2"> 
            <!-- My Wallet total balance -->
            <MyWalletBalanceTotal/>
            <!--Button Wallets-->
            <div>
                <div class="gap-2 flex justify-between px-2 py-2">
                    <!--==== Recharge Deposit to wallet ===-->
                    <Button label="Deposit" severity="danger" style="width:8rem;" @click="dialogTableVisibleOpeDeposit = true" size="small"/>
                    <!-- Dialog of Recharge Deposits -->
                    <el-dialog v-model="dialogTableVisibleOpeDeposit" width="60%" centerwidth="60%"  title="Deposit to Wallet">
                        <!-- Contents of Recharge Deposit -->
                        <PopupDepositToWallet/>
                    </el-dialog>
                    <!--==== Recharge Withdraw to wallet ===-->
                    <Button label="Withdraw" severity="success" style="width:8rem;" @click="dialogTableVisibleOpeWithdraw = true" size="small"/>
                    <!-- Dialog of Recharge Withdraw -->
                    <el-dialog v-model="dialogTableVisibleOpeWithdraw" width="60%" centerwidth="60%" title="Withdraw to Wallet">
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
</template>
<script>
import MyWalletBalanceTotal from "./MyWalletsTotalBalance.vue";
import DepositBalanceToWallets from "./deposit/DepositToWalletList";
import PopupDepositToWallet from "./deposit/PopupDepositToWallet";
import WithDrawBalanceToWallets from "./withdraw/WithdrawToWalletsList.vue";
import PopupWithDrawToWallet from "./withdraw/PopupWithDrawToWallet.vue";
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
            activeMenuBalanced: 'deposit_deposit_balance'
        };
    },
    created() {},
    methods: {
        // Call the method
        openDialogDepositMethod(){
            console.log("sdsad")
        },
    },
    mounted() {},
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