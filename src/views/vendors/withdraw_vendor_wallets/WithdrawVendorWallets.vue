<template>
    <div v-if="isLoggedIn()">
            <div class="layout-content px-2 py-2" v-if="currentUserAuth && currentUserAuth[1].typeUser === 'Admin'">
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
                                        :value="adminWithdrawWalletMethod" 
                                        v-model:selection="selectedWithdrawWalletAdminList"
                                        dataKey="id"
                                        :paginator="true" :rows="10" 
                                        :filters="filters"
                                        class="p-datatable-scrollable text-sm"
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                        :rowsPerPageOptions="[5, 10, 25]"
                                        :globalFilterFields="['representative.vendorName', 'transactionType','transactionId','transactionStatus', 'transactionDate']"
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
                                        <div v-if="adminWithdrawWalletMethod && adminWithdrawWalletMethod.length > 0 && adminWithdrawWalletMethod != ''">
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
                                                    <p>{{ slotProps?.data.transactionDate}}</p>
                                                </template>
                                            </Column>
                                            <!-- Status -->
                                            <Column field="transactionStatus" header="Status" sortable style="min-width:10rem">
                                                <template #body="slotProps">
                                                    <Tag :value="slotProps.data?.transactionStatus" :severity="getSeverityWithdrawStatus(slotProps.data?.transactionStatus)" />
                                                </template>
                                            </Column>
                                            <!-- Dialog -->
                                            <Column :exportable="false" header="Options" style="min-width:8rem">
                                                <template #body="slotProps">
                                                    <template v-if="slotProps.data?.transactionStatus === 'Pending'">
                                                        <Button 
                                                            icon="pi pi-wallet" 
                                                            class="text-sm" 
                                                            outlined 
                                                            rounded 
                                                            severity="danger"
                                                            @click="$router.push(`/vendor/user/list/admin/sellers/withdraw_request_balance_in_account/confirm_to_wallet_vendor/${parseInt(slotProps.data?.payTransactionId)}`)" 
                                                        />
                                                    </template>
                                                    <template v-else>
                                                        <Tag icon="pi pi-times" outlined severity="danger" value="Action disabled"></Tag>
                                                    </template>
                                                </template>
                                            </Column>
                                        </div>
                                    </DataTable>
                                </div>
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
<!-- Data Tables withdraw wallet to admin -->
<script>
import { FilterMatchMode } from 'primevue/api';
import WithdrawWalletVendorBankAccountServices from '../../../services/vendors/withdraw_wallet_vendor/WithdrawWalletsVendorServices';
import convertUSDToRiel from '@/utils/convertUSDTORiel';
import {mapGetters} from "vuex";
import { isLoggedIn } from "@/utils/auth/auth";
export default {
    components: {},
    props: {},
    data() {
        return {
            selectedWithdrawWalletAdminList: null,
            adminWithdrawWalletMethod: [],
            filters: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        };
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
        this.vendorWithdrawWalletBankAdmin = new WithdrawWalletVendorBankAccountServices();
    },
    mounted() {
        this.vendorWithdrawWalletBankAdmin.getTransactionConfirmAdminWithdrawWalletsMethod().then((withdraw) => {
            if (!withdraw) {
                this.adminWithdrawWalletMethod = Array.isArray()?? [];
            }
            this.adminWithdrawWalletMethod = Array.isArray(withdraw) ? withdraw.slice() : [];
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
    },
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>