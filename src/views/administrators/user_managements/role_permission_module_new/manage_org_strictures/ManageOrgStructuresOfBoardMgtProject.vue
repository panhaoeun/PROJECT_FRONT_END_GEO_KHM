<template>
    <div class="pl-2 gap-1 flex align-items-center">
        <!-- Manage Org Structures -->
        <manage-org-structure-board-mgt-project/>
        <!-- Manage Position BoardMgt-->
        <org-str-mgt-project-positions/>
        <!-- Manage Employee -->
        <Button
            aria-label="Add Org Structure"
            severity="info"
            class="border-round-sm w-10rem h-2rem text-sm"
            outlined
            label="Manage Employee"
        />
    </div>
    <!-- Manage Org Chart Base Mgt GEO -->
    <ManageAssignOrgChartBaseOnMgtGeo 
        org-data=""
        :isShowLabels="false"
    />
</template>
<!-- Manage OrgStructures Board.Mgt -->
<script>
import OrgStrMgtProjectPositions from "./board_manager_org_str_project/manage_position_mgt_org/ListPositionBoardMgtOrgStrPro";
import ManageOrgStructureBoardMgtProject from "./board_manager_org_str_project/manage_org_chart_board_mgt/ManageOrgChartBoardMgt";
// Manage Org.Structures Board Mgt
import ManageAssignOrgChartBaseOnMgtGeo from "./GlobalOrgChartOfGeoDeptPost.vue";
export default {
    components: {
        OrgStrMgtProjectPositions,
        ManageOrgStructureBoardMgtProject,
        ManageAssignOrgChartBaseOnMgtGeo
    },
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
