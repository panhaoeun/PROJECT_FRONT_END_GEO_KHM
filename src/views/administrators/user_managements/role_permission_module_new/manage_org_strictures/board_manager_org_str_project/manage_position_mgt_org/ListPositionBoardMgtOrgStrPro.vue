<template>
    <KeepAlive>
        <div class="pl-2 gap-2 flex align-items-center justify-content-center">
            <Button
                aria-label="Add Positions"
                severity="help"
                class="border-round-sm w-10rem h-2rem text-sm"
                outlined
                label="Manage Position"
                @click="openDialogsAddPositionBoardMgtOrgPro()"
            />
        </div>
    </KeepAlive>
    <!-- Dialog Managements Position Base Departments -->
    <Dialog
        v-model:visible="visibleDialogBoardMgtOrgStr"
        maximizable
        modal
        :style="{ width: '80rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <template #header>
            <div
                class="inline-flex align-items-center justify-content-center gap-2"
            >
                <span class="font-bold white-space-nowrap">
                    Manage Position
                </span>
            </div>
        </template>
        <!-- Form Submitted -->
        <div
            class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
        >
            <div class="pop-over-content p-20 p-sm-15 card">
                <!-- Modify Dialogs Positions Board Mgt Org-Structures -->
                <!-- <PopupEditedProject
                    v-if="openEditedProjectFrm"
                    :geoOrgProjectStrData="editPopupProjectStrData"
                    @close="closingPopupEditedProjectStr"
                /> -->
                <!-- Departments -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <!-- Add more -->
                        <AddNewPositionBoardMgtOrgStrPro />
                    </div>
                </div>
                <div>
                    <!-- Add Departments Multiple Level -->
                    <div
                        class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 card border-round gap-15"
                    >
                        <DataTable
                            class="p-datatable-scrollable text-sm"
                            :rows="10"
                            dataKey="id"
                            :paginator="true"
                            :value="getAllProjectOnOrgStr"
                            :rowHover="true"
                            contextMenu
                            v-model:filters="filtersGeoProjects"
                            filterDisplay="menu"
                            :loading="fetchingOrgStrDeptProject"
                            :filters="filtersGeoProjects"
                            responsiveLayout="scroll"
                            :globalFilterFields="[
                                'representative.project_name',
                                'project_name',
                                'project_status',
                            ]"
                            v-model:selection="selectedGeoProjectId"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
                        >
                            <!-- Search Input Filter -->
                            <template #header>
                                <div
                                    class="flex flex-wrap justify-content-between gap-2"
                                >
                                    <p>Positions</p>
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-search" />
                                        <InputText
                                            v-model="
                                                filtersGeoProjects['global']
                                                    .value
                                            "
                                            placeholder="Search positions"
                                        />
                                    </span>
                                </div>
                            </template>
                            <!-- Column -->
                            <template #empty> No projects found. </template>
                            <template #loading>
                                Loading projects data. Please wait.
                            </template>
                            <Column
                                field="project_name"
                                header="Position"
                                sortField="project_name"
                                sortable
                            >
                                <template #body="{ data }">
                                    <span>
                                        {{
                                            String(
                                                data?.project_name
                                            ).toString()
                                        }}</span
                                    >
                                </template>
                            </Column>
                            <Column
                                header="Actions"
                                :exportable="false"
                                :styles="{ 'min-width': '8rem' }"
                            >
                                <template #body="slotProps">
                                    <Button
                                        icon="pi pi-pencil"
                                        outline
                                        class="p-button-rounded p-button-success mr-2"
                                        v-permission="[
                                            {
                                                functionName:
                                                    'location_ms_system_module',
                                                moduleName: 'fun_edit',
                                            },
                                        ]"
                                        @click="
                                            editGeoOrgDeptProjectStr(
                                                slotProps?.data
                                            )
                                        "
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        outline
                                        class="p-button-rounded p-button-warning"
                                        @click="
                                            confirmDeletedGeoProjectName(
                                                slotProps?.data
                                            )
                                        "
                                        v-permission="[
                                            {
                                                functionName:
                                                    'location_ms_system_module',
                                                moduleName: 'fun_delete',
                                            },
                                        ]"
                                    />
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button
                label="Cancel"
                class="w-6rem"
                @click="cancelAddGeoCountry()"
                outlined
            />
        </template>
    </Dialog>
    <!-- Deleted Dialogs Project -->
    <Dialog
        v-model:visible="deletedGeoProjectDialogs"
        :style="{ width: '450px' }"
        header="Confirm delete geo-country locations"
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
                @click="deletedGeoProjectDialogs = false"
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                @click="confirmDeletedProjectById(deletedDialogDataProjectId)"
            />
        </template>
    </Dialog>
</template>

<!-- Department JS -->
<script>
import AddNewPositionBoardMgtOrgStrPro from "./AddNewPositionBoardMgtOrgStrPro.vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import geoDeptOrgProjects from "@/mixin/manage_geo_org_str/manageProjectNameHelper";
// import PopupEditedProject from "./PopupEditedProject.vue";
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";

export default {
    components: {
        AddNewPositionBoardMgtOrgStrPro,
        // PopupEditedProject,
    },
    mixins: [geoDeptOrgProjects],
    setup() {
        return { v$: useVuelidate() };
    },
    validations() {
        return {
            departmentNewName: {
                required,
                minLength: minLength(3),
            },
            departmentByCountryOptSelect: {
                required,
            },
        };
    },
    computed: {
        ...mapGetters("orgDeptStrCou", ["allGeoDeptOrg"]),
        getDeptProjectId() {
            return parseInt(this.projectId) ? parseInt(this.projectId) : 0;
        },
        getDeptCountryId() {
            return parseInt(this.geoFenceLocation)
                ? parseInt(this.geoFenceLocation)
                : 0;
        },
        getAllOrgDept() {
            return this.allGeoDeptOrg ? this.allGeoDeptOrg : [];
        },
    },
    data() {
        return {
            openEditedProjectFrm: false,
            deletedGeoProjectDialogs: false,
            dataPositionsCountry: [],
            visibleDialogBoardMgtOrgStr: false,
            loadingPopupCountry: false,
            submitted: false,
            loadingSubmittedAddCountry: false,
            departmentByCountryOptSelect: null,
            getOptDepartmentOfCountry: [],
            selectedGeoProjectId: null,
            filtersGeoProjects: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            deletedDialogDataProjectId: 0,
            editPopupProjectStrData: null,
        };
    },
    mounted() {
        this.reloadFetchingDataOrgStrProject();
    },
    methods: {
        cancelAddGeoCountry() {
            this.visibleDialogBoardMgtOrgStr = false;
        },
        openDialogsAddPositionBoardMgtOrgPro() {
            this.visibleDialogBoardMgtOrgStr = true;
        },
        // Reloaded
        async reloadFetchingDataOrgStrProject() {
            try {
                this.fetchingDataGeoProStateOrgStr();
            } catch (error) {
                return Promise.reject(error);
            }
        },
    },
};
</script>
