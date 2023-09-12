<template>
   <!-- Recharge record -->
   <div class="gap-3 px-2 py-2">
        <!-- Recharge record List -->
       <template v-if="depositWalletToList.length > 0 && depositWalletToList !== ''">
            <el-table :data="depositWalletToList" style="width: 100%">
                <el-table-column prop="name" label="Time" width="100"></el-table-column>
                <el-table-column prop="name" label="Transaction Number" width="180"></el-table-column>
                <el-table-column prop="name" label="Recharge Amount" width="180"></el-table-column>
                <el-table-column prop="name" label="Status" width="120"></el-table-column>
                <el-table-column prop="name" label="Recharge Channel" width="180"></el-table-column>
            </el-table>
       </template>
        <template v-else>
            <IconRielComponent/>
        </template>
   </div>
</template>
<script>
import IconRielComponent from "../../../../../components/icons/IconRielComponent.vue";
export default {
    components: {
        IconRielComponent
    },
    props: {},
    data() {
        return {
            depositWalletToList: []
        };
    }
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>