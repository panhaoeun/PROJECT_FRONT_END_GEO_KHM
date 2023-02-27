<template>
    <div class="layout-content">
            <!--Create Products-->
            <div class="card card px-6 py-6">
                  <!-- Tabs -->
                  <div class="tabs">
                      <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">English(Eng)</a>
                      <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]">Khmer(KH)</a>
                  </div>
                  
                <!--Form Submited-->
                <form @submit.prevent="handleCategorySubmit(!v$.$invalid)">
                    <div class="content">
                        <!-- English -->
                        <div v-if="activetab === 1" class="tabcontent">
                            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                                <div class="col-12 lg:col-12">
                                    <!-- Form Layouts -->
                                    <div class="grid formgrid">
                                        <div class="col-12 field">
                                            <!-- Name Category -->
                                            <div class="field">
                                                <label for="name_en">Category Name <span class="p-error">*</span> (Eng)</label>
                                                <InputText id="product_name" placeholder="New" type="text" class="py-3" v-model="v$.proCategoryNameEng.$model" :class="{'p-invalid p-error':v$.proCategoryNameEng.$invalid && submitted}"/>
                                                <small v-if="(v$.proCategoryNameEng.$invalid && submitted) || v$.proCategoryNameEng.$pending.$response" class="p-error">{{v$.proCategoryNameEng.required.$message.replace('Value', 'Name') || v$.proCategoryNameEng.$params.min}}</small>
                                            </div>
                                        </div>
                                        <!-- Editor -->
                                        <div class="col-12 field">
                                            <Editor v-model="proCategoryDesEng" placeholder="Descriptions *" editorStyle="height: 320px" />
                                        </div>
                                        <div class="col-12 field">
                                            <!--Category Logo -->
                                            <div class="field">
                                                <label for="name_en">Category Logo <span class="p-error">*</span> </label>
                                                <!-- Upload Files -->
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <!-- Khmer -->
                        <div v-if="activetab === 2" class="tabcontent">
                            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                                <div class="col-12 lg:col-12">
                                    <!-- Form Layouts -->
                                    <div class="grid formgrid">
                                        <div class="col-12 field">
                                            <!-- Name Category -->
                                            <div class="field">
                                                <label for="name_en">Category Name <span class="p-error">*</span> (Kh)</label>
                                                <InputText id="proCategoryNameKh" v-model="proCategoryNameKh" placeholder="New Category" type="text" class="py-3"/>
                                            </div>
                                        </div>
                                         <!-- Editor -->
                                         <div class="col-12 field">
                                            <Editor v-model="proCategoryDesKh" placeholder="Descriptions *" editorStyle="height: 320px"/>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
    
                        <!-- Button Submit -->
                        <div class="flex justify-content-between gap-3 float-right px-2 py-2">
                                <Button label="Cancel" icon="pi pi-times" class="p-button-lg p-button-danger p-button p-component p-button-text"></Button>
                                <Button label="Submit" icon="pi pi-check" class="p-button-lg" type="submit"></Button>
                        </div>
                    </div>
                </form>
            </div>
      </div>
  </template>
  
  <!-- Scripts Category -->
  <script>
    import { required,minLength} from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";
    import ProductCategoriesServices from "../../../services/vendors/product_categories/ProductsCategoriesServices";

    export default {
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return{
                activetab: 1,
                preview: null,
                image: null,
                proCategoryNameEng: '',
                proCategoryDesEng: '',
                proCategoryNameKh: '',
                proCategoryDesKh: '',   
                submitted: false,
                message_pro_type: [],
                messages: [],
                loading: [false, false, false],
            }
        },
        components() {
            this.proCategoryService = new ProductCategoriesServices();
        },  
        //Validations
        validations(){
            return {
                proCategoryNameEng: {
                    required,
                    minLength: minLength(3)
                }
            }
        },
        methods: {
           async handleCategorySubmit(isFormValidCategorySub){
                try{
                        this.submitted = true;
                        if(!isFormValidCategorySub){
                            return;
                        }
                        if(!this.proCategoryNameEng != "" || this.proCategoryNameEng !== null){
                            // Data Response
                            const dataProCategory = {
                                proCategoryEng : this.proCategoryNameEng,
                                productCategorykh: this.proCategoryNameKh,
                                proCategoryDescription: this.proCategoryDesEng,
                            };
                            this.proCategoryService.createProCategory(dataProCategory).then((response) => {
                                console.log(response)
                                if(response.data.status === true){
                                    this.$toast.add({severity:'success', summary: 'Success Message', detail:response.data.message, life: 3000});
                                    // Push Router
                                    this.$router.push("/vendor/products/category/list");    
                                }
                            })
                            .catch(error => {
                                console.log(error)
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
                this.proCategoryNameEng = '',
                this.proCategoryNameKh = '',
                this.proCategoryDesEng = '',
                this.submitted =  false
            }
        }
    }
  </script>
  