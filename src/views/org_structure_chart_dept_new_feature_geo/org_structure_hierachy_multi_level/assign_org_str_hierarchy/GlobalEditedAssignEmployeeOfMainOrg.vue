<template>
    <Toast />
    <form
        @submit.prevent="submittedDialogAssignEmployeeOrgDept"
        enctype="multipart/form-data"
    >
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinner">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="employeeAssignEdited"
            :title="`Assign Manager:` + ' ' + assignPositionName"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100 text-left"
        >
            <!-- Contents -->
            <template v-slot:content>
                <!-- Assign Managers -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label
                            :class="{
                                'p-error text-danger':
                                    !employeeAssignEdited?.department &&
                                    hasErrorNewOrgStr,
                            }"
                        >
                            Manager
                            <span class="p-error text-danger">*</span>
                        </label>
                        <Dropdown
                            :class="{
                                'p-error':
                                    !employeeAssignEdited?.department &&
                                    hasErrorNewOrgStr,
                            }"
                            showClear
                            :selectOnFocus="
                                employeeAssignEdited.empId ==
                                employeeAssignEdited.empId
                                    ? true
                                    : false
                            "
                            v-model="selectedAssignEmp"
                            :options="getEmpDataOrgDept"
                            optionLabel="geo_english_name"
                            empty="Empty manager"
                            filter
                            placeholder="Select a manager"
                            inputId="geo_english_name"
                            aria-describedby="dd-error"
                            :highlightOnSelect="false"
                            class="w-full md:w-30rem border-round-lg"
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
                                                        ?.full_kh_name ?? ""
                                                )
                                            )
                                        }}({{
                                            slotProps.value.full_latin_name ??
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
                                                        .full_kh_name ?? ""
                                                )
                                            )
                                        }}
                                        ({{
                                            slotProps.option.full_latin_name ??
                                            ""
                                        }})
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                        <!-- Position -->
                        <span
                            class="error flex"
                            v-if="
                                !employeeAssignEdited.department &&
                                hasErrorNewOrgStr
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "Assign Manager",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <!-- Assign Date -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label
                            :class="{
                                'p-error':
                                    !employeeAssignEdited?.orgDeptDateAss &&
                                    hasErrorNewOrgStr,
                            }"
                        >
                            Assign Date
                            <span class="p-error text-danger">*</span>
                        </label>
                        <Calendar
                            :class="{
                                'p-error':
                                    !employeeAssignEdited?.orgDeptDateAss &&
                                    hasErrorNewOrgStr,
                            }"
                            class="w-full md:w-30rem border-round-lg"
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            v-model="employeeAssignEdited.orgDeptDateAss"
                            showIcon
                            iconDisplay="input"
                        />
                        <!-- Position -->
                        <span
                            class="error flex"
                            v-if="
                                !employeeAssignEdited.orgDeptDateAss &&
                                hasErrorNewOrgStr
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "Assign date",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <!-- Assign Upload Files -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Upload File</label>
                        <FileUpload
                            mode="basic"
                            name="file[]"
                            ref="file"
                            :multiple="true"
                            :maxFileSize="500000000"
                            :fileLimit="5"
                            :showCancelButton="true"
                            :showUploadButton="true"
                            :previewWidth="60"
                            accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                            @select="onAdvancedUpload($event)"
                            chooseLabel="Browse"
                            class="border-round-lg text-sm w-30rem"
                        >
                            <template #empty>
                                <p>Drag and drop files to here to upload.</p>
                            </template>
                        </FileUpload>
                    </div>
                </div>
                <!-- Descriptions -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Descriptions </label>
                        <Textarea
                            class="border-round-lg text-sm w-30rem"
                            v-model="employeeAssignEdited.descriptionNoted"
                            type="text"
                            placeholder="Please enter descriptions"
                        />
                    </div>
                </div>
            </template>
            <!-- Footer -->
            <template v-slot:pop-footer>
                <div class="flex j-end gap-10">
                    <button
                        class="outline-btn plr-30 plr-sm-15 border-round"
                        aria-label="Employee cancel"
                        @click.prevent="$emit('close')"
                    >
                        {{ $t("addressPopup.cancel") }}
                    </button>
                    <ajax-button
                        class="primary-btn plr-30 plr-sm-15"
                        :fetching-data="submittingPositionData"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('projectOrgStr.thisOrgAssignEMp', {
                                type:
                                    editingAssEmployeeData > 0
                                        ? $t('addressPopup.assign')
                                        : $t('addressPopup.update'),
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
import geoDeptOrgProjects from "@/mixin/manage_geo_org_str/manageProjectNameHelper";
import manageGlobalOrgEmployeeHelper from "@/mixin/manage_geo_org_str/manageGlobalOrgEmployeeHelper";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
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
        departmentOrgName: {
            type: String,
            required: true,
            default() {
                return "No Department";
            },
        },
        assignEmployeeData: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        assignPositionName() {
            return this.assignEmployeeData?.department || "";
        },
        editingAssEmployeeData() {
            return (
                this.assignEmployeeData &&
                parseInt(this.assignEmployeeData.deptOrgStrId)
            );
        },
    },
    mixins: [
        geoDeptOrgProjects,
        util,
        validation,
        manageGlobalOrgEmployeeHelper,
        manageOrgStructureDeptNewFeatures,
    ],
    data() {
        return {
            loadingSpinner: false,
            employeeAssignEdited: null,
            fileUploadOrg: null,
            hasAssignPositionErrors: false,
            submittingPositionData: false,
            openDataAssEmp: [],
            selectedAssignEmp: null,
            descriptionDeptEmpAssign: null,
            hasErrorNewOrgStr: false,
            pathFile: {
                id: 0,
                user_name: "",
                position_id: "",
                image: "",
            },
        };
    },
    async mounted() {
        if (this.assignEmployeeData) {
            this.employeeAssignEdited = {
                ...this.employeeAssignEdited,
                ...this.assignEmployeeData,
            };
        } else {
            this.employeeAssignEdited = {
                id: 0,
                deptOrgStrId: 0,
                department: "",
                departmentKH: "",
                descriptionNoted: "",
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
        beforeFileUpload(rawFile) {
            if (
                (rawFile.type !== "image/jpeg" &&
                    rawFile.type !== "image/png") ||
                rawFile.type !== "application/pdf"
            ) {
                this.$toast.add({
                    severity: "error",
                    summary: "Picture must be JPG or PNG format!",
                    life: 3000,
                });
                return false;
            } else if (rawFile.size / 1056 / 1056 > 2) {
                this.$toast.add({
                    severity: "error",
                    summary: "Picture size can not exceed 2MB!",
                    life: 3000,
                });
                return false;
            }
            return true;
        },
        onAdvancedUpload(event) {
            if (!Array.isArray(event) || event !== null &&  (!Array.isArray(event.files) || !event.files.length > 0) ) {
                this.fileUploadOrg = event.files;
            }
            // let files = this.$refs.file.files[0];
            // this.fileUploadOrg = files;
            // console.log(files)
            // this.createImage(files);
        },
        createImage(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.pathFile.image = e.target.result;
            };
            reader.readAsDataURL(file);
            this.$toast.add({
                severity: "info",
                summary: "Upload File",
                detail: "File uploaded successfully!",
                life: 3000,
            });
        },
    },
};
</script>
