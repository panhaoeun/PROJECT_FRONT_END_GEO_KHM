<template>
    <div class="gap-3 my-4 flex justify-content-center flex-column">
        <org-structure-chart-geo-fence-hierarchy-level
            :datasource="
                getConvertArrayToObjectBaseProject
                    ? getConvertArrayToObjectBaseProject
                    : {}
            "
            pan="true"
            @node-click="selectNode"
            :org-main-name="orgStrMainName? orgStrMainName : null"
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
        };
    },
    props: {
        orgStrMainName: {
            type: String,
            require: true,
            default: () => null,
        },
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
            console.log(nodeData);
            this.openDialogAssignContentMenu = true;
        },
        closingPopupAssignPosId() {
            this.openDialogAssignContentMenu = false;
        },
    },
};
</script>
