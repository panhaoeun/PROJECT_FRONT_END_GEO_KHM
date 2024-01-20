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
    <!-- Dialog Managements -->
    <Dialog
        v-model:visible="visibleDialogPositionCountry"
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
                    Manage Departments
                </span>
            </div>
        </template>
        <!-- Form Submitted -->
        <div
            class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
        >
            <div class="pop-over-content p-20 p-sm-15 card">
                <!-- Dialogs Edit Departments -->
                <DialogModifyDepartmentBaseGeoFenceCountry
                    :geoOrgCountryDeptStr="getOrgDeptCountry ? getOrgDeptCountry : null"
                    v-if="openDialogDeptCountry"
                    @close="closingPopupEditedDeptCountry"
                />
                <!-- Departments -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <!-- Add more -->
                        <dialog-add-department-base-geo-fence-country
                            :deptProjectId="
                                getDeptProjectId ? getDeptProjectId : 0
                            "
                            :deptCountryId="
                                getDeptCountryId ? getDeptCountryId : 0
                            "
                        />
                    </div>
                </div>
                <div>
                    <!-- Add Position Multiple Level -->
                    <div class="grid formgrid">
                        <el-table
                            height="500"
                            :data="getAllOrgDept"
                            style="width: 100%; margin-bottom: 20px"
                            row-key="orgDeptId"
                            border
                            highlight-current-row
                            :tree-props="{
                                children: 'children',
                                hasChildren: 'hasChildren',
                            }"
                        >
                            <el-table-column
                                label="SL"
                                type="index"
                                index="return index + 1"
                                width="50"
                            />
                            <el-table-column
                                prop="label"
                                label="Org Department Name"
                                sortable
                            />
                            <el-table-column prop="orgDeptName" label="Actions">
                                <template #default="scope">
                                    <div class="flex flex-wrap gap-2">
                                        <Button
                                            icon="pi pi-pencil"
                                            outline
                                            class="p-button-rounded p-button-success mr-2"
                                            @click="
                                                editGeoOrgDeptCountry(
                                                    scope?.row
                                                )
                                            "
                                        />
                                        <Button
                                            icon="pi pi-trash"
                                            outline
                                            class="p-button-rounded w-1 p-button-warning"
                                            @click="
                                               removeDeptOrgByCountryPopup(
                                                    scope?.row
                                                )
                                            "
                                        />
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
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
    <!-- Deleted Dialogs Department base Country -->
    <Dialog
        v-model:visible="deletedGeoDeptOrgDialogs"
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
                @click="deletedGeoDeptOrgDialogs = false"
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                text
                @click="confirmRemoveDeptByIdCountry(deletedGeoDeptOrgDialogs)"
            />
        </template>
    </Dialog>
</template>

<!-- Department JS -->
<script>
import DialogAddDepartmentBaseGeoFenceCountry from "./dialogs_departments_country/DialogAddDepartments.vue";
import DialogModifyDepartmentBaseGeoFenceCountry from "./dialogs_departments_country/EditManageDepartmentPosGeoCountry.vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import geoOrgStrDeptCountryHelper from "@/mixin/manage_geo_org_str/org_dept_geo_str/geoOrgStrDeptCountryHelper";
import { mapGetters } from "vuex";

export default {
    components: {
        DialogAddDepartmentBaseGeoFenceCountry,
        DialogModifyDepartmentBaseGeoFenceCountry,
    },
    mixins: [geoOrgStrDeptCountryHelper],
    setup() {
        return { v$: useVuelidate() };
    },
    props: {
        projectId: {
            type: Number,
            default: 0,
        },
        geoFenceLocation: {
            type: Number,
            default: 0,
        },
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
            dataPositionsCountry: [],
            visibleDialogPositionCountry: false,
            loadingPopupCountry: false,
            submitted: false,
            loadingSubmittedAddCountry: false,
            departmentByCountryOptSelect: null,
            getOptDepartmentOfCountry: [],
            deletedGeoDeptOrgDialogs: false,
            geoDeptOrgIdRemove: 0,
            getGeoDeptOrgCountry: null,
            openDialogDeptCountry: false,
            getOrgDeptCountry: null
        };
    },
    mounted() {
        this.reloadFetchingDataOrgStr();
    },
    methods: {
        cancelAddGeoCountry() {
            this.visibleDialogPositionCountry = false;
        },
        showDialogAddDepartment() {
            this.visibleDialogPositionCountry = true;
        },
        closingPopupEditedDeptCountry() {
            this.openDialogDeptCountry = false;
        },
        // Reloaded
        async reloadFetchingDataOrgStr() {
            try {
                const projectId = parseInt(this.projectId)
                    ? parseInt(this.deptProjectId)
                    : 0;
                const deptGeoCountryId = parseInt(this.geoFenceLocation)
                    ? parseInt(this.geoFenceLocation)
                    : 0;
                if (deptGeoCountryId !== "" && deptGeoCountryId > 0) {
                    await this.fetchingDataGeoCountryOrgStr(
                        projectId,
                        deptGeoCountryId
                    );
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        // Submitted
        submittedAddDepartmentPositionCountry(validate) {
            try {
                this.loadingSubmittedAddCountry = true;
                this.submitted = true;

                setTimeout(() => {
                    this.loadingSubmittedAddCountry = false;
                }, 1000);
                this.v$.$touch();
                if (!validate) {
                    this.$toast.add({
                        severity: "error",
                        summary: "Please Fix Below Errors.",
                        detail: "Please input filed position have missing value!",
                        life: 3000,
                    });
                    return false;
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
    },
};
</script>
