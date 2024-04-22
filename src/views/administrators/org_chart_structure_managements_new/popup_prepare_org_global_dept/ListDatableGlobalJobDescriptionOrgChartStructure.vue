<template>
    <DataTable
        v-model:section="selectedPositionData"
        :value="getPositionBaseDept ? getPositionBaseDept : {}"
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
            <div class="flex justify-content-between">
                <div class="formgrid grid">
                    <!-- Department -->
                    <div class="col-4 lg:col-6 field">
                        <label for="name_en" class="text-sm font-bold"
                            >Department
                            <span class="p-erorr">*</span>
                        </label>
                        <TreeSelect
                            showClear
                            inputId="geo_english_name"
                            aria-describedby="dd-error"
                            v-model="selectedParentDeptOrStructureJobDeptDes"
                            :options="orgStrDataTree"
                            display="comma"
                            placeholder="Selected department of org-Structures"
                            @update:modelValue="
                                selectedParentDeptOrgStrPos(
                                    selectedParentDeptOrStructureJobDeptDes
                                )
                            "
                            class="border-round-lg text-sm"
                        />
                    </div>
                    <!-- Position -->
                    <div class="col-4 lg:col-6 field">
                        <label for="name_en" class="text-sm font-bold"
                            >Position
                            <span class="p-erorr">*</span>
                        </label>
                        <Dropdown
                            showClear
                            v-model="selectedPositionDeptOrg"
                            :options="getPositionBaseDept"
                            optionLabel="deptPosName"
                            @update:modelValue="
                                onSelectedPositionDeptOrg(
                                    selectedPositionDeptOrg
                                )
                            "
                            emptyMessage="Empty list of positions"
                            filter
                            placeholder="Select a position"
                            class="w-full border-round-lg text-sm"
                            inputId="deptPosName"
                            aria-describedby="dd-error"
                        >
                            <template #value="slotProps">
                                <div
                                    v-if="slotProps.value"
                                    class="flex align-items-center"
                                >
                                    <div class="text-sm">
                                        {{
                                            geoNameToTitleCase(
                                                String(
                                                    slotProps.value
                                                        ?.deptPosName ?? ""
                                                )
                                            )
                                        }}({{
                                            slotProps.value.positionKhmerName ??
                                            ""
                                        }})
                                    </div>
                                </div>
                                <span v-else class="text-sm">
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center text-sm">
                                    <div class="text-sm">
                                        {{
                                            geoNameToTitleCase(
                                                String(
                                                    slotProps.option
                                                        .deptPosName ?? ""
                                                )
                                            )
                                        }}
                                        ({{
                                            slotProps.option
                                                .positionKhmerName ?? ""
                                        }})
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <!-- Position Selected -->
                    <div class="col-4 lg:col-6 field">
                        <span
                            class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0"
                        >
                            <i class="pi pi-search" />
                            <InputText
                                v-model="
                                    filtersDataPositionData['global'].value
                                "
                                class="p-inputtext p-component w-full text-sm"
                                placeholder="Search job dept. position descriptions..."
                            />
                        </span>
                    </div>
                </div>
            </div>
        </template>
        <!-- Empty Positions -->
        <template #empty>Empty job dept. descriptions</template>
        <!-- Loading Positions -->
        <template #loading>
            Loading job dept. descriptions data. Please wait...
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
import OpenEditedJobDescriptionOrgStructure from "../../org_chart_structure_managements_new/popup_prepare_org_global_dept/popup_org_project_dept_global/global_prepare_org_str_dept/EditJobDescriptionOrgStrData.vue";
import geoGlobalOrgStrLocationHelper from "@/mixin/getGeoGlobalOrgStrLocationHelper";
import manageOrgStrMgtPositionHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgStrMgtPositionHelper";
export default {
    components: {
        OpenEditedJobDescriptionOrgStructure,
    },
    props: {
        jobDescriptionData: {
            type: Array,
            required: true,
            default: () => {},
        },
        orgStrDataTree: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    mixins: [
        managerJobPositionOrgStructureProjectLevelZeroHelper,
        geoGlobalOrgStrLocationHelper,
        manageOrgStrMgtPositionHelper,
    ],
    data() {
        return {
            positionDataJobDes: null,
            selectedPositionData: false,
            visibleConfirmRemove: false,
            selectedParentDeptOrStructureJobDeptDes: null,
            dataObjPosition: null,
            filtersDataPositionData: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            orgDeptStrId: null,
            openDataJobDesc: null,
            openEditedJobDescDialogs: false,
            deletedJobDescId: 0,
            deletedJobDescDialogs: false,
            selectedPositionDeptOrg: null,
            positionDeptId: 0,
        };
    },
    methods: {
        // Selected Org Chart Departments
        selectedParentDeptOrgStrPos(orgDept) {
            try {
                const getSuperParentIdDept = orgDept ? orgDept : null;
                let deptParentOrgStrIdDept;
                if (
                    getSuperParentIdDept !== null ||
                    (getSuperParentIdDept !== undefined &&
                        typeof getSuperParentIdDept !== "object")
                ) {
                    const deptOrgDeptStr = getSuperParentIdDept
                        ? getSuperParentIdDept
                        : {};
                    const keyValId = Object.keys(deptOrgDeptStr)[0];
                    deptParentOrgStrIdDept = keyValId.split(/[,-]+/).pop();
                }
                this.$emit(
                    "org-str-dept",
                    deptParentOrgStrIdDept ? deptParentOrgStrIdDept : null
                );
                this.orgDeptStrId = deptParentOrgStrIdDept
                    ? deptParentOrgStrIdDept
                    : null;
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        onSelectedPositionDeptOrg(positionDeptData) {
            try {
                const positionDeptId = parseInt(positionDeptData?.deptPosId);
                if (positionDeptId == null || positionDeptId == "") {
                    this.addPositionBtnStatus = false;
                }
                if (
                    positionDeptId !== null ||
                    positionDeptId !== undefined ||
                    typeof positionDeptId !== "object"
                ) {
                    this.addPositionBtnStatus = true;
                    this.getAllReloadPositionJobDescriptionDeptOrg(
                        positionDeptId
                    );
                    this.positionDeptId = parseInt(positionDeptId)
                        ? parseInt(positionDeptId)
                        : 0;
                    this.$emit(
                        "position-id",
                        parseInt(positionDeptId) ? parseInt(positionDeptId) : 0
                    );
                }
            } catch (e) {
                throw Error(e);
            }
        },
    },
};
</script>
