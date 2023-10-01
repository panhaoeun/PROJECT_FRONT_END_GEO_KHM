<template>
    <div>
        <b-row>
            <!-- Total Products -->
            <total-products-dashboard/>
            <!-- Total Orders -->
            <total-orders-dashboard/>
            <!-- Total Revenue-->
            <total-revenue-dashboard/>
            <!-- Seller Wallets -->
            <seller-account-balance-wallet-withdraw/>
        </b-row>
    </div>
</template>
<script>
import TotalProductsDashboard from './dashboard_manage_/TotalProductsDashboard.vue';
import TotalOrdersDashboard from './dashboard_manage_/TotalOrdersDashboard.vue';
import TotalRevenueDashboard from './dashboard_manage_/TotalRevenueDashboard.vue';
import SellerAccountBalanceWalletWithdraw from './dashboard_manage_/SellerAccountBalanceWalletWithdraw.vue';
export default {
    name: 'WidgetBasic',
    components: {
        TotalProductsDashboard,
        TotalOrdersDashboard,
        TotalRevenueDashboard,
        SellerAccountBalanceWalletWithdraw
    }
}
</script>
