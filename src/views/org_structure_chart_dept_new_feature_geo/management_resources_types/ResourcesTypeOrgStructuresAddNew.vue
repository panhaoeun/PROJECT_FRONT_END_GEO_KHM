<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content">
        <div class="gird">
            <!-- Location filter by system -->
            <div class="col-12">
                <!-- Titles -->
                <div class="flex justify-content-between my-4">
                    <h3 class="font-primary text-3xl font-medium">
                        Add New Resources Type
                    </h3>
                    <el-button
                        type="info"
                        size="large"
                        class="btn btn-primary"
                        @click="
                            $router.push(
                                '/admin/manage-user-org-chat-geo-khm-add-new-geo-fence/resources-types'
                            )
                        "
                    >
                        <div
                            class=""
                            v-permission="[
                                {
                                    functionName: 'location_ms_system_module',
                                    moduleName: 'fun_create',
                                },
                            ]"
                        >
                            <i class="pi pi-arrow-left"></i>
                            <span class="pl-2"> Back </span>
                        </div>
                    </el-button>
                </div>
                <!--Add New Resources Type-->
                <el-card slot="header" class="box-card">
                    <div class="formgrid grid">
                        <!-- Country -->
                        <div class="col-6 lg:col-12 xl:col-12 field">
                            <label for="name_en" class="text-sm font-semibold"
                                >Country</label
                            >
                            <div
                                class="flex field flex-row justify-content-center text-sm item-center"
                            >
                                <Dropdown
                                    showClear
                                    v-model="selectedCountryOptOrgStr"
                                    :options="allCountryGeoLocation"
                                    @update:modelValue="
                                        onChangeSelectedCountryGeoOrgStr()
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
                                            v-if="slotProps?.value"
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
                                            {{ slotProps?.placeholder }}
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
                                <!--Button Resources Types Org Structures-->
                                <popup-add-new-nation-country
                                    :national-country-id="
                                        getCountryNationCongressResourceType
                                            ? getCountryNationCongressResourceType
                                            : 0
                                    "
                                    superSSNResourceId="0"
                                    typeCodeNationGeoFence="GL01"
                                    v-if="
                                        selectedCountryOptOrgStr !== null &&
                                        hideOrgStructureDeptPos === 'T1'
                                    "
                                />
                            </div>
                        </div>
                        <!-- Province -->
                        <div
                            class="col-6 lg:col-12 xl:col-12 field"
                            v-if="selectedCountry !== null"
                        >
                            <label for="country" class="text-sm font-semibold"
                                >Province/State</label
                            >
                            <div
                                class="flex field flex-row justify-content-center text-sm item-center"
                            >
                                <Dropdown
                                    showClear
                                    v-model="selectedProvinceOptOrgStr"
                                    :options="allStateCountryAddNewOrgStr"
                                    optionLabel="geo_english_name"
                                    filter
                                    @update:modelValue="
                                        getProvinceByCountrySelectedOrgStr(
                                            selectedCountryOptOrgStr
                                        )
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
                                                    slotProps.value
                                                        ?.geo_zip_code ?? ""
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
                                <!--Button Resources Types Org Structures Provinces-->
                                <popup-add-new-nation-country
                                    :national-country-id="
                                        getProvinceNationCongressResourceType
                                            ? getProvinceNationCongressResourceType
                                            : 0
                                    "
                                    superSSNResourceId="0"
                                    typeCodeNationGeoFence="GL02"
                                    v-if="
                                        selectedCountryOptOrgStr !== null &&
                                        hideOrgStructureDeptPos === 'T2'
                                    "
                                />
                            </div>
                        </div>
                        <!-- District -->
                        <div class="col-6 lg:col-12 xl:col-12 field">
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
                                        getDistrictByProvinceSelectedOrgStr(
                                            selectedProvinceNationResources
                                        )
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
                                <!--Button Resources Types Org Structures Districts-->
                                <popup-add-new-nation-country
                                    :national-country-id="
                                        getDistrictOrgStructure
                                            ? getDistrictOrgStructure
                                            : 0
                                    "
                                    superSSNResourceId="0"
                                    typeCodeNationGeoFence="GL03"
                                    v-if="
                                        selectedDistrictOptOrgStr !== null &&
                                        hideOrgStructureDeptPos === 'T3'
                                    "
                                />
                            </div>
                        </div>
                        <!-- Commune -->
                        <div class="col-6 lg:col-12 xl:col-12 field">
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
                                    @before-show="
                                        getCommuneByDistrictSelectedOrgStr(
                                            selectedDistrictOptOrgStr
                                        )
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
                                <!--Button Resources Types Org Structures Districts-->
                                <popup-add-new-nation-country
                                    :national-country-id="
                                        getCommuneOrgStructure
                                            ? getCommuneOrgStructure
                                            : 0
                                    "
                                    superSSNResourceId="0"
                                    typeCodeNationGeoFence="GL04"
                                    v-if="
                                        selectedCommuneOptOrgStr !== null &&
                                        hideOrgStructureDeptPos === 'T4'
                                    "
                                />
                            </div>
                        </div>
                        <!-- Villages -->
                        <div class="col-6 lg:col-12 xl:col-12 field">
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
                                    @before-show="
                                        getVillagesBySelectedOrgStr(
                                            selectedCommuneOptOrgStr
                                        )
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
                                <!--Button Resources Types Org Structures Districts-->
                                <popup-add-new-nation-country
                                    :national-country-id="
                                        getVillagesOrgStructure
                                            ? getVillagesOrgStructure
                                            : 0
                                    "
                                    superSSNResourceId="0"
                                    typeCodeNationGeoFence="GL05"
                                    v-if="
                                        selectedVillagesOptOrgStr !== null &&
                                        hideOrgStructureDeptPos === 'T5'
                                    "
                                />
                            </div>
                        </div>
                        <!-- Filters -->
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<!-- Script of Delivery -->
<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import geoLocationVillagesHelper from "@/mixin/geoLocationVillagesHelper";
import getGeoGlobalOrgStrLocationHelper from "@/mixin/getGeoGlobalOrgStrLocationHelper";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import manageOrgGeoResourcesTypeNationalCountryHelper from "@/mixin/manage_org_structure_dept_new_features/manage_resources_types/manageOrgGeoResourcesTypeNationalCountryHelper";
/**
 *@Add Resources Types
 */
import PopupAddNewNationCountry from "./popup_type_geo/PopAddEditNationCountryResourcesType.vue";

/**
 *
 * @List Detail of Geo-fence
 * */

export default {
    setup() {
        return { v$: useVuelidate() };
    },
    mixins: [
        util,
        validation,
        geoLocationVillagesHelper,
        getGeoGlobalOrgStrLocationHelper,
        manageOrgStructureDeptNewFeatures,
        manageOrgGeoResourcesTypeNationalCountryHelper,
    ],
    mounted() {
        this.geoLocationCountryResourcesClick();
    },
    components: {
        PopupAddNewNationCountry,
    },
    data() {
        return {
            deletedGeoVillagesDialogs: false,
            deletedDialogDataVillagesId: null,
            openEditedVillages: false,
            idEditGeoVillages: null,
            editGeoVillagesPopup: null,
            zeroCountryState: 0,
            countryRegion: null,
            submitted: false,
            selectedCountryNationResourceType: null,
            listOptCountry: [],
            selectedCountryOpt: null,
            listOptProvince: [],
            selectStateProvinceOpt: null,
            setDistrictCountry: [],
            selectSDistrictOpt: null,
            setCommuneCountry: [],
            selectSDCommuneCityOpt: null,
            setVillageCountry: [],
            geoLocationListArray: [],
            selectedGeoLocation: null,
            geoLocationCountryList: null,
            selectedProvinceNationResources: null,
            selectedDistrictOptOrgStr: null,
            selectedCommuneOptOrgStr: null,
            selectedVillagesOptOrgStr: null,
            filtersGeoVillageSystem: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                geo_zip_code: {
                    operator: FilterOperator.AND,
                    constraints: [
                        { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                    ],
                },
                geo_khmer_name: {
                    operator: FilterOperator.AND,
                    constraints: [
                        { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                    ],
                },
                representative: { value: null, matchMode: FilterMatchMode.IN },
                geo_english_name: {
                    operator: FilterOperator.AND,
                    constraints: [
                        { value: null, matchMode: FilterMatchMode.IN },
                    ],
                },
            },
            loadingDataListLocation: false,
            loadingBtnSubmitted: false,
            hideOrgStructureDeptCompany: "",
            hideOrgStructureDeptPos: "",
        };
    },
    created() {
        this.geoLocationServices = new GeoLocationsManagementServices();
    },
    validations() {
        return {
            selectedCountryOpt: { required },
        };
    },
    methods: {
        geoLocationCountryResourcesClick() {
            try {
                this.getGeoLocationCountryOrgStr();
            } catch (error) {
                return Promise.reject(error.message || []);
            }
        },
    },
};
</script>
