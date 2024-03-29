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
            :title="'List of history officer' + '\n' + departmentOrgName"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto"
        >
            <template v-slot:content>
                <div style="width: 80rem">
                    <!-- List of Position JD Org Dept -->
                    <ListManageHistoryOfficerEmp
                        :orgStrDeptPosId="orgAssignId ? orgAssignId : 0"
                        :positionAllDeptOrg="
                            getPositionBaseDept ? getPositionBaseDept : {}
                        "
                    />
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
                </div>
            </template>
        </pop-over>
    </form>
</template>

<!-- Position Dept Org-Structures -->
<script>
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
// import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import ListManageHistoryOfficerEmp from "./ListManageHistoryOfficerEmp";
import manageHistoryWorkJobDeptPosOrgHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageHistoryWorkJobDeptPosOrgHelper";

export default {
    name: "AssignJobPositionDept",
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
        orgAssignId: {
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
        // AjaxButton,
        ListManageHistoryOfficerEmp,
        PopOver,
        //   Dropdown
    },
    computed: {
        editing() {
            return this.addressData && this.addressData.id;
        },
    },
    mixins: [util, validation, manageHistoryWorkJobDeptPosOrgHelper],
    methods: {
        async savingAssignPositionDeptSubmitted() {
            await this.assignOrgDeptPositionActions();
            if (!this.hasAssignDeptPosition) {
                this.$emit("close");
            }
        },
    },
    async mounted() {
        const parentOrgDeptId = parseInt(this.orgAssignId);
        this.getAllReloadJobHistoryWorkDeptPositionOrg(parentOrgDeptId);
    },
};
</script>
