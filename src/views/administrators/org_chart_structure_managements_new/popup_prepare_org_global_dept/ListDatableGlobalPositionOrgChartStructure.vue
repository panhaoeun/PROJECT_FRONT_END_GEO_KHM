<template>
    <DataTable
        v-model:section="selectedPositionData"
        :value="getPositionBaseDept"
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
                <!-- Department of Org-Structures -->
                <div class="justify-content-center font-bold">
                    <div class="flex start mlr--5">
                        <div class="input-wrap mlr-5">
                            <label> Department of org-structures</label>
                            <TreeSelect
                                showClear
                                inputId="geo_english_name"
                                aria-describedby="dd-error"
                                v-model="selectedParentDeptOrStructure"
                                :options="orgStrDataTree"
                                display="comma"
                                @update:modelValue="
                                    selectedParentDeptOrgStrPos(
                                        selectedParentDeptOrStructure
                                    )
                                "
                                placeholder="Selected department of org-structures"
                                class="border-round-lg text-sm w-full md:w-25rem"
                            />
                        </div>
                    </div>
                </div>
                <span
                    class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0"
                >
                    <i class="pi pi-search" />
                    <InputText
                        v-model="filtersDataPositionData['global'].value"
                        class="border-round-lg text-sm w-full md:w-20rem"
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
                        icon="pi pi-pencil"
                        outlined
                        rounded
                        severity="info"
                        class="mr-2"
                        @click.prevent="editGeoPositionDeptOrgStrDialog(data)"
                    />
                    <Button
                        icon="pi pi-trash"
                        outlined
                        rounded
                        severity="secondary"
                        class="mr-2"
                        @click="confirmDialogOrgPositionStructures(data)"
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
            dataEditOrgPositionDes ? dataEditOrgPositionDes : {}
        "
    />
    <!-- Terms of Reference of Positions -->
    <assign-terms-reference-positions
        :dialog="clingAssignTORVisible"
        @close-dialog="clingAssignDialog"
    />
    <!-- Deleted Dialogs Position  By Id -->
    <Dialog
        v-model:visible="deletedGeoDeptPosMgtDialogs"
        :style="{ width: '550px' }"
        :header="'Confirm delete  this positions'"
        :modal="true"
    >
        <div class="confirmation-content flex">
            <i
                class="pi pi-exclamation-triangle mr-3 text-red-500"
                style="font-size: 2rem"
            />
            <span
                >Are you sure you want to delete this position
                <b> {{ getNameRemove }} </b></span
            >
        </div>
        <template #footer>
            <Button
                label="No"
                icon="pi pi-times"
                class="w-10rem"
                severity="secondary"
                text
                @click="deletedGeoDeptPosMgtDialogs = false"
            />
            <Button
                label="Yes"
                severity="danger"
                icon="pi pi-check"
                class="w-10rem"
                :loading="loadingRemoveDeptPos"
                @click="confirmRemoveDeptPositionOrgStr()"
            />
        </template>
    </Dialog>
</template>
<!-- Script of list data global positions -->
<script>
import { FilterMatchMode } from "primevue/api";
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";
import OpenEditedPositionsOrgStructure from "../../org_chart_structure_managements_new/popup_prepare_org_global_dept/popup_org_project_dept_global/global_prepare_org_str_dept/EditPositionOrgStructureData.vue";
import AssignTermsReferencePositions from "./manage_tor_management_prepare/ManagementTORBasePosition.vue";

export default {
    props: {
        positionData: {
            type: Array,
            required: true,
            default: () => {},
        },
        orgStrDataTree: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    mixins: [manageOrgDeptPositionStructuresHelper],
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
            selectedParentDeptOrStructure: null,
            orgDeptStrId: 0,
            dataEditOrgPositionDes: null,
            openEditedPositionDialogs: false,
            dataDeletedOrgBoardPosId: 0,
            getNameRemove: null,
        };
    },
    async mounted() {
        const getPosDeptOrgId = parseInt(this.orgDeptStrId)
            ? parseInt(this.orgDeptStrId)
            : 0;
        this.getAllReloadPositionDeptOrg(getPosDeptOrgId);
    },
    components: {
        OpenEditedPositionsOrgStructure,
        AssignTermsReferencePositions,
    },
    methods: {
        clingAssignDialog() {
            this.clingAssignTORVisible = false;
        },
        // Selected Positions
        selectedParentDeptOrgStrPos(orgDept) {
            try {
                const getSuperParentIdDept = orgDept ? orgDept : null;
                let deptParentOrgStrIdDept;
                if (
                    getSuperParentIdDept !== null ||
                    (getSuperParentIdDept !== undefined &&
                        typeof getSuperParentIdDept !== "object")
                ) {
                    const deptOrgDeptStr = getSuperParentIdDept
                        ? getSuperParentIdDept
                        : {};
                    const keyValId = Object.keys(deptOrgDeptStr)[0];
                    deptParentOrgStrIdDept = keyValId.split(/[,-]+/).pop();
                }
                this.$emit(
                    "org-str-dept",
                    deptParentOrgStrIdDept ? deptParentOrgStrIdDept : null
                );
                this.orgDeptStrId = deptParentOrgStrIdDept
                    ? deptParentOrgStrIdDept
                    : null;
            } catch (error) {
                throw Error(error || error.message);
            }
        },
    },
};
</script>
