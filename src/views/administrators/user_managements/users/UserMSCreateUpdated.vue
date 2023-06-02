<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-3xl section section-title:before">Edit User</h2>
            <el-button type="info" size="large" @click.prevent="$router.push('/vendor/user/list/crete-user-auth/ui-user-list')">
                <div class="flex justify-between pl-2">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">BACK</span>
                </div>
            </el-button>
        </div>
        <!--Create Products-->
        <el-card class="box-card px-6 py-6">
            <!-- Toast Alert -->
            <Toast />
            <!-- Tabs -->
            <el-tabs v-model="activeName" class="demo-tabs text-xl">
                <form enctype="multipart/form-data" @submit.prevent="handleUserMSSUpdatedSubmit(!v$.$invalid)">
                    <!--Form Submitted-->
                    <Message severity="error" v-if="notifMSGUser">
                        {{ notifMSGUser }}
                    </Message>
                    <el-tab-pane label="General Information" name="english-tabs">
                        <!-- English -->
                        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                            <div class="col-12 lg:col-12">
                                <!-- Form Layouts -->
                                <div class="grid formgrid">
                                    <!-- Full Name in Khmer -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Khmer -->
                                        <div class="field">
                                            <label for="name_en">Full Name in Khmer {{ this.userMSUpdatedArrFiled.userMSNameKh }}<span class="p-error">*</span></label>
                                            <InputText id="product_name" placeholder="Khmer Name" type="text"
                                                class="py-3 border-round-lg" v-model="v$.userMSUpdatedArrFiled.userMSNameEng.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSUpdatedArrFiled.userMSNameEng.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSUpdatedArrFiled.userMSNameEng.$invalid && submitted) || v$.userMSUpdatedArrFiled.userMSNameEng.$pending.$response"
                                                class="p-error">{{ v$.userMSUpdatedArrFiled.userMSNameEng.required.$message.replace('Value',
                                                    'Full Name in Khmer') || v$.userMSUpdatedArrFiled.userMSNameEng.$params.min }}</small>
                                        </div>
                                    </div>
                                    <!--Full Name in Latin -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en">Full Name in Latin<span class="p-error">*</span></label>
                                            <InputText id="userMSNameKh" placeholder="English Name" type="text"
                                                class="py-3 border-round-lg" v-model="v$.userMSUpdatedArrFiled.userMSNameKh.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSUpdatedArrFiled.userMSNameKh.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSUpdatedArrFiled.userMSNameKh.$invalid && submitted) || v$.userMSUpdatedArrFiled.userMSNameKh.$pending.$response"
                                                class="p-error">{{ v$.userMSUpdatedArrFiled.userMSNameKh.required.$message.replace('Value',
                                                    'Full Name in Latin') || v$.userMSUpdatedArrFiled.userMSNameKh.$params.min }}
                                            </small>
                                        </div>
                                    </div>
                                    <!--Full Name in Latin -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en">Email</label>
                                            <InputText id="email_add" placeholder="Email" type="email"
                                                class="py-3 border-round-lg" v-model="userMSUpdatedArrFiled.emailMSUser" />
                                        </div>
                                    </div>
                                    <!--Phone number -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en">Phone Number<span class="p-error">*</span></label>
                                            <InputText id="product_name" placeholder="Phone Number" type="text"
                                                class="py-3 border-round-lg" v-model="v$.userMSUpdatedArrFiled.userMSPhoneNum.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSUpdatedArrFiled.userMSPhoneNum.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSUpdatedArrFiled.userMSPhoneNum.$invalid && submitted) || v$.userMSUpdatedArrFiled.userMSPhoneNum.$pending.$response"
                                                class="p-error">{{ v$.userMSUpdatedArrFiled.userMSPhoneNum.required.$message.replace('Value',
                                                    'Phone Number') || v$.userMSUpdatedArrFiled.userMSPhoneNum.$params.min }}
                                            </small>
                                        </div>
                                    </div>
                                    <!--Password and Confirm Password -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Password -->
                                        <div class="field">
                                            <label for="name_en">Password<span class="p-error">*</span></label>
                                            <InputText id="userMSPassword" placeholder="Password" type="text"
                                                ref="MSPasswordRef" class="py-3 border-round-lg"
                                                v-model="v$.userMSUpdatedArrFiled.userMSPassword.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSUpdatedArrFiled.userMSPassword.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSUpdatedArrFiled.userMSPassword.$invalid && submitted) || v$.userMSUpdatedArrFiled.userMSPassword.$pending.$response"
                                                class="p-error">{{ v$.userMSUpdatedArrFiled.userMSPassword.required.$message.replace('Value',
                                                    'Password') || v$.userMSUpdatedArrFiled.userMSPassword.$params.min }}
                                            </small>
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Confirm Password -->
                                        <div class="field">
                                            <label for="confirmPassword">Confirm Password<span
                                                    class="p-error">*</span></label>
                                            <InputText id="confirm_password" placeholder="Confirm Password" type="text"
                                                @input="validationConfirmPass" class="py-3 border-round-lg"
                                                v-model="confirmPassword"
                                                :class="{ 'p-invalid p-error': v$.confirmPassword.$invalid && submitted }" />
                                            <!-- Validations -->
                                            <div class="flex-column flex">
                                                <small
                                                    v-if="(v$.confirmPassword.$invalid && submitted) || v$.confirmPassword.$pending.$response"
                                                    class="p-error">{{ v$.confirmPassword.required.$message.replace('Value',
                                                        'Confirm Password') 
                                                        || v$.confirmPassword.$params.min }}
                                                </small>
                                                <small class="p-error" v-if="errMessageConfirm">
                                                    {{ errMessageConfirm }}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <!--User Permissions -->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="roles">Roles<span class="p-error">*</span></label>
                                            <b-form-select :options="ageOptions" id="input-1304"></b-form-select>
                                            <!-- <small
                                                v-if="(v$.proCategoryNameEng.$invalid && submitted) || v$.proCategoryNameEng.$pending.$response"
                                                class="p-error">{{ v$.proCategoryNameEng.required.$message.replace('Value',
                                                    'Roles') || v$.proCategoryNameEng.$params.min }}
                                            </small> -->
                                        </div>
                                    </div>

                                    <div class="col-12 field">
                                        <!--Category Logo -->
                                        <div class="field">
                                            <label for="name_en">Profile Image<span class="p-error">*</span> </label>
                                            <!-- Upload Files -->
                                            <el-upload action="#" list-type="picture-card"
                                                :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                                                :auto-upload="false" :on-change="handleChangeUser" :class="objClassUserPer"
                                                :file-list="fileList" v-model="file" ref="file" :limit="1">
                                                <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                            </el-upload>
                                            <div class="flex flex-column">
                                                <small class="p-error" v-if="errMessageUploadFile">
                                                    {{ errMessageUploadFile }}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <!-- Buttons Submits -->
                    <div class="col-12 flex justify-content-end mt-4">
                        <!--Buttons-->
                        <Button icon="pi pi-times" class="p-button-lg py-3 w-10rem mr-3" label="Cancel" />
                        <Button icon="pi pi-check" type="submit" :disabled="isProcessingSubmit"
                            :label='isProcessingSubmit ? "Process..." : "Save"'
                            class="p-button-lg py-3 p-button-outlined w-10rem mr-3" />
                    </div>
                </form>
            </el-tabs>
        </el-card>
    </div>
</template>
  
  <!-- Scripts Category -->
<script>
import { Plus } from '@element-plus/icons-vue';
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import UserPermissionsMSServices from "../../../../services/vendors/user_permissions/UserPermissionsMSServices";
import { ElMessage } from 'element-plus';
// import axios from 'axios';

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            activeName: 'english-tabs',
            activetab: 1,
            preview: null,
            errMessageConfirm: '',
            image: null,
            userMSImgFileURL: null,
            isUserAuthArr: null,
            submitted: false,
            showUpload: true,
            errMessageUploadFile: '',
            confirmPassword: '',
            messages: [],
            loading: [false, false, false],
            //Upload Files
            imageUrl: '',
            fileList: [],
            objClassUserPer: {
                upLoadShowUserMS: true,
                upLoadHideUserMS: false,
            },
            fileUserMS: null,
            notifMSGUser: '',
            ageOptions: [
                { value: null, text: 'Please select your age' },
                { value: 'child', text: '0-18' },
                { value: 'Young', text: '19-30' },
                { value: 'adult', text: '31-49' },
                { value: 'senior-citizen', text: '50-99' }
            ],
            userMSUpdatedArrFiled:{
                userMSNameEng: '',
                userMSNameKh: '',
                userMSPhoneNum: '',
                userMSPassword: '',
                emailMSUser: ''
            },
            formErrorsUserMS: {}
        }
    },
    components() {
        Plus
    },
    created() {
        this.userMSServices = new UserPermissionsMSServices();
        this.submit = true;
    },
    mounted(){
        // User Arr Vuex 
        this.isUserAuthArr = this.$store.state.auth.userArr;
        this.editUserMSUpdated(this.$route.params.id);
    },
    //Validations
    validations() {
        return {
            userMSUpdatedArrFiled: {
                userMSNameEng: {
                    required,
                    minLength: minLength(3)
                },
                userMSNameKh: {
                    required,
                    minLength: minLength(3)
                },
                userMSPhoneNum: {
                    required,
                    minLength: minLength(6),
                },
                userMSPassword: {
                    required,
                    minLength: minLength(6),
                }
            },
            confirmPassword: {
                required,
                minLength: minLength(6),
            }
        }
    },
    methods: {
        // Confirm Password
        validationConfirmPass() {
            if (this.userMSUpdatedArrFiled.userMSPassword !== this.confirmPassword) {
                this.errMessageConfirm = 'Password and Confirm Password should match';
                return false;
            }
            this.errMessageConfirm = '';
            return true;
        },
        //============Uploads Files================
        handleChangeUser(file) {
            this.fileUserMS = file.raw;
            //Check Upload File
            this.beforeAvatarUpload(file.raw);
            this.objClassUserPer.upLoadHideUserMS = true;//上传图片后置upLoadHideUserMS为真，隐藏上传框
            this.objClassUserPer.upLoadShowUserMS = false;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
            this.objClassUserPer.upLoadShowUserMS = true;//删除图片后显示上传框
            this.objClassUserPer.upLoadHideUserMS = false;
        },
        // 点击预览图的放大按钮后会触发handlePictureCardPreview
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeAvatarUpload(rawFile) {
            if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
                ElMessage.error('Picture must be JPG or PNG format!')
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error('Picture size can not exceed 2MB!');
                return false
            }
            return true
        },
        uploadFile() {
            this.file = this.$refs.file.files[0];
            // this.createBase64Image(this.$refs.file.files[0]);
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
        async editUserMSUpdated(id){
            this.userMSServices.editedUserMSByID(id)
            .then((userId)=> {
                if(this.isUserAuthArr[1].typeUser === 'Vendor' && this.isUserAuthArr[1].typeUser !== 'Customer'){
                    try {
                        if (userId.data.success == true) {
                            const userResult = userId.data.result.resultStatus.userResult;
                            const empResult = userId.data.result.resultStatus.empResult;
                            console.log(empResult)
                            this.userMSUpdatedArrFiled.userMSNameEng = empResult.name_eng;
                            this.userMSUpdatedArrFiled.userMSNameKh = empResult.name_kh;
                            this.userMSUpdatedArrFiled.userMSPhoneNum = userResult.user_phonenumber;
                            this.userMSUpdatedArrFiled.emailMSUser = userResult.user_email;
                        }
                    } catch (error) {
                        ElMessage.error(error);
                    }
                }  
                if (this.isUserAuthArr[1].typeUser === 'Admin' && this.isUserAuthArr[1].typeUser !== 'Customer') {
                    try {
                        if (userId.data.success == true) {
                            const userResult = userId.data.result.resultStatus.userResult;
                            const empResult = userId.data.result.resultStatus.empResult;
                            this.userMSUpdatedArrFiled.userMSNameEng = empResult.full_latin_name;
                            this.userMSUpdatedArrFiled.userMSNameKh = empResult.full_kh_name;
                            this.userMSUpdatedArrFiled.userMSPhoneNum = userResult.user_phonenumber;
                            this.userMSUpdatedArrFiled.emailMSUser = userResult.user_email;
                        }
                    } catch (error) {
                        ElMessage.error(error);
                    }
                }  
            }).catch((err) => {
                ElMessage.error(err);
            })
        },
        async handleUserMSSUpdatedSubmit(isFormValidUpdateMS) {
            try {
                this.submitted = true;
                if (!isFormValidUpdateMS) {
                    if (!this.fileUserMS || this.fileUserMS !== '') {
                        this.errMessageUploadFile = 'Please upload profile image...';
                        ElMessage.error('Filed required...');
                        return false;
                    }
                    return;
                }
                if (
                    !this.userMSUpdatedArrFiled.userMSNameEng != ""
                    || this.userMSUpdatedArrFiled.userMSNameEng !== null
                    || this.userMSUpdatedArrFiled.userMSNameKh !== ""
                    || this.userMSUpdatedArrFiled.userMSPhoneNum !== ''
                    || this.userMSUpdatedArrFiled.userMSPassword !== ''
                    || this.fileUserMS !== ''
                ) {
                    // Data Response
                    const dataUserMSUpdated = {
                        userNameEng: this.userMSUpdatedArrFiled.userMSNameEng,
                        userNameKh: this.userMSUpdatedArrFiled.userMSNameKh,
                        userEmail: this.userMSUpdatedArrFiled.emailMSUser,
                        userPhone: this.userMSUpdatedArrFiled.userMSPhoneNum,
                        userPassword: this.userMSUpdatedArrFiled.userMSPassword,
                        userType: 'Admin',
                        userProfile: this.fileUserMS,
                        userStatus: 'Active'
                    }
                    this.userMSServices.updateUserMS(this.$route.params.id,dataUserMSUpdated).then((response) => {
                        if (response.data.success == true) {
                            ElMessage.success(response.data.message);
                            // Push Router
                            this.$router.push("/vendor/user/list/crete-user-auth/ui-user-list");
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        if(error.response.data.success == false){
                            ElMessage.error(error.response.data.message);
                            ElMessage.error(error);
                            this.notifMSGUser = error.response.data.error.error;
                        }
                        return false;
                    });
                }
            } catch (error) {
                //  Toast Alert 
                ElMessage.error(error);
            }
        },
        resetForm() {
            this.userMSNameEngFiled = '',
                this.submitted = false
        },
    }
}
</script>
<!-- Style Upload Image -->
<style>
/*当upLoadShowUserMS为true时，启用如下样式，即上传框的样式，若为false则不启用该样式*/
.upLoadShowUserMS .el-upload {
    width: 15rem !important;
    height: 15rem !important;
    line-height: 15rem !important;
}

/*当upLoadHideUserMS为true时，启用如下样式，即缩略图的样式，若为false则不启用该样式*/
.upLoadHideUserMS .el-upload-list--picture-card .el-upload-list__item {
    width: 15rem !important;
    height: 15rem !important;
    line-height: 15rem !important;
}

/*当upLoadHideUserMS为true时，启用如下样式，即上传框的样式，若为false则不启用该样式*/
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