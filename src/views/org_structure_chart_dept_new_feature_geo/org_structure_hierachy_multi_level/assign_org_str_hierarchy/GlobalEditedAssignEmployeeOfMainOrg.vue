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
                    <div class="input-wrap mlr-5" style="width: 50rem">
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
                            class="w-full border-round-lg"
                            style="width: 50rem"
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
                    <div class="input-wrap mlr-5" style="width: 50rem">
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
                            class="w-full border-round-lg"
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            v-model="employeeAssignEdited.orgDeptDateAss"
                            showIcon
                            iconDisplay="input"
                            style="width: 50rem"
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
                        <div style="width: 50rem">
                            <FileUpload
                                style="width: 50rem"
                                name="demo[]"
                                url="/api/upload"
                                :multiple="true"
                                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                                :maxFileSize="300000000"
                                @select="onSelectedFiles"
                                :fileLimit="5"
                                :pt="{
                                    style: 'width: 30rem',
                                }"
                                :previewWidth="500"
                            >
                                <template
                                    #header="{
                                        chooseCallback,
                                        clearCallback,
                                        files,
                                    }"
                                >
                                    <div
                                        class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2"
                                    >
                                        <div class="flex gap-2">
                                            <Button
                                                @click="chooseCallback()"
                                                icon="pi pi-images"
                                                rounded
                                                outlined
                                            ></Button>
                                            <Button
                                                @click="clearCallback()"
                                                icon="pi pi-times"
                                                rounded
                                                outlined
                                                severity="danger"
                                                :disabled="
                                                    !files || files.length === 0
                                                "
                                            ></Button>
                                        </div>
                                    </div>
                                </template>
                                <template
                                    #content="{ files, removeFileCallback }"
                                >
                                    <div v-if="files.length > 0">
                                        <div
                                            class="flex flex-wrap p-0 sm:p-2 gap-1"
                                        >
                                            <div
                                                v-for="(file, index) of files"
                                                :key="
                                                    file.name +
                                                    file.type +
                                                    file.size
                                                "
                                                class="card m-0 px-2 flex flex-row border-1 item-center surface-border align-items-center gap-2 w-full"
                                            >
                                                <div
                                                    class="ml-3"
                                                    v-if="
                                                        file.type !==
                                                        'application/pdf'
                                                    "
                                                >
                                                    <img
                                                        role="presentation"
                                                        :alt="file.name"
                                                        :src="file.objectURL"
                                                        width="100"
                                                        height="50"
                                                    />
                                                </div>
                                                <div v-else class="ml-3">
                                                    <i
                                                        class="pi pi-file-pdf text-danger"
                                                        style="font-size: 2rem"
                                                    ></i>
                                                </div>
                                                <span
                                                    class="font-semibold text-sm"
                                                    >{{ file.name }}</span
                                                >
                                                <div class="text-red-500">
                                                    ({{
                                                        formatSize(file.size)
                                                    }})
                                                </div>
                                                <!-- Button remove -->
                                                <Button
                                                    icon="pi pi-times"
                                                    @click="
                                                        onRemoveTemplatingFile(
                                                            file,
                                                            removeFileCallback,
                                                            index
                                                        )
                                                    "
                                                    rounded
                                                    text
                                                    severity="danger"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template #empty>
                                    <div
                                        class="flex align-items-center justify-content-center flex-column"
                                    >
                                        <i
                                            class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400"
                                        />
                                        <p class="mt-4 mb-0">
                                            Drag and drop files to here to
                                            upload.
                                        </p>
                                    </div>
                                </template>
                            </FileUpload>
                        </div>
                    </div>
                </div>
                <!-- Descriptions -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Descriptions </label>
                        <Editor
                            v-model="employeeAssignEdited.descriptionNoted"
                            editorStyle="height: 320px; width: 50rem"
                        >
                            <template v-slot:toolbar>
                                <span class="ql-formats">
                                    <!-- Add font size dropdown -->
                                    <select class="ql-size">
                                        <option value="small"></option>
                                        <!-- Note a missing, thus falsy value, is used to reset to default -->
                                        <option selected></option>
                                        <option value="large"></option>
                                        <option value="huge"></option>
                                    </select>
                                    <button
                                        v-tooltip.bottom="'Bold'"
                                        class="ql-bold"
                                    ></button>
                                    <button
                                        v-tooltip.bottom="'Italic'"
                                        class="ql-italic"
                                    ></button>
                                    <button
                                        v-tooltip.bottom="'Underline'"
                                        class="ql-underline"
                                    ></button>
                                </span>
                            </template>
                        </Editor>
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
        onRemoveTemplatingFile(file, removeFileCallback, index) {
            removeFileCallback(index);
            this.totalSize -= parseInt(this.formatSize(file.size));
            this.totalSizePercent = this.totalSize / 10;
        },
        onClearTemplatingUpload(clear) {
            clear();
            this.totalSize = 0;
            this.totalSizePercent = 0;
        },
        onSelectedFiles(event) {
            console.log(event.files);
            this.fileUploadOrg = event.files;
            this.fileUploadOrg.forEach((file) => {
                this.totalSize += parseInt(this.formatSize(file.size));
            });
        },
        // uploadEvent(callback) {
        //     this.totalSizePercent = this.totalSize / 10;
        //     callback();
        // },
        formatSize(bytes) {
            const k = 1024;
            const dm = 3;
            const sizes = this.$primevue.config.locale.fileSizeTypes;

            if (bytes === 0) {
                return `0 ${sizes[0]}`;
            }

            const i = Math.floor(Math.log(bytes) / Math.log(k));
            const formattedSize = parseFloat(
                (bytes / Math.pow(k, i)).toFixed(dm)
            );
            return formattedSize + "\n" + "KB";
        },
    },
};
</script>
