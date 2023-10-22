<template>
    <div class="layout-content px-2 py-2">
        <!-- Header -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="h4 mb-0 text-capitalize d-flex align-items-center gap-2">
                <img
                    width="20"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw-icon.png"
                    alt=""
                />
                Withdraw
            </h2>
                 <el-button class="btn btn-primary text-sm" type="info" size="default" @click.prevent="$router.push('/vendor/user/list/admin/sellers/withdraw_request_balance_in_account/list')">
                <div class="flex justify-between pl-2">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{$t("route.routeBack")}}</span>
                </div>
            </el-button>
        </div>
        <!-- Withdraw -->
        <div class="gird">
            <div class="col-12">
                <!-- Seller Withdraw Information -->
                <el-card
                    class="box-card py-2 px-2"
                    header="Seller Withdraw Information"
                >
                    <div class="column gpa-3">
                        <!-- Transaction Id -->
                        <div class="col-md-4 mb-2 mb-md-0 my-4">
                            <!-- Amount -->
                            <div class="flex-start flex-wrap flex justify-content-between">
                                <div>
                                    <h6 class="text-capitalize">Transaction ID :</h6>
                                </div>
                                <div class="mx-1">
                                    <h6>
                                      {{ paymentTransactionId ? paymentTransactionId : '' }}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-2 mb-md-0 my-4">
                            <!-- Amount -->
                            <div class="flex-start flex-wrap flex justify-content-between">
                                <div>
                                    <h6 class="text-capitalize">Bank Name :</h6>
                                </div>
                                <div class="mx-1">
                                    <h6>
                                      {{ bankNameCompany ? bankNameCompany : '' }}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <!-- Bank Number -->
                        <div class="col-md-4 mb-2 mb-md-0 my-4">
                            <div class="flex-start flex-wrap flex justify-content-between">
                                <div>
                                    <h6 class="text-capitalize">Account Name :</h6>
                                </div>
                                <div class="mx-1">
                                    <h6>
                                      {{ accountName ? accountName : '' }}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <!-- Bank Number -->
                        <div class="col-md-4 mb-2 mb-md-0 my-4">
                            <div class="flex-start flex-wrap flex justify-content-between">
                                <div>
                                    <h6 class="text-capitalize">Bank Number :</h6>
                                </div>
                                <div class="mx-1">
                                    <h6>
                                      {{ bankAccountNumber ? bankAccountNumber : '' }}
                                    </h6>
                                </div>
                            </div>
                        </div>
                          
                        <!-- Amount -->
                        <div class="col-md-4 mb-2 mb-md-0 my-4">
                            <!-- Amount -->
                            <div class="flex-start flex-wrap flex justify-content-between">
                                <div>
                                    <h6 class="text-capitalize">Amount :</h6>
                                </div>
                                <div class="mx-1">
                                    <h6>
                                        <p>
                                            {{ currencyFormattedKHRielWithdraw(editedWithdrawRequestAmountKHR) }}
                                            ({{ currencyFormattedUSDWithdraw(editedWithdrawRequestAmountUSD) }})
                                        </p>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <!-- Request time -->
                        <div class="col-md-4 mb-2 mb-md-0 my-4">
                            <div class="flex-start flex-wrap flex justify-content-between">
                                <div>
                                    <h6 class="text-capitalize">Request time :</h6>
                                </div>
                                <div class="mx-1">
                                    <h6>{{ transactionDateWithdraw }}</h6>
                                </div>
                            </div>
                        </div>
                        <!-- Noted Withdraw -->
                        <div class="col-md-12 mb-2 mb-md-0 my-4">
                            <div class="flex-start">
                                <div class="title-color">Note :</div>
                                <div class="mx-1">{{ withdrawConDes ? withdrawConDes : '' }}</div>
                            </div>
                        </div>
                        <!-- Image URL -->
                        <div class="col-md-12 mb-2 mb-md-0 my-4">
                            <div class="flex-start">
                               <div class="demo-image__preview">
                                    <el-image
                                    style="width: 100px; height: 100px"
                                    :src="paymentReceiptURL"
                                    :zoom-rate="1.2"
                                    :max-scale="7"
                                    :min-scale="0.2"
                                    :preview-src-list="paymentReceiptURLLst"
                                    :initial-index="1"
                                    fit="cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <!-- Button Request Payments -->
                        <div class="col-md-12 mb-2 mb-md-0 my-4">
                            <!-- Process Withdraw -->
                            <DialogConfirmToRequestWithdrawAdmin/>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
import WithdrawWalletVendorBankAccountServices from '../../../services/vendors/withdraw_wallet_vendor/WithdrawWalletsVendorServices';
import DialogConfirmToRequestWithdrawAdmin from "./DialogConfirmToRequestWithdrawAdmin.vue"
export default {
    components: {
        DialogConfirmToRequestWithdrawAdmin
    },
    props: {},
    data() {
        return {
            editedWithdrawRequestAmountKHR: 0,
            editedWithdrawRequestAmountUSD: 0,
            accountName: '',
            bankNameCompany:'',
            bankAccountNumber: '',
            paymentReceiptURL: null,
            paymentReceiptURLLst: [],
            paymentTranType: '',
            withdrawConDes: '',
            transactionDateWithdraw: '',
            paymentTransactionId: ''
        };
    },
   created() {
        this.vendorWithdrawWalletBankAdmin = new WithdrawWalletVendorBankAccountServices();
        this.getEditedConfirmWithdrawWallet();
    },
    methods: {
        // Convert Currency Amount
        currencyFormattedKHRielWithdraw(value){
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSDWithdraw(value){
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
        formatDateWithdraw(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            return [month,day,year].join('-');
        },
       getEditedConfirmWithdrawWallet(){
            const withdrawId = this.$route.params?.withdrawId;
            // Withdraw Services
            this.vendorWithdrawWalletBankAdmin.editedRequestMethodWithdrawWalletVendor(withdrawId).then((withdraw) => {
                if (!withdraw) {
                    this.editedWithdrawRequest = Array.isArray()?? [];
                }
                const {
                    account_name,
                    bank_name,
                    payment_number,
                    transaction_type,
                    transaction_amount,
                    transaction_amount_dollar,
                    payment_receipt,
                    description_transaction,
                    payments_transaction_id,
                    transaction_date
                } = withdraw;
                this.editedWithdrawRequestAmountKHR  = transaction_amount ? transaction_amount : 0;
                this.editedWithdrawRequestAmountUSD = transaction_amount_dollar ? transaction_amount_dollar : 0;
                this.accountName = account_name ? account_name : '';
                this.bankAccountNumber  = payment_number ? payment_number : '';
                this.bankNameCompany = bank_name ? bank_name : '';
                this.paymentTranType = transaction_type ? transaction_type : '';
                this.paymentReceiptURL = payment_receipt ? payment_receipt : '';
                this.withdrawConDes = description_transaction ? description_transaction : '';
                this.paymentTransactionId= payments_transaction_id ? payments_transaction_id : '';
                this.transactionDateWithdraw = this.formatDateWithdraw(transaction_date) ? this.formatDateWithdraw(transaction_date) : '';
                // Withdraw Image
                this.paymentReceiptURLLst.push(payment_receipt ? payment_receipt : '');
            });
       }
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
