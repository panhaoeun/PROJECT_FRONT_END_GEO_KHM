<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class="font-primary text-3xl font-medium">
                Manage Geo-Fence Location
            </h2>
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click="
                    $router.push(
                        '/admin/locations/management_location_system/create-location'
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
                    <i class="pi pi-plus"></i>
                    <span class="pl-2"> Add New </span>
                </div>
            </el-button>
        </div>
        <div class="gird">
            <!-- Location filter by system -->
            <div class="col-12">
                <form method="POST">
                    <el-card slot="header" class="box-card">
                        <div
                            class="relative pb-3 text-black text-sm section section-title:before"
                        >
                            <p class="h6">Filters</p>
                        </div>
                        <div class="formgrid grid">
                            <!-- Country filter -->
                            <div class="col-4 lg:col-6 field">
                                <label
                                    for="name_en"
                                    class="text-sm font-semibold"
                                    >Country</label
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
                            </div>
                            <!-- Province -->
                            <div
                                class="col-4 field"
                                v-if="selectedCountry !== null"
                            >
                                <label
                                    for="country"
                                    class="text-sm font-semibold"
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
                                                            ?.geo_zip_code ??
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
                                                        slotProps.option
                                                            .geo_zip_code ?? ""
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
                                            getDistrictByProvinceSelectedOrgStr(
                                                selectedProvinceOptOrgStr
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
                                </div>
                            </div>
                            <!-- Villages -->
                            <!-- <div class="col-4 lg:col-12 xl:col-6 field">
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
                                </div>
                            </div> -->
                            <!-- Filters -->
                            <!-- <div class="col-12 lg:col-12 xl:col-6 field">
                                <Button
                                    icon="pi pi-filter"
                                    @click.prevent="
                                        searchFilterLocationCommuneByVillage(
                                            !v$.$invalid
                                        )
                                    "
                                    class="btn btn-primary h-3rem w-10rem"
                                    label="Filters"
                                    aria-label="submit"
                                    type="submit"
                                    :loading="loadingBtnSubmitted"
                                />
                            </div> -->
                        </div>
                    </el-card>
                </form>
            </div>
            <!-- Datable list of village by commune -->
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <!-- Check Geo-fence locations-country -->
                        <global-data-table-geo-fence
                            v-if="getTypeGeoFenceFilter == 'GEO-01'"
                            geoName="Province List"
                            :geo-fence-data-filter="
                                getAllCountryGeoLocationListData
                            "
                        />
                        <global-data-table-geo-fence
                            v-if="getTypeGeoFenceFilter == 'GEO-02'"
                            geoName="District List"
                            :geo-fence-data-filter="
                                allStateCountryOrgStrListData
                            "
                        />
                        <global-data-table-geo-fence
                            v-if="getTypeGeoFenceFilter == 'GEO-03'"
                            geoName="Commune List"
                            :geo-fence-data-filter="allStateDistrictListData"
                        />
                        <global-data-table-geo-fence
                            v-if="getTypeGeoFenceFilter == 'GEO-04'"
                            geoName="Villages List"
                            :geo-fence-data-filter="
                                allCommuneCountryByComListData
                            "
                        />
                        <p v-if="!getTypeGeoFenceFilter">Please select geo-fence filter</p>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<!-- Script of Delivery -->
<script>
import { mapActions } from "vuex";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import geoLocationVillagesHelper from "@/mixin/geoLocationVillagesHelper";
import getGeoGlobalOrgStrLocationHelper from "@/mixin/getGeoGlobalOrgStrLocationHelper";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import GlobalDataTableGeoFence from "./DataTableListGlobalGeoFence";

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
    ],
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
            selectedCountryOptOrgStr: null,
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
            selectedProvinceOptOrgStr: null,
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
    mounted() {
        this.geoLocationCountryListClick();
    },
    components: {
        GlobalDataTableGeoFence,
    },
    methods: {
        geoNameToTitleCase(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
        ...mapActions("geoVillages", ["getAllVillagesActions"]),
        /**
         *  @List village by commune of district
            @Search Filter Commune By Village
        * */

        async searchFilterLocationCommuneByVillage(validForm) {
            try {
                this.submitted = true;
                // Validation Search and Filter Location village by commune

                this.loadingBtnSubmitted = true;
                this.loadingDataListLocation = true;
                const validation = await this.v$.$validate();
                setTimeout(() => {
                    this.loadingBtnSubmitted = false;
                    this.loadingDataListLocation = false;
                    if (validation === false) {
                        const errorValidation = this.v$.$errors;
                        this.$notify({
                            title: "Please selected for filters",
                            message: errorValidation[0]?.$message
                                ? errorValidation[0]?.$message
                                : "",
                            showClose: false,
                            type: "error",
                        });
                    } else {
                        let getGeoFenceType;
                        if (
                            this.selectedCountryOpt !== "" &&
                            this.selectedCountryOpt !== null
                        ) {
                            getGeoFenceType = "GEO-01";
                            this.getTypeGeoFenceFilter = getGeoFenceType;
                            const geoLocationCountryType = "T1";
                            this.getGeoLocationStateByCountryAddNewOrgStr(
                                geoLocationCountryType,
                                ""
                            );
                        } else if (
                            this.selectedProvinceOptOrgStr !== null &&
                            this.selectedProvinceOptOrgStr !== ""
                        ) {
                            getGeoFenceType = "GEO-02";
                            this.getTypeGeoFenceFilter = getGeoFenceType;
                            const ssnSuperCountryCodeLocationGeo = this
                                .selectedCountryOpt?.geo_ssn_location
                                ? this.selectedCountryOpt?.geo_ssn_location
                                : "";
                            const geoLocationCountryType = "T2";
                            this.countryProvinceIdOptSelected =
                                ssnSuperCountryCodeLocationGeo
                                    ? ssnSuperCountryCodeLocationGeo
                                    : "";
                            this.getGeoLocationStateByCountryAddNewOrgStr(
                                geoLocationCountryType,
                                ssnSuperCountryCodeLocationGeo
                            );
                        } else if (
                            this.selectedDistrictOptOrgStr !== null &&
                            this.selectedDistrictOptOrgStr !== ""
                        ) {
                            getGeoFenceType = "GEO-03";
                            this.getTypeGeoFenceFilter = getGeoFenceType;
                            const ssnSuperCountryCodeLocationGeo = this
                                .selectedProvinceOptOrgStr?.geo_ssn_location
                                ? this.selectedProvinceOptOrgStr
                                      ?.geo_ssn_location
                                : "";
                            const geoLocationCountryType = "T3";
                            this.countryProvinceIdOptSelected =
                                ssnSuperCountryCodeLocationGeo
                                    ? ssnSuperCountryCodeLocationGeo
                                    : "";
                            this.getGeoLocationDistrictByCountryAddNewOrgStr(
                                geoLocationCountryType,
                                ssnSuperCountryCodeLocationGeo
                            );
                        } else if (
                            this.selectedCommuneOptOrgStr !== null &&
                            this.selectedCommuneOptOrgStr !== ""
                        ) {
                            getGeoFenceType = "GEO-04";
                            this.getTypeGeoFenceFilter = getGeoFenceType;
                            const ssnSuperCountryCodeLocationGeo = this
                                .selectedDistrictOptOrgStr?.geo_ssn_location
                                ? this.selectedDistrictOptOrgStr
                                      ?.geo_ssn_location
                                : "";
                            const geoLocationCountryType = "T4";
                            this.countryProvinceIdOptSelected =
                                ssnSuperCountryCodeLocationGeo
                                    ? ssnSuperCountryCodeLocationGeo
                                    : "";
                            this.getGeoLocationCommuneCapitalByCountryAddNewOrgStr(
                                geoLocationCountryType,
                                ssnSuperCountryCodeLocationGeo
                            );
                        } else if (
                            this.selectedVillagesOptOrgStr !== null &&
                            this.selectedVillagesOptOrgStr !== ""
                        ) {
                            getGeoFenceType = "GEO-04";
                            this.getTypeGeoFenceFilter = getGeoFenceType;
                            const ssnSuperCountryCodeLocationGeo = this
                                .selectedCommuneOptOrgStr?.geo_ssn_location
                                ? this.selectedCommuneOptOrgStr
                                      ?.geo_ssn_location
                                : "";
                            const geoLocationCountryType = "T4";
                            this.countryProvinceIdOptSelected =
                                ssnSuperCountryCodeLocationGeo
                                    ? ssnSuperCountryCodeLocationGeo
                                    : "";
                            this.getGeoLocationCommuneCapitalByCountryAddNewOrgStr(
                                geoLocationCountryType,
                                ssnSuperCountryCodeLocationGeo
                            );
                        }
                        // if (
                        //     (!this.selectedCountryOpt !== "" &&
                        //         this.selectStateProvinceOpt !== null) ||
                        //     this.selectSDistrictOpt !== null
                        // ) {
                        //     const villageTypeCode = "T5";
                        //     const superSSNCodeDistrictSelect = this
                        //         .selectSDCommuneCityOpt?.geo_ssn_location
                        //         ? this.selectSDCommuneCityOpt?.geo_ssn_location
                        //         : "";
                        //     this.geoLocationCommuneVillageList(
                        //         villageTypeCode,
                        //         superSSNCodeDistrictSelect
                        //     );
                        // }
                    }
                }, 1000);
                this.v$.$touch();
                if (!validForm) {
                    return;
                }
            } catch (error) {
                return false;
            }
        },
        geoLocationCountryListClick() {
            try {
                this.getGeoLocationCountryOrgStr();
            } catch (error) {
                return Promise.reject(error.message || []);
            }
        },
    },
};
</script>
<!-- Style of flag -->
<style scoped>
@import url("../../../assets/flags/flag_world.css");
</style>
