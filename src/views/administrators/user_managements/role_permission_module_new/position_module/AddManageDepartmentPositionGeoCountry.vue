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
                                            aria-label="Edit Org Dept"
                                            outlined
                                            @click="
                                                editGeoOrgDeptCountry(
                                                    scope.$index,
                                                    scope.row
                                                )
                                            "
                                            rounded
                                            class="w-2 h-2 p-button-sm text-sm"
                                            label="Edit"
                                        />
                                        <Button
                                            icon="pi pi-trash"
                                            aria-label="Edit Org Dept"
                                            outlined
                                            @click="
                                                editGeoOrgDeptCountry(
                                                    scope.$index,
                                                    scope.row
                                                )
                                            "
                                            rounded
                                            class="w-3 h-2 p-button-sm text-sm text-danger"
                                            label="Delete"
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
            <!-- <Button
                :label="loadingSubmittedAddCountry ? 'Save..' : 'Create'"
                :loading="loadingSubmittedAddCountry"
                icon="pi pi-save"
                severity="danger"
                class="w-8rem"
                @click="submittedAddDepartmentPositionCountry()"
                autofocus
            /> -->
        </template>
    </Dialog>
</template>

<!-- Department JS -->
<script>
import DialogAddDepartmentBaseGeoFenceCountry from "./dialogs_departments_country/DialogAddDepartments.vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import geoOrgStrDeptCountryHelper from "@/mixin/manage_geo_org_str/org_dept_geo_str/geoOrgStrDeptCountryHelper";
import { mapGetters } from "vuex";

export default {
    components: {
        DialogAddDepartmentBaseGeoFenceCountry,
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
        // Submited
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
