<template>
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2 class="relative text-black text-xl section section-title:before">Message View</h2>
            <el-button type="info" size="large" class="btn btn-primary"
                @click.prevent="$router.push('/vendor/message-admin-vendor-confirm-deleted-product')">
                <div class="flex justify-between pl-2">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{ $t("route.routeBack") }}</span>
                </div>
            </el-button>
        </div>
        <!--Create Products-->
        <el-card class="box-card px-6 py-6">
            <!-- Content Message -->
            <div class="container">
                <div class="row">
                    <!-- By Admin Message Logs -->
                    <div class="col-lg-6">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header flex justify-content-between">
                                    <span>Message Log (Admin)</span>
                                    <!-- View Product Detail By Id -->
                                    <el-button type="info" size="large" @click="$router.push(`/vendor/products/view-detail/${parseInt(proId)}`)" class="btn btn-primary">View This Product</el-button>
                                </div>
                            </template>
                            <!-- Card Title -->
                            <div class="card-body d-flex flex-column gap-2" v-if="messageContentArr.length > 0">
                                <div class="mb-3" v-for="(content,index) in messageContentArr" :key="index">
                                    <div class="flex-start mb-1">
                                        <strong class="mr-1">Subject: </strong>
                                        <div>
                                            {{ content?.titleFeedbackAdmin }}
                                        </div>
                                    </div>
                                    <div class="flex-start">
                                        <strong class="mr-1">Message: </strong>
                                        <div>
                                            {{ content?.notedFeedback}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <!-- By Vendor Message Logs -->
                    <div class="col-lg-6">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header flex justify-content-between">
                                    <span>Send to Admin</span>
                                </div>
                            </template>
                            <!-- Card Title -->
                            <div class="card-body d-flex flex-column gap-2">
                                  <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                                    <div class="col-12 lg:col-12">
                                        <label for="name_en" class="text-sm font-semibold">Subject <span class="p-error">*</span></label>
                                        <InputText id="title" placeholder="Subject"  :input="v$.subjectContentFeedAdmin.$touch"  v-model="v$.subjectContentFeedAdmin.$model" :class="{ 'p-invalid border-round-lg p-error': v$.subjectContentFeedAdmin.$invalid && submitted }" type="text" class="text-sm border-round-lg"/>
                                        <small v-if="(v$.subjectContentFeedAdmin.$invalid && submitted) || v$.subjectContentFeedAdmin.$pending.$response" class="p-error text-lg">{{ v$.subjectContentFeedAdmin.required.$message.replace('Value', 'Subject') }}</small>
                                    </div>
                                    <div class="col-12 lg:col-12">
                                        <div class="p-input-icon-right fei">
                                            <label for="name_en" class="text-sm font-semibold">Message <span class="p-error">*</span></label>
                                            <Textarea id="input"   
                                                v-model="v$.messageContentAdmin.$model" 
                                                :class="{ 'p-invalid border-round-lg p-error': v$.messageContentAdmin.$invalid && submitted }" 
                                                type="text" 
                                                placeholder="Please send a Feedback" 
                                                autofocus 
                                                class="w-full"
                                            />
                                            <small v-if="(v$.messageContentAdmin.$invalid && submitted) || v$.messageContentAdmin.$pending.$response"
                                                class="p-error text-sm">{{ v$.messageContentAdmin.required.$message.replace('Value',
                                                'Feedback to vendor') }}
                                            </small>
                                        </div>
                                    </div>
                                    <!-- Buttons Submits -->
                                    <div class="col-12 flex justify-content-end mt-4"> 
                                        <!--Buttons-->
                                        <Button 
                                            icon="pi pi-check" 
                                            class="p-button-lg btn-primary py-3 w-10rem"
                                            type="submit"
                                            label="Save"
                                            @click.prevent="submitFormSendMessageToAdmin(!v$.$invalid)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<!-- Script -->
<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import ProductService from '@/services/vendors/products/ProductServices';
export default {
    components: {},
    props: {},
    data() {
        return {
            subjectContentFeedAdmin: '',
            messageContentAdmin: '',
            messageContentArr: []
        };
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            subjectContentFeedAdmin: {required},
            messageContentAdmin: {required}
        }
    },
    created(){
        this.productService = new ProductService();
        this.getMessageContentMessageAdminRequest();
    },
    methods: {
        getMessageContentMessageAdminRequest(){
            const productId = this.$route.params?.proId;
            this.productService.viewDetailContentMessageAdminVendor(productId)
                .then((data) => {
                    try {
                        if (!Array.isArray(data) || !data.length > 0) {
                            this.messageContentArr = [];
                        }
                        if (!Array.isArray(data) || data !== undefined || data !== null) {
                            this.messageContentArr = data ? data : '';
                            this.loadingProductList = false;
                        }
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            );
        },
        submitFormSendMessageToAdmin(isFormValid){
              try {
                    this.submitted = true;
                    this.v$.$touch();
                    if (!isFormValid) {    
                        return;
                    }
                      const productId = parseInt(this.$route.params?.proId) ? parseInt(this.$route.params?.proId) : 0;
                    const dataUpdateReject = {
                        titleContentVendorFeedback: this.subjectContentFeedAdmin ? this.subjectContentFeedAdmin : '',
                        notedSendFeedBackVendor: this.messageContentAdmin ? this.messageContentAdmin : ''
                    }
                    this.productService.updatedDetailContentMessageAdminVendor(dataUpdateReject,productId).then(response => {
                        if (response.data.success == true) {
                            // Push Router
                            this.$router.push("/vendor/message-admin-vendor-confirm-deleted-product");
                            this.$notify.success({
                                    title: 'Successfully updated feedback to send admin',
                                    message: response.data?.message ? response.data?.message : '' ,
                                    showClose: false
                            });
                            window.location.reload();
                            this.transactionArrConfirm = {};
                            this.confirmDialogTransaction = false;
                        }
                    }).catch((error) => {
                        // this.no
                        this.$notify.error({
                            title: 'Unsuccessfully updated feedback product',
                            message: error.response.data.error.message ?? 'Unsuccessfully updated feedback to send admin',
                            showClose: false
                        });  
                        if(error.response.data.error.error.errors){
                            for (let index = 0; index < error.response.data.error.error.errors.length; index++) {
                                const messageValidation = error.response.data.error.error.errors[index].message ?? '';
                                this.$notify.error({
                                    title: 'Unsuccessfully updated category',
                                    message: messageValidation ?? 'Unsuccessfully updated feedback to send admin',
                                    showClose: true
                                });   
                            }
                        } 
                    });
                } catch (error) {
                    return Promise.reject(error);
                }
        }
    },
    mounted() { },
};
</script>
<style scoped></style>
<style lang='scss' scoped></style>