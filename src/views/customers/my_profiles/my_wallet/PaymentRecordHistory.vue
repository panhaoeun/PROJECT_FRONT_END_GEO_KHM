<template>
   <!-- Recharge record -->
   <div class="gap-3 px-2 py-2">
        <!-- Recharge record List -->
        <template v-if="withdrawWalletToList.length > 0 && withdrawWalletToList !== ''">
            <el-table :data="withdrawWalletToList" style="width: 100%">
                <el-table-column prop="name" label="Time" width="100"></el-table-column>
                <el-table-column prop="name" label="Transaction Number" width="180"></el-table-column>
                <el-table-column prop="name" label="Withdrawing Card Number" width="210"></el-table-column>
                <el-table-column prop="name" label="Withdraw Amount" width="180"></el-table-column>
                <el-table-column prop="name" label="Status" width="120"></el-table-column>
            </el-table>
        </template>
        <template v-else>
            <IconRielComponent/>
        </template>
   </div>
</template>
<script>
import IconRielComponent from "@/components/icons/IconRielPayment.vue";
export default {
    components: {
        IconRielComponent
    },
    props: {},
    data() {
        return {
            withdrawWalletToList: []
        };
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
