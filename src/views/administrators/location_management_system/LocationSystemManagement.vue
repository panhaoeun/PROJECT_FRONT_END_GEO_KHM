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
                <form method="POST">
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
                                    :options="listOptCountry" 
                                    optionLabel="shop_eng" 
                                    filter
                                    placeholder="Select a Country" 
                                    class="w-full text-sm" 
                                    inputId="shopEng"
                                    aria-describedby="dd-error"
                                >
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="flex align-items-center">
                                            <div class="text-sm">{{ slotProps.value?.geo_english_name ?? '' }}({{ slotProps.value.geo_zip_code ?? '' }})</div>
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
                                <small v-if="(v$.selectedCountryOpt.$invalid && submitted) || v$.selectedCountryOpt.$pending.$response" class="p-error text-lg">Please select country</small>
                            </div>
                            <!-- Province or State -->
                            <div class="col-4 lg:col-6 field">
                                <label for="name_en" class="text-sm font-semibold">Province or State</label>
                                <Dropdown 
                                    showClear
                                    :options="listOptProvince" 
                                    v-model="v$.selectStateProvinceOpt.$model"
                                    :class="{ 'p-invalid border-round-lg p-error': v$.selectStateProvinceOpt.$invalid && submitted }"
                                    optionLabel="shop_eng" 
                                    @click="selectedProvinceStateFilter()"
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
                                            <div class="text-sm">{{ slotProps.option?.geo_english_name ?? '' }} ({{ slotProps.option?.geo_zip_code ?? '' }})</div>
                                        </div>
                                    </template>
                                </Dropdown>  
                                <small v-if="(v$.selectStateProvinceOpt.$invalid && submitted) || v$.selectStateProvinceOpt.$pending.$response" class="p-error text-lg">Please selected province or state</small>
                            </div>
                            <!-- District or City -->
                            <div class="col-4 lg:col-6 field">
                                <label for="name_en" class="text-sm font-semibold">District</label>
                                <Dropdown 
                                    showClear
                                    v-model="v$.selectSDistrictOpt.$model"
                                    :class="{ 'p-invalid border-round-lg p-error': v$.selectSDistrictOpt.$invalid && submitted }"
                                    :options="setDistrictCountry" 
                                    optionLabel="geo_english_name" 
                                    filter
                                    placeholder="Select a District" 
                                    @click="selectedCommuneByDistrictFilter()"
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
                            <div class="col-4 lg:col-6 field">
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
                                    @click="selectedCommuneByFilter()"
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
                            <div class="col-12 lg:col-6 field">
                                <Button icon="pi pi-filter" @click.prevent="searchFilterLocationCommuneByVillage(!v$.$invalid)" class="btn btn-primary h-3rem w-10rem" label="Filters" aria-label="submit" type="submit" :loading="loadingBtnSubmitted"/>
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
                                :loading="loadingDataListLocation"
                                :value="getGeoLocationVillagesData" 
                                v-model:selection="selectedGeoLocation"
                                dataKey="id"
                                :paginator="true" 
                                :rows="10" 
                                filterDisplay="menu"
                                contextMenu
                                v-model:filters="filtersGeoVillageSystem" 
                                :filters="filtersGeoVillageSystem"
                                responsiveLayout="scroll"
                                class="p-datatable-scrollable text-sm"
                                :globalFilterFields="['representative.geo_zip_code', 'geo_khmer_name', 'geo_english_name']"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                :rowsPerPageOptions="[5, 10, 25,50, 100]"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} geo-villages locations">
                                <!-- Header -->
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                        <!-- Filter Date Order -->
                                        <h4 class="m-0">
                                            
                                        </h4>
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filtersGeoVillageSystem['global'].value" :placeholder="$t('route.search')" />
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
                                <Column field="geo_zip_code" header="Zip Code" sortField="geo_zip_code" sortable>
                                        <template #body="{ data }">
                                            {{ data?.geo_zip_code }}
                                        </template>
                                    <!-- Geo-Country Zip Code -->
                                    <template #filter="{ filterModel, filterCallback }">
                                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by zip code" />
                                    </template>
                                </Column>
                                <Column field="geo_khmer_name" header="Khmer Name" sortField="geo_khmer_name" sortable>
                                    <template #body="{ data }">
                                        <span class="font-bold">  {{ data?.geo_khmer_name }}</span>
                                    </template>
                                    <!-- Filter Khmer Name -->
                                    <template #filter="{ filterModel, filterCallback }">
                                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by khmer name" />
                                    </template>
                                </Column>
                                <Column field="geo_english_name" header="Latin Name" sortField="geo_english_name" sortable>
                                    <template #body="{ data }">
                                            <span class="font-bold">{{ data?.geo_english_name }}</span>
                                    </template>
                                    <!-- Filter English Name -->
                                    <template #filter="{ filterModel, filterCallback }">
                                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by english name" />
                                    </template>
                                </Column>
                                <Column field="geo_longitude_location" header="Longitude" sortField="geo_longitude_location" sortable>
                                    <template #body="{ data }">
                                        {{ data?.geo_longitude_location }}
                                    </template>
                                </Column>
                                <Column field="geo_latitude_location" header="Latitude" sortField="geo_latitude_location" sortable>
                                    <template #body="{ data }">
                                        {{ data?.geo_latitude_location }}
                                    </template>
                                </Column>
                                <Column :exportable="false" class="text-md font-medium" :header="$t('route.option')"
                                    style="min-width:8rem">
                                    <template #body="slotProps">
                                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                                            v-permission="[{ functionName: 'location_ms_system_module', moduleName: 'fun_edit' }]"
                                            @click="editGeoLocationGeoVillages(slotProps?.data)" />
                                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                                            v-permission="[{ functionName: 'location_ms_system_module', moduleName: 'fun_deleted' }]"
                                            @click="confirmDeleteVillages(slotProps.data)" />
                                    </template>
                                </Column>
                                </template>
                            </DataTable>
                        </div>
                    </div>
                </el-card>
            </div>
            <!-- Pop Edited villages -->
            <edited-popup-geo-location-villages
                v-if="openEditedVillages"
                :geoLocalVillage="editGeoVillagesPopup"
                @close="closingPopupEditedVillages"
            />
            <!-- Popup Deleted villages -->
            <Dialog v-model:visible="deletedGeoVillagesDialogs" :style="{ width: '450px' }" 
                header="Confirm"
                :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span>Are you sure you want to delete</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deletedGeoVillagesDialogs = false" />
                    <Button label="Yes" icon="pi pi-check" text @click="confirmDeletedGeoVillagesById()" />
                </template>
            </Dialog>

        </div>
    </div>
</template>

<!-- Script of Delivery -->
<script>
    import {mapGetters,mapActions} from "vuex";
    import { FilterMatchMode,FilterOperator } from 'primevue/api';
    import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
    import { useVuelidate } from '@vuelidate/core';
    import { required } from '@vuelidate/validators';
    import EditedPopupGeoLocationVillages from "./pop_up_create_locations/village_of_commune/EditedPopupGeoLocationVillages";
    import geoLocationVillagesHelper from '@/mixin/geoLocationVillagesHelper';
    import util from '@/mixin/util';
    import validation from '@/mixin/validation';

    export default{
        setup() {
          return { v$: useVuelidate() }
        },
        mixins: [util,validation,geoLocationVillagesHelper],
        computed: {
            ...mapGetters('geoVillages', ['getGeoVillageAll']),
            getGeoLocationVillagesData() {
                return this.getGeoVillageAll || []
            },
        },
        data(){
            return {
                deletedGeoVillagesDialogs: false,
                deletedDialogDataVillagesId: null,
                openEditedVillages: false,
                idEditGeoVillages: null,
                editGeoVillagesPopup: null,
                zeroCountryState: 0,
                countryRegion: null,
                submitted: false,
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
                geoLocationStateList: null,
                geoLocationDistrictList: null,
                geoLocationCommuneList: null,
                filtersGeoVillageSystem: {
                    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                    geo_zip_code: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                    geo_khmer_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                    representative: { value: null, matchMode: FilterMatchMode.IN },
                    geo_english_name: {
                        operator: FilterOperator.AND,
                        constraints: [
                            { value: null, matchMode: FilterMatchMode.IN },
                        ],
                    }
                },
                loadingDataListLocation: false,
                loadingBtnSubmitted:false
            }
        },
        created(){
            this.geoLocationServices = new GeoLocationsManagementServices();
        },
        mounted() {
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
        components:{
            EditedPopupGeoLocationVillages
        }, 
        methods: {
            ...mapActions('geoVillages', ['getAllVillagesActions']),
            closingPopupEditedVillages(){
                this.openEditedVillages = false;
            },
            editGeoLocationGeoVillages(villages){
                this.openEditedVillages = true;
                this.idEditGeoVillages = parseInt(villages?.id) ? parseInt(villages?.id) : 0;
                this.editGeoVillagesPopup = villages ? villages : [];
            },
            confirmDeleteVillages(del){
                this.deletedGeoVillagesDialogs = true;
                this.deletedDialogDataVillagesId = del;
            },
            confirmDeletedGeoVillagesById(){
                this.deletingGeoVillageLocationsById(this.deletedDialogDataVillagesId);
            },
            // Selected Dropdown menu 
            async selectedProvinceStateFilter(country){
                try {
                  if(!Array.isArray(country) || country?.geo_ssn_location !== undefined || country?.geo_ssn_location !== null){
                        const ssnSuperProvinceCodeLocationGeo = this.selectedCountryOpt?.geo_ssn_location ? this.selectedCountryOpt?.geo_ssn_location : '';
                        const geoLocationProvinceType = "T2";
                        this.getGeoLocationStateByCountry(geoLocationProvinceType,ssnSuperProvinceCodeLocationGeo);
                  }
                } catch (error) {
                    return Promise.reject(error);
                }
            },
            async selectedCommuneByDistrictFilter(district){
                try {
                  if(!Array.isArray(district) || district?.geo_ssn_location !== undefined || district?.geo_ssn_location !== null){
                        const ssnSuperDistrictCodeLocationGeo = this.selectStateProvinceOpt?.geo_ssn_location ? this.selectStateProvinceOpt?.geo_ssn_location : '';
                        const geoLocationDistrictType = "T3";
                        this.getGeoLocationDistrictByCountry(geoLocationDistrictType,ssnSuperDistrictCodeLocationGeo);
                  }
                } catch (error) {
                    return Promise.reject(error);
                }
            },
            async selectedCommuneByFilter(commune){
                try {
                  if(!Array.isArray(commune) || commune?.geo_ssn_location !== undefined || commune?.geo_ssn_location !== null){
                        const ssnSuperCommuneCodeLocationGeo = this.selectSDistrictOpt?.geo_ssn_location ? this.selectSDistrictOpt?.geo_ssn_location : '';
                        const geoLocationCommuneType = "T4";
                        this.getGeoLocationCommuneCapitalByCountry(geoLocationCommuneType,ssnSuperCommuneCodeLocationGeo);
                  }
                } catch (error) {
                    return Promise.reject(error);
                }
            },
            getGeoLocationCountry(){
                try{
                    const countryZipTypeCountry = 'T1';
                    const superSSNCountryCode = "";
                    this.geoLocationServices.listGeoLocationCountryByZip(countryZipTypeCountry, superSSNCountryCode).then((country) => {
                        if (!country) {
                            this.listOptCountry = [];
                        }
                        this.listOptCountry = Array.isArray(country) ? country.slice() : [];
                    }).catch((error) => {
                        return Promise.reject(error.message || []);
                    }); 
                }catch(error){
                    return Promise.reject(error.message || []);
                }
            },
            getGeoLocationStateByCountry(provinceStateCode,superSSNStateCode){
                try{
                    this.geoLocationServices.listGeoLocationProvinceState(provinceStateCode, superSSNStateCode).then((province) => {
                        if (!province) {
                            this.listOptProvince = [];
                        }
                        this.listOptProvince = Array.isArray(province) ? province.slice() : [];
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
            /**
             *  @List village by commune of district
                @Search Filter Commune By Village
            * */   
            async searchFilterLocationCommuneByVillage(validForm){
                try{
                    this.submitted = true;
                    // Validation Search and Filter Location village by commune
                
                    this.loadingBtnSubmitted = true;
                    this.loadingDataListLocation = true;
                    const validation = await this.v$.$validate();
                    setTimeout(() => {
                        this.loadingBtnSubmitted = false;
                        this.loadingDataListLocation = false;
                        if(validation === false){
                            const errorValidation = this.v$.$errors;
                            this.$notify({
                                title: 'Please selected for filters',
                                message: errorValidation[0]?.$message ? errorValidation[0]?.$message : '' ,
                                showClose: false,
                                type: 'error'
                            });
                        }else{
                            if(!this.selectedCountryOpt  !== ''
                            && this.selectStateProvinceOpt !== null || this.selectSDistrictOpt  !== null
                            ){
                                const villageTypeCode = "T5";
                                const superSSNCodeDistrictSelect =  this.selectSDCommuneCityOpt?.geo_ssn_location ? this.selectSDCommuneCityOpt?.geo_ssn_location : '';
                                this.geoLocationCommuneVillageList(villageTypeCode,superSSNCodeDistrictSelect); 
                            }
                           
                        }
                    }, 1000);
                    this.v$.$touch();
                    if (!validForm) {    
                        return;
                    }
                }catch(error){
                    return false;   
                }
            },
            geoLocationCommuneVillageList(villageType,superSSNCityCode){
                try{         
                    this.geoLocationServices.listGeoLocationVillageCommune(villageType,superSSNCityCode).then((location) => {
                            if (!location) {
                                this.geoLocationListArray = [];
                            }
                            //Villages
                            this.getAllVillagesActions(superSSNCityCode);
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