<template>
    <form @submit.prevent="submittedDialogEditGeoLocalGlobalData">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinner">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="geoLocationGlobalData"
            :title="
                `Edit ${String(geoGlobalName).toString()}:` +
                ' ' +
                nameGeoGlobal
            "
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto"
        >
            <!-- Contents -->
            <template v-slot:content>
                <div
                    class="flex start mlr--5"
                    :class="{
                        invalid:
                            !geoLocationGlobalData?.geo_zip_code &&
                            hasGeoGlobalErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !geoLocationGlobalData?.geo_zip_code &&
                                hasGeoGlobalErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !geoLocationGlobalData.geo_zip_code &&
                                    hasGeoGlobalErrors,
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
                            oninput="this.value = this.value.replace(/\D+/g, '')"
                            @keypress="
                                $event.key.match(/^[\d\.]$/)
                                    ? ''
                                    : $event.preventDefault()
                            "
                            class="border-round-lg text-sm w-15rem"
                            v-model.number="geoLocationGlobalData.geo_zip_code"
                            type="text"
                            placeholder="Zip Code"
                        />
                        <span
                            class="error"
                            v-if="
                                !geoLocationGlobalData.geo_zip_code &&
                                hasGeoGlobalErrors
                            "
                        >
                            {{
                                $t("addressPopup.isRequired", {
                                    type: "Zip Code",
                                })
                            }}
                        </span>
                    </div>
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !geoLocationGlobalData?.geo_khmer_name &&
                                hasGeoGlobalErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !geoLocationGlobalData.geo_khmer_name &&
                                    hasGeoGlobalErrors,
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
                            class="border-round-lg text-sm w-15rem"
                            type="text"
                            v-model.trim="geoLocationGlobalData.geo_khmer_name"
                            placeholder="Khmer Name"
                        />
                        <span
                            class="error"
                            v-if="
                                !geoLocationGlobalData.geo_khmer_name &&
                                hasGeoGlobalErrors
                            "
                        >
                            {{
                                $t("addressPopup.isRequired", {
                                    type: "Khmer Name",
                                })
                            }}
                        </span>
                    </div>
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !geoLocationGlobalData?.geo_english_name &&
                                hasGeoGlobalErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !geoLocationGlobalData.geo_english_name &&
                                    hasGeoGlobalErrors,
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
                            class="border-round-lg text-sm w-15rem"
                            v-model.trim="
                                geoLocationGlobalData.geo_english_name
                            "
                            type="text"
                            placeholder="English Name"
                        />
                        <span
                            class="error"
                            v-if="
                                !geoLocationGlobalData.geo_english_name &&
                                hasGeoGlobalErrors
                            "
                        >
                            {{
                                $t("addressPopup.isRequired", {
                                    type: "English Name",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <div class="flex start mlr--5">
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !geoLocationGlobalData?.geo_longitude_location &&
                                hasGeoGlobalErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !geoLocationGlobalData.geo_longitude_location &&
                                    hasGeoGlobalErrors,
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
                            class="border-round-lg text-sm w-15rem"
                            type="text"
                            v-model="
                                geoLocationGlobalData.geo_longitude_location
                            "
                            placeholder="Longitude"
                        />
                        <span
                            class="error"
                            v-if="
                                !geoLocationGlobalData.geo_longitude_location &&
                                hasGeoGlobalErrors
                            "
                        >
                            {{
                                $t("addressPopup.isRequired", {
                                    type: "Longitude",
                                })
                            }}
                        </span>
                    </div>
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !geoLocationGlobalData?.geo_latitude_location &&
                                hasGeoGlobalErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !geoLocationGlobalData.geo_latitude_location &&
                                    hasGeoGlobalErrors,
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
                            class="border-round-lg text-sm w-15rem"
                            v-model="
                                geoLocationGlobalData.geo_latitude_location
                            "
                            type="text"
                            placeholder="Latitude"
                        />
                        <span
                            class="error"
                            v-if="
                                !geoLocationGlobalData.geo_latitude_location &&
                                hasGeoGlobalErrors
                            "
                        >
                            {{
                                $t("addressPopup.isRequired", {
                                    type: "Longitude",
                                })
                            }}
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
                        {{ $t("addressPopup.cancel") }}
                    </button>
                    <ajax-button
                        class="primary-btn plr-30 plr-sm-15"
                        :fetching-data="submittingGlobalData"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('addressPopup.thisAddress', {
                                type:
                                    editing > 0
                                        ? $t('addressPopup.update')
                                        : $t('addressPopup.save'),
                            })
                        "
                    />
                </div>
            </template>
        </pop-over>
    </form>
</template>

<!-- Script of JS -->
<script>
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import geoLocationCountryHelper from "@/mixin/geoLocationCountryHelper";
import geoLocationCommuneHelper from "@/mixin/geoLocationCommuneHelper";
import geoLocationDistrictHelper from "@/mixin/geoLocationDistrictHelper";
import geoLocationProvinceHelper from "@/mixin/geoLocationProvinceHelper";
import geoLocationVillagesHelper from "@/mixin/geoLocationProvinceHelper";

import { mapActions } from "vuex";

export default {
    data() {
        return {
            editionGeoCountry: null,
            hasGeoGlobalErrors: false,
            geoLocationGlobalData: null,
            geoLocationGeoDistrictData: null,
            geoLocationProvinceData: null,
            geoLocationCommuneData: null,
            geoLocationVillagesData: null,
            geoLocationCountryData: null,
            submittingGlobalData: false,
            loadingSpinner: false,
        };
    },
    props: {
        idEditGeoCountry: {
            type: Number,
            default() {
                return null;
            },
        },
        geoLocalGlobalData: {
            type: Object,
            default() {
                return null;
            },
        },
        geoGlobalName: {
            type: String,
            default() {
                return null;
            },
        },
        openDialogCountryId: {
            type: Boolean,
            default() {
                return null;
            },
        },
    },
    computed: {
        nameGeoGlobal() {
            return this.geoLocalGlobalData?.geo_english_name || "";
        },
        editing() {
            return this.geoLocalGlobalData && this.geoLocalGlobalData?.id;
        },
    },
    components: {
        PopOver,
        Spinner,
        AjaxButton,
    },
    mixins: [
        util,
        validation,
        geoLocationCountryHelper,
        geoLocationCommuneHelper,
        geoLocationDistrictHelper,
        geoLocationProvinceHelper,
        geoLocationVillagesHelper,
    ],
    async mounted() {
        if (this.geoLocalGlobalData) {
            this.geoLocationGlobalData = {
                ...this.geoLocationGlobalData,
                ...this.geoLocalGlobalData,
            };
        } else {
            this.geoLocationGlobalData = {
                id: "",
                geo_zip_code: "",
                geo_khmer_name: "",
                geo_english_name: "",
                geo_latitude_location: "",
                geo_longitude_location: "",
                geo_type_code: "",
                geo_type_name: "",
            };
        }
    },
    methods: {
        async submittedDialogEditGeoLocalGlobalData() {
            try {
                if (
                    this.geoLocationGlobalData?.geo_zip_code &&
                    this.geoLocationGlobalData?.geo_khmer_name &&
                    this.geoLocationGlobalData?.geo_english_name &&
                    this.geoLocationGlobalData?.geo_latitude_location &&
                    this.geoLocationGlobalData?.geo_longitude_location
                ) {
                    this.submittingGlobalData = true;
                    switch (String(this.geoLocationGlobalData?.geo_type_code)) {
                        case "T1":
                            // code block
                            this.geoLocationCountryData = this
                                .geoLocationGlobalData
                                ? this.geoLocationGlobalData
                                : {};
                            await this.geoLocationCountryActions();
                            break;
                        case "T2":
                            // code block
                            this.geoLocationProvinceData = this
                                .geoLocationGlobalData
                                ? this.geoLocationGlobalData
                                : {};
                            await this.geoLocationProvinceActions();
                            break;
                        case "T3":
                            // code block
                            this.geoLocationGeoDistrictData = this
                                .geoLocationGlobalData
                                ? this.geoLocationGlobalData
                                : {};
                            await this.geoLocationDistrictByProvinceActions();
                            break;
                        case "T4":
                            // code block
                            this.geoLocationCommuneData = this
                                .geoLocationGlobalData
                                ? this.geoLocationGlobalData
                                : {};
                            await this.geoLocationCommuneActions();
                            break;
                        case "T5":
                            // code block
                            this.geoLocationVillagesData = this
                                .geoLocationGlobalData
                                ? this.geoLocationGlobalData
                                : {};
                            await this.geoLocationProvinceActions();
                            break;
                        default:
                    }
                } else {
                    this.hasGeoGlobalErrors = false;
                    this.submittingGlobalData = true;
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        ...mapActions("common", [
            "fetchLocation",
            "setToastMessage",
            "setToastError",
            "getRequest",
        ]),
    },
};
</script>
