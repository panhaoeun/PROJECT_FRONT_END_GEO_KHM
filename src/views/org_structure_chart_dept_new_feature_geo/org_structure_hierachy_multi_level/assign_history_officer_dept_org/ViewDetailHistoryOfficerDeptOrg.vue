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
                            <caption class="resumecaption font-semibold">
                                History Officer Detail:
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
                        <div
                            class="row"
                            v-if="
                                getViewDetailHistoryOfficer !== null ||
                                (getViewDetailHistoryOfficer !== undefined &&
                                    getViewDetailHistoryOfficer?.length > 0)
                            "
                        >
                            <caption class="resumecaption font-semibold">
                                Preview Files:
                            </caption>
                            <div class="col-sm-12 col-md-12 rating-block">
                                <table class="table table-hover" width="100%">
                                    <tbody
                                        v-for="(
                                            file, index
                                        ) in getViewDetailHistoryOfficer?.files"
                                        :key="index"
                                    >
                                        <tr>
                                            <div
                                                class="flex flex-wrap p-0 sm:p-2 gap-1"
                                            >
                                                <div
                                                    class="card m-0 px-2 flex flex-row border-1 item-center surface-border align-items-center gap-10 my-2 w-30rem"
                                                >
                                                    <!-- Image File -->
                                                    <div
                                                        class="ml-3 gap-10 align-content-center flex-wrap"
                                                        v-if="
                                                            checkFileType(
                                                                file
                                                            ) !== '.pdf' &&
                                                            checkFileType(
                                                                file
                                                            ) !== null &&
                                                            file?.fileName !==
                                                                'no_file.png'
                                                        "
                                                    >
                                                        <div
                                                            class="flex align-content-end flex-wrap cursor-pointer"
                                                        >
                                                            <Image
                                                                :alt="
                                                                    String(
                                                                        file?.pathName
                                                                    )
                                                                "
                                                                class="flex align-items-center justify-content-center border-round border-1"
                                                                preview
                                                                width="250"
                                                            >
                                                                <template
                                                                    #indicatoricon
                                                                >
                                                                    <i
                                                                        class="pi pi-search"
                                                                    ></i>
                                                                </template>
                                                                <template
                                                                    #image
                                                                >
                                                                    <img
                                                                        class="w-6rem border-rounded-lg"
                                                                        :src="
                                                                            processPathURLImages(
                                                                                file
                                                                            )
                                                                        "
                                                                        onerror="this.src='error.jpg';this.onerror='';"
                                                                        @error="
                                                                            onErrorPathImageFile
                                                                        "
                                                                        :alt="
                                                                            String(
                                                                                file?.pathName
                                                                            )
                                                                        "
                                                                    />
                                                                </template>
                                                                <template
                                                                    #preview="slotProps"
                                                                >
                                                                    <img
                                                                        :src="
                                                                            processPathURLImages(
                                                                                file
                                                                            )
                                                                        "
                                                                        :alt="
                                                                            String(
                                                                                file?.pathName
                                                                            )
                                                                        "
                                                                        :style="
                                                                            slotProps?.style
                                                                        "
                                                                        @click="
                                                                            slotProps?.onClick
                                                                        "
                                                                    />
                                                                </template>
                                                            </Image>
                                                            <span
                                                                class="flex align-items-center justify-content-center pl-2"
                                                            >
                                                                {{
                                                                    file?.pathName
                                                                        ? file?.pathName
                                                                        : "No File Name"
                                                                }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <!-- File -->
                                                    <div v-else class="ml-3">
                                                        <div
                                                            class="flex align-content-end flex-wrap cursor-pointer"
                                                            @click.prevent="
                                                                openLinkViewDetailPdfDocxFile()
                                                            "
                                                        >
                                                            <i
                                                                class="pi pi-file-pdf text-danger"
                                                                style="
                                                                    font-size: 2rem;
                                                                "
                                                            ></i>
                                                            <span
                                                                class="flex align-items-center justify-content-center pl-2 font-sembold"
                                                            >
                                                                {{
                                                                    file?.pathName
                                                                        ? file?.pathName
                                                                        : "No Name"
                                                                }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
import manageHistoryWorkJobDeptPosOrgHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageHistoryWorkJobDeptPosOrgHelper";
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
        manageHistoryWorkJobDeptPosOrgHelper,
    ],
    data() {
        return {
            loadingSpinnerPosition: false,
            openHistoryOfficerWorkEmp: null,
            hasBoardMgtPositionErrors: false,
            submittingBoardMgtData: false,
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
            isLoading: false,
            backupSrcErrorFile: require("@/assets/error.png"),
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
                id: 0,
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
        checkFileType(path) {
            if (path !== null || path !== undefined) {
                const stringData = String(path?.fileName).toString();
                if (
                    stringData.includes(".png") == true ||
                    stringData.includes(".jpg") === true ||
                    stringData.includes(".pdf") === true
                ) {
                    const getExtension = stringData
                        .split(/\.(?=[^/.]+$)/)
                        .pop();
                    if (getExtension !== null || getExtension !== undefined) {
                        const addDotName = getExtension;
                        let chars = [...addDotName];
                        chars.splice(0, 0, ".");
                        const typeOfFile = chars.join("");

                        return typeOfFile;
                    }
                    return false;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        processPathURLImages(path) {
            if (path) {
                return (
                    this?.ENV_HOST_PATH_FILE +
                    `uploads/files_org_dept/` +
                    String(path?.fileName).toString()
                );
            } else {
                return null;
            }
        },
        onErrorPathImageFile(err) {
            err.target.src = this.backupSrcErrorFile;
        },
        // Open File Pdf
        openLinkViewDetailPdfDocxFile() {
            console.log("sadsad");
        },
    },
};
</script>
