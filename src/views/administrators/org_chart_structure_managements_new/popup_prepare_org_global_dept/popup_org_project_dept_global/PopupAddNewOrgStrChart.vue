<template>
    <div>
        <Dialog
            v-model:visible="openDialogs"
            modal
            header="Org Chart Structure Management"
            :style="{ width: '90rem' }"
            maximizable
            closeOnEscape="true"
        >
            <!-- Contents -->
            <div class="address-popup popup-top-auto z-100">
                <div class="flex start mlr--5 grid grid-nogutter">
                    <!-- Tree View of Org-chart Projects -->
                    <div class="col-lg-5 col-md-12 flex column h-full">
                        <tree-view-org-structure-project />
                    </div>
                    <!-- Tab of view org-chart  of projects -->
                    <div class="col-lg-7 col-md-12 flex column h-full">
                        <TabView
                            v-model:activeIndex="activeDialogPositionId"
                            class="text-sm"
                        >
                            <!-- Org-structure managements -->
                            <TabPanel header="Edit Structure Management">
                                <edit-org-structure-management-base-projects />
                            </TabPanel>
                            <!--Managements Position-->
                            <TabPanel header="Positions">
                                <AssignPositionManageOrgStructure />
                            </TabPanel>
                            <!--Managements Job Descriptions-->
                            <TabPanel header="Job Description">
                                <AssignJobDescriptionManageOrgStructure />
                            </TabPanel>
                            <!--Managements Job Descriptions-->
                            <TabPanel header="Position Descriptions">
                                <AssignPositionDescriptionManageOrgStructure />
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
</template>

<!-- Popup Edit Org-Structure-->
<script>
import TreeViewOrgStructureProject from "./manage_org_structure_sub/TreeViewOrgStructureProjectChart";
import EditOrgStructureManagementBaseProjects from "./manage_org_structure_sub/EditOrgStructureManagementBaseProjectChart";
import AssignPositionManageOrgStructure from "./manage_org_structure_sub/AssignPositionManageOrgStructure";
import AssignJobDescriptionManageOrgStructure from "./manage_org_structure_sub/AssignJobDescriptionsManageOrgStructure";
import AssignPositionDescriptionManageOrgStructure from "./manage_org_structure_sub/AssignPositionDescriptionManageOrgStructure";
export default {
    components: {
        TreeViewOrgStructureProject,
        EditOrgStructureManagementBaseProjects,
        AssignPositionManageOrgStructure,
        AssignJobDescriptionManageOrgStructure,
        AssignPositionDescriptionManageOrgStructure,
    },
    props: {
        editedId: Number,
        dialog: Boolean,
    },
    computed: {
        openDialogs() {
            return this.dialog;
        },
    },
    data() {
        return {
            activeDialogPositionId: 0,
        };
    },
    created() {},
    methods: {
        close() {
            this.$emit("close-dialog");
        },
    },
};
</script>
