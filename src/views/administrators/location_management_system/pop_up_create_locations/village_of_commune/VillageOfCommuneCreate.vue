<template>
    <div class="col-12 field"> 
        <!-- Add More village -->
        <div class="dply-felx flex justify-content-between mtb-20 mtb-sm-15 oflow-hidden">
            <button @click.prevent="addMoreVillageCommune()" v-permission="[{ functionName: 'location_ms_system_module', moduleName: 'fun_create' }]" class="ajax-btn primary-btn outline-btn plr-20 mtb-5 border-round">
                <span>
                    Add new village
                    <i class="pi pi-plus-circle"></i> 
                </span>
            </button>
            <!-- List Commune by Villages -->
            <ListVillageByCommune
                :geoLocalVillage="villageCommuneId"
            />
        </div>
        <!-- Form -->
        <div>
            <!-- Submitted -->
            <div 
                v-for="(village, index) in state?.moreVillageCommune" 
                :key="index"
                :set="v.moreVillageCommune.$each[index]"
                class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
            >
                <div class="dply-felx flex justify-content-between mtb-20 mtb-sm-15 oflow-hidden">
                    <h6 class="font-bold text-sm mb-3 plr-20 mtb-5">Village of <span class="font-bold text-red-500">{{ nameGeoVillage ? nameGeoVillage : '' }}</span> - {{ index + 1 }}</h6>
                    <!-- Button Actions -->
                    <div class="flex gap-3 pr-4">
                        <button 
                            class="ajax-btn outline-btn plr-20 border-round"
                            @click.prevent="addMoreVillageCommune()"
                            v-show="index != 0"
                        >
                            <span>Add More</span>
                        </button>
                        <button 
                            class="ajax-btn outline-btn plr-20 border-round" 
                            @click.prevent="removeIndexCommuneVillages(index)"
                            v-show="index != 0"
                        >
                            <span>Remove</span>
                        </button>
                    </div>
                </div> 
                <div class="pop-over-content p-20 p-sm-15 card">
                    <div class="flex gap-15">
                        <!-- Code -->
                        <div class="input-wrap flex-1">
                            <label
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateCodeVillage.length && submitted }"
                            >
                                Zip Code
                                <span class="p-error">*</span>
                                <!-- Tool tip -->
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="សូមចម្លងឬវាយបញ្ចូលនាមជាលេខកូដ ចេញពីបញ្ចីរាយនាមភូមសាស្រ្តនៃព្រះរាជាណាចក្រកម្ពុជា"
                                    placement="top-start"
                                >
                                    <span class="input-label-secondary cursor-pointer pl-2">
                                        <i class="pi pi-question-circle" style="font-size: 1rem"></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText 
                                :id="village"
                                v-model.trim="village.stateCodeVillage"
                                oninput="this.value = this.value.replace(/\D+/g, '')"
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateCodeVillage.length && submitted }"
                                class="border-round-lg text-sm" type="text" placeholder="Code"
                            />
                            <small v-if="(v.moreVillageCommune.$each.$response.$data[index].stateCodeVillage.$invalid && submitted)" class="p-error text-sm">
                                {{ v.moreVillageCommune.$each.$response.$errors[index].stateCodeVillage[0].$message.replace('Value', 'Zip Code') }}
                            </small>
                        </div>
                        <!-- Khmer Name -->
                        <div class="input-wrap flex-1">
                            <label
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateKhmerNameVillage.length && submitted }"
                            >
                                Khmer Name
                                <span class="p-error">*</span>
                                <!-- Tool tip -->
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="សូមចម្លងឬវាយបញ្ចូលនាមជាភាសាខ្មែរ ចេញពីបញ្ចីរាយនាមភូមសាស្រ្តនៃព្រះរាជាណាចក្រកម្ពុជា"
                                    placement="top-start"
                                >
                                    <span class="input-label-secondary cursor-pointer pl-2">
                                        <i class="pi pi-question-circle" style="font-size: 1rem"></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText 
                                :id="village"
                                v-model.trim="village.stateKhmerNameVillage"
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateKhmerNameVillage.length && submitted }"
                                class="border-round-lg text-sm" type="text" placeholder="Khmer Name"
                            />
                            <small v-if="(v.moreVillageCommune.$each.$response.$data[index].stateKhmerNameVillage.$invalid && submitted)" class="p-error text-sm">
                                {{ v.moreVillageCommune.$each.$response.$errors[index].stateKhmerNameVillage[0].$message.replace('Value', 'Khmer Name') }}
                            </small>
                        </div>
                        <!-- English Name -->
                        <div class="input-wrap flex-1">
                            <label
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateEnglishNameVillage.length && submitted }"
                            >
                                English Name
                                <span class="p-error">*</span>
                                <!-- Tool tip -->
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="សូមចម្លងឬវាយបញ្ចូលនាមជាអក្សរឡាតាំង ចេញពីបញ្ចីរាយនាមភូមសាស្រ្តនៃព្រះរាជាណាចក្រកម្ពុជា"
                                    placement="top-start"
                                >
                                    <span class="input-label-secondary cursor-pointer pl-2">
                                        <i class="pi pi-question-circle" style="font-size: 1rem"></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText 
                                v-model.trim="village.stateEnglishNameVillage"
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateEnglishNameVillage.length && submitted }"
                                class="border-round-lg text-sm" type="text" placeholder="English Name"
                            />
                            <small v-if="(v.moreVillageCommune.$each.$response.$data[index].stateEnglishNameVillage.$invalid && submitted)" class="p-error text-sm">
                                {{ v.moreVillageCommune.$each.$response.$errors[index].stateEnglishNameVillage[0].$message.replace('Value', 'English Name') }}
                            </small>
                        </div>
                    </div>
                    <div class="flex block-xxs gap-15">
                        <!-- Longitude -->
                        <div class="input-wrap flex-1">
                            <label
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateLongitudeVillage.length && submitted }"
                            >
                                Longitude
                                <span class="p-error">*</span>
                                <!-- Tool tip -->
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="សូមចម្លងរយៈបណ្តោយចេញពីបញ្ចីរាយនាមភូមសាស្រ្តនៃព្រះរាជាណាចក្រកម្ពុជា ហើយវាយបញ្ចូលនៅទីនេះ"
                                    placement="top-start"
                                >
                                    <span class="input-label-secondary cursor-pointer pl-2">
                                        <i class="pi pi-question-circle" style="font-size: 1rem"></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText 
                                v-model="village.stateLongitudeVillage"
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateLongitudeVillage.length && submitted }"
                                class="border-round-lg text-sm" type="text" placeholder="Longitude"
                            />
                            <small v-if="(v.moreVillageCommune.$each.$response.$data[index].stateLongitudeVillage.$invalid && submitted)" class="p-error text-sm">
                                {{ v.moreVillageCommune.$each.$response.$errors[index].stateLongitudeVillage[0].$message.replace('Value', 'Longitude') }}
                            </small>
                        </div>
                        <!-- Longitude -->
                        <div class="input-wrap flex-1">
                            <label
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateLatitudeVillage.length && submitted }"
                            >
                                Latitude
                                <span class="p-error">*</span>
                                <!-- Tool tip -->
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="សូមចម្លងរយៈទទឹងចេញពីបញ្ចីរាយនាមភូមសាស្រ្តនៃព្រះរាជាណាចក្រកម្ពុជា ហើយវាយបញ្ចូលនៅទីនេះ"
                                    placement="top-start"
                                >
                                    <span class="input-label-secondary cursor-pointer pl-2">
                                        <i class="pi pi-question-circle" style="font-size: 1rem"></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText 
                                v-model="village.stateLatitudeVillage"
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateLatitudeVillage.length && submitted }"
                                class="border-round-lg text-sm" type="text" placeholder="Latitude"
                            />
                            <small v-if="(v.moreVillageCommune.$each.$response.$data[index].stateLatitudeVillage.$invalid && submitted)" class="p-error text-sm">
                                {{ v.moreVillageCommune.$each.$response.$errors[index].stateLatitudeVillage[0].$message.replace('Value', 'Latitude') }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Add Village -->
            <div class="gap-15">
                <div class="col-12 flex justify-content-end mt-4"> 
                    <!--Buttons Submit-->
                    <Button 
                        icon="pi pi-check" 
                        class="p-button-lg btn btn-primary w-10rem h-4rem"
                        type="submit"
                        label="Save"
                        @click.prevent="submitFormVillageCommune()"
                        :loading="loadingVillageSubmitted"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Script of Village -->
<script>
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import { useVuelidate } from '@vuelidate/core';
import {required,helpers } from '@vuelidate/validators';
import {reactive} from "vue";
import ListVillageByCommune from "./ListVillageByCommune";

export default {
    created(){
        this.geoLocationServices = new GeoLocationsManagementServices();
    },
    components: {
        ListVillageByCommune
    },
    props: {
        villageCommuneId: {
            type: String,
            default() {
                return null
            }
        }
    },
    computed: {
        nameGeoVillage(){
            return this.villageCommuneId?.geo_english_name || ''; 
        },
        geoVillageCommuneSSNLocation() {
            return this.villageCommuneId?.geo_ssn_location && this.villageCommuneId?.geo_ssn_location;
        }
    },
    setup() {
        const rules = {
            moreVillageCommune: {
                $each: helpers.forEach({
                    stateCodeVillage: {
                        required
                    },
                    stateKhmerNameVillage: {
                        required
                    },
                    stateEnglishNameVillage: {
                        required
                    },
                    stateLatinNameVillage: {
                        required
                    },
                    stateLongitudeVillage: {
                        required
                    },
                    stateLatitudeVillage: {
                        required
                    }
                })
            }
        }
        const state = reactive({
            moreVillageCommune: [
                { 
                    stateCodeVillage: '',
                    stateEnglishNameVillage: '',
                    stateKhmerNameVillage: '',
                    stateLatinNameVillage: '',
                    stateLongitudeVillage: '',
                    stateLatitudeVillage: ''
                }, 
            ]
        })
        const v = useVuelidate(rules, state)
        return { v, state }
    },
    data() {
        return {
            submitted: false,
            loadingVillageSubmitted: false,
            moreVillageCommune:[
                {
                    stateCodeVillage: '',
                    stateEnglishNameVillage: '',
                    stateKhmerNameVillage: '',
                    stateLatinNameVillage: '',
                    stateLongitudeVillage: '',
                    stateLatitudeVillage: ''
                }
            ]
        };
    },
    methods: {
        addMoreVillageCommune(){
            this.state.moreVillageCommune.push({
                stateCodeVillage: '',
                stateEnglishNameVillage: '',
                stateKhmerNameVillage: '',
                stateLatinNameVillage: '',
                stateLongitudeVillage: '',
                stateLatitudeVillage: ''
            });
        },
        removeIndexCommuneVillages(index){
            this.state.moreVillageCommune.splice(index, 1);
        },
        submitFormVillageCommune(){
            this.submitted = true;
            this.loadingVillageSubmitted = true;
            // display form values on success
            let arrayCommuneVillageObj = [];
            const arrayCommuneVillage = this.state?.moreVillageCommune ? this.state?.moreVillageCommune : [];
            for (let index = 0; index < arrayCommuneVillage.length; index++) {
                let obj = {};
                const countryIndex = arrayCommuneVillage[index];
                obj.geoSuperSSNCommune = this.geoVillageCommuneSSNLocation ? this.geoVillageCommuneSSNLocation : null;
                obj.addNewGeoCountryVillageZipCode = countryIndex?.stateCodeVillage;
                obj.addNewGeoCountryVillageKhmerName = countryIndex?.stateKhmerNameVillage;
                obj.addNewGeoCountryVillageEnglishName = countryIndex?.stateEnglishNameVillage;
                obj.addNewGeoCountryVillageLongitude  = countryIndex?.stateLongitudeVillage;
                obj.addNewGeoCountryVillageLatitude = countryIndex?.stateLatitudeVillage;
                obj.geoCountryVillageCodeType = "T5";
                obj.geoCountryVillageType = "village";

                arrayCommuneVillageObj.push(obj);
            }
            const villageCommuneAddNewDetail = {
                geoVillageCapitalDetail: arrayCommuneVillageObj ? arrayCommuneVillageObj : []
            }
            setTimeout(() => {
                this.geoLocationServices.createVillageGeoLocation(villageCommuneAddNewDetail)
                    .then(async (response) => { 
                        if (response.data?.success === true) {
                            this.submitted = false;
                            this.errorValidateFile = [];
                            this.loadingVillageSubmitted = true;

                            this.$notify.success({
                                title: 'Successful create geo-location village by commune',
                                message: response.data?.message ? response.data?.message : '' ,
                                showClose: false
                            });
                            // Reload Commune Locations
                            this.state.moreVillageCommune = [{
                                stateCodeVillage: '',
                                stateEnglishNameVillage: '',
                                stateKhmerNameVillage: '',
                                stateLatinNameVillage: '',
                                stateLongitudeVillage: '',
                                stateLatitudeVillage: ''
                            }];
                            this.openDialogGeoLocationDistrict = false;
                            await this.fetchingDataGeoCommuneLocation();
                        }
                }).catch(error => {
                    this.loadingVillageSubmitted = false;
                    this.$notify.error({
                        title: 'Unsuccessfully create geo-location village by commune',
                        message: error.response.data.error?.message ?? 'Unsuccessfully create geo-location village by commune',
                        showClose: false
                    });  
                    if(error.response.data.error.error?.errors){
                        for (let index = 0; index < error.response.data.error.error?.errors.length; index++) {
                            const messageValidation = error.response.data.error.error?.errors[index].message ?? '';
                            this.$notify.error({
                                title: 'Unsuccessfully create geo-location commune',
                                message: messageValidation ?? 'Unsuccessfully create geo-location village by commune',
                                showClose: true
                            });   
                        }
                    } 
                });
            }, 1000);
            
            // stop here if form is invalid
            if (this.v.$invalid) {
                return;
            }
            this.v.$touch();
        }
    },
};
</script>
<!-- Styles -->
<style scoped>
</style>
<style lang='scss' scoped>
</style>