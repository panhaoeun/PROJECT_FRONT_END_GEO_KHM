<template>
    <Toast />
    <form @submit.prevent="savingAssignPositionDeptSubmitted">
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white z-100" v-if="loading">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Pop Over Dialogs -->
        <pop-over
            :title="'Add New Positions: ' + '\n' + departmentOrgName"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto"
        >
            <template v-slot:content>
                <!-- English Name -->
                <div class="text-left">
                    <div
                        class="input-wrap mlr-5"
                        style="width: 45rem"
                        :class="{
                            invalid:
                                !englishNamePositionDeptOrgAssign &&
                                hasAssignDeptPosition,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !englishNamePositionDeptOrgAssign &&
                                    hasAssignDeptPosition,
                            }"
                        >
                            English Name
                            <span class="p-error">*</span>
                        </label>
                        <InputText
                            type="text"
                            v-model="englishNamePositionDeptOrgAssign"
                            placeholder="Enter english name of position"
                        />
                        <span
                            class="error"
                            v-if="
                                !englishNamePositionDeptOrgAssign &&
                                hasAssignDeptPosition
                            "
                        >
                            {{
                                $t("positionDeptOrg.isRequired", {
                                    type: $t("positionDeptOrg.englishName"),
                                })
                            }}
                        </span>
                    </div>
                </div>
                <!-- Khmer Name -->
                <div class="text-left">
                    <div class="input-wrap mlr-5" style="width: 45rem">
                        <label> Khmer Name </label>
                        <InputText
                            type="text"
                            v-model="khmerNamePositionDeptOrgAssign"
                            placeholder="Enter khmer name of position"
                        />
                    </div>
                </div>
                <!-- Descriptions -->
                <div class="text-left">
                    <div class="input-wrap mlr-5" style="width: 45rem">
                        <label> Details </label>
                        <Textarea
                            v-model="descriptionDetailPosition"
                            autoResize
                            rows="5"
                            class="border-round-lg"
                            cols="30"
                            placeholder="Enter detail description position"
                        />
                    </div>
                </div>
            </template>
            <!-- Footers -->
            <template v-slot:pop-footer>
                <div class="flex j-end gap-10">
                    <button
                        class="outline-btn text-black border-round plr-30 plr-sm-15"
                        aria-label="Address cancel"
                        @click.prevent="$emit('close')"
                    >
                        {{ $t("addressPopup.cancel") }}
                    </button>
                    <ajax-button
                        class="primary-btn border-round plr-30 plr-sm-15"
                        :fetching-data="submittingAddressData"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('addressPopup.thisPosition', {
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

<!-- Add Org Dept -->
<script>
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
import addressHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";

export default {
    name: "AddressPopup",
    data() {
        return {
            states: {},
            addressData: null,
            loading: false,
            hasAssignDeptPosition: false,
            dropdownOpen: false,
            submittingAddressData: false,
            englishNamePositionDeptOrgAssign: "",
            khmerNamePositionDeptOrgAssign: "",
            descriptionDetailPosition: "",
        };
    },
    watch: {
        profile() {
            this.addressData.name = this.profile.name;
        },
    },
    props: {
        orgStrDeptPosId: {
            type: Number,
            required: true,
            defaultValue: 0,
            default: 0,
        },
        departmentOrgName: {
            type: String,
            defaultValue: "No Department",
            default() {
                return "";
            },
        },
    },
    components: {
        Spinner,
        AjaxButton,
        PopOver,
        //   Dropdown
    },
    computed: {
        editing() {
            return this.addressData && this.addressData.id;
        },
    },
    mixins: [util, validation, addressHelper],
    methods: {
        async savingAssignPositionDeptSubmitted() {
            await this.assignOrgDeptPositionActions();
            if (!this.hasAssignDeptPosition) {
                this.$emit("close");
            }
        },
    },
    created() {},
    async mounted() {},
};
</script>
