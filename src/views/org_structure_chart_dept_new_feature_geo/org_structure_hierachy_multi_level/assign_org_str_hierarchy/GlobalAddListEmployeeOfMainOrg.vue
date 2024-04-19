<template>
    <form @submit.prevent="submittedDialogEditGeoProjectStr">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinner">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Org-Structures Main Dept -->

        <pop-over
            v-if="positionAssignEdited"
            :title="`Employee list of:` + '\n' + getDepartmentName"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content>
                <div class="flex justify-content-end">
                    <!-- Add Assign Button Employee -->
                    <el-button
                        type="info"
                        size="large"
                        class="btn btn-primary"
                        @click.prevent="onAssignEmployeeOrgStructures()"
                    >
                        <div class="button">
                            <i class="pi pi-plus" style="font-size: 1rem"></i>
                            <span class="pl-2">Assign Employee</span>
                        </div>
                    </el-button>
                </div>
                <!-- Total Employees -->
                <div
                    class="d-flex flex-column justify-content-center mb-primary"
                >
                    <h1 class="text-center font-bold">
                        {{ getDepartmentName }}
                    </h1>
                    <p class="text-center text-lg">
                        Total Employee -
                        {{ countEmpByDeptName }}
                    </p>
                </div>
                <!-- List of dataview- -->
                <div
                    class="mb-primary border-bottom"
                    style="width: 80rem"
                    v-if="
                        getAllDataEmpAssignOrgStr !== null ||
                        (getAllDataEmpAssignOrgStr !== '' &&
                            typeof getAllDataEmpAssignOrgStr !== 'object' &&
                            getAllDataEmpAssignOrgStr.length > 0)
                    "
                >
                    <DataTable
                        ref="empDept"
                        :value="getAllDataEmpAssignOrgStr"
                        v-model:selection="selectedCategoriesList"
                        dataKey="id"
                        :paginator="true"
                        :rows="10"
                        :filters="filters"
                        :globalFilterFields="[
                            'representative.empKhmerName',
                            'empEmailAddress',
                            'phoneNumber',
                            'empEnglishName',
                            'empKhmerName',
                        ]"
                        showGridlines
                        class="p-datatable-scrollable text-sm"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25]"
                        :metaKeySelection="false"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} employee records"
                    >
                        <!-- Header -->
                        <template #header>
                            <div
                                class="flex flex-wrap gap-2 align-items-center justify-content-between"
                            >
                                <h4 class="m-0"></h4>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText
                                        v-model="filters['global'].value"
                                        :placeholder="$t('route.search')"
                                    />
                                </span>
                            </div>
                        </template>
                        <!-- Empty Products -->
                        <template #empty>
                            This department has no employee!
                        </template>
                        <!-- Loading Products -->
                        <template #loading>
                            Loading employee list data. Please wait.
                        </template>
                        <!--------------Check Existed Data ----------->
                        <div
                            v-if="
                                getAllDataEmpAssignOrgStr &&
                                getAllDataEmpAssignOrgStr.length > 0 &&
                                getAllDataEmpAssignOrgStr != ''
                            "
                        >
                            <!-- Columns -->
                            <Column field="id" header="Khmer Name" sortable>
                                <template #body="{ data }">
                                    <div class="flex flex-column">
                                        <div class="flex px-2 py-2">
                                            <span>{{
                                                data?.empKhmerName ?? "N/A"
                                            }}</span>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column field="id" header="English Name" sortable>
                                <template #body="{ data }">
                                    <div class="flex flex-column">
                                        <div class="flex px-2 py-2">
                                            <span>{{
                                                data?.empEnglishName ?? "N/A"
                                            }}</span>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <!-- Columns -->
                            <Column
                                field="tbl_org_position_geo_fence"
                                header="Position"
                                sortable
                            >
                                <template #body="{ data }">
                                    <div
                                        class="flex flex-column"
                                        v-if="
                                            data?.tbl_org_position_geo_fence !==
                                                null ||
                                            data?.tbl_org_position_geo_fence !==
                                                ''
                                        "
                                    >
                                        <div class="flex px-2 py-2">
                                            <span>{{
                                                data?.tbl_org_position_geo_fence
                                                    ?.positionNameEng ?? "N/A"
                                            }}</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="flex px-2 py-2">
                                            <span>N/A</span>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column field="id" header="Phone Number" sortable>
                                <template #body="{ data }">
                                    <div class="flex flex-column">
                                        <div class="flex px-2 py-2">
                                            <span>{{
                                                data?.phoneNumber ?? "0"
                                            }}</span>
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column field="id" header="Email Address" sortable>
                                <template #body="{ data }">
                                    <div class="flex flex-column">
                                        <div class="flex px-2 py-2">
                                            <span>{{
                                                data?.empEmailAddress ?? "N/A"
                                            }}</span>
                                        </div>
                                    </div>
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
                                        severity="info"
                                        v-tooltip="{
                                            value: 'View Employee Profile',
                                            showDelay: 100,
                                            hideDelay: 300,
                                        }"
                                        rounded
                                        class="mr-2"
                                        @click.prevent="
                                            openDialogEmployeeViewDetailJobDept(
                                                slotProps?.data
                                            )
                                        "
                                    />
                                    <Button
                                        icon="pi pi-eject"
                                        outlined
                                        severity="warning"
                                        rounded
                                        v-tooltip="{
                                            value: 'Employee Resign Job',
                                            showDelay: 1000,
                                            hideDelay: 300,
                                        }"
                                        class="mr-2"
                                        @click.prevent="
                                            openDialogEmployeeResignJobDept(
                                                slotProps?.data
                                            )
                                        "
                                    />
                                </template>
                            </Column>
                        </div>
                    </DataTable>
                </div>
            </template>
            <!-- Footer -->
            <template v-slot:pop-footer>
                <div class="flex j-end gap-10">
                    <button
                        class="outline-btn plr-30 plr-sm-15 border-round"
                        aria-label="Country cancel"
                        @click.prevent="$emit('close')"
                    >
                        {{ $t("addressPopup.cancel") }}
                    </button>
                </div>
            </template>
        </pop-over>
        <!-- Popup Add Employee Add New Position Change -->
        <AssignPositionOfficerJobDeptOrg
            v-if="openDialogEmpOrg"
            :orgAssignId="empOrgStrDataId ? empOrgStrDataId : 0"
            @close="closeDialogAssignPositionOfficer"
            :dialog-change-position="openDialogEmpOrg"
            :departmentName="departmentOrgName ? departmentOrgName : ''"
        />
        <!-- Popup Add Resign Officer To Employee  Job -->
        <ResignEmployeeOfficerJobDept
            v-if="assignOfficerPosition"
            :orgAssignId="empOrgStrDataId ? empOrgStrDataId : 0"
            @close="closedResignOfficerOrgDept"
            :dialog-resign-form="assignOfficerPosition"
            :departmentName="departmentOrgName ? departmentOrgName : ''"
        />
        <!-- Popup View Detail Officer Employee Detail -->
        <ViewDetailsOfficerOrgDeptEmpInfo
            v-if="viewDetailOfficerEmployee"
            :orgAssignId="empOrgStrDataId ? empOrgStrDataId : 0"
            @close="closeDialogViewDetailOrgOfficer"
            :dialog-resign-form="viewDetailOfficerEmployee"
            :departmentName="departmentOrgName ? departmentOrgName : ''"
        />
    </form>
</template>

<!-- Script of assign-org-structures  -->
<script>
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
import manageOrgEmployeeMainHelper from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
import geoDeptOrgProjects from "@/mixin/manage_geo_org_str/manageProjectNameHelper";
import AssignPositionOfficerJobDeptOrg from "../assign_employee_dept_pos/GlobalAssignEmpDeptAddNewGeoOrg.vue";

import util from "@/mixin/util";
import validation from "@/mixin/validation";
import { mapActions } from "vuex";
import { FilterMatchMode } from "primevue/api";
/**
 * @Resign and Popup View Detail Employee
 * */
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_dept_employee_main/manageOrgEmployeeMainHelper";
import ResignEmployeeOfficerJobDept from "../assign_employee_org_officer_dept/AssignEmployeeOrgOfficerResignJobDept.vue";
import ViewDetailsOfficerOrgDeptEmpInfo from "../assign_employee_org_officer_dept/ViewDetailsOfficerOrgDeptEmpInfo";

export default {
    components: {
        Spinner,
        PopOver,
        AssignPositionOfficerJobDeptOrg,
        ResignEmployeeOfficerJobDept,
        ViewDetailsOfficerOrgDeptEmpInfo,
    },
    props: {
        departmentOrgName: {
            type: String,
            required: true,
            default() {
                return "No Department";
            },
        },
        empOrgStrDataId: {
            type: Number,
            default() {
                return 0;
            },
        },
        assignPositionData: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        getDepartmentName() {
            return this.departmentOrgName || "";
        },
        countEmpByDeptName() {
            let countEmpAssignNo;
            if (
                !this.empOrgStrDataId ||
                (this.empOrgStrDataId !== null &&
                    typeof this.assignGetAllEmpToOrgChart !== "string")
            ) {
                return (countEmpAssignNo =
                    parseInt(this.assignGetAllEmpToOrgChart?.count) || 0);
            }
            return countEmpAssignNo ? countEmpAssignNo : 0;
        },
        getAllDataEmpAssignOrgStr() {
            let getEmpAssData;
            if (
                !this.empOrgStrDataId ||
                (this.empOrgStrDataId !== null &&
                    typeof this.assignGetAllEmpToOrgChart !== "string")
            ) {
                return (getEmpAssData =
                    this.assignGetAllEmpToOrgChart?.rows || []);
            }
            return getEmpAssData ? getEmpAssData : 0;
        },
        editingAssPosData() {
            return (
                this.assignPositionData &&
                parseInt(this.assignPositionData.deptOrgStrId)
            );
        },
    },
    mixins: [
        geoDeptOrgProjects,
        util,
        validation,
        manageOrgStructureDeptNewFeatures,
        manageOrgEmployeeMainHelper,
        manageOrgDeptPositionStructuresHelper,
    ],
    data() {
        return {
            loadingSpinner: false,
            positionAssignEdited: null,
            hasAssignPositionErrors: false,
            submittingPositionData: false,
            openDataAssPosition: [],
            selectedAssignPosition: null,
            layout: "list",
            getDataEmpOrg: [],
            sortOrderEmpGlobal: null,
            sortFieldEmpGlobal: null,
            openDialogEmpOrg: false,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            assignOfficerPosition: false,
            viewDetailOfficerEmployee: false,
        };
    },
    async mounted() {
        if (this.assignPositionData) {
            this.positionAssignEdited = {
                ...this.positionAssignEdited,
                ...this.assignPositionData,
            };
        } else {
            this.positionAssignEdited = {
                id: 0,
                project_name: "",
                project_noted: "",
            };
        }
        // Reload org-structure assign employees
        const getEmpOrgStrId = parseInt(this.empOrgStrDataId)
            ? parseInt(this.empOrgStrDataId)
            : 0;
        this.getReloadAssignEmpOrgStructure(getEmpOrgStrId);
    },
    methods: {
        ...mapActions("common", [
            "fetchLocation",
            "setToastMessage",
            "setToastError",
            "getRequest",
        ]),
        extendedSplitEmp(str) {
            let splitFirstChart;
            if (typeof str !== "undefined") {
                splitFirstChart = String(str)
                    .split(/\s/)
                    .reduce(
                        (response, word) => (response += word.slice(0, 1)),
                        ""
                    )
                    .toUpperCase();
                return splitFirstChart;
            }
            return "ORG";
        },
        // Org-Structures Chart Assign Employee
        onAssignEmployeeOrgStructures() {
            this.openDialogEmpOrg = true;
        },
        closeDialogAssignPositionOfficer() {
            this.openDialogEmpOrg = false;
        },
        closedResignOfficerOrgDept() {
            this.assignOfficerPosition = false;
        },
        closeDialogViewDetailOrgOfficer() {
            this.viewDetailOfficerEmployee = false;
        },
    },
};
</script>
