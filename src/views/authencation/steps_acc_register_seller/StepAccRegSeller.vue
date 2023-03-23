<template>
    <!-- Header -->
    <Header/>
    <!--Contents -->
    <div class="bg-white">
      <el-button style="margin-top: 12px" @click="next">Next step</el-button>
      <div class="container bg-white" align-center>
            <div class="px-2 py-2 ">
                <div v-for="(step, id, i) in stepperAccReg.steps.value" :key="id" class="">
                    {{ step }} -{{ id}}- {{ i }}
                </div>
                <!-- Step Progress Register Acc -->
                <el-steps :active="stepperAccReg.index.value" align-center status="success">
                    <el-step v-for="(step, id) in stepperAccReg.steps.value" :key="id"  :title="step.title"/>
                </el-steps>
              <!-- Form Submit on Stepper Accounts -->
              <!--========Form==============-->
                <div class="row">
                    <div class="col-lg-12 mx-auto">
                      <div class="flex justify-content-center p-fluid px-4 py-4">
                        <form  @submit.prevent="SubmitStepAccSell()" class="p-fluid" style="width: 1200px;">
                            <div class="w-full px-4 py-2 rounded border border-main space-y-2 overflow-auto h-full">
                                <!--==============Business Information============-->
                                <div v-if="stepperAccReg.isCurrent('business-information')">
                                    <div class="flex flex-column gap-2 mb-3">
                                         <label for="business">Business name</label>
                                         <InputText id="username" v-model="stepperAcc.businessName" aria-describedby="username-help" placeholder="Business Name"/>
                                     </div>
                                </div>
                                <!--==============Business Information============-->
                                <div v-if="stepperAccReg.isCurrent('seller-information')">
                                    <div class="flex flex-column gap-2 mb-3">
                                            <label for="username">Zip/Postal Code</label>
                                        <InputText id="username" v-model="stepperAcc.ownerName" aria-describedby="username-help" placeholder="Zip/Postal Code"/>
                                    </div>
                                </div>
                                <!--==========Button Actions=====-->
                               <div>
                                    <MazBtn 
                                        v-if="!stepperAccReg.isLast.value"
                                        :disabled="!stepperAccReg.current.value.isValid"
                                        style="width: 300px;">
                                        Next
                                    </MazBtn>
                                    <MazBtn 
                                        v-if="stepperAccReg.isLast.value"
                                        :disabled="!stepperAccReg.current.value.isValid"
                                        style="width: 300px;">
                                         Submit
                                    </MazBtn>
                               </div>
                            </div>
                        </form>
                     </div>



    <div class="flex flex-col gap-4 mt-12">
          <div class="w-full px-4 py-2 rounded border border-main space-y-2 overflow-auto h-full">
            <span class="font-bold">Form</span>
            <pre v-text="stepperAcc" />
          </div>

          <div class="w-full px-4 py-2 rounded border border-main space-y-2 overflow-auto h-full">
            <span class="font-bold">Wizard</span>
            <pre v-text="stepperAccReg" />
          </div>
        </div>






                </div>
            </div>
              <!--========Form==============-->

            </div>
        </div>
    </div>
  
</template> 

<!-- Import Files -->
<script>
    import { useStepper } from '@vueuse/core';
    import Header from '../../customers/header_of_subpage/HeaderSubPage.vue';
    export default {
        data: function() {
            return {
                currentStep: 0,
                stepperAcc: {
                    ownerName: '',
                    businessName: '',
                }
            }
        },
        setup() {
            const stepperAccReg = useStepper({
                  'business-information':{
                        title: 'Business Information',
                        isValid:() => this.stepperAcc.businessName,
                  },
                'seller-information': {
                    title: 'Seller Information',
                    isValid:() => this.stepperAcc.ownerName?.trim() !== '',
                }
            });
            return {stepperAccReg};
        },
        components: {
            Header,
        },
        methods: {
            async SubmitStepAccSell(){ 
                if(this.stepperAccReg.current.value.isValid){
                     this.stepperAccReg.goToNext();
                }
                console.log("asdas")
                
            },
            async allStepsBeforeAreValid(index){
                return !Array(index)
                        .fill(null).some((_, i) => !this.stepperAccReg.at(i)?.isValid);
            },
            next(){
                if(this.currentStep ++ > 2) this.currentStep = 0;
            }
        },
        mounted() {
            // console.log(this.stepperAccReg.current)
        },
    }
</script>