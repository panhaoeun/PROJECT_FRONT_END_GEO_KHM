<template>
   <!-- Recharge record -->
   <div class="gap-3 px-2 py-2" v-if="isLoggedIn()">
        <!-- Recharge record List -->
        <p class="hidden">{{ getListDepositedWallet }}</p>
       <template v-if="depositWalletToList.length > 0 && depositWalletToList !== ''">
            <el-table 
                v-loading="loadingWalletList"
                :data="depositWalletToList" 
                style="width: 100%" 
                element-loading-text="Loading..."
                :element-loading-spinner="loadingDepositedSvg"
                element-loading-svg-view-box="-10, -10, 50, 50"
            >
                <el-table-column label="Time" width="100">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                            <span>{{ convertDateTimeFormateTransactionDate(new Date(scope.row?.transaction_date).toISOString(),"yyyy-MM-dd hh:mm:ss") }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="payments_transaction_id" label="Transaction Number" width="180"></el-table-column>
                <el-table-column prop="transaction_amount" label="Recharge Amount" width="180"></el-table-column>
                <el-table-column prop="transaction_status" label="Status" width="120"></el-table-column>
                <el-table-column prop="transaction_type" label="Recharge Channel" width="180"></el-table-column>
            </el-table>
       </template>
        <template v-else>
            <IconRielComponent/>
        </template>
   </div>
     <!-- Module -->
   <div v-else> 
        <p>Please login use this module</p>
   </div>
</template>
<script>
import IconRielComponent from "@/components/icons/IconRielComponent.vue";
import CustomerDepositedToWalletService from '@/services/my_wallets/deposited/CustomersDepositedServices';
import {isLoggedIn} from '@/utils/auth/auth';
import { Timer } from '@element-plus/icons-vue'
export default {
    components: {
        IconRielComponent,
        Timer
    },
    props: {},
    created() {
        this.customerDepositedWallet = new CustomerDepositedToWalletService();
    },
    data() {
        return {
            loadingWalletList: true,
            depositWalletToList: [],
            loadingDepositedSvg: `<path class="path" d="
                M 30 15
                L 28 17
                M 25.61 25.61
                A 15 15, 0, 0, 1, 15 30
                A 15 15, 0, 1, 1, 27.99 7.5
                L 15 15
                " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`
        };
    },
    computed: {
        getListDepositedWallet: function(){
            const userId = this.$store.state.auth.userArr;
            return this.depositWalletToListByCustomerAuthTransaction(userId);
        }
    },
    methods: {
        convertDateTimeFormateTransactionDate(dateString, formate){
            const date = new Date(dateString);
            if (date == "Invalid Date" && isNaN(date) || typeof date == 'number' && date != 0 && !date) {
                this.$notify.error({
                    title: 'Invalid Formate Date',
                    message: `Invalid Formate | Please Formate Date 2023-06-23 11:07:56 :${date}:${dateString}`
                });
            }
            var dateFormate = {
                M: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                m: date.getMinutes(),
                s: date.getSeconds()
            };
            const replaceFormate = formate.replace(/(M+|d+|h+|m+|s+)/g, function (formate) {
                return ((formate.length > 1 ? "0" : "") + dateFormate[formate.slice(-1)]).slice(-2)
            });
            return replaceFormate.replace(/(y+)/g, function (v) {
                return date.getFullYear().toString().slice(-v.length)
            });
        },
        // Check login
        isLoggedIn() {
            return isLoggedIn();
        },
        // Call the method
        depositWalletToListByCustomerAuthTransaction(customerId){
            if(customerId){
                this.customerDepositedWallet.getHistoryTransactionCurrentByCustomer().then((depositList) => {
                    if (!depositList) {
                        this.depositWalletToList = [];
                    }
                    this.depositWalletToList = Array.isArray(depositList) ? depositList.slice() : [];
                    setTimeout(function(){
                        this.loadingWalletList = false;
                    }.bind(this),1000);
                    return;
                }).catch((error)=> {
                        console.log('Error', error, 'Error');
                });
            }else{
                this.depositWalletToList = Array.isArray();
            }
        }
    }
};
</script>