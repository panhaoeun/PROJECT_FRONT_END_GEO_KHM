<template>
    <div class="col-12 field"> 
            <!-- Add More village -->
        <div class="dply-felx flex justify-content-between mtb-20 mtb-sm-15 oflow-hidden">
                <button @click.prevent="addMoreVillageCommune()" class="ajax-btn primary-btn outline-btn plr-20 mtb-5 border-round">
                    <span>Add new village</span>
                </button>
        </div>
        <!-- Form -->
        <div>
            <!-- Submitted -->
            <div 
                v-for="(village, index) in state.moreVillageCommune" 
                :key="index"
                :set="v.moreVillageCommune.$each[index]"
                class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
            >
                <div class="dply-felx flex justify-content-between mtb-20 mtb-sm-15 oflow-hidden">
                    <h6 class="font-bold text-sm mb-3 plr-20 mtb-5">Village of Kandal - {{ index + 1 }}</h6>
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
                                Code
                                <span class="p-error">*</span>
                                <!-- Tool tip -->
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="សូមចម្លងឬវាយចម្លងនាមជាលេខកូដ ចេញពីបញ្ចីរាយនាមភូមសាស្រ្តនៃព្រះរាជាណាចក្រកម្ពុជា"
                                    placement="top-start"
                                >
                                    <span class="input-label-secondary cursor-pointer pl-2">
                                        <i class="pi pi-question-circle" style="font-size: 1rem"></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText 
                                :id="village"
                                v-model="village.stateCodeVillage"
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateCodeVillage.length && submitted }"
                                class="border-round-lg text-sm" type="text" placeholder="Code"
                            />
                            <small v-if="(v.moreVillageCommune.$each.$response.$data[index].stateCodeVillage.$invalid && submitted)" class="p-error text-sm">
                                {{ v.moreVillageCommune.$each.$response.$errors[index].stateCodeVillage[0].$message.replace('Value', 'Code') }}
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
                                    content="សូមចម្លងឬវាយចម្លងនាមជាភាសាខ្មែរ ចេញពីបញ្ចីរាយនាមភូមសាស្រ្តនៃព្រះរាជាណាចក្រកម្ពុជា"
                                    placement="top-start"
                                >
                                    <span class="input-label-secondary cursor-pointer pl-2">
                                        <i class="pi pi-question-circle" style="font-size: 1rem"></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText 
                                :id="village"
                                v-model="village.stateKhmerNameVillage"
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateKhmerNameVillage.length && submitted }"
                                class="border-round-lg text-sm" type="text" placeholder="Khmer Name"
                            />
                            <small v-if="(v.moreVillageCommune.$each.$response.$data[index].stateKhmerNameVillage.$invalid && submitted)" class="p-error text-sm">
                                {{ v.moreVillageCommune.$each.$response.$errors[index].stateKhmerNameVillage[0].$message.replace('Value', 'Khmer Name') }}
                            </small>
                        </div>
                        <!-- English Name -->
                        <div class="input-wrap flex-1">
                            <label>
                                English Name
                                <span class="p-error">*</span>
                                <!-- Tool tip -->
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="សូមចម្លងឬវាយចម្លងនាមជាអក្សរឡាតាំង ចេញពីបញ្ចីរាយនាមភូមសាស្រ្តនៃព្រះរាជាណាចក្រកម្ពុជា"
                                    placement="top-start"
                                >
                                    <span class="input-label-secondary cursor-pointer pl-2">
                                        <i class="pi pi-question-circle" style="font-size: 1rem"></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText 
                                v-model="village.stateLatinNameVillage"
                                :class="{ 'p-invalid border-round-lg border-round-lg p-error': v.moreVillageCommune.$each.$response.$errors[index].stateLatinNameVillage.length && submitted }"
                                class="border-round-lg text-sm" type="text" placeholder="English Name"
                            />
                            <small v-if="(v.moreVillageCommune.$each.$response.$data[index].stateLatinNameVillage.$invalid && submitted)" class="p-error text-sm">
                                {{ v.moreVillageCommune.$each.$response.$errors[index].stateLatinNameVillage[0].$message.replace('Value', 'Code') }}
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
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<!-- Script of Village -->
<script>
import { useVuelidate } from '@vuelidate/core';
import {required,helpers } from '@vuelidate/validators';
import {reactive} from "vue";
export default {
    components: {},
    props: {},
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
            moreVillageCommune:[
                {
                    stateCodeVillage: '',
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
            this.v.$touch();
            // stop here if form is invalid
            if (this.v.$invalid) return;
            // display form values on success
            console.log(this.$data.moreVillageCommune)
        }
    },
};
</script>
<!-- Styles -->
<style scoped>
</style>
<style lang='scss' scoped>
</style>