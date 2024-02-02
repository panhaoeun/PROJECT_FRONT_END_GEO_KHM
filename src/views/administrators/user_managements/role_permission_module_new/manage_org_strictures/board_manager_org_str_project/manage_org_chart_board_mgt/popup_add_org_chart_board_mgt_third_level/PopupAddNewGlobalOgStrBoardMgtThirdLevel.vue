<template>
    <Toast />
    <div class="pl-2 gap-2 flex align-items-right justify-content-end">
        <Button
            aria-label="Add New Structure Level 01"
            class="border-round-lg h-2.1rem"
            icon="pi pi-plus"
            label="Add New Structure Level 01"
            :loading="btnLoadingBoardMgt"
            @click="openDialogAddOrgStrBoardMgt()"
        />
    </div>
    <!-- Dialog Departments -->
    <Dialog
        v-model:visible="visibleDialogOrgStrBoardMgt"
        modal
        :style="{ width: '30rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <template #header>
            <div
                class="inline-flex align-items-center justify-content-center gap-2"
            >
                <span class="font-bold white-space-nowrap"
                    >Add New Structure Level 03</span
                >
            </div>
        </template>
        <!-- Content New Structure Level 01 -->
        <div
            class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
        >
            <div class="pop-over-content p-20 p-sm-15 card">
                <!-- Departments -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label> Parent Org Structure Level 01 </label>
                        <Dropdown
                            :options="getAllDeptOrgStrMgtOrg"
                            v-model="v$.selectedParentDeptOrgStrBoardMgt.$model"
                            :oninput="
                                v$.selectedParentDeptOrgStrBoardMgt.$touch()
                            "
                            :onblur="
                                v$.selectedParentDeptOrgStrBoardMgt.$touch()
                            "
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
                        <small class="text-sm text-red flex text-blue-600"
                            >Please selected root level (Level 01) of
                            org-structure</small
                        >
                    </div>
                </div>
                <!-- New Org Structure Khmer Name-->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label
                            :class="{
                                'p-invalid border-round-lg border-round-lg p-error':
                                    v$.orgStrBoardMgtEnglishName.$invalid &&
                                    submitted,
                            }"
                        >
                            English Name <span class="p-error">*</span>
                        </label>
                        <InputText
                            id="english_name"
                            placeholder="Please Enter New Org Structure English Name"
                            :input="v$.orgStrBoardMgtEnglishName.$touch"
                            v-model="v$.orgStrBoardMgtEnglishName.$model"
                            :oninput="v$.orgStrBoardMgtEnglishName.$touch()"
                            :onblur="v$.orgStrBoardMgtEnglishName.$touch()"
                            :class="{
                                'p-invalid border-round-lg p-error':
                                    v$.orgStrBoardMgtEnglishName.$invalid &&
                                    submitted,
                            }"
                            type="text"
                            class="text-sm border-round-lg"
                        />
                        <small
                            v-if="
                                (v$.orgStrBoardMgtEnglishName.$invalid &&
                                    submitted) ||
                                v$.orgStrBoardMgtEnglishName.$pending.$response
                            "
                            class="p-error text-sm"
                            >{{
                                v$.orgStrBoardMgtEnglishName.required.$message.replace(
                                    "Value",
                                    "New Org Structure English Name"
                                )
                            }}
                        </small>
                    </div>
                </div>
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label> Khmer Name </label>
                        <InputText
                            id="department_name"
                            placeholder="Please Enter New Org Structure Khmer Name"
                            :input="orgStrBoardMgtKhmerName"
                            type="text"
                            class="text-sm border-round-lg"
                        />
                    </div>
                </div>
                <!-- Descriptions -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label>Descriptions</label>
                        <Textarea
                            v-model="descriptionOrgStrBoardMgt"
                            placeholder="Please enter descriptions"
                            rows="5"
                            cols="30"
                        />
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" @click="cancelAddOrgBoardMgt()" outlined />
            <Button
                :label="loadingSubmittedAddMgtBoardStrOrg ? 'Save..' : 'Create'"
                :loading="loadingSubmittedAddMgtBoardStrOrg"
                icon="pi pi-save"
                severity="danger"
                class="w-8rem"
                @click="submittedAddOrgStrLevelThirdBaseOnSecond()"
                autofocus
            />
        </template>
    </Dialog>
</template>
<!-- Script of Org-Strictures -->
<script>
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";
import manageOrgChartBoardMgtThirdLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtThirdHelper";
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
        deptSecondLevelProjectId: {
            type: Number,
            required: true,
            default: 0,
        },
        deptCountrySecondLevelId: {
            type: Number,
            default: 0,
        },
        deptOrgStrRootLevelId: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    validations() {
        return {
            orgStrBoardMgtEnglishName: {
                required,
                minLength: minLength(3),
            },
            selectedParentDeptOrgStrBoardMgt: {
                required,
            },
        };
    },
    mixins: [
        manageOrgChartBoardMgtLevelHelper,
        manageOrgChartBoardMgtThirdLevelHelper
    ],
    data() {
        return {
            orgDeptStrCountryList: [],
            selectedParentDeptOrgStrBoardMgt: null,
            deptCountryDataParents: [],
            visibleDialogOrgStrBoardMgt: false,
            btnLoadingBoardMgt: false,
            loadingSubmittedAddMgtBoardStrOrg: false,
            orgStrBoardMgtEnglishName: "",
            orgStrBoardMgtKhmerName: "",
            descriptionOrgStrBoardMgt: "",
            submitted: false,
            deptCountryDataParentsOrgStr: [],
        };
    },
    created() {
        this.managePermissionsGeoLocationPosition =
            new ManagePermissionsGeoFencePositionPermissionsServices();
    },
    methods: {
        openDialogAddOrgStrBoardMgt() {
            this.btnLoadingBoardMgt = true;
            setTimeout(() => {
                this.btnLoadingBoardMgt = false;
                this.visibleDialogOrgStrBoardMgt = true;
            }, 500);
        },
        cancelAddOrgBoardMgt() {
            this.visibleDialogOrgStrBoardMgt = false;
        },
        submittedAddNewOrgStrBoardMgt(validate) {
            try {
                this.addNewGeoOrgDeptProvinceState(validate);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        resetFromAddDeptOrgStr() {
            this.selectedParentDeptOrgStrBoardMgt = null;
            this.descriptionOrgStrBoardMgt = "";
            this.orgStrBoardMgtEnglishName = "";
        },
    },
};
</script>
