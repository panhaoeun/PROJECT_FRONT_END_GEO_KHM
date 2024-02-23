<template>
    <!-- Confirm Dialogs -->
    <ConfirmPopup id="confirm" aria-label="popup" />
    <Toast />
    <div>
        <Dialog
            v-model:visible="openDialogs"
            modal
            header="Org Chart Structure Management"
            :style="{ width: '90rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            maximizable
        >
            <!-- Contents -->
            <div class="address-popup popup-top-auto z-100">
                <div class="flex start mlr--5 grid grid-nogutter">
                    <!-- Tree View of Org-chart Projects -->
                    <div
                        class="col-lg-5 col-md-12 flex column h-full org-structure-new"
                    >
                        <div class="start mlr--1">
                            <!-- Add Root Nodes-->
                            <div class="gap-2 px-2 py-2">
                                <Button
                                    label="Root Node"
                                    icon="pi pi-sitemap"
                                    @click.prevent="
                                        openDialogsAddNewRootNodeOrgStr()
                                    "
                                    class="w-8rem h-2rem text-sm"
                                    severity="secondary"
                                />
                                <!-- Dialogs of Org-Structures Root Node-->
                                <popup-add-root-node-global-org-structure
                                    :dialog="visibleDialogsRootNodeOrgStr"
                                    @close-dialog="closeDialogRotNodeOrgStr()"
                                    :org-structure-level="
                                        orgStructureLevel
                                            ? orgStructureLevel
                                            : ''
                                    "
                                    :org-structure-geo-id="
                                        orgStructureGeoId
                                            ? orgStructureGeoId
                                            : 0
                                    "
                                    :rootNodeProId="projectId ? projectId : 0"
                                />
                            </div>
                            <!-- Tree Vew -->
                            <div class="px-2 py-2 gap-5">
                                <VTreeView
                                    :data="
                                        getAllBoardManagerOfProjectOrgStructureChart01
                                            ? getAllBoardManagerOfProjectOrgStructureChart01
                                            : {}
                                    "
                                    highlight-current="true"
                                    default-expand-all
                                    @item-click="
                                        onClickItemOrgStructureTreeView
                                    "
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
                            <!-- Context Menu Right  Click on the tree view -->
                            <ContextMenu
                                ref="contextMenu"
                                :model="contextMenu"
                                class="w-15rem"
                            />
                            <!-- Context Menu Click on the tree view -->
                            <ContextMenu ref="menuClick" :model="menuClick" />
                        </div>
                    </div>
                    <!-- Tab of view org-chart  of projects -->
                    <div class="col-lg-7 col-md-12 flex column h-full">
                        <TabView
                            v-model:activeIndex="activeDialogPositionId"
                            class="text-sm"
                        >
                            <!-- Org-structure managements -->
                            <TabPanel header="Edit Structure Management">
                                <edit-org-structure-management-base-projects
                                    :edit-org-str-data="
                                        prepareObjEditOrgStrId
                                            ? prepareObjEditOrgStrId
                                            : null
                                    "
                                />
                            </TabPanel>
                            <!--Managements Position-->
                            <TabPanel
                                header="Positions"
                                v-if="orgStrNameEditedId"
                            >
                                <assign-position-manage-org-structure
                                    :org-str-name-edited-id="
                                        orgStrNameEditedId
                                            ? orgStrNameEditedId
                                            : null
                                    "
                                />
                            </TabPanel>
                            <!--Managements Job Descriptions-->
                            <TabPanel
                                header="Job Description"
                                v-if="orgStrNameEditedId"
                            >
                                <assign-job-description-manage-org-structure
                                    :org-str-name-edited-id="
                                        orgStrNameEditedId
                                            ? orgStrNameEditedId
                                            : null
                                    "
                                />
                            </TabPanel>
                            <!--Managements Job Descriptions-->
                            <TabPanel
                                header="Position Descriptions"
                                v-if="orgStrNameEditedId"
                            >
                                <assign-position-description-manage-org-structure
                                    :org-str-name-edited-id="
                                        orgStrNameEditedId
                                            ? orgStrNameEditedId
                                            : null
                                    "
                                />
                            </TabPanel>
                        </TabView>
                    </div>
                </div>
            </div>
            <!-- Footers -->
            <template #footer>
                <Button
                    label="Cancel"
                    text
                    class="w-7rem"
                    severity="secondary"
                    @click.prevent="close"
                    autofocus
                />
            </template>
        </Dialog>
    </div>
    <!-- Deleted Dialogs Confirmations-->
    <Dialog
        v-model:visible="deletedDialogsOrgStructure"
        :style="{ width: '510px' }"
        :header="'Delete' + '\t' + getOrgName"
        :modal="true"
    >
        <div class="confirmation-content">
            <div
                class="flex flex-row align-items-center surface-overlay border-round"
            >
                <div
                    class="border-circle bg-primary inline-flex justify-content-center align-items-center h-2rem w-2rem mr-2"
                >
                    <i class="pi pi-question" style="font-size: 1rem" />
                </div>

                <span class="font-bold text-xl block mb-2 mt-4"
                    >Are you sure that you want to delete
                    {{ String(getOrgName).toString() }}</span
                >
            </div>
        </div>
        <template #footer>
            <Button
                label="No"
                icon="pi pi-times"
                outlined
                text
                @click="deletedDialogsOrgStructure = false"
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                outlined
                text
                @click="confirmRemoveOrgStructureDatByIdGlobal()"
            />
        </template>
    </Dialog>
</template>

<!-- Popup Edit Org-Structure-->
<script>
// import TreeViewOrgStructureProject from "./manage_org_structure_sub/TreeViewOrgStructureProjectChart";
import EditOrgStructureManagementBaseProjects from "./manage_org_structure_sub/EditOrgStructureManagementBaseProjectChart";
import AssignPositionManageOrgStructure from "./manage_org_structure_sub/AssignPositionManageOrgStructure";
import AssignJobDescriptionManageOrgStructure from "./manage_org_structure_sub/AssignJobDescriptionsManageOrgStructure";
import AssignPositionDescriptionManageOrgStructure from "./manage_org_structure_sub/AssignPositionDescriptionManageOrgStructure";
// TreeView OrgStructure
import VTreeView from "@/components/tree_view_items/TreeViewComponents";
// Functions Toggle the global organization structure tree view component
import managerOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageOrgStructureChartProjectLevelZeroHelper";
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";
import managerPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/managePositionOrgStructureChartProjectLevelZeroHelper";
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
/**
 * @Assign Root Node Level to organization-structures
 * */
import popupAddRootNodeGlobalOrgStructure from "@/components/org_chart_structures/org_structures_chart_geofence/OrgStructureAddNewRootNode";
export default {
    components: {
        VTreeView,
        EditOrgStructureManagementBaseProjects,
        AssignPositionManageOrgStructure,
        AssignJobDescriptionManageOrgStructure,
        AssignPositionDescriptionManageOrgStructure,
        popupAddRootNodeGlobalOrgStructure,
    },
    props: {
        editedId: Number,
        dialog: {
            type: Boolean,
            default: false,
            required: true,
        },
        orgStructureLevel: {
            type: String,
            default: null,
            required: true,
        },
        orgStructureGeoId: {
            type: String,
            default: null,
            required: true,
        },
        projectId: {
            type: String,
            default: null,
            required: true,
        },
    },
    computed: {
        openDialogs() {
            return this.dialog ? this.dialog : false;
        },
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
    data() {
        const self = this;
        return {
            activeDialogPositionId: 0,
            visibleDialogsRootNodeOrgStr: false,
            // Org-structure
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
                    self.editingNode = node ? node : null;
                },
            },
            asyncReloadDataOrgStructure(oriNode, resolve) {
                console.log(oriNode, resolve);
            },
            visibleDialogsOrgStr: false,
            getEditObjName: null,
            prepareObjEditOrgStrId: null,
            orgStrNameEditedId: null,
            contextMenu: [
                {
                    label: "Add Child",
                    icon: "pi pi-sitemap",
                    command: () => {
                        this.addChildNodeOrgStructure();
                    },
                },
                {
                    label: "Rename Edit",
                    icon: "pi pi-file-edit",
                    command: () => {
                        this.renameOrgStructureProjectData();
                    },
                },
                {
                    label: "Prepare Org Structure",
                    icon: "pi pi-link",
                    command: () => {
                        this.prepareOrgStructureEdited();
                    },
                },
                {
                    label: "Remove",
                    icon: "pi pi-trash",
                    command: () => {
                        this.removeNodeOrgStructure();
                    },
                },
            ],
            menuClick: [
                {
                    label: "Add Child",
                    icon: "pi pi-trash",
                    command: () => {
                        console.log("dd");
                    },
                },
                {
                    label: "Deleted",
                    icon: "pi pi-trash",
                    command: () => {
                        console.log("ggg");
                    },
                },
            ],
        };
    },
    mixins: [
        managerOrgStructureProjectLevelZeroHelper,
        manageOrgChartBoardMgtLevelHelper,
        managerPositionOrgStructureProjectLevelZeroHelper,
        managerJobPositionOrgStructureProjectLevelZeroHelper,
    ],
    methods: {
        close() {
            this.$emit("close-dialog");
        },
        toggleItemEditOrgStructureName($event, node) {
            // Context Menu
            this.$refs.contextMenu.show($event);
            if (node !== undefined || (node !== "" && node !== null)) {
                this.getEditObjName = node ? node : {};
                this.editingItem = node ? node : {};
            }
        },
        onClickItemOrgStructureTreeView(node) {
            this.editingNode = node;
        },
        closeDialogEditOrgStrName() {
            this.visibleDialogsOrgStr = false;
        },
        closeDialogRotNodeOrgStr() {
            this.visibleDialogsRootNodeOrgStr = false;
        },
        renameOrgStructureProjectData() {
            let newName = this.getEditObjName ? this.getEditObjName : null;
            let getOrgEditName;
            if (
                newName !== null &&
                newName !== "" &&
                typeof newName !== "string"
            ) {
                getOrgEditName = {
                    id: parseInt(newName.id, 0),
                    textName: String(newName?.text).toString(),
                    orgName: String(newName?.value).toString(),
                    orgLevel: String(newName?.orgLevel).toString(),
                    countryId: parseInt(newName?.countryId),
                    subIdOrg: newName?.subIdOrg,
                    superIdOrg: newName?.superIdOrg,
                    projectId: parseInt(newName?.subIdOrg),
                };
            }
            this.prepareObjEditOrgStrId = getOrgEditName ? getOrgEditName : {};
        },
        prepareOrgStructureEdited() {
            let newName = this.getEditObjName ? this.getEditObjName : null;
            let getOrgPrepareEditName;
            if (
                newName !== null &&
                newName !== "" &&
                typeof newName !== "string"
            ) {
                getOrgPrepareEditName = {
                    id: parseInt(newName.id) ?? 0,
                    textName: String(newName?.value).toString(""),
                    orgName: String(newName?.text).toString(),
                    orgLevel: String(newName?.orgLevel).toString(),
                    countryId: parseInt(newName?.countryId),
                    subIdOrg: newName?.subIdOrg,
                    superIdOrg: newName?.superIdOrg,
                    projectId: parseInt(newName?.subIdOrg),
                };
                /**
                 * @Edit Org-Structures and positions for projects
                 * */
                this.getPositionDeptBoardMgtBySuper(parseInt(newName.id) ?? 0);
                this.getJobDescriptionType(
                    parseInt(newName.id) ?? 0,
                    "Department"
                );
                this.getJobDescriptionType(
                    parseInt(newName.id) ?? 0,
                    "Position"
                );
            }
            this.orgStrNameEditedId = getOrgPrepareEditName
                ? getOrgPrepareEditName
                : {};
        },
    },
};
</script>
<!-- Style Custom -->
<style>
.org-structure-new {
    height: 100%;
    border: 2px dashed #aaa;
    border-radius: 5px;
    text-align: center;
}
</style>
