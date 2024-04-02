<template>
    <Toast />
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Add New Employee
            </h2>
            <Button
                label="Back"
                icon="pi pi-arrow-left"
                iconPos="left"
                class="text-sm h-2.3rem w-10rem"
                @click.prevent="
                    $router.push(
                        '/admin/admin-management-employee-assign/list-hrm-assign-employee-role-module'
                    )
                "
            />
        </div>
        <!--Create Products-->
        <el-card class="box-card px-6 py-6">
            <!-- Toast Alert -->
            <Toast />
            <!-- Tabs -->
            <form
                enctype="multipart/form-data"
                @submit.prevent="handleAddNewEmpAdminSubmit(!v$.$invalid)"
            >
                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                    <div
                        class="col-12 lg:col-12 justify-content-center items-center"
                    >
                        <!-- Step Elements -->
                        <el-steps
                            :active="active"
                            align-center
                            :space="200"
                            process-status="error"
                            finish-status="success"
                        >
                            <!-- Personal Information -->
                            <el-step>
                                <template #icon>
                                    <i
                                        class="pi pi-user text-red-500 text-center"
                                        style="font-size: 1.5rem"
                                    ></i>
                                </template>
                                <template #title>
                                    <p class="text-primary">Profile</p>
                                </template>
                                <template #description> </template>
                            </el-step>
                            <!-- Experience Information -->
                            <el-step>
                                <template #icon>
                                    <i
                                        class="pi pi-briefcase text-red-500 text-center"
                                        style="font-size: 1.5rem"
                                    ></i>
                                </template>
                                <template #title>
                                    <p class="text-primary">Experience</p>
                                </template>
                                <template #description> </template>
                            </el-step>
                            <!-- Experience Information -->
                            <el-step>
                                <template #icon>
                                    <i
                                        class="pi pi-book text-red-500 text-center"
                                        style="font-size: 1.5rem"
                                    ></i>
                                </template>
                                <template #title>
                                    <p class="text-primary">Education</p>
                                </template>
                                <template #description> </template>
                            </el-step>
                            <!-- Skill Information -->
                            <el-step>
                                <template #icon>
                                    <i
                                        class="pi pi-list text-red-500 text-center"
                                        style="font-size: 1.5rem"
                                    ></i>
                                </template>
                                <template #title>
                                    <p class="text-primary">Skill</p>
                                </template>
                                <template #description> </template>
                            </el-step>
                            <!-- Languages Information -->
                            <el-step>
                                <template #icon>
                                    <i
                                        class="pi pi-language text-red-500 text-center"
                                        style="font-size: 1.5rem"
                                    ></i>
                                </template>
                                <template #title>
                                    <p class="text-primary">Languages</p>
                                </template>
                                <template #description> </template>
                            </el-step>
                            <!-- Hobbies Information -->
                            <el-step>
                                <template #icon>
                                    <i
                                        class="pi pi-sync text-red-500 text-center"
                                        style="font-size: 1.5rem"
                                    ></i>
                                </template>
                                <template #title>
                                    <p class="text-primary">Hobbies</p>
                                </template>
                                <template #description> </template>
                            </el-step>
                            <!-- Reference Information -->
                            <el-step>
                                <template #icon>
                                    <i
                                        class="pi pi-user-plus text-red-500 text-center"
                                        style="font-size: 1.5rem"
                                    ></i>
                                </template>
                                <template #title>
                                    <p class="text-primary">Reference</p>
                                </template>
                                <template #description> </template>
                            </el-step>
                            <!-- Reviews Information -->
                            <el-step>
                                <template #icon>
                                    <i
                                        class="pi pi-eye text-red-500 text-center"
                                        style="font-size: 1.5rem"
                                    ></i>
                                </template>
                                <template #title>
                                    <p class="text-primary">Review</p>
                                </template>
                                <template #description> </template>
                            </el-step>
                        </el-steps>

                        <!-- Personal Informational -->
                        <transition name="slide-fade">
                            <sections v-show="active === 0">
                                <div class="grid formgrid mt-6 container">
                                    <!-- Full Name in Khmer -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Khmer -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm"
                                                >{{
                                                    $t(
                                                        "userinfo.fullNameInKhmer"
                                                    )
                                                }}<span class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <InputText
                                                id="userMSNameKh"
                                                placeholder="English Name"
                                                type="text"
                                                class="py-3 border-round-lg text-sm"
                                                v-model="v$.userMSNameKh.$model"
                                                :class="{
                                                    'p-invalid p-error':
                                                        v$.userMSNameKh
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                            />
                                            <small
                                                v-if="
                                                    (v$.userMSNameKh.$invalid &&
                                                        submitted) ||
                                                    v$.userMSNameKh.$pending
                                                        .$response
                                                "
                                                class="p-error"
                                                >{{
                                                    v$.userMSNameKh.required.$message.replace(
                                                        "Value",
                                                        "Full Name in Khmer"
                                                    ) ||
                                                    v$.userMSNameKh.$params.min
                                                }}
                                            </small>
                                        </div>
                                    </div>
                                    <!--Full Name in Latin -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm"
                                                >{{ $t("userinfo.fullNameInEn")
                                                }}<span class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <InputText
                                                id="product_name"
                                                placeholder="Khmer Name"
                                                type="text"
                                                class="py-3 border-round-lg text-sm"
                                                v-model="
                                                    v$.userMSNameEng.$model
                                                "
                                                :class="{
                                                    'p-invalid p-error':
                                                        v$.userMSNameEng
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                            />
                                            <small
                                                v-if="
                                                    (v$.userMSNameEng
                                                        .$invalid &&
                                                        submitted) ||
                                                    v$.userMSNameEng.$pending
                                                        .$response
                                                "
                                                class="p-error"
                                                >{{
                                                    v$.userMSNameEng.required.$message.replace(
                                                        "Value",
                                                        "Full Name in English"
                                                    ) ||
                                                    v$.userMSNameEng.$params.min
                                                }}</small
                                            >
                                        </div>
                                    </div>
                                    <!--Full Name in Latin -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm"
                                                >Email</label
                                            >
                                            <InputText
                                                id="email_add"
                                                placeholder="Email"
                                                type="email"
                                                class="py-3 border-round-lg text-sm"
                                                v-model="emailMSUser"
                                            />
                                        </div>
                                    </div>
                                    <!--Phone number -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm"
                                                >Phone Number<span
                                                    class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <InputText
                                                type="number"
                                                :useGrouping="false"
                                                :min="0"
                                                id="product_name"
                                                placeholder="Phone Number"
                                                @keypress="inputOnlyNumber"
                                                class="py-3 border-round-lg text-sm"
                                                v-model="
                                                    v$.userMSPhoneNum.$model
                                                "
                                                :class="{
                                                    'p-invalid p-error':
                                                        v$.userMSPhoneNum
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                            />
                                            <small
                                                v-if="
                                                    (v$.userMSPhoneNum
                                                        .$invalid &&
                                                        submitted) ||
                                                    v$.userMSPhoneNum.$pending
                                                        .$response
                                                "
                                                class="p-error"
                                                >{{
                                                    v$.userMSPhoneNum.required.$message.replace(
                                                        "Value",
                                                        "Phone Number"
                                                    ) ||
                                                    v$.userMSPhoneNum.$params
                                                        .min
                                                }}
                                            </small>
                                        </div>
                                    </div>

                                    <!-- Date of Birth -->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm"
                                                >Date Of Birth<span
                                                    class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <Calendar
                                                placeholder="Date of birth"
                                                type="text"
                                                class="border-round-lg text-sm"
                                                v-model="
                                                    v$.userDateOfBirth.$model
                                                "
                                                :class="{
                                                    'p-invalid p-error':
                                                        v$.userDateOfBirth
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                            />
                                            <small
                                                v-if="
                                                    (v$.userDateOfBirth
                                                        .$invalid &&
                                                        submitted) ||
                                                    v$.userDateOfBirth.$pending
                                                        .$response
                                                "
                                                class="p-error"
                                                >{{
                                                    v$.userDateOfBirth.required.$message.replace(
                                                        "Value",
                                                        "Date of Birth"
                                                    ) ||
                                                    v$.userDateOfBirth.$params
                                                        .min
                                                }}
                                            </small>
                                        </div>
                                    </div>
                                    <!-- Started Dated -->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm"
                                                >Start Date<span class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <Calendar
                                                placeholder="Start Date"
                                                type="text"
                                                class="border-round-lg text-sm"
                                                v-model="
                                                    v$.userStartDate.$model
                                                "
                                                :class="{
                                                    'p-invalid p-error':
                                                        v$.userStartDate
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                            />
                                            <small
                                                v-if="
                                                    (v$.userStartDate
                                                        .$invalid &&
                                                        submitted) ||
                                                    v$.userStartDate.$pending
                                                        .$response
                                                "
                                                class="p-error"
                                                >{{
                                                    v$.userStartDate.required.$message.replace(
                                                        "Value",
                                                        "Start Date"
                                                    ) ||
                                                    v$.userStartDate.$params.min
                                                }}
                                            </small>
                                        </div>
                                    </div>
                                    <!-- Gender -->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="roles" class="text-sm"
                                                >Gender<span class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <div class="flex flex-column">
                                                <Dropdown
                                                    v-model="selectedUserGender"
                                                    class="border-round-lg text-sm"
                                                    :options="userGender"
                                                    optionLabel="name"
                                                    placeholder="Select a Gender"
                                                    :class="{
                                                        'p-invalid p-error':
                                                            v$
                                                                .selectedUserGender
                                                                .$invalid &&
                                                            submitted,
                                                    }"
                                                />
                                                <small
                                                    v-if="
                                                        (v$.selectedUserGender
                                                            .$invalid &&
                                                            submitted) ||
                                                        v$.selectedUserGender
                                                            .$pending.$response
                                                    "
                                                    class="p-error"
                                                    >{{
                                                        v$.selectedUserGender.required.$message.replace(
                                                            "Value",
                                                            "Gender"
                                                        ) ||
                                                        v$.selectedUserGender
                                                            .$params.min
                                                    }}
                                                </small>
                                            </div>
                                        </div>
                                    </div>

                                    <!--=========User Address===========-->
                                    <div class="col-12 col-lg-12 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm"
                                                >Address</label
                                            >
                                            <Textarea
                                                id="userAddress01"
                                                placeholder="Address"
                                                type="text"
                                                class="py-3 border-round-lg text-sm"
                                                v-model="userAddress01"
                                            />
                                        </div>
                                    </div>
                                    <!--=========User Address===========-->
                                    <!-- Upload Profile -->
                                    <div class="col-12 field">
                                        <!--Category Logo -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm"
                                                >Employee Profile<span
                                                    class="p-error"
                                                    >*</span
                                                >
                                            </label>
                                            <!-- Upload Files -->
                                            <el-upload
                                                action="#"
                                                list-type="picture-card"
                                                :on-preview="
                                                    handlePictureCardPreview
                                                "
                                                :on-remove="handleRemove"
                                                :auto-upload="false"
                                                :on-change="handleChangeUser"
                                                :class="objClassUserPer"
                                                :file-list="fileList"
                                                v-model="file"
                                                ref="file"
                                                :limit="1"
                                                accept=".jpg, .png, .jpeg"
                                            >
                                                <i
                                                    class="pi pi-cloud-upload"
                                                    style="font-size: 2rem"
                                                ></i>
                                            </el-upload>
                                            <div class="flex flex-column">
                                                <small
                                                    class="p-error"
                                                    v-if="errMessageUploadFile"
                                                >
                                                    {{ errMessageUploadFile }}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <!--User Noted -->
                                    <div class="col-12 col-lg-12 field">
                                        <div class="field">
                                            <label for="">Descriptions</label>
                                            <Editor
                                                editorStyle="height: 400px"
                                                id="userUserDescription"
                                                placeholder="Descriptions"
                                                type="text"
                                                class="py-3 border-round-lg"
                                                v-model="userUserDescription"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <!-- Button Next -->
                                <div
                                    class="flex justify-content-end flex-wrap px-4"
                                >
                                    <Button
                                        label="Next"
                                        icon="pi pi-arrow-circle-right"
                                        iconPos="left"
                                        raised
                                        outlined
                                        class="text-sm h-2.3rem w-10rem"
                                    />
                                </div>
                            </sections>
                        </transition>
                        <!-- Experiences Informational -->
                        <transition name="slide-fade">
                            <sections v-show="active === 1">
                                <div class="grid formgrid my-6 container">
                                    <PopupAddNewExperience />
                                </div>
                                <!-- Button Next -->
                                <div
                                    class="flex justify-content-end items-end flex-wrap px-4"
                                >
                                    <Button
                                        label="Back"
                                        severity="danger"
                                        outlined
                                        raised
                                        icon="pi pi-arrow-circle-left"
                                        iconPos="left"
                                        class="text-sm h-2.3rem w-10rem mr-4"
                                    />
                                    <Button
                                        label="Next"
                                        raised
                                        outlined
                                        severity="contrast"
                                        icon="pi pi-arrow-circle-right"
                                        iconPos="left"
                                        class="text-sm h-2.3rem w-10rem"
                                    />
                                </div>
                            </sections>
                        </transition>
                    </div>
                </div>
            </form>
        </el-card>
    </div>
</template>

<!-- Scripts Employee Admin -->
<script>
// import { Plus } from "@element-plus/icons-vue";
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import UserPermissionsMSServices from "../../../../services/vendors/user_permissions/UserPermissionsMSServices";
import { ElMessage } from "element-plus";
import addNewEmpUserAdminHelper from "@/mixin/admin_user_management/addNewEmpUserAdminHelper.js";

/**
 * @Global Add New Employee
 * */
import PopupAddNewExperience from "./employee_assign_manage/popup_assign_more_emp/popup_experience_info/AddNewExperienceWork";

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            activeName: "english-tabs",
            dialogImageUrl: null,
            dialogVisible: false,
            activetab: 1,
            preview: null,
            errMessageConfirm: "",
            optionsPerm: [],
            userGender: [
                { name: "Male", gender_name: "male" },
                { name: "Female", gender_name: "female" },
                { name: "Other", gender_name: "other" },
            ],
            image: null,
            userMSNameEng: "",
            userMSNameKh: "",
            emailMSUser: "",
            MSPasswordRef: "",
            userMSPhoneNum: "",
            userMSPassword: "",
            confirmPassword: "",
            userMSDesEng: "",
            userStartDate: "",
            userMSDesKh: "",
            userMSImgFileURL: null,
            submitted: false,
            message_pro_type: [],
            showUpload: true,
            errMessageUploadFile: "",
            messages: [],
            loading: [false, false, false],
            isUserAuthArrCreate: "",
            selectedUserGender: null,
            userAddress01: "",
            userAddress02: "",
            userAddrCity: "",
            userAddrZipCode: "",
            userUserDescription: "",
            userDateOfBirth: null,
            selectOptValuePermission: null,
            isProcessingSubmit: false,
            //Upload Files
            imageUrl: "",
            fileList: [],
            objClassUserPer: {
                upLoadShowUserMS: true,
                upLoadHideUserMS: false,
            },
            fileUserMS: null,
            notifMSGUser: "",
            permissionListDropDownView: [],
            permissionList: "",
            active: 1,
            items: [
                {
                    label: "Personal Info",
                },
                {
                    label: "Reservation",
                },
                {
                    label: "Review",
                },
            ],
        };
    },
    components: {
        PopupAddNewExperience,
    },
    mixins: [addNewEmpUserAdminHelper],
    created() {
        this.userMSServices = new UserPermissionsMSServices();
        this.submit = true;
    },
    mounted() {
        // User Arr Vuex
        this.isUserAuthArrCreate = this.$store.state.auth.userArr;
        //List Permissions
        this.userMSServices.getListRolesData().then((perm) => {
            if (!perm) {
                this.$notify.error({
                    title: "Error Entries Users Role",
                    showClose: false,
                });
            }
            this.permissionListDropDownView = perm;
        });
    },
    //Validations
    validations() {
        return {
            // selectOptValuePermission: {
            //     required
            // },
            selectedUserGender: {
                required,
            },
            userMSNameEng: {
                required,
                minLength: minLength(3),
            },
            userDateOfBirth: {
                required,
            },
            userStartDate: {
                required,
            },
            userMSNameKh: {
                required,
                minLength: minLength(3),
            },
            userMSPhoneNum: {
                required,
                minLength: minLength(6),
            },
            // userMSPassword: {
            //     required,
            //     minLength: minLength(6),
            // },
            // confirmPassword: {
            //     required,
            //     minLength: minLength(6),
            // },
        };
    },
    methods: {
        next() {
            if (this.active++ > 2) this.active = 0;
        },
        /*
            Input Only Phone Number
        */
        inputOnlyNumber(event) {
            let keyCode = event.keyCode ? event.keyCode : event.which;
            if (keyCode < 48 || keyCode > 57) {
                // 46 is dot
                event.preventDefault();
            }
        },
        // Confirm Password
        validationConfirmPass() {
            if (this.userMSPassword !== this.confirmPassword) {
                this.errMessageConfirm =
                    "Password and Confirm Password should match";
                return false;
            }
            this.errMessageConfirm = "";
            return true;
        },
        //============Uploads Files================
        handleChangeUser(file) {
            this.fileUserMS = file.raw;
            // console.log(this.fileUserMS);
            //Check Upload File
            this.beforeAvatarUpload(file.raw);
            this.objClassUserPer.upLoadHideUserMS = true;
            this.objClassUserPer.upLoadShowUserMS = false;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.objClassUserPer.upLoadShowUserMS = true;
            this.objClassUserPer.upLoadHideUserMS = false;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeAvatarUpload(rawFile) {
            if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
                ElMessage.error("Picture must be JPG or PNG format!");
                return false;
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error("Picture size can not exceed 2MB!");
                return false;
            }
            return true;
        },
        uploadFile() {
            this.file = this.$refs.file.files[0];
        },
        createBase64Image(fileObject) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.file = e.target.result;
            };
            reader.readAsDataURL(fileObject);
        },

        resetForm() {
            (this.userMSNameEngFiled = ""), (this.submitted = false);
        },
    },
};
</script>

<!-- Style Upload Image -->
<style>
.upLoadShowUserMS .el-upload {
    width: 15rem !important;
    height: 15rem !important;
    line-height: 15rem !important;
}

.upLoadHideUserMS .el-upload-list--picture-card .el-upload-list__item {
    width: 15rem !important;
    height: 15rem !important;
    line-height: 15rem !important;
}

.upLoadHideUserMS .el-upload {
    display: none;
}

.el-alert {
    margin: 20px 0 0;
}

.el-alert:first-child {
    margin: 0;
}
</style>
