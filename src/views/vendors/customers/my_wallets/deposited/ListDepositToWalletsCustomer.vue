<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="layout-content px-2 py-2">
        <!-- ======Confirm Dialog to Deposited or Withdraw to Customer Wallet========== -->
        <ConfirmDialog></ConfirmDialog>
        <!-- ======Confirm Dialog to Deposited or Withdraw to Customer Wallet========== -->
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h2 class="relative text-black text-xl section section-title:before">{{ $t('walletModule.walletList') }}</h2>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card class="box-card py-2 px-2">
                    <div>
                        <div class="px-2">
                            <!-- Data Tables -->
                            <DataTable ref="dt" :value="customerTransactionArr" v-model:selection="selectedWalletDeposited"
                                dataKey="id" :paginator="true" :rows="10" :filters="filters"
                                class="p-datatable-scrollable text-sm"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                :rowsPerPageOptions="[5, 10, 25]"
                                :globalFilterFields="['representative.name', 'full_latin_name', 'user_email', 'user_phonenumber']"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} wallet">
                                <!-- Header -->
                                <template #header>
                                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                        <h4 class="m-0">

                                        </h4>
                                        <span class="p-input-icon-left text-sm">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters['global'].value" class=" text-sm"
                                                :placeholder="$t('route.search')" />
                                        </span>
                                    </div>
                                </template>
                                <!-- Empty Users -->
                                <template #empty>{{ $t('walletModule.walletListNotFound') }} </template>
                                <!-- Loading Users -->
                                <template #loading> Loading transactions data. Please wait... </template>
                                <!--------------Check Existed Data ----------->
                                <div
                                    v-if="customerTransactionArr && customerTransactionArr.length > 0 && customerTransactionArr != ''">
                                    <!-- Columns -->
                                    <Column field="transactionDate" header="Transaction ID" sortable>
                                        <template #body="slotProps">
                                            <span>{{ convertTruncateLongText(slotProps.data?.transactionId, 15, '\b') ?? 0
                                            }} </span>
                                        </template>
                                    </Column>
                                    <Column field="transactionDate" header="Transaction Date" sortable>
                                        <template #body="slotProps">
                                            <span>{{ slotProps.data?.transactionDate ?? 0 }}</span>
                                        </template>
                                    </Column>
                                    <Column field="customerName" header="Customer Name" sortable></Column>
                                    <Column field="balanceDollar" header="Balance Dollar" sortable>
                                        <template #body="slotProps">
                                            <div class="flex flex-column gap-2">
                                                <span class="font-bold">{{ slotProps.data?.balanceRiel ?? '' }}</span>
                                                <span>{{ slotProps.data?.balanceDollar ?? '' }}</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column field="transactionType" header="Transaction Type" sortable>
                                        <template #body="slotProps">
                                            <Tag class="font-bold" :value="slotProps.data?.transactionType ?? 0"
                                                :style="{ background: 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)' }" />
                                        </template>
                                    </Column>
                                    <Column :exportable="false" header="Transaction Status" v-permission="[{ functionName: 'wallet_customer_module', moduleName: 'fun_edit' }]">
                                        <template #body="slotProps">
                                            <!-- Check Confirm -->
                                            <template v-if="slotProps.data?.transactionStatus === 'Pending'">
                                                <Button icon="pi pi-wallet" outlined rounded severity="danger"
                                                @click="popupDialogConfirmRequestByTransaction(parseInt(slotProps.data?.payTransactionId))" />
                                            </template>
                                            <!-- Check reject -->
                                            <template v-else>
                                                 <Tag :value="slotProps.data?.transactionStatus" severity="danger"></Tag>
                                            </template>
                                        </template>
                                    </Column>
                                </div>
                            </DataTable>
                        </div>
                        <!-- ===============Dialog Confirm to Deposited or Withdraw wallet======================= -->
                        <Dialog v-model:visible="confirmDialogTransaction"  :style="{ width: '700px' }"
                            header="Add Found" modal>
                            <!-- Form Submitted module -->
                            <form class="p-fluid" method="PUT">
                                <div v-focustrap class="grid formgrid">
                                    <!-- Customer Detail Information -->
                                    <div class="col-12 field">
                                        <label for="name_en">Transaction Type:</label>
                                        <Dropdown id="transactionType"
                                            placeholder="Please Select Transaction Type"
                                            :options="optionTransactionType" 
                                            optionLabel="statusTran" 
                                            option-value="statusTran"
                                            v-model="v$.transactionArrConfirm.transactionTypeConfirmTransaction.$model"
                                            :input="v$.transactionArrConfirm.transactionTypeConfirmTransaction.$touch"
                                            :class="{ 'p-invalid border-round-lg p-error': v$.transactionArrConfirm.transactionTypeConfirmTransaction.$invalid && submitted }"
                                            aria-describedby="dd-error"
                                            class="text-sm border-round-lg" 
                                        />
                                        <!-- Validation -->
                                        <small v-if="(v$.transactionArrConfirm.transactionTypeConfirmTransaction.$invalid && submitted) 
                                            || v$.transactionArrConfirm.transactionTypeConfirmTransaction.$pending.$response" 
                                            class="p-error text-lg">
                                                {{ v$.transactionArrConfirm.transactionTypeConfirmTransaction.required.$message.replace('Value', 'Transaction Type') }}
                                        </small>
                                    </div>
                                    <div class="col-12 field">
                                        <div class="flex justify-content-between">
                                            <div>
                                                <label for="name_en">Customer Name:</label>
                                                <span class="font-bold pl-2">{{ transactionArrConfirm?.customerNameConfirmTransaction }}</span>
                                            </div>
                                            <div>
                                                <label for="name_en">Transaction Id:</label>
                                                <span class="font-bold pl-2">{{ transactionArrConfirm?.transactionIdConfirmTransaction }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 field">
                                        <div class="flex justify-content-between">
                                            <div>
                                                <label for="name_en">Transaction Balance Dollar:</label>
                                                <span class="font-bold pl-2">{{ transactionArrConfirm?.transactionBalanceDollarConfirmTransaction }} $</span>
                                            </div>
                                            <!-- Deposited Amount -->
                                            <div>
                                                <label for="name_en">Transaction Balance Riel:</label>
                                                <span class="font-bold pl-2">{{ transactionArrConfirm?.transactionBalanceRielConfirmTransaction }} ៛</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 field">
                                       <div class="flex justify-content-between">
                                            <div>
                                                <label for="name_en">Transaction Date Time:</label>
                                                <span class="font-bold pl-2">{{ transactionArrConfirm?.transactionDateTimeConfirmTransaction }}</span>
                                            </div>
                                       </div>
                                    </div>
                                    <!-- Reference (Optional) -->
                                    <div class="col-12 field">
                                        <label for="name_en">Reference (Optional)</label>
                                        <Textarea 
                                            id="customer_name" 
                                            placeholder="Reference"
                                            :input="transactionArrConfirm.transactionReferenceConfirmTransaction"
                                            v-model="transactionArrConfirm.transactionReferenceConfirmTransaction"
                                            type="text" class="text-sm border-round-lg" />
                                    </div>
                                    <!-- Images Receipt Invoice Bank Account Amount Transfer -->
                                    <div class="col-12 filed">
                                       <div class="flex justify-content-center demo-image__preview">
                                            <template v-if="paymentReceiptPreviewURL">
                                                <el-image  
                                                    style="width: 350px;"
                                                    :src="paymentReceiptPreviewURL" 
                                                    alt="Image"
                                                    preview 
                                                    :preview-src-list="paymentReceiptPreviewListURL"
                                                > 
                                                </el-image>
                                            </template>
                                       </div>
                                    </div>
                                </div>
                            </form>
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="confirmDialogTransaction = false" />
                                <Button label="Yes" icon="pi pi-check" text
                                    @click.prevent="confirmTransactionDepositedWallet(!v$.$invalid)" />
                            </template>
                        </Dialog>
                        <!-- ===============Dialog Confirm to Deposited or Withdraw wallet======================= -->
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>


<!-- Data Tables -->
<script>
// import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from 'primevue/api';
import CustomerDepositedWithDrawWalletServices from '@/services/administrator/customers/CustomerDepositedWithDrawWalletServices';
import { minLength, required } from '@vuelidate/validators';
import { useVuelidate } from "@vuelidate/core";
export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            selectedWalletDeposited: null,
            paymentReceiptPreviewURL: '',
            paymentReceiptPreviewListURL: [],
            usersID: '',
            customerTransactionArr: [],
            statusUsersSwitch: '',
            confirmDialogTransaction: false,
            transactionIdRequest: 0,
            statusUserSwitch: false,
            filters: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
            },
            submitted: false,
            transactionArrConfirm: {
                customerTransactionId: '',
                transactionIdConfirmTransaction: '',
                companyAccountNumber: '',
                companyAccountBankName: '',
                customerNameConfirmTransaction: '',
                customerCardNumberDepositRequestTransaction: '',
                transactionDateTimeConfirmTransaction: '',
                transactionBalanceRielConfirmTransaction: '',
                transactionBalanceDollarConfirmTransaction: '',
                transactionTypeConfirmTransaction: '',
                transactionReferenceConfirmTransaction: ''
            },
            optionTransactionType: [
                { statusTran: 'Pending',id: 1 },
                { statusTran: 'Completed', id: 2 },
                { statusTran: 'Reject', id: 3 },
            ]
        }
    },
    validations() {
        return {
            transactionArrConfirm: {
                transactionTypeConfirmTransaction: {
                    required,
                    minLength: minLength(3)
                },
            }
        }
    },
    created() {
        this.customerTransactionService = new CustomerDepositedWithDrawWalletServices();
    },
    mounted() {
        this.customerTransactionService.getTransactionDepositedWithdraw().then((transaction) => {
            if (!transaction) {
                this.customerArrAdmin = Array.isArray() ?? [];
            }
            this.customerTransactionArr = Array.isArray(transaction) ? transaction.slice() : [];
        }).catch((error) => {
            this.customerArrAdmin = Array.isArray() ?? [];
            Promise.reject(error);
        });
    },
    methods: {
        // Smart Way to truncate long string to short      
        convertTruncateLongText(str, length, useWordBoundary) {
            if (str.length <= length) { return str; }
            const subString = str.slice(0, length - 1); // the original check
            return (useWordBoundary
                ? subString.slice(0, subString.lastIndexOf(" "))
                : subString) + "...";
        },
        popupDialogConfirmRequestByTransaction(transactionId) {
            this.transactionIdRequest = parseInt(transactionId);
            this.confirmDialogTransaction = true;
            this.editTransactionWalletById(transactionId);
        },
        editTransactionWalletById(walletId){
           try{
                this.customerTransactionService.editTransactionHistoryDepositedWithdraw(parseInt(walletId) ? parseInt(walletId) : 1)
                    .then((editTranId) => {
                        if(!editTranId){
                            this.transactionArrConfirm = {};  
                        }
                        if (editTranId.status == 200) {
                            if(editTranId.data.success === true){
                                const {
                                    userId,
                                    transactionId,
                                    companyAccNumber,
                                    companyBankPLC,
                                    customerName,
                                    transactionDate,
                                    balanceDollar,
                                    balanceRiel,
                                    transactionStatus,
                                    paymentReceipt,
                                    paymentNumber,
                                    transactionType,
                                    transactionReference
                                } =  editTranId.data.result?.resultStatus[0] ?  editTranId.data.result?.resultStatus[0] : '';
                                this.transactionArrConfirm.customerTransactionId = userId ? userId : '';
                                this.transactionArrConfirm.transactionIdConfirmTransaction = transactionId ? transactionId : '';
                                this.transactionArrConfirm.companyAccountNumber = companyAccNumber ? companyAccNumber : '';
                                this.transactionArrConfirm.companyAccountBankName = companyBankPLC ? companyBankPLC : '';
                                this.transactionArrConfirm.transactionDateTimeConfirmTransaction = transactionDate ? transactionDate : '';
                                this.transactionArrConfirm.customerNameConfirmTransaction = customerName ? customerName : '';
                                this.transactionArrConfirm.customerCardNumberDepositRequestTransaction = paymentNumber ? paymentNumber : 0;
                                this.transactionArrConfirm.transactionBalanceDollarConfirmTransaction = balanceDollar ? balanceDollar : 0;
                                this.transactionArrConfirm.transactionBalanceRielConfirmTransaction = balanceRiel ? balanceRiel : 0;
                                this.transactionArrConfirm.transactionTypeConfirmTransaction = transactionStatus ? transactionStatus : '';
                                this.transactionArrConfirm.transactionTypeToWallet = transactionType ? transactionType : '';
                                this.transactionArrConfirm.transactionReferenceConfirmTransaction = transactionReference ? transactionReference : '';
                                // File Image
                                this.paymentReceiptPreviewURL = paymentReceipt ? paymentReceipt : ''; 
                                this.paymentReceiptPreviewListURL.push([
                                    paymentReceipt ? paymentReceipt : ''
                                ]); 
                            }   
                        }
                    }).catch((error) => {
                        Promise.reject(error);
                        return false;
                    });
           }catch(error){
             Promise.reject(error);
           }
        },
        confirmTransactionDepositedWallet() {
            try {
                this.submitted = true;
                this.isProcessingSubmit = false;
                if(this.transactionArrConfirm !== '' && this.transactionArrConfirm.transactionTypeConfirmTransaction !== ''){
                    const submitTransaction = {
                        customerIdRequestConfirm:  this.transactionArrConfirm?.customerTransactionId ? this.transactionArrConfirm?.customerTransactionId  : '',
                        paymentTransactionIdNumber: this.transactionArrConfirm.transactionIdConfirmTransaction ? this.transactionArrConfirm.transactionIdConfirmTransaction : '',
                        customerNumberCardRequest: this.transactionArrConfirm.customerCardNumberDepositRequestTransaction ? this.transactionArrConfirm.customerCardNumberDepositRequestTransaction : 0,
                        adminNumberCard: this.transactionArrConfirm.companyAccountNumber ? this.transactionArrConfirm.companyAccountNumber : '',
                        adminCompanyBank: this.transactionArrConfirm.companyAccountBankName ? this.transactionArrConfirm.companyAccountBankName : '',
                        statusTransactionAdminConfirmAddOnToDeposited: this.transactionArrConfirm.transactionTypeConfirmTransaction ? this.transactionArrConfirm.transactionTypeConfirmTransaction : '',
                        transactionTypeAdminConfirm:  this.transactionArrConfirm.transactionTypeToWallet ?  this.transactionArrConfirm.transactionTypeToWallet : '',
                        descriptionTransactionAdminRef:  this.transactionArrConfirm.transactionReferenceConfirmTransaction ?  this.transactionArrConfirm.transactionReferenceConfirmTransaction : ''
                    };
                    /*@Confirm to deposit or withdraw addon to customer**/
                    let statusLabelConfirm;
                    const statusTransaction = this.transactionArrConfirm?.transactionTypeConfirmTransaction ?? '';
                    switch(statusTransaction){
                        case "Pending":
                            statusLabelConfirm = "cancel add found";
                         break;
                        case "Completed":
                            statusLabelConfirm = "add found";
                          break;
                        case "Reject":
                            statusLabelConfirm = "reject add found";
                        break;
                         default:
                        statusLabelConfirm;  
                    }
                    this.$confirm(`You want to ${statusLabelConfirm}:
                                ${this.transactionArrConfirm.transactionBalanceDollarConfirmTransaction ?? 0}$ 
                                ( ${this.transactionArrConfirm.transactionBalanceRielConfirmTransaction ?? 0} ៛).
                            To  ${this.transactionArrConfirm.customerNameConfirmTransaction ?? ''},
                            To Wallet ?`,
                        'Are Your Sure', {
                            showCancelButton: true,
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Cancel',
                            type: 'warning',
                            center: true,
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
                            this.customerTransactionService.adminConfirmTransactionDepositWithDraw(submitTransaction)
                                .then((updatedAmount) => {
                                    if(updatedAmount.data.success === true){
                                        this.$notify.success({
                                            title: 'Successfully get transaction',
                                            message: updatedAmount.data?.message ?? '',
                                            showClose: false
                                        });  
                                        // Push Router
                                        this.$router.push("/vendor/user/list/admin/customer_wallet_list");
                                        window.location.reload();
                                        this.transactionArrConfirm = {};
                                        this.confirmDialogTransaction = false;
                                    }else{
                                        this.$notify.error({
                                            title: `Unsuccessful ${statusLabelConfirm} to wallet`,
                                            message: 'Please contact to admin',
                                            showClose: false
                                        });
                                    }
                                })
                        .catch((error) => {
                            if(error){
                                this.$notify.error({
                                    title: `Unsuccessful ${statusLabelConfirm} to wallet`,
                                    message: error.response.data?.error.message ?? '',
                                    showClose: false
                                });   
                            }
                        });
                    }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: 'Deposit to wallet was canceled'
                            });
                    });
                }
        
            } catch (error) {
                //  Toast Alert 
                Promise.reject(error);
            }
        }
    }
}
</script>
