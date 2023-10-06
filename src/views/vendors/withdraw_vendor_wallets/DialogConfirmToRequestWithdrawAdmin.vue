<template>
    <!-- Processing -->
    <div class="float-right">
        <el-button plain class="w-10rem hover:bg-red-500" @click="processConfirmRequestWithdrawAdmin()">Process</el-button>                    
    </div>
    <!-- Confirm Dialog To  refunds to vendor request -->
    <el-dialog
        v-model="centerDialogVisibleWithdrawAdmin"
        title="Withdraw request process"
        width="30%"
        destroy-on-close
        
    >
            <!-- FORM -->
            <el-form
                ref="ruleFormRefConfirmRequest"
                :model="ruleFormRequestAdminConfirmModel"
                :rules="rulesConfirmAdminWithdrawAdmin"
                label-width="200px"
                class="demo-ruleForm"
                size="large"
                status-icon
                label-position="top"
            >
                <!--Select Status -->
                <el-form-item label="Request:" prop="requestStatusConfirm">
                    <el-select class="w-full" 
                        v-model="ruleFormRequestAdminConfirmModel.requestStatusConfirm" 
                        placeholder="Select Request"
                    >
                        <el-option label="Approve" value="Completed" />
                        <el-option label="Deny" value="Reject" />
                    </el-select>
                </el-form-item>
                <!--  -->
                <el-form-item label="Note About Transaction Or Request:" prop="descTransitionOrRequest">
                        <el-input v-model="ruleFormRequestAdminConfirmModel.descTransitionOrRequest" type="textarea" />
                </el-form-item>
            </el-form>
            <!-- Footer Confirm To Request Amount -->
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisibleWithdrawAdmin = false" class="hover:surface-400 w-8rem">Cancel</el-button>
                    <el-button class="bg-red-500 hover:bg-red-500 border-none w-10rem" type="primary" @click="saveConfirmWithdrawAdminProcessing('ruleFormRefConfirmRequest')">
                        Confirm
                    </el-button>
                </span>
            </template>
    </el-dialog>
</template>
<script>
import WithdrawWalletVendorBalanceAdminService from '../../../services/administrator/withdraw_wallet_admin/WithdrawWalletVendorBalanceAdmin';
export default {
    components: {},
    props: {},
    data() {
        return {
            ruleFormRefConfirmRequest: '',
            centerDialogVisibleWithdrawAdmin: false,
            ruleFormRequestAdminConfirmModel: {
                requestStatusConfirm: null,
                descTransitionOrRequest: ''
            },
            rulesConfirmAdminWithdrawAdmin: {
                requestStatusConfirm: [
                    {
                        required: true,
                        message: 'Please select request confirm vendor',
                        trigger: 'change',
                    }
                ],
            }
        };
    },
    created() {
        this.withdrawConfirmAdmin  = new WithdrawWalletVendorBalanceAdminService();
    },
    methods: {
        processConfirmRequestWithdrawAdmin(){
            this.centerDialogVisibleWithdrawAdmin = true;
        },
        async saveConfirmWithdrawAdminProcessing(withdrawConfirm){
            if (!withdrawConfirm) return
            await  this.$refs[withdrawConfirm].validate((valid) => {
                if (valid) {
                    if(this.ruleFormRequestAdminConfirmModel !== ''){
                        const statusConfirmVendorWithdraw = this.ruleFormRequestAdminConfirmModel
                            .requestStatusConfirm
                            ? this.ruleFormRequestAdminConfirmModel
                                .requestStatusConfirm
                            : "Completed";
                        const descriptionConfirmByAdmin = this.ruleFormRequestAdminConfirmModel
                            .requestStatusConfirm
                            ? this.ruleFormRequestAdminConfirmModel
                                .descTransitionOrRequest
                            : "";
                            // Confirm Admin
                            this.$confirm('Are you confirm request amount in wallet from vendor?', 'Withdraw Request Amount from Wallet', {
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
                                const confirmRequestAdmin = {
                                    requestStatusWithdraw: statusConfirmVendorWithdraw ? statusConfirmVendorWithdraw : '',
                                    requestDesc: descriptionConfirmByAdmin ? descriptionConfirmByAdmin : ''
                                }
                                const withdrawRequestId =  parseInt(this.$route.params.withdrawId) ? parseInt(this.$route.params.withdrawId) : 0;
                                this.withdrawConfirmAdmin.createConfirmWithdrawRequestAdminToVendor(withdrawRequestId,confirmRequestAdmin)
                                        .then((withdraw) => {
                                            if(withdraw.data.success === true){
                                                this.$notify.success({
                                                    title: 'Please waiting confirm withdraw from wallet by Admin',
                                                    message: withdraw.data?.message ? withdraw.data?.message : '' ,
                                                    showClose: false
                                                });
                                                //Close form -> Successfully to submitted   
                                                this.centerDialogVisibleWithdrawAdmin = false;
                                                this.$router.push('/vendor/user/list/admin/sellers/withdraw_request_balance_in_account/list');
                                                //Set timeout closed loading confirm deposited
                                                this.ruleFormRequestAdminConfirmModel = {};
                                            }else{
                                                this.$notify.error({
                                                    title: 'Error withdraw from wallet confirm by admin',
                                                    message: 'Please contact to us',
                                                    showClose: false
                                                });
                                            }
                                    }).catch((error) => {
                                        if(error){
                                                this.$notify.error({
                                                    title: 'Error withdraw from wallet confirm by admin, please contact to admin',
                                                    message: error.response.data.error.message ?? 'Unsuccessfully for withdraw method to wallet confirm by admin, please contact',
                                                    showClose: false
                                                });  
                                                if(error.response.data.error.error.errors){
                                                    for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                                        const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                                        this.$notify.error({
                                                            title: 'Unsuccessfully for withdraw method to wallet confirm by admin, please contact',
                                                            message: messageValidation ?? 'Unsuccessfully for withdraw method to wallet confirm by admin, please contact',
                                                            showClose: true
                                                        });   
                                                    }
                                                } 
                                        }
                                    });
                            }).catch(()=> {
                                this.$notify.warning({
                                    title: "Cancel to confirm withdraw wallet balance",
                                    showClose: true
                                });
                                return false;
                            });
                        console.log(statusConfirmVendorWithdraw)
                    }
                } else {
                     this.$notify.error({
                        title: "Error Confirm Request Withdraw Vendor",
                        message: "Please input filed in required",
                    });
                    return false;
                }
            })
        }
    },
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>