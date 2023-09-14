<template>
   <div class="py-2">
        <!-- Toast Alert-->
        <Toast />
        <div class="px-2 flex justify-content-center">
            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid"> 
                <el-form 
                    ref="formPopupDepositWallet"
                    :model="formPopupDepositWallet"
                    label-width="200px"
                    label-position="top"
                    :rules="rulesDepositedWallet"
                    status-icon
                    class="demo-ruleForm"
                >
                    <!-- Radio Choose bank accounts -->
                    <el-form-item label="Bank recharged" prop="bankRecharge">
                        <el-radio-group 
                            autocomplete="off"  
                            class="w-full"
                            style="width: 100%"
                            v-model="formPopupDepositWallet.bankRecharge"
                        >
                            <el-radio border label="ABA Bank" name="aba-bank-company"/>
                            <el-radio border label="ACLEDA Bank"  name="acleda-bank-company"/>
                        </el-radio-group>
                    </el-form-item>
                    <!-- Enter Amount -->
                    <el-form-item label="Enter Amount" prop="enterAmountWallet">
                        <el-input-number 
                            style="width: 100%"
                            v-model="formPopupDepositWallet.enterAmountWallet"
                            :min="1" 
                            :max="5000" 
                            :precision="2"
                            autocomplete="off"  
                        />
                    </el-form-item>
                    <!-- Enter Date Time-->
                    <el-form-item label="Enter Deposited Time" prop="enterDepositedDateTime">
                        <el-date-picker
                            arrow-control
                            :action="fileUploadUrl"
                            style="width: 100%"
                            v-model="formPopupDepositWallet.enterDepositedDateTime"
                            type="datetime"
                            placeholder="Pick a day"
                            autocomplete="off"  
                        />
                    </el-form-item>
                    <!--============= Upload Your Payment Receipt ========-->
                    <el-form-item label="Recent Upload" prop="recentUploadDepositedBankInvoice"  style="width: 100%">
                            <el-upload 
                                action="#" 
                                v-model="formPopupDepositWallet.recentUploadDepositedBankInvoice"
                                accept=".jpg,.jpeg,.png"
                                list-type="picture" 
                                :on-preview="handlePictureCardPreviewRecentUploadDeposit"
                                :on-change="handleChangeRecentUploadDeposit" 
                                :auto-upload="false"
                                ref="fileUploadDeposit"
                                :on-exceed="handleExceedRecentUpload"
                                class="avatar-uploader-cover"
                                :limit= "parseInt('1')"
                                :http-request="handleFileSuccessRecentUploadDeposited"
                                autocomplete="off"  
                                :on-remove="fileRemoveReceiptUploadDeposited"
                            >
                            <div class="flex flex-column justify-content-center px-4 py-8 border-1 border"  style="width: 100%">
                                <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                <p class="font-bold text-sm">Upload Your Payment Receipt!</p>
                            </div>
                              <!--Dialogs-->
                            <el-dialog v-model="dialogVisibleDeposit">
                                <el-image :initial-index="4" :preview-src-list="dialogImageUrl"  fit="cover" :zoom-rate="1.2" width="100%" :src="dialogImageUrl" alt="" />
                            </el-dialog>
                        </el-upload>
                        <!-- Title Noted Upload -->
                        <div class="text-sm">
                           <span class="p-error"> *</span>
                            <span>
                                Please upload pictures according to the examples.
                                Incorrect or unclear pictures will cause the review to be slow or incomplete.
                            </span>
                        </div>
                    </el-form-item>
                    <!--============= Upload Your Payment Receipt ========-->
                    <!-- Image Validation Upload Deposited -->
                    <div>
                        <!-- Account ABA Bank -->
                        <template v-if="formPopupDepositWallet.bankRecharge  === 'ABA Bank'">
                                <div class="demo-image__preview flex justify-content-center pb-4">
                                    <el-image 
                                        style="width: 410px; height: 500px"
                                        :src="urlABABankAcc" 
                                        :zoom-rate="1.2"
                                        fit="cover"
                                        :preview-src-list="srcListAccountBankABA">
                                    </el-image>
                                </div>
                        </template>
                    </div>
                    <!--Deposited Noted -->
                    <el-form-item label="Deposited Noted" prop="depositedNoted">
                        <el-input 
                            v-model="formPopupDepositWallet.depositedNoted" 
                            style="width: 100%" type="textarea" 
                        />
                    </el-form-item>
                    <!-- Form Submitted -->
                    <el-form-item class="flex flex-column">
                        <el-button type="primary" @click="onSubmitUploadRecentDepositWallet('formPopupDepositWallet')">Upload Receipt</el-button>
                    </el-form-item>
                </el-form>
            </div>
           <!-- Toast Alert Message -->
            <Toast />
        </div>
   </div>
</template>
<!-- Script of Popup withdraw to wallets -->
<script>
export default {
    components: {},
    props: {},
    data() {
        var checkValidationDepositedAmount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Please enter amount deposit to wallet'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('Please input digits'));
                } else {
                    if (value < 1) {
                        callback(new Error('Input amount must greater than 1'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        return {
            urlABABankAcc: process.env.VUE_APP_PATH_FILE + 'wallets/company_bank_aba.jpg',
            srcListAccountBankABA: [process.env.VUE_APP_PATH_FILE + 'wallets/company_bank_aba.jpg'],
            dialogVisibleDeposit: false,
            dialogImageUrl:"",
            fileUploadUrl: "File upload URL address",
            fileUploadDeposit: '',
            showUpload: true,
            objFileUploadDeposit: {
                upLoadShowCat: true,
                upLoadHideCat: false,
            },
            formPopupDepositWallet: [
                {
                    bankRecharge: '',
                    enterAmountWallet: 1,
                    enterDepositedDateTime: '' ,
                    recentUploadDepositedBankInvoice: null,
                    depositedNoted: ''
                }
            ],
            shortcutsDateTimeDeposited: [
                {
                    text: 'Today',
                    value: new Date(),
                },
                {
                    text: 'Yesterday',
                    value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24)
                    return date
                    },
                },
                {
                    text: 'A week ago',
                    value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                        return date
                    },
                }
            ],
            rulesDepositedWallet: {
                bankRecharge: [
                    { required: true, message: 'Please select bank company', trigger: 'change' }
                ],
                enterAmountWallet: [
                    { validator: checkValidationDepositedAmount, trigger: 'blur' }
                ],
                enterDepositedDateTime: [
                    { type: 'date', required: true, message: 'Please select deposited time', trigger: 'change' }
                ],
                recentUploadDepositedBankInvoice: [
                    { required: true, message: 'Please select file upload receipt', trigger: 'change' },
                ]
            }
        };
    },
    created() {},
    methods: {
        handlePictureCardPreviewRecentUploadDeposit(file){
            // Preview Upload
            this.dialogVisibleDeposit = true;
            this.dialogImageUrl = file?.url;
        },
        handleChangeRecentUploadDeposit(file,fileList){
            this.beforeRecentUploadDeposit(file?.raw)
            this.objFileUploadDeposit.upLoadShowCat = true;
            this.objFileUploadDeposit.upLoadHideCat = false;
            // Hide
            this.showUpload = !this.showUpload
            // Check validation to upload receipt 
            this.formPopupDepositWallet.recentUploadDepositedBankInvoice = file;
            if (fileList.length !== 0) {
                this.$refs.formPopupDepositWallet.validateField('recentUploadDepositedBankInvoice');
            }
        },
        beforeRecentUploadDeposit(rawFile){
            if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
                this.$message.error(`Picture must be JPG or PNG format! : ${rawFile?.name}`);
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                this.$message.error(`Picture size can not exceed 2MB! : ${rawFile?.name}`);
                return false
            }
            return true
        },
        // The number of files exceeds the specified number
        handleExceedRecentUpload(files, fileList){
            this.$message.warning(
                `Currently, 1 pictures are limited to be selected. This time, it is selected ${files.length} Pictures selected ${
                files.length + fileList.length
                } Pictures`
            );
        },
        fileRemoveReceiptUploadDeposited(uploadFile, fileList){
            // File
            this.objFileUploadDeposit.upLoadShowCat = true;
            this.objFileUploadDeposit.upLoadHideCat = false;
            // Remove 
             // Check validation to upload receipt 
            this.formPopupDepositWallet.recentUploadDepositedBankInvoice = uploadFile;
            if (fileList.length !== 0) {
                this.$refs.formPopupDepositWallet.validateField('recentUploadDepositedBankInvoice');
            }
        },  
        handleFileSuccessRecentUploadDeposited(file){
            this.$message.warning(file);
        },
        /** @Handle Upload Receipt Deposit to Wallets */  
        onSubmitUploadRecentDepositWallet(fromSubmitted){
            this.$refs[fromSubmitted].validate((valid) => {
                if (valid) {
                    // Check Validation 
                    console.log("sadsad",valid)
                } else {
                    this.$notify.error({
                        title: 'Deposit to Wallet',
                        message: 'Please enter deposit amount to wallet'
                    });
                    return false;
                }
            });
        }
    },
    mounted() {},
};
</script>
<!-- Style CSS -->
<style>
    .demo-image__error .image-slot {
    font-size: 30px;
    }
    .demo-image__error .image-slot .el-icon {
    font-size: 30px;
    }
    .demo-image__error .el-image {
    width: 100%;
    height: 200px;
    }
</style>