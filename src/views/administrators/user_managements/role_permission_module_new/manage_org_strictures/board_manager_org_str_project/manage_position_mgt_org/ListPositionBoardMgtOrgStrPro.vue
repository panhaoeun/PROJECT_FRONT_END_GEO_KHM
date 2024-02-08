<template>
    <KeepAlive>
        <div class="pl-2 gap-2 flex align-items-center justify-content-center">
            <Button
                aria-label="Add Positions"
                severity="help"
                class="border-round-sm w-13rem h-2.5rem text-sm"
                outlined
                icon="pi pi-briefcase"
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
                <!-- Add more -->
                <AddNewPositionBoardMgtOrgStrPro />
                <!-- Modify Dialogs Positions Board Mgt Org-Structures -->
                <PopupEditedBoardMgtPosition
                    v-if="openEditedBoardMgtDialogs"
                    :openEditBoardMgtId="openEditBoardMgtData ? openEditBoardMgtData : ''"
                    @close="closingPopupEditedPosIdOrgStrDialogs"
                />
                <!-- Departments -->
                <div class="flex gap-15">
                    <div
                        class="inline-flex align-items-center align-content-between justify-content-between gap-5"
                    >
                        <!-- Dropdown of departments org-dept -->
                        <div
                            class="flex align-items-center justify-content-start"
                        >
                            <div class="input-wrap flex-1">
                                <label>Org.Structure </label>
                                <TreeSelect
                                    @change="
                                        onChangeSelectedDeptOrgStructureBoardMgt(
                                            $event
                                        )
                                    "
                                    v-model="orgDeptBoardMgtBaseEmpIdSelected"
                                    :options="
                                        getListAllDeptOrgStrPositionMgtBoard
                                    "
                                    aria-labelledby="deptOrgStrId"
                                    inputId="deptOrgStrId"
                                    placeholder="Select Department of Org.Structure..."
                                    aria-describedby="deptOrgStrId"
                                    selectionMode="single"
                                    display="comma"
                                    emptyMessage="No result found Org.Structure..."
                                    filter
                                    showClear
                                    class="border-round-lg border-round-lg w-30rem sm:w-26rem"
                                >
                                    <!--Placeholder Board-->
                                    <template #value="slotProps">
                                        <template
                                            v-if="
                                                slotProps !== null &&
                                                slotProps !== undefined &&
                                                slotProps.value !== 'object'
                                            "
                                        >
                                            <template
                                                v-for="(
                                                    orgDept, i
                                                ) in slotProps.value"
                                                :key="i"
                                            >
                                                <div
                                                    v-if="slotProps.value"
                                                    class="flex align-items-center"
                                                >
                                                    <div class="text-sm">
                                                        {{ orgDept?.label }}
                                                    </div>
                                                </div>
                                            </template>
                                        </template>
                                        <span v-else class="text-sm">
                                            {{ slotProps?.placeholder }}
                                        </span>
                                    </template>
                                    <!--Customize of department of mgt board-->
                                </TreeSelect>
                            </div>
                        </div>
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
                            :value="getPositionBaseDept"
                            :rowHover="true"
                            contextMenu
                            v-model:filters="filtersGeoPositionDept"
                            filterDisplay="menu"
                            :loading="fetchingOrgStrDeptPosId"
                            :filters="filtersGeoPositionDept"
                            responsiveLayout="scroll"
                            :globalFilterFields="[
                                'representative.deptPosName',
                                'deptPosName',
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
                                                filtersGeoPositionDept['global']
                                                    .value
                                            "
                                            placeholder="Search positions"
                                        />
                                    </span>
                                </div>
                            </template>
                            <!-- Column -->
                            <template #empty>
                                No department org-structure found.
                            </template>
                            <template #loading>
                                Loading department org-structure data. Please wait...
                            </template>
                            <Column
                                field="deptPosName"
                                header="Position"
                                sortField="deptPosName"
                                sortable
                            >
                                <template #body="{ data }">
                                    <span>
                                        {{
                                            String(data?.deptPosName).toString()
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
                                        @click="
                                            editGeoOrgDeptPosStrByPosIdDialog(
                                                slotProps?.data
                                            )
                                        "
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        outline
                                        class="p-button-rounded p-button-warning"
                                        @click="
                                            confirmDeletedDeptPosOrgStrById(
                                                slotProps?.data
                                            )
                                        "
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
                @click="cancelAddDeptPostMgt()"
                outlined
            />
        </template>
    </Dialog>
    <!-- Deleted Dialogs Project -->
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
                @click="confirmRemoveDeptPosMgtBoardById()"
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
import manageOrgStrMgtPositionHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgStrMgtPositionHelper";
import PopupEditedBoardMgtPosition from "./PopupEditedBoardMgtPosition.vue";
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";
export default {
    components: {
        AddNewPositionBoardMgtOrgStrPro,
        PopupEditedBoardMgtPosition,
    },
    mixins: [geoDeptOrgProjects, manageOrgStrMgtPositionHelper],
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
        ...mapGetters("orgStrDeptPosGeo", ["allOrgBoardHierarchyStructure"]),
        getDeptProjectId() {
            return parseInt(this.projectId) ? parseInt(this.projectId) : 0;
        },
        getListAllDeptOrgStrPositionMgtBoard() {
            return this.allOrgBoardHierarchyStructure || [];
        },
        getDeptCountryId() {
            return parseInt(this.geoFenceLocation)
                ? parseInt(this.geoFenceLocation)
                : 0;
        },
        getAllOrgDept() {
            return this.allGeoDeptOrg ? this.allGeoDeptOrg : [];
        },
        getAllBoardManagerOfProject() {
            return this.allOrgBoardHierarchyStructure || [];
        },
        geoNameToTitleCaseOrgBoard(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
    },
    data() {
        return {
            openEditedProjectFrm: false,
            deletedGeoDeptPosMgtDialogs: false,
            dataPositionsCountry: [],
            visibleDialogBoardMgtOrgStr: false,
            loadingPopupCountry: false,
            submitted: false,
            loadingSubmittedAddCountry: false,
            departmentByCountryOptSelect: null,
            getOptDepartmentOfCountry: [],
            selectedGeoProjectId: null,
            filtersGeoPositionDept: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            dataDeletedOrgBoardPosId: 0,
            editPopupProjectStrData: null,
            orgDeptBoardMgtBaseEmpIdSelected: null,
            fetchingOrgStrDeptPosId: false,
        };
    },
    mounted() {},
    methods: {
        cancelAddDeptPostMgt() {
            this.visibleDialogBoardMgtOrgStr = false;
        },
        openDialogsAddPositionBoardMgtOrgPro() {
            this.visibleDialogBoardMgtOrgStr = true;
        },
    },
};
</script>
