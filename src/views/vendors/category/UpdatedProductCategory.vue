<template>
    <div class="layout-content">
        <!-- Toast Alert -->
        <Toast />
        <!--Create Products-->
            <div class="card card px-6 py-6">
                <h5>Edit Product Category</h5>
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
                        <form @submit.prevent="handleSubmitProCategoriesUpdate(!v$.$invalid)">
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
                                                    <InputText id="proCategoryNameEng" placeholder="Name" type="text" class="py-3" v-model="v$.proCategoryNameEng.$model" :class="{'p-invalid p-error':v$.proCategoryNameEng.$invalid && submitted}"/>
                                                    <small v-if="(v$.proCategoryNameEng.$invalid && submitted) || v$.proCategoryNameEng.$pending.$response" class="p-error">{{v$.proCategoryNameEng.required.$message.replace('Value', 'Name') || v$.proCategoryNameEng.$params.min}}</small>
                                                </div>
                                                <!-- Descriptions -->
                                                <div class="field">
                                                    <label for="name_en">Description (Eng)</label>
                                                    <InputText id="product_des_eng" placeholder="Description" type="text" class="py-3" v-model="proCategoryDesEng"/>
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
                                                    <InputText id="product_name_kh" placeholder="Name" type="text" class="py-3" v-model="proCategoryNameKh"/>
                                                </div>
                                                <!-- Descriptions -->
                                                <div class="field">
                                                    <label for="name_en">Description <span class="p-error">*</span> (Eng)</label>
                                                    <InputText id="product_des_kh" placeholder="Description" type="text" class="py-3" v-model="proCategoryDesKh"/>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <!-- Messages Alert-->
                            <Message v-for="msg of messageProCategory" :severity="msg.severity" :life="5000" :sticky="false" :key="msg.content">{{msg.content}}</Message>
                            <!-- Button Submit -->
                            <div class="flex justify-content-between gap-3 float-right px-2 py-2">
                                <router-link to="/vendor/products/category/list">
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
    import ProductCategoriesServices from '../../../services/vendors/product_categories/ProductsCategoriesServices';

    export default {
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return{
                activetab: 1,
                submitted: false,
                proCategoryNameEng: '',
                proCategoryDesEng: '',
                proCategoryNameKh: '',
                proCategoryDesKh: '',
                messageProCategory: [],
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
            this.proCategorySer = new ProductCategoriesServices();
        },
        validations(){
            return {
                proCategoryNameEng: {
                    required,
                    minLength: minLength(3)
                }
            }
        },
        methods: {
           // Find By ID
            getProSerByID(){
                this.proCategorySer.editedProCategory(this.$route.params.id)
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
           async handleSubmitProCategoriesUpdate(isFormValidSubmit){
               try{
                    this.submitted = true;
                    if(!isFormValidSubmit){
                        return;
                    }
                    if(!this.proCategoryNameEng != "" || this.proCategoryNameEng !== null){
                        const proCategoryId = this.$route.params.id;
                        // Data Response
                        const dataProCategory = {
                            proCategoryEng : this.proCategoryNameEng,
                            productCategorykh: this.proCategoryNameKh,
                            proCategoryDescription: this.proCategoryDesEng,
                        };
                        this.proCategorySer.updateProCategory(dataProCategory,proCategoryId).then((response) => {
                            if(response.data.status === true){
                                this.$toast.add({severity:'success', summary: 'Success Message', detail:response.data.message, life: 3000});
                                // Push Router
                                this.$router.push("/vendor/products/category/list");    
                            }
                        })
                        .catch(error => {
                            if(error.response.status == '401'){
                                //  Toast Alert 
                                this.messageProCategory = [
                                    {severity: 'error', content: error.response.data.error},
                                ]
                                this.$toast.add({severity:'error', summary: 'Error Message', detail:error.response.data.message, life: 5000});
                            }
                        
                        });
                    }        
               }catch(error){
                    //  Toast Alert 
                    this.messageProCategory = [
                        {severity: 'error', content: error},
                    ]
               }
            },
            resetForm(){
                this.proCategoryNameEng = '',
                this.proCategoryDesEng = '',
                this.proCategoryNameKh = '',
                this.submitted =  false
            }
        }
    }
  </script>
  