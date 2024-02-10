<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Organization Chart Of Geo-fence
            </h2>
        </div>
        <div class="gird">
            <!-- Button Group Filter Projects -->
            <div class="col-12">
                <el-card slot="header" class="box-card">
                    <div class="formgrid grid">
                        <!-- Manages Destination Base Org.Str (Board Mgt Projects) -->
                        <div class="col-4 lg:col-12 xl:col-6 field">
                            <label for="name_en" class="text-sm font-semibold"
                                >Projects</label
                            >
                            <div class="flex field flex-row">
                                <Dropdown
                                    showClear
                                    v-model="selectedProject"
                                    :options="optProjectByPermissionList"
                                    optionLabel="project_name"
                                    @change="onClickChangeProjectList()"
                                    placeholder="Select a projects"
                                    class="w-full text-sm"
                                    inputId="project_name"
                                    aria-describedby="dd-error"
                                    filter
                                >
                                    <template #value="slotProps">
                                        <div
                                            v-if="slotProps.value"
                                            class="flex align-items-center"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    slotProps.value
                                                        ?.project_name ?? ""
                                                }}
                                            </div>
                                        </div>
                                        <span v-else class="text-sm">
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div
                                            class="flex align-items-center text-sm"
                                        >
                                            <div class="text-sm">
                                                {{
                                                    slotProps.option
                                                        ?.project_name ?? ""
                                                }}
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                        <!-- Manages Destination Base Org.Str Base Country (Board Mgt Projects Base Country) -->
                        <div class="col-4 lg:col-12 xl:col-6 field">
                            <label
                                for="geo_country_org_str"
                                class="text-sm font-semibold"
                                >Country</label
                            >
                            <Dropdown
                                showClear
                                v-model="selectedCountryOptOrgStr"
                                :options="allCountryOrgStr"
                                optionLabel="geo_english_name"
                                @change="onChangeSelectedCountryGeoOrgStr()"
                                filter
                                placeholder="Select a Country"
                                class="w-full text-sm"
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
                                                geoNameToTitleCase(
                                                    String(
                                                        slotProps.value
                                                            ?.geo_english_name ??
                                                            ""
                                                    )
                                                )
                                            }}({{
                                                slotProps.value.geo_zip_code ??
                                                ""
                                            }})
                                        </div>
                                    </div>
                                    <span v-else class="text-sm">
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div
                                        class="flex align-items-center text-sm"
                                    >
                                        <div class="text-sm">
                                            {{
                                                geoNameToTitleCase(
                                                    String(
                                                        slotProps.option
                                                            .geo_english_name ??
                                                            ""
                                                    )
                                                )
                                            }}
                                            ({{
                                                slotProps.option.geo_zip_code ??
                                                ""
                                            }})
                                        </div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                        <!-- Manages Destination Base Org.Str Base Province (Board Mgt Projects Base Province) -->
                        <div class="col-4 lg:col-12 xl:col-6 field">
                            <label
                                for="geo_country_org_str"
                                class="text-sm font-semibold"
                                >Province or State</label
                            >
                            <Dropdown
                                showClear
                                v-model="selectedProvinceOptOrgStr"
                                :options="allStateCountryAddNewOrgStr"
                                optionLabel="geo_english_name"
                                filter
                                @click="
                                    getProvinceByCountrySelectedOrgStr(
                                        selectedCountryOptOrgStr
                                    )
                                "
                                placeholder="Select a Province or State"
                                class="w-full text-sm"
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
                                                geoNameToTitleCase(
                                                    String(
                                                        slotProps.value
                                                            ?.geo_english_name ??
                                                            ""
                                                    )
                                                )
                                            }}({{
                                                slotProps.value.geo_zip_code ??
                                                ""
                                            }})
                                        </div>
                                    </div>
                                    <span v-else class="text-sm">
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div
                                        class="flex align-items-center text-sm"
                                    >
                                        <div class="text-sm">
                                            {{
                                                geoNameToTitleCase(
                                                    String(
                                                        slotProps.option
                                                            .geo_english_name ??
                                                            ""
                                                    )
                                                )
                                            }}
                                            ({{
                                                slotProps.option.geo_zip_code ??
                                                ""
                                            }})
                                        </div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                        <!-- Manages Destination Base Org.Str Base District (Board Mgt Projects Base District) -->
                        <div class="col-4 lg:col-12 xl:col-6 field">
                            <label
                                for="geo_country_org_str"
                                class="text-sm font-semibold"
                                >District</label
                            >
                            <Dropdown
                                showClear
                                v-model="selectedDistrictOptOrgStr"
                                :options="allStateDistrictAddNew"
                                optionLabel="geo_english_name"
                                filter
                                @click="
                                    getDistrictByProvinceSelectedOrgStr(
                                        selectedProvinceOptOrgStr
                                    )
                                "
                                placeholder="Select a District"
                                class="w-full text-sm"
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
                                                geoNameToTitleCase(
                                                    String(
                                                        slotProps.value
                                                            ?.geo_english_name ??
                                                            ""
                                                    )
                                                )
                                            }}({{
                                                slotProps.value.geo_zip_code ??
                                                ""
                                            }})
                                        </div>
                                    </div>
                                    <span v-else class="text-sm">
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div
                                        class="flex align-items-center text-sm"
                                    >
                                        <div class="text-sm">
                                            {{
                                                geoNameToTitleCase(
                                                    String(
                                                        slotProps.option
                                                            .geo_english_name ??
                                                            ""
                                                    )
                                                )
                                            }}
                                            ({{
                                                slotProps.option.geo_zip_code ??
                                                ""
                                            }})
                                        </div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                        <!-- Manages Destination Base Org.Str Base District (Board Mgt Projects Base District) -->
                        <div class="col-4 lg:col-12 xl:col-6 field">
                            <label
                                for="geo_country_org_str"
                                class="text-sm font-semibold"
                                >Commune</label
                            >
                            <Dropdown
                                showClear
                                v-model="selectedCommuneOptOrgStr"
                                :options="allCommuneCountryByCom"
                                optionLabel="geo_english_name"
                                filter
                                @click="
                                    getCommuneByDistrictSelectedOrgStr(
                                        selectedDistrictOptOrgStr
                                    )
                                "
                                placeholder="Select a Commune"
                                class="w-full text-sm"
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
                                                geoNameToTitleCase(
                                                    String(
                                                        slotProps.value
                                                            ?.geo_english_name ??
                                                            ""
                                                    )
                                                )
                                            }}({{
                                                slotProps.value.geo_zip_code ??
                                                ""
                                            }})
                                        </div>
                                    </div>
                                    <span v-else class="text-sm">
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div
                                        class="flex align-items-center text-sm"
                                    >
                                        <div class="text-sm">
                                            {{
                                                geoNameToTitleCase(
                                                    String(
                                                        slotProps.option
                                                            .geo_english_name ??
                                                            ""
                                                    )
                                                )
                                            }}
                                            ({{
                                                slotProps.option.geo_zip_code ??
                                                ""
                                            }})
                                        </div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                        <!-- Manages Destination Base Org.Str Base Villages (Board Mgt Projects Base Villages) -->
                        <div class="col-4 lg:col-12 xl:col-6 field">
                            <label
                                for="geo_country_org_str"
                                class="text-sm font-semibold"
                                >Village</label
                            >
                            <Dropdown
                                showClear
                                v-model="selectedVillagesOptOrgStr"
                                :options="getGeoLocationVillagesData"
                                optionLabel="geo_english_name"
                                filter
                                @click="
                                    getVillagesBySelectedOrgStr(
                                        selectedCommuneOptOrgStr
                                    )
                                "
                                placeholder="Select a Village"
                                class="w-full text-sm"
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
                                                geoNameToTitleCase(
                                                    String(
                                                        slotProps.value
                                                            ?.geo_english_name ??
                                                            ""
                                                    )
                                                )
                                            }}({{
                                                slotProps.value.geo_zip_code ??
                                                ""
                                            }})
                                        </div>
                                    </div>
                                    <span v-else class="text-sm">
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div
                                        class="flex align-items-center text-sm"
                                    >
                                        <div class="text-sm">
                                            {{
                                                geoNameToTitleCase(
                                                    String(
                                                        slotProps.option
                                                            .geo_english_name ??
                                                            ""
                                                    )
                                                )
                                            }}
                                            ({{
                                                slotProps.option.geo_zip_code ??
                                                ""
                                            }})
                                        </div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                    </div>
                </el-card>
            </div>
            <!--Manage Org-Structures(Designation) base on Board Management or Geo-fence location-->
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <!-- Manage Org-Structures(Board Manager Project) -->
                    <manage-org-structures-of-board-mgt-project
                        v-if="
                            selectedProject !== null &&
                            hideOrgStructureDeptPos === 'T0'
                        "
                        :manageRootBoardProjectId="getProjectDestination"
                    />
                    <!-- Manage Org-Structures(Geo Fencing) on country-->
                    <manage-org-structures-of-country-geo-project
                        v-if="
                            selectedProject !== null &&
                            selectedCountryOptOrgStr != null &&
                            hideOrgStructureDeptPos === 'T1'
                        "
                    />
                    <!-- Manage Org-Structures(Geo Fencing) on province-->
                    <manage-org-structures-of-province-geo-project
                        v-if="
                            selectedProject !== null &&
                            selectedProvinceOptOrgStr != null &&
                            hideOrgStructureDeptPos === 'T2'
                        "
                    />
                    <!-- Manage Org-Structures(Geo Fencing) on district-->
                    <manage-org-structures-of-district-geo-project
                        v-if="
                            selectedDistrictOptOrgStr != null &&
                            hideOrgStructureDeptPos === 'T3'
                        "
                    />
                    <!-- Manage Org-Structures(Geo Fencing) on commune-->
                    <manage-org-structures-of-commune-geo-project
                        v-if="
                            selectedCommuneOptOrgStr != null &&
                            hideOrgStructureDeptPos === 'T4'
                        "
                    />
                    <!-- Manage Org-Structures(Geo Fencing) on villages-->
                    <manage-org-structures-of-village-geo-project
                        v-if="
                            selectedVillagesOptOrgStr != null &&
                            hideOrgStructureDeptPos === 'T5'
                        "
                    />
                    <!-- Check Empty Org-structure of board manager or geo-locations -->
                    <div
                        v-if="
                            hideOrgStructureDeptPos == '' ||
                            typeof hideOrgStructureDeptPos === 'undefined'
                        "
                        class="text-center justify-content-center gap-10"
                    >
                        <img
                            class="text-center justify-content-center"
                            src="./hierarchical-icon.png"
                            alt="Image"
                            width="250"
                        />
                        <div class="flex flex-column p-3">
                            <h5>No Org. Structure</h5>
                            <small class="text-red-500"
                                >Please selected one option view
                                org-structure..</small
                            >
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<!-- Data Tables -->
<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import ManagePermissionsRoleBaseProject from "@/services/vendors/user_permissions/ManagePermissionRoleProjects";
/**
 * @Managements of Org.Str -> Org-str Board Mgt (Manage Org (Designation Org.Structures => Positions))
 * */
import ManageOrgStructuresOfBoardMgtProject from "./manage_org_strictures/ManageOrgStructuresOfBoardMgtProject.vue";
import ManageOrgStructuresOfCountryGeoProject from "./manage_org_strictures/ManageOrgStructuresOfCountryGeoBasePro.vue";
import ManageOrgStructuresOfProvinceGeoProject from "./manage_org_strictures/ManageOrgStructuresOfProvinceGeoBasePro";
import ManageOrgStructuresOfDistrictGeoProject from "./manage_org_strictures/ManageOrgStructuresOfDistrictGeoBasePro";
import ManageOrgStructuresOfCommuneGeoProject from "./manage_org_strictures/ManageOrgStructuresOfCommuneGeoBasePro";
import ManageOrgStructuresOfVillageGeoProject from "./manage_org_strictures/ManageOrgStructuresOfVillagesGeoBasePro";

import geoLocationVillagesHelper from "@/mixin/geoLocationVillagesHelper";
import geoGlobalOrgStrLocationHelper from "@/mixin/getGeoGlobalOrgStrLocationHelper";
import { mapActions } from "vuex";

export default {
    components: {
        ManageOrgStructuresOfBoardMgtProject,
        ManageOrgStructuresOfCountryGeoProject,
        ManageOrgStructuresOfProvinceGeoProject,
        ManageOrgStructuresOfDistrictGeoProject,
        ManageOrgStructuresOfCommuneGeoProject,
        ManageOrgStructuresOfVillageGeoProject,
    },
    mixins: [geoLocationVillagesHelper, geoGlobalOrgStrLocationHelper],
    data() {
        return {
            loadingDataRolesProject: false,
            loadingBtnFilter: false,
            selectedPermissions: null,
            optProjectByPermissionList: [],
            selectedProject: null,
            envAppPATH: process.env.VUE_APP_PATH_FILE,
            currentRoleId: 1,
            dialogLoading: false,
            dialogVisible: false,
            permissionsID: "",
            projectPermissionRole: [],
            moduleDetailsByPermId: [],
            statusPermissionsSwitch: false,
            deletePermissionsDialog: false,
            product: "",
            selectedRolesList: "",
            filtersPermRole: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                role_name: {
                    operator: FilterOperator.AND,
                    constraints: [
                        { value: null, matchMode: FilterMatchMode.IN },
                    ],
                },
            },
            checkStrictly: false,
            routesModulesPerm: [],
            routesModule: [],
            moduleDetailRoutes: [],
            checkOut: false,
            selection: {},
            selectedCountryOptOrgStr: null,
            selectedProvinceOptOrgStr: null,
            selectedDistrictOptOrgStr: null,
            selectedCommuneOptOrgStr: null,
            selectedVillagesOptOrgStr: null,
            hideOrgStructureDeptPos: "",
        };
    },
    computed: {
        getProjectDestination() {
            const getProject = this.selectedProject || this.selectedProject;
            if (!getProject || getProject !== null) {
                return parseInt(getProject?.id) ? parseInt(getProject?.id) : 0;
            }
            return getProject;
        },
        getCountryOfGeoLocationOrgStr() {
            const getCountry =
                this.selectedCountryOptOrgStr || this.selectedCountryOptOrgStr;
            if (!getCountry || getCountry !== null) {
                return parseInt(getCountry?.id) ? parseInt(getCountry?.id) : 0;
            }
            return getCountry;
        },
    },
    created() {
        this.permissionRoleProject = new ManagePermissionsRoleBaseProject();
    },
    mounted() {
        this.getAllProjectObj();
    },
    methods: {
        ...mapActions("orgStrDeptPosGeo", [
            "setDepartmentDataByCountryProjectId",
        ]),
        /**
         * @Handle Filter role base on project
         * */
        getAllProjectObj() {
            this.permissionRoleProject.getAllProject().then((project) => {
                try {
                    if (!Array.isArray(project) || !project.length > 0) {
                        this.optProjectByPermissionList = [];
                    }
                    if (
                        !Array.isArray(project) ||
                        project !== undefined ||
                        project !== null
                    ) {
                        this.optProjectByPermissionList = project
                            ? project
                            : "";
                    }
                } catch (error) {
                    return Promise.reject(error);
                }
            });
        },
        // Level Org-Structures
        onClickChangeProjectList() {
            this.getHierarchyDataOrgStrBoardMgt();
        },
        getHierarchyDataOrgStrBoardMgt() {
            try {
                const getProjectId = this.getProjectDestination
                    ? this.getProjectDestination
                    : 0;
                const getCountryId = this.getCountryOfGeoLocationOrgStr
                    ? this.getCountryOfGeoLocationOrgStr
                    : 0;
                this.setDepartmentDataByCountryProjectId({
                    getProjectId,
                    getCountryId,
                });
                this.hideOrgStructureDeptPos = "T0";
            } catch (error) {
                throw Error(error);
            }
        },
    },
};
</script>
