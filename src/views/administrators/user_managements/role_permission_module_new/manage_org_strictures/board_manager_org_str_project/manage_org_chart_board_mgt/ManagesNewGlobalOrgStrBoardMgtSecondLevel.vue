<template>
    <KeepAlive>
        <div class="pl-2 gap-2 flex align-items-center justify-content-center">
            <Button
                aria-label="Add Position By Country"
                class="border-round-lg w-1rem h-1rem"
                icon="pi pi-plus"
                outlined
                @click="showDialogAddNewGloOrgStrBoardMgt()"
            />
        </div>
    </KeepAlive>
    <!-- Dialogs Add New Mgt Board Org-->
    <Dialog
        v-model:visible="visibleDialogOrgStrBoard"
        maximizable
        modal
        :style="{ width: '80rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <template #header>
            <div
                class="inline-flex align-items-center justify-content-center gap-2"
            >
                <span class="font-bold white-space-nowrap">
                    Manage Org-Structure Second Level
                </span>
            </div>
        </template>
        <!-- Form Submitted -->
        <div
            class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
        >
            <div class="pop-over-content p-20 p-sm-15 card">
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <!--Add New Org-Structure Board Mgt-->
                        <PopupAddNewGlobalOgStrBoardMgtSecondLevel
                            ref="addNewGlobalOgStrBoardMgtSecondLevelRef"
                            :orgDataRootLevel="
                                orgRootLevelData ? orgRootLevelData : {}
                            "
                            :deptOrgStrRootLevelId="
                                getRootParentLevelId ? getRootParentLevelId : 0
                            "
                            :deptSecondLevelProjectId="
                                getRootProjectId ? getRootProjectId : 0
                            "
                            :deptCountrySecondLevelId="
                                getRootCountryId ? getRootCountryId : 0
                            "
                        />
                        <!-- Edit Org-structure Board Parent Level 02 -->
                        <PopupEditParentLevel01BoardDeptOrgChart
                            v-if="openEditDialogSecondLevel"
                            :openEditBoardParentLevel="
                                dataEditSecondLevel ? dataEditSecondLevel : null
                            "
                            @close="closingPopupEditedSecondMgtStrDialogs"
                        />
                    </div>
                </div>
                <!-- Add Manage Org Chat-Multiple Level 02 -->
                <div
                    class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 card border-round gap-15"
                >
                    <DataTable
                        :value="getAllDeptOrgStrBoardSecondLevel"
                        class="p-datatable-scrollable text-sm"
                        :rowHover="true"
                        contextMenu
                        :rows="10"
                        dataKey="id"
                        :paginator="true"
                        responsiveLayout="scroll"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} org-structure"
                    >
                        <!-- Search Input Filter -->
                        <template #header>
                            <div
                                class="flex flex-wrap justify-content-between gap-2"
                            >
                                <p>Org Structure</p>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText
                                        v-model="
                                            filtersDeptPosMgt['global'].value
                                        "
                                        placeholder="Search org-structure data"
                                    />
                                </span>
                            </div>
                        </template>
                        <!-- Empty Org-Structure -->
                        <template #empty>No data org-structure...</template>
                        <!-- Loading Org-Structure Data -->
                        <template #loading>
                            Loading org-structure data. Please wait...
                        </template>
                        <Column
                            field="orgStrDeptName"
                            header="English Name"
                            style="width: 25%"
                        ></Column>
                        <Column
                            field="orgStrDeptKhmerName"
                            header="Khmer Name"
                            style="width: 25%"
                        ></Column>
                        <!-- Action Org-Str Dept -->
                        <Column
                            header="Actions"
                            :exportable="false"
                            :styles="{ 'min-width': '8rem' }"
                        >
                            <template #body="slotProps">
                                <Button
                                    icon="pi pi-pencil"
                                    outline
                                    class="p-button-rounded p-button-success mr-2"
                                    @click="
                                        editManageOrgStrBoardMgt(
                                            slotProps?.data
                                        )
                                    "
                                />
                                <Button
                                    icon="pi pi-trash"
                                    outline
                                    class="p-button-rounded p-button-warning"
                                    @click="
                                        confirmRemoveOrgStrBoardById(
                                            slotProps?.data
                                        )
                                    "
                                />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
        <template #footer>
            <Button
                label="Cancel"
                class="w-6rem"
                @click="cancelAddNewOrgStrBoardMgt()"
                outlined
            />
        </template>
    </Dialog>
    <!-- Popup Deleted Global Level Org-Structure -->
    <Dialog
        v-model:visible="deletedDialogLevelSecondMgt"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
    >
        <div class="confirmation-content">
            <i
                class="pi pi-exclamation-triangle mr-3"
                style="font-size: 2rem"
            />
            <span>Are you sure you want to delete</span>
        </div>
        <template #footer>
            <Button
                label="No"
                icon="pi pi-times"
                text
                @click="deletedDialogLevelSecondMgt = false"
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                @click="
                    confirmDeletedBoardMgtSecondLevelOrgStr(dataRemoveSecondLevel)
                "
            />
        </template>
    </Dialog>
</template>
<!-- Script of global-org-str-board-mgt -->
<script>
import PopupEditParentLevel01BoardDeptOrgChart from "./popup_add_org_chart_boat_mgt/PopupEditParentLevel01BoardDeptOrgChart.vue";
import PopupAddNewGlobalOgStrBoardMgtSecondLevel from "./popup_add_org_chart_board_mgt_second_level/PopupAddNewGlobalOgStrBoardMgtSecondLevel";
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";
import manageOrgChartBoardMgtSecondLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtSecondHelper";
import manageGlobalOrgChartMgt from "@/mixin/manage_geo_org_str/manageGlobalOrgChartStructure";
import { FilterMatchMode } from "primevue/api";
export default {
    components: {
        PopupAddNewGlobalOgStrBoardMgtSecondLevel,
        PopupEditParentLevel01BoardDeptOrgChart,
    },
    props: {
        orgRootLevelData: {
            type: Object,
            required: true,
            default: () => {},
        },
        secondBoardMgtLevelProId: {
            type: Number,
            required: true,
            default: 0,
        },
        secondBoardMgtLevelCountryId: {
            type: Number,
            required: true,
            default: 0,
        },
        secondBoardMgtLevelParentLevelId: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    mixins: [
        manageOrgChartBoardMgtLevelHelper,
        manageOrgChartBoardMgtSecondLevelHelper,
        manageGlobalOrgChartMgt,
    ],
    data() {
        return {
            visibleDialogOrgStrBoard: false,
            filtersDeptPosMgt: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
        };
    },
    computed: {
        getRootParentLevelId() {
            const getRootLevelId = this.secondBoardMgtLevelParentLevelId
                ? this.secondBoardMgtLevelParentLevelId
                : 0;
            if (
                getRootLevelId !== null ||
                (getRootLevelId !== 0 && getRootLevelId > 0)
            ) {
                return getRootLevelId ? getRootLevelId : 0;
            }
            return getRootLevelId ? getRootLevelId : 0;
        },
        getRootCountryId() {
            const getRootLevelCountryId = this.secondBoardMgtLevelCountryId
                ? this.secondBoardMgtLevelCountryId
                : 0;
            if (
                getRootLevelCountryId !== null ||
                (getRootLevelCountryId !== 0 && getRootLevelCountryId > 0)
            ) {
                return getRootLevelCountryId ? getRootLevelCountryId : 0;
            }
            return getRootLevelCountryId ? getRootLevelCountryId : 0;
        },
        getRootProjectId() {
            const getRootLevelProjectId = this.secondBoardMgtLevelProId
                ? this.secondBoardMgtLevelProId
                : 0;
            if (
                getRootLevelProjectId !== null ||
                (getRootLevelProjectId !== 0 && getRootLevelProjectId > 0)
            ) {
                return getRootLevelProjectId ? getRootLevelProjectId : 0;
            }
            return getRootLevelProjectId ? getRootLevelProjectId : 0;
        },
    },
    methods: {
        showDialogAddNewGloOrgStrBoardMgt() {
            this.visibleDialogOrgStrBoard = true;
        },
        cancelAddNewOrgStrBoardMgt() {
            this.visibleDialogOrgStrBoard = false;
        },
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
