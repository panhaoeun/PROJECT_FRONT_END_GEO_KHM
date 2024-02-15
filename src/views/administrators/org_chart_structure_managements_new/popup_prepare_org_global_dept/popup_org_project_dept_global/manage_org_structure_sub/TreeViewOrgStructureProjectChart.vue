<template>
    <div class="start mlr--5">
        <!-- Button-->
        <div class="gap-5 px-2 py-2">
            <Button
                label="Root"
                icon="pi pi-sitemap"
                @click.prevent="addRootOrgStructure()"
                class="w-7rem h-2rem text-sm"
            />
        </div>
        <!-- Tree Vew -->
        {{ editingItem }}
        <div class="px-2 py-2 gap-5">
            <VTreeView
                :data="orgChartProjectData"
                highlight-current="true"
                default-expand-all
                @item-click="onClickItemOrgStructureTreeView"
                whole-row
                allow-batch
                :itemEvents="itemEvents"
                draggable
            >
            </VTreeView>
        </div>
    </div>
</template>
<!-- Manage of Tree Vew Org-Structure Chart base on projects -->
<script>
import VTreeView from "@/components/tree_view_items/TreeViewComponents.vue";
export default {
    components: {
        VTreeView,
    },
    props: {},
    data() {
        return {
            orgChartProjectData: [
                {
                    text: "Same but with checkboxes",
                    children: [
                        {
                            text: "initially selected",
                            selected: true,
                            children: [
                                {
                                    text: "initially selected",
                                    selected: true,
                                },
                            ],
                        },
                        {
                            text: "custom icon",
                            icon: "fa fa-warning icon-state-danger",
                        },
                        {
                            text: "initially open",
                            icon: "fa fa-folder icon-state-default",
                            opened: true,
                            children: [
                                {
                                    text: "Another node",
                                },
                            ],
                        },
                        {
                            text: "custom icon",
                            icon: "fa fa-warning icon-state-warning",
                        },
                        {
                            text: "disabled node",
                            icon: "fa fa-check icon-state-success",
                            disabled: true,
                        },
                    ],
                },
            ],
            editingItem: {},
            editingNode: null,
            itemEvents: {
                mouseover: function () {
                    console.log("mouseover");
                },
                contextmenu: function () {
                    console.log(arguments[2]);
                    arguments[2].preventDefault();
                    console.log("contextmenu");
                },
            },
        };
    },
    created() {},
    methods: {
        onClickItemOrgStructureTreeView(node) {
            this.editingNode = node;
            this.editingItem = node.model;
        },
        addRootOrgStructure() {
            if (this.editingItem.id !== undefined) {
                console.log(this.editingItem.addBefore);
                this.editingItem.addBefore(
                    {
                        text: this.editingItem.text + " before",
                    },
                    this.editingNode
                );
            }
        },
    },
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
