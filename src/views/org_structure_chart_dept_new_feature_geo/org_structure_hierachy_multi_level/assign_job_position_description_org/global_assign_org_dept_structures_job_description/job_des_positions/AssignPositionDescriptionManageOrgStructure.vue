<template>
    <div class="layout-content">
        <Toast />
        <Dialog
            v-model:visible="openDialogs"
            modal
            header="Add New Department Description"
            :style="{ width: '60rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            maximizable
        >
            <!-- Header Icons-->
            <template #closeicon>
                <i class="pi pi-times" @click.prevent="close"></i>
            </template>
            <!-- Contents -->
            <div class="address-popup popup-top-auto z-100">
                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                    <div class="col-12 lg:col-12 text-sm">
                        <div class="grid formgrid">
                            <div class="col-12 lg:col-12 text-sm">
                                <!--Add From Positions -->
                                <div
                                    class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
                                >
                                    <div
                                        class="pop-over-content p-20 p-sm-15 card"
                                    >
                                        <div class="grid formgrid">
                                            <!-- Job Title of the English Name -->
                                            <div class="col-6 field">
                                                <label
                                                    for="name_en"
                                                    class="text-sm"
                                                    :class="{
                                                        'p-invalid p-error':
                                                            v$
                                                                .addNewPosDesNameEngPositionOrgStr
                                                                .$invalid &&
                                                            submitted,
                                                    }"
                                                    >English Name<span
                                                        class="p-error"
                                                        >*</span
                                                    ></label
                                                >
                                                <InputText
                                                    id="english_name"
                                                    placeholder="Please enter english name"
                                                    type="text"
                                                    class="py-3 border-round-lg text-sm"
                                                    v-model="
                                                        v$
                                                            .addNewPosDesNameEngPositionOrgStr
                                                            .$model
                                                    "
                                                    :class="{
                                                        'p-invalid p-error':
                                                            v$
                                                                .addNewPosDesNameEngPositionOrgStr
                                                                .$invalid &&
                                                            submitted,
                                                    }"
                                                />
                                                <small
                                                    v-if="
                                                        (v$
                                                            .addNewPosDesNameEngPositionOrgStr
                                                            .$invalid &&
                                                            submitted) ||
                                                        v$
                                                            .addNewPosDesNameEngPositionOrgStr
                                                            .$pending.$response
                                                    "
                                                    class="p-error"
                                                    >{{
                                                        v$.addNewPosDesNameEngPositionOrgStr.required.$message.replace(
                                                            "Value",
                                                            "English Name"
                                                        ) ||
                                                        v$
                                                            .addNewPosDesNameEngPositionOrgStr
                                                            .$params.min
                                                    }}</small
                                                >
                                            </div>
                                            <!-- Job Title of the Khmer Name -->
                                            <div class="col-6 field">
                                                <label
                                                    for="name_en"
                                                    class="text-sm"
                                                    >Khmer Name</label
                                                >
                                                <InputText
                                                    id="khmer_name"
                                                    placeholder="Please enter khmer name"
                                                    type="text"
                                                    v-model="
                                                        addNewPosDesNameKhmerPositionOrgStr
                                                    "
                                                    class="py-3 border-round-lg text-sm"
                                                />
                                            </div>
                                            <!-- Upload Files Department Job Descriptions-->
                                            <div class="col-12 field">
                                                <label> Upload File </label>
                                                <div>
                                                    <FileUpload
                                                        name="demo[]"
                                                        url="/api/upload"
                                                        :multiple="true"
                                                        accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                                                        :maxFileSize="300000000"
                                                        @select="
                                                            onSelectedFiles
                                                        "
                                                        :fileLimit="5"
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
                                                                <div
                                                                    class="flex gap-2"
                                                                >
                                                                    <Button
                                                                        @click="
                                                                            chooseCallback()
                                                                        "
                                                                        icon="pi pi-images"
                                                                        rounded
                                                                        class="w-3rem h-3rem"
                                                                        outlined
                                                                    ></Button>
                                                                    <Button
                                                                        @click="
                                                                            clearCallback()
                                                                        "
                                                                        icon="pi pi-times"
                                                                        rounded
                                                                        outlined
                                                                        class="w-3rem h-3rem"
                                                                        severity="danger"
                                                                        :disabled="
                                                                            !files ||
                                                                            files.length ===
                                                                                0
                                                                        "
                                                                    ></Button>
                                                                </div>
                                                            </div>
                                                        </template>
                                                        <template
                                                            #content="{
                                                                files,
                                                                removeFileCallback,
                                                            }"
                                                        >
                                                            <div
                                                                v-if="
                                                                    files.length >
                                                                    0
                                                                "
                                                            >
                                                                <div
                                                                    class="flex flex-wrap p-0 sm:p-2 gap-1"
                                                                >
                                                                    <div
                                                                        v-for="(
                                                                            file,
                                                                            index
                                                                        ) of files"
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
                                                                                :alt="
                                                                                    file.name
                                                                                "
                                                                                :src="
                                                                                    file.objectURL
                                                                                "
                                                                                width="100"
                                                                                height="50"
                                                                            />
                                                                        </div>
                                                                        <div
                                                                            v-else
                                                                            class="ml-3"
                                                                        >
                                                                            <i
                                                                                class="pi pi-file-pdf text-danger"
                                                                                style="
                                                                                    font-size: 2rem;
                                                                                "
                                                                            ></i>
                                                                        </div>
                                                                        <span
                                                                            class="font-semibold text-sm"
                                                                            >{{
                                                                                file.name
                                                                            }}</span
                                                                        >
                                                                        <div
                                                                            class="text-red-500"
                                                                        >
                                                                            ({{
                                                                                formatSize(
                                                                                    file.size
                                                                                )
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
                                                                <p
                                                                    class="mt-4 mb-0"
                                                                >
                                                                    Drag and
                                                                    drop files
                                                                    to here to
                                                                    upload.
                                                                </p>
                                                            </div>
                                                        </template>
                                                    </FileUpload>
                                                </div>
                                            </div>
                                            <!-- Descriptions -->
                                            <div class="col-12 field">
                                                <label
                                                    for="description_org_structure"
                                                    >Descriptions</label
                                                >
                                                <Editor
                                                    v-model="
                                                        addNewPosDesDescriptionPositionOrgStr
                                                    "
                                                    editorStyle="height: 320px;"
                                                    placeholder="Please description of job department"
                                                >
                                                    <template v-slot:toolbar>
                                                        <span
                                                            class="ql-formats"
                                                        >
                                                            <!-- Add font size dropdown -->
                                                            <select
                                                                class="ql-size"
                                                            >
                                                                <option
                                                                    value="small"
                                                                ></option>
                                                                <!-- Note a missing, thus falsy value, is used to reset to default -->
                                                                <option
                                                                    selected
                                                                ></option>
                                                                <option
                                                                    value="large"
                                                                ></option>
                                                                <option
                                                                    value="huge"
                                                                ></option>
                                                            </select>
                                                            <button
                                                                v-tooltip.bottom="
                                                                    'Bold'
                                                                "
                                                                class="ql-bold"
                                                            ></button>
                                                            <button
                                                                v-tooltip.bottom="
                                                                    'Italic'
                                                                "
                                                                class="ql-italic"
                                                            ></button>
                                                            <button
                                                                v-tooltip.bottom="
                                                                    'Underline'
                                                                "
                                                                class="ql-underline"
                                                            ></button>
                                                        </span>
                                                    </template>
                                                </Editor>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer -->
            <template #footer>
                <Button
                    label="Cancel"
                    text
                    class="w-10rem border-round-lg"
                    severity="success"
                    @click.prevent="close"
                    autofocus
                />
                <Button
                    outlined
                    severity="secondary"
                    class="w-10rem border-round-lg"
                    :label="loadingBtnEdit ? 'Saving...' : 'Create'"
                    :loading="loadingBtnEdit"
                    @click.prevent="
                        handleEditJobDescriptionsSubmit(!v$.$invalid)
                    "
                    autofocus
                />
            </template>
        </Dialog>
    </div>
</template>

<!-- Scripts of org-structure management base projects -->
<script>
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
export default {
    props: {
        orgStrNameEditedId: {
            type: Object,
            required: true,
            default: () => {},
        },
        dialog: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    computed: {
        openDialogs() {
            return this.dialog ? this.dialog : false;
        },
        getOrgStructureAdd() {
            const getOrgStrData = this.orgStrNameEditedId
                ? this.orgStrNameEditedId
                : {};
            if (
                (getOrgStrData !== null && getOrgStrData !== undefined) ||
                typeof getOrgStrData !== "object"
            ) {
                return getOrgStrData;
            } else {
                throw Error(
                    "Please selected org-structure for create positions"
                );
            }
        },
    },
    setup: () => ({ v$: useVuelidate() }),
    //Validations
    validations() {
        return {
            addNewPosDesNameEngPositionOrgStr: {
                required,
                minLength: minLength(3),
            },
        };
    },
    mixins: [managerJobPositionOrgStructureProjectLevelZeroHelper],
    data() {
        return {
            loadingBtnEdit: false,
            loadingAddMoreFromPositionDes: false,
            submitted: false,
            addNewPosDesNameEngPositionOrgStr: "",
            addNewPosDesNameKhmerPositionOrgStr: "",
            addNewPosDesDescriptionPositionOrgStr: "",
            dyNamicAddNewFrmJobDes: [
                {
                    editNameEngProjectOrgStr: "",
                    editNameKhmerProjectOrgStr: "",
                    editDescriptionProjectOrgStr: "",
                },
            ],
            addJobDescType: "Position",
        };
    },

    methods: {
        // Upload Files
        
        close() {
            this.$emit("close-dialog");
        },
        onClickAddMorePositionDesOrgStructures() {
            try {
                this.loadingAddMoreFromPositionDes = true;
                setTimeout(() => {
                    this.loadingAddMoreFromPositionDes = false;
                    this.state.dyNamicAddNewFrmJobDes.push({
                        editNameEngProjectOrgStr: "",
                        editNameKhmerProjectOrgStr: "",
                        editDescriptionProjectOrgStr: "",
                    });
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        removeJobDesOrgStructureByKey(index) {
            this.state.dyNamicAddNewFrmJobDes.splice(index, 1);
        },
        resetForm() {
            (this.state.editNameEngProjectOrgStr = ""),
                (this.proCategoryNameKh = ""),
                (this.submitted = false);
        },
    },
};
</script>
