<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class=" font-primary text-3xl  font-medium ">Locations</h2>
           <el-button 
                type="info" size="large" class="btn btn-primary"
                @click="$router.push('/admin/locations/management_location_system/create-location')"
            >
                <div class="" v-permission="[{ functionName: 'location_ms_system_module', moduleName: 'fun_create' }]">
                    <i class="pi pi-plus"></i>
                    <span class="pl-2">
                        Create New
                    </span>
                </div>
            </el-button>
        </div>
        <div class="gird">
            <!-- Location filter by system -->
            <div class="col-12">
                <form @submit.prevent="searchFilterLocationCommuneByVillage(!v$.$invalid)">
                    <el-card slot="header" class="box-card">
                        <div class="relative pb-3 text-black text-sm section section-title:before">
                            <p class="h6">Filters</p>
                        </div>
                        <div class="formgrid grid">
                            <!-- Country filter -->
                            <div class="col-4 lg:col-6 field">
                                <label for="name_en" class="text-sm font-semibold">Country</label>
                                <Dropdown 
                                    showClear
                                    v-model="v$.selectedCountryOpt.$model"
                                    :class="{ 'p-invalid border-round-lg p-error': v$.selectedCountryOpt.$invalid && submitted }"
                                    :options="setCountry" 
                                    optionLabel="shop_eng" 
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
                                <small v-if="(v$.selectedCountryOpt.$invalid && submitted) || v$.selectedCountryOpt.$pending.$response" class="p-error text-lg">Please select country</small>
                            </div>
                            <!-- Province or State -->
                            <div class="col-4 lg:col-6 field" v-if="setStateCountry.length !== zeroCountryState">
                                <label for="name_en" class="text-sm font-semibold">Province or State</label>
                                <Dropdown 
                                    showClear
                                    :options="setStateCountry" 
                                    v-model="v$.selectStateProvinceOpt.$model"
                                    :class="{ 'p-invalid border-round-lg p-error': v$.selectStateProvinceOpt.$invalid && submitted }"
                                    optionLabel="shop_eng" 
                                    filter
                                    placeholder="Select a Province or State" 
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
                                            <div class="text-sm">{{ slotProps.option.geo_english_name ?? '' }} ({{ slotProps.option?.geo_zip_code ?? '' }})</div>
                                        </div>
                                    </template>
                                </Dropdown>  
                                <small v-if="(v$.selectStateProvinceOpt.$invalid && submitted) || v$.selectStateProvinceOpt.$pending.$response" class="p-error text-lg">Please selected province or state</small>
                            </div>
                            <!-- District or City -->
                            <div class="col-4 lg:col-6 field" v-if="setDistrictCountry?.length !== zeroCountryState">
                                <label for="name_en" class="text-sm font-semibold">District</label>
                                <Dropdown 
                                    showClear
                                    v-model="v$.selectSDistrictOpt.$model"
                                    :class="{ 'p-invalid border-round-lg p-error': v$.selectSDistrictOpt.$invalid && submitted }"
                                    :options="setDistrictCountry" 
                                    optionLabel="shop_eng" 
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
                                            <div class="text-sm">{{ slotProps.option.geo_english_name ?? '' }} ({{ slotProps.option?.geo_zip_code ?? '' }})</div>
                                        </div>
                                    </template>
                                </Dropdown>  
                                <small v-if="(v$.selectSDistrictOpt.$invalid && submitted) || v$.selectSDistrictOpt.$pending.$response" class="p-error text-lg">Please selected district</small>
                            </div>
                            <!-- Commune or Capital -->
                            <div class="col-4 lg:col-6 field" v-if="setCommuneCountry.length !== zeroCountryState">
                                <label for="name_en" class="text-sm font-semibold">Commune</label>
                                <Dropdown 
                                    showClear
                                    v-model="v$.selectSDCommuneCityOpt.$model"
                                    :class="{ 'p-invalid border-round-lg p-error': v$.selectSDCommuneCityOpt.$invalid && submitted }"
                                    :options="setCommuneCountry" 
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
                                            <div class="text-sm">{{ slotProps.option.geo_english_name ?? '' }} ({{ slotProps.option?.geo_zip_code ?? '' }})</div>
                                        </div>
                                    </template>
                                </Dropdown>  
                                <small v-if="(v$.selectSDCommuneCityOpt.$invalid && submitted) || v$.selectSDCommuneCityOpt.$pending.$response" class="p-error text-lg">Please selected commune</small>
                            </div>
                            <!-- Filters -->
                            <div class="col-12 lg:col-6 field" v-if="setCommuneCountry.length !== zeroCountryState">
                                <Button icon="pi pi-filter" class="btn btn-primary h-3rem w-10rem" label="Filters" aria-label="submit" type="submit"/>
                            </div>
                        </div>
                    </el-card>
                </form>  
            </div>
            <!-- Datable list of village by commune -->
            <div class="col-12">
                <el-card slot="header" class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                                <DataTable 
                                    scrollable
                                    ref="dt" 
                                    :value="geoLocationListArray" 
                                    v-model:selection="selectedGeoLocation"
                                    dataKey="id"
                                    :paginator="true" 
                                    :rows="10" 
                                    :filters="filters"
                                    class="p-datatable-scrollable text-sm"
                                    :globalFilterFields="['representative.geo_zip_code', 'geo_khmer_name', 'geo_english_name']"
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    :rowsPerPageOptions="[5, 10, 25]"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} geo-location">
                                    <!-- Header -->
                                    <template #header>
                                        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                            <!-- Filter Date Order -->
                                            <h4 class="m-0">
                                                
                                            </h4>
                                            <span class="p-input-icon-left">
                                                <i class="pi pi-search" />
                                                <InputText v-model="filters['global'].value" :placeholder="$t('route.search')" />
                                            </span>
                                        </div>
                                    </template>
                                    <!-- Empty Users -->
                                    <template #empty>Villages not found!</template>
                                    <!-- Loading Users -->
                                    <template #loading> Loading villages data. Please wait...</template>
                                    <!--------------Check Existed Data ----------->
                                    <template v-if="geoLocationListArray && geoLocationListArray.length > 0 && geoLocationListArray != ''">
                                        <!-- Columns -->
                                        <Column field="geo_zip_code" header="Code" sortable></Column>
                                        <Column field="geo_khmer_name" header="Village Name" sortable></Column>
                                        <Column field="geo_english_name" header="Village Latin Name" sortable></Column>
                                        <!-- <Column field="id" header="Shop" sortable>
                                            <template #body="slotProps">
                                                <div class="justify-content-center">
                                                    <p class="font-bold text-sm"> {{slotProps.data?.store}}</p>
                                                </div>
                                            </template>
                                        </Column>
                                         -->
                                    </template>
                                </DataTable>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<!-- Script of Delivery -->
<script>
    import { FilterMatchMode } from 'primevue/api';
    import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
    import { useVuelidate } from '@vuelidate/core';
    import { required } from '@vuelidate/validators';

    export default{
        setup() {
          return { v$: useVuelidate() }
        },
        data(){
            return {
                zeroCountryState: 0,
                countryRegion: null,
                submitted: false,
                setCountry: [],
                selectedCountryOpt: null,
                setStateCountry: [],
                selectStateProvinceOpt: null,
                setDistrictCountry: [],
                selectSDistrictOpt: null,
                setCommuneCountry: [],
                selectSDCommuneCityOpt: null,
                setVillageCountry: [],
                geoLocationListArray: [],  
                selectedGeoLocation: null,
                geoLocationCountryList: null,
                geoLocationStateList: null,
                geoLocationDistrictList: null,
                geoLocationCommuneList: null,
                filters: {
                    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
                }
            }
        },
        created(){
            this.geoLocationServices = new GeoLocationsManagementServices();
        },
        mounted() {
            this.geoLocationCommuneVillageList();
            this.getGeoLocationCountry();
        },
        validations() {
            return {
                selectedCountryOpt: {required},
                selectStateProvinceOpt: {required},
                selectSDistrictOpt: {required},
                selectSDCommuneCityOpt: {required}
            }
        },  
        // watch: {
        //     selectedCountryOpt: function(){
        //         this.selectStateProvinceOpt = null;
        //         this.selectSDistrictOpt = null;
        //         this.selectSDCommuneCityOpt = null;
        //         // Populate list of province or state in the second dropdown
        //         if(Object.values(this.selectedCountryOpt).length > 0 || this.selectedCountryOpt !== undefined && this.selectedCountryOpt === "object"){
        //             const ssnSuperCountryCodeLocationGeo = this.selectedCountryOpt?.geo_ssn_location ? this.selectedCountryOpt?.geo_ssn_location : '';
        //             const geoLocationCountryType = "T2";
        //             this.getGeoLocationStateByCountry(geoLocationCountryType,ssnSuperCountryCodeLocationGeo);
        //         }
        //     },
        //     selectStateProvinceOpt: function(){
        //         this.selectSDCommuneCityOpt = null;
        //         this.selectSDistrictOpt = null;
        //         // Populate list of district in the second dropdown
        //         if(Object.values(this.selectStateProvinceOpt).length > 0 || this.selectStateProvinceOpt !== undefined && this.selectStateProvinceOpt === "object"){
        //             const ssnSuperDistrictCodeLocationGeo = this.selectStateProvinceOpt?.geo_ssn_location ? this.selectStateProvinceOpt?.geo_ssn_location : '';
        //             const geoLocationDistrictType = "T3";
        //             this.getGeoLocationDistrictByCountry(geoLocationDistrictType,ssnSuperDistrictCodeLocationGeo);
        //         }
        //     },
        //     selectSDistrictOpt: function(){
        //         // Populate list of commune in the third dropdown
        //         if(Object.values(this.selectSDistrictOpt).length > 0 || this.selectSDistrictOpt !== undefined && this.selectSDistrictOpt === "object"){
        //             const ssnSuperCommuneCodeLocationGeo = this.selectSDistrictOpt?.geo_ssn_location ? this.selectSDistrictOpt?.geo_ssn_location : '';
        //             const geoLocationCommuneType = "T4";
        //             this.getGeoLocationCommuneCapitalByCountry(geoLocationCommuneType,ssnSuperCommuneCodeLocationGeo);
        //         }
        //     }
        // },
        methods: {
            // Search Filter Commune By Village
            searchFilterLocationCommuneByVillage(){
                try{
                    this.submitted = true;
                    if(!this.selectSDCommuneCityOpt){
                        this.$notify.error({
                            title: 'Please select commune',
                            showClose: false
                        });
                    }
                    // Validation Search and Filter Location village by commune
                    if(!this.selectedCountryOpt  !== ''
                        && !this.selectStateProvinceOpt || !this.proCode 
                        && this.selectSDistrictOpt !== undefined 
                        && this.selectSDistrictOpt !== null){
                        console.log(this.selectStateProvinceOpt)
                    }
                    if(Object.values(this.selectSDCommuneCityOpt).length > 0 || this.selectSDCommuneCityOpt !== undefined && this.selectSDCommuneCityOpt === "object"){
                        const villageTypeCode = "T5";
                        const superSSNCodeDistrictSelect =  this.selectSDCommuneCityOpt?.geo_ssn_location ? this.selectSDCommuneCityOpt?.geo_ssn_location : '';
                        this.geoLocationCommuneVillageList(villageTypeCode,superSSNCodeDistrictSelect); 
                    }   
                }catch(error){
                    return false;   
                }
            },
            getGeoLocationCountry(){
                try{
                    const countryZipTypeCountry = 'T1';
                    const superSSNCountryCode = "";
                    this.geoLocationServices.listGeoLocationCountryByZip(countryZipTypeCountry, superSSNCountryCode).then((country) => {
                        if (!country) {
                            this.setCountry = [];
                        }
                        this.setCountry = Array.isArray(country) ? country.slice() : [];
                    }).catch((error) => {
                        return Promise.reject(error.message || []);
                    }); 
                }catch(error){
                    return Promise.reject(error.message || []);
                }
            },
            getGeoLocationStateByCountry(provinceStateCode,superSSNStateCode){
                try{
                    this.geoLocationServices.listGeoLocationProvinceState(provinceStateCode, superSSNStateCode).then((country) => {
                        if (!country) {
                            this.setStateCountry = [];
                        }
                        this.setStateCountry = Array.isArray(country) ? country.slice() : [];
                    }).catch((error) => {
                        return Promise.reject(error.message || []);
                    }); 
                }catch(error){
                    return Promise.reject(error.message || []);
                }
            },
            getGeoLocationDistrictByCountry(districtStateType,superSSNDistrictCode){
                try{
                    this.geoLocationServices.listGeoLocationDistrict(districtStateType, superSSNDistrictCode).then((district) => {
                        if (!district) {
                            this.setDistrictCountry = [];
                        }
                        this.setDistrictCountry = Array.isArray(district) ? district.slice() : [];
                    }).catch((error) => {
                        return Promise.reject(error.message || []);
                    }); 
                }catch(error){
                    return Promise.reject(error.message || []);
                }
            },
            getGeoLocationCommuneCapitalByCountry(communeStateType,superSSNCommuneCode){
                try{
                    this.geoLocationServices.listGeoLocationCommune(communeStateType, superSSNCommuneCode).then((commune) => {
                        if (!commune) {
                            this.setCommuneCountry = [];
                        }
                        this.setCommuneCountry = Array.isArray(commune) ? commune.slice() : [];
                    }).catch((error) => {
                        return Promise.reject(error.message || []);
                    }); 
                }catch(error){
                    return Promise.reject(error.message || []);
                }
            },
            // List village by commune of district
            geoLocationCommuneVillageList(villageType,superSSNCityCode){
                try{         
                    this.geoLocationServices.listGeoLocationVillageCommune(villageType,superSSNCityCode).then((location) => {
                            if (!location) {
                                this.geoLocationListArray = [];
                            }
                            this.geoLocationListArray = Array.isArray(location) ? location.slice() : [];
                        }).catch((error) => {
                            return Promise.reject(error.message || []);
                        });
                }catch(error){
                    return Promise.reject(error.message || []);
                }
            },
        }
    }
</script>
<!-- Style of flag -->
<style scoped>
    @import url('../../../assets/flags/flag_world.css');
</style>