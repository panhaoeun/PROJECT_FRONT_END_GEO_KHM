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
            v-if="openHistoryOfficerWorkEmp"
            :title="`View history officers:` + ' ' + nameDepartmentOrg"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content>
                <div class="container">
                    <div
                        class="col-sm-12 col-md-12 employee-cv-info text-left"
                        style="width: 70rem"
                    >
                        <!-- History Officer Details -->
                        <div class="row">
                            <caption class="resumecaption">
                                History Officer Detail
                            </caption>
                            <div class="col-sm-12 col-md-12 rating-block">
                                <table class="table table-hover" width="100%">
                                    <tbody>
                                        <tr>
                                            <th>Employee Name</th>
                                            <td>
                                                <span
                                                    v-if="
                                                        openHistoryOfficerWorkEmp.tbl_Employee !==
                                                            null &&
                                                        openHistoryOfficerWorkEmp.tbl_Employee !==
                                                            undefined
                                                    "
                                                >
                                                    {{
                                                        String(
                                                            openHistoryOfficerWorkEmp
                                                                .tbl_Employee
                                                                .empEngName
                                                        ).toString() || "N/A"
                                                    }}</span
                                                >
                                                <span v-else>N/A</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Job Title</th>
                                            <td>
                                                <span
                                                    v-if="
                                                        openHistoryOfficerWorkEmp.tbl_org_position_geo_fence !==
                                                            null &&
                                                        openHistoryOfficerWorkEmp.tbl_org_position_geo_fence !==
                                                            undefined
                                                    "
                                                >
                                                    {{
                                                        String(
                                                            openHistoryOfficerWorkEmp
                                                                .tbl_org_position_geo_fence
                                                                .positionNameEng
                                                        ).toString() || "N/A"
                                                    }}</span
                                                >
                                                <span v-else>N/A</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Hired Date</th>
                                            <td>
                                                {{
                                                    formatDate(
                                                        openHistoryOfficerWorkEmp?.historyDateWork
                                                    ) || "N/A"
                                                }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- View Files -->
                        <div class="row">
                            <caption class="resumecaption">
                                Preview Files
                            </caption>
                            <div class="col-sm-12 col-md-12 rating-block">
                                <table class="table table-hover" width="100%">
                                    <tbody>
                                        <tr>
                                            <!-- <th>Pdf File</th> -->
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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

<!-- Script of edited projects -->
<script>
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
import manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper from "@/mixin/manage_org_structure_dept_new_features/manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper";
import manageOrgStrMgtPositionHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgStrMgtPositionHelper";
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
// import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import { mapActions } from "vuex";
export default {
    components: {
        Spinner,
        PopOver,
        // AjaxButton,
    },
    props: {
        orgHistoryOfficerWork: {
            type: Object,
            default() {
                return null;
            },
        },
        departmentName: {
            type: String,
            defaultValue: "",
            default: "No Department",
        },
    },
    computed: {
        nameDepartmentOrg() {
            return this.departmentName || "";
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
            openHistoryOfficerWorkEmp: null,
            hasBoardMgtPositionErrors: false,
            submittingBoardMgtData: false,
        };
    },
    async mounted() {
        if (this.orgHistoryOfficerWork) {
            this.openHistoryOfficerWorkEmp = {
                ...this.openHistoryOfficerWorkEmp,
                ...this.orgHistoryOfficerWork,
            };
        } else {
            this.openHistoryOfficerWorkEmp = {
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
        formatDate(date) {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;
            return [year, month, day].join("-");
        },
        ...mapActions("common", [
            "fetchLocation",
            "setToastMessage",
            "setToastError",
            "getRequest",
        ]),
    },
};
</script>
