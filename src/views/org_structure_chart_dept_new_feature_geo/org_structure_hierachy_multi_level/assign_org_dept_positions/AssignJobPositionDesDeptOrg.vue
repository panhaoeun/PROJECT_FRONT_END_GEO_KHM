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
            :title="
                'List Dept. Position Job Descriptions: ' +
                '\n' +
                departmentOrgName
            "
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto"
        >
            <template v-slot:content>
                <div style="width: 80rem">
                    <!-- Position Selected -->
                    <div class="col-6 lg:col-6 field">
                        <div class="field text-left">
                            <label for="name_en" class="text-sm font-bold"
                                >Position
                                <span class="p-erorr">*</span>
                            </label>
                            <Dropdown
                                showClear
                                v-model="selectedPositionDeptOrg"
                                :options="getPositionBaseDept"
                                optionLabel="deptPosName"
                                @update:modelValue="
                                    onSelectedPositionDeptOrg(
                                        selectedPositionDeptOrg
                                    )
                                "
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
                                                slotProps.value
                                                    .positionKhmerName ?? ""
                                            }})
                                        </div>
                                    </div>
                                    <span v-else class="text-sm">
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div
                                        class="flex align-items-center text-sm"
                                    >
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
                        </div>
                    </div>
                    <!-- List of Position JD Org Dept -->
                    <ListManageOrgPositionAssignJobDes
                        :position-dept-org="
                            getPositionBaseDept ? getPositionBaseDept : null
                        "
                        :positionDeptOrgJobDes="
                            getAllListJobPositionBaseDeptOrgById
                                ? getAllListJobPositionBaseDeptOrgById
                                : {}
                        "
                        :orgStrDeptPosId="positionDeptId ? positionDeptId : 0"
                        :showAddPosition="addPositionBtnStatus"
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

<script>
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
// import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import ListManageOrgPositionAssignJobDes from "./ListManageOrgPositionAssignJobDes.vue";
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";

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
            selectedPositionDeptOrg: null,
            addPositionBtnStatus: false,
            positionDeptId: 0,
        };
    },
    watch: {
        profile() {
            this.addressData.name = this.profile.name;
        },
    },
    props: {
        departmentOrgName: {
            type: String,
            defaultValue: "No Department",
            default() {
                return "";
            },
        },
        orgAssignDesStructureId: {
            type: Number,
            defaultValue: 0,
            default() {
                return 0;
            },
        },
    },
    components: {
        Spinner,
        // AjaxButton,
        ListManageOrgPositionAssignJobDes,
        PopOver,
        //   Dropdown
    },
    computed: {
        editing() {
            return this.addressData && this.addressData.id;
        },
    },
    mixins: [util, validation, manageOrgDeptPositionStructuresHelper],
    methods: {
        async savingAssignPositionDeptSubmitted() {
            await this.assignOrgDeptPositionActions();
            if (!this.hasAssignDeptPosition) {
                this.$emit("close");
            }
        },
        geoNameToTitleCase(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
        onSelectedPositionDeptOrg(positionDeptData) {
            try {
                const positionDeptId = parseInt(positionDeptData?.deptPosId);
                if (positionDeptId == null || positionDeptId == "") {
                    this.addPositionBtnStatus = false;
                }
                if (
                    positionDeptId !== null ||
                    positionDeptId !== undefined ||
                    typeof positionDeptId !== 'object'
                ) {
                    this.addPositionBtnStatus = true;
                    this.getAllReloadPositionJobDescriptionDeptOrg(
                        positionDeptId
                    );
                    this.positionDeptId = parseInt(positionDeptId)
                        ? parseInt(positionDeptId)
                        : 0;
                }
            } catch (e) {
                throw Error(e);
            }
        },
    },
    async mounted() {
        const getPosDeptOrgId = parseInt(this.orgAssignDesStructureId)
            ? parseInt(this.orgAssignDesStructureId)
            : 0;
        this.getAllReloadPositionDeptOrg(getPosDeptOrgId);
    },
};
</script>
