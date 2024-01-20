<template>
    <form @submit.prevent="submittedDialogEditGeoProjectStr">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinner">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="projectStrGeoData"
            :title="`Edit Project:` + ' ' + nameProject"
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
                            !projectStrGeoData?.project_name &&
                            hasProvinceErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !projectStrGeoData?.project_name &&
                                hasProvinceErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !projectStrGeoData.project_name &&
                                    hasProvinceErrors,
                            }"
                        >
                            Project Name
                            <span class="p-error">*</span>
                        </label>
                        <InputText
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="projectStrGeoData.project_name"
                            type="text"
                            placeholder="Project Name"
                        />
                        <span
                            class="error"
                            v-if="
                                !projectStrGeoData.project_name &&
                                hasProvinceErrors
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "Project Name",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Project Noted </label>
                        <TextArea
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="projectStrGeoData.project_noted"
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
                        :fetching-data="submittingProjectData"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('projectOrgStr.thisProject', {
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
import geoDeptOrgProjects from "@/mixin/manage_geo_org_str/manageProjectNameHelper";
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
        geoOrgProjectStrData: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        nameProject() {
            return this.geoOrgProjectStrData?.project_name || "";
        },
    },
    mixins: [geoDeptOrgProjects, util, validation],
    data() {
        return {
            loadingSpinner: false,
            projectStrGeoData: null,
            hasProvinceErrors: false,
            submittingProjectData: false,
        };
    },
    async mounted() {
        if (this.geoOrgProjectStrData) {
            this.projectStrGeoData = {
                ...this.projectStrGeoData,
                ...this.geoOrgProjectStrData,
            };
        } else {
            this.projectStrGeoData = {
                id: 0,
                project_name: "",
                project_noted: "",
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
