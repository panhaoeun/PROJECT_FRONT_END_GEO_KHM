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
                <form action="" method="POST" @click.prevent="handleSubmitShopInfo(!v$.$invalid)">
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
                        <Button label="Cancel" icon="pi pi-times" class="p-button-lg py-3 p-button-outlined w-10rem mr-3" />
                        <Button label="Save" icon="pi pi-check" class="p-button-lg py-3 w-10rem" onclick=""/>
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
            }
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
  