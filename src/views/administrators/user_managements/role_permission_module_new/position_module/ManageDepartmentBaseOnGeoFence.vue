<template>
    <!--Manage Department Base Positions-->
    <div class="gird">
        <div class="col-12">
            <DialogAddPositionByDepartmentCountry
                :deptProjectId="projectId ? projectId : 0"
                :deptCountryId="
                    getCountryDeptOrgStrId ? getCountryDeptOrgStrId : 0
                "
            />
            <!-- Tree Views -->
            <v-tree-view
                :data="data"
                highlight-current="true"
                default-expand-all
            />
            <!-- Tree Views -->
        </div>
    </div>
</template>

<!-- Script of JS -->
<script type="module">
import VTreeView from "@/components/tree_view_items/TreeViewComponents.vue";
import DialogAddPositionByDepartmentCountry from "./dialogs_departments_country/dialogs_position_by_department_country/DialogsAddPositionByDepartmentCountry";
export default {
    props: {
        tableGeoOrgStrDeptData: {
            type: Array,
            default: () => [],
        },
        projectId: {
            type: Number,
            default: 0,
        },
        geoFenceLocationId: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        getCountryDeptOrgStrId() {
            return parseInt(this.geoFenceLocationId)
                ? parseInt(this.geoFenceLocationId)
                : 0;
        },
        getProjectDeptOrgStrId() {
            return parseInt(this.projectId) ? parseInt(this.projectId) : 0;
        },
    },
    components: {
        VTreeView,
        DialogAddPositionByDepartmentCountry,
    },
    data() {
        return {
            dialogFormVisible: false,
            data: []
        };
    },
    methods: {},
};
</script>
