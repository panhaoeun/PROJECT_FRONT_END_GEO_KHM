<template>
    <div class="layout-content">
        <!-- Toast Alert -->
        <Toast />
        <!--Create Products-->
        <div class="card px-6 py-6">
            <!-- Title -->
            <h3>Create Shop</h3>    
            <div class="text-xl font-bold">
                <!-- Tabs -->
                <form method="POST" @click.prevent="handleSubmitShopInfo(!v$.$invalid)">
                    <!-- Tabs -->
                    <el-tabs class="demo-tabs">
                            <!-- English -->
                            <el-tab-pane label="English(Eng)">
                                <div class="grid grid-nogutter flex-wrap gap-3 px-1 p-fluid h-auto">
                                        <div class="col-12 lg:col-12">
                                            <!-- Form Layouts -->
                                            <div class="grid formgrid">
                                                <div class="col-12 field">
                                                        <!-- Name Category -->
                                                        <div class="field">
                                                            <label for="name_en" class="text-lg">Shop Name<span class="p-error">*</span> (Eng)</label>
                                                            <InputText id="product_name" placeholder="Shop Name" type="text" class="py-4 border-round-lg text-lg" v-model="v$.shopInfoNameEng.$model" :class="{ 'p-invalid p-error': v$.shopInfoNameEng.$invalid && submitted }"/>
                                                            <small v-if="(v$.shopInfoNameEng.$invalid && submitted) || v$.shopInfoNameEng.$pending.$response" class="p-error">{{ v$.shopInfoNameEng.required.$message.replace('Value', 'Name') || v$.shopInfoNameEng.$params.min }}</small>
                                                        </div>
                                                    <!--Contact-->
                                                        <div class="field">
                                                            <label for="name_en" class="text-lg">Contacts</label>
                                                            <InputText id="product_name" placeholder="Contacts" type="text" class="py-4 border-round-lg text-lg" v-model="shopInfoContact" />
                                                        </div>
                                                </div>
                                                <!-- Editor -->
                                                <div class="col-12 field">
                                                    <Editor v-model="shopDescriptionEng" placeholder="Descriptions *" editorStyle="height: 320px" class="border-round-lg"/>
                                                </div>     
                                                <!-- Upload Logo Shops -->
                                                <div class="col-12 field">
                                                    <!--Category Logo -->
                                                    <div class="field">
                                                        <label for="name_en">Category Logo <span class="p-error">*</span> </label>
                                                        <!-- Upload Files -->
                                                        <el-upload 
                                                                action="#" 
                                                                list-type="picture-card" 
                                                                :on-preview="handlePictureCardPreviewUpdate"
                                                                :on-remove="handleRemoveCat" 
                                                                :auto-upload="false" 
                                                                :on-change="handleChangeUpdateCat" 
                                                                :class="objClassUpdateShop"
                                                                ref="fileUpload"
                                                                :limit="1"
                                                                >
                                                            <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                        </el-upload>
                                                    </div>
                                                </div>        
                                            </div> 
                                        </div>
                                    </div>
                            </el-tab-pane>
                            <!-- Khmer  -->
                            <el-tab-pane label="Khmer(KH)">
                                        <div class="grid grid-nogutter flex-wrap gap-3 p-1 p-fluid">
                                            <div class="col-12 lg:col-12">
                                                <!-- Form Layouts -->
                                                <div class="grid formgrid">
                                                    <div class="col-12 field">
                                                        <!-- Shop Name -->
                                                        <div class="field">
                                                            <label for="name_en" class="text-lg">Shop Name <span class="p-error">*</span> (Kh)</label>
                                                            <InputText id="product_name" placeholder="Shop Name" type="text" class="py-4 border-round-md" v-model="shopInfoNameKh"/>
                                                        </div>
                                                    </div>
                                                    <!-- Editor -->
                                                    <div class="col-12 field">
                                                        <Editor v-model="shopDescriptionKh" placeholder="Descriptions *" editorStyle="height: 320px" class="border-round-lg  text-lg" />
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                            </el-tab-pane>
                    </el-tabs>
                    <!-- Buttons Submits -->
                    <div class="col-12 flex justify-content-end mt-4">
                        <!--Buttons-->
                        <Button label="Cancel" icon="pi pi-times" class="p-button-lg py-4 p-button-outlined w-10rem mr-3" />
                        <Button label="Save" icon="pi pi-check" class="p-button-lg py-4 w-10rem" onclick=""/>
                    </div>
                </form>
            </div>
         </div>
      </div>
  </template>
  
  <!-- Scripts -->
  <script>
    import { required,minLength} from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";
    import ShopManagementsServices from "../../../services/vendors/shop_management/ShopManagementInforServices";
    import { ElMessage } from 'element-plus';
    export default {
        setup: () => ({ v$: useVuelidate() }),
        data(){
              return{
                messages: [],
                messagesShopInfo: [],
                loading: [false, false, false],
                activetab: 1,
                submitted: false,
                //Google Maps
                center: { lat: 51.093048, lng: 6.84212 },
                markers: [
                    {
                        position: {
                            lat: 51.093048,
                            lng: 6.84212,
                        },
                    }
                ],
                objClassUpdateShop: {
                    upLoadShowShop: true,
                    upLoadHideShop: false,
                },
                shopInfoNameEng: '',
                shopInfoContact: '',
                shopInfoNameKh: '',
                shopInfoAddr01: '',
                shopInfoTypeId: '',
                shopInfoAddr02: '',
                shopInfoAddr03: '',
                shopInfoLatlng: '',
                shopDescriptionKh: '',
                shopDescriptionEng:''
              }
        },
        created() {
            this.shopManageSer = new ShopManagementsServices();
        },
        validations(){
            return {
                shopInfoNameEng: {
                    required,
                    minLength: minLength(3)
                },
                shopInfoAddr01: {
                    required
                },
                shopInfoAddr02: {
                    required
                },
                shopInfoAddr03: {
                    required
                }
            }
        },
        methods: {
            //Submit
            async handleSubmitShopInfo(isFormValid){
                try{
                    this.submitted = true;
                    if(!isFormValid){
                        return;
                    }
                    if(!this.shopInfoNameEng != "" || this.shopInfoNameEng !== null){
                        // Data Response
                        const dataProShopInfo = {
                            shopNameEng : this.shopInfoNameEng,
                            shopNameKh: this.shopInfoNameKh,
                            address01: this.shopInfoAddr01,
                            address02: this.shopInfoAddr02,
                            address03: this.shopInfoAddr03,
                            shopLatlng: this.shopInfoLatlng,
                        };
                        this.shopManageSer.createShop(dataProShopInfo).then((response) => {
                            if(response.data.status === true){
                                this.$toast.add({severity:'success', summary: 'Success Message', detail:response.data.message, life: 3000});
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            if(error.response.status == '401'){
                                //  Toast Alert 
                                this.messagesShopInfo = [
                                    {severity: 'error', content: error.response.data.error},
                                ]
                                this.$toast.add({severity:'error', summary: 'Error Message', detail:error.response.data.message, life: 5000});
                            }
                        })
                    }
                }catch(error){
                    console.log(error)
                    //  Toast Alert 
                    this.messagesShopInfo = [
                        {severity: 'error', content: error},
                    ]
                }
            },
            //============Uploads Files================
            handleChangeUpdateCat(file) {
                this.fileUpload = file.raw;
                //Check Upload File
                this.beforeAvatarUpload(file.raw);
                this.objClassUpdateCat.upLoadHideShop = true;//上传图片后置upLoadHideShop为真，隐藏上传框
                this.objClassUpdateCat.upLoadShowShop = false;
            },
            handleRemoveCat(file, fileListCatUpdated) {
                console.log(file, fileListCatUpdated)
                this.objClassUpdateCat.upLoadShowShop = true;//删除图片后显示上传框
                this.objClassUpdateCat.upLoadHideShop = false;
            },
            // 点击预览图的放大按钮后会触发handlePictureCardPreviewUpdate
            handlePictureCardPreviewUpdate(file) {
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
        },
        resetForm(){
            this.shopInfoNameEng = '',
            this.shopInfoNameKh = '',
            this.shopInfoAddr01 = '',
            this.shopInfoAddr02 = '',
            this.shopInfoAddr03 = '',
            this.submitted =  false
        }
      }
  </script>
  