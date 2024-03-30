<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="font-primary text-3xl font-medium">Create Locations</h2>
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click="
                    $router.push(
                        '/admin/locations/management_location_system-list'
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
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{ $t("route.routeBack") }}</span>
                </div>
            </el-button>
        </div>
        <!-- Form Submitted -->
        <form method="POST">
            <div class="card card px-6 py-6">
                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                    <div class="col-12 lg:col-12">
                        <div class="grid formgrid">
                            <!-- Country List -->
                            <div class="col-6 field">
                                <div class="field">
                                    <label
                                        for="country"
                                        class="text-sm font-semibold"
                                        >Country<span class="p-error"
                                            >*</span
                                        ></label
                                    >
                                    <div class="flex field flex-row">
                                        <Dropdown
                                            showClear
                                            v-model="selectedCountry"
                                            :options="allCountry"
                                            optionLabel="geo_english_name"
                                            filter
                                            @change="d()"
                                            placeholder="Select a Country"
                                            class="w-full text-sm"
                                            inputId="shopEng"
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
                                                                    slotProps
                                                                        .value
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
                                                                    slotProps
                                                                        .option
                                                                        .geo_english_name ??
                                                                        ""
                                                                )
                                                            )
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
                                        <!-- Popup Country -->
                                        <PopupCreateCountryGeoLocation />
                                    </div>
                                </div>
                            </div>
                            <!-- Province or State -->
                            <div
                                class="col-6 field"
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
                                        v-model="selectStateProvinceOptAddNew"
                                        :options="allStateCountryAddNew"
                                        optionLabel="geo_english_name"
                                        filter
                                        placeholder="Select a Province or State"
                                        class="w-full text-sm"
                                        inputId="shopEng"
                                        aria-describedby="dd-error"
                                        @click="
                                            getProvinceByCountrySelected(
                                                selectedCountry
                                            )
                                        "
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
                                    <!-- District popup province -->
                                    <popup-create-province-state
                                        v-if="selectedCountry !== null"
                                        :countryProvinceId="
                                            getCountryIdOptSelectedProvince
                                                ? getCountryIdOptSelectedProvince
                                                : ''
                                        "
                                    />
                                </div>
                            </div>
                            <!-- City / Districts -->
                            <div
                                class="col-6 field"
                                v-if="selectStateProvinceOptAddNew !== null"
                            >
                                <label
                                    for="country"
                                    class="text-sm font-semibold"
                                    >Districts</label
                                >
                                <div class="flex field flex-row">
                                    <Dropdown
                                        showClear
                                        v-model="selectSDistrictOptAddNew"
                                        :options="allStateDistrictAddNew"
                                        optionLabel="geo_english_name"
                                        filter
                                        placeholder="Select a District"
                                        @click="
                                            getDistrictByProvinceSelected(
                                                selectStateProvinceOptAddNew
                                            )
                                        "
                                        class="w-full text-sm"
                                        inputId="shopEng"
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
                                    <!-- District popup -->
                                    <PopupCreateDistrict
                                        v-if="
                                            selectStateProvinceOptAddNew !==
                                            null
                                        "
                                        :geoDistrictSSNProvinceId="
                                            getProvinceIdOptSelectedDistrict
                                                ? getProvinceIdOptSelectedDistrict
                                                : ''
                                        "
                                    />
                                </div>
                            </div>
                            <!-- Town / Commune -->
                            <div
                                class="col-6 field"
                                v-if="selectSDistrictOptAddNew !== null"
                            >
                                <label
                                    for="country"
                                    class="text-sm font-semibold"
                                    >Town / Commune</label
                                >
                                <div class="flex field flex-row">
                                    <Dropdown
                                        showClear
                                        v-model="selectSDCommuneCityOptAddNew"
                                        :options="allCommuneCountryByCom"
                                        optionLabel="geo_english_name"
                                        @click="
                                            getCommuneByDistrictSelected(
                                                selectSDistrictOptAddNew
                                            )
                                        "
                                        filter
                                        placeholder="Select a Commune"
                                        class="w-full text-sm"
                                        inputId="shopEng"
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
                                    <!-- Popup Create Commune -->
                                    <PopupCreateCommuneByDistrict
                                        v-if="selectSDistrictOptAddNew !== null"
                                        :geoDistrictSSNCommuneId="
                                            getDistrictIdOptSelectedCommune
                                                ? getDistrictIdOptSelectedCommune
                                                : ''
                                        "
                                    />
                                </div>
                            </div>
                            <!-- Villages for Town or Commune -->
                            <geo-village-by-commune-town-popup
                                v-if="selectSDCommuneCityOptAddNew !== null"
                                :geoDistrictSSNVillageId="
                                    getCommuneIdOptSelectedVillage
                                        ? getCommuneIdOptSelectedVillage
                                        : ''
                                "
                                :geoVillageName="selectSDCommuneCityOptAddNew"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<!-- Script Create New Locations -->
<script>
import PopupCreateCountryGeoLocation from "./pop_up_create_locations/country_geo_location/PopupCreateCountryGeoLocation";
import PopupCreateProvinceState from "./pop_up_create_locations/province_state/PopupCreateProvinceState.vue";
import PopupCreateDistrict from "./pop_up_create_locations/districts_city_location/PopupCreateDistrictsCity";
import PopupCreateCommuneByDistrict from "./pop_up_create_locations/town_commune/PopupTownCommuneCreate";
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import { mapGetters, mapActions } from "vuex";
import GeoVillageByCommuneTownPopup from "./pop_up_create_locations/village_of_commune/GeoVillageByCommuneTownPopup";

export default {
    components: {
        PopupCreateProvinceState,
        PopupCreateCountryGeoLocation,
        PopupCreateDistrict,
        PopupCreateCommuneByDistrict,
        GeoVillageByCommuneTownPopup,
    },
    props: {},
    data() {
        return {
            zeroSelectCommune: 0,
            selectedCountry: null,
            selectSDCommuneCityOptAddNew: null,
            countryProvinceIdOptSelected: null,
            geoDistrictSSNProvinceOptSelected: null,
            ssnCommuneByVillageCodeId: null,
            geoCountryId: null,
            ssnDistrictCodeId: null,
            setDistrictCountryAddNew: [],
            selectStateProvinceOptAddNew: null,
            selectSDistrictOptAddNew: null,
        };
    },
    created() {
        this.geoLocationServices = new GeoLocationsManagementServices();
    },
    computed: {
        ...mapGetters("geoCountry", ["countryAll"]),
        ...mapGetters("geoProvince", ["provinceAll"]),
        ...mapGetters("geoDistrict", ["districtAll"]),
        ...mapGetters("geoCommune", ["communeAll"]),
        allCountry() {
            return this.countryAll || [];
        },
        allStateCountryAddNew() {
            return this.provinceAll || [];
        },
        allStateDistrictAddNew() {
            return this.districtAll || [];
        },
        allCommuneCountryByCom() {
            return this.communeAll || [];
        },
        getCommuneByVillage() {
            return this.selectSDCommuneCityOptAddNew || [];
        },
        /**
         * @Get Opt Selected Geo-Fence Location
         * */
        getCountryIdOptSelectedProvince() {
            if (
                !Array.isArray(this.selectedCountry) ||
                this.selectedCountry !== undefined ||
                this.selectedCountry !== null
            ) {
                const getCountryOptSelected =
                    this.selectedCountry?.geo_ssn_location ?? "";
                return getCountryOptSelected;
            }
            return null;
        },
        getProvinceIdOptSelectedDistrict() {
            if (
                !Array.isArray(this.selectStateProvinceOptAddNew) ||
                this.selectStateProvinceOptAddNew !== undefined ||
                this.selectStateProvinceOptAddNew !== null
            ) {
                const getProvinceOptSelected =
                    String(
                        this.selectStateProvinceOptAddNew?.geo_ssn_location
                    ) ?? "";
                return getProvinceOptSelected;
            }
            return null;
        },
        getDistrictIdOptSelectedCommune() {
            if (
                !Array.isArray(this.selectSDistrictOptAddNew) ||
                this.selectSDistrictOptAddNew !== undefined ||
                this.selectSDistrictOptAddNew !== null
            ) {
                const getDistrictOptSelected =
                    String(this.selectSDistrictOptAddNew?.geo_ssn_location) ??
                    "";
                return getDistrictOptSelected;
            }
            return null;
        },
        getCommuneIdOptSelectedVillage() {
            if (
                !Array.isArray(this.selectSDCommuneCityOptAddNew) ||
                this.selectSDCommuneCityOptAddNew !== undefined ||
                this.selectSDCommuneCityOptAddNew !== null
            ) {
                const getCommuneOptSelected =
                    String(
                        this.selectSDCommuneCityOptAddNew?.geo_ssn_location
                    ) ?? "";
                return getCommuneOptSelected;
            }
            return null;
        },
    },
    mounted() {
        this.getGeoLocationCountry();
    },
    methods: {
        ...mapActions("geoCountry", ["getAllCountryActions"]),
        ...mapActions("geoProvince", ["getAllProvinceActions"]),
        ...mapActions("geoDistrict", ["getAllDistrictActions"]),
        ...mapActions("geoCommune", ["getAllCommuneActions"]),
        ...mapActions("geoVillages", ["getAllVillagesActions"]),
        d() {
            if (
                !Array.isArray(this.selectedCountry) ||
                this.selectedCountry !== undefined ||
                this.selectedCountry !== null
            ) {
                this.selectStateProvinceOptAddNew = null;
            }
        },
        // Case Title
        geoNameToTitleCase(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
        // Selected By Dropdown
        getProvinceByCountrySelected(countryParentId) {
            if (
                !Array.isArray(countryParentId) ||
                !countryParentId?.length > 0
            ) {
                this.selectStateProvinceOptAddNew = null;
            }
            /**
             * @Check Clear District
             * */
            if (
                !Array.isArray(this.selectStateProvinceOptAddNew) ||
                this.selectStateProvinceOptAddNew !== undefined ||
                this.selectStateProvinceOptAddNew !== null
            ) {
                this.selectSDistrictOptAddNew = null;
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
                    this.getGeoLocationStateByCountryAddNew(
                        geoLocationCountryType,
                        ssnSuperCountryCodeLocationGeo
                    );
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        getDistrictByProvinceSelected(provinceParentId) {
            if (
                !Array.isArray(provinceParentId) ||
                !provinceParentId?.length > 0
            ) {
                this.selectSDistrictOptAddNew = null;
            }
            /**
             * @Check Clear Commune
             * */
            if (
                !Array.isArray(this.selectSDistrictOptAddNew) ||
                this.selectSDistrictOptAddNew !== undefined ||
                this.selectSDistrictOptAddNew !== null
            ) {
                this.selectSDCommuneCityOptAddNew = null;
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
                    this.getGeoLocationDistrictByCountryAddNew(
                        geoLocationProvinceType,
                        ssnSuperProvinceCodeLocationGeo
                    );
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        getCommuneByDistrictSelected(districtParentId) {
            if (
                !Array.isArray(districtParentId) ||
                !districtParentId?.length > 0
            ) {
                this.selectSDCommuneCityOptAddNew = null;
            }
            try {
                if (
                    !Array.isArray(districtParentId) ||
                    districtParentId?.geo_ssn_location !== undefined ||
                    districtParentId?.geo_ssn_location !== null
                ) {
                    const ssnSuperProvinceCodeLocationGeo =
                        districtParentId?.geo_ssn_location
                            ? districtParentId?.geo_ssn_location
                            : "";
                    const geoLocationProvinceType = "T4";
                    this.ssnCommuneByVillageCodeId = ssnSuperProvinceCodeLocationGeo
                        ? ssnSuperProvinceCodeLocationGeo
                        : null;
                    this.getGeoLocationCommuneCapitalByCountryAddNew(
                        geoLocationProvinceType,
                        ssnSuperProvinceCodeLocationGeo
                    );
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        // Get All List
        getGeoLocationCountry() {
            try {
                this.getAllCountryActions();
            } catch (error) {
                return Promise.reject(error.message || []);
            }
        },
        getGeoLocationStateByCountryAddNew(
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
        getGeoLocationDistrictByCountryAddNew(
            districtStateType,
            superSSNDistrictCode
        ) {
            try {
                this.geoLocationServices
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
        getGeoLocationCommuneCapitalByCountryAddNew(
            communeStateType,
            superSSNCommuneCode
        ) {
            try {
                this.geoLocationServices
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
    },
};
</script>
<!-- Style -->
<style scoped>
@import url("../../../assets/flags/flag_world.css");
</style>
