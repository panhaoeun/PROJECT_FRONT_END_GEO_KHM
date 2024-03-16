<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Organization Structure Chart Management
            </h2>
        </div>
        <div class="gird">
            <!-- Button Group Filter Company -->
            <div class="col-12">
                <el-card slot="header" class="box-card">
                    <div class="formgrid grid">
                        <!-- Manages Destination Base Org.Str (Project Company) -->
                        <div class="col-6 lg:col-12 xl:col-12 field">
                            <label for="name_en" class="text-sm font-semibold"
                                >Company Structure</label
                            >
                            <div
                                class="flex field flex-row justify-content-center text-sm item-center"
                            >
                                <Dropdown
                                    showClear
                                    v-model="selectedProject"
                                    :options="optProjectDeptOrgStrAll"
                                    optionLabel="project_name"
                                    @update:modelValue="
                                        onChangeGetAllProjectCompany()
                                    "
                                    placeholder="Select a company structures"
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
                                <!--Popup Assign Org-Structures or Positions for Projects-->
                                <popup-add-edit-org-str-company-pro
                                    :treeOrgStructure="
                                        getAllOrgStructureFeaturesGeoCompany
                                            ? getAllOrgStructureFeaturesGeoCompany
                                            : {}
                                    "
                                    :companyId="
                                        getDeptOrgCompanyId
                                            ? getDeptOrgCompanyId
                                            : 0
                                    "
                                    v-if="
                                        selectedProject !== null &&
                                        hideOrgStructureDeptCompany === 'T0'
                                    "
                                />
                            </div>
                        </div>
                        <!-- Manages Destination Base Org.Str Base National Country Structures (Board Mgt Projects Base Country) -->
                        <div class="col-6 lg:col-12 xl:col-6 field">
                            <label
                                for="geo_country_org_str"
                                class="text-sm font-semibold"
                                >National Structures</label
                            >
                            <div
                                class="flex field flex-row justify-content-center text-sm item-center"
                            >
                                <Dropdown
                                    showClear
                                    v-model="selectedCountryOptOrgStr"
                                    :options="allCountryOrgStr"
                                    optionLabel="geo_english_name"
                                    @update:modelValue="
                                        onChangeGetAllNationCountryCongress()
                                    "
                                    filter
                                    placeholder="Select a National Structures"
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
                                                    slotProps.value
                                                        .geo_zip_code ?? ""
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
                                                    slotProps.option
                                                        .geo_zip_code ?? ""
                                                }})
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <!--Popup Assign Org-Structures National Congress-->
                                <popup-add-edit-org-str-nation-country
                                    :treeOrgStructure="
                                        getAllOrgStructuresFeatureGeoNationCongress
                                            ? getAllOrgStructuresFeatureGeoNationCongress
                                            : {}
                                    "
                                    :companyId="
                                        getDeptOrgCompanyId
                                            ? getDeptOrgCompanyId
                                            : 0
                                    "
                                    :getCountryNationId="
                                        getCountryOfGeoLocationOrgStr
                                            ? getCountryOfGeoLocationOrgStr
                                            : 0
                                    "
                                    v-if="
                                        selectedCountryOptOrgStr !== null &&
                                        hideOrgStructureDeptCompany === 'T1'
                                    "
                                />
                            </div>
                        </div>
                        <!-- Manages Destination Base Org.Str Base National Province Structures (Board Mgt Province Structures) -->
                        <div class="col-6 lg:col-12 xl:col-6 field">
                            <label
                                for="geo_country_org_str"
                                class="text-sm font-semibold"
                                >Province Structures</label
                            >
                            <div
                                class="flex field flex-row justify-content-center text-sm item-center"
                            >
                                <Dropdown
                                    showClear
                                    v-model="selectedProvinceOptOrgStr"
                                    :options="allStateCountryAddNewOrgStr"
                                    optionLabel="geo_english_name"
                                    @update:modelValue="
                                        onChangeGetAllNationProvinceStatures()
                                    "
                                    filter
                                    placeholder="Select a Province Structures"
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
                                                    slotProps.value
                                                        .geo_zip_code ?? ""
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
                                                    slotProps.option
                                                        .geo_zip_code ?? ""
                                                }})
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <!--Popup Assign Org-Structures Provinces-->
                                <popup-add-edit-org-str-nation-provinces
                                    :treeOrgStructure="
                                        getAllOrgStructuresFeatureGeoNationProvinces
                                            ? getAllOrgStructuresFeatureGeoNationProvinces
                                            : {}
                                    "
                                    :companyId="
                                        getDeptOrgCompanyId
                                            ? getDeptOrgCompanyId
                                            : 0
                                    "
                                    :getCountryNationId="
                                        getProvinceOrgStructure
                                            ? getProvinceOrgStructure
                                            : 0
                                    "
                                    v-if="
                                        selectedProvinceOptOrgStr !== null &&
                                        hideOrgStructureDeptCompany === 'T2'
                                    "
                                />
                            </div>
                        </div>
                        <!-- Manages Destination Base Org.Str Base National District Structures (Board Mgt District Structures) -->
                        <div class="col-6 lg:col-12 xl:col-6 field">
                            <label
                                for="geo_country_org_str"
                                class="text-sm font-semibold"
                                >District Structures</label
                            >
                            <div
                                class="flex field flex-row justify-content-center text-sm item-center"
                            >
                                <Dropdown
                                    showClear
                                    v-model="selectedDistrictOptOrgStr"
                                    :options="allStateDistrictAddNew"
                                    optionLabel="geo_english_name"
                                    @update:modelValue="
                                        onChangeGetAllNationDistrictsStatures()
                                    "
                                    filter
                                    placeholder="Select a District Structures"
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
                                                    slotProps.value
                                                        .geo_zip_code ?? ""
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
                                                    slotProps.option
                                                        .geo_zip_code ?? ""
                                                }})
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <!--Popup Assign Org-Structures Provinces-->
                                <popup-add-edit-org-str-nation-district
                                    :treeOrgStructure="
                                        getAllOrgStructuresFeatureGeoNationDistrict
                                            ? getAllOrgStructuresFeatureGeoNationDistrict
                                            : {}
                                    "
                                    :companyId="
                                        getDeptOrgCompanyId
                                            ? getDeptOrgCompanyId
                                            : 0
                                    "
                                    :getCountryNationId="
                                        getDistrictOrgStructure
                                            ? getDistrictOrgStructure
                                            : 0
                                    "
                                    v-if="
                                        selectedDistrictOptOrgStr !== null &&
                                        hideOrgStructureDeptCompany === 'T3'
                                    "
                                />
                            </div>
                        </div>
                        <!-- Manages Destination Base Org.Str Base National Commune Structures (Board Mgt Commune Structures) -->
                        <div class="col-6 lg:col-12 xl:col-6 field">
                            <label
                                for="geo_country_org_str"
                                class="text-sm font-semibold"
                                >Commune Structures</label
                            >
                            <div
                                class="flex field flex-row justify-content-center text-sm item-center"
                            >
                                <Dropdown
                                    showClear
                                    v-model="selectedCommuneOptOrgStr"
                                    :options="allCommuneCountryByCom"
                                    optionLabel="geo_english_name"
                                    @update:modelValue="
                                        onChangeGetAllNationCommuneStatures()
                                    "
                                    filter
                                    placeholder="Select a Commune Structures"
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
                                                    slotProps.value
                                                        .geo_zip_code ?? ""
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
                                                    slotProps.option
                                                        .geo_zip_code ?? ""
                                                }})
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <!--Popup Assign Org-Structures Provinces-->
                                <popup-add-edit-org-str-nation-commune
                                    :treeOrgStructure="
                                        getAllOrgStructuresFeatureGeoNationCommune
                                            ? getAllOrgStructuresFeatureGeoNationCommune
                                            : {}
                                    "
                                    :companyId="
                                        getDeptOrgCompanyId
                                            ? getDeptOrgCompanyId
                                            : 0
                                    "
                                    :getCountryNationId="
                                        getCommuneOrgStructure
                                            ? getCommuneOrgStructure
                                            : 0
                                    "
                                    v-if="
                                        selectedCommuneOptOrgStr !== null &&
                                        hideOrgStructureDeptCompany === 'T4'
                                    "
                                />
                            </div>
                        </div>
                        <!-- Manages Destination Base Org.Str Base National Villages Structures (Board Mgt Villages Structures) -->
                        <div class="col-6 lg:col-12 xl:col-6 field">
                            <label
                                for="geo_country_org_str"
                                class="text-sm font-semibold"
                                >Village Structures</label
                            >
                            <div
                                class="flex field flex-row justify-content-center text-sm item-center"
                            >
                                <Dropdown
                                    showClear
                                    v-model="selectedVillagesOptOrgStr"
                                    :options="getGeoLocationVillagesData"
                                    optionLabel="geo_english_name"
                                    @update:modelValue="
                                        onChangeGetAllNationVillagesStatures()
                                    "
                                    filter
                                    placeholder="Select a Village Structures"
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
                                                    slotProps.value
                                                        .geo_zip_code ?? ""
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
                                                    slotProps.option
                                                        .geo_zip_code ?? ""
                                                }})
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <!--Popup Assign Org-Structures Provinces-->
                                <popup-add-edit-org-str-nation-village
                                    :treeOrgStructure="
                                        getAllOrgStructuresFeatureGeoNationVillages
                                            ? getAllOrgStructuresFeatureGeoNationVillages
                                            : {}
                                    "
                                    :companyId="
                                        getDeptOrgCompanyId
                                            ? getDeptOrgCompanyId
                                            : 0
                                    "
                                    :getCountryNationId="
                                        getVillagesOrgStructure
                                            ? getVillagesOrgStructure
                                            : 0
                                    "
                                    v-if="
                                        selectedVillagesOptOrgStr !== null &&
                                        hideOrgStructureDeptCompany === 'T5'
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>

            <!--Hierarchy Multi-Level org-structures base on project or geo-fence-->
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <!-- Get Org-Structures Base National Congress -->
                    <div class="my-4">
                        <h1
                            class="justify-content-center text-center flex flex-column font-global-moul-01 font-bold"
                        >
                            <ul class="border-bottom pb-1">
                                Organizations Chart Structures Of
                                {{
                                    "\n" +
                                    String(
                                        getOrgDeptNameGlobalName
                                            ? getOrgDeptNameGlobalName
                                            : "No Department"
                                    ).toString("No Name")
                                }}
                            </ul>
                        </h1>
                    </div>
                    <OrgStructureHierarchyGlobalMulti
                        :orgTreeData="
                            getAllOrgStructureFeaturesGeoCompany
                                ? getAllOrgStructureFeaturesGeoCompany
                                : {}
                        "
                    />
                </el-card>
            </div>
        </div>
    </div>
</template>
<!-- Data Tables -->
<script>
import geoLocationVillagesHelper from "@/mixin/geoLocationVillagesHelper";
import geoGlobalOrgStrLocationHelper from "@/mixin/getGeoGlobalOrgStrLocationHelper";
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";
/**
 *Org-Structures Board Management Interface
 ***/
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
import OrgStructureHierarchyGlobalMulti from "./org_structure_hierachy_multi_level/OrgStructureHierachyGlobalMulti";
// Popup Add and Edit Features Org-Structures
import PopupAddEditOrgStrCompanyPro from "./popup_add_new_org_structures/PopupAddEditOrgStrCompanyPro";
import PopupAddEditOrgStrNationCountry from "./popup_add_new_org_structures/PopupAddEditOrgStrNationCountry";
import PopupAddEditOrgStrNationProvinces from "./popup_add_new_org_structures/PopupAddEditOrgStrNationProvinces";
import PopupAddEditOrgStrNationDistrict from "./popup_add_new_org_structures/PopupAddEditOrgStrNationDistrict";
import PopupAddEditOrgStrNationCommune from "./popup_add_new_org_structures/PopupAddEditOrgStrNationCommune";
import PopupAddEditOrgStrNationVillage from "./popup_add_new_org_structures/PopupAddEditOrgStrNationVillages";

export default {
    components: {
        OrgStructureHierarchyGlobalMulti,
        PopupAddEditOrgStrCompanyPro,
        PopupAddEditOrgStrNationCountry,
        PopupAddEditOrgStrNationProvinces,
        PopupAddEditOrgStrNationDistrict,
        PopupAddEditOrgStrNationCommune,
        PopupAddEditOrgStrNationVillage,
    },
    mixins: [
        geoLocationVillagesHelper,
        geoGlobalOrgStrLocationHelper,
        manageOrgChartBoardMgtLevelHelper,
        manageOrgStructureDeptNewFeatures,
    ],
    data() {
        return {
            loadingDataRolesProject: false,
            loadingBtnFilter: false,
            selectedPermissions: null,
            optProjectDeptOrgStrAll: [],
            selectedProject: null,
            selectedCountryOptOrgStr: null,
            hideOrgStructureDeptCompany: null,
            selectedProvinceOptOrgStr: null,
            selectedDistrictOptOrgStr: null,
            selectedCommuneOptOrgStr: null,
            selectedVillagesOptOrgStr: null,
            hideOrgStructureDeptPos: "",
        };
    },
    computed: {
        getOrgDeptNameGlobalName() {
            const getOrgDeptOrgGlobalName = this.hideOrgStructureDeptCompany
                ? this.hideOrgStructureDeptCompany
                : "T0";
            let orgStricturesDeptOrg;
            switch (getOrgDeptOrgGlobalName) {
                case "T0":
                    orgStricturesDeptOrg = this.getOrgChartDeptNameCompanyPro;
                    break;
                case "T1":
                    orgStricturesDeptOrg = this.getOrgChartDeptCountryName;
                    break;
                case "T2":
                    orgStricturesDeptOrg = this.getOrgChartDeptProvinceName;
                    break;
                case "T3":
                    orgStricturesDeptOrg = this.getOrgChartDeptDistrictName;
                    break;
                case "T4":
                    orgStricturesDeptOrg = this.getOrgChartDeptCommuneName;
                    break;
                case "T5":
                    orgStricturesDeptOrg = this.getOrgChartDeptVillagesName;
                    break;
                default:
                    orgStricturesDeptOrg;
                    break;
            }
            return orgStricturesDeptOrg;
        },
    },
};
</script>
