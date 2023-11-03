<template>
    <div class="px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h1 class=" text-2xl text-gray-800 font-medium">{{ $t('product.productList') }}</h1>
            <template v-if="currentUserAuth && currentUserAuth[1].typeUser === 'Vendor'">
                <el-button type="info" size="large" class="btn btn-primary"
                    @click.prevent="$router.push('/vendor/products/create')"
                    v-permission="[{ functionName: 'product_module', moduleName: 'fun_create' }]">
                    <div class="button">
                        <i class="pi pi-plus" style="font-size: 1rem"></i>
                        <span class="pl-2">Create</span>
                    </div>
                </el-button>
            </template>
        </div>
        <!-- Hidden -->
        <input v-model="productListFilterArr" hidden />
        <!-- DataTables -->
        <div class="gird">
            <div class="col-12">
                <!-- Product List -->
                <el-card class="box-card py-2 px-2 text-sm">
                    <div class="px-2">
                        <DataTable :paginator="true" 
                            :value="messageContentAlertProduct" 
                            class="p-datatable-scrollable text-sm"
                            :rows="10"
                            dataKey="id" :rowHover="true" 
                            contextMenu 
                            v-model:filters="filtersData" 
                            filterDisplay="menu"
                            :loading="loadingProductList" 
                            :filters="filtersData" 
                            responsiveLayout="scroll"
                            :globalFilterFields="['representative.product_eng', 'product_eng', 'product_unit_price', 'product_qty']"
                            v-model:selection="selectedProduct"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            :rowsPerPageOptions="[5, 10, 25, 50, 100]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                            <!-- Data Table Header -->
                            <template #header>
                                
                                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                    <!-- Search Products -->
                                    <p></p>
                                    <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                                        <i class="pi pi-search" />
                                        <InputText 
                                            v-model="filtersData['global'].value"
                                            class="p-inputtext p-component w-full text-sm"
                                            :placeholder="$t('route.search')" 
                                        />
                                    </span>
                                </div>
                            </template>
                            <!-- Empty Products -->
                            <template #empty>{{ $t('product.loadingProduct') }} </template>
                            <!-- Loading Products -->
                            <template #loading> Loading products data. Please wait... </template>
                            <!--------------Columns----------->
                            <div v-if="messageContentAlertProduct && messageContentAlertProduct.length > 0 && messageContentAlertProduct != ''">
                                <Column field="id" :header="$t('product.productName')" filterField="product_eng"
                                    sortField="product_eng" sortable>
                                    <template #body="{ data }">
                                        <div class="flex flex-column">
                                            <span class="flex">
                                                <Avatar
                                                    :image="`${ENV_HOST_PATH_FILE}uploads/products_img/thumbnail/${data?.product_picture}`"
                                                    class="mr-2" shape="circle" :data-id="data" />
                                                {{ truncateLongText(data?.product_eng, 20, '\b') }}
                                            </span>
                                        </div>
                                    </template>
                                    <!-- Filter Products -->
                                    <template #filter="{ filterModel }">
                                        <InputText v-model="filterModel.value"
                                            type="text" 
                                            class="p-column-filter"
                                            placeholder="Search by product name" 
                                        />
                                    </template>
                                </Column>
                                <Column field="statusWaring" header="Status" sortable sortField="statusWaring">
                                    <template #body="slotProps">
                                        <div class="justify-content-center">
                                            <Tag :value="slotProps.data?.statusWaring === 'REJECT' ? 'WARNING' : 'FEEDBACK'"  class="text-white" :severity="getSeverityProductRejectStatus(slotProps.data?.statusWaring)" />
                                        </div>
                                    </template>
                                </Column>
                                <Column headerStyle="width: 15rem; text-align: center; alignment-item:center;"
                                    :header="$t('route.action')" bodyStyle="text-align: center; overflow: visible">
                                    <template #body="{ data }">
                                        <div class="flex flex-wrap gap-2">
                                            <!--Vendor-->
                                            <template v-if="data?.statusWaring === 'REJECT'">
                                                <template v-if="currentUserAuth && currentUserAuth[1].typeUser === 'Vendor'">
                                                     <Button icon="pi pi-trash" outlined rounded severity="danger"
                                                        v-permission="[{ functionName: 'product_module', moduleName: 'fun_deleted' }]"
                                                        @click="confirmDeleteProduct(parseInt(data?.proId) ?? '')"
                                                    />
                                                    <Button icon="pi pi-search" outlined rounded class="mr-2"
                                                        v-permission="[{ functionName: 'product_module', moduleName: 'fun_view' }]"
                                                        @click.prevent="$router.push(`/vendor/products/view-detail-module-vendor-admin-permission/${parseInt(data?.proId) ?? ''}`)"
                                                    />
                                                </template>
                                            </template>
                                            <template v-if="data?.statusWaring === 'FEEDBACK'">
                                                <template v-if="currentUserAuth && currentUserAuth[1].typeUser === 'Vendor'">
                                                        <Button 
                                                            icon="pi pi-pencil" outlined rounded class="mr-2"
                                                            v-permission="[{ functionName: 'product_module', moduleName: 'fun_edit' }]"
                                                            @click.prevent="$router.push(`/vendor/products/product_list/edit/${parseInt(data?.proId)}`)"
                                                        />
                                                        <Button icon="pi pi-search" outlined rounded class="mr-2"
                                                            v-permission="[{ functionName: 'product_module', moduleName: 'fun_view' }]"
                                                            @click.prevent="$router.push(`/vendor/products/view-detail-module-vendor-admin-permission/${parseInt(data?.proId) ?? ''}`)"
                                                        />
                                                </template>
                                            </template>
                                            <!-- Confirm Admin -->
                                            <template v-if="currentUserAuth && currentUserAuth[1].typeUser === 'Vendor'">
                                                <template v-if="data?.statusWaring === 'FEEDBACK' || data?.statusWaring === 'REJECT'">
                                                    <Button icon="pi pi-send" outlined rounded severity="danger"
                                                        v-permission="[{ functionName: 'product_module', moduleName: 'fun_edit' }]"
                                                        @click.prevent="$router.push(`/vendor/message-content/view-detail-by-vendor/${parseInt(data?.proId) ?? 0}`)"
                                                    />
                                                </template>
                                            </template>
                                            
                                            <!-- Admin -->
                                            <template v-if="currentUserAuth && currentUserAuth[1].typeUser === 'Admin'">
                                                <Button icon="pi pi-search" outlined rounded class="mr-2"
                                                    v-permission="[{ functionName: 'product_module', moduleName: 'fun_view' }]"
                                                    @click.prevent="$router.push(`/vendor/products/view-detail-module-vendor-admin-permission/${parseInt(data?.proId) ?? ''}`)"
                                                />
                                                <!-- View Details -->
                                                <Button 
                                                    v-if="messageContentArrContent"
                                                    icon="pi pi-eye"  severity="help" outlined rounded class="mr-2"
                                                    v-permission="[{ functionName: 'product_module', moduleName: 'fun_view' }]"
                                                    @click.prevent="viewMessageContentMessageSendAdmin(parseInt(data?.proId))"
                                                />
                                            </template>
                                        </div>
                                    </template>
                                </Column>
                            </div>
                        </DataTable>

                        <!-- Dialog Confirm Deleted By Vendor-->
                        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" 
                            header="Confirm"
                            :modal="true">
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span>Are you sure you want to delete</span>
                            </div>
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                                <Button label="Yes" icon="pi pi-check" text @click="deleteProductSuccess()" />
                            </template>
                        </Dialog>


                        <!-- Confirm Deleted By Admin Send Request -->
                        <Dialog 
                            v-model:visible="deleteRequestByAdmin" 
                            :style="{ width: '600px' }"   
                            header="Do you want to request removal or improvement of product issues for the store owner?"
                            :modal="true">
                            <div class="confirmation-content">
                                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                                    <div class="col-12 lg:col-12">
                                        <div class="p-input-icon-right">
                                            <Textarea id="input" v-model="messageContentReject" type="text" placeholder="Please send a Feedback" autofocus class="w-full"/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <!-- Footer Request By Vendor -->
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="deleteRequestByAdmin = false" />
                                <Button label="Yes" icon="pi pi-check" text @click="requestAndRejectByVendorApproved()" />
                            </template>
                        </Dialog>
                        <!-- Message View Detail By Admin -->
                        <Dialog 
                            v-if="messageContentArrContent.length > 0 || messageContentArrContent !== ''"
                            v-model:visible="viewContentDialogMessage" 
                            :style="{ width: '600px' }"   
                            header="Message Content From Vendor"
                            :modal="true">
                            <div class="confirmation-content">
                                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid" >
                                    <div class="col-12 ">
                                        <div class="p-input-icon-right">
                                            <h5>
                                                <b>Product Name:</b>
                                            </h5>
                                            <label>{{ messageContentArrContent[0]?.product_eng }}</label>
                                            <label class="text-red-500">Code: ({{ messageContentArrContent[0]?.proCode }})</label>
                                        </div>
                                    </div>
                                    <div class="col-12 lg:col-12">
                                        <div class="p-input-icon-right">
                                            <h5>
                                                <b>Subject:</b>
                                            </h5>
                                            <h6>
                                                {{ messageContentArrContent[0]?.titleFeedbackVendor }}
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="col-12 lg:col-12">
                                        <div class="p-input-icon-right">
                                            <h5><b>Message:</b></h5>
                                            <p>
                                                {{ messageContentArrContent[0]?.notedFeedbackVendor }}
                                            </p>
                                            <!-- <Textarea id="input" disabled v-model="content.notedFeedbackVendor" type="text" placeholder="Please send a Feedback" autofocus class="w-full"/> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Footer Request By Vendor -->
                            <template #footer>
                                <Button label="No" icon="pi pi-times" text @click="viewContentDialogMessage = false" />
                            </template>
                        </Dialog>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import { FilterMatchMode, FilterOperator } from 'primevue/api';
    import ProductService from '@/services/vendors/products/ProductServices';
    import { ElNotification } from 'element-plus';
    import { isLoggedIn } from "@/utils/auth/auth";
    import { useVuelidate } from '@vuelidate/core';
    import { required } from '@vuelidate/validators';
    export default{
        name:"Products",
        setup() {
            return { v$: useVuelidate() }
        },
        data(){
            return{
                messageContentArrContent: [],
                viewContentDialogMessage: false,
                messageContentReject: '',
                deleteRequestByAdmin: false,
                loadingProductList: null,
                messageContentAlertProduct: null,
                selectedProduct: null,
                deleteProductDialog: false,
                productId: 0,
                ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
                filtersData: {
                        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                        title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                        representative: { value: null, matchMode: FilterMatchMode.IN },
                        product_eng: {
                            operator: FilterOperator.AND,
                            constraints: [
                                { value: null, matchMode: FilterMatchMode.IN },
                            ],
                        }
                }
            }
        },
        validations() {
            return {
                selectedDeliveryCompany: {required},
                expressDeliveryShipping: {required},
            }
        },
        mounted() {
            // ProductList
            this.productService.getProductMessageByAdminAndVendorRejectProducts()
                .then((data) => {
                    try {
                        if (!Array.isArray(data) || !data.length > 0) {
                            this.messageContentAlertProduct = [];
                        }
                        if (!Array.isArray(data) || data !== undefined || data !== null) {
                            this.messageContentAlertProduct = data ? data : '';
                            this.loadingProductList = false;
                        }
                    } catch (error) {
                        ElNotification({
                            title: `Unsuccessfully get product list`,
                            showClose: true,
                            type: 'error'
                        });
                    }
                }
            );
        },
        computed:{
            ...mapGetters({
                currentUser: 'auth/currentUserAuth',
            }),
            currentUserAuth() {
                return this.currentUser ? this.currentUser : null;
            },
        },
        created(){
            this.productService = new ProductService();
        },
        methods: {
            getSeverityProductRejectStatus(statusReject){
                switch (statusReject) {
                    case 'CONFIRM':
                        return 'success';
                    case 'FEEDBACK':
                        return 'warning';
                    case 'REJECT':
                        return 'danger';

                    default:
                        return null;
                }
            },
            isSessionActiveVendor(){
                return isLoggedIn();
            },
            // Convert Currency Amount
            currencyFormattedKHRiel(value){
                return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
            },
            currencyFormattedUSD(value){
                return Number(value ? value : 0).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                });  
            },
            truncateLongText(str, length, useWordBoundary){
                if (str.length <= length) { return str; }
                const subString = str.slice(0, length - 1); // the original check
                return (useWordBoundary
                    ? subString.slice(0, subString.lastIndexOf(" "))
                    : subString) + "...";
            },
            // Deleted
            confirmDeleteProduct(id){
                this.productId = id;
                this.deleteProductDialog = true;
            },
            deleteProductSuccess(){
                if (!this.productId) {
                    ElNotification({
                        title: `Product not found!`,
                        showClose: false,
                        type: 'warning'
                    });
                }
                this.productService.deleteProByID(this.productId).then((del) => {
                    if(del.data.success === true){
                            ElNotification({
                                title: `Successfully Deleted Product`,
                                message: del.data?.message ?? 'Unsuccessfully Deleted Product',
                                showClose: true,
                                type: 'success'
                            });
                            //Close form -> Successfully to submitted   
                            window.location.reload();
                            //Set timeout closed loading confirm deposited
                            this.deleteProductDialog = false;
                    }else{
                        ElNotification({
                            title: `Successfully Deleted Product`,
                            message:'Please contact to admin',
                            showClose: true,
                            type: 'success'
                        });
                    }
                }).catch((error) => {
                        ElNotification({
                            title: `Unsuccessfully Deleted Product`,
                            message: error.response.data.error?.message ?? 'Unsuccessfully Deleted Product',
                            showClose: true,
                            type: 'error'
                        });
                });
            },
            //Send Request By Admin to vendor deleted product
            confirmWaringDetachProductsByVendor(productId){
                this.deleteRequestByAdmin = true;
                this.productIdAdmin = parseInt(productId) ? parseInt(productId)  : 0;
            },
            viewMessageContentMessageSendAdmin(productId){
                this.viewContentDialogMessage = true;
                // Product Services
               this.productService.viewDetailContentMessageAdminVendor(productId)
                .then((data) => {
                    try {
                        if (!Array.isArray(data) || !data.length > 0) {
                            this.messageContentArrContent = [];
                        }
                        if (!Array.isArray(data) || data !== undefined || data !== null) {
                            this.messageContentArrContent = data ? data : '';
                            this.loadingProductList = false;
                        }
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            );
                console.log(productId)
            }
        },
    }
</script>

