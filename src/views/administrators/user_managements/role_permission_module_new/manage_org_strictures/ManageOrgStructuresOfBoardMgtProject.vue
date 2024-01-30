<template>
    <div class="pl-2 gap-1 flex align-items-center">
        <!-- Manage Org Structures -->
        <manage-org-structure-board-mgt-project/>
        <!-- Manage Departments -->
        <!-- <manage-org-structure-board-mgt-dept-emp-project/> -->
        <!-- Manage Position BoardMgt-->
        <org-str-mgt-project-positions/>
        
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
// import ManageOrgStructureBoardMgtDeptEmpProject from "./board_manager_org_str_project/manage_dept_emp_board_mgt/ManageOrgChartBoardMgtDeptEmp.vue";
// Manage Org.Structures Board Mgt
import ManageAssignOrgChartBaseOnMgtGeo from "./GlobalOrgChartOfGeoDeptPost.vue";
export default {
    components: {
        OrgStrMgtProjectPositions,
        ManageOrgStructureBoardMgtProject,
        // ManageOrgStructureBoardMgtDeptEmpProject,
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
