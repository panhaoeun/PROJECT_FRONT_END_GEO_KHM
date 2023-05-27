<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-3xl section section-title:before">Add User</h2>
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
                <form enctype="multipart/form-data" @submit.prevent="handleUserMSSubmit(!v$.$invalid)">
                    <!--Form Submitted-->
                    <Message severity="error" v-for="(errorArray, index) in notifMSGUser" :key="index">
                        {{ errorArray }}
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
                                            <label for="name_en">Full Name in Khmer<span class="p-error">*</span></label>
                                            <InputText id="product_name" placeholder="Khmer Name" type="text"
                                                class="py-3 border-round-lg" v-model="v$.userMSNameEng.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSNameEng.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSNameEng.$invalid && submitted) || v$.userMSNameEng.$pending.$response"
                                                class="p-error">{{ v$.userMSNameEng.required.$message.replace('Value',
                                                    'Full Name in Khmer') || v$.userMSNameEng.$params.min }}</small>
                                        </div>
                                    </div>
                                    <!--Full Name in Latin -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en">Full Name in Latin<span class="p-error">*</span></label>
                                            <InputText id="userMSNameKh" placeholder="English Name" type="text"
                                                class="py-3 border-round-lg" v-model="v$.userMSNameKh.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSNameKh.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSNameKh.$invalid && submitted) || v$.userMSNameKh.$pending.$response"
                                                class="p-error">{{ v$.userMSNameKh.required.$message.replace('Value',
                                                'Full Name in Latin') || v$.userMSNameKh.$params.min }}
                                            </small>
                                        </div>
                                    </div>
                                    <!--Full Name in Latin -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en">Email</label>
                                            <InputText id="email_add"  
                                               placeholder="Email"
                                               type="email"
                                               class="py-3 border-round-lg" v-model="emailMSUser"
                                            />
                                        </div>
                                    </div>
                                    <!--Phone number -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en">Phone Number<span class="p-error">*</span></label>
                                            <InputText id="product_name" placeholder="Phone Number" type="text"
                                                class="py-3 border-round-lg" v-model="v$.userMSPhoneNum.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSPhoneNum.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSPhoneNum.$invalid && submitted) || v$.userMSPhoneNum.$pending.$response"
                                                class="p-error">{{ v$.userMSPhoneNum.required.$message.replace('Value',
                                                    'Phone Number') || v$.userMSPhoneNum.$params.min }}
                                            </small>
                                        </div>
                                    </div>
                                    <!--Password and Confirm Password -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Password -->
                                        <div class="field">
                                            <label for="name_en">Password<span class="p-error">*</span></label>
                                            <InputText id="userMSPassword" 
                                                placeholder="Password" 
                                                type="text"
                                                ref="MSPasswordRef"
                                                class="py-3 border-round-lg" v-model="v$.userMSPassword.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSPassword.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSPassword.$invalid && submitted) || v$.userMSPassword.$pending.$response"
                                                class="p-error">{{ v$.userMSPassword.required.$message.replace('Value',
                                                    'Password') || v$.userMSPassword.$params.min }}
                                            </small>
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Confirm Password -->
                                        <div class="field">
                                            <label for="confirmPassword">Confirm Password<span class="p-error">*</span></label>
                                            <InputText id="confirm_password" placeholder="Confirm Password"
                                                type="text"
                                                @input="validationConfirmPass"
                                                class="py-3 border-round-lg"
                                                v-model="confirmPassword"
                                                :class="{'p-invalid p-error' : v$.confirmPassword.$invalid && submitted }"
                                            />
                                            <!-- Validations -->
                                            <div class="flex-column flex">
                                                <small
                                                    v-if="(v$.confirmPassword.$invalid && submitted) || v$.confirmPassword.$pending.$response"
                                                    class="p-error">{{ v$.confirmPassword.required.$message.replace('Value',
                                                        'Confirm Password') || v$.confirmPassword.$params.min }}
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
                                                :on-preview="handlePictureCardPreview"
                                                :on-remove="handleRemove"
                                                :auto-upload="false" 
                                                :on-change="handleChangeUser" 
                                                :class="objClassUserPer"
                                                :file-list="fileList"
                                                v-model="file" ref="file"
                                                :limit="1"
                                            >
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
            userMSNameEng: '',
            userMSNameKh: '',
            emailMSUser: '',
            MSPasswordRef: '',
            userMSPhoneNum: '',
            userMSPassword: '',
            confirmPassword: '',
            userMSDesEng: '',
            userMSDesKh: '',
            userMSImgFileURL: null,
            submitted: false,
            message_pro_type: [],
            showUpload: true,
            errMessageUploadFile: '',
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
            ageOptions : [
                { value: null, text: 'Please select your age' },
                { value: 'child', text: '0-18' },
                { value: 'Young', text: '19-30' },
                { value: 'adult', text: '31-49' },
                { value: 'senior-citizen', text: '50-99' }
            ]
        }
    },
    components() {
        Plus
    },
    created() {
        this.userMSServices = new UserPermissionsMSServices();
        this.submit = true;
    },
    computed:{

    },
    //Validations
    validations() {
        return {
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
            },
            confirmPassword: {
                required,
                minLength: minLength(6),
            }
        }
    },
    methods: {
        // Confirm Password
        validationConfirmPass(){
            if(this.userMSPassword !== this.confirmPassword){
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
        async handleUserMSSubmit(isFormValidUserMS) {
            try {
                // console.log(this.v$.proCategoryNameEng.required.$message.replace('Val)
                this.submitted = true;
                if (!isFormValidUserMS) {
                    if(!this.fileUserMS || this.fileUserMS !== ''){
                      this.errMessageUploadFile = 'Please upload profile image...';
                      ElMessage.error('Filed required...');
                      return false;
                    }
                    return;
                }
                if (
                    !this.userMSNameEng != "" 
                    || this.userMSNameEng !== null
                    || this.userMSNameKh !== ""
                    || this.userMSPhoneNum !== ''
                    || this.userMSPassword !== ''
                    || this.fileUserMS !== ''
                ) {
                    // Data Response
                    const data = {
                        userNameEng: this.userMSNameEng,
                        userNameKh: this.userMSNameKh,
                        userEmail: this.emailMSUser,
                        userPhone: this.userMSPhoneNum,
                        userPassword: this.userMSPassword,
                        userType: 'Admin',
                        userProfile: this.fileUserMS,
                        userStatus: 'Active'
                    }
                    this.userMSServices.createUserMS(data).then((response) => {
                        if (response.data.success == true) {
                            ElMessage.success(response.data.message);
                            // Push Router
                            this.$router.push("/vendor/user/list/crete-user-auth/ui-user-list");
                        }
                })
                .catch(error => {
                        ElMessage.error(error);
                        this.notifMSGUser = error.response.data;
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