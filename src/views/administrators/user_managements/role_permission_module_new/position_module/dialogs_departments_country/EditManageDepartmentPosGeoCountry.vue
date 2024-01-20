<template>
    <form @submit.prevent="submittedDialogEditGeoCountryStr">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinner">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="geoOrgCountryDeptStrData"
            :title="`Edit Department By Country:` + ' ' + nameDeptCountry"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content>
                <div
                    class="flex start mlr--5"
                    :class="{
                        invalid:
                            !geoOrgCountryDeptStrData?.label &&
                            hasProvinceErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !geoOrgCountryDeptStrData?.label &&
                                hasProvinceErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !geoOrgCountryDeptStrData.label &&
                                    hasProvinceErrors,
                            }"
                        >
                            Department
                            <span class="p-error">*</span>
                        </label>
                        <InputText
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="geoOrgCountryDeptStrData.label"
                            type="text"
                            placeholder="Department"
                        />
                        <span
                            class="error"
                            v-if="
                                !geoOrgCountryDeptStrData.label &&
                                hasProvinceErrors
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "Department",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Descriptions </label>
                        <TextArea
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="
                                geoOrgCountryDeptStrData.orgDeptNoted
                            "
                            type="text"
                            placeholder="Noted"
                        />
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
                        :fetching-data="submittingDeptCountryData"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('projectOrgStr.thisDepartment', {
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

<!-- Script of edited projects -->
<script>
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
import geoOrgStrDeptCountryHelper from "@/mixin/manage_geo_org_str/org_dept_geo_str/geoOrgStrDeptCountryHelper";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import { mapActions } from "vuex";
export default {
    components: {
        Spinner,
        PopOver,
        AjaxButton,
    },
    props: {
        geoOrgCountryDeptStr: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        nameDeptCountry() {
            return this.geoOrgCountryDeptStrData?.label || "";
        },
    },
    mixins: [geoOrgStrDeptCountryHelper, util, validation],
    data() {
        return {
            loadingSpinner: false,
            geoOrgCountryDeptStrData: null,
            hasProvinceErrors: false,
            submittingDeptCountryData: false,
        };
    },
    async mounted() {
        if (this.geoOrgCountryDeptStr) {
            this.geoOrgCountryDeptStrData = {
                ...this.geoOrgCountryDeptStrData,
                ...this.geoOrgCountryDeptStr,
            };
        } else {
            this.geoOrgCountryDeptStrData = {
                orgDeptNoted: '',
                childDeptId: 0,
                children: [],
                geoLocationId: 0,
                hasChildren: false,
                key: "",
                geoProjectId: 0,
                label: "",
                orgDeptId: 0,
                orgSLDate: "",
                orgSLLevel: "",
                parentDeptId: 0,
            };
        }
    },
    methods: {
        ...mapActions("common", [
            "fetchLocation",
            "setToastMessage",
            "setToastError",
            "getRequest",
        ]),
    },
};
</script>
