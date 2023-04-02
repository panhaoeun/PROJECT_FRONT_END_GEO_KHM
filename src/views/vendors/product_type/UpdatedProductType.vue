<template>
    <div class="layout-content">
        <!-- Toast Alert -->
        <Toast />
        <!--Create Products-->
            <div class="card card px-6 py-6">
                <h5>Edit Product Type</h5>
                  <!-- Tabs -->
                  <div class="tabs">
                      <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">
                            <span>
                                 <i class="pi pi-language"></i>
                                 Eng(Eng)
                            </span>
                        </a>
                      <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]">
                        <span>
                            <i class="pi pi-language"></i>
                             Khmer(KH)
                        </span>
                     </a>
                  </div>
  
                  <div class="content">
                    <!-- Form Submits -->
                        <form @submit.prevent="handleSubmitProTypeUpdate(!v$.$invalid)">
                            <!-- Khmer -->
                            <div v-if="activetab === 1" class="tabcontent">
                                <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                                    <div class="col-12 lg:col-12">
                                        <!-- Form Layouts -->
                                        <div class="grid formgrid">
                                            <div class="col-12 field">
                                                <!-- Name Category -->
                                                <div class="field">
                                                    <label for="name_en">Product Type Name <span class="p-error">*</span> (Eng)</label>
                                                    <InputText id="product_name_eng" placeholder="Name" type="text" class="py-3" v-model="v$.proNameEng.$model" :class="{'p-invalid p-error':v$.proNameEng.$invalid && submitted}"/>
                                                    <small v-if="(v$.proNameEng.$invalid && submitted) || v$.proNameEng.$pending.$response" class="p-error">{{v$.proNameEng.required.$message.replace('Value', 'Name') || v$.proNameEng.$params.min}}</small>
                                                </div>
                                                <!-- Descriptions -->
                                                <div class="field">
                                                    <label for="name_en">Description (Eng)</label>
                                                    <InputText id="product_des_eng" placeholder="Description" type="text" class="py-3" v-model="proDesEng"/>
                                                </div>     
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
                                                <!-- Name Category -->
                                                <div class="field">
                                                    <label for="name_en">Product Type Name <span class="p-error">*</span> (KH)</label>
                                                    <InputText id="product_name_kh" placeholder="Name" type="text" class="py-3" v-model="proNameKh"/>
                                                </div>
                                                <!-- Descriptions -->
                                                <div class="field">
                                                    <label for="name_en">Description <span class="p-error">*</span> (Eng)</label>
                                                    <InputText id="product_des_kh" placeholder="Description" type="text" class="py-3" v-model="proDesKh"/>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <!-- Messages Alert-->
                            <Message v-for="msg of message_pro_type" :severity="msg.severity" :life="5000" :sticky="false" :key="msg.content">{{msg.content}}</Message>
                            <!-- Button Submit -->
                            <div class="flex justify-content-between gap-3 float-right px-2 py-2">
                                <router-link to="/vendor/products/type/list">
                                    <Button label="Cancel" icon="pi pi-times" class="p-button-lg p-button-danger p-component p-button-outlined w-8rem mr-3"></Button>
                                </router-link>
                                <Button label="Submit" type="submit" icon="pi pi-check" class="p-button-lg p-component"></Button>        
                            </div>
                        </form>
                  </div>
            </div>
      </div>
  </template>
  
  <!-- Script -->
  <script>
    import { required,minLength} from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";
    import ProductTypes from "../../../services/vendors/product_types/ProductsTypeServices";

    export default {
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return{
                activetab: 1,
                submitted: false,
                proNameEng: '',
                proDesEng: '',
                proNameKh: '',
                proDesKh: '',
                message_pro_type: [],
                messages: [],
                loading: [false, false, false],
                getProType: {
                    product_type_eng: '',
                    product_type_kh: '',
                    product_type_des_eng: '',
                    _method:"put"
                }
            }
        },
        mounted(){
            this.getProSerByID();
        },  
        created() {
            this.proTypeServices = new ProductTypes();
        },
        validations(){
            return {
                proNameEng: {
                    required,
                    minLength: minLength(3)
                }
            }
        },
        methods: {
           // Find By ID
            getProSerByID(){
                this.proTypeServices.editedProType(this.$route.params.id)
                    .then((response) => {
                       const {product_type_eng,product_type_kh,product_type_des_eng}= response.data.data;
                       this.getProType.product_type_des_eng = product_type_eng;
                       this.getProType.product_type_kh = product_type_kh;
                       this.getProType.product_type_des_eng = product_type_des_eng;
                    })
                    .catch((error) => {
                       console.log(error);
                    });
            },
           // Save Data
           async handleSubmitProTypeUpdate(isFormValid){
               try{
                    this.submitted = true;
                    if(!isFormValid){
                        return;
                    }
                    if(!this.proNameEng != "" || this.proNameEng !== null){
                        const proTypeId = this.$route.params.id;
                        // Data Response
                        const dataProType = {
                            productTypeEng : this.proNameEng,
                            productTypekh: this.proNameKh,
                            productTypeDesEng: this.proDesEng,
                        };
                        this.proTypeServices.updateProType(dataProType,proTypeId).then((response) => {
                            console.log(response)
                            if(response.data.status === true){
                                this.$toast.add({severity:'success', summary: 'Success Message', detail:response.data.message, life: 3000});
                                // Push Router
                                this.$router.push("/vendor/products/type/list");    
                            }
                        })
                        .catch(error => {
                            if(error.response.status == '401'){
                                //  Toast Alert 
                                this.message_pro_type = [
                                    {severity: 'error', content: error.response.data.error},
                                ]
                                this.$toast.add({severity:'error', summary: 'Error Message', detail:error.response.data.message, life: 5000});
                            }
                        
                        });
                    }        
               }catch(error){
                    //  Toast Alert 
                    this.message_pro_type = [
                        {severity: 'error', content: error},
                    ]
               }
            },
            resetForm(){
                this.proNameEng = '',
                this.proDesEng = '',
                this.proDesKh = '',
                this.proDesKh = '',
                this.submitted =  false
            }
        }
    }
  </script>
  