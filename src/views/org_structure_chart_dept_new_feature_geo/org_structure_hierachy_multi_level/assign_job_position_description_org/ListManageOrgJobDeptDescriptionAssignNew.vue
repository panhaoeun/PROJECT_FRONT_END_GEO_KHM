<template>
    <DataTable
        v-model:section="selectedPositionData"
        :value="
            getJobDescriptionsBaseProject ? getJobDescriptionsBaseProject : {}
        "
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
                <p class="justify-content-center font-bold">
                    List Job Descriptions
                </p>
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
        <template #empty>Empty job descriptions</template>
        <!-- Loading Positions -->
        <template #loading>
            Loading job descriptions data. Please wait...
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
                @click="deletedJobDescDialogs = false"
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                @click="confirmRemoveJobDescOrgStructureById()"
            />
        </template>
    </Dialog>
    <!-- Edited Job Descriptions -->
    <OpenEditedJobDescriptionOrgStructure
        v-if="openEditedJobDescDialogs"
        @close="closingPopupEditedJobPosDesIdOrgStrDialogs"
        :open-edit-board-job-des="openDataJobDesc ? openDataJobDesc : {}"
    />
</template>
<!-- Script of list data global positions -->
<script>
import { FilterMatchMode } from "primevue/api";
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
// import OpenEditedJobDescriptionOrgStructure from "../../org_chart_structure_managements_new/popup_prepare_org_global_dept/popup_org_project_dept_global/global_prepare_org_str_dept/EditJobDescriptionOrgStrData.vue";
export default {
    components: {
        // OpenEditedJobDescriptionOrgStructure,
    },
    props: {
        jobDescriptionData: {
            type: Array,
            required: true,
            default: () => {},
        },
    },
    mixins: [managerJobPositionOrgStructureProjectLevelZeroHelper],
    data() {
        return {
            positionDataJobDes: null,
            selectedPositionData: false,
            visibleConfirmRemove: false,
            dataObjPosition: null,
            filtersDataPositionData: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
        };
    },
    created() {},
    mounted() {},
};
</script>
