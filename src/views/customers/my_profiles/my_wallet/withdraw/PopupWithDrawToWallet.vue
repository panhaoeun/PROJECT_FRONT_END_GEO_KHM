<template>
   <div class="py-2">
        <!-- Toast Alert-->
        <Toast />
        <div class="px-2 flex justify-content-center">
            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid"> 
                <el-form 
                    ref="formPopupWithdrawWalletRef"
                    :model="formPopupWithdrawWallet"
                    label-width="200px"
                    label-position="top"
                    :rules="rulesWithdrawWallet"
                    status-icon
                    class="demo-ruleForm"
                >
                    <!-- Enter Amount -->
                    <el-form-item label="Enter Amount" prop="enterAmountWallet">
                        <el-input-number 
                            style="width: 100%"
                            v-model="formPopupWithdrawWallet.enterAmountWallet"
                            :min="1" 
                            :max="5000" 
                            :precision="2"
                            autocomplete="off"  
                        />
                    </el-form-item>
                    <!-- Please select the reason for your withdrawal-->
                    <el-form-item label="Please select the reason for your withdrawal" prop="reasonTypeWithdraw">
                            <el-select
                                style="width: 100%"
                                v-model="formPopupWithdrawWallet.reasonTypeWithdraw"
                                placeholder="Activity zone"
                                clearable
                            >
                                <el-option label="Zone one" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                    </el-form-item>
                    <!--============= Upload Your Payment Receipt ========-->
                    <el-form-item label="Upload identity information" prop="recentUploadDepositedBankInvoice"  style="width: 100%">
                            <el-upload 
                                v-model="formPopupWithdrawWallet.recentUploadDepositedBankInvoice"
                                action="#" 
                                accept=".jpg,.jpeg,.png"
                                list-type="picture" 
                                :on-preview="handlePictureCardPreviewRecentUploadDeposit"
                                :on-change="handleChangeRecentUploadDeposit" 
                                :auto-upload="false"
                                ref="fileUploadDeposit"
                                :on-exceed="handleExceedRecentUpload"
                                class="avatar-uploader-cover"
                                :limit= "parseInt('2')"
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
                    </el-form-item>
                    <!--============= Upload Your Payment Receipt ========-->
                    <!--Deposited Noted -->
                    <el-form-item class="pb-4" label="Deposited Noted" prop="depositedNoted">
                        <el-input 
                            v-model="formPopupWithdrawWallet.depositedNoted" 
                            style="width: 100%" type="textarea" 
                        />
                    </el-form-item>
                    <!-- Form Submitted -->
                    <el-form-item class="flex flex-column">
                        <el-button type="primary" @click="onSubmitUploadRecentWithdrawWallet('formPopupWithdrawWalletRef')">Upload Receipt</el-button>
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
            dialogVisibleDeposit: false,
            dialogImageUrl:"",
            fileUploadUrl: "File upload URL address",
            fileUploadDeposit: '',
            showUpload: true,
            objFileUploadDeposit: {
                upLoadShowCat: true,
                upLoadHideCat: false,
            },
            formPopupWithdrawWallet: [
                {
                    reasonTypeWithdraw: '',
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
            rulesWithdrawWallet: {
                bankRecharge: [
                    { required: true, message: 'Please select bank company', trigger: 'change' }
                ],
                enterAmountWallet: [
                    { validator: checkValidationDepositedAmount, trigger: 'blur' }
                ],
                reasonTypeWithdraw: [
                    { required: true, message: 'Please select reason for your withdraw', trigger: 'change' }
                ],
                recentUploadDepositedBankInvoice: [
                    { required: true, message: 'Please select file upload receipt', trigger: 'change' }
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
        handleChangeRecentUploadDeposit(file){
            this.beforeRecentUploadDeposit(file?.raw)
            this.objFileUploadDeposit.upLoadShowCat = true;
            this.objFileUploadDeposit.upLoadHideCat = false;
            // Hide
            this.showUpload = !this.showUpload
            // Check validation to upload receipt 
            this.formPopupDepositWallet.formPopupWithdrawWalletRef = file;
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
            if (fileList.length === 0) {
                this.formPopupDepositWallet.formPopupDepositWallet = null
                this.$refs.formPopupDepositWalletRef.validateField('recentUploadDepositedBankInvoice')
            }
        },  
        handleFileSuccessRecentUploadDeposited(file){
            this.$message.warning(file);
        },
        /** @Handle Upload Receipt Deposit to Wallets */  
        onSubmitUploadRecentWithdrawWallet(fromSubmitted){
            this.$refs[fromSubmitted].validate((valid) => {
                if (valid) {
                    console.log("sadsad")
                    return false;
                } else {
                    this.$notify.error({
                        title: 'Withdraw from Wallet',
                        message: 'Please enter amount withdraw from wallet'
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
    .hideUpload > div {
        display: none;
    }
</style>