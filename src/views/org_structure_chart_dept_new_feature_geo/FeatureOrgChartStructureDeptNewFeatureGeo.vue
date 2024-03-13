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
                                <!--Popup Assign Org-Structures Projects-->
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
                                <!--Popup Assign Org-Structures Projects-->
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
                                        hideOrgStructureDeptCompany === 'T2'
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
                    <OrgStructureHierarchyGlobalMulti
                        :orgTreeData="
                            getAllOrgStructureFeaturesGeoCompany
                                ? getAllOrgStructureFeaturesGeoCompany
                                : {}
                        "
                        :departmentName="
                            getOrgChartDeptNameCompanyPro
                                ? getOrgChartDeptNameCompanyPro
                                : 'No Name'
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
import OrgStructureHierarchyGlobalMulti from "./org_structure_hierachy_multi_level/OrgStructureHierachyGlobalMulti.vue";
// Popup Add and Edit Features Org-Structures
import PopupAddEditOrgStrCompanyPro from "./popup_add_new_org_structures/PopupAddEditOrgStrCompanyPro";
import PopupAddEditOrgStrNationCountry from "./popup_add_new_org_structures/PopupAddEditOrgStrNationCountry";

export default {
    components: {
        OrgStructureHierarchyGlobalMulti,
        PopupAddEditOrgStrCompanyPro,
        PopupAddEditOrgStrNationCountry,
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
};
</script>
