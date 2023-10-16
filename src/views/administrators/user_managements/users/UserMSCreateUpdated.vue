<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2
                class="relative text-black text-3xl section section-title:before"
            >
               {{ $t('userinfo.editUser') }}
            </h2>
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click.prevent="
                    $router.push(
                        '/vendor/user/list/crete-user-auth/ui-user-list'
                    )
                "
            >
                <div class="flex justify-between pl-2">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{$t('route.routeBack')}}</span>
                </div>
            </el-button>
        </div>
        <!--Create Products-->
        <el-card class="box-card px-6 py-6">
            <!-- Toast Alert -->
            <Toast />
            <!-- Tabs -->
            <el-tabs v-model="activeName" class="demo-tabs text-xl">
                <form
                    enctype="multipart/form-data"
                    @submit.prevent="handleUserMSSUpdatedSubmit(!v$.$invalid)"
                >
                    <!--Form Submitted-->
                    <el-tab-pane
                        :label="$t('userinfo.generalInfo')"
                        name="english-tabs"
                    >
                        <!-- English -->
                        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                            <div class="col-12 lg:col-12">
                                <!-- Form Layouts -->
                                <div class="grid formgrid">
                                    <!-- Full Name in Khmer -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Khmer -->
                                        <div class="field">
                                            <label class="text-sm" for="name_en"
                                                >{{ $t('userinfo.fullNameInKhmer') }}
                                               <span class="p-error"
                                                    >*</span
                                                >
                                            </label
                                            >
                                            <InputText
                                                id="product_name"
                                                :placeholder="$t('userinfo.khmerName')"
                                                type="text"
                                                class="py-3 border-round-lg"
                                                v-model="
                                                    v$.userMSUpdatedArrFiled
                                                        .userMSNameEng.$model
                                                "
                                                :class="{
                                                    'p-invalid p-error':
                                                        v$.userMSUpdatedArrFiled
                                                            .userMSNameEng
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                            />
                                            <small
                                                v-if="
                                                    (v$.userMSUpdatedArrFiled
                                                        .userMSNameEng
                                                        .$invalid &&
                                                        submitted) ||
                                                    v$.userMSUpdatedArrFiled
                                                        .userMSNameEng.$pending
                                                        .$response
                                                "
                                                class="p-error"
                                                >{{
                                                    v$.userMSUpdatedArrFiled.userMSNameEng.required.$message.replace(
                                                        "Value",
                                                        "Full Name in Khmer"
                                                    ) ||
                                                    v$.userMSUpdatedArrFiled
                                                        .userMSNameEng.$params
                                                        .min
                                                }}</small
                                            >
                                        </div>
                                    </div>
                                    <!--Full Name in Latin -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm"
                                                >{{ $t('userinfo.fullNameInEn') }}<span
                                                    class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <InputText
                                                id="userMSNameKh"
                                                :placeholder="$t('userinfo.englishName')"
                                                type="text"
                                                class="py-3 border-round-lg"
                                                v-model="
                                                    v$.userMSUpdatedArrFiled
                                                        .userMSNameKh.$model
                                                "
                                                :class="{
                                                    'p-invalid p-error':
                                                        v$.userMSUpdatedArrFiled
                                                            .userMSNameKh
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                            />
                                            <small
                                                v-if="
                                                    (v$.userMSUpdatedArrFiled
                                                        .userMSNameKh
                                                        .$invalid &&
                                                        submitted) ||
                                                    v$.userMSUpdatedArrFiled
                                                        .userMSNameKh.$pending
                                                        .$response
                                                "
                                                class="p-error"
                                                >{{
                                                    v$.userMSUpdatedArrFiled.userMSNameKh.required.$message.replace(
                                                        "Value",
                                                        "Full Name in Latin"
                                                    ) ||
                                                    v$.userMSUpdatedArrFiled
                                                        .userMSNameKh.$params
                                                        .min
                                                }}
                                            </small>
                                        </div>
                                    </div>
                                    <!--Full Name in Latin -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm">{{ $t('userinfo.email') }}</label>
                                            <InputText
                                                id="email_add"
                                                :placeholder="$t('userinfo.email')"
                                                type="email"
                                                class="py-3 border-round-lg"
                                                v-model="
                                                    userMSUpdatedArrFiled.emailMSUser
                                                "
                                            />
                                        </div>
                                    </div>
                                    <!--Phone number -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en"
                                                class="text-sm"
                                                >{{ $t('userinfo.phone') }}<span
                                                    class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <InputText
                                                id="product_name"
                                                :placeholder="$t('userinfo.phone')"
                                                type="text"
                                                @keypress="inputOnlyNumber"
                                                class="py-3 border-round-lg"
                                                v-model="
                                                    v$.userMSUpdatedArrFiled
                                                        .userMSPhoneNum.$model
                                                "
                                                :class="{
                                                    'p-invalid p-error':
                                                        v$.userMSUpdatedArrFiled
                                                            .userMSPhoneNum
                                                            .$invalid &&
                                                        submitted,
                                                }"
                                            />
                                            <small
                                                v-if="
                                                    (v$.userMSUpdatedArrFiled
                                                        .userMSPhoneNum
                                                        .$invalid &&
                                                        submitted) ||
                                                    v$.userMSUpdatedArrFiled
                                                        .userMSPhoneNum.$pending
                                                        .$response
                                                "
                                                class="p-error"
                                                >{{
                                                    v$.userMSUpdatedArrFiled.userMSPhoneNum.required.$message.replace(
                                                        "Value",
                                                        "Phone Number"
                                                    ) ||
                                                    v$.userMSUpdatedArrFiled
                                                        .userMSPhoneNum.$params
                                                        .min
                                                }}
                                            </small>
                                        </div>
                                    </div>
                                    <!-- Current Password -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Password -->
                                        <div class="field">
                                            <label for="name_en"
                                                class="text-sm"
                                                >
                                                Current Password
                                                <span class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <Password
                                                id="userMSPassword"
                                                placeholder="Current Password"
                                                type="text"
                                                ref="MSPasswordRef"
                                                class="border-round-lg"
                                                toggleMask
                                                v-model="userMSUpdatedArrFiled.userMSCurrentPassword"
                                            />
                                           
                                        </div>
                                    </div>
                                    <!--Password and Confirm Password -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Password -->
                                        <div class="field">
                                            <label for="name_en"
                                                class="text-sm"
                                                >{{ $t('userinfo.password') }}<span class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <Password
                                                id="userMSPassword"
                                                :placeholder="$t('userinfo.password')"
                                                type="text"
                                                ref="MSPasswordRef"
                                                class="border-round-lg"
                                                toggleMask
                                                v-model="userMSUpdatedArrFiled
                                                        .userMSPassword"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Confirm Password -->
                                        <div class="field">
                                            <label 
                                                for="confirmPassword"
                                                class="text-sm"
                                                >{{ $t('userinfo.confirmPassword') }}<span
                                                    class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <Password
                                                id="confirm_password"
                                                :placeholder="$t('userinfo.confirmPassword')"
                                                type="text"
                                                toggleMask
                                                @input="validationConfirmPass"
                                                class="border-round-lg"
                                                v-model="confirmPassword"
                                            />
                                            <!-- Validations -->
                                            <div class="flex-column flex">
                                                <small
                                                    class="p-error"
                                                    v-if="errMessageConfirm"
                                                >
                                                    {{ errMessageConfirm }}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Date Of Birth -->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Date Of Birth<span class="p-error">*</span></label>
                                            <Calendar 
                                                placeholder="Date of birth" 
                                                class="border-round-lg text-sm" v-model="v$.userMSUpdatedArrFiled.userDateOfBirth.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSUpdatedArrFiled.userDateOfBirth.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSUpdatedArrFiled.userDateOfBirth.$invalid && submitted) || 
                                                v$.userMSUpdatedArrFiled.userDateOfBirth.$pending.$response"
                                                class="p-error"
                                            >
                                                {{ v$.userMSUpdatedArrFiled.userDateOfBirth.required.$message.replace('Value','Date of Birth') || 
                                                v$.userMSUpdatedArrFiled.userDateOfBirth.$params.min }}
                                            </small>
                                        </div>
                                    </div>
                                    <!-- Started Dated -->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Start Date<span class="p-error">*</span></label>
                                            <Calendar 
                                                placeholder="Date of birth" 
                                                class="border-round-lg text-sm" v-model="v$.userMSUpdatedArrFiled.userStartDate.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSUpdatedArrFiled.userStartDate.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSUpdatedArrFiled.userStartDate.$invalid && submitted) || 
                                                v$.userMSUpdatedArrFiled.userStartDate.$pending.$response"
                                                class="p-error"
                                            >
                                                {{ v$.userMSUpdatedArrFiled.userStartDate.required.$message.replace('Value','Start Date') || 
                                                v$.userMSUpdatedArrFiled.userStartDate.$params.min }}
                                            </small>
                                        </div>
                                    </div>
                                    <!-- Gender -->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="roles" class="text-sm">Gender<span class="p-error">*</span></label>
                                           <div class="flex flex-column">
                                                <Dropdown
                                                    v-model="userMSUpdatedArrFiled.selectedUserGender"
                                                    class="border-round-lg text-sm"
                                                    :options="userGender" 
                                                    :showClear="true"
                                                    optionLabel="name" 
                                                    option-value="name"
                                                    placeholder="Select a Gender" 
                                                    :class="{ 'p-invalid p-error': v$.userMSUpdatedArrFiled.selectedUserGender.$invalid && submitted }" 
                                                />
                                                <small
                                                    v-if="(v$.userMSUpdatedArrFiled.selectedUserGender.$invalid && submitted) || v$.userMSUpdatedArrFiled.selectedUserGender.$pending.$response"
                                                    class="p-error">{{ v$.userMSUpdatedArrFiled.selectedUserGender.required.$message.replace('Value',
                                                        'Gender') || v$.userMSUpdatedArrFiled.selectedUserGender.$params.min }}
                                                </small>
                                           </div>
                                        </div>
                                    </div>
                                    <!--User Permissions -->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="roles"
                                                class="text-sm"
                                                >{{ $t('userinfo.role') }}<span class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <div class="flex flex-column">
                                                    <Dropdown 
                                                        @change="getPermissionCurrent"
                                                        :options="permissionListDropDownView" 
                                                        filter  
                                                        v-model="userMSUpdatedArrFiled.selectOptValuePermission" 
                                                        inputId="id"
                                                        optionLabel="role_name" 
                                                        placeholder="Select a Role" 
                                                        aria-describedby="dd-error"
                                                        class="w-full border-round-lg text-sm"
                                                        :class="{ 'p-invalid p-error': v$.userMSUpdatedArrFiled.selectOptValuePermission.$invalid && submitted }"
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
                                                        v-if="(v$.userMSUpdatedArrFiled.selectOptValuePermission.$invalid && submitted) || v$.userMSUpdatedArrFiled.selectOptValuePermission.$pending.$response"
                                                        class="p-error">{{ v$.userMSUpdatedArrFiled.selectOptValuePermission.required.$message.replace('Value',
                                                            'Role') || v$.userMSUpdatedArrFiled.selectOptValuePermission.$params.min }}
                                                    </small>
                                            </div>
                                        </div>
                                    </div>
                                    <!--=========User Address===========-->
                                    <div class="col-12 col-lg-12 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Address</label>
                                            <Textarea 
                                                id="empAdminAddress" 
                                                placeholder="Address" 
                                                type="text"
                                                class="py-3 border-round-lg text-sm" v-model="userMSUpdatedArrFiled.empAdminAddress" />
                                        </div>
                                    </div>
                                    <!-- Updated Employee Profile -->
                                    <div class="col-12 field">
                                        <div class="field">
                                            <label for="name_en"
                                                class="text-sm"
                                                >{{ $t('userinfo.profileImage') }}<span
                                                    class="p-error"
                                                    >*</span
                                                >
                                            </label>
                                            <!-- Upload Files -->
                                            <el-upload
                                                action="#"
                                                list-type="picture-card"
                                                :on-preview="handlePictureCardPreview"
                                                :on-remove="handleRemove"
                                                :auto-upload="false"
                                                :on-change="handleChangeUser"
                                                :on-exceed="handleExceedEmpProfile"
                                                :class="objClassUserPer"
                                                :file-list="fileListEmpProfile"
                                                ref="file"
                                                accept=".jpg, .png, .jpeg"
                                                :limit="1"
                                            >
                                                <i
                                                    class="pi pi-cloud-upload"
                                                    style="font-size: 2rem"
                                                ></i>
                                                <!-- Preview Image -->
                                                <el-dialog v-model="dialogVisible">
                                                    <img w-ful class="w-full" :src="this.dialogImageUrl"
                                                        alt="Preview Image" />
                                                </el-dialog>
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
                                </div>
                            </div>
                             <!--User Noted -->
                            <div class="col-12 col-lg-12 field">
                                <div class="field">
                                    <label for="">Descriptions</label>
                                    <Editor
                                        editorStyle="height: 400px" 
                                        placeholder="Descriptions" 
                                        type="text"
                                        class="py-3 border-round-lg" 
                                        v-model="userMSUpdatedArrFiled.userUserDescription" 
                                    />
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <!-- Buttons Submits -->
                    <div class="col-12 flex justify-content-end mt-4">
                        <!--Buttons-->
                        <Button
                            icon="pi pi-check"
                            type="submit"
                            label="Save"
                            class="p-button-lg py-3 p-button-outlined w-10rem mr-3"
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
// import axios from 'axios';
export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE,
            selectUpdateOptValuePermission: null,
            activeName: "english-tabs",
            activetab: 1,
            preview: null,
            dialogImageUrl: null,
            dialogVisible: false,
            errMessageConfirm: "",
            image: null,
            userMSImgFileURL: null,
            isUserAuthArr: null,
            submitted: false,
            showUpload: true,
            errMessageUploadFile: "",
            confirmPassword: "",
            messages: [],
            fileListEmpProfile: [],
            loading: [false, false, false],
            //Upload Files
            imageUrl: "",
            fileList: [],
            objClassUserPer: {
                upLoadShowUserMS: true,
                upLoadHideUserMS: false,
            },
            fileUserMS: null,
            selectOptValuePermission: '',
            permissionListDropDownView: [],
            userGender: [
                { name: 'Male', gender_name: 'male' },
                { name: 'Female', gender_name: 'female' }
            ],
            permissionList: "",
            userMSUpdatedArrFiled: {
                userMSNameEng: "",
                userMSNameKh: "",
                userMSPhoneNum: "",
                userMSPassword: "",
                userMSCurrentPassword: "",
                emailMSUser: "",
                userDateOfBirth: null,
                selectOptValuePermission: null,
                userStartDate: null,
                selectedUserGender: null,
                empAdminAddress: "",
                userUserDescription: ''
            },
            formErrorsUserMS: {},
            currentGender: null
        };
    },
    components() {
        Plus;
    },
    created() {
        this.userMSServices = new UserPermissionsMSServices();
        this.submit = true;
        // Edited Vendor Accounts
        this.editUserMSUpdated(this.$route.params.id);
    },
    mounted() {
        // User Arr Vuex
        this.isUserAuthArr = this.$store.state.auth.userArr;
        //List Permissions
        this.userMSServices.getListRolesData().then((permission) => {
             if (!Array.isArray(permission) || !permission.length > 0) {
                this.$notify.error({
                    title: 'Error Entries Users Role',
                    showClose: false
                });
            }
            if (!Array.isArray(permission) || permission !== undefined || permission !== null) {
                permission.forEach(perm => {
                    this.permissionListDropDownView.push({
                        id: perm?.id,
                        role_name: perm?.role_name,
                    });
                });
            }
        });
    },
    //Validations
    validations() {
        return {
            userMSUpdatedArrFiled: {
                userMSNameEng: {
                    required,
                    minLength: minLength(3),
                },
                userMSNameKh: {
                    required,
                    minLength: minLength(3),
                },
                userMSPhoneNum: {
                    required,
                    minLength: minLength(6),
                },
                selectOptValuePermission: {
                    required
                },
                userDateOfBirth: {
                    required
                },
                userStartDate:{ 
                    required
                },
                selectedUserGender: {
                    required
                }
            },
        };
    },
    methods: {
        formatDate(date) {
            if(!date){
                return false; 
            }
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            return [month,day,year].join('/');
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
        /*
           Get Permissions
       */
        getPermissionCurrent(permissionID) {
            if (!permissionID) {
                ElMessage.error("Please select permissions...");
                this.permissionList = {};
            }
            try {
                // const catID = this.selectOptValueCat;
                this.userMSServices
                    .editedPermMSByID(this.selectOptValuePerm)
                    .then((perMID) => {
                        // if (!perMID) {
                        //     ElMessage.error("Internal Error...");
                        // }
                        this.permissionList = perMID;
                    })
                    .catch((err) => {
                       return Promise.reject(err);
                    });
            } catch (error) {
                    return Promise.reject(error);
            }
        },
        // Confirm Password
        validationConfirmPass() {
            if (
                this.userMSUpdatedArrFiled.userMSPassword !==
                this.confirmPassword
            ) {
                this.errMessageConfirm =
                    "Password and Confirm Password should match";
                return false;
            }
            this.errMessageConfirm = "";
            return true;
        },
        //============Uploads Files================
        async handleExceedEmpProfile(files, fileList){
            this.$message.warning(
                `Currently, 01 pictures are limited to be selected.
                        This time, it is selected ${files.length} 
                        Pictures selected ${files.length + fileList.length
                } Pictures`
            );
        },
        async reListEmployeeAdminProfile(profile){
            const productImg = `${this.ENV_HOST_PATH_FILE}uploads/user_profile/admin_staff/${profile}`;
            // Push Thumbnail
            this.fileListEmpProfile.push({
                name: profile ? profile : '',
                url: productImg
            });
        },
        handleChangeUser(file) {
            this.fileUserMS = file.raw;
            //Check Upload File
            this.beforeAvatarUpload(file.raw);
            this.objClassUserPer.upLoadHideUserMS = true;
            this.objClassUserPer.upLoadShowUserMS = false;
        },
        handleRemove(file, fileList) {
            const fileRemoveUpload = Array.from(file);
            fileRemoveUpload.splice(fileList,0);
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
        /**
         * @Edited Users
         * @Updated Users
         * */
        async editUserMSUpdated(id) {
            this.userMSServices
                .editedUserMSByID(id)
                .then((userId) => {
                    if (
                        this.isUserAuthArr[1].typeUser === "Admin" &&
                        this.isUserAuthArr[1].typeUser !== "Customer"
                    ) {
                        try {
                            if (userId.data.success == true) {
                                const userResult = userId.data.result.resultStatus?.userResult;
                                const empResult = userId.data.result.resultStatus?.empResult;
                                if(userResult !== undefined){
                                    userResult.forEach((result) => {
                                        if(!result){
                                            this.userMSUpdatedArrFiled.selectOptValuePermission = [];
                                        }
                                        this.userMSUpdatedArrFiled.userMSPhoneNum = result?.user_phonenumber;
                                        this.userMSUpdatedArrFiled.emailMSUser =  result?.user_email;
                                        this.userMSUpdatedArrFiled.selectOptValuePermission =  {id: result?.role_id, role_name: result?.role_name};
                                    })
                                }else{
                                    this.userMSUpdatedArrFiled.selectOptValuePermission = [];
                                }
                                this.userMSUpdatedArrFiled.selectedUserGender = empResult?.gender ?? '';
                                this.userMSUpdatedArrFiled.userDateOfBirth = this.formatDate(empResult?.dob) ? this.formatDate(empResult?.dob) : null;
                                this.userMSUpdatedArrFiled.userStartDate = this.formatDate(empResult?.start_dated) ? this.formatDate(empResult?.start_dated) : null;
                                this.userMSUpdatedArrFiled.userMSNameEng = empResult?.full_latin_name ?? '';
                                this.userMSUpdatedArrFiled.userMSNameKh = empResult?.full_kh_name ?? '';
                                this.userMSUpdatedArrFiled.empAdminAddress = empResult?.emp_address ?? '';
                                this.userMSUpdatedArrFiled.userUserDescription = empResult?.emp_noted ?? '';
                                this.currentGender = empResult?.gender;
                                //Employee Profile 
                                this.reListEmployeeAdminProfile(empResult?.profile ?? '');
                            }
                        } catch (error) {
                           return Promise.reject(error);
                        }
                    }
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        },
        async handleUserMSSUpdatedSubmit(isFormValidUpdateMS) {
            try {
                this.submitted = true;
                if (!isFormValidUpdateMS) {
                    if (!this.fileUserMS || this.fileUserMS !== "") {
                        this.errMessageUploadFile =
                            "Please upload profile image...";
                        return false;
                    }
                    return;
                }
                if (
                    !this.userMSUpdatedArrFiled.userMSNameEng != "" ||
                    this.userMSUpdatedArrFiled.userMSNameEng !== null ||
                    this.userMSUpdatedArrFiled.userMSNameKh !== "" ||
                    this.userMSUpdatedArrFiled.userMSPhoneNum !== "" ||
                    this.fileUserMS !== ""
                    || this.selectUpdateOptValuePermission !== ""
                ) {
                    // Data Response
                    const dataUserMSUpdated = {
                        empRoleId: this.selectUpdateOptValuePermission?.id ?? 0,
                        empNameEng: this.userMSUpdatedArrFiled.userMSNameEng,
                        empNameKh: this.userMSUpdatedArrFiled.userMSNameKh,
                        empEmail: this.userMSUpdatedArrFiled.emailMSUser,
                        empGender: this.userMSUpdatedArrFiled.selectedUserGender?.name ? this.userMSUpdatedArrFiled.selectedUserGender?.name : this.currentGender,
                        empDOB: new Date(this.userMSUpdatedArrFiled.userDateOfBirth).toISOString(),
                        empStartDate: new Date(this.userMSUpdatedArrFiled.userStartDate).toISOString(),
                        empPhone: this.userMSUpdatedArrFiled.userMSPhoneNum,
                        newPassword: this.userMSUpdatedArrFiled.userMSPassword,
                        currentPassword: this.userMSUpdatedArrFiled.userMSCurrentPassword,
                        userStatus:"Active",
                        empStatus: 'Approved',
                        userProfile: this.fileUserMS,
                        empAddress: this.userMSUpdatedArrFiled.empAdminAddress,
                        empNoted: this.userMSUpdatedArrFiled.userUserDescription
                    };
                    console.log(dataUserMSUpdated,this.$route.params.id, "dataUserMSUpdated")
                    const empAdminID = this.$route.params.id;
                    this.userMSServices.updatedEmpAdminAccount(empAdminID ? empAdminID : '', dataUserMSUpdated)
                    .then((response) => {
                            if (response.data.success == true) {
                                this.$notify.success({
                                    title: 'Successful updated admin account',
                                    message: response.data?.message ? response.data?.message : '' ,
                                    showClose: true
                                });
                                // Push Router
                                this.$router.push(
                                    "/vendor/user/list/crete-user-auth/ui-user-list"
                                );
                            }
                        })
                        .catch((error) => {
                            this.$notify.error({
                                title: 'Unsuccessfully updated admin account',
                                message: error.response.data.error.message ?? 'Unsuccessfully updated admin account',
                                showClose: false
                            });  
                            if(error.response.data.error.error.errors){
                                for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                    const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                    this.$notify.error({
                                        title: 'Unsuccessfully updated admin account',
                                        message: messageValidation ?? 'Unsuccessfully updated admin account',
                                        showClose: true
                                    });   
                                }
                            } 
                            return false;
                        });
                }
            } catch (error) {
                return Promise.reject(error);
            }
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
