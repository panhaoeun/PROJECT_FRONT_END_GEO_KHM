<template>
    <DataTable
        v-model:section="selectedPositionJobDesDeptData"
        :value="getJobDescriptionsDeptAssign"
        :paginator="true"
        :loading="loadingPositionDeptJobDes"
        scrollable
        filterDisplay="menu"
        :globalFilterFields="[
            'representative.jobDesEng',
            'jobDesEng',
            'jobDesKhmer',
            'jobDeStatus',
        ]"
        lazy
        dataKey="id"
        :rows="10"
        class="p-datatable-scrollable text-sm card"
        removableSort
        tableStyle="min-width: 50rem"
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 100]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} department description"
    >
        <!-- Data Table Header -->
        <template #header>
            <div
                class="flex flex-wrap gap-2 align-items-center justify-content-between"
            >
                <Button
                    type="button"
                    label="Add New"
                    icon="pi pi-plus"
                    class="w-10rem h-2.1rem text-sm plr-20 mtb-5 border-round-lg"
                    :loading="loadingAddJobDesDept"
                    @click="openDialogAddNewJobDesDeptOrgStr"
                />
                <span
                    class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0"
                >
                    <i class="pi pi-search" />
                    <InputText
                        v-model="filtersDataPositionData['global'].value"
                        class="p-inputtext p-component w-full text-sm"
                        placeholder="Keyword Search Department Description..."
                    />
                </span>
            </div>
        </template>
        <!-- Empty Department -->
        <template #empty>Empty job dept. job descriptions</template>
        <!-- Loading Department -->
        <template #loading>
            Loading department descriptions data. Please wait...
        </template>
        <!--------------Columns----------->
        <Column
            field="jobDesKhmer"
            header="Khmer Name"
            sortable
            style="width: 30%"
        ></Column>
        <Column
            field="jobDesEng"
            header="English Name"
            sortable
            style="width: 30%"
        ></Column>
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
                        @click.prevent="openEditDialogsJobDescRename(data)"
                    />
                    <Button
                        icon="pi pi-trash"
                        outlined
                        rounded
                        severity="secondary"
                        class="mr-2"
                        @click.prevent="confirmDeletedJobDesOrgStrById(data)"
                    />
                </div>
            </template>
        </Column>
    </DataTable>
    <!-- Deleted Dialogs Job Descriptions -->
    <Dialog
        v-model:visible="deletedJobDescDialogs"
        :style="{ width: '450px' }"
        header="Confirm delete job description"
        :modal="true"
    >
        <div class="confirmation-content flex">
            <i
                class="pi pi-exclamation-triangle mr-3 text-red-500"
                style="font-size: 2rem"
            />
            <span
                >Are you sure you want to delete this
                {{ String(jobDeptName).toString() }} ?</span
            >
        </div>
        <template #footer>
            <Button
                label="No"
                icon="pi pi-times"
                text
                @click="deletedJobDescDialogs = false"
            />
            <Button
                :label="loadingRemoveJobDeptDes ? 'Loading...' : 'Remove'"
                icon="pi pi-check"
                text
                :loading="loadingRemoveJobDeptDes"
                @click="confirmRemoveJobDescOrgStructureById()"
            />
        </template>
    </Dialog>
    <!-- Edited Job Dept Descriptions -->
    <OpenEditedJobDeptDescriptionOrgStructure
        v-if="openEditedJobDescDialogs"
        @close="closingPopupEditedJobPosDesIdOrgStrDialogs"
        :open-edit-board-job-des="openDataJobDesc ? openDataJobDesc : {}"
    />
    <!-- Add New Job Dept Descriptions -->
    <OpenAddJobDescriptionDeptOrgStructures
        v-if="dialogAddNewDeptOrgStr"
        :dialog="dialogAddNewDeptOrgStr"
        :orgStrNameEditedId="
            orgStructDeptJobDeptId ? orgStructDeptJobDeptId : 0
        "
        @close-dialog="closeDialogAddJobDesDepartmentOrg"
    />
</template>
<!-- Script of list data global positions -->
<script>
import { FilterMatchMode } from "primevue/api";
import manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper from "@/mixin/manage_org_structure_dept_new_features/manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper";
import OpenEditedJobDeptDescriptionOrgStructure from "./global_assign_org_dept_structures_job_description/job_dept_description/EditJobDescriptionDeptOrgStrData";
import OpenAddJobDescriptionDeptOrgStructures from "./global_assign_org_dept_structures_job_description/job_dept_description/AssignJobDescriptionsDeptManageOrgStructureAddNew";
export default {
    components: {
        OpenEditedJobDeptDescriptionOrgStructure,
        OpenAddJobDescriptionDeptOrgStructures,
    },
    props: {
        jobDescriptionData: {
            type: Array,
            required: true,
            default: () => {},
        },
        orgStructDeptJobDeptId: {
            type: Number,
            required: true,
            default: () => 0,
        },
    },
    mixins: [manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper],
    data() {
        return {
            positionDataJobDes: null,
            selectedPositionJobDesDeptData: null,
            visibleConfirmRemove: false,
            dataObjPosition: null,
            dialogAddNewDeptOrgStr: false,
            loadingDeptAssignPoJobDes: false,
            openDataJobDesc: null,
            openEditedJobDescDialogs: false,
            addJobDescType: "Department",
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
            loadingRemoveJobDeptDes: false,
            jobDeptName: "",
            orgDepOrgIdRemove: 0,
        };
    },
    mounted() {
        const orgStrJobDesDeptId = this.orgStructDeptJobDeptId;
        const orgDeptJobDesDeptType = "Department";
        this.getJobDescriptionType(orgStrJobDesDeptId, orgDeptJobDesDeptType);
    },
    methods: {
        closeDialogAddJobDesDepartmentOrg() {
            this.dialogAddNewDeptOrgStr = false;
        },
        openDialogAddNewJobDesDeptOrgStr() {
            this.loadingAddJobDesDept = true;
            setTimeout(() => {
                this.loadingAddJobDesDept = false;
                this.dialogAddNewDeptOrgStr = true;
            }, 100);
        },
    },
};
</script>
