<template>
    <DataTable
        v-model:section="selectedHistoryData"
        :value="getEmpHistoryWorkOfficer"
        :paginator="true"
        filterDisplay="menu"
        dataKey="id"
        :rows="10"
        :globalFilterFields="[
            'representative.positionKhmerName',
            'positionKhmerName',
            'positionKhmerName',
            'deptGeoMgtPosId',
        ]"
        scrollable
        class="p-datatable-scrollable text-sm card"
        removableSort
        tableStyle="min-width: 50rem"
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 100]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} history officer of employee"
    >
        <!-- Data Table Header -->
        <template #header>
            <div
                class="flex flex-wrap gap-2 align-items-center justify-content-between"
            >
                <!-- Search Products -->
                <p class="justify-content-center font-bold"></p>
                <span
                    class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0"
                >
                    <i class="pi pi-search" />
                    <InputText
                        v-model="filtersDataPositionData['global'].value"
                        class="p-inputtext p-component w-full text-sm"
                        placeholder="Keyword search history officer..."
                    />
                </span>
            </div>
        </template>
        <!-- Empty Positions -->
        <template #empty
            >Empty list history of officer employee for org-structure</template
        >
        <!-- Loading Positions -->
        <template #loading>
            Loading position list history of officer for org-structure data.
            Please wait...
        </template>
        <!--------------Columns----------->
        <Column
            field="positionKhmerName"
            header="Employee Name"
            sortable
            style="width: 20%"
        >
            <template #body="{ data }">
                <span
                    v-if="
                        data.tbl_Employee !== null &&
                        data.tbl_Employee !== undefined
                    "
                >
                    {{
                        String(data.tbl_Employee.empEngName).toString() || "N/A"
                    }}</span
                >
                <span v-else>N/A</span>
            </template>
        </Column>

        <Column
            field="deptOrgEnglishName"
            header="Department"
            sortable
            style="width: 20%"
        >
            <template #body="{ data }">
                <span
                    v-if="
                        data.tbl_dept_org_structure_geo_fence !== null &&
                        data.tbl_dept_org_structure_geo_fence !== undefined
                    "
                >
                    {{
                        String(
                            data.tbl_dept_org_structure_geo_fence
                                .deptOrgEnglishName
                        ).toString() || "N/A"
                    }}</span
                >
                <span v-else>N/A</span>
            </template>
        </Column>
        <Column
            field="positionNameEng"
            header="Job Title"
            sortable
            style="width: 20%"
        >
            <template #body="{ data }">
                <span
                    v-if="
                        data.tbl_org_position_geo_fence !== null &&
                        data.tbl_org_position_geo_fence !== undefined
                    "
                >
                    {{
                        String(
                            data.tbl_org_position_geo_fence
                                .positionNameEng
                        ).toString() || "N/A"
                    }}</span
                >
                <span v-else>N/A</span>
            </template>
        </Column>
        <Column
            field="historyDateWork"
            header="Start Date"
            sortable
            style="width: 20%"
        >
            <template #body="{ data }">
                <span>
                    {{
                        Date(data?.historyDateWork) || "N/A"
                    }}</span
                >
            </template>
        </Column>
        <Column
            field="historyWorkEndDate"
            header="End Date"
            sortable
            style="width: 20%"
        >
            <template #body="{ data }">
                <span>
                    {{
                        String(data?.historyWorkEndDate).toString() || "N/A"
                    }}</span
                >
            </template>
        </Column>
    </DataTable>
    <!-- Deleted Dialogs Position Job Descriptions By Id -->
    <Dialog
        v-model:visible="deletedGeoDeptPosMgtDialogs"
        :style="{ width: '550px' }"
        :header="'Confirm delete  this history to officer'"
        :modal="true"
    >
        <div class="confirmation-content flex">
            <i
                class="pi pi-exclamation-triangle mr-3 text-red-500"
                style="font-size: 2rem"
            />
            <span
                >Are you sure you want to delete this history to officer
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

    <!-- Dialogs Position Job Descriptions Edited -->
    <!-- <open-edited-positions-org-structure
        v-if="openEditedPositionDialogs"
        @close="closingPopupEditedPosIdOrgStrDialogs"
        :open-edit-position-org="
            dataEditOrgPositionDes ? dataEditOrgPositionDes : {}
        "
    /> -->
    <!-- Add New Job Positions Descriptions -->
    <!-- <OpenDialogAddNewPositionOrgDept
        v-if="openJobDesPosition"
        :dialog="openJobDesPosition"
        @close="closeJobDesPositionOrgStr"
        :orgStrNameEditedId="
            orgStructDeptJobPositionId ? orgStructDeptJobPositionId : 0
        "
        :orgStrDeptPosId="orgStrDeptPosId ? orgStrDeptPosId : 0"
    /> -->
</template>

<!-- Script of list data global history officer employee -->
<script>
import { FilterMatchMode } from "primevue/api";
import manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper from "@/mixin/manage_org_structure_dept_new_features/manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper";
import manageHistoryWorkJobDeptPosOrgHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageHistoryWorkJobDeptPosOrgHelper";
export default {
    props: {
        orgStrDeptPosId: {
            type: Number,
            required: true,
            defaultValue: 0,
            default: 0,
        },
        editOrgStrDeptName: {
            type: Object,
            required: true,
            default: () => null,
        },
        positionAllDeptOrg: {
            type: Array,
            required: true,
            default: () => {},
        },
        orgStructDeptJobPositionId: {
            type: Number,
            required: true,
            default: () => 0,
        },
    },
    mixins: [
        manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper,
        manageHistoryWorkJobDeptPosOrgHelper,
    ],
    data() {
        return {
            deletedGeoDeptPosMgtDialogs: false,
            loadingRemoveDeptPos: false,
            selectedHistoryData: false,
            visibleConfirmRemove: false,
            openedDialogVisiblePos: false,
            loadingAddNewPosition: false,
            assignTORPositionId: null,
            dataObjPosition: null,
            getNameRemove: null,
            filtersDataPositionData: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                jobDesEng: {
                    value: null,
                    matchMode: FilterMatchMode.STARTS_WITH,
                },
                jobDesKhmer: {
                    value: null,
                    matchMode: FilterMatchMode.STARTS_WITH,
                },
            },
            addJobDescType: "Position",
            loadingAddJobDesPosition: false,
            openJobDesPosition: false,
            dataEditOrgPositionDes: null,
            openEditedPositionDialogs: false,
            openEditDialogsOrgDes: false,
            dataDeletedOrgBoardPosId: 0,
        };
    },
    mounted() {
        const orgStrJobDesPositionId = this.orgStructDeptJobPositionId
            ? this.orgStructDeptJobPositionId
            : 0;
        const orgDeptJobDesPositionType = "Position";
        this.getJobDescriptionType(
            orgStrJobDesPositionId,
            orgDeptJobDesPositionType
        );
    },
    methods: {
        clingAssignDialog() {
            this.clingAssignTORVisible = false;
        },
        closeJobDesPositionOrgStr() {
            this.openJobDesPosition = false;
        },
        openJobDesPositionOrgStructure() {
            this.loadingAddJobDesPosition = true;
            setTimeout(() => {
                this.loadingAddJobDesPosition = false;
                this.openJobDesPosition = true;
            }, 100);
        },
    },
};
</script>
