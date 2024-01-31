<template>
    <div class="pl-2 gap-2 flex align-items-center justify-content-center">
        <Toast />
        <!-- View all geo location-province -->
        <GeoLocationOfDistrictListPopup />
        <button
            class="ajax-btn primary-btn outline-btn plr-20 mtb-5 border-round"
            icon="pi pi-plus"
            type="button"
            label="New"
            aria-label="New"
            @click.prevent="popUpCreateProvinceState()"
        >
            <span>
                Add
                <i class="pi pi-plus-circle"></i>
            </span>
        </button>
    </div>
    <!-- Popup Create District-->
    <Dialog
        v-model:visible="openDialogGeoLocationDistrict"
        header="Create District"
        :style="{ width: '75vw' }"
        maximizable
        modal
        :contentStyle="{ height: '600px' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :draggable="false"
    >
        <!-- Add More Item -->
        <div
            class="dply-felx flex justify-content-between mtb-20 mtb-sm-15 oflow-hidden"
        >
            <button
                @click.prevent="addMoreProvinceState()"
                class="ajax-btn primary-btn outline-btn plr-20 mtb-5 border-round"
            >
                <span>Add new district</span>
            </button>
        </div>
        <div
            v-for="(state, index) in state.moreProvinceState"
            :key="index"
            :set="v.moreProvinceState.$each[index]"
        >
            <div class="flex justify-content-between flex-wrap">
                <button class="ajax-btn outline-btn plr-20 mtb-5 border-round">
                    District -
                    <span class="font-bold pl-1">{{ index + 1 }}</span>
                </button>
                <!-- Button Actions -->
                <div class="flex gap-3">
                    <button
                        class="ajax-btn outline-btn plr-20 mtb-5 border-round"
                        v-show="index != 0"
                        @click.prevent="popUpCreateProvinceState()"
                    >
                        <span>Add More</span>
                    </button>
                    <button
                        class="ajax-btn outline-btn plr-20 mtb-5 border-round"
                        @click.prevent="removeIndexProvinceState(index)"
                        v-show="index != 0"
                    >
                        <span>Remove</span>
                    </button>
                </div>
            </div>
            <div
                class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
            >
                <div class="pop-over-content p-20 p-sm-15 card">
                    <div class="flex gap-15">
                        <!-- Code -->
                        <div class="input-wrap flex-1">
                            <label
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v.moreProvinceState.$each.$response
                                            .$errors[index].stateCode.length &&
                                        submitted,
                                }"
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
                                    <span
                                        class="input-label-secondary cursor-pointer pl-2"
                                    >
                                        <i
                                            class="pi pi-question-circle"
                                            style="font-size: 1rem"
                                        ></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText
                                :id="state"
                                v-model="state.stateCode"
                                class="border-round-lg text-sm"
                                type="text"
                                placeholder="Zip Code"
                                oninput="this.value = this.value.replace(/\D+/g, '')"
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v.moreProvinceState.$each.$response
                                            .$errors[index].stateCode.length &&
                                        submitted,
                                }"
                            />
                            <small
                                v-if="
                                    v.moreProvinceState.$each.$response.$data[
                                        index
                                    ].stateCode.$invalid && submitted
                                "
                                class="p-error text-sm"
                            >
                                {{
                                    v.moreProvinceState.$each.$response.$errors[
                                        index
                                    ].stateCode[0].$message.replace(
                                        "Value",
                                        "Zip Code"
                                    )
                                }}
                            </small>
                        </div>
                        <!-- Khmer Name -->
                        <div class="input-wrap flex-1">
                            <label
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v.moreProvinceState.$each.$response
                                            .$errors[index].stateKhmerName
                                            .length && submitted,
                                }"
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
                                    <span
                                        class="input-label-secondary cursor-pointer pl-2"
                                    >
                                        <i
                                            class="pi pi-question-circle"
                                            style="font-size: 1rem"
                                        ></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText
                                v-model="state.stateKhmerName"
                                class="border-round-lg text-sm"
                                type="text"
                                placeholder="Name in khmer"
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v.moreProvinceState.$each.$response
                                            .$errors[index].stateKhmerName
                                            .length && submitted,
                                }"
                            />
                            <small
                                v-if="
                                    v.moreProvinceState.$each.$response.$data[
                                        index
                                    ].stateKhmerName.$invalid && submitted
                                "
                                class="p-error text-sm"
                            >
                                {{
                                    v.moreProvinceState.$each.$response.$errors[
                                        index
                                    ].stateKhmerName[0].$message.replace(
                                        "Value",
                                        "Khmer Name"
                                    )
                                }}
                            </small>
                        </div>
                        <!-- English Name -->
                        <div class="input-wrap flex-1">
                            <label
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v.moreProvinceState.$each.$response
                                            .$errors[index].stateLatinName
                                            .length && submitted,
                                }"
                            >
                                English Name
                                <span class="p-error">*</span>
                                <!-- Tool tip -->
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="សូមចម្លងឬវាយចម្លងនាមជាអក្សរឡាតាំង ចេញពីបញ្ចីរាយនាមភូមសាស្រ្តនៃព្រះរាជាណាចក្រកម្ពុជា"
                                    placement="top-start"
                                >
                                    <span
                                        class="input-label-secondary cursor-pointer pl-2"
                                    >
                                        <i
                                            class="pi pi-question-circle"
                                            style="font-size: 1rem"
                                        ></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText
                                v-model="state.stateLatinName"
                                class="border-round-lg text-sm"
                                type="text"
                                placeholder="Name in english"
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v.moreProvinceState.$each.$response
                                            .$errors[index].stateLatinName
                                            .length && submitted,
                                }"
                            />
                            <small
                                v-if="
                                    v.moreProvinceState.$each.$response.$data[
                                        index
                                    ].stateLatinName.$invalid && submitted
                                "
                                class="p-error text-sm"
                            >
                                {{
                                    v.moreProvinceState.$each.$response.$errors[
                                        index
                                    ].stateLatinName[0].$message.replace(
                                        "Value",
                                        "English Name"
                                    )
                                }}
                            </small>
                        </div>
                    </div>
                    <div class="flex block-xxs gap-15">
                        <!-- Longitude -->
                        <div class="input-wrap flex-1">
                            <label
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v.moreProvinceState.$each.$response
                                            .$errors[index].stateLongitude
                                            .length && submitted,
                                }"
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
                                    <span
                                        class="input-label-secondary cursor-pointer pl-2"
                                    >
                                        <i
                                            class="pi pi-question-circle"
                                            style="font-size: 1rem"
                                        ></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText
                                v-model="state.stateLongitude"
                                class="border-round-lg text-sm"
                                type="text"
                                placeholder="Longitude"
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v.moreProvinceState.$each.$response
                                            .$errors[index].stateLongitude
                                            .length && submitted,
                                }"
                            />
                            <small
                                v-if="
                                    v.moreProvinceState.$each.$response.$data[
                                        index
                                    ].stateLongitude.$invalid && submitted
                                "
                                class="p-error text-sm"
                            >
                                {{
                                    v.moreProvinceState.$each.$response.$errors[
                                        index
                                    ].stateLongitude[0].$message.replace(
                                        "Value",
                                        "Longitude"
                                    )
                                }}
                            </small>
                        </div>
                        <!-- Latitude -->
                        <div class="input-wrap flex-1">
                            <label
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v.moreProvinceState.$each.$response
                                            .$errors[index].stateLatitude
                                            .length && submitted,
                                }"
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
                                    <span
                                        class="input-label-secondary cursor-pointer pl-2"
                                    >
                                        <i
                                            class="pi pi-question-circle"
                                            style="font-size: 1rem"
                                        ></i>
                                    </span>
                                </el-tooltip>
                            </label>
                            <InputText
                                v-model="state.stateLatitude"
                                class="border-round-lg text-sm"
                                type="text"
                                placeholder="Latitude"
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v.moreProvinceState.$each.$response
                                            .$errors[index].stateLatitude
                                            .length && submitted,
                                }"
                            />
                            <small
                                v-if="
                                    v.moreProvinceState.$each.$response.$data[
                                        index
                                    ].stateLatitude.$invalid && submitted
                                "
                                class="p-error text-sm"
                            >
                                {{
                                    v.moreProvinceState.$each.$response.$errors[
                                        index
                                    ].stateLatitude[0].$message.replace(
                                        "Value",
                                        "Latitude"
                                    )
                                }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer -->
        <template #footer>
            <Button
                label="No"
                class="w-6rem"
                icon="pi pi-times"
                @click="closePopupProvinceState()"
                text
            />
            <Button
                :label="loadingSubmittedBtnCity ? 'Submitted' : 'Save'"
                icon="pi pi-check"
                class="w-10rem"
                :loading="loadingSubmittedBtnCity"
                @click="submittedProvinceState()"
                autofocus
            />
        </template>
    </Dialog>
</template>

<!-- Popup Province or State -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, numeric } from "@vuelidate/validators";
import { reactive } from "vue";
import GeoLocationOfDistrictListPopup from "./ListDistrictsCity.vue";
import GeoLocationsManagementServices from "@/services/administrator/geo_locations_managements/GeoLocationManagementServices";
import geoLocationDistrictHelper from "@/mixin/geoLocationDistrictHelper";

export default {
    created() {
        this.geoLocationServices = new GeoLocationsManagementServices();
    },
    setup() {
        const rules = {
            moreProvinceState: {
                $each: helpers.forEach({
                    stateCode: {
                        required,
                        numeric,
                    },
                    stateKhmerName: {
                        required,
                    },
                    stateLatinName: {
                        required,
                    },
                    stateLongitude: {
                        required,
                    },
                    stateLatitude: {
                        required,
                    },
                }),
            },
        };
        const state = reactive({
            moreProvinceState: [
                {
                    stateCode: "",
                    stateKhmerName: "",
                    stateLatinName: "",
                    stateLongitude: "",
                    stateLatitude: "",
                },
            ],
        });
        const v = useVuelidate(rules, state);
        return { v, state };
    },
    props: {
        geoDistrictSSNProvinceId: {
            type: String,
            default() {
                return null;
            },
        },
    },
    components: {
        GeoLocationOfDistrictListPopup,
    },
    mixins: [geoLocationDistrictHelper],
    data() {
        return {
            loadingSubmittedBtnCity: false,
            openDialogGeoLocationDistrict: false,
            products: null,
            editingRows: [],
            selectedCustomers: null,
            selectAll: false,
            first: 0,
            submitted: false,
            keyState: [
                {
                    key: "",
                },
            ],
            malProvince: [],
            moreProvinceState: [
                {
                    stateCode: "",
                    stateKhmerName: "",
                    stateLatinName: "",
                    stateId: "",
                    stateLongitude: "",
                    stateLatitude: "",
                },
            ],
        };
    },
    methods: {
        popUpCreateProvinceState() {
            this.openDialogGeoLocationDistrict = true;
        },
        closePopupProvinceState() {
            this.openDialogGeoLocationDistrict = false;
        },
        addMoreProvinceState() {
            this.openDialogGeoLocationDistrict = true;
            this.state.moreProvinceState.push({
                stateCode: "",
                stateKhmerName: "",
                stateLatinName: "",
                stateId: "",
                stateLongitude: "",
                stateLatitude: "",
            });
        },
        removeIndexProvinceState(index) {
            this.state.moreProvinceState.splice(index, 1);
        },
        onResetFromProvinceState() {
            // reset form validation errors
            this.v.$reset();
            // reset form data
            const initialData = this.$options.data.call(this);
            Object.assign(this.$data, initialData);
        },
        async submittedProvinceState() {
            this.submitted = true;
            this.v.$touch();
            // stop here if form is invalid
            if (this.v.$invalid) return;
            const isFormCorrect = await this.v.$validate();
            // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
            if (isFormCorrect !== true || isFormCorrect == false) {
                this.$toast.add({
                    severity: "error",
                    summary: "Please Fix Below Errors.",
                    detail: "Please input filed district have missing value!",
                    life: 3000,
                });
                return false;
            }
            if (!isFormCorrect) return;
            // Check Selected Province
            if (
                !this.geoDistrictSSNProvinceId ||
                this.geoDistrictSSNProvinceId === null
            ) {
                this.$notify.error({
                    title: "Please selected province",
                    message: "Selected province is required",
                });
                throw new Error("Please selected province is required");
            }

            let arrayProvinceDistrictObj = [];
            const arrayDistrictProvince = this.state?.moreProvinceState
                ? this.state?.moreProvinceState
                : [];
            for (let index = 0; index < arrayDistrictProvince.length; index++) {
                let obj = {};
                const countryIndex = arrayDistrictProvince[index];
                obj.geoSuperSSNDistrictCountry = this.geoDistrictSSNProvinceId
                    ? this.geoDistrictSSNProvinceId
                    : null;
                (obj.addNewGeoCountryDistrictZipCode = String(
                    countryIndex?.stateCode
                )),
                    (obj.addNewGeoCountryDistrictKhmerName =
                        countryIndex?.stateKhmerName),
                    (obj.addNewGeoCountryDistrictEnglishName =
                        countryIndex?.stateLatinName),
                    (obj.addNewGeoCountryDistrictLongitude =
                        countryIndex?.stateLongitude),
                    (obj.addNewGeoCountryDistrictLatitude =
                        countryIndex?.stateLatitude),
                    (obj.geoCountryDistrictCodeType = "T3"),
                    (obj.geoCountryDistrictType = "district_city");
                arrayProvinceDistrictObj.push(obj);
            }
            this.loadingSubmittedBtnCity = true;
            setTimeout(() => {
                const districtAddNewDetail = {
                    geoDistrictDetail: arrayProvinceDistrictObj
                        ? arrayProvinceDistrictObj
                        : [],
                };
                this.geoLocationServices
                    .createDistrictGeoLocation(districtAddNewDetail)
                    .then(async (response) => {
                        if (response.data?.success === true) {
                            this.submitted = false;
                            this.errorValidateFile = [];
                            this.isProcessingSubmit = true;
                            this.$notify.success({
                                title: "Successful create geo-location district",
                                message: response.data?.message
                                    ? response.data?.message
                                    : "",
                                showClose: false,
                            });
                            // Clear Array District
                            this.state.moreProvinceState = [
                                {
                                    stateCode: "",
                                    stateKhmerName: "",
                                    stateLatinName: "",
                                    stateId: "",
                                    stateLongitude: "",
                                    stateLatitude: "",
                                },
                            ];
                            // Reload District Locations
                            this.openDialogGeoLocationDistrict = false;
                            this.loadingSubmittedBtnCity = false;
                            await this.fetchingDataGeoDistrictByProvinceLocation(
                                this.geoDistrictSSNProvinceId
                            );
                        }
                    })
                    .catch((error) => {
                        this.loadingSubmittedBtnCity = false;
                        this.$notify.error({
                            title: "Unsuccessfully create geo-location district",
                            message:
                                error.response.data.error?.message ??
                                "Unsuccessfully create geo-location district",
                            showClose: false,
                        });
                        if (error.response.data.error.error?.errors) {
                            for (
                                let index = 0;
                                index <
                                error.response.data.error.error?.errors.length;
                                index++
                            ) {
                                const messageValidation =
                                    error.response.data.error.error?.errors[
                                        index
                                    ].message ?? "";
                                this.$notify.error({
                                    title: "Unsuccessfully create geo-location district",
                                    message:
                                        messageValidation ??
                                        "Unsuccessfully create geo-location district",
                                    showClose: true,
                                });
                            }
                        }
                    });
            }, 1000);
        },
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
