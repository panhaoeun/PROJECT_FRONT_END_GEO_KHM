<template>
    <DataTable
        v-model:section="selectedPositionData"
        :value="getJobDescriptionsPositionBaseProject"
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
                <p class="justify-content-center font-bold">List Positions Description</p>
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
        <template #empty>Empty position descriptions</template>
        <!-- Loading Positions -->
        <template #loading>
            Loading position descriptions data. Please wait...
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
                        severity="secondary"
                        class="mr-2"
                        @click.prevent="dialogConfirmRemovePositions(data)"
                    />
                </div>
            </template>
        </Column>
    </DataTable>
    <!-- Dialogs confirm Remove -->
</template>
<!-- Script of list data global positions -->
<script>
import { FilterMatchMode } from "primevue/api";
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
export default {
    components: {},
    mixins: [managerJobPositionOrgStructureProjectLevelZeroHelper],
    props: {
        positionData: {
            type: Array,
            required: true,
            default: () => {},
        },
    },
    data() {
        return {
            selectedPositionData: false,
            visibleConfirmRemove: false,
            dataObjPosition: null,
            filtersDataPositionData: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
        };
    },
    created() {},
    methods: {
        dialogConfirmRemovePositions(data) {
            this.visibleConfirmRemove = true;
            this.dataObjPosition = data ? data : {};
            this.$confirm.require({
                message: "Do you want to delete this record?",
                header: "Danger Zone",
                icon: "pi pi-info-circle",
                rejectLabel: "Cancel",
                acceptLabel: "Delete",
                rejectClass: "p-button-secondary p-button-outlined",
                acceptClass: "p-button-danger",
                accept: () => {
                    this.$toast.add({
                        severity: "info",
                        summary: "Confirmed",
                        detail: "Record deleted",
                        life: 3000,
                    });
                },
                reject: () => {
                    this.$toast.add({
                        severity: "error",
                        summary: "Rejected",
                        detail: "You have rejected",
                        life: 3000,
                    });
                },
            });
        },
    },
    mounted() {},
};
</script>
