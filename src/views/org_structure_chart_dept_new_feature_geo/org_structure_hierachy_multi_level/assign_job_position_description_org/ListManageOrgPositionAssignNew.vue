<template>
    <DataTable
        v-model:section="selectedPositionData"
        :value="getPositionBaseDeptLevelProject"
        :paginator="true"
        filterDisplay="menu"
        dataKey="id"
        :rows="10"
        class="p-datatable-scrollable text-sm"
        removableSort
        tableStyle="min-width: 50rem"
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 100]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} positions"
    >
        <!-- Data Table Header -->
        <template #header>
            <div
                class="flex flex-wrap gap-2 align-items-center justify-content-between"
            >
                <!-- Search Products -->
                <p class="justify-content-center font-bold">List Positions</p>
                <span
                    class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0"
                >
                    <i class="pi pi-search" />
                    <InputText
                        v-model="filtersDataPositionData['global'].value"
                        class="p-inputtext p-component w-full text-sm"
                        placeholder="Search positions..."
                    />
                </span>
            </div>
        </template>
        <!-- Empty Positions -->
        <template #empty>Empty position for org-structure</template>
        <!-- Loading Positions -->
        <template #loading>
            Loading position for org-structure data. Please wait...
        </template>
        <!--------------Columns----------->
        <Column
            field="positionKhmerName"
            header="Khmer Name"
            sortable
            style="width: 30%"
        >
            <template #body="{ data }">
                <span
                    v-if="
                        data?.positionKhmerName !== null &&
                        data?.positionKhmerName !== undefined
                    "
                >
                    {{
                        String(data?.positionKhmerName).toString() || "N/A"
                    }}</span
                >
            </template>
        </Column>
        <Column
            field="deptPosName"
            header="English Name"
            sortable
            style="width: 30%"
        >
            <template #body="{ data }">
                <span> {{ String(data?.deptPosName).toString() }}</span>
            </template>
        </Column>
        <!-- Actions Buttons -->
        <Column
            headerStyle="width: 15rem; text-align: center; alignment-item:center;"
            :header="$t('route.action')"
            bodyStyle="text-align: center; overflow: visible"
        >
            <template #body="{ data }">
                <div class="flex flex-wrap gap-2">
                    <Button
                        icon="pi pi-briefcase"
                        severity="help"
                        outlined
                        rounded
                        class="mr-2"
                        @click.prevent="openDialogAssignTOR(data)"
                    />
                    <Button
                        icon="pi pi-pencil"
                        outlined
                        rounded
                        severity="info"
                        class="mr-2"
                        @click.prevent="editGeoOrgDeptPosStrByPosIdDialog(data)"
                    />
                    <Button
                        icon="pi pi-trash"
                        outlined
                        rounded
                        severity="secondary"
                        class="mr-2"
                        @click="confirmDeletedDeptPosOrgStrById(data)"
                    />
                </div>
            </template>
        </Column>
    </DataTable>
    <!-- Dialogs Position Edited -->
    <open-edited-positions-org-structure
        v-if="openEditedBoardMgtDialogs"
        @close="closingPopupEditedPosIdOrgStrDialogs"
        :open-edit-board-position="
            openEditBoardMgtData ? openEditBoardMgtData : {}
        "
    />
    <!-- Terms of Reference of Positions -->
    <assign-terms-reference-positions
        :dialog="clingAssignTORVisible"
        @close-dialog="clingAssignDialog"
    />
    <!-- Deleted Dialogs Project -->
    <Dialog
        v-model:visible="deletedGeoDeptPosMgtDialogs"
        :style="{ width: '450px' }"
        header="Confirm delete positions base org-structure"
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
                @click="deletedGeoDeptPosMgtDialogs = false"
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                @click="confirmRemoveDeptPosMgtBoardById()"
            />
        </template>
    </Dialog>
    <!-- Dialogs confirm Remove -->
</template>
<!-- Script of list data global positions -->
<script>
import { FilterMatchMode } from "primevue/api";
import managerPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/managePositionOrgStructureChartProjectLevelZeroHelper";
import manageOrgStrMgtPositionHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgStrMgtPositionHelper";
// import OpenEditedPositionsOrgStructure from "../../org_chart_structure_managements_new/popup_prepare_org_global_dept/popup_org_project_dept_global/global_prepare_org_str_dept/EditPositionOrgStructureData.vue";
export default {
    props: {
        positionData: {
            type: Array,
            required: true,
            default: () => {},
        },
    },
    mixins: [
        managerPositionOrgStructureProjectLevelZeroHelper,
        manageOrgStrMgtPositionHelper,
    ],
    data() {
        return {
            deletedGeoDeptPosMgtDialogs: false,
            selectedPositionData: false,
            visibleConfirmRemove: false,
            openedDialogVisiblePos: false,
            assignTORPositionId: null,
            dataObjPosition: null,
            filtersDataPositionData: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            clingAssignTORVisible: false,
        };
    },
    components: {
    },
    methods: {
        clingAssignDialog() {
            this.clingAssignTORVisible = false;
        },
    },
};
</script>
