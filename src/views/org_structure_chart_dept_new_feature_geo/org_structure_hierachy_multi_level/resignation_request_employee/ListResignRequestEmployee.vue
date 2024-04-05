<template>
    <DataTable
        v-model:section="selectedEmployeeResign"
        :value="getAllEmployeeResign"
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
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} employee resign record"
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
                        placeholder="Keyword search employee resign..."
                    />
                </span>
            </div>
        </template>
        <!-- Empty Positions -->
        <template #empty>Empty list employee resign record</template>
        <!-- Loading Positions -->
        <template #loading>
            Loading list employee resign record Please wait...
        </template>
        <!--------------Columns----------->
        <Column
            field="resignationDate"
            header="Resignation Date"
            sortable
            style="width: 20%"
        >
            <template #body="{ data }">
                <span
                    v-if="
                        data.tbl_employee_resignation !== null &&
                        data.tbl_employee_resignation !== undefined
                    "
                >
                    {{ formatDate(data.tbl_employee_resignation?.resignationDate) || "N/A" }}</span
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
                                ?.deptOrgEnglishName
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
                            data.tbl_org_position_geo_fence?.positionNameEng
                        ).toString() || "N/A"
                    }}</span
                >
                <span v-else>N/A</span>
            </template>
        </Column>
        <Column
            field="historyDateWork"
            header="Status"
            sortable
            style="width: 20%"
        >
            <template #body="{ data }">
                <span> {{ formatDate(data?.historyDateWork) || "N/A" }}</span>
            </template>
        </Column>
        <!-- Actions -->
        <Column
            :exportable="false"
            class="text-md font-medium"
            header="Actions"
            style="min-width: 8rem"
        >
            <template #body="slotProps">
                <Button
                    icon="pi pi-file-pdf"
                    outlined
                    rounded
                    class="mr-2"
                    @click.prevent="
                            (slotProps?.data)
                    "
                />
            </template>
        </Column>
    </DataTable>

    <!-- Dialogs Position Job Descriptions Edited -->
    <view-detail-history-officer
        v-if="dialogHistoryEmp"
        @close="closeHistoryWorkOfficer"
        :department-name="departmentNameOrg"
        :org-history-officer-work="
            dataHistoryOfficerEmp ? dataHistoryOfficerEmp : {}
        "
    />
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
// import ViewDetailHistoryOfficer from "./ViewDetailHistoryOfficerDeptOrg.vue";
export default {
    components: {
        // ViewDetailHistoryOfficer,
    },
    props: {
        departmentNameOrg: {
            type: String,
            defaultValue: "",
            default: "No Department",
        },
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
        getAllEmployeeResign: {
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
            selectedEmployeeResign: false,
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
            dataHistoryOfficerEmp: null,
            openEditedPositionDialogs: false,
            openEditDialogsOrgDes: false,
            dataDeletedOrgBoardPosId: 0,
            dialogHistoryEmp: false,
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
        formatDate(date) {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;
            return [year, month, day].join("-");
        },
        openJobDesPositionOrgStructure() {
            this.loadingAddJobDesPosition = true;
            setTimeout(() => {
                this.loadingAddJobDesPosition = false;
                this.openJobDesPosition = true;
            }, 100);
        },
        openDialogHistoryOfficerEmp(history) {
            this.dialogHistoryEmp = true;
            this.dataHistoryOfficerEmp = history ? history : {};
        },
        closeHistoryWorkOfficer() {
            this.dialogHistoryEmp = false;
        },
    },
};
</script>
