<template>
    <!--Manage Department Base Positions-->
    <div class="gird">
        <div class="col-12">
            <DialogAddPositionByDepartmentCountry />
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
        tableData: Array,
    },
    components: {
        VTreeView,
        DialogAddPositionByDepartmentCountry,
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
