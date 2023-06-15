<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
      <b-row>
        <b-col lg="12">
            <!--Confirm Dialogs-->
            <ConfirmDialog></ConfirmDialog>
            <Toast />
            <!-- Titles -->
            <div class="flex justify-content-between my-4 px-4 py-4">
                <h2 class="relative text-black text-3xl section section-title:before">Seller Lists</h2>
                <el-button type="info" size="large" class="py-4"
                    @click="openCreateSeller">
                    <div class="flex justify-between pl-2">
                        <i class="pi pi-plus" style="font-size: 1rem"></i>
                        <span class="pl-2">Add Lists</span>
                    </div>
                </el-button>
            </div>
            <div class="gird">
                <div class="col-12">
                    <el-card slot="header" class="box-card py-2 px-2">
                        <div>          
                            <div class="card">
                                    <DataTable ref="dt" :value="sellers" v-model:selection="selectedSeller" dataKey="id" 
                                        filterDisplay="menu" :loading="loading"
                                        :paginator="true" :rows="10" :filters="filters"
                                        scrollable
                                        class="p-datatable-scrollable"
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5, 10, 25]"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                                            <template #header>
                                                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                                                    <h4 class="m-0"></h4>
                                                    <span class="p-input-icon-left">
                                                        <i class="pi pi-search" />
                                                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                                                    </span>
                                                </div>
                                            </template>
                                            <template #empty> No Sellers found. </template>
                                            <template #loading> Loading sellers data. Please wait. </template>
                                            <!--------------Check Existed Data ----------->
                                            <div v-if="sellers && sellers.length > 0 && sellers != ''" data-id="sellers">
                                                <Column  header="Shop Name" sortable style="min-width:15rem">
                                                        <template #body="slotProps">
                                                            <Avatar :image="`${ENV_HOST_PATH_FILE}uploads/sellers/${slotProps.data.shop_logo}`" class="mr-2" size="large" shape="circle" />
                                                            <div class="flex flex-column ">
                                                                <span class="flex">
                                                                    {{ slotProps.data.shop_eng }} 
                                                                </span>
                                                                <span class="font-bold">
                                                                    {{ slotProps.data.shop_verify }}
                                                                </span>
                                                            </div>
                                                        </template>
                                                </Column>
                                                <Column header="Author" sortable style="min-width:15rem">
                                                    <template #body="slotProps">
                                                        <Avatar :image="`${ENV_HOST_PATH_FILE}uploads/sellers/${slotProps.data.shop_logo}`" class="mr-2" size="large" shape="circle" :data-id="slotProps.data"/>
                                                        <div class="flex flex-column ">
                                                            <span class="flex font-bold">
                                                                {{ slotProps.data.venNameEng }} 
                                                            </span>
                                                            <span class="flex">
                                                                {{ slotProps.data.user_email }} 
                                                            </span>
                                                            <span class="flex">
                                                                {{ slotProps.data.phoneNumber }}
                                                            </span>
                                                        </div>
                                                    </template>
                                                </Column>
                                                <Column field="category" header="Info" sortable style="min-width:10rem">
                                                    <template #body>
                                                        <div class="font-bold">
                                                            Current Balance:
                                                            Last Login :  
                                                        </div>
                                                    </template>
                                                </Column>
                                                <Column header="Shop Publish" sortable style="min-width:10rem">
                                                    <template #body="slotProps">
                                                        <!-- Banned Seller Account -->
                                                        <div v-if="slotProps.data.venStatus !== 'UnBanned'">
                                                            <Tag severity="danger" value="Banned"></Tag>
                                                        </div>
                                                        <div v-if="slotProps.data.shop_verify !== 'Verify'">
                                                                {{ slotProps.data.shop_verify }}
                                                        </div>
                                                        <div v-if="slotProps.data.shop_status!=='Open'">
                                                            <div class="font-bold" v-if="slotProps.data.shop_status">
                                                                <div class="form-check form-switch">
                                                                        <input class="form-check-input" 
                                                                            type="checkbox"
                                                                            @click="changeStatusShop($event)" 
                                                                            role="switch" 
                                                                            :data-id="slotProps.data.user_id"
                                                                            v-model="slotProps.data.shop_status"
                                                                            :key="slotProps.data.user_id"
                                                                        >
                                                                </div>
                                                            
                                                            </div>
                                                        </div> 
                                                    </template>
                                                </Column>
                                                <Column :exportable="false" header="Options" style="min-width:8rem">
                                                    <template #body="slotProps">
                                                        <Button icon="pi pi-ellipsis-v" outlined rounded class="mr-2" @click="toggleOptionSeller" aria-haspopup="true" aria-controls="overlay_menu"/>
                                                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editSellerData(slotProps.data)" />
                                                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteSeller(slotProps.data)" />
                                                        <!-- Menu Toggle Options -->
                                                        <Menu ref="menu" id="overlay_menu" :model="itemsToggleOption" :popup="true" />

                                                    </template>
                                                </Column>
                                            </div>          
                                    </DataTable>
                                </div>
                                <!-- ===============Add New Sellers======================= -->
                                <Dialog 
                                    v-model:visible="createSellerDialog" :style="{ width: '900px' }"  
                                    header="Seller Info" :modal="true" class="p-fluid">
                                    <!--===========================Upload Avatars==========-->
                                    <!-- Alert Message Validation -->
                                    <transition-group name="p-message" tag="div">
                                        <Message v-for="msg of messageAlert" :key="msg.id" :severity="msg.severity">
                                            <ul>
                                                <li>{{ msg.content }}</li>
                                            </ul>
                                        </Message>
                                    </transition-group>    
                                    <div class="px-2 py-2 text-center justify-center">
                                        <MazAvatar
                                                v-if="filePreview"
                                                :src="filePreview"
                                                size="3rem"
                                                class="pb-2"
                                        />
                                        <MazAvatar
                                                v-if="!filePreview"
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                                                size="3rem"
                                                class="pb-2 w-full"
                                        />
                                        <UploadSingleFile  
                                            v-model.trim="arrSeller.uploadFileLogo" 
                                            required="true" 
                                            @file-updated="captureFile($event)" 
                                            autofocus
                                            uploadName="Upload Avatar"/>
                                        <small class="p-error" v-if="errorUploadAvatar">{{ errorUploadAvatar }}</small>
                                    </div>
                                    <!--===========================Upload Avatars==========-->
                                        <!-- Title -->
                                        <p class="font-bold text-black text-lg">Seller Info <span class="p-error">*</span></p>
                                        <!-- Upload Image --> 
                                        <div class="formgrid grid">
                                            <div class="field col">
                                                <label for="firstNameSell">First Name  <span class="p-error">*</span></label>
                                                <InputText id="firstNameSell" v-model.trim="arrSeller.firstNameSell" required="true" autofocus :class="{ 'p-invalid': submitted && !arrSeller.firstNameSell }" />
                                                <small class="p-error" v-if="submitted && !arrSeller.firstNameSell">First Name is required.</small>
                                            </div>
                                            <div class="field col">
                                                <label for="name">Last Name  <span class="p-error">*</span></label>
                                                <InputText id="name" v-model.trim="arrSeller.lastNameSell" required="true" autofocus :class="{ 'p-invalid': submitted && !arrSeller.lastNameSell }" />
                                                <small class="p-error" v-if="submitted && !arrSeller.lastNameSell">Last Name is required.</small>
                                            </div> 
                                        </div>   
                                        <!-- Seller -->
                                        <div class="formgrid grid">
                                            <div class="field col">
                                                <label for="phoneNumberSeller">Phone<span class="p-error">*</span></label>
                                                <InputText id="phoneNumberSeller" 
                                                    v-model.trim="arrSeller.phoneNumberSeller" required="true" 
                                                    autofocus
                                                    :class="{ 'p-invalid': submitted && !arrSeller.phoneNumberSeller }" 
                                                    @keypress="inputOnlyNumber"
                                                />
                                                <small class="p-error" v-if="submitted && !arrSeller.phoneNumberSeller">Phone Number field cannot be empty.</small>
                                            </div>
                                            <div class="field col">
                                                <label for="emailSeller">Email <span class="p-error">*</span></label>
                                                <InputText id="name" v-model.trim="arrSeller.emailSeller" type="email" @blur="validateEmail"/>
                                                <small class="p-error" v-if="submitted && msgEmailValidate">{{ msgEmailValidate }}</small>
                                            </div> 
                                        </div>   
                                        <!-- Password -->
                                        <div class="formgrid grid">
                                            <div class="field col">
                                                <label for="name">Password</label>
                                                <Password 
                                                    v-model.trim="arrSeller.passwordSeller" required="true" autofocus 
                                                    :class="{ 'p-invalid': submitted && !arrSeller.passwordSeller }"
                                                    toggleMask>
                                                    <template #header>
                                                        <h6>Pick a password</h6>
                                                    </template>
                                                    <template #footer>
                                                        <Divider />
                                                        <p class="mt-2">Suggestions</p>
                                                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                                            <li>At least one lowercase</li>
                                                            <li>At least one uppercase</li>
                                                            <li>At least one numeric</li>
                                                            <li>Minimum 8 characters</li>
                                                        </ul>
                                                    </template>
                                                </Password>
                                                <small class="p-error" v-if="submitted && !arrSeller.passwordSeller">Password is required.</small>
                                            </div>
                                            <div class="field col">
                                                <label for="name">Confirm Password</label>
                                                <Password 
                                                    v-model.trim="arrSeller.confirmPassword" required="true" autofocus 
                                                    :class="{ 'p-invalid': submitted && !arrSeller.confirmPassword }"
                                                    @input="checkConfirmPassword"
                                                    toggleMask>
                                                    <template #header>
                                                        <h6>Pick a password</h6>
                                                    </template>
                                                    <template #footer>
                                                        <Divider />
                                                        <p class="mt-2">Suggestions</p>
                                                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                                            <li>At least one lowercase</li>
                                                            <li>At least one uppercase</li>
                                                            <li>At least one numeric</li>
                                                            <li>Minimum 8 characters</li>
                                                        </ul>
                                                    </template>
                                                </Password>
                                                <small class="p-error" v-if="submitted && !arrSeller.confirmPassword">Confirm Password is required.</small>
                                                <small class="p-error" v-if="errorConfirmPass">{{ errorConfirmPass }}</small>
                                            </div> 
                                        </div>
                                        <!--======Shop Detail======-->
                                        <div class="pt-3">
                                            <p class="font-bold text-black text-lg">Shop Details <span class="p-error">*</span></p>
                                            <!-- Shop Accounts -->
                                            <div class="formgrid grid">
                                                    <div class="field col">
                                                        <label for="shop_name">Shop Name  <span class="p-error">*</span></label>
                                                        <InputText id="name" v-model.trim="arrSeller.shopName" required="true" autofocus :class="{ 'p-invalid': submitted && !arrSeller.shopName }" />
                                                        <small class="p-error" v-if="submitted && !arrSeller.shopName">Shop Name is required.</small>
                                                    </div>
                                                    <div class="field col">
                                                        <label for="name">Phone<span class="p-error">*</span></label>
                                                        <InputText id="name" v-model.trim="arrSeller.shopPhoneNumber" 
                                                            required="true" 
                                                            autofocus 
                                                            :class="{ 'p-invalid': submitted && !arrSeller.shopPhoneNumber }"
                                                            @keypress="inputOnlyNumber" 
                                                        />
                                                        <small class="p-error" v-if="submitted && !arrSeller.shopPhoneNumber">Phone Number field cannot be empty.</small>
                                                    </div>
                                                </div>
                                                <!-- Slug URL -->
                                                <div class="field">
                                                    <label for="slug">Slug<span class="p-error">*</span></label>
                                                    <InputText id="slug_seller" v-model.trim="arrSeller.slugURL"/>
                                                </div>
                                            <div>
                                            <!-- Address -->
                                            <div class="formgrid grid">
                                                <div class="field col">
                                                    <label for="shop_name">Address Line 01  <span class="p-error">*</span></label>
                                                    <InputText id="name" v-model.trim="arrSeller.addressLineShop1" required="true" autofocus :class="{ 'p-invalid': submitted && !arrSeller.addressLineShop1 }" />
                                                    <small class="p-error" v-if="submitted && !arrSeller.addressLineShop1">Address Line 01 is required.</small>
                                                </div>
                                                <div class="field col">
                                                    <label for="shop_name">Address Line 02<span class="p-error">*</span></label>
                                                    <InputText id="name" v-model.trim="arrSeller.addressLineShop2" required="true" autofocus :class="{ 'p-invalid': submitted && !arrSeller.addressLineShop2 }" />
                                                    <small class="p-error" v-if="submitted && !arrSeller.addressLineShop2">Address Line 02 is required.</small>
                                                </div>
                                            </div>
                                            <div class="formgrid grid">
                                                <div class="field col">
                                                    <label for="shop_name">City/Town<span class="p-error">*</span></label>
                                                    <InputText id="name" v-model.trim="arrSeller.addressCity" required="true" autofocus :class="{ 'p-invalid': submitted && !arrSeller.addressCity }" />
                                                    <small class="p-error" v-if="submitted && !arrSeller.addressCity">City/Town is required.</small>
                                                </div>
                                                <div class="field col">
                                                    <label for="shop_name">Zip/Postal Code<span class="p-error">*</span></label>
                                                    <InputText id="name" v-model.trim="arrSeller.addressZipCode"/>
                                                </div>
                                            </div>
                                            <!-- Request/Approved Dated -->
                                            <div class="formgrid grid">
                                                <div class="field col">
                                                    <label for="shop_name">Request Date<span class="p-error">*</span></label>
                                                    <Calendar id="name" v-model.trim="arrSeller.sellerRequestDate" showButtonBar  dateFormat="dd/mm/yy" required="true" autofocus :class="{ 'p-invalid': submitted && !arrSeller.sellerRequestDate }" />
                                                    <small class="p-error" v-if="submitted && !arrSeller.sellerRequestDate">Request Date is required.</small>
                                                </div>
                                                <div class="field col">
                                                    <label for="shop_name">Approved Date<span class="p-error">*</span></label>
                                                    <Calendar id="name" v-model.trim="arrSeller.sellerApprovedDate" showButtonBar required="true"  dateFormat="dd/mm/yy" autofocus :class="{ 'p-invalid': submitted && !arrSeller.sellerApprovedDate }" />
                                                    <small class="p-error" v-if="submitted && !arrSeller.sellerApprovedDate">Approved Date is required.</small>
                                                </div>
                                            </div>
                                            <!-- Upload Banner of Shoppings -->
                                            <div class="field">
                                                <!-- Logo -->
                                                <label for="name">Logo (72*72)<span class="p-error">*</span></label>
                                                <FileUpload mode="basic" name="uploadFileShopLogo[]" ref="uploadFileShopLogo" accept="image/*" 
                                                        customUpload
                                                        :maxFileSize="2000000"
                                                        @uploader="onUploadFileLogo" 
                                                        :auto="true" chooseLabel="Browse" />
                                                <div class="pt-2">
                                                    <MazAvatar
                                                        v-if="filePreviewLogo"
                                                        :src="filePreviewLogo"
                                                        size="3rem"
                                                        class="pb-2"
                                                        square                                         
                                                        no-size
                                                    />
                                                    <MazAvatar
                                                        v-if="!filePreviewLogo"
                                                        src="../../../assets/img/photos/no_img.jpeg"
                                                        size="3rem"
                                                        class="pb-2"
                                                        square                                         
                                                        no-size
                                                    />
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label for="name">Banner (297*203)<span class="p-error">*</span></label>
                                            <FileUpload mode="basic" name="uploadFileBanner[]" ref="uploadFileBanner" accept="image/*" 
                                                    customUpload
                                                        :maxFileSize="2000000"
                                                        @uploader="onUploadFileBanner" 
                                                        :auto="true" chooseLabel="Browse" />
                                                <div class="pt-2">
                                                    <MazAvatar
                                                        v-if="filePreviewBanner"
                                                        :src="filePreviewBanner"
                                                        size="3rem"
                                                        class="pb-2"
                                                        square                                         
                                                        no-size
                                                    />
                                                    <MazAvatar
                                                        v-if="!filePreviewBanner"
                                                        src="../../../assets/img/photos/no_img.jpeg"
                                                        size="3rem"
                                                        class="pb-2"
                                                        square                                         
                                                        no-size
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    <template #footer>
                                        <Button label="Cancel" icon="pi pi-times" text @click="hideDialogSeller"/>
                                        <Button label="Save" icon="pi pi-check" text @click.prevent="saveSellerCreate" />
                                    </template>
                                </Dialog>
                                <!-- ===============Edited New Sellers======================= -->
                                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                                    <div class="confirmation-content">
                                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                        <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
                                    </div>
                                    <template #footer>
                                        <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
                                        <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
                                </template>
                                </Dialog>
                                <!-- Dialog Deleted -->
                                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                                    <div class="confirmation-content">
                                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                        <span v-if="product">Are you sure you want to delete the selected products?</span>
                                    </div>
                                    <template #footer>
                                        <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
                                        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                                    </template>
                                </Dialog>
                            </div>
                    </el-card>
                </div>
            </div>
        </b-col>
    </b-row>
</template>
<!-- Data Tables -->
<script>
import { FilterMatchMode } from 'primevue/api';
import { ElMessage } from 'element-plus';
import SellerServices from '../../../services/vendors/seller_managements/SellerServices';
import UploadSingleFile from "../../../components/uploads/UploadSingleFile.vue";
import MazAvatar from 'maz-ui/components/MazAvatar';


export default{
    components: {
        UploadSingleFile,
        MazAvatar
    },  
    data(){
        return {
            selectedSeller: '',
            createSellerDialog: false,
            submitted: false,
            sellers: null,
            arrSeller: {},
            filters: {},
            edit: false,
            cropper: false,
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
            loading: true,
            sellerSwitchShop: '',
            avatarFileUpload: null,
            uploadFileShopLogo: null,
            uploadFileBanner: null,
            errorConfirmPass: '',
            errorUploadAvatar: '',
            // Add two new data properties here to capture the emitted file properties we need
            filePreview: '',
            fileName: '',
            filePreviewLogo: null,
            filePreviewBanner: null,
            itemsToggleOption: [
                {
                    label: 'Options',
                    items: [
                        {
                            label: 'Ban This Seller',
                            icon: 'pi pi-lock',
                            command: () => {
                                console.log(this.sellerServices)
                            }
                        },
                        {
                            label: 'Verify This Shop',
                            icon: 'pi pi-check-square',
                            command: () => {
                            }
                        },
                        {
                            label: 'Verify Account',
                            icon: 'pi pi-verified',
                            command: () => {
                                this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                            }
                        }
                    ]
                }
            ],
            messageAlert: '',
            msgEmailValidate: ''
        }
    },
    watch: {
        email(value){
            console.log(value)
            this.emailSeller = value;
            this.validateEmail(value)
        }
    },
    created(){
        this.sellerServices = new SellerServices();
        this.initFilters();
    },
    mounted(){
        this.sellerServices.getListSellerAcc().then((sellers) => {
            this.sellers = sellers;
            this.loading = false;
        });
    },
    methods:{
        toggleOptionSeller(events){
          this.$refs.menu.toggle(events);
        },
        initFilters(){
             this.filters = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            }
        },
        async changeStatusShop(evt){
            const dataId = evt.target.getAttribute('data-id');
            if(!dataId){
                ElMessage.error('Seller Account not found');
            }
           this.sellers.forEach((sellerId) => {
                if(sellerId.user_id == dataId){
                    if (sellerId.user_id == dataId == true) {
                        const dataUpdateShopStatus = {
                            shopStatus: 'Open'
                        }
                        this.sellerServices.verifyShopBySellerID(dataUpdateShopStatus, dataId).then(response => {
                            if (response.data.success == true) {
                                ElMessage.success('Updated Public Shop Successfully...');
                            }
                        }).catch((error) => {
                            ElMessage.error(`Fail Update Public Shop: ${error} ...`);
                        });
                    }
                    if (sellerId.shop_status == 'Open') {
                        console.log(sellerId.shop_status, sellerId.user_id)
                        const dataUpdateShopStatus = {
                            shopStatus: 'Close'
                        }
                        this.sellerServices.verifyShopBySellerID(dataUpdateShopStatus, dataId).then(response => {
                            if (response.data.success == true) {
                                ElMessage.success('Updated UnPublic Shop Successfully...');
                            }
                        }).catch((error) => {
                            console.log(error)
                            ElMessage.error(`Fail Update UnPublic Shop: ${error} ...`);
                        });
                    }
                }
           })      
        },
        //Create
        openCreateSeller(){
            this.createSellerDialog = true;
            this.submitted = false;
            this.arrSeller = {};
        },
        hideDialogSeller(){
            this.createSellerDialog = false;
            this.submitted = false;
        },
        //Capture FIle Uploads
        captureFile($event) {
            this.avatarFileUpload = $event;
            this.filePreview = $event.previewBase64;
            this.fileName = $event.name;
        },
        async onUploadFileLogo(event) {
            const filleLogo = event.files[0];
            this.uploadFileShopLogo = filleLogo;
            const reader = new FileReader();
            let blob = await fetch(filleLogo.objectURL).then((r) => r.blob()); //blob:url
            reader.readAsDataURL(blob);
            reader.onload = e => {
                this.filePreviewLogo = e.target.result;
            };
            reader.onerror = (error) => {
                ElMessage.error(error);
            }
            if (filleLogo.size > 1024 * 1024) {
                alert('File too big (> 1MB)');
                ElMessage.error('File too big (> 1MB)');
                return;
            }
        },
        async onUploadFileBanner(event) {
            const filleBanner = event.files[0];
            this.uploadFileBanner = filleBanner;
            const reader = new FileReader();
            let blob = await fetch(filleBanner.objectURL).then((r) => r.blob()); //blob:url
            reader.readAsDataURL(blob);
            reader.onload = e => {
                this.filePreviewBanner = e.target.result;
            };
            reader.onerror = (error) => {
                ElMessage.error(error);
            }
            if (filleBanner.size > 1024 * 1024) {
                alert('File too big (> 1MB)');
                ElMessage.error('File too big (> 1MB)');
                return;
            }
        },
        /*
            Input Only Phone Number
        */
        inputOnlyNumber(event){
            let keyCode = event.keyCode ? event.keyCode : event.which;
             if (keyCode < 48 || keyCode > 57) {
                // 46 is dot
                event.preventDefault();
            }
        },
        validateEmail(email){
            if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                this.msgEmailValidate = '';
            } else {
                 this.msgEmailValidate = 'Invalid Email...';    
            }
        },
        checkConfirmPassword(){
           if(this.arrSeller.passwordSeller !== this.arrSeller.confirmPassword){
                this.errorConfirmPass = 'Password do not match...';
                return false;
           }
           this.errorConfirmPass = '';
           return true;
        },
        saveSellerCreate() {
            this.submitted = true;
            
             const { firstNameSell,
                     lastNameSell, 
                     passwordSeller, 
                     confirmPassword,
                     emailSeller,
                     phoneNumberSeller,
                     shopName,
                     shopPhoneNumber,
                     addressLineShop1,
                     addressLineShop2,
                     addressCity,
                     addressZipCode,
                     sellerRequestDate,
                     sellerApprovedDate
                     } = this.arrSeller;
            if(firstNameSell == undefined,
                lastNameSell  == undefined,
                passwordSeller  == undefined,
                confirmPassword  == undefined,
                emailSeller == undefined,
                phoneNumberSeller == undefined,
                shopName  == undefined,
                shopPhoneNumber  == undefined,
                addressLineShop1  == undefined,
                addressLineShop2  == undefined,
                addressCity == undefined,
                addressZipCode  == undefined,
                sellerRequestDate  == undefined,
                sellerApprovedDate  == undefined
            )
            {
                //Upload File
                if (!this.avatarFileUpload) {
                    if(this.avatarFileUpload == null){
                        this.errorUploadAvatar = 'Please Profile Image...';
                        return false;
                    }
                    this.errorUploadAvatar = '';
                    return true;
                }
                ElMessage.error('Please Input Field...')
            }else{
                if(!this.avatarFileUpload)
                {
                   ElMessage.error('Please Profile Image');
                }else{
                    //Data Response 
                    const dataSellAcc = {
                        shopNameEng: this.arrSeller.shopName,
                        shopNameKh: '',
                        shopPhone: this.arrSeller.shopPhoneNumber,
                        shopAddr01: this.arrSeller.addressLineShop1,
                        shopAddr02: this.arrSeller.addressLineShop2,
                        shopAddrCity: this.arrSeller.addressCity,
                        shopZipCode: this.arrSeller.addressZipCode,
                        shopLogo: this.uploadFileShopLogo,
                        shopBanner: this.uploadFileBanner,
                        shopTypeID: 2,
                        shopRequestDate: this.arrSeller.sellerRequestDate,
                        shopApprovedDate: this.arrSeller.sellerApprovedDate,
                        shopVerify: 'Unverified',
                        shopStatus: 'Close',
                        sellerNameEng: this.arrSeller.firstNameSell + ' ' + this.arrSeller.lastNameSell,
                        sellerNameKh: '',
                        sellerEmail: this.arrSeller.emailSeller,
                        sellerPassword: this.arrSeller.passwordSeller,
                        sellerPhoneNumber: this.arrSeller.phoneNumberSeller,
                        sellerLogo: this.avatarFileUpload,
                    }
                    // Seller Services Accounts
                    this.sellerServices.createSellerAcc(dataSellAcc).then((response) => {
                        if (response.data.success == true) {
                            ElMessage.success(response.data.message);
                        }
                        this.createSellerDialog = false;
                        this.arrSeller = {};
                        setTimeout(function () {
                            location.reload(true)
                        }, 1500)
                    }).catch((error) => {
                        console.log(error)
                        ElMessage.error(error);
                        if (error.response.data.success == false) {
                            ElMessage.error(error.response.data.error);
                            this.messageAlert = [
                                { severity: 'error', content: `${JSON.stringify(error.response.data.error.error)}` },
                                { severity: 'error', content: `${JSON.stringify(error.response.data.error)}` }
                            ]
                        }
                    });
                }  
            }
            if(this.arrSeller.userId){
                console.log(this.arrSeller)
            }
        },
        editSellerData(arrSeller){
            this.arrSeller = {...arrSeller }
            this.arrSeller.userId = arrSeller.user_id;
            this.createSellerDialog = true;
            this.arrSeller[this.findIndexByAccSellId(this.arrSeller.user_id)] = this.arrSeller;
        },
        findIndexByAccSellId(id) {
            let index = -1;
           for (let i = 0; i < this.sellers.length; i++) {
                if (this.sellers[i].user_id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        resetForm() {
            this.sellers = {}
            this.sellers.isEdit = false
            this.submitted = false
        }
    }
}
</script>

