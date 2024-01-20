<template>
    <KeepAlive>
        <div class="pl-2 gap-2 flex align-items-center justify-content-center">
            <Button
                aria-label="Add Position By Country"
                class="border-round-lg w-2rem h-2rem"
                icon="pi pi-plus"
                outlined
                :loading="loadingPopupCountry"
                @click="showDialogAddDepartment()"
            />
        </div>
    </KeepAlive>
    <!-- Modify Dialogs Project -->
    <PopupEditedProject
        v-if="editPopupProjectStrData"
        :geoOrgProjectStrData="editPopupProjectStrData"
        @close="closingPopupEditedProjectStr"
    />
    <!-- Dialog Managements Position Base Departments -->
    <Dialog
        v-model:visible="visibleDialogPositionProState"
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
                    Manage Projects
                </span>
            </div>
        </template>
        <!-- Form Submitted -->
        <div
            class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
        >
            <div class="pop-over-content p-20 p-sm-15 card">
                <!-- Departments -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <!-- Add more -->
                        <add-popup-new-project-base-geo />
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
                                    <p>Projects</p>
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-search" />
                                        <InputText
                                            v-model="
                                                filtersGeoProjects['global']
                                                    .value
                                            "
                                            placeholder="Search project name"
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
                                header="Project Name"
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
import AddPopupNewProjectBaseGeo from "./PopupAddNewProjects.vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import geoDeptOrgProjects from "@/mixin/manage_geo_org_str/manageProjectNameHelper";
import PopupEditedProject from "./PopupEditedProject.vue";
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";

export default {
    components: {
        AddPopupNewProjectBaseGeo,
        PopupEditedProject,
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
            visibleDialogPositionProState: false,
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
            this.visibleDialogPositionProState = false;
        },
        showDialogAddDepartment() {
            this.visibleDialogPositionProState = true;
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
