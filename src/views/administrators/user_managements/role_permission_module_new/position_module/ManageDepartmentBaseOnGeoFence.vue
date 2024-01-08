<template>
    <!--Manage Department Base Positions-->
    <div class="gird">
        <div class="col-12">
            <!--Define Position of Hierarchy -->
            <div
                class="pl-2 gap-2 flex align-items-center justify-content-center"
            >
                <Button
                    aria-label="Add Departments"
                    class="border-round-lg w-2rem h-2rem"
                    icon="pi pi-plus"
                    outlined
                />
            </div>
            <!-- Tree Views -->
            <v-tree-view :data="data" highlight-current default-expand-all />
            <!-- Tree Views -->
        </div>
    </div>
</template>

<!-- Script of JS -->
<script type="module">
// import { TreeData } from "@/utils/tree_view/typeDataTree";
import VTreeView from "@/components/tree_view_items/TreeViewComponents.vue";
export default {
    props: {
        tableData: Array,
    },
    components: {
        VTreeView,
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
