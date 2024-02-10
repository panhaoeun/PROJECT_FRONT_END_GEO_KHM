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
                    Manage Parent Level 01 (Root Level)
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
                        <PopupAddNewParentRootBoardOrgStrMgt
                            :deptProjectIdAddNew="getProjectDeptStrId"
                        />
                        <!-- Edit Org-structure Board Parent Level 01 -->
                        <PopupEditParentLevel01BoardDeptOrgChart
                            v-if="openEditDialogParentLevel"
                            :openEditBoardParentLevel="
                                dataEditParentLevel ? dataEditParentLevel : null
                            "
                            @close="closingPopupEditedBoardMgtStrDialogs"
                        />
                    </div>
                </div>
                <!-- Add Manage Org Chat-Multiple Level -->
                <div
                    class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 card border-round gap-15"
                >
                    <DataTable
                        :value="getAllDeptOrgStrMgtOrg"
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
                                        editManageOrgStrBoardMgtParentLevel(
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
        v-model:visible="deletedDialogLevelRootMgt"
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
                @click="deletedDialogLevelRootMgt = false"
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                @click="confirmDeletedBoardMgtParentLevelOrgStr(deletedMgtLevelId)"
            />
        </template>
    </Dialog>
</template>

<!-- Script of global-org-str-board-mgt parent(Root) -->
<script>
import PopupAddNewParentRootBoardOrgStrMgt from "./popup_add_org_chart_boat_mgt/PopupAddNewParentRootBoardOrgStrMgt";
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";
import PopupEditParentLevel01BoardDeptOrgChart from "./popup_add_org_chart_boat_mgt/PopupEditParentLevel01BoardDeptOrgChart.vue";
import { FilterMatchMode } from "primevue/api";
export default {
    components: {
        PopupAddNewParentRootBoardOrgStrMgt,
        PopupEditParentLevel01BoardDeptOrgChart,
    },
    props: {
        countryIdOrgRoot: {
            type: Number,
            required: true,
            default: 0,
        },
        projectIdOrgRoot: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    data() {
        return {
            visibleDialogOrgStrBoard: false,
            filtersDeptPosMgt: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
        };
    },
    mounted() {
        const orgLevelDeptBoard = "SL01";
        const rogLevelDeptBoardCountry = this.deptCountryId
            ? this.deptCountryId
            : 0;
        const orgLevelDeptBoarProId = this.getProjectDeptStrId
            ? this.getProjectDeptStrId
            : 0;
        const orgDeptSuperId = 0;
        this.fetchingDataGeoOrgChartStructure(
            orgLevelDeptBoard,
            rogLevelDeptBoardCountry,
            orgLevelDeptBoarProId,
            orgDeptSuperId
        );
    },
    computed: {
        getProjectDeptStrId() {
            const getOrgRootId = this.projectIdOrgRoot
                ? this.projectIdOrgRoot
                : 0;
            if (
                getOrgRootId > 0 ||
                (getOrgRootId !== null && typeof getOrgRootId !== "string")
            ) {
                return getOrgRootId ? getOrgRootId : 0;
            }
            return getOrgRootId;
        },
    },
    mixins: [manageOrgChartBoardMgtLevelHelper],
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
