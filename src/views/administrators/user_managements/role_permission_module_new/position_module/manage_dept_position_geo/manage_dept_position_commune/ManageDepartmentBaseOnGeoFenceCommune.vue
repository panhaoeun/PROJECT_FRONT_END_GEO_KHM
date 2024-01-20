<template>
    <!--Manage Department Base Positions-->
    <div class="gird">
        <div class="col-12">
            <DialogAddPositionByDepartmentProvince
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
import DialogAddPositionByDepartmentProvince from "./DialogsAddPositionByDepartmentComme.vue";
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
        DialogAddPositionByDepartmentProvince,
    },
    data() {
        return {
            dialogFormVisible: false,
            data: [
                {
                    text: "document-01",
                    children: [
                        {
                            text: "文件1",
                            children: [
                                {
                                    text: "文件1",
                                },
                                {
                                    text: "文本3",
                                    children: [
                                        {
                                            text: "文件1",
                                        },
                                        {
                                            text: "文本3",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            text: "文件3",
                        },
                        {
                            text: "文件3",
                        },
                    ],
                },
                {
                    text: "document-02",
                    children: [
                        {
                            text: "document1",
                            children: [
                                {
                                    text: "document-sub-1",
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    methods: {},
};
</script>
