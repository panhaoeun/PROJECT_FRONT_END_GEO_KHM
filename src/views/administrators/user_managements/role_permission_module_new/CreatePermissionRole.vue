<template>
    <!--Manage Permissions By Project-->
    <Toast />
    <div class="layout-content px-4 py-4">
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Create Organization Structure
            </h2>
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click.prevent="
                    $router.push(
                        '/vendor/user/permission/role-module/crete-user-auth/ui-permission-auth-role-module'
                    )
                "
            >
                <div class="pl-2 justify-content-center">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{ $t("route.routeBack") }}</span>
                </div>
            </el-button>
        </div>
        <!-- Grid -->
        <div class="gird">
            <div class="col-12">
                <el-card class="box-card py-2 px-2">
                    <div class="grid grid-nogutter flex-wrap gap-1 p-fluid">
                        <div class="col-12 lg:col-12">
                            <div class="grid formgrid">
                                <!-- Project name -->
                                <div class="col-6 field">
                                    <div class="field">
                                        <label
                                            for="role_name"
                                            class="text-sm font-semibold"
                                            :class="{
                                                'p-invalid border-round-lg border-round-lg p-error':
                                                    v$.projectNameBaseRole
                                                        .$invalid && submitted,
                                            }"
                                        >
                                            Project Name
                                            <span class="p-error">*</span>
                                        </label>
                                        <Dropdown
                                            :options="dataProjectNameOpt"
                                            filter
                                            v-model="
                                                v$.projectNameBaseRole.$model
                                            "
                                            :class="{
                                                'p-invalid border-round-lg border-round-lg p-error':
                                                    v$.projectNameBaseRole
                                                        .$invalid && submitted,
                                            }"
                                            inputId="projectId"
                                            optionLabel="projectName"
                                            placeholder="Select a project name"
                                            aria-describedby="dd-error"
                                            class="w-full border-round-lg text-sm"
                                        >
                                            <template #value="slotProps">
                                                <div
                                                    v-if="slotProps.value"
                                                    class="flex align-items-center"
                                                >
                                                    <div>
                                                        {{
                                                            slotProps.value
                                                                ?.project_name
                                                        }}
                                                    </div>
                                                </div>
                                                <span v-else>
                                                    {{ slotProps.placeholder }}
                                                </span>
                                            </template>
                                            <template #option="slotProps">
                                                <div
                                                    class="flex align-items-center"
                                                >
                                                    <div>
                                                        {{
                                                            slotProps.option
                                                                ?.project_name
                                                        }}
                                                    </div>
                                                </div>
                                            </template>
                                        </Dropdown>
                                        <small
                                            v-if="
                                                (v$.projectNameBaseRole
                                                    .$invalid &&
                                                    submitted) ||
                                                v$.projectNameBaseRole.$pending
                                                    .$response
                                            "
                                            class="p-error text-sm"
                                        >
                                            {{
                                                v$.projectNameBaseRole.required.$message.replace(
                                                    "Value",
                                                    "Project Name"
                                                )
                                            }}
                                        </small>
                                    </div>
                                </div>
                                <!-- Country's Selection-->
                                <div class="col-6">
                                    <div class="field">
                                        <label
                                            for="role_name"
                                            class="text-sm font-semibold"
                                            :class="{
                                                'p-invalid border-round-lg border-round-lg p-error':
                                                    v$.modelCountryNameSelected
                                                        .$invalid && submitted,
                                            }"
                                        >
                                            Country<span class="p-error"
                                                >*</span
                                            >
                                        </label>
                                        <div class="flex field flex-row">
                                            <Dropdown
                                                showClear
                                                v-model="
                                                    v$.modelCountryNameSelected
                                                        .$model
                                                "
                                                :class="{
                                                    'p-invalid border-round-lg p-error':
                                                        v$
                                                            .modelCountryNameSelected
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                                :options="
                                                    getOptCountryOnProject
                                                "
                                                optionLabel="geo_english_name"
                                                filter
                                                placeholder="Select a Country"
                                                class="w-full border-round-lg text-sm"
                                                inputId="geo_english_name"
                                                aria-describedby="dd-error"
                                            >
                                                <template #value="slotProps">
                                                    <div
                                                        v-if="slotProps.value"
                                                        class="flex align-items-center"
                                                    >
                                                        <div class="text-sm">
                                                            {{
                                                                slotProps.value
                                                                    ?.geo_english_name ??
                                                                ""
                                                            }}({{
                                                                slotProps.value
                                                                    .geo_zip_code ??
                                                                ""
                                                            }})
                                                        </div>
                                                    </div>
                                                    <span
                                                        v-else
                                                        class="text-sm"
                                                    >
                                                        {{
                                                            slotProps.placeholder
                                                        }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div
                                                        class="flex align-items-center text-sm"
                                                    >
                                                        <div class="text-sm">
                                                            {{
                                                                slotProps.option
                                                                    .geo_english_name ??
                                                                ""
                                                            }}
                                                            ({{
                                                                slotProps.option
                                                                    ?.geo_zip_code ??
                                                                ""
                                                            }})
                                                        </div>
                                                    </div>
                                                </template>
                                            </Dropdown>
                                            <!-- Button Add More Manage By Position Country -->
                                            <popup-add-manage-department-position-geo
                                                v-if="
                                                    modelCountryNameSelected !==
                                                    null
                                                "
                                                :projectId="
                                                    getProjectById
                                                        ? getProjectById
                                                        : 0
                                                "
                                                :geoFenceLocation="
                                                    getCountryId
                                                        ? getCountryId
                                                        : 0
                                                "
                                            />
                                        </div>
                                        <!-- Validations -->
                                        <small
                                            v-if="
                                                (v$.modelCountryNameSelected
                                                    .$invalid &&
                                                    submitted) ||
                                                v$.modelCountryNameSelected
                                                    .$pending?.$response
                                            "
                                            class="p-error text-sm"
                                        >
                                            {{
                                                v$.modelCountryNameSelected.required.$message.replace(
                                                    "Value",
                                                    "Country"
                                                )
                                            }}
                                        </small>
                                    </div>
                                </div>
                                <!-- Province's Selection-->
                                <div class="col-6">
                                    <div class="field">
                                        <label
                                            for="role_name"
                                            class="text-sm font-semibold"
                                            :class="{
                                                'p-invalid border-round-lg border-round-lg p-error':
                                                    v$
                                                        .modelProvinceStateSelected
                                                        .$invalid && submitted,
                                            }"
                                        >
                                            Province or State<span
                                                class="p-error"
                                                >*</span
                                            >
                                        </label>
                                        <div class="flex field flex-row">
                                            <Dropdown
                                                showClear
                                                v-model="
                                                    v$
                                                        .modelProvinceStateSelected
                                                        .$model
                                                "
                                                :class="{
                                                    'p-invalid border-round-lg p-error':
                                                        v$
                                                            .modelProvinceStateSelected
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                                :options="
                                                    allStateCountryAddNewPosition
                                                "
                                                @click="
                                                    getProvinceByCountrySelectedOrgStr(
                                                        modelCountryNameSelected
                                                    )
                                                "
                                                optionLabel="geo_english_name"
                                                filter
                                                placeholder="Select a Province or State"
                                                class="w-full border-round-lg text-sm"
                                                inputId="geo_english_name"
                                                aria-describedby="dd-error"
                                            >
                                                <template #value="slotProps">
                                                    <div
                                                        v-if="slotProps.value"
                                                        class="flex align-items-center"
                                                    >
                                                        <div class="text-sm">
                                                            {{
                                                                slotProps.value
                                                                    ?.geo_english_name ??
                                                                ""
                                                            }}({{
                                                                slotProps.value
                                                                    .geo_zip_code ??
                                                                ""
                                                            }})
                                                        </div>
                                                    </div>
                                                    <span
                                                        v-else
                                                        class="text-sm"
                                                    >
                                                        {{
                                                            slotProps.placeholder
                                                        }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div
                                                        class="flex align-items-center text-sm"
                                                    >
                                                        <div class="text-sm">
                                                            {{
                                                                slotProps.option
                                                                    .geo_english_name ??
                                                                ""
                                                            }}
                                                            ({{
                                                                slotProps.option
                                                                    ?.geo_zip_code ??
                                                                ""
                                                            }})
                                                        </div>
                                                    </div>
                                                </template>
                                            </Dropdown>
                                            <!-- Button Add More Manage By Department Base State -->
                                            <PopupAddManageProvinceDept
                                                v-if="
                                                    modelProvinceStateSelected !==
                                                    null
                                                "
                                                :projectId="
                                                    getProjectById
                                                        ? getProjectById
                                                        : 0
                                                "
                                                :geoFenceLocation="
                                                    getProvinceStateId
                                                        ? getProvinceStateId
                                                        : 0
                                                "
                                            />
                                        </div>
                                        <!-- Validations -->
                                        <small
                                            v-if="
                                                (v$.modelProvinceStateSelected
                                                    .$invalid &&
                                                    submitted) ||
                                                v$.modelProvinceStateSelected
                                                    .$pending?.$response
                                            "
                                            class="p-error text-sm"
                                        >
                                            {{
                                                v$.modelProvinceStateSelected.required.$message.replace(
                                                    "Value",
                                                    "Province or State"
                                                )
                                            }}
                                        </small>
                                    </div>
                                </div>
                                <!-- District's Selection-->
                                <div class="col-6">
                                    <div class="field">
                                        <label
                                            for="role_name"
                                            class="text-sm font-semibold"
                                            :class="{
                                                'p-invalid border-round-lg border-round-lg p-error':
                                                    v$.modelDistrictSelected
                                                        .$invalid && submitted,
                                            }"
                                        >
                                            District<span class="p-error"
                                                >*</span
                                            >
                                        </label>
                                        <div class="flex field flex-row">
                                            <Dropdown
                                                showClear
                                                v-model="
                                                    v$.modelDistrictSelected
                                                        .$model
                                                "
                                                :class="{
                                                    'p-invalid border-round-lg p-error':
                                                        v$.modelDistrictSelected
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                                :options="
                                                    allStateDistrictAddNewPosition
                                                "
                                                @click="
                                                    getDistrictByProvinceSelectedOrgStr(
                                                        modelProvinceStateSelected
                                                    )
                                                "
                                                optionLabel="geo_english_name"
                                                filter
                                                placeholder="Select a Country"
                                                class="w-full border-round-lg text-sm"
                                                inputId="geo_english_name"
                                                aria-describedby="dd-error"
                                            >
                                                <template #value="slotProps">
                                                    <div
                                                        v-if="slotProps.value"
                                                        class="flex align-items-center"
                                                    >
                                                        <div class="text-sm">
                                                            {{
                                                                slotProps.value
                                                                    ?.geo_english_name ??
                                                                ""
                                                            }}({{
                                                                slotProps.value
                                                                    .geo_zip_code ??
                                                                ""
                                                            }})
                                                        </div>
                                                    </div>
                                                    <span
                                                        v-else
                                                        class="text-sm"
                                                    >
                                                        {{
                                                            slotProps.placeholder
                                                        }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div
                                                        class="flex align-items-center text-sm"
                                                    >
                                                        <div class="text-sm">
                                                            {{
                                                                slotProps.option
                                                                    .geo_english_name ??
                                                                ""
                                                            }}
                                                            ({{
                                                                slotProps.option
                                                                    ?.geo_zip_code ??
                                                                ""
                                                            }})
                                                        </div>
                                                    </div>
                                                </template>
                                            </Dropdown>
                                            <!-- Button Add More Manage By Position Country -->
                                            <!-- Button Add More Manage By Department Base State -->
                                            <PopupAddManageDistrictDept
                                                v-if="
                                                    modelDistrictSelected !==
                                                    null
                                                "
                                                :projectId="
                                                    getProjectById
                                                        ? getProjectById
                                                        : 0
                                                "
                                                :geoFenceLocation="
                                                    getDistrictStateId
                                                        ? getDistrictStateId
                                                        : 0
                                                "
                                            />
                                        </div>
                                        <!-- Validations -->
                                        <small
                                            v-if="
                                                (v$.modelDistrictSelected
                                                    .$invalid &&
                                                    submitted) ||
                                                v$.modelDistrictSelected
                                                    .$pending?.$response
                                            "
                                            class="p-error text-sm"
                                        >
                                            {{
                                                v$.modelDistrictSelected.required.$message.replace(
                                                    "Value",
                                                    "Province or State"
                                                )
                                            }}
                                        </small>
                                    </div>
                                </div>
                                <!-- Commune's Selection-->
                                <div class="col-6">
                                    <div class="field">
                                        <label
                                            for="role_name"
                                            class="text-sm font-semibold"
                                            :class="{
                                                'p-invalid border-round-lg border-round-lg p-error':
                                                    v$.modelCommuneTownSelected
                                                        .$invalid && submitted,
                                            }"
                                        >
                                            Town / Commune<span class="p-error"
                                                >*</span
                                            >
                                        </label>
                                        <div class="flex field flex-row">
                                            <Dropdown
                                                showClear
                                                v-model="
                                                    v$.modelCommuneTownSelected
                                                        .$model
                                                "
                                                :class="{
                                                    'p-invalid border-round-lg p-error':
                                                        v$
                                                            .modelCommuneTownSelected
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                                :options="
                                                    allCommuneCountryByComPosition
                                                "
                                                @click="
                                                    getCommuneByDistrictSelectedOrgStr(
                                                        modelDistrictSelected
                                                    )
                                                "
                                                optionLabel="geo_english_name"
                                                filter
                                                placeholder="Select a Country"
                                                class="w-full border-round-lg text-sm"
                                                inputId="geo_english_name"
                                                aria-describedby="dd-error"
                                            >
                                                <template #value="slotProps">
                                                    <div
                                                        v-if="slotProps.value"
                                                        class="flex align-items-center"
                                                    >
                                                        <div class="text-sm">
                                                            {{
                                                                slotProps.value
                                                                    ?.geo_english_name ??
                                                                ""
                                                            }}({{
                                                                slotProps.value
                                                                    .geo_zip_code ??
                                                                ""
                                                            }})
                                                        </div>
                                                    </div>
                                                    <span
                                                        v-else
                                                        class="text-sm"
                                                    >
                                                        {{
                                                            slotProps.placeholder
                                                        }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div
                                                        class="flex align-items-center text-sm"
                                                    >
                                                        <div class="text-sm">
                                                            {{
                                                                slotProps.option
                                                                    .geo_english_name ??
                                                                ""
                                                            }}
                                                            ({{
                                                                slotProps.option
                                                                    ?.geo_zip_code ??
                                                                ""
                                                            }})
                                                        </div>
                                                    </div>
                                                </template>
                                            </Dropdown>
                                            <!-- Button Add More Manage By Position Country -->
                                            <PopupAddManageCommuneDept
                                                v-if="
                                                    modelCommuneTownSelected !==
                                                    null
                                                "
                                                :projectId="
                                                    getProjectById
                                                        ? getProjectById
                                                        : 0
                                                "
                                                :geoFenceLocation="
                                                    getCommuneOrgId
                                                        ? getCommuneOrgId
                                                        : 0
                                                "
                                            />
                                        </div>
                                        <!-- Validations -->
                                        <small
                                            v-if="
                                                (v$.modelProvinceStateSelected
                                                    .$invalid &&
                                                    submitted) ||
                                                v$.modelProvinceStateSelected
                                                    .$pending?.$response
                                            "
                                            class="p-error text-sm"
                                        >
                                            {{
                                                v$.modelProvinceStateSelected.required.$message.replace(
                                                    "Value",
                                                    "Province or State"
                                                )
                                            }}
                                        </small>
                                    </div>
                                </div>
                                <!-- Org-structures Descriptions -->
                                <div class="col-12 field">
                                    <div class="field">
                                        <label
                                            for="role_name"
                                            class="text-sm font-semibold"
                                        >
                                            Description
                                        </label>
                                        <TextArea
                                            id="role_name"
                                            placeholder="Description"
                                            v-model="rolePermissionDescriptions"
                                            type="text"
                                            class="text-sm border-round-lg py-4"
                                        />
                                    </div>
                                </div>
                                <!--========Manage Departments with Positions===========-->
                                <manage-position-dept-module-on-geo
                                    v-if="modelCountryNameSelected !== null"
                                    :projectId="
                                        getProjectById ? getProjectById : 0
                                    "
                                    :geoFenceLocationId="
                                        getCountryId ? getCountryId : 0
                                    "
                                />
                                <!-- Buttons Submits -->
                                <div
                                    class="col-12 flex justify-content-end mt-2"
                                >
                                    <!--Buttons-->
                                    <el-button
                                        :loading="loadingSubmittedRole"
                                        type="info"
                                        size="large"
                                        class="btn w-10rem btn-primary"
                                        @click.prevent="
                                            submittedCreatePermissionRole(
                                                !v$.$invalid
                                            )
                                        "
                                    >
                                        <div
                                            class="pl-2 justify-content-center"
                                        >
                                            <i
                                                class="pi pi-check"
                                                style="font-size: 1rem"
                                            ></i>
                                            <span class="pl-2">{{
                                                $t("route.routeSave")
                                            }}</span>
                                        </div>
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<!-- Create Manage Permissions -->
<script>
import ManagePermissionsRoleBaseProject from "@/services/vendors/user_permissions/ManagePermissionRoleProjects";
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import rolePermissionsManageHelper from "@/mixin/role_permissions_manage/rolePermissionsManageHelper";

/**
 *@Geographic manage for position
 * */
import PopupAddManageDepartmentPositionGeo from "./position_module/AddManageDepartmentPositionGeoCountry.vue";
import PopupAddManageProvinceDept from "./position_module/dialogs_departments_country/dialogs_department_province_state/AddNewDepartmentPositionDialogState.vue";
import PopupAddManageDistrictDept from "./position_module/dialogs_departments_country/dialogs_department_district_state/AddNewDepartmentPositionDistrictDialog.vue";
import PopupAddManageCommuneDept from "./position_module/dialogs_departments_country/dialogs_department_commune/AddNewDepartmentPositionCommuneDialog.vue";
import ManagePositionDeptModuleOnGeo from "./position_module/ManageDepartmentBaseOnGeoFence.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    mixins: [rolePermissionsManageHelper],
    components: {
        PopupAddManageDepartmentPositionGeo,
        ManagePositionDeptModuleOnGeo,
        PopupAddManageProvinceDept,
        PopupAddManageDistrictDept,
        PopupAddManageCommuneDept,
    },
    setup() {
        return { v$: useVuelidate() };
    },
    created() {
        this.managerPermissionBaseOnProject =
            new ManagePermissionsRoleBaseProject();
        this.geoLocationServicesOnProject =
            new GeoLocationsManagementServices();
    },
    computed: {
        ...mapGetters("geoCountry", ["countryAll"]),
        ...mapGetters("geoProvince", ["provinceAll"]),
        ...mapGetters("geoDistrict", ["districtAll"]),
        ...mapGetters("geoCommune", ["communeAll"]),
        getProjectById() {
            return parseInt(this.projectNameBaseRole?.id)
                ? parseInt(this.projectNameBaseRole?.id)
                : 0;
        },
        getCountryId() {
            return parseInt(this.modelCountryNameSelected?.id)
                ? parseInt(this.modelCountryNameSelected?.id)
                : 0;
        },
        getProvinceStateId() {
            return parseInt(this.modelProvinceStateSelected?.id)
                ? parseInt(this.modelProvinceStateSelected?.id)
                : 0;
        },
        getDistrictStateId() {
            return parseInt(this.modelDistrictSelected?.id)
                ? parseInt(this.modelDistrictSelected?.id)
                : 0;
        },
        getCommuneOrgId() {
            return parseInt(this.modelCommuneTownSelected?.id)
                ? parseInt(this.modelCommuneTownSelected?.id)
                : 0;
        },
        allCountryPosition() {
            return this.countryAll || [];
        },
        allStateCountryAddNewPosition() {
            return this.provinceAll || [];
        },
        allStateDistrictAddNewPosition() {
            return this.districtAll || [];
        },
        allCommuneCountryByComPosition() {
            return this.communeAll || [];
        },
        getCommuneByVillagePosition() {
            return this.selectVillageDeptPos || [];
        },
    },
    data() {
        return {
            metaKeyPermission: false,
            selectedKeyPermission: null,
            dataPermissionTreeTable: [],
            filters: {},
            dataProjectNameOpt: [],
            getOptCountryOnProject: [],
            submitted: false,
            loadingSubmittedRole: false,
            projectNameBaseRole: null,
            modelCountryNameSelected: null,
            rolePermissionDescriptions: null,
            // Check Permission
            checkViewPermission: {},
            permissionListByProject: [],
            modelProvinceStateSelected: null,
            selectVillageDeptPos: null,
            modelDistrictSelected: null,
            modelCommuneTownSelected: null,
            searchPermissionRole: "",
        };
    },
    validations() {
        return {
            projectNameBaseRole: { required },
            modelCountryNameSelected: { required },
            modelProvinceStateSelected: { required },
            modelDistrictSelected: { required },
            modelCommuneTownSelected: { required },
        };
    },
    mounted() {
        this.getAllProjectObj();
        this.getPermissionsManagementBaseProject();
        this.getGeoLocationCountry();
    },
    methods: {
        ...mapActions("geoCountry", ["getAllCountryActions"]),
        ...mapActions("geoProvince", ["getAllProvinceActions"]),
        ...mapActions("geoDistrict", ["getAllDistrictActions"]),
        ...mapActions("geoCommune", ["getAllCommuneActions"]),
        ...mapActions("geoVillages", ["getAllVillagesActions"]),
        /**
         * @Get All Projects
         * */
        getAllProjectObj() {
            this.managerPermissionBaseOnProject
                .getAllProject()
                .then((project) => {
                    try {
                        if (!Array.isArray(project) || !project?.length > 0) {
                            this.dataProjectNameOpt = [];
                        }
                        if (
                            !Array.isArray(project) ||
                            project !== undefined ||
                            project !== null
                        ) {
                            this.dataProjectNameOpt = project ? project : "";
                        }
                    } catch (error) {
                        return Promise.reject(error);
                    }
                });
        },
        /**
         * @Get All Country's
         * */
        getGeoLocationCountry() {
            try {
                const countryZipTypeCountry = "T1";
                const superSSNCountryCode = "";
                this.geoLocationServicesOnProject
                    .listGeoLocationCountryByZip(
                        countryZipTypeCountry,
                        superSSNCountryCode
                    )
                    .then((country) => {
                        if (!country) {
                            this.getOptCountryOnProject = [];
                        }
                        this.getOptCountryOnProject = Array.isArray(country)
                            ? country.slice()
                            : [];
                    })
                    .catch((error) => {
                        return Promise.reject(error.message || []);
                    });
            } catch (error) {
                return Promise.reject(error.message || []);
            }
        },
        getProvinceByCountrySelectedOrgStr(countryParentId) {
            if (
                !Array.isArray(countryParentId) ||
                !countryParentId?.length > 0
            ) {
                this.selectStateProvinceOptAddNew = null;
            }
            try {
                if (
                    !Array.isArray(countryParentId) ||
                    countryParentId?.geo_ssn_location !== undefined ||
                    countryParentId?.geo_ssn_location !== null
                ) {
                    const ssnSuperCountryCodeLocationGeo =
                        countryParentId?.geo_ssn_location
                            ? countryParentId?.geo_ssn_location
                            : "";
                    const geoLocationCountryType = "T2";
                    this.countryProvinceIdOptSelected =
                        ssnSuperCountryCodeLocationGeo
                            ? ssnSuperCountryCodeLocationGeo
                            : "";
                    this.getGeoLocationStateByCountrySelected(
                        geoLocationCountryType,
                        ssnSuperCountryCodeLocationGeo
                    );
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        getDistrictByProvinceSelectedOrgStr(provinceParentId) {
            if (
                !Array.isArray(provinceParentId) ||
                !provinceParentId?.length > 0
            ) {
                this.selectSDistrictOptAddNew = null;
            }
            try {
                if (
                    !Array.isArray(provinceParentId) ||
                    provinceParentId?.geo_ssn_location !== undefined ||
                    provinceParentId?.geo_ssn_location !== null
                ) {
                    const ssnSuperProvinceCodeLocationGeo =
                        provinceParentId?.geo_ssn_location
                            ? provinceParentId?.geo_ssn_location
                            : "";
                    const geoLocationProvinceType = "T3";
                    this.geoDistrictSSNProvinceOptSelected =
                        ssnSuperProvinceCodeLocationGeo
                            ? ssnSuperProvinceCodeLocationGeo
                            : "";
                    this.getGeoLocationDistrictByCountrySelected(
                        geoLocationProvinceType,
                        ssnSuperProvinceCodeLocationGeo
                    );
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        getCommuneByDistrictSelectedOrgStr(parentDis) {
            if (!Array.isArray(parentDis) || !parentDis?.length > 0) {
                this.selectSDCommuneCityOptAddNew = null;
            }
            try {
                if (
                    !Array.isArray(parentDis) ||
                    parentDis?.geo_ssn_location !== undefined ||
                    parentDis?.geo_ssn_location !== null
                ) {
                    const ssnSuperProvinceCodeLocationGeo =
                        parentDis?.geo_ssn_location
                            ? parentDis?.geo_ssn_location
                            : "";
                    const geoLocationProvinceType = "T4";
                    this.ssnCommuneCodeId = ssnSuperProvinceCodeLocationGeo
                        ? ssnSuperProvinceCodeLocationGeo
                        : [];
                    this.getGeoLocationCommuneCapitalByCountrySelected(
                        geoLocationProvinceType,
                        ssnSuperProvinceCodeLocationGeo
                    );
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        /**
         * @Get Reload Country's
         * */
        getGeoLocationStateByCountrySelected(
            provinceStateCode,
            superSSNStateCode
        ) {
            try {
                this.getAllProvinceActions(superSSNStateCode);
                this.geoCountryId = superSSNStateCode ? superSSNStateCode : [];
            } catch (error) {
                return Promise.reject(error.message || []);
            }
        },
        getGeoLocationDistrictByCountrySelected(
            districtStateType,
            superSSNDistrictCode
        ) {
            try {
                this.geoLocationServicesOnProject
                    .listGeoLocationDistrict(
                        districtStateType,
                        superSSNDistrictCode
                    )
                    .then((district) => {
                        if (!district) {
                            this.setDistrictCountryAddNew = [];
                        }
                        this.getAllDistrictActions(superSSNDistrictCode);
                        this.ssnDistrictCodeId = superSSNDistrictCode
                            ? superSSNDistrictCode
                            : [];
                        this.setDistrictCountryAddNew = Array.isArray(district)
                            ? district.slice()
                            : [];
                    })
                    .catch((error) => {
                        return Promise.reject(error.message || []);
                    });
            } catch (error) {
                return Promise.reject(error.message || []);
            }
        },
        getGeoLocationCommuneCapitalByCountrySelected(
            communeStateType,
            superSSNCommuneCode
        ) {
            try {
                this.geoLocationServicesOnProject
                    .listGeoLocationCommune(
                        communeStateType,
                        superSSNCommuneCode
                    )
                    .then((commune) => {
                        if (!commune) {
                            this.setCommuneCountryAddNew = [];
                        }
                        this.getAllCommuneActions(superSSNCommuneCode);
                    })
                    .catch((error) => {
                        return Promise.reject(error.message || []);
                    });
            } catch (error) {
                return Promise.reject(error.message || []);
            }
        },
        // Get Tree Permissions
        getPermissionsManagementBaseProject() {
            this.managerPermissionBaseOnProject
                ?.getAllPermissionAddByProjects()
                .then((permissions) => {
                    try {
                        /**
                         * @Tree Table Permissions
                         */
                        if (
                            !Array.isArray(permissions) ||
                            !permissions?.length > 0
                        ) {
                            this.dataPermissionTreeTable = [];
                        }
                        if (
                            !Array.isArray(permissions) ||
                            permissions !== undefined ||
                            permissions !== null
                        ) {
                            this.dataPermissionTreeTable = permissions
                                ? permissions
                                : "";
                        }
                    } catch (error) {
                        return Promise.reject(error);
                    }
                });
        },
        // Get Select All Permissions Change
        toggleSelectionClearItem(rows) {
            if (rows) {
                rows?.forEach((row) => {
                    this.$refs.multiplePermissionTreeTable?.toggleRowSelection(
                        row
                    );
                });
            } else {
                this.$refs.multiplePermissionTreeTable?.clearSelection();
            }
        },
    },
};
</script>
