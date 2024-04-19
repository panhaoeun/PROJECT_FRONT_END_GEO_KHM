<template>
    <div class="px-2 py-2 gpa-10">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h1 class="text-2xl text-gray-800 font-medium">Position List</h1>
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click.prevent="openDialogAddNewPositionAssignNew"
            >
                <div class="button">
                    <i class="pi pi-plus" style="font-size: 1rem"></i>
                    <span class="pl-2">Create</span>
                </div>
            </el-button>
        </div>
        <!-- Geo-Fence Location Dropdown -->
        <div class="flex justify-content-between">
            <el-card class="box-card py-2 px-2 text-sm">
                <div class="formgrid grid">
                    <!-- Country filter -->
                    <div class="col-4 lg:col-6 field">
                        <label for="name_en" class="text-sm font-semibold"
                            >Country</label
                        >
                        <Dropdown
                            showClear
                            v-model="selectedCountryOptOrgStr"
                            :options="allCountryGeoLocation"
                            @update:modelValue="
                                onChangeGetAllNationCountryCongress()
                            "
                            optionLabel="geo_english_name"
                            filter
                            placeholder="Select a Country"
                            class="w-full text-sm border-round-lg"
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
                                                        ?.geo_english_name ?? ""
                                                )
                                            )
                                        }}({{
                                            slotProps.value.geo_zip_code ?? ""
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
                                                        .geo_english_name ?? ""
                                                )
                                            )
                                        }}
                                        ({{
                                            slotProps.option.geo_zip_code ?? ""
                                        }})
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <!-- Province -->
                    <div class="col-4 field" v-if="selectedCountry !== null">
                        <label for="country" class="text-sm font-semibold"
                            >Province/State</label
                        >
                        <div class="flex field flex-row">
                            <Dropdown
                                showClear
                                v-model="selectedProvinceOptOrgStr"
                                :options="allStateCountryAddNewOrgStr"
                                optionLabel="geo_english_name"
                                filter
                                @update:modelValue="
                                    onChangeGetAllNationProvinceStatures()
                                "
                                placeholder="Select a Province or State"
                                class="w-full text-sm border-round-lg"
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
                                            }}
                                            ({{
                                                slotProps.value?.geo_zip_code ??
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
                    <!-- District -->
                    <div class="col-4 lg:col-6 xl:col-6 field">
                        <label
                            for="geo_country_org_str"
                            class="text-sm font-semibold"
                            >District</label
                        >
                        <div
                            class="flex field flex-row justify-content-center text-sm item-center"
                        >
                            <Dropdown
                                showClear
                                v-model="selectedDistrictOptOrgStr"
                                :options="allStateDistrictAddNew"
                                optionLabel="geo_english_name"
                                filter
                                @update:modelValue="
                                    onChangeGetAllNationDistrictsStatures()
                                "
                                placeholder="Select a District"
                                class="w-full text-sm border-round-lg"
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
                    <!-- Commune -->
                    <div class="col-4 lg:col-4 xl:col-6 field">
                        <label
                            for="geo_country_org_str"
                            class="text-sm font-semibold"
                            >Commune</label
                        >
                        <div
                            class="flex field flex-row justify-content-center text-sm item-center"
                        >
                            <Dropdown
                                showClear
                                v-model="selectedCommuneOptOrgStr"
                                :options="allCommuneCountryByCom"
                                optionLabel="geo_english_name"
                                filter
                                @update:modelValue="
                                    onChangeGetAllNationCommuneStatures()
                                "
                                placeholder="Select a Commune"
                                class="w-full text-sm border-round-lg"
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
                    <!-- Villages -->
                    <div class="col-4 lg:col-12 xl:col-6 field">
                        <label
                            for="geo_country_org_str"
                            class="text-sm font-semibold"
                            >Village</label
                        >
                        <div
                            class="flex field flex-row justify-content-center text-sm item-center"
                        >
                            <Dropdown
                                showClear
                                v-model="selectedVillagesOptOrgStr"
                                :options="getGeoLocationVillagesData"
                                optionLabel="geo_english_name"
                                filter
                                @update:modelValue="
                                    onChangeGetAllNationVillagesStatures()
                                "
                                placeholder="Select a Village"
                                class="w-full text-sm border-round-lg"
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
                </div>
            </el-card>
        </div>
        <!-- List of positions -->
        <div class="gird my-2">
            <el-card class="box-card text-sm">
                <!-- Country Data Positions Department -->
                <ListDatableGlobalPositionOrgChartStructure
                    :orgStrDataTree="
                        getOrgDeptNameGlobalDataOrgStructures
                            ? getOrgDeptNameGlobalDataOrgStructures
                            : null
                    "
                />
            </el-card>
        </div>
        <!-- Add New Position Dept Org-Structures -->
        <AddNewAssignPositionDeptOrg
            v-if="addDialogNewPositionAssign"
            @close="closeDialogAddNewPositionAssignNew"
            :dialog-position-form="addDialogNewPositionAssign"
            :departmentName="departmentOrgName ? departmentOrgName : ''"
        />
    </div>
</template>

<!-- Scripts of Positions -->
<script>
import ListDatableGlobalPositionOrgChartStructure from "../../../org_chart_structure_managements_new/popup_prepare_org_global_dept/ListDatableGlobalPositionOrgChartStructure.vue";
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
import managerPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/managePositionOrgStructureChartProjectLevelZeroHelper";
import geoLocationVillagesHelper from "@/mixin/geoLocationVillagesHelper";
import geoGlobalOrgStrLocationHelper from "@/mixin/getGeoGlobalOrgStrLocationHelper";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
/**
 * Open Dialog Positions
 **/
import AddNewAssignPositionDeptOrg from "./manage_positions_dept_manage/PopupAddNewPositionDeptOrg.vue";

export default {
    mixins: [
        managerJobPositionOrgStructureProjectLevelZeroHelper,
        managerPositionOrgStructureProjectLevelZeroHelper,
        geoLocationVillagesHelper,
        geoGlobalOrgStrLocationHelper,
        manageOrgStructureDeptNewFeatures,
    ],
    components: {
        ListDatableGlobalPositionOrgChartStructure,
        AddNewAssignPositionDeptOrg,
    },
    mounted() {
        this.geoLocationCountryData();
    },
    data() {
        return {
            selectedCountryOptOrgStr: null,
            hideOrgStructureDeptCompany: null,
            selectedProvinceOptOrgStr: null,
            selectedDistrictOptOrgStr: null,
            selectedCommuneOptOrgStr: null,
            selectedVillagesOptOrgStr: null,
            hideOrgStructureDeptPos: "",
            addDialogNewPositionAssign: false,
        };
    },
    methods: {
        // Country Data
        geoLocationCountryData() {
            try {
                this.getGeoLocationCountryOrgStr();
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        openDialogAddNewPositionAssignNew() {
            this.addDialogNewPositionAssign = true;
        },
        closeDialogAddNewPositionAssignNew() {
            this.addDialogNewPositionAssign = false;
        },
    },
};
</script>
