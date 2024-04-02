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
            <el-tabs v-model="activeName" class="demo-tabs text-xl">
                <form
                    enctype="multipart/form-data"
                    @submit.prevent="handleAddNewEmpAdminSubmit(!v$.$invalid)"
                >
                    <!--Form Submitted-->
                    <TabView>
                        <TabPanel header="Personal Info">
                            <!-- English -->
                            <div
                                class="grid grid-nogutter flex-wrap gap-3 p-fluid"
                            >
                                <div class="col-12 lg:col-12">
                                    <!-- Form Layouts -->
                                    <div class="grid formgrid">
                                        <!-- Full Name in Khmer -->
                                        <div class="col-12 col-lg-4 field">
                                            <!-- Name Khmer -->
                                            <div class="field">
                                                <label
                                                    for="name_en"
                                                    class="text-sm"
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
                                                    v-model="
                                                        v$.userMSNameKh.$model
                                                    "
                                                    :class="{
                                                        'p-invalid p-error':
                                                            v$.userMSNameKh
                                                                .$invalid &&
                                                            submitted,
                                                    }"
                                                />
                                                <small
                                                    v-if="
                                                        (v$.userMSNameKh
                                                            .$invalid &&
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
                                                        v$.userMSNameKh.$params
                                                            .min
                                                    }}
                                                </small>
                                            </div>
                                        </div>
                                        <!--Full Name in Latin -->
                                        <div class="col-12 col-lg-4 field">
                                            <!-- Name Category -->
                                            <div class="field">
                                                <label
                                                    for="name_en"
                                                    class="text-sm"
                                                    >{{
                                                        $t(
                                                            "userinfo.fullNameInEn"
                                                        )
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
                                                        v$.userMSNameEng
                                                            .$pending.$response
                                                    "
                                                    class="p-error"
                                                    >{{
                                                        v$.userMSNameEng.required.$message.replace(
                                                            "Value",
                                                            "Full Name in English"
                                                        ) ||
                                                        v$.userMSNameEng.$params
                                                            .min
                                                    }}</small
                                                >
                                            </div>
                                        </div>
                                        <!--Full Name in Latin -->
                                        <div class="col-12 col-lg-4 field">
                                            <!-- Name Category -->
                                            <div class="field">
                                                <label
                                                    for="name_en"
                                                    class="text-sm"
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
                                                <label
                                                    for="name_en"
                                                    class="text-sm"
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
                                                        v$.userMSPhoneNum
                                                            .$pending.$response
                                                    "
                                                    class="p-error"
                                                    >{{
                                                        v$.userMSPhoneNum.required.$message.replace(
                                                            "Value",
                                                            "Phone Number"
                                                        ) ||
                                                        v$.userMSPhoneNum
                                                            .$params.min
                                                    }}
                                                </small>
                                            </div>
                                        </div>
                                        <!--Password and Confirm Password -->
                                        <!-- <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm"
                                                >Password<span class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <Password
                                                id="userMSPassword"
                                                placeholder="Password"
                                                type="text"
                                                toggleMask
                                                ref="MSPasswordRef"
                                                class="border-round-lg text-sm"
                                                v-model="
                                                    v$.userMSPassword.$model
                                                "
                                                :class="{
                                                    'p-invalid p-error':
                                                        v$.userMSPassword
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                            />
                                            <small
                                                v-if="
                                                    (v$.userMSPassword
                                                        .$invalid &&
                                                        submitted) ||
                                                    v$.userMSPassword.$pending
                                                        .$response
                                                "
                                                class="p-error"
                                                >{{
                                                    v$.userMSPassword.required.$message.replace(
                                                        "Value",
                                                        "Password"
                                                    ) ||
                                                    v$.userMSPassword.$params
                                                        .min
                                                }}
                                            </small>
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label
                                                for="confirmPassword"
                                                class="text-sm"
                                                >Confirm Password<span
                                                    class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <Password
                                                id="confirm_password"
                                                toggleMask
                                                placeholder="Confirm Password"
                                                type="text"
                                                @input="validationConfirmPass"
                                                class="border-round-lg text-sm"
                                                v-model="confirmPassword"
                                                :class="{
                                                    'p-invalid p-error':
                                                        v$.confirmPassword
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                            />
                                            <div class="flex-column flex">
                                                <small
                                                    v-if="
                                                        (v$.confirmPassword
                                                            .$invalid &&
                                                            submitted) ||
                                                        v$.confirmPassword
                                                            .$pending.$response
                                                    "
                                                    class="p-error"
                                                    >{{
                                                        v$.confirmPassword.required.$message.replace(
                                                            "Value",
                                                            "Confirm Password"
                                                        ) ||
                                                        v$.confirmPassword
                                                            .$params.min
                                                    }}
                                                </small>
                                                <small
                                                    class="p-error"
                                                    v-if="errMessageConfirm"
                                                >
                                                    {{ errMessageConfirm }}
                                                </small>
                                            </div>
                                        </div>
                                    </div> -->
                                        <!-- Date of Birth -->
                                        <div class="col-12 col-lg-4 field">
                                            <div class="field">
                                                <label
                                                    for="name_en"
                                                    class="text-sm"
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
                                                        v$.userDateOfBirth
                                                            .$model
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
                                                        v$.userDateOfBirth
                                                            .$pending.$response
                                                    "
                                                    class="p-error"
                                                    >{{
                                                        v$.userDateOfBirth.required.$message.replace(
                                                            "Value",
                                                            "Date of Birth"
                                                        ) ||
                                                        v$.userDateOfBirth
                                                            .$params.min
                                                    }}
                                                </small>
                                            </div>
                                        </div>
                                        <!-- Started Dated -->
                                        <div class="col-12 col-lg-4 field">
                                            <div class="field">
                                                <label
                                                    for="name_en"
                                                    class="text-sm"
                                                    >Start Date<span
                                                        class="p-error"
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
                                                        v$.userStartDate
                                                            .$pending.$response
                                                    "
                                                    class="p-error"
                                                    >{{
                                                        v$.userStartDate.required.$message.replace(
                                                            "Value",
                                                            "Start Date"
                                                        ) ||
                                                        v$.userStartDate.$params
                                                            .min
                                                    }}
                                                </small>
                                            </div>
                                        </div>
                                        <!-- Gender -->
                                        <div class="col-12 col-lg-4 field">
                                            <div class="field">
                                                <label
                                                    for="roles"
                                                    class="text-sm"
                                                    >Gender<span class="p-error"
                                                        >*</span
                                                    ></label
                                                >
                                                <div class="flex flex-column">
                                                    <Dropdown
                                                        v-model="
                                                            selectedUserGender
                                                        "
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
                                                            (v$
                                                                .selectedUserGender
                                                                .$invalid &&
                                                                submitted) ||
                                                            v$
                                                                .selectedUserGender
                                                                .$pending
                                                                .$response
                                                        "
                                                        class="p-error"
                                                        >{{
                                                            v$.selectedUserGender.required.$message.replace(
                                                                "Value",
                                                                "Gender"
                                                            ) ||
                                                            v$
                                                                .selectedUserGender
                                                                .$params.min
                                                        }}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <!--User Roles -->
                                        <!-- <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="roles" class="text-sm">Roles<span class="p-error">*</span></label>
                                            <Dropdown 
                                                @change="getPermissionCurrent"
                                                :options="permissionListDropDownView" 
                                                filter  
                                                v-model="selectOptValuePermission" 
                                                inputId="id"
                                                optionLabel="role_name" 
                                                placeholder="Select a Role" 
                                                aria-describedby="dd-error"
                                                class="w-full border-round-lg text-sm"
                                                :class="{ 'p-invalid p-error': v$.selectOptValuePermission.$invalid && submitted }"
                                            >
                                                    <template #value="slotProps">
                                                        <div v-if="slotProps.value" class="flex align-items-center">
                                                            <div>{{ slotProps.value?.role_name }}</div>
                                                        </div>
                                                        <span v-else>
                                                            {{ slotProps.placeholder }}
                                                        </span>
                                                    </template>
                                                    <template #option="slotProps">
                                                        <div class="flex align-items-center">
                                                            <div>{{ slotProps.option?.role_name }}</div>
                                                        </div>
                                                    </template>
                                            </Dropdown>
                                            <small
                                                v-if="(v$.selectOptValuePermission.$invalid && submitted) || v$.selectOptValuePermission.$pending.$response"
                                                class="p-error">{{ v$.selectOptValuePermission.required.$message.replace('Value',
                                                    'Role') || v$.selectOptValuePermission.$params.min }}
                                            </small>
                                        </div>
                                    </div> -->
                                        <!--=========User Address===========-->
                                        <div class="col-12 col-lg-12 field">
                                            <div class="field">
                                                <label
                                                    for="name_en"
                                                    class="text-sm"
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
                                                <label
                                                    for="name_en"
                                                    class="text-sm"
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
                                                    :on-change="
                                                        handleChangeUser
                                                    "
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
                                                        v-if="
                                                            errMessageUploadFile
                                                        "
                                                    >
                                                        {{
                                                            errMessageUploadFile
                                                        }}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <!--User Noted -->
                                        <div class="col-12 col-lg-12 field">
                                            <div class="field">
                                                <label for=""
                                                    >Descriptions</label
                                                >
                                                <Editor
                                                    editorStyle="height: 400px"
                                                    id="userUserDescription"
                                                    placeholder="Descriptions"
                                                    type="text"
                                                    class="py-3 border-round-lg"
                                                    v-model="
                                                        userUserDescription
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabView>

                    <!-- Buttons Submits -->
                    <div class="col-12 flex justify-content-end">
                        <!--Buttons-->
                        <Button
                            icon="pi pi-check"
                            type="submit"
                            :loading="isProcessingSubmit"
                            :label="
                                isProcessingSubmit ? 'Loading...' : 'Update'
                            "
                            severity="danger"
                            class="p-button-lg py-4 w-12rem p-button-outlined text-sm"
                        />
                    </div>
                </form>
            </el-tabs>
        </el-card>
    </div>
</template>

<!-- Scripts Category -->
<script>
import { Plus } from "@element-plus/icons-vue";
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import UserPermissionsMSServices from "../../../../services/vendors/user_permissions/UserPermissionsMSServices";
import { ElMessage } from "element-plus";
import addNewEmpUserAdminHelper from "@/mixin/admin_user_management/addNewEmpUserAdminHelper.js";

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
        };
    },
    components() {
        Plus;
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
        /*
            Get Permissions
        */
        getPermissionCurrent(permissionID) {
            if (!Array.isArray(permissionID) || !permissionID.length) {
                this.permissionList = {};
            }
            try {
                this.userMSServices
                    .editedPermMSByID(permissionID.value?.id)
                    .then((perMID) => {
                        if (!perMID) {
                            this.permissionList = Array.isArray() ?? [];
                        }
                        this.permissionList = Array.isArray(perMID)
                            ? perMID.slice()
                            : [];
                    })
                    .catch((err) => {
                        ElMessage.error(err.message);
                        this.permissionList = {};
                    });
            } catch (error) {
                this.permissionList = [];
            }
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
