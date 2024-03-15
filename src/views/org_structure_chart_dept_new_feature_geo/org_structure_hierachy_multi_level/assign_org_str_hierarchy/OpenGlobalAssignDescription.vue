<template>
    <form>
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinner">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Assign Descriptions -->
        <pop-over
            v-if="editOrgStrData"
            @close="$emit('close')"
            :title="
                'Assign Description Organization Structure:' + '\t' + orgStrName
            "
            elem-id="edit-org-structure-pop-over"
            :layer="true"
            class="address-popup popup-top-auto text-left"
        >
            <!-- Contents -->
            <template v-slot:content>
                <div class="flex start mlr--5">
                    <div class="input-wrap">
                        <div class="col-lg-12 col-md-12 flex column h-full">
                            <TabView
                                v-model:activeIndex="activeDialogPositionId"
                                class="text-sm"
                                style="width: 60rem"
                            >
                                <!--Managements Job Descriptions-->
                                <TabPanel header="Department Description">
                                    <list-department-descriptions
                                        :orgStructDeptJobDeptId="
                                            orgAssignDesStructureId
                                                ? orgAssignDesStructureId
                                                : 0
                                        "
                                    />
                                </TabPanel>
                                <!--Managements Job Descriptions-->
                                <TabPanel header="Position Descriptions">
                                    <list-position-description-org
                                        :orgStructDeptJobPositionId="
                                            orgAssignDesStructureId
                                                ? orgAssignDesStructureId
                                                : 0
                                        "
                                    />
                                </TabPanel>
                            </TabView>
                        </div>
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
                </div>
            </template>
        </pop-over>
    </form>
</template>

<!-- Script of edited org-structures chart multi-level -->
<script>
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
// import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import { mapActions } from "vuex";
// Assign List org-structures
import ListDepartmentDescriptions from "../assign_job_position_description_org/ListManageOrgJobDeptDescriptionAssignNew";
import ListPositionDescriptionOrg from "../assign_job_position_description_org/ListManageOrgPositionAssignNew";
export default {
    components: {
        Spinner,
        PopOver,
        // AjaxButton,
        ListDepartmentDescriptions,
        ListPositionDescriptionOrg,
    },
    props: {
        orgAssignDesStructureId: {
            type: Number,
            required: true,
            defaultValue: 0,
        },
        editOrgStrDeptName: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        orgStrName() {
            return this.editOrgStrDeptName?.department || "";
        },
        editing() {
            return this.editOrgStrDeptName && this.editOrgStrDeptName.id;
        },
    },
    mixins: [util, validation],
    data() {
        return {
            loadingSpinner: false,
            editOrgStrData: null,
            getOrgStrParentDept: [],
            selectedParentDept: null,
            hasProvinceErrors: false,
            submittingOrgStrData: false,
        };
    },
    async mounted() {
        if (this.editOrgStrDeptName) {
            this.editOrgStrData = {
                ...this.editOrgStrData,
                ...this.editOrgStrDeptName,
            };
        } else {
            this.editOrgStrData = {
                id: 0,
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
        // Submited Actions for Multiple
        submittedDialogEditGeoProjectStr() {
            this.loadingSpinner = true;
        },
    },
};
</script>
