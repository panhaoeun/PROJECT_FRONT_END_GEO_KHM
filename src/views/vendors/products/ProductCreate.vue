<template>
   <div class="layout-content">
        <div class="card card px-6 py-6">
           <span class="block text-900 font-bold text-xl mb-4">Create Product</span>
           <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <div class="col-12 lg:col-12">
                    <TabMenu :model="productItemTab" v-model:activeIndex="active" />
                    <!-- Form Layouts -->
                    <div class="col-12 field">
                        <!-- Name Product -->
                        <div class="field">
                            <label for="name1">Name</label>
                            <InputText id="name1" type="text" />
                        </div>
                                   <!-- Descriptions -->
                        <div class="field">
                            <label for="nprid">Description (EN)</label>
                            <Editor v-model="value1" editorStyle="height: 320px"/>
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