<template>
    <div class="gap-3 my-4 flex justify-content-center">
        <OrgStructureChartGeoFenceHierarchyLevel
            :datasource="ds"
            @node-click="selectNode"
        >
            <template v-slot="{ nodeData }">
                <b @click="selectNode(nodeData)">{{ nodeData.name }}</b>
            </template>
        </OrgStructureChartGeoFenceHierarchyLevel>
        <!-- Assign User Base Level Chart -->
        <AssignUserBasePermDeptOnOrgChat
            @close="closingPopupEditedAssEmpMgtBoard"
            v-if="openDialogDeptEmpMgtAssign"
        />
    </div>
</template>

<!-- Manage Global Org-Strictures Of Board Mgt Project-->
<script>
import OrgStructureChartGeoFenceHierarchyLevel from "../../../../../components/org_chart_structures/org_structures_chart_geofence/OrgStructureChartGeoFenceHierarchyLevel";
import AssignUserBasePermDeptOnOrgChat from "../management_org_structure_geo_perm/manage_geo_perm_dept_mgt_board/AssignUserBasePermDeptOnOrgChat.vue";
export default {
    components: {
        OrgStructureChartGeoFenceHierarchyLevel,
        AssignUserBasePermDeptOnOrgChat,
    },
    props: {
        orgData: {
            type: Array,
            require: true,
            default: () => [],
        },
    },
    data() {
        return {
            openDialogDeptEmpMgtAssign: false,
            selection: {},
            ds: {
                id: "1",
                name: "Panha",
                department: "general manager",
                profile: '',
                children: [
                    {
                        id: "2",
                        name: "Bo Miao",
                        department: "department manager",
                    },
                    {
                        id: "3",
                        name: "Su Miao",
                        department: "department manager",
                        position: "IT Manager",
                        children: [
                            {
                                id: "4",
                                name: "Tie Hua",
                                department: "senior engineer",
                                position: "position",
                            },
                            {
                                id: "5",
                                name: "Hei Hei",
                                department: "senior engineer",
                                children: [
                                    {
                                        id: "6",
                                        name: "Pang Pang",
                                        department: "engineer",
                                        position: "position",
                                    },
                                    {
                                        id: "7",
                                        name: "Xiang Xiang",
                                        department: "UE engineer",
                                        position: "position",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        };
    },
    methods: {
        selectNode(nodeData) {
            console.log(nodeData);
            this.openDialogDeptEmpMgtAssign = true;
        },
        closingPopupEditedAssEmpMgtBoard() {
            this.openDialogDeptEmpMgtAssign = false;
        },
    },
};
</script>
