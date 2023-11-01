<template>
    <button
        aria-label="submit"
        class="primary-btn plr-20 mb-15 text-sm"
        @click.prevent="dialogTableVisibleOpeDeposit = true"
    >
            Deposited to wallet
    </button>
     <div class="flex justify-content-center flex-wrap">
            <div class="grid gap-3 p-fluid"> 
                <el-dialog v-model="dialogTableVisibleOpeDeposit"  
                    width="28%"
                    align-center
                    :rules="rulesWithdrawWallet"
                    status-icon
                    class="demo-ruleForm"
                    title="Deposit to Wallet"  @close="closeFromDeposit">
        
                    <div class="py-2">
                        <!-- Toast Alert-->
                        <Toast />
                        <div class="px-2 flex">
                            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid"> 
                                <el-form 
                                    ref="formPopupDepositWallet"
                                    :model="formPopupDepositWallet"
                                    label-position="top"
                                    :rules="rulesDepositedWallet"
                                    label-width="500px"
                                    status-icon
                                >
                                    <!-- Radio Choose bank accounts -->
                                    <el-form-item label="Bank recharged" prop="bankRecharge">
                                        <el-radio-group 
                                            autocomplete="off"  
                                            class="w-full"
                                            v-model="formPopupDepositWallet.bankRecharge"
                                        >
                                            <el-radio border label="ABA Bank" name="aba-bank-company"/>
                                            <el-radio border label="ACLEDA Bank"  name="acleda-bank-company"/>
                                        </el-radio-group>
                                    </el-form-item>
                                    <!-- Enter Amount -->
                                    <el-form-item style="width: 100%; border: none;" label="Enter Amount (៛)" prop="enterAmountWallet">
                                        <el-input-number 
                                            v-model="formPopupDepositWallet.enterAmountWallet"
                                            :min="4100" 
                                            style="width: 100%; border: none;" 
                                            :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                                            :precision="2"
                                            autocomplete="off"  
                                        />
                                    </el-form-item>
                                    <!-- Enter Date Time-->
                                    <el-form-item style="width: 100%;" label="Enter Deposited Time" prop="enterDepositedDateTime">
                                        <el-date-picker
                                            arrow-control
                                            style="width: 100%; outline: none;border: none;" 
                                            :action="fileUploadUrl"
                                            v-model="formPopupDepositWallet.enterDepositedDateTime"
                                            type="datetime"
                                            placeholder="Pick a day"
                                            autocomplete="off"  
                                        />
                                    </el-form-item>
                                    <!--============= Upload Your Payment Receipt ========-->
                                    <el-form-item label="Recent Upload" prop="recentUploadDepositedBankInvoice">
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
                                            <div class="flex align-items-center justify-content-center px-4 py-8 border-1 border">
                                                <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                <p class="font-bold text-sm pl-4">Upload Your Payment Receipt!</p>
                                            </div>
                                            <!--Dialogs-->
                                            <el-dialog v-model="dialogVisibleDeposit">
                                                <el-image :initial-index="4" :preview-src-list="dialogImageUrl"  fit="cover" :zoom-rate="1.2" :src="dialogImageUrl" alt="" />
                                            </el-dialog>
                                        </el-upload>
                                        <!-- Title Noted Upload -->
                                    
                                    </el-form-item>
                                    <!-- <el-form-item>
                                        <div class="text-sm flex">
                                            <span class="p-error"> *</span>
                                            <span class="flex flex-column">
                                                Please upload pictures according to the examples.
                                            </span>
                                        </div>
                                    </el-form-item> -->
                                    <!--============= Upload Your Payment Receipt ========-->
                                    <!-- Image Validation Upload Deposited -->
                                    <!-- Account ABA Bank -->
                                    <template v-if="formPopupDepositWallet.bankRecharge  === 'ABA Bank'">
                                            <div class="demo-image__preview pb-4">
                                                <el-image 
                                                    style="width: 340px; height: 400px;"
                                                    :src="urlABABankAcc" 
                                                    :zoom-rate="1.2"
                                                    fit="cover"
                                                    :preview-src-list="srcListAccountBankABA">
                                                </el-image>
                                            </div>
                                    </template>
                                    <!-- Account ACLEDA Bank -->
                                    <template v-if="formPopupDepositWallet.bankRecharge  === 'ACLEDA Bank'">
                                            <div class="pb-4">
                                                <el-image 
                                                    style="width: 300px; height: 400px"
                                                    :src="urlACLEDABankAcc" 
                                                    :zoom-rate="1.2"
                                                    fit="cover"
                                                    :preview-src-list="srcListAccountBankACLEDA">
                                                </el-image>
                                            </div>
                                    </template>
                                    <!--Deposited Noted -->
                                    <el-form-item label="Deposited Noted" prop="depositedNoted">
                                        <el-input 
                                            v-model="formPopupDepositWallet.depositedNoted"  
                                            type="textarea" 
                                        />
                                    </el-form-item>
                                    <!-- Form Submitted -->
                                    <el-form-item class="flex flex-column">
                                        <button
                                            aria-label="submit"
                                            class="primary-btn plr-20 mb-15 text-sm w-full"
                                           @click.prevent="onSubmitUploadRecentDepositWallet('formPopupDepositWallet')"
                                        >
                                                Upload Receipt
                                        </button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        <!-- Toast Alert Message -->
                            <Toast />
                        </div>
                    </div>
                </el-dialog>

            </div>
    </div>
</template>
<!-- Script of Popup withdraw to wallets -->
<script>
import CustomerDepositedToWalletService from '../../../../../services/my_wallets/deposited/CustomersDepositedServices';
// import { mapGetters, mapActions } from "vuex";
export default {
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
            dialogTableVisibleOpeDeposit: false,
            urlABABankAcc: process.env.VUE_APP_PATH_FILE + 'wallets/company_bank_aba.jpg',
            srcListAccountBankABA: [process.env.VUE_APP_PATH_FILE + 'wallets/company_bank_aba.jpg'],
            urlACLEDABankAcc: process.env.VUE_APP_PATH_FILE + 'wallets/company_bank_aclida.jpg',
            srcListAccountBankACLEDA: [process.env.VUE_APP_PATH_FILE + 'wallets/company_bank_aclida.jpg'],
            dialogVisibleDeposit: false,
            dialogImageUrl:"",
            fileUploadUrl: "File upload URL address",
            fileUploadDeposit: '',
            submitDepositWallet: false,
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
    created() {
        this.customerDepositedWalletService = new CustomerDepositedToWalletService();
    },
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
        /** @Handle Upload Receipt Deposit to Wallets to server request by admin */  
        onSubmitUploadRecentDepositWallet(fromSubmitted){
            this.$refs[fromSubmitted].validate((valid) => {
                if (valid) {
                    // Check Validation 
                    const receiptUploadFile = this.formPopupDepositWallet.recentUploadDepositedBankInvoice ? this.formPopupDepositWallet.recentUploadDepositedBankInvoice : '';
                    //Convert date 
                    const convertDateTimeDeposit = new Date(this.formPopupDepositWallet.enterDepositedDateTime).toISOString();
                    //Check Bank Charge
                    let companyBankAccount;
                    const bankCharge = this.formPopupDepositWallet?.bankRecharge ?? '';
                    switch(bankCharge){
                        case "ABA Bank":
                            companyBankAccount = "ABA-BANK-PLC-COM-ADMIN-PANHA";
                        break;
                        case "ACLEDA Bank":
                            companyBankAccount = "ACELIDA-BANK-PLC-COM-ADMIN-DARAROTH";
                        break;
                        default:
                            companyBankAccount;  
                    }
                    const depositAmount = {
                        depositBankCompany : companyBankAccount ? companyBankAccount : '',
                        accountNumberSendToAdminDeposited: 'Admin Deposited',
                        depositAmountDeposited: this.formPopupDepositWallet.enterAmountWallet ? this.formPopupDepositWallet.enterAmountWallet : 0,
                        depositDateTime: convertDateTimeDeposit ? convertDateTimeDeposit : '',
                        recentUploadPayReceipt: receiptUploadFile?.raw ? receiptUploadFile?.raw : 0,
                        descriptionDeposited: this.formPopupDepositWallet.depositedNoted ? this.formPopupDepositWallet.depositedNoted : ''
                    }
                    this.customerDepositedWalletService.addDepositedAmountToWalletByCustomer(depositAmount).then((deposit) => {
                        if(deposit.data.success === true){
                            this.$notify.success({
                                title: 'Please waiting confirm deposit to wallet from Admin',
                                message: deposit.data?.message ? deposit.data?.message : '' ,
                                showClose: false
                            });
                            //Close form -> Successfully to submitted
                            this.closeFromDeposit(); 
                            window.location.reload();
                            //Set timeout closed loading confirm deposited
                            this.formPopupDepositWallet = {};
                        }else{
                            this.$notify.error({
                                title: 'Error Deposited to deposited to wallet',
                                message: 'Please contact to admin',
                                showClose: false
                            });
                        }
                    }).catch((error) => {
                        if(error){
                            this.$notify.error({
                                title: 'Error Deposited to deposited to wallet',
                                message: error.response.data.error.message ?? 'Unsuccessfully for deposited to wallet',
                                showClose: false
                             });   
                        }
                    }).finally(() => {
                        this.dialogVisibleDeposit =  false
                    });
                } else {
                    this.$notify.error({
                        title: 'Error Deposit to Wallet',
                        message: 'Please enter deposit amount to wallet'
                    });
                    return false;
                }
            });
        },
        closeFromDeposit(){
            this.dialogTableVisibleOpeDeposit = false;
        },
        // Smart Way to truncate long string to short      
        truncateLongTextTransactionNumber(str, length, useWordBoundary){
            if (str.length <= length) { return str; }
            const subString = str.slice(0, length - 1); // the original check
            return (useWordBoundary
                ? subString.slice(0, subString.lastIndexOf(" "))
                : subString) + "...";
        }
    }
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