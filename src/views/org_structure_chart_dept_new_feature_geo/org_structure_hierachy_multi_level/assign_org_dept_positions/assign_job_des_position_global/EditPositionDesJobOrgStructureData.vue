<template>
    <Toast />
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
            :title="
                `Edit Dept. Position Job Descriptions:` + ' ' + namePosition
            "
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content>
                <!-- Position Name -->
                <div
                    class="flex text-left start mlr--5"
                    :class="{
                        invalid:
                            !getPosEditJobDes?.positionId && hasJobDescErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        style="width: 40rem"
                        :class="{
                            invalid:
                                !getPosEditJobDes?.positionId &&
                                hasJobDescErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !getPosEditJobDes.positionId &&
                                    hasJobDescErrors,
                            }"
                        >
                            Position
                            <span class="p-error">*</span>
                        </label>
                        <Dropdown
                            showClear
                            v-model="selectedPositionDesDept"
                            :options="positionObjDeptOrg"
                            optionLabel="deptPosName"
                            emptyMessage="Empty list of positions"
                            filter
                            placeholder="Select a Position"
                            class="w-full border-round-lg text-sm"
                            inputId="deptPosName"
                            aria-describedby="dd-error"
                        >
                            <template #value="slotProps">
                                <div
                                    v-if="slotProps.value"
                                    class="flex align-items-center"
                                >
                                    <div class="text-sm">
                                        {{
                                            geoNameToTitleCase(
                                                String(
                                                    slotProps.value
                                                        ?.deptPosName ?? ""
                                                )
                                            )
                                        }}({{
                                            slotProps.value.positionKhmerName ??
                                            ""
                                        }})
                                    </div>
                                </div>
                                <span v-else class="text-sm">
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center text-sm">
                                    <div class="text-sm">
                                        {{
                                            geoNameToTitleCase(
                                                String(
                                                    slotProps.option
                                                        .deptPosName ?? ""
                                                )
                                            )
                                        }}
                                        ({{
                                            slotProps.option
                                                .positionKhmerName ?? ""
                                        }})
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                        <span
                            class="error"
                            v-if="
                                !getPosEditJobDes.posDesNameEng &&
                                hasJobDescErrors
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
                <!-- Position English Name -->
                <div
                    class="flex text-left start mlr--5"
                    :class="{
                        invalid:
                            !getPosEditJobDes?.posDesNameEng &&
                            hasJobDescErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        style="width: 40rem"
                        :class="{
                            invalid:
                                !getPosEditJobDes?.posDesNameEng &&
                                hasJobDescErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !getPosEditJobDes.posDesNameEng &&
                                    hasJobDescErrors,
                            }"
                        >
                            English Name
                            <span class="p-error">*</span>
                        </label>
                        <InputText
                            class="border-round-lg text-sm"
                            v-model.number="getPosEditJobDes.posDesNameEng"
                            type="text"
                            placeholder="Job title of the english name"
                        />
                        <span
                            class="error"
                            v-if="
                                !getPosEditJobDes.posDesNameEng &&
                                hasJobDescErrors
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
                <div class="flex start text-left mlr--5">
                    <div class="input-wrap mlr-5" style="width: 40rem">
                        <label> Khmer Name </label>
                        <InputText
                            class="border-round-lg text-sm"
                            v-model.number="getPosEditJobDes.posDesNameKh"
                            type="text"
                            placeholder="Job title of the khmer name"
                        />
                    </div>
                </div>
                <div class="flex start text-left mlr--5">
                    <div class="input-wrap mlr-5" style="width: 40rem">
                        <label> Job Description Noted </label>
                        <Textarea
                            class="border-round-lg text-sm w-30rem"
                            v-model="getPosEditJobDes.posNotedDes"
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
import manageOrgDeptJobDesPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionJobDescriptionDeptOrgHelper";
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
        positionObjDeptOrg: {
            type: Object,
            default() {
                return null;
            },
        },
        openEditPositionJobDes: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        namePosition() {
            return this.openEditPositionJobDes?.posDesNameEng || "";
        },
        editing() {
            return (
                this.openEditPositionJobDes &&
                this.openEditPositionJobDes.posDesNameEng
            );
        },
    },
    mixins: [manageOrgDeptJobDesPositionStructuresHelper, util, validation],
    data() {
        return {
            loadingSpinnerPosition: false,
            getPosEditJobDes: null,
            hasJobDescErrors: false,
            submittingJobDesc: false,
            selectedPositionDesDept: null
        };
    },
    async mounted() {
        if (this.openEditPositionJobDes) {
            this.getPosEditJobDes = {
                ...this.getPosEditJobDes,
                ...this.openEditPositionJobDes,
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
        geoNameToTitleCase(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
    },
};
</script>
