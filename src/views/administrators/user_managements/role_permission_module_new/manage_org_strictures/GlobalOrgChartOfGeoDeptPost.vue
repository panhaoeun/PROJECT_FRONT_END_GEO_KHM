<template>
    <div class="gap-3 my-4 flex justify-content-center">
        <!-- {{ getConvertArrayToObject }} -->
        <OrgStructureChartGeoFenceHierarchyLevel
            :datasource="getConvertArrayToObject"
            pan="true"
            @node-click="selectNode"
        >
            <template v-slot="{ nodeData }">
                <b @click="selectNode(nodeData)">{{ nodeData.name }}</b>
            </template>
        </OrgStructureChartGeoFenceHierarchyLevel>
        <!-- <OrgStructureChartNewHierarchy/> -->
        <!-- Assign User Base Level Chart -->
        <!-- <AssignUserBasePermDeptOnOrgChat
            @close="closingPopupAssignPosId"
            v-if="openDialogDeptEmpMgtAssign"
        /> -->
    </div>
</template>

<!-- Manage Global Org-Strictures Of Board Mgt Project-->
<script>
import OrgStructureChartGeoFenceHierarchyLevel from "../../../../../components/org_chart_structures/org_structures_chart_geofence/OrgStructureChartGeoFenceHierarchyLevel";
// import AssignUserBasePermDeptOnOrgChat from "../management_org_structure_geo_perm/manage_geo_perm_dept_mgt_board/AssignUserBasePermDeptOnOrgChat.vue";
// import OrgStructureChartNewHierarchy from "../../../../../components/org_chart_structures/org_structure_chart_new_hierarchy/OrgStructureChartNewHierarchy";

export default {
    components: {
        // OrgStructureChartNewHierarchy,
        OrgStructureChartGeoFenceHierarchyLevel,
        // AssignUserBasePermDeptOnOrgChat,
    },
    props: {
        orgData: {
            type: Object,
            require: true,
            default: () => {},
        },
        projectIdOrdDeptBoard: {
            type: Number,
            require: true,
            default: () => 0,
        },
    },
    data() {
        return {
            openDialogDeptEmpMgtAssign: false,
            selection: {},
            dataHierarchyDept: {
                id: "1",
                name: "GEO-KHM-01",
                department: "Yearly Meeting",
                position: "",
                profile: "",
                children: [
                    {
                        id: "2",
                        name: "GEO-KHM-02",
                        department: "Board Committee",
                        position: "Secretary",
                        children: [
                            {
                                id: "3",
                                name: "GEO-KHM-03",
                                department: "Director",
                                position: "",
                                children: [
                                    {
                                        id: "5",
                                        name: "GEO-KHM-05",
                                        department: "Admin",
                                        position: "",
                                        children: [
                                            {
                                                id: "5.1",
                                                name: "GEO-KHM-001",
                                                department: "D1",
                                                position: "",
                                            },
                                            {
                                                id: "5.2",
                                                name: "GEO-KHM-002",
                                                department: "D2",
                                                position: "",
                                            },
                                        ],
                                    },
                                    {
                                        id: "6",
                                        name: "GEO-KHM-06",
                                        department: "Finance",
                                        position: "",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        };
    },
    computed: {
        getConvertArrayToObject() {
            let object = {};
            this.orgData.forEach((item) => {
                object = Object.assign({}, item ? item : {});
            });
            return object;
        },
    },
    methods: {
        selectNode(nodeData) {
            console.log(nodeData);
            this.openDialogDeptEmpMgtAssign = true;
        },
        closingPopupAssignPosId() {
            this.openDialogDeptEmpMgtAssign = false;
        },
    },
};
</script>
