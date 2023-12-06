<template>
    <form @submit.prevent="submittedDialogEditGeoLocalCountry">
        <!-- Spinner -->
        <transition
            name="fade"
            mode="out-in"
            >
            <div
                class="spinner-wrapper flex layer-white"
                v-if="loadingSpinner"
            >
                <spinner
                :radius="100"
                />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="geoLocationCountryData"
            :title="`Edit Country:`+ ' '+ nameCountry"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto"
        >
            <!-- Contents -->
            <template
                v-slot:content
            >
                <div class="flex start mlr--5"
                    :class="{invalid: !geoLocationCountryData?.geo_zip_code && hasAddressErrors}"
                >
                    <div 
                        class="input-wrap mlr-5"
                        :class="{invalid: !geoLocationCountryData?.geo_zip_code && hasAddressErrors}"
                    >
                        <label
                            :class="{
                                'p-error': !geoLocationCountryData.geo_zip_code && hasAddressErrors
                            }"
                        >
                            Zip Code
                            <span class="p-error">*</span>
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
                        <InputText oninput="this.value = this.value.replace(/\D+/g, '')" class="border-round-lg text-sm w-15rem" v-model.number="geoLocationCountryData.geo_zip_code" type="text" placeholder="Zip Code" />
                        <span
                            class="error"
                            v-if="!geoLocationCountryData.geo_zip_code && hasAddressErrors"
                        >
                            {{ $t('addressPopup.isRequired', {type: 'Zip Code'}) }}
                        </span>
                    </div>
                    <div 
                        class="input-wrap mlr-5"
                        :class="{invalid: !geoLocationCountryData?.geo_khmer_name && hasAddressErrors}"
                    >
                        <label
                            :class="{
                                'p-error': !geoLocationCountryData.geo_khmer_name && hasAddressErrors
                            }"
                        >
                            Khmer Name
                            <span class="p-error">*</span>
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
                        <InputText class="border-round-lg text-sm w-15rem" type="text" v-model.trim="geoLocationCountryData.geo_khmer_name" placeholder="Khmer Name" />
                        <span
                            class="error"
                            v-if="!geoLocationCountryData.geo_khmer_name && hasAddressErrors"
                        >
                            {{ $t('addressPopup.isRequired', {type: 'Khmer Name'}) }}
                        </span>
                    </div>
                    <div 
                        class="input-wrap mlr-5"
                        :class="{invalid: !geoLocationCountryData?.geo_english_name && hasAddressErrors}"
                    >
                        <label
                            :class="{
                                'p-error': !geoLocationCountryData.geo_english_name && hasAddressErrors
                            }"
                        >
                            English Name
                            <span class="p-error">*</span>
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
                        <InputText class="border-round-lg text-sm w-15rem" v-model.trim="geoLocationCountryData.geo_english_name" type="text" placeholder="English Name" />
                        <span
                            class="error"
                            v-if="!geoLocationCountryData.geo_english_name && hasAddressErrors"
                        >
                            {{ $t('addressPopup.isRequired', {type: 'English Name'}) }}
                        </span>
                    </div>
                </div>
                <div class="flex start mlr--5">
                    <div 
                        class="input-wrap mlr-5"
                        :class="{invalid: !geoLocationCountryData?.geo_longitude_location && hasAddressErrors}"
                    >
                        <label
                            :class="{
                                'p-error': !geoLocationCountryData.geo_longitude_location && hasAddressErrors
                            }"
                        >
                            Longitude
                            <span class="p-error">*</span>
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
                        <InputText class="border-round-lg text-sm w-15rem" type="text" v-model="geoLocationCountryData.geo_longitude_location" placeholder="Longitude" />
                        <span
                            class="error"
                            v-if="!geoLocationCountryData.geo_longitude_location && hasAddressErrors"
                        >
                            {{ $t('addressPopup.isRequired', {type: 'Longitude'}) }}
                        </span>
                    </div>
                    <div 
                        class="input-wrap mlr-5"
                        :class="{invalid: !geoLocationCountryData?.geo_latitude_location && hasAddressErrors}"
                    >
                        <label
                            :class="{
                                'p-error': !geoLocationCountryData.geo_latitude_location && hasAddressErrors
                            }"
                        >
                            Latitude
                            <span class="p-error">*</span>
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
                        <InputText class="border-round-lg text-sm w-15rem" v-model="geoLocationCountryData.geo_latitude_location" type="text" placeholder="Latitude" />
                        <span
                            class="error"
                            v-if="!geoLocationCountryData.geo_latitude_location && hasAddressErrors"
                        >
                            {{ $t('addressPopup.isRequired', {type: 'Longitude'}) }}
                        </span>
                    </div>
                </div>
            </template>
            <!-- Footer -->
            <template v-slot:pop-footer>
                <div class="flex j-end gap-10">
                    <button
                        class="outline-btn plr-30 plr-sm-15 border-round"
                        aria-label="Country cancel"
                        @click.prevent="$emit('close')"
                    >
                        {{ $t('addressPopup.cancel') }}
                    </button>
                    <ajax-button
                        class="primary-btn  plr-30 plr-sm-15"
                        :fetching-data="submittingCountryData"
                        :loading-text="$t('addressPopup.saving')"
                        :text=" $t('addressPopup.thisCountry', {type: editing > 0 ? $t('addressPopup.update') : $t('addressPopup.save')})"
                    />
                </div>
            </template>
        </pop-over>
    </form>
</template>

<!-- Script of JS -->
<script>
    import Spinner from "@/components/ui_component_new_frontend/Spinner";
    import PopOver from '@/components/ui_component_new_frontend/PopOver';
    import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton"
    import util from '@/mixin/util';
    import validation from '@/mixin/validation';
    import geoLocationCountryHelper from '@/mixin/geoLocationCountryHelper';
    import {mapActions} from 'vuex';
    
    export default{
        data(){
            return{
                editionGeoCountry: null,
                hasAddressErrors: false,
                geoLocationCountryData: null,
                submittingCountryData: false
            }
        },
        props: {
            idEditGeoCountry: {
                type: Number,
                default() {
                    return null
                }
            },
            geoLocalCountry: {
                type: Object,
                default(){
                    return null;
                }
            },
            openDialogCountryId: {
                type: Boolean,
                default() {
                    return null
                }
            }
        },
        computed: {
            nameCountry(){
               return this.geoLocalCountry?.geo_english_name || ''; 
            },
            editing() {
                return this.geoLocalCountry && this.geoLocalCountry?.id;
            },
        },
        components: {
            PopOver,
            Spinner,
            AjaxButton
        },
        mixins: [util,validation,geoLocationCountryHelper],
        async mounted(){
            if(this.geoLocalCountry){
                this.geoLocationCountryData = {...this.geoLocationCountryData, ...this.geoLocalCountry}
            }else{
                this.geoLocationCountryData = {
                    id: '',
                    geo_zip_code:'',
                    geo_khmer_name: '',
                    geo_english_name: '',
                    geo_latitude_location: '',
                    geo_longitude_location: ''
                }
            } 
        },
        methods: {
           async submittedDialogEditGeoLocalCountry(){
                try {
                    await this.geoLocationCountryActions();
                   
                    if (!this.hasAddressErrors) {
                        this.$emit('close')
                    }
                } catch (error) {
                    return Promise.reject(error);   
                }
            },
            ...mapActions('common', ['fetchLocation', 'setToastMessage', 'setToastError', 'getRequest']),
        }
    }
</script>