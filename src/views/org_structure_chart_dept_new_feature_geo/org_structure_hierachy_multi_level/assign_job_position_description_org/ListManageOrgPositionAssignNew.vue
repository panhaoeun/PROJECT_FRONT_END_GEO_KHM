<template>
    <DataTable
        v-model:section="selectedPositionData"
        :value="getJobDescriptionPositionAssign"
        :paginator="true"
        filterDisplay="menu"
        dataKey="id"
        :loading="loadingPositionDeptJobDes"
        :rows="10"
        :globalFilterFields="[
            'representative.jobDesEng',
            'jobDesEng',
            'jobDesKhmer',
            'jobDeStatus',
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
                        severity="warning"
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
                        placeholder="Keyword Search Department Descriptions..."
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
            field="jobDesKhmer"
            header="Khmer Name"
            sortable
            style="width: 30%"
        >
            <template #body="{ data }">
                <span
                    v-if="
                        data?.jobDesKhmer !== null &&
                        data?.jobDesKhmer !== undefined
                    "
                >
                    {{ String(data?.jobDesKhmer).toString() || "N/A" }}</span
                >
            </template>
        </Column>
        <Column
            field="jobDesEng"
            header="English Name"
            sortable
            style="width: 30%"
        >
            <template #body="{ data }">
                <span> {{ String(data?.jobDesEng).toString() || "N/A" }}</span>
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
    <!-- Deleted Dialogs Position Job Descriptions By Id -->
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
                @click="confirmRemoveDeptPositionDescription()"
            />
        </template>
    </Dialog>
    <!-- Dialogs Position Job Descriptions Edited -->
    <open-edited-positions-org-structure
        v-if="openEditedPositionDialogs"
        @close="closingPopupEditedPosIdOrgStrDialogs"
        :open-edit-position-job-des="
            dataEditOrgPositionDes ? dataEditOrgPositionDes : {}
        "
    />
    <!-- Add New Job Positions Descriptions -->
    <OpenAddJobPositionsDescriptionOrgStructures
        v-if="openJobDesPosition"
        :dialog="openJobDesPosition"
        @close-dialog="closeJobDesPositionOrgStr"
        :orgStrNameEditedId="
            orgStructDeptJobPositionId ? orgStructDeptJobPositionId : 0
        "
    />
</template>
<!-- Script of list data global positions -->
<script>
import { FilterMatchMode } from "primevue/api";
import manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper from "@/mixin/manage_org_structure_dept_new_features/manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper";
import OpenEditedPositionsOrgStructure from "../assign_job_position_description_org/global_assign_org_dept_structures_job_description/job_des_positions/EditPositionDesJobOrgStructureData";
import OpenAddJobPositionsDescriptionOrgStructures from "./global_assign_org_dept_structures_job_description/job_des_positions/AssignPositionDescriptionManageOrgStructure";
export default {
    props: {
        positionData: {
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
    mixins: [manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper],
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
        OpenAddJobPositionsDescriptionOrgStructures,
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
