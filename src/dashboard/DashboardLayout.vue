<template>
    <div>
        <b-row>
            <!-- Total Products -->
            <total-products-dashboard/>
            <!-- Total Orders -->
            <total-orders-dashboard/>
            <!-- Total Revenue-->
            <total-revenue-dashboard/>
            <!-- Admin Balances -->
            <template v-if="isLoggedIn()">
                <!-- <template v-if="currentUserAuth && currentUserAuth[1].typeUser === 'Admin'">
                    <withdraw-confirm-by-admin-to-vendor-request/>
                </template> -->
                <!-- Seller Wallets -->
                <template v-if="currentUserAuth && currentUserAuth[1].typeUser === 'Vendor'">
                    <seller-account-balance-wallet-withdraw/>
                </template>
            </template>
        </b-row>
    </div>
</template>
<script>
import {mapGetters} from "vuex";
import TotalProductsDashboard from './dashboard_manage_/TotalProductsDashboard.vue';
import TotalOrdersDashboard from './dashboard_manage_/TotalOrdersDashboard.vue';
import TotalRevenueDashboard from './dashboard_manage_/TotalRevenueDashboard.vue';
import SellerAccountBalanceWalletWithdraw from './dashboard_manage_/SellerAccountBalanceWalletWithdraw.vue';
// import WithdrawConfirmByAdminToVendorRequest from './dashboard_manage_/admin/WithdrawConfirmByAdminToVendorRequest.vue';
import {isLoggedIn} from '@/utils/auth/auth';

export default {
    name: 'WidgetBasic',
    components: {
        TotalProductsDashboard,
        TotalOrdersDashboard,
        TotalRevenueDashboard,
        SellerAccountBalanceWalletWithdraw,
        // WithdrawConfirmByAdminToVendorRequest
    },
    computed:{
         ...mapGetters({
            currentUser: 'auth/currentUserAuth',
        }),
        currentUserAuth() {
            return this.currentUser ? this.currentUser : null;
        },
    },
    methods: {
         // Check login
        isLoggedIn() {
            return isLoggedIn();
        },
    }
}
</script>
