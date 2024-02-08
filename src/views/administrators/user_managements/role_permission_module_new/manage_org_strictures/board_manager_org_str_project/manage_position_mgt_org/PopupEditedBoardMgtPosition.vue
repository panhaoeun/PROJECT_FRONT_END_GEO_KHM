<template>
    <form @submit.prevent="submittedDialogEditBoardMgtPosition">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinnerBoardMgtPos">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="getPosEditBoardMgtData"
            :title="`Edit Position:` + ' ' + nameProject"
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
                            !getPosEditBoardMgtData?.deptPosName &&
                            hasBoardMgtPositionErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !getPosEditBoardMgtData?.deptPosName &&
                                hasBoardMgtPositionErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !getPosEditBoardMgtData.deptPosName &&
                                    hasBoardMgtPositionErrors,
                            }"
                        >
                            Position English Name
                            <span class="p-error">*</span>
                        </label>
                        <InputText
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="getPosEditBoardMgtData.deptPosName"
                            type="text"
                            placeholder="Position Name"
                        />
                        <span
                            class="error"
                            v-if="
                                !getPosEditBoardMgtData.deptPosName &&
                                hasBoardMgtPositionErrors
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "Position Name",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <!-- Position Khmer Name -->
                  <div
                    class="flex start mlr--5"
                >
                    <div
                        class="input-wrap mlr-5"
                    >
                        <label
                        >
                            Position Khmer Name
                        </label>
                        <InputText
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="getPosEditBoardMgtData.positionKhmerName"
                            type="text"
                            placeholder="Position Name"
                        />
                    </div>
                </div>
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Position Noted </label>
                        <TextArea
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="
                                getPosEditBoardMgtData.deptGeoMgtPosNoted
                            "
                            type="text"
                            placeholder="Position Noted"
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
import manageOrgStrMgtPositionHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgStrMgtPositionHelper";
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
        openEditBoardMgtId: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        nameProject() {
            return this.openEditBoardMgtId?.deptPosName || "";
        },
        editing() {
            return this.openEditBoardMgtId && this.openEditBoardMgtId.deptPosId
        },
    },
    mixins: [manageOrgStrMgtPositionHelper, util, validation],
    data() {
        return {
            loadingSpinnerBoardMgtPos: false,
            getPosEditBoardMgtData: null,
            hasBoardMgtPositionErrors: false,
            submittingBoardMgtData: false,
        };
    },
    async mounted() {
        if (this.openEditBoardMgtId) {
            this.getPosEditBoardMgtData = {
                ...this.getPosEditBoardMgtData,
                ...this.openEditBoardMgtId,
            };
        } else {
            this.getPosEditBoardMgtData = {
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
