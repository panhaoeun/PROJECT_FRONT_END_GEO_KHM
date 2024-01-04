<template>
    <!--Manage Permissions By Project-->
    <Toast />
    <div class="layout-content px-4 py-4">
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Roles permissions
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
                                <!-- Country's -->
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
                                <!-- Permissions Descriptions -->
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
                                <manage-position-dept-module-on-geo />
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
import ManagePositionDeptModuleOnGeo from "./position_module/ManageDepartmentBaseOnGeoFence.vue";

export default {
    mixins: [rolePermissionsManageHelper],
    components: {
        PopupAddManageDepartmentPositionGeo,
        ManagePositionDeptModuleOnGeo,
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
            searchPermissionRole: "",
        };
    },
    validations() {
        return {
            projectNameBaseRole: { required },
            modelCountryNameSelected: { required },
        };
    },
    mounted() {
        this.getAllProjectObj();
        this.getPermissionsManagementBaseProject();
        this.getGeoLocationCountry();
    },
    methods: {
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
