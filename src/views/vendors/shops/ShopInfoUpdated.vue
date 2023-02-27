<template>
    <div class="layout-content">
        <!-- Toast Alert -->
        <Toast />
        <!--Create Products-->
        <div class="card card px-6 py-6">
            <!-- Title -->
            <span class="block text-900 font-bold text-xl mb-4">Edit Shop</span>
                <!-- Tabs -->
                <div class="tabs">
                    <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">English(Eng)</a>
                    <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]">Khmer(Kh)</a>
                </div>
                <!-- Contents -->
                <div class="content">
                    <form @submit.prevent="handleSubmitShopInfo(!v$.$invalid)">
                            <!-- Khmer -->
                        <div v-if="activetab === 1" class="tabcontent">
                            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                                <div class="col-12 lg:col-12">
                                    <!-- Form Layouts -->
                                    <div class="grid formgrid">
                                        <div class="col-12 field">
                                                <!-- Name Category -->
                                                <div class="field">
                                                    <label for="name_en">Shop Name<span class="p-error">*</span> (Eng)</label>
                                                    <InputText id="product_name" placeholder="Shop Name" type="text" class="py-3" v-model="v$.shopInfoNameEng.$model" :class="{'p-invalid p-error':v$.shopInfoNameEng.$invalid && submitted}"/>
                                                    <small v-if="(v$.shopInfoNameEng.$invalid && submitted) || v$.shopInfoNameEng.$pending.$response" class="p-error">{{v$.shopInfoNameEng.required.$message.replace('Value', 'Name') || v$.shopInfoNameEng.$params.min}}</small>
                                                </div>
                                            <!--Contact-->
                                                <div class="field">
                                                    <label for="name_en">Contacts</label>
                                                    <InputText id="product_name" placeholder="Contacts" type="text" class="py-3" v-model="shopInfoContact" />
                                                </div>
                                                <!--Address-->
                                                <div class="field">
                                                    <label for="name_en">Address<span class="p-error">*</span></label>
                                                    <InputText id="shopInfoAddr01" placeholder="Street Address,Billing Address" type="text" class="py-3" v-model="v$.shopInfoAddr01.$model" :class="{'p-invalid p-error':v$.shopInfoAddr01.$invalid && submitted}"/>
                                                    <small v-if="(v$.shopInfoAddr01.$invalid && submitted) || v$.shopInfoAddr01.$pending.$response" class="p-error">{{v$.shopInfoAddr01.required.$message.replace('Value', 'Street Address,Billing Address') || v$.shopInfoAddr01.$params.min}}</small>
                                                </div>
                                                <div class="field">
                                                    <InputText id="str_addres" placeholder="State/Province" type="text" class="py-3"  v-model="v$.shopInfoAddr02.$model" :class="{'p-invalid p-error':v$.shopInfoAddr02.$invalid && submitted}"/>
                                                    <small v-if="(v$.shopInfoAddr02.$invalid && submitted) || v$.shopInfoAddr02.$pending.$response" class="p-error">{{v$.shopInfoAddr02.required.$message.replace('Value', 'State/Province') || v$.shopInfoAddr02.$params.min}}</small>
                                                </div>
                                                <div class="field">
                                                    <InputText id="str_addres" placeholder="City" type="text" class="py-3" v-model="v$.shopInfoAddr03.$model" :class="{'p-invalid p-error':v$.shopInfoAddr03.$invalid && submitted}"/>
                                                    <small v-if="(v$.shopInfoAddr03.$invalid && submitted) || v$.shopInfoAddr03.$pending.$response" class="p-error">{{v$.shopInfoAddr03.required.$message.replace('Value', 'City') || v$.shopInfoAddr03.$params.min}}</small>
                                                </div>
                                                <div class="field">
                                                    <label for="name_en">Shop Lat/Lng<span class="p-error">*</span></label>
                                                    <InputText id="str_addres" placeholder="Shop Lat/Lng" type="text" class="py-3" v-model="shopInfoLatlng"/>
                                                </div>
                                        </div>
                                        <!-- Editor -->
                                        <div class="col-12 field">
                                            <Editor v-model="shopDescriptionEng" placeholder="Descriptions *" editorStyle="height: 320px" />
                                        </div>
                                        <!--==========================Google Maps=================-->
                                        <div class="col-12 field">
                                                <GMapMap
                                                    :center="center"
                                                    :zoom="10"
                                                    map-type-id="terrain"
                                                    style="height: 20rem"
                                                >
                                                    <GMapCluster :zoomOnClick="true">
                                                        <GMapMarker
                                                            :key="index"
                                                            v-for="(m, index) in markers"
                                                            :position="m.position"
                                                            :clickable="true"
                                                            :draggable="true"
                                                            @click="center = m.position"
                                                        />
                                                    </GMapCluster>
                                                </GMapMap>
                                        </div>                           
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <!-- English -->
                        <div v-if="activetab === 2" class="tabcontent">
                            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                                <div class="col-12 lg:col-12">
                                    <!-- Form Layouts -->
                                    <div class="grid formgrid">
                                        <div class="col-12 field">
                                            <!-- Shop Name -->
                                            <div class="field">
                                                <label for="name_en">Shop Name <span class="p-error">*</span> (Kh)</label>
                                                <InputText id="product_name" placeholder="Shop Name" type="text" class="py-3" v-model="shopInfoNameKh"/>
                                            </div>
                                        </div>
                                        <!-- Editor -->
                                        <div class="col-12 field">
                                            <Editor v-model="shopDescriptionKh" placeholder="Descriptions *" editorStyle="height: 320px" />
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <!-- Messages Alert-->
                        <Message v-for="msg of messagesShopInfo" :severity="msg.severity" :life="5000" :sticky="false" :key="msg.content">{{msg.content}}</Message>
                        <!-- Button Submit -->
                        <div class="flex justify-content-between gap-3 float-right">
                                <router-link to="/vendor/products/shop/list">
                                    <Button label="Cancel" icon="pi pi-times" class="p-button-lg p-button-danger p-component p-button-outlined w-8rem mr-3"></Button>
                                </router-link>
                                <Button label="Submit" icon="pi pi-save" class="p-button-lg" type="submit"></Button>
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
                        const shopInforId = this.$route.params.id;
                        // Data Response
                        const dataProShopInfo = {
                            shopNameEng : this.shopInfoNameEng,
                            shopNameKh: this.shopInfoNameKh,
                            address01: this.shopInfoAddr01,
                            address02: this.shopInfoAddr02,
                            address03: this.shopInfoAddr03,
                            shopLatlng: this.shopInfoLatlng,
                        };
                        this.shopManageSer.updateShopID(dataProShopInfo,shopInforId).then((response) => {
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
  