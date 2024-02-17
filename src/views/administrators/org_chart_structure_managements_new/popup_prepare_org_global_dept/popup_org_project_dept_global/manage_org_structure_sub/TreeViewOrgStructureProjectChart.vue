<template>
    <div class="start mlr--5">
        <!-- Button-->
        <div class="gap-5 px-2 py-2">
            <Button
                label="Root Node"
                icon="pi pi-sitemap"
                severity="help"
                @click.prevent="addRootNodeOrgStructure()"
                class="w-8rem h-2rem text-sm mr-2"
            />
            <Button
                label="Child Node"
                icon="pi pi-sitemap"
                @click.prevent="addChildNodeOrgStructure()"
                class="w-8rem h-2rem text-sm"
                severity="secondary"
            />
        </div>
        <!-- Tree Vew -->
        <div class="px-2 py-2 gap-5">
            <VTreeView
                :data="orgChartProjectData"
                highlight-current="true"
                default-expand-all
                @item-click="onClickItemOrgStructureTreeView"
                whole-row
                :itemEvents="itemEvents"
                draggable
                ref="tree"
                show-checkbox
            >
            </VTreeView>
        </div>
        <!-- Open Edit Org-Structure Modal-->
        <popup-edit-global-org-structure
            :dialog="visibleDialogsOrgStr"
            :getDataEditOrgStr="getIdEditOrgStructure"
            @close-dialog="closeDialogEditOrgStrName()"
        />
        <!-- Context Menu -->
        <ContextMenu ref="contextMenu" :model="contextMenu" class="w-15rem" />
    </div>
</template>

<!-- Manage of Tree Vew Org-Structure Chart base on projects -->
<script>
import VTreeView from "@/components/tree_view_items/TreeViewComponents";
import managerOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageOrgStructureChartProjectLevelZeroHelper";
import PopupEditGlobalOrgStructure from "../PopupEditGlobalOrgStructure";
// Functions Toggle the global organization
export default {
    components: {
        VTreeView,
        PopupEditGlobalOrgStructure,
    },
    mixins: [managerOrgStructureProjectLevelZeroHelper],
    props: {
        orgChartStructureData: {
            type: Array,
            required: true,
            default: () => {
                return [];
            },
        },
    },
    data() {
        const self = this;
        return {
            orgChartProjectData: [
                {
                    text: "Yearly Mattings",
                    opened: true,
                    children: [
                        {
                            text: "Director",
                            opened: true,
                            children: [
                                {
                                    text: "Admin",
                                    opened: true,
                                    children: [
                                        {
                                            text: "D1",
                                        },
                                        {
                                            text: "D2",
                                        },
                                    ],
                                },
                                {
                                    text: "Fiance",
                                    opened: true,
                                    children: [
                                        {
                                            text: "D1",
                                        },
                                        {
                                            text: "D2",
                                        },
                                        {
                                            text: "D3",
                                        },
                                    ],
                                },
                                {
                                    text: "Technical",
                                    opened: true,
                                    children: [
                                        {
                                            text: "D1",
                                        },
                                        {
                                            text: "D2",
                                        },
                                        {
                                            text: "D3",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
            editingItem: {},
            editingNode: null,
            getNodeModel: null,
            itemEvents: {
                mouseover: function () {
                    console.log("mouseover");
                },
                contextmenu: function (node) {
                    arguments[2].preventDefault();
                    // Content Menus Edit Dialog
                    self.toggleItemEditOrgStructureName(
                        arguments[2],
                        node?.model
                    );
                },
            },
            visibleDialogsOrgStr: false,
            getEditObjName: null,
            contextMenu: [
                {
                    label: "Rename Edit",
                    icon: "pi pi-file-edit",
                    command: () => {},
                },
                {
                    label: "Prepare Org Structure",
                    icon: "pi pi-link",
                    command: () => {},
                },
            ],
        };
    },
    computed: {
        getIdEditOrgStructure() {
            const getObjData = this.getEditObjName ? this.getEditObjName : null;
            if (
                (getObjData !== null && typeof getObjData !== "object") ||
                getObjData !== undefined
            ) {
                return getObjData;
            }
            return {};
        },
    },
    methods: {
        toggleItemEditOrgStructureName($event, node) {
            // Context Menu
            this.$refs.contextMenu.show($event);
            if (node !== undefined || (node !== "" && node !== null)) {
                this.getEditObjName = node ? node : {};
            }
        },
        onClickItemOrgStructureTreeView(node) {
            this.editingNode = node;
            this.editingItem = node.model;
        },
        closeDialogEditOrgStrName() {
            this.visibleDialogsOrgStr = false;
        },
    },
};
</script>
