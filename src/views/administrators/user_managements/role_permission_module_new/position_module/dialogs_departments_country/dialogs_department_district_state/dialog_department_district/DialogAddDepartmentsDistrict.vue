<template>
    <Toast />
    <div class="pl-2 gap-2 flex align-items-right justify-content-end">
        <Button
            aria-label="Add Department By Country"
            class="border-round-lg h-2.1rem"
            icon="pi pi-plus"
            label="Add Department"
            :loading="btnLoadingAddNewDepartment"
            @click="openDialogAddDepartmentState()"
        />
    </div>
    <!-- Dialog Departments -->
    <Dialog
        v-model:visible="visibleDialogDepartmentProState"
        modal
        :style="{ width: '30rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <template #header>
            <div
                class="inline-flex align-items-center justify-content-center gap-2"
            >
                <span class="font-bold white-space-nowrap"
                    >Add New Department</span
                >
            </div>
        </template>
        <!-- Content Department Add New -->
        <div
            class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
        >
            <div class="pop-over-content p-20 p-sm-15 card">
                <!-- Departments -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label> Parent Departments </label>
                        <TreeSelect
                            v-model="selectedParentDeptCountry"
                            :options="getAllDeptOrgStrProvinceState"
                            aria-labelledby="parentDeptId"
                            placeholder="Select Department..."
                            aria-describedby="parentDeptId"
                            selectionMode="single"
                            display="comma"
                            emptyMessage="No result found department..."
                            filter
                            showClear
                            class="border-round-lg border-round-lg w-full"
                        />
                        <small class="text-sm flex text-blue-600"
                            >Leave it blank to create parent departments</small
                        >
                    </div>
                </div>
                <!-- Dept Name -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label
                            :class="{
                                'p-invalid border-round-lg border-round-lg p-error':
                                    v$.departmentNewName.$invalid && submitted,
                            }"
                        >
                            Department<span class="p-error">*</span>
                        </label>
                        <InputText
                            id="department_name"
                            placeholder="Please Enter New Department"
                            :input="v$.departmentNewName.$touch"
                            v-model="v$.departmentNewName.$model"
                            :oninput="v$.departmentNewName.$touch()"
                            :onblur="v$.departmentNewName.$touch()"
                            :class="{
                                'p-invalid border-round-lg p-error':
                                    v$.departmentNewName.$invalid && submitted,
                            }"
                            type="text"
                            class="text-sm border-round-lg"
                        />
                        <small
                            v-if="
                                (v$.departmentNewName.$invalid && submitted) ||
                                v$.departmentNewName.$pending.$response
                            "
                            class="p-error text-sm"
                            >{{
                                v$.departmentNewName.required.$message.replace(
                                    "Value",
                                    "New Department"
                                )
                            }}
                        </small>
                    </div>
                </div>
                <!-- Descriptions -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label>Descriptions</label>
                        <Textarea
                            v-model="descriptionDepartment"
                            placeholder="Please enter descriptions"
                            rows="5"
                            cols="30"
                        />
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button
                label="Cancel"
                @click="cancelAddDepartmentsState()"
                outlined
            />
            <Button
                :label="loadingSubmittedAddDepartment ? 'Save..' : 'Create'"
                :loading="loadingSubmittedAddDepartment"
                icon="pi pi-save"
                severity="danger"
                class="w-8rem"
                @click="submittedAddDepartmentsOfState()"
                autofocus
            />
        </template>
    </Dialog>
</template>
<!-- Script of JS -->
<script>
import geoOrgStrDeptDistrictHelper from "@/mixin/manage_geo_org_str/org_dept_geo_str/geoOrgStrDeptDistrictHelper";
import ManagePermissionsGeoFencePositionPermissionsServices from "@/services/administrator/geo_admin_position_manage_permissions/GeoAdminPositionPermissionsManagementServices";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";

export default {
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    props: {
        deptProjectId: {
            type: Number,
            default: 0,
        },
        deptCountryId: {
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
        };
    },
    mixins: [geoOrgStrDeptDistrictHelper],
    data() {
        return {
            orgDeptStrCountryList: [],
            selectedParentDeptCountry: null,
            deptCountryDataParents: [],
            visibleDialogDepartmentProState: false,
            btnLoadingAddNewDepartment: false,
            loadingSubmittedAddDepartment: false,
            departmentNewName: "",
            descriptionDepartment: "",
            submitted: false,
            deptCountryDataParentsOrgStr: [],
        };
    },
    created() {
        this.managePermissionsGeoLocationPosition =
            new ManagePermissionsGeoFencePositionPermissionsServices();
    },
    methods: {
        openDialogAddDepartmentState() {
            this.btnLoadingAddNewDepartment = true;
            setTimeout(() => {
                this.btnLoadingAddNewDepartment = false;
                this.visibleDialogDepartmentProState = true;
            }, 500);
        },
        cancelAddDepartmentsState() {
            this.visibleDialogDepartmentProState = false;
            // this.resetFromAddDeptOrg();
        },
        submittedAddDepartmentsOfState(validate) {
            try {
                this.addNewGeoOrgDeptProvinceState(validate);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        resetFromAddDeptOrgStr() {
            this.selectedParentDeptCountry = null;
            this.descriptionDepartment = "";
            this.departmentNewName = "";
        },
    },
};
</script>
