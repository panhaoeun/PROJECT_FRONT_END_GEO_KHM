<template>
    <Toast />
    <form @submit.prevent="saveModifyJobDescriptionBaseOrgStructureId">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div
                class="spinner-wrapper flex layer-white"
                v-if="loadingSpinnerPosition"
            >
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="getPosEditJobDes"
            :title="
                `Edit Dept. Position Job Descriptions:` + ' ' + namePosition
            "
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content>
                <!-- Position Name -->
                <div
                    class="flex text-left start mlr--5"
                    :class="{
                        invalid:
                            !getPosEditJobDes?.positionId && hasJobDescErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        style="width: 50rem"
                        :class="{
                            invalid:
                                !getPosEditJobDes?.positionId &&
                                hasJobDescErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !getPosEditJobDes.positionId &&
                                    hasJobDescErrors,
                            }"
                        >
                            Position
                            <span class="p-error">*</span>
                        </label>
                        <Dropdown
                            showClear
                            v-model="selectedPositionDesDept"
                            :options="positionObjDeptOrg"
                            optionLabel="deptPosName"
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
                                            slotProps.value.positionKhmerName ??
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
                        <span
                            class="error"
                            v-if="
                                !getPosEditJobDes.posDesNameEng &&
                                hasJobDescErrors
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "Job title of the english name",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <!-- Position English Name -->
                <div
                    class="flex text-left start mlr--5"
                    :class="{
                        invalid:
                            !getPosEditJobDes?.posDesNameEng &&
                            hasJobDescErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        style="width: 50rem"
                        :class="{
                            invalid:
                                !getPosEditJobDes?.posDesNameEng &&
                                hasJobDescErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !getPosEditJobDes.posDesNameEng &&
                                    hasJobDescErrors,
                            }"
                        >
                            English Name
                            <span class="p-error">*</span>
                        </label>
                        <InputText
                            class="border-round-lg text-sm"
                            v-model.number="getPosEditJobDes.posDesNameEng"
                            type="text"
                            placeholder="Job title of the english name"
                        />
                        <span
                            class="error"
                            v-if="
                                !getPosEditJobDes.posDesNameEng &&
                                hasJobDescErrors
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "Job title of the english name",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <!-- Job Description Khmer Name -->
                <div class="flex start text-left mlr--5">
                    <div class="input-wrap mlr-5" style="width: 50rem">
                        <label> Khmer Name </label>
                        <InputText
                            class="border-round-lg text-sm"
                            v-model.number="getPosEditJobDes.posDesNameKh"
                            type="text"
                            placeholder="Job title of the khmer name"
                        />
                    </div>
                </div>
                <!-- Assign Upload Files -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5 text-left">
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
                <div class="flex start text-left mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Noted </label>
                        <Editor
                            v-model="getPosEditJobDes.posNotedDes"
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
                        aria-label="Country cancel"
                        @click.prevent="$emit('close')"
                    >
                        {{ $t("addressPopup.cancel") }}
                    </button>
                    <ajax-button
                        class="primary-btn plr-30 plr-sm-15"
                        :fetching-data="submittingJobDesc"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('projectOrgStr.thisJobDescription', {
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
import manageOrgDeptJobDesPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionJobDescriptionDeptOrgHelper";
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
        positionObjDeptOrg: {
            type: Object,
            default() {
                return null;
            },
        },
        openEditPositionJobDes: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        namePosition() {
            return this.openEditPositionJobDes?.posDesNameEng || "";
        },
        editing() {
            return (
                this.openEditPositionJobDes &&
                this.openEditPositionJobDes.posDesNameEng
            );
        },
    },
    mixins: [manageOrgDeptJobDesPositionStructuresHelper, util, validation],
    data() {
        return {
            loadingSpinnerPosition: false,
            getPosEditJobDes: null,
            hasJobDescErrors: false,
            submittingJobDesc: false,
            selectedPositionDesDept: null,
            fileUploadEditPosDesOrg: []
        };
    },
    async mounted() {
        if (this.openEditPositionJobDes) {
            this.getPosEditJobDes = {
                ...this.getPosEditJobDes,
                ...this.openEditPositionJobDes,
            };
        } else {
            this.getPosEditJobDes = {
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
        geoNameToTitleCase(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
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
            this.fileUploadEditPosDesOrg = event.files;
            this.fileUploadEditPosDesOrg.forEach((file) => {
                this.totalSize += parseInt(this.formatSize(file.size));
            });
        },
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
