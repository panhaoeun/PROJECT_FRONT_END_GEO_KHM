<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
   <div v-if="isLoggedIn()">
        <div class="layout-content px-2 py-2" v-if="currentUserAuth && currentUserAuth[1].typeUser === 'Vendor'">
            <!-- Titles -->
            <div class="flex justify-content-between my-4 px-4 py-4">
                <h2 class="relative text-black text-xl section section-title:before">{{ $t('withDrawModule.withdrawList') }}</h2>
            </div>
            <div class="gird">
                <div class="col-12">
                    <el-card  class="box-card py-2 px-2">
                        <div>
                            <div class="px-2">
                                <!-- Data Tables -->
                                <DataTable 
                                ref="dt" 
                                    :value="vendorWithdrawWallet" 
                                    v-model:selection="selectedWithdrawWalletList"
                                    dataKey="id"
                                    :paginator="true" :rows="10" 
                                    :filters="filters"
                                    class="p-datatable-scrollable text-sm"
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    :rowsPerPageOptions="[5, 10, 25]"
                                    :globalFilterFields="['representative.transactionId', 'paymentNumber','transactionStatus','transactionDate']"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} withdraw method">
                                    <!-- Header -->
                                    <template #header>
                                        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                            <h4 class="m-0">
                                                
                                            </h4>
                                            <span class="p-input-icon-left text-sm">
                                                <i class="pi pi-search" />
                                                <InputText v-model="filters['global'].value" class=" text-sm" :placeholder="$t('route.search')" />
                                            </span>
                                        </div>
                                    </template>
                                    <!-- Empty Users -->
                                    <template #empty>{{ $t('customer.customerNotFound') }} </template>
                                    <!-- Loading Users -->
                                    <template #loading> Loading withdraw methods data. Please wait... </template>
                                    <!--------------Check Existed Data ----------->
                                    <div v-if="vendorWithdrawWallet && vendorWithdrawWallet.length > 0 && vendorWithdrawWallet != ''">
                                        <!-- Columns -->
                                        <Column field="balanceRiel" header="Amount" sortable style="min-width:10rem">
                                            <template #body="slotProps">
                                                <div class="flex flex-column gap-2">
                                                    <span class="font-bold">{{ currencyFormattedKHRiel(slotProps.data?.balanceRiel) ?? 0}}</span>
                                                    <span>{{  currencyFormattedUSD(slotProps.data?.balanceDollar) ?? 0}}</span>
                                                </div>
                                            </template>
                                        </Column>
                                        <Column field="totalItem" header="Request Time" sortable style="min-width:10rem">
                                            <template #body="slotProps">
                                                <span>{{ slotProps?.data.transactionDate}}</span>
                                            </template>
                                        </Column>
                                        <!-- Status -->
                                        <Column field="transactionStatus" header="Request Time" sortable style="min-width:10rem">
                                            <template #body="slotProps">
                                                <Tag :value="slotProps.data?.transactionStatus" :severity="getSeverityWithdrawStatus(slotProps.data?.transactionStatus)" />
                                            </template>
                                        </Column>
                                        <Column :exportable="false" header="Options" style="min-width:8rem">
                                            <template #body="slotProps">
                                                <template v-if="slotProps.data?.transactionStatus === 'Pending'">
                                                    <Button 
                                                        label="Close" 
                                                        class="text-sm" 
                                                        outlined 
                                                        rounded 
                                                        severity="danger"
                                                        @click="confirmDeletedWithdrawMethodVendor(slotProps.data?.payTransactionId)" 
                                                    />
                                                </template>
                                                <template v-else>
                                                <Tag icon="pi pi-times" outlined severity="danger" value="Close"></Tag>
                                                </template>
                                            </template>
                                        </Column>
                                    </div>
                                </DataTable>
                            </div>
                            <!-- ===============Dialog Delete Product Category======================= -->
                            <Dialog 
                                v-model:visible="deletedWithdrawMethodDialog" 
                                :style="{ width: '450px' }"
                                header="Are your sure"
                                :modal="true"
                            >
                                <div class="confirmation-content">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Once deleted you will not be able to recover this?</span>
                                </div>
                                <template #footer>
                                    <Button label="No" icon="pi pi-times" text @click="deletedWithdrawMethodDialog = false" />
                                    <Button label="Yes" icon="pi pi-check" text @click="deleteRequestAmountWithdrawWallet()" />
                                </template>
                            </Dialog>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <!-- Authorize Account -->
        <div class="layout-content px-2 py-2" v-else>
            <div class="grid">
                    <div class="col-12">
                        <el-card>
                            Can not access use this module, Only Access user vendor!
                        </el-card>
                    </div>
            </div>
        </div>
   </div>
</template>


<!-- Data Tables withdraw wallet -->
<script>
import { FilterMatchMode } from 'primevue/api';
import WithdrawWalletVendorBankAccountServices from '../../../services/vendors/withdraw_wallet_vendor/WithdrawWalletsVendorServices';
import convertUSDToRiel from '@/utils/convertUSDTORiel';
import {mapGetters} from "vuex";
import { isLoggedIn } from "@/utils/auth/auth";

export default {
    data() {
        return {
            selectedWithdrawWalletList: null,
            deletedWithdrawMethodDialog: false,
            vendorWithdrawWallet: '',
            product: '',
            selectedRolesList: '',
            withdrawMethodId: 0,
            filters: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        }
    },
    computed:{
        ...mapGetters({
            currentUser: 'auth/currentUserAuth',
        }),
        currentUserAuth() {
            return this.currentUser ? this.currentUser : null;
        },
    },
    created() {
        this.vendorWithdrawWalletBank = new WithdrawWalletVendorBankAccountServices();
    },
    mounted() {
        this.vendorWithdrawWalletBank.getTransactionSellerWithdrawWallet().then((data) => {
            if (!data) {
                this.vendorWithdrawWallet = Array.isArray()?? [];
            }
            this.vendorWithdrawWallet = Array.isArray(data) ? data.slice() : [];
        });
    },
    methods: {
        isLoggedIn() {
            return isLoggedIn();
        },
        // Convert Currency Amount
        currencyFormattedKHRiel: function(value) {
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD: function(value) {
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
        async convertRielAmountWithdrawWallet(usdAmount){
           try {
                const amountConvertRiel =  parseInt(usdAmount) ? parseInt(usdAmount) : 0;
                this.exchangeRateRielProPrice = await convertUSDToRiel(amountConvertRiel) ?? 0;
                const result = await Promise.resolve(amountConvertRiel)
                return result;
           } catch (error) {
                return Promise.reject(error);
           }
        },
        getSeverityWithdrawStatus(withdrawStatus) {
            switch (withdrawStatus) {
                case 'Pending':
                    return 'success';

                case 'Completed':
                    return 'warning';

                case 'Reject':
                    return 'danger';

                default:
                    return null;
            }
        },
        confirmDeletedWithdrawMethodVendor(withdrawId){
            this.deletedWithdrawMethodDialog = true;
            this.withdrawMethodId = parseInt(withdrawId);
        },
        deleteRequestAmountWithdrawWallet(){
            if (!this.withdrawMethodId) {
                this.deletedWithdrawMethodDialog = false;
            }
            this.vendorWithdrawWalletBank.deletedRequestMethodWithdrawWalletVendor(parseInt(this.withdrawMethodId)).then((delWithdraw) => {
                this.$notify.success({
                    title: 'Successfully to once deleted withdraw wallet.',
                    message: delWithdraw.data?.message ? delWithdraw.data?.message : '' ,
                    showClose: false
                });
                window.location.reload();
                this.deletedWithdrawMethodDialog = false;
            }).catch((error) => {
                this.$notify.error({
                    title: `Remove Request Method Request Unsuccessfully. Please try again later.`,
                    message: error.response.data?.error.message ?? 'Unsuccessfully for withdraw method to wallet',
                    showClose: true
                });   
                return false;
            });
        }
    }
}
</script>
