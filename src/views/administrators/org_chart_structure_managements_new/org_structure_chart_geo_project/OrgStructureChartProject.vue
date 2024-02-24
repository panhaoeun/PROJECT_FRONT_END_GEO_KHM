<template>
    <div class="gap-3 my-4 flex justify-content-center">
        <org-structure-chart-geo-fence-hierarchy-level
            :assign-org-str-data="getOrgDataAssign ? getOrgDataAssign : null"
            :datasource="
                getConvertArrayToObjectBaseProject
                    ? getConvertArrayToObjectBaseProject
                    : {}
            "
            pan="true"
            @node-click="selectNode"
        >
            <template v-slot="{ nodeData }">
                <b @click="selectNode(nodeData)">{{ nodeData.name }}</b>
            </template>
        </org-structure-chart-geo-fence-hierarchy-level>
    </div>
</template>

<!-- Manage Global Org-Strictures Of Board Mgt Project-->
<script>
import OrgStructureChartGeoFenceHierarchyLevel from "@/components/org_chart_structures/org_structures_chart_geofence/OrgStructureChartGeoFenceHierarchyLevel";
export default {
    components: {
        OrgStructureChartGeoFenceHierarchyLevel,
    },
    data() {
        return {
            openDialogAssignContentMenu: false,
            getOrgDataAssign: null
        };
    },
    props: {
        orgDataStrProjects: {
            type: Object,
            require: true,
            default: () => {},
        },
        projectIdOrgStructSelected: {
            type: Number,
            require: true,
            default: () => 0,
        },
    },
    computed: {
        getConvertArrayToObjectBaseProject() {
            let object = {};
            this.orgDataStrProjects.forEach((item) => {
                object = Object.assign({}, item ? item : {});
            });
            return object;
        },

        getBoardMgtRootProjectId() {
            const getProjectIdDept = this.manageRootBoardProjectId
                ? this.manageRootBoardProjectId
                : 0;
            if (
                !getProjectIdDept ||
                (getProjectIdDept > 0 && getProjectIdDept !== null)
            ) {
                return getProjectIdDept ? getProjectIdDept : 0;
            }
            return getProjectIdDept;
        },
    },
    methods: {
        selectNode(nodeData) {
            this.openDialogAssignContentMenu = true;
            this.getOrgDataAssign = nodeData ? nodeData : {};
        },
        closingPopupAssignPosId() {
            this.openDialogAssignContentMenu = false;
        },
    },
};
</script>
