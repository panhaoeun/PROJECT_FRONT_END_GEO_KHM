<template>
    <!-- List Position base on org-structure -->
    <div class="px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h1 class="text-2xl text-gray-800 font-medium">
                Manage Dept. Job Descriptions
            </h1>
            <el-button
                v-if="assignOrgDeptAssignId !== null"
                type="info"
                size="large"
                class="btn btn-primary"
                @click.prevent="openDialogAddNewJobDeptOrgDes"
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
        <!-- DataTable of Position Org-Structures -->
        <div class="gird">
            <el-card class="box-card text-sm my-2">
                <ListDatableGlobalPositionDesJobOrgChartStructure
                    :orgStrDataTree="
                        getOrgDeptNameGlobalDataOrgStructuresDept
                            ? getOrgDeptNameGlobalDataOrgStructuresDept
                            : null
                    "
                    @org-str-dept="selectedDeptOrgDeptJobDesAssign()"
                />
            </el-card>
        </div>
        <!-- Add New Job Descriptions Org-Structures -->
        <AddNewDeptJobDesOrgAssign
            v-if="addDialogNewJobDesAssign"
            @close="closedDialogAddNewJobDeptOrgDes"
            :dialog-position-form="addDialogNewJobDesAssign"
            :departmentName="departmentOrgName ? departmentOrgName : ''"
        />
    </div>
</template>

<!-- Script of Positions Add new -->
<script>
import { required, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive } from "vue";
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
import managerPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/managePositionOrgStructureChartProjectLevelZeroHelper";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
/**
 * Job Org-Structures Description
 **/
import ListDatableGlobalPositionDesJobOrgChartStructure from "../../../org_chart_structure_managements_new/popup_prepare_org_global_dept/ListDatableGlobalJobDescriptionOrgChartStructure.vue";
import AddNewDeptJobDesOrgAssign from "./manage_positions_dept_manage/PopupAddNewJobDeptOrgDescription.vue";
export default {
    mixins: [
        managerJobPositionOrgStructureProjectLevelZeroHelper,
        managerPositionOrgStructureProjectLevelZeroHelper,
        manageOrgStructureDeptNewFeatures,
    ],
    setup: () => {
        const rules = {
            dyNamicAddNewFrm: {
                $each: helpers.forEach({
                    editNameEngProjectOrgStr: {
                        required,
                        minLength: minLength(3),
                    },
                }),
            },
        };
        const state = reactive({
            dyNamicAddNewFrm: [
                {
                    editNameEngProjectOrgStr: "",
                    editNameKhmerProjectOrgStr: "",
                    editDescriptionProjectOrgStr: "",
                },
            ],
        });
        const v$ = useVuelidate(rules, state);
        return { v$, state };
    },
    components: {
        ListDatableGlobalPositionDesJobOrgChartStructure,
        AddNewDeptJobDesOrgAssign,
    },
    data() {
        return {
            visibleDialogPosition: false,
            dyNamicAddNewFrm: [
                {
                    editNameEngProjectOrgStr: "",
                    editNameKhmerProjectOrgStr: "",
                    editDescriptionProjectOrgStr: "",
                },
            ],
            selectedCountryOptOrgStr: null,
            hideOrgStructureDeptCompany: null,
            selectedProvinceOptOrgStr: null,
            selectedDistrictOptOrgStr: null,
            selectedCommuneOptOrgStr: null,
            selectedVillagesOptOrgStr: null,
            hideOrgStructureDeptPos: "",
            addDialogNewJobDesAssign: false,
            assignOrgDeptAssignId: null,
        };
    },
    computed: {
        getOrgDeptNameGlobalDataOrgStructuresDept() {
            const getOrgDeptOrgGlobalName = this.hideOrgStructureDeptCompany
                ? this.hideOrgStructureDeptCompany
                : "T1";
            let orgStricturesDeptOrg;
            switch (getOrgDeptOrgGlobalName) {
                case "T1":
                    orgStricturesDeptOrg =
                        this.getAllOrgStructuresFeatureGeoNationCongress;
                    break;
                case "T2":
                    orgStricturesDeptOrg =
                        this.getAllOrgStructuresFeatureGeoNationProvinces;
                    break;
                case "T3":
                    orgStricturesDeptOrg =
                        this.getAllOrgStructuresFeatureGeoNationDistrict;
                    break;
                case "T4":
                    orgStricturesDeptOrg =
                        this.getAllOrgStructuresFeatureGeoNationCommune;
                    break;
                case "T5":
                    orgStricturesDeptOrg =
                        this.getAllOrgStructuresFeatureGeoNationVillages;
                    break;
                default:
                    orgStricturesDeptOrg;
                    break;
            }
            return orgStricturesDeptOrg;
        },
    },
    methods: {
        openDialogAddNewJobDes() {
            this.visibleDialogPosition = true;
        },
        onClickAddMorePositionOrgStructures() {
            try {
                this.loadingAddMoreFrom = true;
                setTimeout(() => {
                    this.loadingAddMoreFrom = false;
                    try {
                        this.state.dyNamicAddNewFrm.push({
                            editNameEngProjectOrgStr: "",
                            editNameKhmerProjectOrgStr: "",
                            editDescriptionProjectOrgStr: "",
                        });
                    } catch (error) {
                        throw Error(error || error.message);
                    }
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        removePositionOrgStructureByKey(index) {
            this.dyNamicAddNewFrm.splice(index, 1);
        },
        resetForm() {
            (this.state.editNameEngProjectOrgStr = ""),
                (this.proCategoryNameKh = ""),
                (this.submitted = false);
        },
        openDialogAddNewJobDeptOrgDes() {
            this.addDialogNewJobDesAssign = true;
        },
        closedDialogAddNewJobDeptOrgDes() {
            this.addDialogNewJobDesAssign = false;
        },
        // Positions Assign Department Selection
        selectedDeptOrgDeptJobDesAssign(orgDeptId) {
            try {
                this.assignOrgDeptAssignId = orgDeptId ? orgDeptId : null;
            } catch (error) {
                throw Error(error || error.message);
            }
        },
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
