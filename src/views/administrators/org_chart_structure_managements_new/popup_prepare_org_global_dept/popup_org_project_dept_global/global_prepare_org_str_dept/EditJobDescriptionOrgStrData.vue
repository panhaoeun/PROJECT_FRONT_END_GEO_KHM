<template>
    <form @submit.prevent="saveModifyJobDescriptionBaseOrgStructureId">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div
                class="spinner-wrapper flex layer-white"
                v-if="loadingSpinnerPosition"
            >
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="getPosEditJobDes"
            :title="`Edit Position:` + ' ' + namePosition"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content>
                <!-- Position English Name -->
                <div
                    class="flex start mlr--5"
                    :class="{
                        invalid:
                            !getPosEditJobDes?.jobDesEng && hasJobDescErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !getPosEditJobDes?.jobDesEng &&
                                hasJobDescErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !getPosEditJobDes.jobDesEng &&
                                    hasJobDescErrors,
                            }"
                        >
                            English Name
                            <span class="p-error">*</span>
                        </label>
                        <InputText
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="getPosEditJobDes.jobDesEng"
                            type="text"
                            placeholder="Job title of the english name"
                        />
                        <span
                            class="error"
                            v-if="
                                !getPosEditJobDes.jobDesEng && hasJobDescErrors
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "Job title of the english name",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <!-- Job Description Khmer Name -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Khmer Name </label>
                        <InputText
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="getPosEditJobDes.jobDesKhmer"
                            type="text"
                            placeholder="Job title of the khmer name"
                        />
                    </div>
                </div>
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Job Description Noted </label>
                        <TextArea
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="getPosEditJobDes.jobDesNoted"
                            type="text"
                            placeholder="Job Description Noted"
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
                        :fetching-data="submittingJobDesc"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('projectOrgStr.thisJobDescription', {
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
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
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
        openEditBoardJobDes: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        namePosition() {
            return this.openEditBoardJobDes?.jobDesEng || "";
        },
        editing() {
            return (
                this.openEditBoardJobDes && this.openEditBoardJobDes.jobDesEng
            );
        },
    },
    mixins: [
        managerJobPositionOrgStructureProjectLevelZeroHelper,
        util,
        validation,
    ],
    data() {
        return {
            loadingSpinnerPosition: false,
            getPosEditJobDes: null,
            hasJobDescErrors: false,
            submittingJobDesc: false,
        };
    },
    async mounted() {
        if (this.openEditBoardJobDes) {
            this.getPosEditJobDes = {
                ...this.getPosEditJobDes,
                ...this.openEditBoardJobDes,
            };
        } else {
            this.getPosEditJobDes = {
                deptPosId: 0,
                deptPosName: "",
                positionKhmerName: "",
                orgDeptParentId: 0,
                deptGeoPosLevel: "",
                deptGeoMgtPosNoted: "",
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
