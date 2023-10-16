<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-xl section section-title:before">{{$t("userinfo.editUser")}}</h2>
            <el-button class="btn btn-primary text-sm" type="info" size="default" @click.prevent="$router.push('/vendor/user/list/crete-user-auth/ui-user-list')">
                <div class="flex justify-between pl-2">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{$t("route.routeBack")}}</span>
                </div>
            </el-button>
        </div>
        <!--Create Products-->
        <el-card class="box-card px-6 py-6">
            <!-- Toast Alert -->
            <Toast />
            <!-- Tabs -->
            <el-tabs v-model="activeName" class="demo-tabs text-xl">
                <form enctype="multipart/form-data" @submit.prevent="handleCreateVendorAccount(!v$.$invalid)">
                    <!--Form Submitted-->
                    <el-tab-pane :label='$t("route.routeGeneralInfo")' name="english-tabs">
                        <!-- English -->
                        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                            <div class="col-12 lg:col-12">
                                <!-- Form Layouts -->
                                <div class="grid formgrid">
                                    <!-- Full Name in Khmer -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Khmer -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm">{{ $t('userinfo.fullNameInKhmer') }}<span class="p-error">*</span></label>
                                            <InputText id="userMSNameKh" placeholder="Khmer Name" type="text"
                                                class="py-3 border-round-lg text-sm" v-model="v$.userMSNameKh.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSNameKh.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSNameKh.$invalid && submitted) || v$.userMSNameKh.$pending.$response"
                                                class="p-error">{{ v$.userMSNameKh.required.$message.replace('Value',
                                                    'Full Name in Khmer') || v$.userMSNameKh.$params.min }}
                                            </small>
                                        </div>
                                    </div>
                                    <!--Full Name in Latin -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm">{{ $t('userinfo.fullNameInEn') }}<span class="p-error">*</span></label>
                                             <InputText id="product_name" placeholder="English Name" type="text"
                                                class="py-3 border-round-lg text-sm" v-model="v$.userMSNameEng.$model"
                                                :class="{ 'p-invalid p-error': v$.userMSNameEng.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userMSNameEng.$invalid && submitted) || v$.userMSNameEng.$pending.$response"
                                                class="p-error">{{ v$.userMSNameEng.required.$message.replace('Value',
                                                    'Full Name in English') || v$.userMSNameEng.$params.min }}</small>
                                        </div>
                                    </div>
                                    <!--Full Name in Latin -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Email</label>
                                            <InputText id="email_add"  
                                               placeholder="Email"
                                               type="email"
                                               class="py-3 border-round-lg text-sm" v-model="emailMSUser"
                                            />
                                        </div>
                                    </div>
                                    <!--Phone number -->
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Name Category -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Phone Number<span class="p-error">*</span></label>
                                            <InputText 
                                                id="product_name" 
                                                placeholder="Phone Number" 
                                                type="text"
                                                @keypress="inputOnlyNumber"
                                                class="py-3 border-round-lg text-sm" v-model="v$.userMSPhoneNum.$model"
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
                                            <label for="name_en" class="text-sm">Current Password<span class="p-error">*</span></label>
                                            <Password id="userMSPassword" 
                                                placeholder="Password" 
                                                type="text"
                                                toggleMask
                                                ref="MSPasswordRef"
                                                class="border-round-lg text-sm" v-model="currentMSPassword"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Password -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm">New Password<span class="p-error">*</span></label>
                                            <Password id="userMSPassword" 
                                                placeholder="Password" 
                                                type="text"
                                                toggleMask
                                                ref="MSPasswordRef"
                                                class="border-round-lg text-sm" v-model="userMSPassword"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <!-- Confirm Password -->
                                        <div class="field">
                                            <label for="confirmPassword" class="text-sm">Confirm Password<span class="p-error">*</span></label>
                                            <Password id="confirm_password" toggleMask placeholder="Confirm Password"
                                                type="text"
                                                @input="validationConfirmPass"
                                                class="border-round-lg text-sm"
                                                v-model="confirmPassword"
                                            />
                                            <!-- Validations -->
                                            <div class="flex-column flex">
                                                <small class="p-error" v-if="errMessageConfirm">
                                                    {{ errMessageConfirm }}
                                                </small> 
                                          </div>  
                                        </div>
                                    </div>
                                    <!-- Date of Birth -->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Date Of Birth<span class="p-error">*</span></label>
                                            <Calendar 
                                                placeholder="Date of birth" 
                                                class="border-round-lg text-sm" v-model="v$.userDateOfBirth.$model"
                                                :class="{ 'p-invalid p-error': v$.userDateOfBirth.$invalid && submitted }" />
                                            <small
                                                v-if="(v$.userDateOfBirth.$invalid && submitted) || v$.userDateOfBirth.$pending.$response"
                                                class="p-error">{{ v$.userDateOfBirth.required.$message.replace('Value',
                                                    'Date of Birth') || v$.userDateOfBirth.$params.min }}
                                            </small>
                                        </div>
                                    </div>
                                    <!-- Gender -->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="roles" class="text-sm">Gender<span class="p-error">*</span></label>
                                           <div class="flex flex-column">
                                                <Dropdown
                                                    v-model="selectedUserGender"
                                                    class="border-round-lg text-sm"
                                                    :options="userGender" 
                                                    :showClear="true"
                                                    optionLabel="name" 
                                                    option-value="name"
                                                    placeholder="Select a Gender" 
                                                    :class="{ 'p-invalid p-error': v$.selectedUserGender.$invalid && submitted }" 
                                                />
                                                <small
                                                    v-if="(v$.selectedUserGender.$invalid && submitted) || v$.selectedUserGender.$pending.$response"
                                                    class="p-error">{{ v$.selectedUserGender.required.$message.replace('Value',
                                                        'Gender') || v$.selectedUserGender.$params.min }}
                                                </small>
                                           </div>
                                        </div>
                                    </div>
                                    <!--=========User Address===========-->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Address 01<span class="p-error">*</span></label>
                                            <InputText 
                                                id="userAddress01" 
                                                placeholder="Address 01" 
                                                type="text"
                                                class="py-3 border-round-lg text-sm" v-model="userAddress01" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Address 02<span class="p-error">*</span></label>
                                            <InputText 
                                                id="userAddress02" 
                                                placeholder="Address 02" 
                                                type="text"
                                                class="py-3 border-round-lg text-sm" v-model="userAddress02" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm">City<span class="p-error">*</span></label>
                                            <InputText 
                                                id="userAddrCity" 
                                                placeholder="City" 
                                                type="text"
                                                class="py-3 border-round-lg text-sm" v-model="userAddrCity" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Zip Code<span class="p-error">*</span></label>
                                            <InputText 
                                                id="userAddrZipCode" 
                                                placeholder="Zip Code" 
                                                type="text"
                                                class="py-3 border-round-lg text-sm" v-model="userAddrZipCode" />
                                        </div>
                                    </div>
                                <!--=========User Address===========-->
                                    <!--User Permissions -->
                                    <div class="col-12 col-lg-4 field">
                                        <div class="field">
                                            <label for="roles" class="text-sm">Roles<span class="p-error">*</span></label>
                                            <Dropdown 
                                                @change="getPermissionCurrent"
                                                :options="permissionListDropDownView" 
                                                :filter="true"  
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
                                    </div>
                                    <!-- Upload Profile -->
                                    <div class="col-12 field">
                                        <!--Category Logo -->
                                        <div class="field">
                                            <label for="name_en" class="text-sm">Profile Image<span class="p-error">*</span> </label>
                                            <!-- Upload Files -->
                                            <el-upload 
                                                action="#"
                                                list-type="picture-card"
                                                :on-preview="handlePictureCardPreview"
                                                :on-remove="handleRemove"
                                                :auto-upload="false" 
                                                :on-change="handleChangeUser" 
                                                :class="objClassUserPer"
                                                :on-exceed="handleExceedVendorProfile"
                                                :file-list="fileListVendorProfile"
                                                ref="file"
                                                :limit="1"
                                                accept=".jpg, .png, .jpeg"
                                            >
                                                <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                <!-- Preview Image -->
                                                <el-dialog v-model="dialogVisible">
                                                    <img w-ful class="w-full" :src="this.dialogImageUrl"
                                                        alt="Preview Image" />
                                                </el-dialog>
                                            </el-upload>
                                            <div class="flex flex-column">
                                                <small class="p-error" v-if="errMessageUploadFile">
                                                    {{ errMessageUploadFile }}
                                                </small> 
                                            </div>
                                        </div>
                                    </div>
                                    <!--User Noted -->
                                    <div class="col-12 col-lg-12 field">
                                        <div class="field">
                                            <label for="">Descriptions<span class="p-error">*</span></label>
                                            <Editor
                                                editorStyle="height: 400px" 
                                                id="userUserDescription" 
                                                placeholder="Descriptions" 
                                                type="text"
                                                class="py-3 border-round-lg" v-model="userUserDescription" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <!-- Buttons Submits -->
                    <div class="col-12 flex justify-content-end mt-4">
                        <!--Buttons-->
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
import VendorManagementsAccountServices from "@/services/vendors/vendor_managements/VendorManagementAccountServices";
import UserPermissionsMSServices from "@/services/vendors/user_permissions/UserPermissionsMSServices";
import { ElMessage } from 'element-plus';
import {mapGetters} from "vuex";
import { isLoggedIn } from "@/utils/auth/auth";
 
export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE,
            activeName: 'english-tabs',
            dialogVisible: false,
            dialogImageUrl: null,
            activetab: 1,
            preview: null,
            errMessageConfirm: '',
            optionsPerm: [],
            userGender: [
                { name: 'Male', gender_name: 'male' },
                { name: 'Female', gender_name: 'female' }
            ],
            currentGender: '',
            image: null,
            userMSNameEng: '',
            userMSNameKh: '',
            emailMSUser: '',
            MSPasswordRef: '',
            userMSPhoneNum: '',
            userMSPassword: '',
            confirmPassword: '',
            currentMSPassword: '',
            userMSDesEng: '',
            userMSDesKh: '',
            userMSImgFileURL: null,
            submitted: false,
            message_pro_type: [],
            showUpload: true,
            errMessageUploadFile: '',
            messages: [],
            loading: [false, false, false],
            isUserAuthArrCreate: '',
            selectedUserGender: null,
            userAddress01: "",
            userAddress02: "",
            userAddrCity: "",
            userAddrZipCode: "",
            userUserDescription: "",
            userDateOfBirth: null,
            selectOptValuePermission: null,
            //Upload Files
            imageUrl: '',
            fileList: [],
            objClassUserPer: {
                upLoadShowUserMS: true,
                upLoadHideUserMS: false,
            },
            fileUserMS: null,
            notifMSGUser: '',
            permissionListDropDownView: [],
            permissionList: '',
            userResultArr: [],
            vendorResultArr: [],
            fileListVendorProfile: [],
            currentRoleId: 0
        }
    },
    components() {
        Plus
    },
    created() {
        this.vendorMSAccount = new VendorManagementsAccountServices();
        this.userPerMSServices = new UserPermissionsMSServices();
        this.submit = true;
        // Edited Vendor Accounts
        this.editUserMSUpdated(this.$route.params.id);
    },
    mounted() {
        // User Arr Vuex 
        this.isUserAuthArrCreate = this.$store.state.auth.userArr;
        //List Permissions
        this.userPerMSServices.getListRolesData().then((permission) => {
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
            selectOptValuePermission: {
                required
            },
            selectedUserGender:{
                required
            },
            userMSNameEng: {
                required,
                minLength: minLength(3)
            },
            userDateOfBirth: {
                required
            },
            userMSNameKh: {
                required,
                minLength: minLength(3)
            },
            userMSPhoneNum: {
                required,
                minLength: minLength(6),
            }
        }
    },
    computed:{
         ...mapGetters({
            currentUser: 'auth/currentUserAuth',
        }),
        currentUserAuth() {
            return this.currentUser ? this.currentUser : null;
        },
        selectedIdRoleId: {
           get() {
                return this.permissionListDropDownView.find(perm => perm?.role_name);
           },
           set(permission) {
                this.permissionListDropDownView.find(perm =>  perm?.id === permission?.id);
                this.permissionListDropDownView.find(perm => perm?.role_name && perm?.id !== permission?.id);

           }
        }
    },
    methods: {
        formatDate(date) {
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
        isSessionActiveVendor(){
            return isLoggedIn();
        },
        /*
            Get Permissions
        */
        getPermissionCurrent(permissionID){
            if (!Array.isArray(permissionID) || !permissionID.length) {
                this.permissionList = {};
            }
            try {
                this.userPerMSServices.editedPermMSByID(permissionID.value?.id).then((perMID) => {
                    if (!perMID) {
                        this.permissionList = Array.isArray() ?? [];
                    }
                    this.permissionList =  Array.isArray(perMID) ? perMID.slice() : [];
                }).catch((err) => {
                    this.permissionList = {};
                    return Promise.reject(err);
                });
            } catch (error) {
               return Promise.reject(error);
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
        validationConfirmPass(){
            if(this.userMSPassword !== this.confirmPassword){
                this.errMessageConfirm = 'Password and Confirm Password should match';
                return false;
            }
            this.errMessageConfirm = '';
            return true;
        },
        //============Uploads Files================
        handleExceedVendorProfile(files,fileList){
            this.$message.warning(
                `Currently, 01 pictures are limited to be selected.
                        This time, it is selected ${files.length} 
                        Pictures selected ${files.length + fileList.length
                } Pictures`
            );
        },
        handleChangeUser(file) {
            this.fileUserMS = file.raw;
            console.log(this.fileUserMS)
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
        },
        //Vendor Profile 
        async reListVendorProfile(profile){
            const productImg = `${this.ENV_HOST_PATH_FILE}uploads/user_profile/vendor_seller/${profile}`;
            // Push Thumbnail
            this.fileListVendorProfile.push({
                name: profile ? profile : '',
                url: productImg
            });
        },
        /**
         * @Edited Vendor Management
         * @Updated Vendor Management
        * */
        async editUserMSUpdated(id) {
            this.userPerMSServices
                .editedUserMSByID(id)
                .then((userId) => {
                    if (
                        this.currentUserAuth[1].typeUser === "Vendor" &&
                        this.currentUserAuth[1].typeUser !== "Customer"
                    ) {
                        try {
                            if (userId.data.success == true) {
                                if (!Array.isArray(userId.data.result?.resultStatus) || !userId.data.result?.resultStatus.length > 0) {
                                    this.userResultArr = [];
                                    this.vendorResultArr = [];
                                }
                                if (!Array.isArray(userId.data.result?.resultStatus) || userId.data.result?.resultStatus !== undefined || userId.data.result?.resultStatus !== null) {
                                    const userResult = userId.data.result.resultStatus.userResult;
                                    const vendorResult = userId.data.result.resultStatus.empResult;
                                    // Get Filed Updated Vendor
                                    // Vendor Profile
                                    this.reListVendorProfile(vendorResult?.profile ?? '');
                                    this.userMSNameEng = vendorResult?.name_eng ?? '';
                                    this.userMSNameKh = vendorResult?.name_kh ?? '';
                                    this.emailMSUser = userResult?.user_email ?? '';
                                    this.userMSPhoneNum = userResult?.user_phonenumber ?? 0;
                                    this.userDateOfBirth = this.formatDate(vendorResult?.dob) ?? '';
                                    this.userAddress01 = vendorResult?.address01 ?? '';
                                    this.userAddress02 = vendorResult?.address02 ?? '';
                                    this.userAddrCity = vendorResult?.vendor_city ?? '';
                                    this.userAddrZipCode = vendorResult?.vendor_zipcode ?? '';
                                    this.userUserDescription = vendorResult?.vendor_noted ?? '';
                                    this.selectedUserGender = vendorResult?.gender ?? '';
                                    // Current Gender
                                    this.currentGender = vendorResult?.gender ?? '';
                                    this.currentRoleId = userResult?.role_id; 
                                    //   
                                    if(userResult !== undefined){
                                        userResult.forEach((result) => {
                                            if(!result){
                                                this.selectOptValuePermission = [];
                                            }
                                            this.selectOptValuePermission =  {id: result?.role_id, role_name: result?.role_name};
                                        })
                                    }else{
                                        this.selectOptValuePermission = [];
                                    }
                                }                               
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
        // Create Vendor Accounts
        async handleCreateVendorAccount(isFormValidUserMS) {
            try {
                this.submitted = true;
                if (!isFormValidUserMS) {
                    if(!this.fileUserMS || this.fileUserMS !== ''){
                      this.errMessageUploadFile = 'Please upload profile image...';
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
                    || this.selectOptValuePermission !== ''
                    || this.selectedUserGender !== ''
                ) {
                    // Data Response
                    const dataVendorAccounts = {
                        vendorRoleId: this.selectOptValuePermission?.id ?? 0,
                        userNameEng: this.userMSNameEng,
                        userNameKh: this.userMSNameKh,
                        userEmail: this.emailMSUser,
                        userPhone: parseInt(this.userMSPhoneNum),
                        currentPassword: this?.currentMSPassword,
                        newPassword: this?.userMSPassword,
                        userType: 'Vendor',
                        userProfile: this.fileUserMS,
                        userStatus: 'Active',
                        dobVendor: new Date(this.userDateOfBirth).toISOString(),
                        vendorGender: this.selectedUserGender?.name ? this.selectedUserGender?.name : this.currentGender,
                        vendorAddr01:this.userAddress01,
                        vendorAddr02:this.userAddress02,
                        vendorCity: this.userAddrCity,
                        vendorZipCode:this.userAddrZipCode,
                        vendorNoted: this.userUserDescription,
                    }
                    const vendorId = this.$route.params?.id;
                    this.vendorMSAccount.updatedVendorAccountManagements(vendorId,dataVendorAccounts).then((response) => {
                        if (response.data.success == true) {
                            this.$notify.success({
                                title: 'Successful updated vendor account',
                                message: response.data?.message ? response.data?.message : '' ,
                                showClose: true
                            });
                            // Push Router
                            this.$router.push("/vendor/user/list/crete-user-auth/ui-user-list");
                        }
                    })
                    .catch(error => {
                        this.$notify.error({
                            title: 'Unsuccessfully updated vendor account',
                            message: error.response.data.error.message ?? 'Unsuccessfully updated vendor account',
                            showClose: false
                        });  
                        if(error.response.data.error.error.errors){
                            for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                this.$notify.error({
                                    title: 'Unsuccessfully updated vendor account',
                                    message: messageValidation ?? 'Unsuccessfully updated vendor account',
                                    showClose: true
                                });   
                            }
                        } 
                    });
                }
            } catch (error) {
                return Promise.reject(error);
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