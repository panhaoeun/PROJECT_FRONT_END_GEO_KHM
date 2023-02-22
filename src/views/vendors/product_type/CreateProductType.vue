<template>
    <div class="layout-content">
            <!--Create Products-->
            <div class="card card px-6 py-6">
                  <!-- Tabs -->
                  <div class="tabs">
                      <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">Khmer(KH)</a>
                      <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]">English(EN)</a>
                  </div>
  
                  <div class="content">
                      <!-- Khmer -->
                      <div v-if="activetab === 1" class="tabcontent">
                          <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                              <div class="col-12 lg:col-12">
                                  <!-- Form Layouts -->
                                  <div class="grid formgrid">
                                      <div class="col-12 field">
                                          <!-- Name Category -->
                                          <div class="field">
                                              <label for="name_en">Category Name <span class="p-error">*</span> (KH)</label>
                                              <InputText id="product_name" placeholder="New Category" type="text" class="py-3"/>
                                          </div>
                                        <!-- Name Category -->
                                        <div class="field">
                                              <label for="name_en">Description <span class="p-error">*</span> (KH)</label>
                                              <InputText id="product_name" placeholder="New Category" type="text" class="py-3"/>
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
                                              <label for="name_en">Category Name <span class="p-error">*</span> (Eng)</label>
                                              <InputText id="product_name" placeholder="New Category" type="text" class="py-3"/>
                                          </div>
                                       
                                      </div>
                                  </div> 
                              </div>
                          </div>
                      </div>
  
                      <!-- Button Submit -->
                      <div class="flex justify-content-between gap-3 float-right">
                          <div class="px-2 py-2">
                              <Button label="Submit" icon="pi pi-save" class="p-button-lg"></Button>
                          </div>
                      </div>
                  </div>
            </div>
      </div>
  </template>
  
  <script>
  
      export default {
          data(){
              return{
                  activetab: 1
              }
          }
      }
  </script>
  