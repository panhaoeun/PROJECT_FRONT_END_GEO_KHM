<template>
   <div class="gird my-4">
        <div class="card mb-3">
                <div class="card-body">
                    <!-- Wallet Current Account -->
                    <div
                        class="row justify-content-between align-items-center g-2 mb-3"
                    >
                        <div class="col-sm-6">
                            <h4
                                class="d-flex align-items-center text-capitalize gap-10 mb-0"
                            >
                                <img
                                    width="20"
                                    class="mb-1"
                                    src="https://6valley.6amtech.com/public/assets/back-end/img/admin-wallet.png"
                                    alt=""
                                />
                                Seller Wallet
                            </h4>
                        </div>
                    </div>
                    <!-- Wallet Current Account -->
                    <div class="row g-2" id="order_stats">
                        <div class="col-lg-12">
                            <div
                                class="card h-100 d-flex justify-content-center align-items-center"
                            >
                                <div
                                    class="card-body d-flex flex-column gap-10 align-items-center justify-content-center"
                                >
                                    <img
                                        width="100"
                                        class="mb-2"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShXsrW2rNTXTKrplJLV4cLZvlsZXnwoahl-Q&usqp=CAU"
                                        alt=""
                                    />
                                    
                                    <h3 class="for-card-count text-center mb-0 fz-24 flex flex-column">
                                        <span>{{ vendorCurrentBalanceKHR ? vendorCurrentBalanceKHR : 0 }}</span>
                                        <span class="text-md">({{ vendorCurrentBalanceUSD ? vendorCurrentBalanceUSD : 0 }})</span>
                                    </h3>
                                    <div class="font-weight-bold text-lg text-red-500 text-capitalize mb-30 text-black">
                                        Withdrawable balance
                                    </div>
                                <!-- Withdraw Balance Account Vendors -->
                                    <WithdrawBalanceRequestAccountInWalletBankAccountVendor/>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="col-lg-8">
                            <div class="row g-2">
                                <div class="col-md-6">
                                    <div
                                        class="card card-body h-100 justify-content-center"
                                    >
                                        <div
                                            class="d-flex gap-2 justify-content-between align-items-center"
                                        >
                                            <div
                                                class="d-flex flex-column align-items-start"
                                            >
                                                <h3 class="mb-1 fz-24">$722.00</h3>
                                                <div class="text-capitalize mb-0 text-black">
                                                    Pending Withdraw
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    width="40"
                                                    class="mb-2"
                                                    src="https://6valley.6amtech.com/public/assets/back-end/img/pw.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div
                                        class="card card-body h-100 justify-content-center"
                                    >
                                        <div
                                            class="d-flex gap-2 justify-content-between align-items-center"
                                        >
                                            <div
                                                class="d-flex flex-column align-items-start"
                                            >
                                                <h3 class="mb-1 fz-24">$600.00</h3>
                                                <div class="text-capitalize mb-0 text-black">
                                                    Already Withdrawn
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    width="40"
                                                    src="https://6valley.6amtech.com/public/assets/back-end/img/aw.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
        </div>
   </div>
</template>
<!-- Seller Account Balance Wallets -->
<script>
import WithdrawWalletVendorBankAccountServices from '@/services/vendors/withdraw_wallet_vendor/WithdrawWalletsVendorServices';
import WithdrawBalanceRequestAccountInWalletBankAccountVendor from "./vendor_withdraw_wallet/WithdrawBalanceRequestAccountInWalletBankAccountVendor"; 
import { isLoggedIn } from "@/utils/auth/auth";
export default {
    components: {
        WithdrawBalanceRequestAccountInWalletBankAccountVendor
    },
    props: {},
    data() {
        return {
            vendorCurrentBalanceKHR: null,
            vendorCurrentBalanceUSD: null
        };
    },
    created() {
        this.vendorWithdrawWalletBank = new WithdrawWalletVendorBankAccountServices();
        this.getCurrentBalanceVendorWallet();
    },
    methods: {
        currencyFormattedKHRiel: function(value) {
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD: function(value) {
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
        getCurrentBalanceVendorWallet(){
            if(this.isSessionActiveVendor()){
                this.vendorWithdrawWalletBank.getTransactionCurrentBalanceVendorWithdrawWallets()
                .then((vendorWallet) => {
                    if (!Array.isArray(vendorWallet) || vendorWallet !== null) {
                        this.vendorCurrentBalanceKHR = this.currencyFormattedKHRiel(0);
                        this.vendorCurrentBalanceUSD = this.currencyFormattedUSD(0);
                    }
                    this.vendorCurrentBalanceKHR = vendorWallet?.currentBalanceKHRWallet ?? 0;
                    this.vendorCurrentBalanceUSD = vendorWallet?. currentBalanceUSDWallet ?? 0;
                })
                .catch((error) => {
                    this.vendorCurrentBalanceKHR = this.currencyFormattedKHRiel(0);
                    this.vendorCurrentBalanceUSD = this.currencyFormattedUSD(0);
                    if(error){
                        this.$notify.error({
                            title: 'Error get current balance in waller',
                            message: error.response.data.error.message ?? 'Unsuccessfully get current amount in wallet',
                            showClose: true
                        });  
                    }
                })
            }
        },
        isSessionActiveVendor(){
            return isLoggedIn();
        },
    }

};
</script>