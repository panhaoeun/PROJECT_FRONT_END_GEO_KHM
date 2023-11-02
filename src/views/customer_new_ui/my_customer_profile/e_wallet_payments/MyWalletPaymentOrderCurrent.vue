<template>
    <account-layout
        active-route="wallet"
        @clicked-addresses="loadData"
        class="mb-5"
    >
        <template v-slot:rightArea>
            
            <!-- Spinner -->
            <div
                class="spinner-wrapper flex justify-content-center flex-wrap"
                v-if="fetchingWalletCurrent"
            >
                <spinner
                    :radius="100"
                />
            </div>
            <!-- Cart Wallet -->
            <div v-else class="card">
                <h5 class="ptb-10 p-2 plr-20 plr-sm-15 b-b bold sided mlr-0">
                    My Wallet
                    <!-- Wallet Deposited Popup -->
                    <transition
                        name="fade"
                        mode="out-in"
                    >
                        <popup-deposited-amount-to-wallet/>
                    </transition>
                </h5>
                <!-- List Deposited -->
                <div
                    v-if="isLoggedIn()"
                    class="flex wrap sided align-start p-20 pb-0 p-sm-15 pb-sm pb-xs"
                >   
                    <!-- Current Wallet -->
                    <div class="contact-form card">
                        <!-- Balance in wallet -->
                        <div 
                            class="wallet-card pb-3 rounded-10 overlay ov-hidden bg-img"
                            style="--bg-color: var(--bs-primary); 
                            background-image: url(&quot;https://6valley-aster.6amtech.com/resources/themes/theme_aster/public/assets/img/media/wallet-card.png&quot;);">
                            <div class="card-body d-flex flex-column gap-2 absolute-white">
                                <img width="50"
                                    src="https://6valley-aster.6amtech.com/resources/themes/theme_aster/public/assets/img/icons/profile-icon5.png"
                                    alt="" class="dark-support">
                                <h3 class="fs-36 absolute-white">
                                    {{ totalBalanceKHR ? totalBalanceKHR : 0 }} 
                                    ({{ totalBalanceByUSDConvert ? totalBalanceByUSDConvert : 0 }})
                                </h3>
                                <p class="font-bold text-black">Total Balance</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- List deposited to wallets -->
                 <div
                    v-if="isLoggedIn()"
                    class="flex wrap sided align-start p-20 pb-0 p-sm-15 pb-sm pb-xs"
                >   
                    <div class="contact-form card">
                        <PopupDepositedAmountToWalletList/>
                    </div>
                </div>
            </div>
        </template>
    </account-layout>
</template>
<script>
import Spinner from '@/components/ui_component_new_frontend/Spinner';
import AccountLayout from '@/components/ui_component_new_frontend/AccountLayout';
import {isLoggedIn} from '@/utils/auth/auth';
import CustomerDepositedToWalletService from '@/services/my_wallets/deposited/CustomersDepositedServices';
// import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import PopupDepositedAmountToWallet from "../../../customers/my_profiles/my_wallet/deposit/PopupDepositToWallet.vue";
import PopupDepositedAmountToWalletList from "../../../customers/my_profiles/my_wallet/deposit/DepositToWalletList.vue";
export default {
    components: {
        AccountLayout,
        Spinner,
        // AjaxButton,
        PopupDepositedAmountToWallet,
        PopupDepositedAmountToWalletList
    },
    props: {},
    data() {
        return {
            walletPopupDeposited:false,
            fetchingWalletCurrent: false,
            totalBalanceKHR: 0,
            totalBalanceByUSDConvert: 0,
            activeMenuBalanced: 'deposit_deposit_balance',
        };
    },
    created() {
        this.customerDepositedWallet = new CustomerDepositedToWalletService();
        this.getCurrentAmountDepositedByCustomerID();
    },
    methods: {
        // Check login
        isLoggedIn() {
            return isLoggedIn();
        },
        loadData() {
            this.$refs.userAddress.loadData()
        },
        // Call the method
        getCurrentAmountDepositedByCustomerID(){
            this.fetchingWalletCurrent = true;
            setTimeout(async () => {
                this.customerDepositedWallet.getCustomerDepositedBalanceInCurrent()
                .then((amountDeposited) => {
                    this.fetchingOrderData = true
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
                });
                this.fetchingWalletCurrent = false;
            },1000);
        },
        addDepositedAmountToWall(){
            this.walletPopupDeposited = true
            this.editingAddress = null
        }
    },
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>