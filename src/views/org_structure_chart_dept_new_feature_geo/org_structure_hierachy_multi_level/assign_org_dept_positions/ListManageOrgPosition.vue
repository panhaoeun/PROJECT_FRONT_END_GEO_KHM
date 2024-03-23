<template>
    <DataTable
        v-model:section="selectedPositionData"
        :value="positionAllDeptOrg"
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
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} positions description"
    >
        <!-- Data Table Header -->
        <template #header>
            <div
                class="flex flex-wrap gap-2 align-items-center justify-content-between"
            >
                <!-- Search Products -->
                <p class="justify-content-center font-bold">
                    <Button
                        type="button"
                        label="Add New"
                        icon="pi pi-plus"
                        severity="info"
                        class="w-10rem h-2.1rem text-sm plr-20 mtb-5 border-round-lg"
                        :loading="loadingAddJobDesPosition"
                        @click="openJobDesPositionOrgStructure"
                    />
                </p>
                <span
                    class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0"
                >
                    <i class="pi pi-search" />
                    <InputText
                        v-model="filtersDataPositionData['global'].value"
                        class="p-inputtext p-component w-full text-sm"
                        placeholder="Keyword search position..."
                    />
                </span>
            </div>
        </template>
        <!-- Empty Positions -->
        <template #empty>Empty list dept. position for org-structure</template>
        <!-- Loading Positions -->
        <template #loading>
            Loading position list dept. position for org-structure data. Please
            wait...
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
                <span v-else>N/A</span>
            </template>
        </Column>
        <Column
            field="deptPosName"
            header="English Name"
            sortable
            style="width: 30%"
        >
            <template #body="{ data }">
                <span>
                    {{ String(data?.deptPosName).toString() || "N/A" }}</span
                >
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
                    <!-- <Button
                        icon="pi pi-briefcase"
                        severity="help"
                        outlined
                        rounded
                        class="mr-2"
                        @click.prevent="openDialogAssignTOR(data)"
                    /> -->
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
    <!-- Deleted Dialogs Position Job Descriptions By Id -->
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
    <!-- Dialogs Position Job Descriptions Edited -->
    <open-edited-positions-org-structure
        v-if="openEditedPositionDialogs"
        @close="closingPopupEditedPosIdOrgStrDialogs"
        :open-edit-position-org="
            dataEditOrgPositionDes ? dataEditOrgPositionDes : {}
        "
    />
    <!-- Add New Job Positions Descriptions -->
    <OpenDialogAddNewPositionOrgDept
        v-if="openJobDesPosition"
        :dialog="openJobDesPosition"
        @close="closeJobDesPositionOrgStr"
        :orgStrNameEditedId="
            orgStructDeptJobPositionId ? orgStructDeptJobPositionId : 0
        "
        :orgStrDeptPosId="orgStrDeptPosId ? orgStrDeptPosId : 0"
    />
</template>
<!-- Script of list data global positions -->
<script>
import { FilterMatchMode } from "primevue/api";
import manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper from "@/mixin/manage_org_structure_dept_new_features/manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper";
import OpenEditedPositionsOrgStructure from "./assign_job_des_position_global/EditPositionOrgStructureData.vue";
import OpenDialogAddNewPositionOrgDept from "../assign_org_dept_positions/AddAssignOrgDeptPosition.vue";
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";
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
        manageOrgDeptPositionStructuresHelper,
    ],
    data() {
        return {
            deletedGeoDeptPosMgtDialogs: false,
            loadingRemoveDeptPos: false,
            selectedPositionData: false,
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
    components: {
        OpenEditedPositionsOrgStructure,
        OpenDialogAddNewPositionOrgDept,
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
