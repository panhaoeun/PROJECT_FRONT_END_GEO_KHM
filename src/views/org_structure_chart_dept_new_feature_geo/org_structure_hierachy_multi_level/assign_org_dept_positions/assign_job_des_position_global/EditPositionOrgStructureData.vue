<template>
    <Toast />
    <form @submit.prevent="submittedDialogEditOrgGlobalDeptPosition">
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
            v-if="openEditPositionOrgDept"
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
                    class="flex text-left start mlr--5"
                    :class="{
                        invalid:
                            !openEditPositionOrgDept?.deptPosName &&
                            hasBoardMgtPositionErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !openEditPositionOrgDept?.deptPosName &&
                                hasBoardMgtPositionErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !openEditPositionOrgDept.deptPosName &&
                                    hasBoardMgtPositionErrors,
                            }"
                        >
                            English Name
                            <span class="p-error">*</span>
                        </label>
                        <InputText
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="openEditPositionOrgDept.deptPosName"
                            type="text"
                            placeholder="Please enter english name of position"
                        />
                        <span
                            class="error"
                            v-if="
                                !openEditPositionOrgDept.deptPosName &&
                                hasBoardMgtPositionErrors
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "Position of english name",
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
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="
                                openEditPositionOrgDept.positionKhmerName
                            "
                            type="text"
                            placeholder="Please enter khmer name of position"
                        />
                    </div>
                </div>
                <div class="flex start text-left mlr--5">
                    <div class="input-wrap mlr-5">
                        <label>Description</label>
                        <Textarea
                            class="border-round-lg text-sm w-30rem"
                            v-model="openEditPositionOrgDept.deptGeoMgtPosNoted"
                            type="text"
                            placeholder="Please enter description"
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
                        :fetching-data="submittingBoardMgtData"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('projectOrgStr.thisPosition', {
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
import manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper from "@/mixin/manage_org_structure_dept_new_features/manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper";
import manageOrgStrMgtPositionHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgStrMgtPositionHelper";
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";
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
        openEditPositionOrg: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        namePosition() {
            return this.openEditPositionOrg?.deptPosName || "";
        },
        editing() {
            return (
                this.openEditPositionOrg && this.openEditPositionOrg.deptPosName
            );
        },
    },
    mixins: [
        manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper,
        util,
        manageOrgStrMgtPositionHelper,
        validation,
        manageOrgDeptPositionStructuresHelper,
    ],
    data() {
        return {
            loadingSpinnerPosition: false,
            openEditPositionOrgDept: null,
            hasBoardMgtPositionErrors: false,
            submittingBoardMgtData: false,
        };
    },
    async mounted() {
        if (this.openEditPositionOrg) {
            this.openEditPositionOrgDept = {
                ...this.openEditPositionOrgDept,
                ...this.openEditPositionOrg,
            };
        } else {
            this.openEditPositionOrgDept = {
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
