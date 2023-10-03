<template>
    <!-- Withdraw Wallet Balance -->
    <div>
        <!-- Button Open dialogs -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click="openDialogRequestBalanceAccountWallet()"
                v-permission="[
                    {
                        functionName: 'withdraw_wallet_module',
                        moduleName: 'fun_create',
                    },
                ]"
            >
                <div class="button">
                    <i class="pi pi-credit-card" style="font-size: 1rem"></i>
                    <span class="pl-2">Withdraw</span>
                </div>
            </el-button>
        </div>
        <!-- Dialog Open Request Balance Wallet Account Vendors -->
        <el-dialog
            v-model="centerDialogVisibleWalletRequest"
            title="Withdraw Request"
            width="30%"
            align-center
        >
            <!--Form Request-->
            <el-form
                ref="ruleFormRefBalanceWithdrawRequest"
                :model="formRequestBalanceMD"
                :rules="rulesFrmRequestBalanceWithdrawWallet"
                label-width="120px"
                label-position="top"
            >
                <el-form-item label="Bank Name" prop="bankCompanyName">
                    <el-input
                        v-model="formRequestBalanceMD.bankCompanyName"
                        placeholder="Example: ABA, Acelida,..."
                    />
                </el-form-item>
                <el-form-item
                    label="Account Name"
                    prop="bankAccountNameRequest"
                >
                    <el-input
                        v-model="formRequestBalanceMD.bankAccountNameRequest"
                        placeholder="Example: Oeun Panha"
                    />
                </el-form-item>
                <el-form-item
                    label="Account Number"
                    prop="bankAccountNumberRequest"
                >
                    <el-input
                        v-model="formRequestBalanceMD.bankAccountNumberRequest"
                        placeholder="Example: 500 561 978"
                    />
                </el-form-item>
                <!-- Currency -->
                <el-form-item
                    label="Currency Type"
                    prop="currencyAmountRequest"
                >
                    <el-select
                        v-model="formRequestBalanceMD.currencyAmountRequest"
                        placeholder="Please Select Currency"
                        class="w-full"
                    >
                        <el-option label="RIEL" value="currency_riel" />
                        <el-option label="USD" value="currency_dollar" />
                    </el-select>
                </el-form-item>
                <template
                    v-if="formRequestBalanceMD.currencyAmountRequest !== ''"
                >
                    <el-form-item
                        :label="currencyExchangeType"
                        prop="requestAmountWithdraw"
                    >
                        <el-input-number
                            v-model="formRequestBalanceMD.requestAmountWithdraw"
                            precision="2"
                            :step="0.1"
                            placeholder="Enter Amount Withdraw"
                            class="w-full"
                        />
                    </el-form-item>
                </template>
                <!--============= Upload Your Payment Receipt ========-->
                <el-form-item
                    label="Upload QR Code"
                    prop="requestUploadQRCodeAmountRequest"
                    style="width: 100%"
                >
                    <!-- Title Noted Upload -->
                    <div class="text-sm">
                        <span>
                            Please upload pictures your bank account information
                            or QR Code
                        </span>
                    </div>
                    <el-upload
                        action="#"
                        v-model="
                            formRequestBalanceMD.requestUploadQRCodeAmountRequest
                        "
                        accept=".jpg,.jpeg,.png"
                        list-type="picture"
                        :on-preview="handlePictureCardPreviewWallet"
                        :on-change="handleChangeWithdrawBalanceWalletVendor"
                        :auto-upload="false"
                        ref="fileUploadDeposit"
                        :on-exceed="handleExceedRecentQRCode"
                        class="avatar-uploader-cover"
                        :limit="parseInt('1')"
                        :http-request="handleFileSuccessRecentUploadDeposited"
                        autocomplete="off"
                        :on-remove="fileRemoveReceiptUploadQRCode"
                    >
                        <div
                            class="flex flex-column justify-content-center px-4 py-8 border-1 border"
                            style="width: 100%"
                        >
                            <i
                                class="pi pi-cloud-upload"
                                style="font-size: 2rem"
                            ></i>
                            <p class="font-bold text-sm">
                                Upload Your QR Code Or Account Info!
                            </p>
                        </div>
                        <!--Dialogs-->
                        <el-dialog v-model="dialogVisibleWithdraw">
                            <el-image
                                :initial-index="4"
                                :preview-src-list="dialogImageUrlWallet"
                                fit="cover"
                                :zoom-rate="1.2"
                                width="100%"
                                :src="dialogImageUrlWallet"
                                alt=""
                            />
                        </el-dialog>
                    </el-upload>
                </el-form-item>
                <!--============= Upload Your Payment Receipt ========-->
                <el-form-item label="Remarks">
                    <el-input
                        v-model="formRequestBalanceMD.requestWithdrawDesc"
                        type="textarea"
                        placeholder="Remark"
                    />
                </el-form-item>
            </el-form>
            <!-- Footer Button Submitted -->
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisibleWalletRequest = false"
                        >Cancel</el-button
                    >
                    <el-button
                        type="primary"
                        @click="
                            confirmRequestWithdrawWalletVendor(
                                'ruleFormRefBalanceWithdrawRequest'
                            )
                        "
                    >
                        Request
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import WithdrawWalletVendorBankAccountServices from '../../../services/vendors/withdraw_wallet_vendor/WithdrawWalletsVendorServices';
import convertUSDToRiel from '@/utils/convertUSDTORiel';
import {mapGetters} from "vuex";
import { isLoggedIn } from "@/utils/auth/auth";

export default {
    components: {},
    props: {},
    data() {
        return {
            centerDialogVisibleWalletRequest: false,
            dialogImageUrlWallet: null,
            dialogVisibleWithdraw: false,
            formRequestBalanceMD: {
                bankCompanyName: "",
                bankAccountNameRequest: "",
                bankAccountNumberRequest: "",
                requestAmountWithdraw: 1,
                requestWithdrawDesc: "",
                requestUploadQRCodeAmountRequest: null,
                currencyAmountRequest: "",
            },
            rulesFrmRequestBalanceWithdrawWallet: {
                bankCompanyName: [
                    {
                        required: true,
                        message: "Please enter bank name",
                        trigger: "blur",
                    },
                ],
                bankAccountNameRequest: [
                    {
                        required: true,
                        message: "Please enter bank account name",
                        trigger: "blur",
                    },
                    { min: 3, message: "Length should be 3", trigger: "blur" },
                ],
                bankAccountNumberRequest: [
                    {
                        required: true,
                        message: "Please enter bank account number",
                        trigger: "blur",
                    },
                ],
                currencyAmountRequest: [
                    {
                        required: true,
                        message: "Please enter currency type",
                        trigger: "change",
                    },
                ],
                requestAmountWithdraw: [
                    {
                        required: true,
                        message: "Please enter amount withdraw from wallet",
                        trigger: "blur",
                    },
                ],
                requestUploadQRCodeAmountRequest: [
                    {
                        required: true,
                        message:
                            "Please upload your bank information or qr code",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    computed: {
        ...mapGetters({
            currentUser: 'auth/currentUserAuth',
        }),
        currentUserAuth() {
            return this.currentUser ? this.currentUser : null;
        },
        currencyExchangeType() {
            let enterAmount;
            if (
                this.formRequestBalanceMD.currencyAmountRequest ===
                "currency_riel"
            ) {
                return (enterAmount = "Amount (៛): ");
            } else if (
                this.formRequestBalanceMD.currencyAmountRequest ===
                "currency_dollar"
            ) {
                return (enterAmount = "Amount ($): ");
            }
            return enterAmount ? enterAmount : "";
        },
    },
    created() {
        this.vendorWithdrawWalletBank = new WithdrawWalletVendorBankAccountServices();
    },
    methods: {
        isLoggedIn() {
            return isLoggedIn();
        },
        // Convert Currency Amount
        currencyFormattedKHRiel: function(value) {
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD: function(value) {
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
        async convertRielAmountWithdrawWallet(usdAmount){
           try {
                const amountConvertRiel =  parseInt(usdAmount) ? parseInt(usdAmount) : 0;
                this.exchangeRateRielProPrice = await convertUSDToRiel(amountConvertRiel) ?? 0;
                const result = await Promise.resolve(amountConvertRiel)
                return result;
           } catch (error) {
                return Promise.reject(error);
           }
        },
        // Handle Upload QRCode
        handlePictureCardPreviewWallet(file) {
            // Preview Upload
            this.dialogVisibleWithdraw = true;
            this.dialogImageUrlWallet = file?.url;
        },
        openDialogRequestBalanceAccountWallet() {
            this.centerDialogVisibleWalletRequest = true;
        },
        handleChangeWithdrawBalanceWalletVendor(file, fileList) {
            this.beforeRecentUploadQRCodeBankAcc(file?.raw);
            this.showUpload = !this.showUpload;
            // Check validation to upload receipt
            this.formRequestBalanceMD.requestUploadQRCodeAmountRequest = file;
            if (fileList.length !== 0) {
                this.$refs.ruleFormRefBalanceWithdrawRequest.validateField(
                    "requestUploadQRCodeAmountRequest"
                );
            }
        },
        beforeRecentUploadQRCodeBankAcc(rawFile) {
            if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
                this.$message.error(
                    `Picture must be JPG or PNG format! : ${rawFile?.name}`
                );
                return false;
            } else if (rawFile.size / 1024 / 1024 > 2) {
                this.$message.error(
                    `Picture size can not exceed 2MB! : ${rawFile?.name}`
                );
                return false;
            }
            return true;
        },
        handleExceedRecentQRCode(files, fileList) {
            this.$message.warning(
                `Currently, 1 pictures are limited to be selected. This time, it is selected ${
                    files.length
                } Pictures selected ${files.length + fileList.length} Pictures`
            );
        },
        fileRemoveReceiptUploadQRCode(uploadFile, fileList) {
            // Check validation to upload receipt
            this.formRequestBalanceMD.requestUploadQRCodeAmountRequest =
                uploadFile;
            if (fileList.length !== 0) {
                this.$refs.ruleFormRefBalanceWithdrawRequest.validateField(
                    "requestUploadQRCodeAmountRequest"
                );
            }
        },
        confirmRequestWithdrawWalletVendor(fromRequestWithdraw) {
            if (!fromRequestWithdraw) return;
            this.$refs[fromRequestWithdraw].validate((valid) => {
                if (valid) {
                    // Check Validation
                    if(this.formRequestBalanceMD !== ''){
                           //File Upload Withdraw Bank Accounts
                            const receiptUploadFileWithdraw = this.formRequestBalanceMD
                                .requestUploadQRCodeAmountRequest
                                ? this.formRequestBalanceMD
                                    .requestUploadQRCodeAmountRequest
                                : "";
                            // Submitted API Request withdraw wallets 
                            const requestWithdrawWallet = {
                                companyBank: this.formRequestBalanceMD.bankCompanyName
                                    ? this.formRequestBalanceMD.bankCompanyName
                                    : "",
                                accountsNameVendorRequest: this.formRequestBalanceMD
                                    .bankAccountNameRequest
                                    ? this.formRequestBalanceMD.bankAccountNameRequest
                                    : "",
                                accountNumberVendorRequest: this.formRequestBalanceMD
                                    .bankAccountNumberRequest
                                    ? this.formRequestBalanceMD.bankAccountNumberRequest
                                    : 0,
                                requestAmountVendorRequest: this.formRequestBalanceMD
                                    .requestAmountWithdraw
                                    ? this.formRequestBalanceMD.requestAmountWithdraw
                                    : 0,
                                fileReceiptWithdrawRequest:
                                    receiptUploadFileWithdraw?.raw
                                    ? receiptUploadFileWithdraw?.raw
                                    : "",
                                currencyType: this.formRequestBalanceMD
                                    .currencyAmountRequest
                                    ? this.formRequestBalanceMD.currencyAmountRequest
                                    : "",
                                withdrawRequestNoted: this.formRequestBalanceMD
                                    .requestWithdrawDesc
                                    ? this.formRequestBalanceMD.requestWithdrawDesc
                                    : "",
                            };
                    // Confirm Request Bank Wallet
                    this.$confirm('Are you confirm to withdraw request amount in wallet?', 'Withdraw Request Amount from Wallet', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'info',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = 'Loading...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                        instance.confirmButtonLoading = false;
                                    }, 300);
                                }, 1000);
                            } else {
                                 done();
                            }
                        }
                    }).then(() => {
                        this.vendorWithdrawWalletBank.createRequestMethodWithdrawWalletVendor(requestWithdrawWallet)
                            .then((withdraw) => {
                                    if(withdraw.data.success === true){
                                        this.$notify.success({
                                            title: 'Please waiting confirm withdraw from wallet by Admin',
                                            message: withdraw.data?.message ? withdraw.data?.message : '' ,
                                            showClose: false
                                        });
                                        //Close form -> Successfully to submitted   
                                        this.centerDialogVisibleWalletRequest = false;
                                        window.location.reload();
                                        //Set timeout closed loading confirm deposited
                                        this.formRequestBalanceMD = {};
                                    }else{
                                        this.$notify.error({
                                            title: 'Error withdraw from wallet',
                                            message: 'Please contact to admin',
                                            showClose: false
                                        });
                                    }
                            }).catch((error) => {
                                if(error){
                                    this.$notify.error({
                                        title: 'Error withdraw from wallet, please contact to admin',
                                        message: error.response.data.error.message ?? 'Unsuccessfully for withdraw method to wallet',
                                        showClose: false
                                    });  
                                    if(error.response.data.error.error.errors){
                                        for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                            const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                            this.$notify.error({
                                                title: 'Unsuccessfully for withdraw method to wallet',
                                                message: messageValidation ?? 'Unsuccessfully for withdraw method to wallet',
                                                showClose: true
                                            });   
                                        }
                                    } 
                                }
                            }); 
                    }).catch(() => {
                        this.$notify.warning({
                            title: "Cancel to withdraw wallet balance",
                            showClose: true
                        });
                        return false;
                    });
                    }        
                } else {
                    this.$notify.error({
                        title: "Error Withdraw from Wallet",
                        message: "Please input filed in required",
                    });
                    return false;
                }
            });
        },
    },
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
