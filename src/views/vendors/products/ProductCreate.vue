<template>
   <div class="layout-content">
        <!--Create Products-->
        <div class="card card px-6 py-6">
           <span class="block text-900 font-bold text-xl mb-4">Create Product</span>
           <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <div class="col-12 lg:col-12">
                    <TabMenu :model="productItemTab" v-model:activeIndex="active" />
                    <!-- Form Layouts -->
                    <div class="grid formgrid">
                        <div class="col-12 field">
                            <!-- Name Product -->
                            <div class="field">
                                <label for="name_en">Name (EN)</label>
                                <InputText id="product_name" placeholder="New Products" type="text" class="py-3"/>
                            </div>
                        </div>
                         <!-- Product Code -->
                         <div class="col-12 lg:col-6 field">
                            <div class="field">
                                <label for="name_en">Product Code</label>
                                <InputText class="p-inputtext p-component py-3" type="text" placeholder="Product Code" />
                            </div>
                        </div>
                        <!-- Product Prices -->
                        <div class="col-12 lg:col-6 field">
                            <div class="field">
                                <label for="name_en">Unit Price</label>
                                <InputNumber mode="decimal" placeholder="Unit Price" inputClass="py-3"  v-model="unitPriceEng"/>
                            </div>
                        </div>
                        <!-- Product Category -->
                        <div class="col-12 lg:col-6 field">
                            <div class="field">
                                <label for="name_en">Product Category</label>
                                <Dropdown v-model="productTypeEng" placeholder="Select Product Category" class="py-1" :showClear="true" filter="true"/>
                            </div>
                        </div>
                        <!-- Product Type -->
                        <div class="col-12 lg:col-6 field">
                            <div class="field">
                                <label for="name_en">Product Type</label>
                                <Dropdown v-model="productTypeEng" placeholder="Select Product Type" class="py-1" :showClear="true" filter="true"/>
                            </div>
                        </div>
                      
                        <!-- Description Product -->
                        <div class="col-12 lg:col-12">
                             <div class="field">
                                <label for="name_en">Description (EN)</label>
                                <Editor v-model="valueEditorPro" editorStyle="height: 320px"/>
                            </div>  
                        </div>
                        <!--Variations-->
                        <div class="card">
                           <h5>Variations</h5>
                           <!-- Color Selected -->
                           <!--  -->
                        </div>
                    </div> 
                </div>
           </div>
        </div>
        <!-- Product Details -->
        <div class="card card px-6 py-6">
           <span class="block text-900 font-bold text-xl mb-4">Product Details</span>
           <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <div class="col-12 lg:col-12">
                    <!-- Form Layouts -->
                    <div class="grid formgrid">
                        <!-- Link Video -->
                        <div class="col-12 lg:col-12">
                             <div class="field">
                                <label for="name_en">Youtube Video Link</label>
                                <InputText id="product_name" placeholder="New Products" type="text" class="py-3"/>
                            </div>  
                        </div>
                        <!-- Upload Imag Multiple Product and Thumbnail -->
                        <div class="col-12 lg:col-7">
                             <div class="field">
                                <label for="name_en">Upload Product Images <span class="">*</span> </label>
                                <InputText id="product_name" placeholder="New Products" type="text" class="py-3"/>
                            </div>  
                        </div>
                        <div class="col-12 lg:col-5">
                             <div class="field">
                                <label for="name_en">Upload Thumbnail <span>*</span></label>
                                <InputText id="product_name" placeholder="New Products" type="text" class="py-3"/>
                            </div>  
                        </div>
 
                    </div> 
                </div>
           </div>
        </div>
   </div>
</template>

<!-- Script  -->
<script>
    export default {
        data() {
            return {
                active: 2,
                productTypeEng: '',
                valueEditorPro: '',
                unitPriceEng: '',
                productItemTab:[
                    {
                        label: 'English(EN)',
                        icon: 'pi pi-language',
                        to: '/vendor/products-tabs/eng-tab'
                    },
                    {
                        label: 'Khmer(KH)',
                        icon: 'pi pi-language',
                        to: '/'
                    },
                ]
            }
        }
    }
</script>