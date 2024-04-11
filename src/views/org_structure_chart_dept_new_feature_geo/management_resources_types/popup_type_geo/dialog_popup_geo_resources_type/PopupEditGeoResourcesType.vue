<template>
    <Toast />
    <form @submit.prevent="submittedResourceTypeSaveModify">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div
                class="spinner-wrapper flex layer-white"
                v-if="loadingSpinnerPosition"
            >
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Org-Structures Data -->
        <pop-over
            v-if="editDataResourcesTypeGeo"
            :title="`Edit Resource Type Of:` + ' ' + nameOfResourceType"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content>
                <div
                    class="flex text-left start mlr--5"
                    :class="{
                        invalid:
                            !editDataResourcesTypeGeo?.englishNameResource &&
                            hasErrorEditResourceType,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !editDataResourcesTypeGeo?.englishNameResource &&
                                hasErrorEditResourceType,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !editDataResourcesTypeGeo.englishNameResource &&
                                    hasErrorEditResourceType,
                            }"
                        >
                            English Name
                            <span class="p-error">*</span>
                        </label>
                        <InputText
                            class="border-round-lg text-sm"
                            style="width: 40rem"
                            v-model.trim="
                                editDataResourcesTypeGeo.englishNameResource
                            "
                            type="text"
                            placeholder="Please enter english name of the resource type"
                        />
                        <span
                            class="error"
                            v-if="
                                !editDataResourcesTypeGeo.englishNameResource &&
                                hasErrorEditResourceType
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "Resources type of english name",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <!-- Job Description Khmer Name -->
                <div class="flex start text-left mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Khmer Name </label>
                        <InputText
                            style="width: 40rem"
                            class="border-round-lg text-sm"
                            v-model.number="
                                editDataResourcesTypeGeo.khmerNameResource
                            "
                            type="text"
                            placeholder="Please enter khmer name of the resource type!"
                        />
                    </div>
                </div>
                <div class="flex start text-left mlr--5">
                    <div class="input-wrap mlr-5">
                        <label>Description</label>
                        <Textarea
                            style="width: 40rem"
                            class="border-round-lg text-sm"
                            v-model="
                                editDataResourcesTypeGeo.descriptionResourceType
                            "
                            type="text"
                            placeholder="Please enter description of the resource type"
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
                        :fetching-data="submittingResourceLoading"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('projectOrgStr.thisResourceType', {
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
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import manageOrgGeoResourcesTypeNationalCountryHelper from "@/mixin/manage_org_structure_dept_new_features/manage_resources_types/manageOrgGeoResourcesTypeNationalCountryHelper";
import { mapActions } from "vuex";
export default {
    components: {
        Spinner,
        PopOver,
        AjaxButton,
    },
    props: {
        editDataResourcesType: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        nameOfResourceType() {
            return this.editDataResourcesType?.englishNameResource || "";
        },
        editing() {
            return (
                this.editDataResourcesType &&
                this.editDataResourcesType.englishNameResource
            );
        },
    },
    mixins: [manageOrgGeoResourcesTypeNationalCountryHelper,util,validation],
    data() {
        return {
            loadingSpinnerPosition: false,
            editDataResourcesTypeGeo: null,
            hasErrorEditResourceType: false,
            submittingResourceLoading: false,
        };
    },
    async mounted() {
        if (this.editDataResourcesType) {
            this.editDataResourcesTypeGeo = {
                ...this.editDataResourcesTypeGeo,
                ...this.editDataResourcesType,
            };
        } else {
            this.editDataResourcesTypeGeo = {
                deptPosId: 0,
                deptPosName: "",
                englishNameResource: "",
                khmerNameResource: 0,
                statusTypeResource: "",
                statusResourceTypeCode: "",
                descriptionResourceType: "",
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
