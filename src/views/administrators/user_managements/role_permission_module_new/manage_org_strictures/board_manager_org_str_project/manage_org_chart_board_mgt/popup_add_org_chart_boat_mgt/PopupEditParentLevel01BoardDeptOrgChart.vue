<template>
    <form @submit.prevent="submittedDialogEditBoardMgtParentLevel">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div
                class="spinner-wrapper flex layer-white"
                v-if="loadingSpinnerBoardMgtPos"
            >
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="getPosEditParentLevel"
            :title="`Edit Org-Structure:` + ' ' + nameParentLevel"
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
                            !getPosEditParentLevel?.orgStrDeptName &&
                            hasParentLevelBoardMgt01LevelErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !getPosEditParentLevel?.orgStrDeptName &&
                                hasParentLevelBoardMgt01LevelErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !getPosEditParentLevel.orgStrDeptName &&
                                    hasParentLevelBoardMgt01LevelErrors,
                            }"
                        >
                            English Name
                            <span class="p-error">*</span>
                        </label>
                        <InputText
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="
                                getPosEditParentLevel.orgStrDeptName
                            "
                            type="text"
                            placeholder="Position Name"
                        />
                        <span
                            class="error"
                            v-if="
                                !getPosEditParentLevel.orgStrDeptName &&
                                hasParentLevelBoardMgt01LevelErrors
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
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Khmer Name </label>
                        <InputText
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="
                                getPosEditParentLevel.orgStrDeptKhmerName
                            "
                            type="text"
                            placeholder="Khmer Name"
                        />
                    </div>
                </div>
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Org-Structure Noted </label>
                        <TextArea
                            class="border-round-lg text-sm w-30rem"
                            v-model.number="
                                getPosEditParentLevel.orgDeptStrNoted
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
                        :fetching-data="submittingBoardParentLevel"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('projectOrgStr.thisOrgStructure', {
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
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";
import { mapActions } from "vuex";
export default {
    components: {
        Spinner,
        PopOver,
        AjaxButton,
    },
    props: {
        openEditBoardParentLevel: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        nameParentLevel() {
            return this.openEditBoardParentLevel?.orgStrDeptName || "";
        },
        editing() {
            return (
                this.openEditBoardParentLevel &&
                this.openEditBoardParentLevel.deptPosId
            );
        },
    },
    mixins: [util, validation, manageOrgChartBoardMgtLevelHelper],
    data() {
        return {
            loadingSpinnerBoardMgtPos: false,
            getPosEditParentLevel: null,
            hasParentLevelBoardMgt01LevelErrors: false,
            submittingBoardParentLevel: false,
        };
    },
    async mounted() {
        if (this.openEditBoardParentLevel) {
            this.getPosEditParentLevel = {
                ...this.getPosEditParentLevel,
                ...this.openEditBoardParentLevel,
            };
        } else {
            this.getPosEditParentLevel = {
                orgStrId: 0,
                geoCountryId: "",
                projectId: "",
                orgStrDeptName: 0,
                orgStrDeptKhmerName: "",
                deptGeoMgtPosNoted: "",
                orgSupDeptStrId: "",
                orgDeptStrNoted: "",
                orgDeptStrLevel: ""
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
