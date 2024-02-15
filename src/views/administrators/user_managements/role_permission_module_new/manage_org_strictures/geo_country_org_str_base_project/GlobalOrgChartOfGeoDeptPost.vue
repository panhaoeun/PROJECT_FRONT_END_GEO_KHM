<template>
    <div class="gap-3 my-4 flex justify-content-center">
        <OrgStructureChartGeoFenceHierarchyLevel
            :datasource="dataHierarchyDept"
            pan="true"
            @node-click="selectNode"
        >
            <template v-slot="{ nodeData }">
                <b @click="selectNode(nodeData)">{{ nodeData.name }}</b>
            </template>
        </OrgStructureChartGeoFenceHierarchyLevel>
        <!-- <OrgStructureChartNewHierarchy/> -->
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
// import OrgStructureChartNewHierarchy from "../../../../../components/org_chart_structures/org_structure_chart_new_hierarchy/OrgStructureChartNewHierarchy";

export default {
    components: {
        // OrgStructureChartNewHierarchy,
        OrgStructureChartGeoFenceHierarchyLevel,
        AssignUserBasePermDeptOnOrgChat,
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
                name: "GEO-KHRM",
                department: "Governing Board",
                position: "Directed",
                profile: "",
                children: [
                    {
                        id: "2",
                        name: "Bo Miao",
                        department: "National Congress",
                        position: "Secretary",
                    },
                    {
                        id: "3",
                        name: "Su Miao",
                        department: "Provincial Labor Support Council",
                        position: "IT Manager",
                        children: [
                            {
                                id: "4",
                                name: "Tie Hua",
                                department: "President",
                                position: "",
                            },
                            {
                                id: "5",
                                name: "Hei Hei",
                                department: "President",
                                children: [
                                    {
                                        id: "6",
                                        name: "Pang Pang",
                                        department: "Communication Specialist",
                                        position: "",
                                    },
                                    {
                                        id: "7",
                                        name: "Mr.Bao",
                                        department: "Operations Specialist",
                                        position: "",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "8",
                        name: "Geo",
                        department: "National Congress",
                        children: [
                            {
                                id: "9",
                                name: "Phil Acreas",
                                department: "Operations Director",
                                position: "",
                            },
                            {
                                id: "10",
                                name: "Debby Lethem",
                                department: "Program Director",
                                position: "",
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
                let children = item.children;
                object[item.id] = item;
                object[item.id].children = {};
                children.forEach((child) => {
                    object[item.id].children[child.id] = child;
                });
            });
            const result = Object.fromEntries(
                Object.entries(object).map(([key, { value }]) => [key, value])
            );
            console.log(result);
            return object;
        },
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
