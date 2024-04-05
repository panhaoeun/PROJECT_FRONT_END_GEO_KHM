<template>
    <form @submit.prevent="saveModifyJobDescriptionBaseOrgStructureId">
        <Toast />
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
            :title="`Edit Dept. Department Descriptions:` + ' ' + namePosition"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content style="width: 100px">
                <!-- Position English Name -->
                <div
                    class="flex start mlr--5"
                    :class="{
                        invalid:
                            !getPosEditJobDes?.jobDesEng && hasJobDescErrors,
                    }"
                >
                    <div
                        class="input-wrap mlr-5"
                        :class="{
                            invalid:
                                !getPosEditJobDes?.jobDesEng &&
                                hasJobDescErrors,
                        }"
                    >
                        <label
                            :class="{
                                'p-error':
                                    !getPosEditJobDes.jobDesEng &&
                                    hasJobDescErrors,
                            }"
                        >
                            English Name
                            <span class="p-error">*</span>
                        </label>
                        <InputText
                            style="width: 50rem"
                            class="border-round-lg text-sm"
                            v-model.number="getPosEditJobDes.jobDesEng"
                            type="text"
                            placeholder="Job title of the english name"
                        />
                        <span
                            class="error"
                            v-if="
                                !getPosEditJobDes.jobDesEng && hasJobDescErrors
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
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Khmer Name </label>
                        <InputText
                            style="width: 50rem"
                            class="border-round-lg text-sm"
                            v-model.number="getPosEditJobDes.jobDesKhmer"
                            type="text"
                            placeholder="Job title of the khmer name"
                        />
                    </div>
                </div>

                <!-- Upload Files -->
                <!-- <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Upload File </label>
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
                </div> -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Description </label>
                        <Editor
                            v-model="getPosEditJobDes.jobDesNoted"
                            editorStyle="height: 320px; width: 50rem"
                            placeholder="Please description of job department"
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
import manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper from "@/mixin/manage_org_structure_dept_new_features/manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper";
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
        openEditBoardJobDes: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        namePosition() {
            return this.openEditBoardJobDes?.jobDesEng || "";
        },
        editing() {
            return (
                this.openEditBoardJobDes && this.openEditBoardJobDes.jobDesEng
            );
        },
    },
    mixins: [
        manageJobPositionDepartmentDescriptionByOrgStrGlobalHelper,
        util,
        validation,
    ],
    data() {
        return {
            loadingSpinnerPosition: false,
            getPosEditJobDes: null,
            hasJobDescErrors: false,
            dataEmailData: "dataEmailData",
            submittingJobDesc: false,
            files: [],
            totalSize: 0,
            totalSizePercent: 0,
        };
    },
    async mounted() {
        if (this.openEditBoardJobDes) {
            this.getPosEditJobDes = {
                ...this.getPosEditJobDes,
                ...this.openEditBoardJobDes,
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
            this.files = event.files;
            this.files.forEach((file) => {
                this.totalSize += parseInt(this.formatSize(file.size));
            });
        },
        // uploadEvent(callback) {
        //     this.totalSizePercent = this.totalSize / 10;
        //     callback();
        // },
        onTemplatedUpload() {
            console.log("dDD");
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
