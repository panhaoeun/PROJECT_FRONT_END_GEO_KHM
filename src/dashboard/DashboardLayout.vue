<template>
    <div>
        <b-row>
            <!-- Total Products -->
            <total-products-dashboard/>
            <!-- Total Orders -->
            <total-orders-dashboard/>
            <!-- Total Revenue-->
            <total-revenue-dashboard/>
        </b-row>
    </div>
</template>
<script>
import TotalProductsDashboard from './dashboard_manage_/TotalProductsDashboard.vue';
import TotalOrdersDashboard from './dashboard_manage_/TotalOrdersDashboard.vue';
import TotalRevenueDashboard from './dashboard_manage_/TotalRevenueDashboard.vue';
export default {
    name: 'WidgetBasic',
    components: {
        TotalProductsDashboard,
        TotalOrdersDashboard,
        TotalRevenueDashboard
    }
}
</script>
