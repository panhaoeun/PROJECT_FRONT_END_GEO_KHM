<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="font-primary text-3xl  font-medium ">Create Locations</h2>
            <el-button type="info" size="large" class="btn btn-primary"  @click="$router.push('/admin/locations/management_location_system-list')">
                    <div class="" v-permission="[{ functionName: 'location_ms_system_module', moduleName: 'fun_create' }]">
                        <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                        <span class="pl-2">{{$t("route.routeBack")}}</span>
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
                                    <label for="country" class="text-sm font-semibold">Country<span class="p-error">*</span></label>
                                    <div class="flex field flex-row">
                                            <Dropdown 
                                                showClear
                                                v-model="selectedCountry" 
                                                :options="allCountry" 
                                                optionLabel="geo_english_name" 
                                                filter
                                                placeholder="Select a Country" 
                                                class="w-full text-sm" 
                                                inputId="shopEng"
                                                aria-describedby="dd-error"
                                            >
                                                <template #value="slotProps">
                                                    <div v-if="slotProps.value" class="flex align-items-center">
                                                        <img :alt="slotProps.value?.geo_english_name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.geo_location_01.toLowerCase()}`" style="width: 18px" />
                                                        <div class="text-sm">{{ slotProps.value?.geo_english_name ?? '' }}</div>
                                                    </div>
                                                    <span v-else class="text-sm">
                                                        {{ slotProps.placeholder }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div class="flex align-items-center text-sm">
                                                        <img :alt="slotProps.option?.geo_english_name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.geo_location_01.toLowerCase()}`" style="width: 18px" />
                                                        <div class="text-sm">{{ slotProps.option.geo_english_name ?? '' }} ({{ slotProps.option.geo_location_01 ?? '' }})</div>
                                                    </div>
                                                </template>
                                            </Dropdown>  
                                            <!-- Popup Country -->
                                            <PopupCreateCountryGeoLocation/>
                                    </div> 
                                </div>
                            </div>
                            <!-- Province or State -->
                            <div class="col-6 field"> 
                                <label for="country" class="text-sm font-semibold">Province/State</label>
                                <div class="flex field flex-row">
                                   <Dropdown 
                                        showClear
                                        v-model="selectStateProvinceOptAddNew" 
                                        :options="setStateCountryAddNew" 
                                            optionLabel="geo_english_name" 
                                            filter
                                            placeholder="Select a Country" 
                                            class="w-full text-sm" 
                                            inputId="shopEng"
                                            aria-describedby="dd-error"
                                        >
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex align-items-center">
                                                <div class="text-sm">{{ slotProps.value?.geo_english_name ?? '' }}</div>
                                            </div>
                                            <span v-else class="text-sm">
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex align-items-center text-sm">
                                                <div class="text-sm">{{ slotProps.option.geo_english_name ?? '' }} ({{ slotProps.option.geo_zip_code ?? '' }})</div>
                                            </div>
                                        </template>
                                    </Dropdown>  
                                   <!-- District popup province -->
                                    <popup-create-province-state/>
                                </div>
                            </div>
                            <!-- City / Districts -->
                            <div class="col-6 field"> 
                                <label for="country" class="text-sm font-semibold">Districts</label>
                                <div class="flex field flex-row">
                                    <Dropdown 
                                        showClear
                                        v-model="selectSDistrictOptAddNew" 
                                        :options="setDistrictCountryAddNew" 
                                        optionLabel="geo_english_name" 
                                        filter
                                        placeholder="Select a District" 
                                        class="w-full text-sm" 
                                        inputId="shopEng"
                                        aria-describedby="dd-error"
                                    >
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex align-items-center">
                                                <div class="text-sm">{{ slotProps.value?.geo_english_name ?? '' }}</div>
                                            </div>
                                            <span v-else class="text-sm">
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex align-items-center text-sm">
                                                <div class="text-sm">{{ slotProps.option.geo_english_name ?? '' }} ({{ slotProps.option.geo_zip_code ?? '' }})</div>
                                            </div>
                                        </template>
                                    </Dropdown>  
                                    <!-- District popup -->
                                    <PopupCreateDistrict/>
                                </div>
                            </div>
                            <!-- Town / Commune -->
                            <div class="col-6 field"  v-if="setCommuneCountryAddNew.length !== zeroSelectCommune"> 
                                <label for="country" class="text-sm font-semibold">Town / Commune</label>
                                <div class="flex field flex-row">
                                  <Dropdown 
                                        showClear
                                        v-model="selectSDCommuneCityOptAddNew" 
                                        :options="setCommuneCountryAddNew" 
                                        optionLabel="geo_english_name" 
                                        filter
                                        placeholder="Select a Commune" 
                                        class="w-full text-sm" 
                                        inputId="shopEng"
                                        aria-describedby="dd-error"
                                    >
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex align-items-center">
                                                <div class="text-sm">{{ slotProps.value?.geo_english_name ?? '' }}</div>
                                            </div>
                                            <span v-else class="text-sm">
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex align-items-center text-sm">
                                                <div class="text-sm">{{ slotProps.option.geo_english_name ?? '' }} ({{ slotProps.option.geo_zip_code ?? '' }})</div>
                                            </div>
                                        </template>
                                        <template #footer>
                                            <ListProvinceStatePopup/>
                                        </template>
                                    </Dropdown>  
                                    <!-- Popup Create Commune -->
                                    <PopupCreateCommuneByDistrict/>
                                </div>
                            </div>
                            <!-- Villages for Town or Commune -->
                            <VillageOfCommuneCreateVue 
                                v-if="setCommuneCountryAddNew.length !== zeroSelectCommune"
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
import ListProvinceStatePopup from "./pop_up_create_locations/province_state/ListProvinceState.vue";
import VillageOfCommuneCreateVue from "./pop_up_create_locations/village_of_commune/VillageOfCommuneCreate.vue";
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
export default {
    components: {
        PopupCreateProvinceState,
        PopupCreateCountryGeoLocation,
        PopupCreateDistrict,
        PopupCreateCommuneByDistrict,
        ListProvinceStatePopup,
        VillageOfCommuneCreateVue,
    },
    props: {},
    data() {
        return {
            zeroSelectCommune: 0,
            selectedCountry: null,
            allCountry: [],
            setStateCountryAddNew: [],
            setDistrictCountryAddNew: [],
            setCommuneCountryAddNew: [],
            selectStateProvinceOptAddNew: null,
            selectSDistrictOptAddNew: null,
            selectSDCommuneCityOptAddNew: null
        };
    },
    created(){
        this.geoLocationServices = new GeoLocationsManagementServices();
    },
    watch: {
        selectedCountry: function(){
            this.selectStateProvinceOptAddNew = null;
            this.selectSDistrictOptAddNew = null;
            this.selectSDCommuneCityOptAddNew = null;
            // Populate list of province or state in the second dropdown
            if(Object.values(this.selectedCountry).length > 0 || this.selectedCountry !== undefined && this.selectedCountry === "object"){
                const ssnSuperCountryCodeLocationGeo = this.selectedCountry?.geo_ssn_location ? this.selectedCountry?.geo_ssn_location : '';
                const geoLocationCountryType = "T2";
                this.getGeoLocationStateByCountryAddNew(geoLocationCountryType,ssnSuperCountryCodeLocationGeo);
            }
        },
        selectStateProvinceOptAddNew: function(){
            this.selectSDCommuneCityOptAddNew = null;
            this.selectSDistrictOptAddNew = null;
            // Populate list of district in the second dropdown
            if(Object.values(this.selectStateProvinceOptAddNew).length > 0 || this.selectStateProvinceOptAddNew !== undefined && this.selectStateProvinceOptAddNew === "object"){
                const ssnSuperDistrictCodeLocationGeo = this.selectStateProvinceOptAddNew?.geo_ssn_location ? this.selectStateProvinceOptAddNew?.geo_ssn_location : '';
                const geoLocationDistrictType = "T3";
                this.getGeoLocationDistrictByCountryAddNew(geoLocationDistrictType,ssnSuperDistrictCodeLocationGeo);
            }
        },
        selectSDistrictOptAddNew: function(){
            // Populate list of commune in the third dropdown
            if(Object.values(this.selectSDistrictOptAddNew).length > 0 || this.selectSDistrictOptAddNew !== undefined && this.selectSDistrictOptAddNew === "object"){
                const ssnSuperCommuneCodeLocationGeo = this.selectSDistrictOptAddNew?.geo_ssn_location ? this.selectSDistrictOptAddNew?.geo_ssn_location : '';
                const geoLocationCommuneType = "T4";
                this.getGeoLocationCommuneCapitalByCountryAddNew(geoLocationCommuneType,ssnSuperCommuneCodeLocationGeo);
            }
        }
    },
    methods: {
        getGeoLocationCountry(){
            try{
                const countryZipTypeCountry = 'T1';
                const superSSNCountryCode = "";
                this.geoLocationServices.listGeoLocationCountryByZip(countryZipTypeCountry, superSSNCountryCode).then((country) => {
                    if (!country) {
                        this.allCountry = [];
                    }
                    this.allCountry = Array.isArray(country) ? country.slice() : [];
                }).catch((error) => {
                    return Promise.reject(error.message || []);
                }); 
            }catch(error){
                return Promise.reject(error.message || []);
            }
        },
        getGeoLocationStateByCountryAddNew(provinceStateCode,superSSNStateCode){
            try{
                this.geoLocationServices.listGeoLocationProvinceState(provinceStateCode, superSSNStateCode).then((country) => {
                    if (!country) {
                        this.setStateCountryAddNew = [];
                    }
                    this.setStateCountryAddNew = Array.isArray(country) ? country.slice() : [];
                }).catch((error) => {
                    return Promise.reject(error.message || []);
                }); 
            }catch(error){
                return Promise.reject(error.message || []);
            }
        },
        getGeoLocationDistrictByCountryAddNew(districtStateType,superSSNDistrictCode){
            try{
                this.geoLocationServices.listGeoLocationDistrict(districtStateType, superSSNDistrictCode).then((district) => {
                    if (!district) {
                        this.setDistrictCountryAddNew = [];
                    }
                    this.setDistrictCountryAddNew = Array.isArray(district) ? district.slice() : [];
                }).catch((error) => {
                    return Promise.reject(error.message || []);
                }); 
            }catch(error){
                return Promise.reject(error.message || []);
            }
        },
        getGeoLocationCommuneCapitalByCountryAddNew(communeStateType,superSSNCommuneCode){
            try{
                this.geoLocationServices.listGeoLocationCommune(communeStateType, superSSNCommuneCode).then((commune) => {
                    if (!commune) {
                        this.setCommuneCountryAddNew = [];
                    }
                    this.setCommuneCountryAddNew = Array.isArray(commune) ? commune.slice() : [];
                }).catch((error) => {
                    return Promise.reject(error.message || []);
                }); 
            }catch(error){
                return Promise.reject(error.message || []);
            }
        },
    },
    mounted() {
        this.getGeoLocationCountry();
    },
};
</script>
<!-- Style -->
<style scoped>
    @import url('../../../assets/flags/flag_world.css');
</style>