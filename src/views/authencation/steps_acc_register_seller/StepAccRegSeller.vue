<template>
    <!-- Header -->
    <Header/>
    <!--Contents -->
    <div class="bg-white">
      <div class="container bg-white" align-center>
            <div class="px-2 py-2 ">
              <!-- Form Submit on Stepper Accounts -->
              <!--========Form==============-->
                <div class="row">
                    <div class="col-12">
                        <!--Form Kit Multiple Action Step-->
                        <FormKit
                            type="form"
                            #default="{ value, state: { valid } }"
                            :plugins="[stepPlugin]"
                            @submit="submitApp"
                            :actions="false"
                            style="max-width:500rem; min-width: 40rem; width: auto;"
                            :allow-incomplete="false"
                        >
                        <ul class="steps">
                            <li
                            v-for="(step, stepName, index) in steps"
                            :class="['step', { 'has-errors': checkStepValidity(stepName) }]"
                            @click="activeStep = stepName"
                            :data-step-valid="step.valid && step.errorCount === 0"
                            :data-step-active="activeStep === stepName"
                            :key="index"
                            >
                            <span
                                v-if="checkStepValidity(stepName)"
                                class="step--errors"
                                v-text="step.errorCount + step.blockingCount"
                            />
                                {{ camel2title(stepName) }}
                            </li>
                        </ul>

                        <!-- .form-body solely for styling -->
                        <div class="form-body">
                            <!--===========Business information's========-->
                            <section v-show="activeStep === 'businessInformation'">
                                <FormKit
                                    type="group"
                                    id="businessInformation"
                                    name="businessInformation"
                                >       
                                    <FormKit

                                        type="select"
                                        label="Business Type"
                                        name="businessType"
                                        placeholder="Select Business Type"
                                        :options="[
                                           {label: 'Business' , value: '0'},
                                           {label: 'None, I am an individual', value: '1'}
                                        ]"

                                        validation="required"
                                    />
                                    <!--===========Check Show/Hide Input==============-->
                                    <div v-if="value.businessInformation && value.businessInformation != ''">
                                        <!-- Business Account  -->
                                        <div v-if="value.businessInformation.businessType === '0'">
                                            <FormKit
                                                type="text"
                                                label="*Business Name"
                                                name="busNameIdx0"
                                                placeholder="Business name as it appears on business registrations document"
                                                validation="required"
                                            />     
                                            <FormKit
                                                type="text"
                                                label="*Company registration number"
                                                name="busNameIdx1"
                                                placeholder="Company registration number"
                                                validation="required"
                                            />   
                                        </div>
                                        <!-- Individual Account  -->
                                        <div v-if="value.businessInformation.businessType === '1'">
                                            <FormKit
                                                type="text"
                                                label="*OwnerName"
                                                name="ownerNameIdxIndividual"
                                                placeholder="Owner Name"
                                                validation="required"
                                            />     
                                        </div>
                                    </div>
                                    <div v-else>
                                        Ops...Error this points .
                                    </div>

                                    <!-- Address -->
                                    <p>Register business address</p>  
                                    <FormKit
                                        type="text"
                                        name="addrLine02"
                                        placeholder="Address Line 01"
                                        validation="required"
                                    />   
                                    <FormKit
                                        type="text"
                                        name="addrLine02"
                                        placeholder="Address Line 02"
                                        validation="required"
                                    />   

                                    <div class="double">   
                                        <FormKit
                                            type="text"
                                            name="addrCity"
                                            placeholder="City/Town"
                                            validation="required"
                                        />      
                                        <FormKit
                                            type="text"
                                            name="addrRegion"
                                            placeholder="State/Region/Province"
                                            validation="required"
                                        />    
                                        <FormKit
                                            type="text"
                                            name="addressRegion"
                                            placeholder="Zip/Postal Code"
                                            validation="required"
                                        />        
                                    </div>  
                                    <FormKit
                                        type="text"
                                        label="If vou sell your product online. enter your website URL (optional)"
                                        name="addrLine02"
                                        placeholder="www.phzarkhmer.com/khonlineshop"
                                    />   
                                    <FormKit
                                        type="text"
                                        label="Mobile Number"
                                        name="mobileNumber"
                                        placeholder="Mobile Number"
                                        validation="required"
                                    />   
                                    <FormKit
                                        type="text"
                                        label="Email"
                                        name="busInformEmail"
                                        placeholder="Email Address"
                                        validation="required"
                                    />   
                                </FormKit>
                            </section>
                            <!--===========Store information's========-->
                            <section v-show="activeStep === 'storeInformation'">
                                <FormKit
                                    id="storeInformation"
                                    type="group"
                                    name="storeInformation"
                                >
                                    <FormKit
                                        type="text"
                                        label="Store Name*"
                                        name="storeName"
                                        placeholder="Store Name"
                                        validation="required"
                                    /> 
                                    <FormKit
                                        type="radio"
                                        label="Product Category"
                                        help="Shoppers will find this item in all of these categories:"
                                        validation="required"
                                        :options="[
                                            { label: 'Household Products', value: 'house-product' },
                                            { label: 'Fashion and Accessories', value: 'fashion-accessories' },
                                            { label: 'Electronics', value: 'electronic' },
                                            { label: 'Baby and Kids` Products', value: 'baby-kid-product' },
                                            {label: 'Office and School Supplies', value: 'office-school-supplies'},
                                            { label: 'Other', value: 'Other' },
                                        ]"
                                    />   
                                </FormKit>
                                <!-- Address -->
                                <p>Register Store address</p>  
                                <FormKit
                                        type="text"
                                        name="storeAddrLine01"
                                        placeholder="Address Line 01"
                                        validation="required"
                                    />   
                                <FormKit
                                        type="text"
                                        name="storeAddrLine02"
                                        placeholder="Address Line 02"
                                        validation="required"
                                    />   
                                <FormKit
                                    type="text"
                                    name="storeAddrCity"
                                    placeholder="City/Town"
                                    validation="required"
                                />   
                                <FormKit
                                    type="text"
                                    name="storeAddrState"
                                    placeholder="State/Region/Province"
                                    validation="required"
                                />   
                                <FormKit
                                    type="text"
                                    name="storeAddrZipCode"
                                    placeholder="Zip/Postal Code"
                                    validation="required"
                                />   
                            </section>
                            <!--===========Verification information's========-->
                            <section v-show="activeStep === 'verificationInformation'">
                                <FormKit
                                    id="verificationInformation"
                                    type="group"
                                    name="verificationInformation"
                                >
                                    <FormKit
                                            type="text"
                                            label="National ID/Passport/License No *"
                                            name="passportIDNo"
                                            placeholder="National ID/Passport/License No"
                                            validation="required"
                                        />   
                                        <!-- Business Account  -->
                                        <div v-if="value.businessInformation && value.businessInformation != ''">
                                            <div v-if="value.businessInformation.businessType === '0'">
                                                <FormKit
                                                    type="select"
                                                    label="Choose your ID"
                                                    name="small_country"
                                                    placeholder="Choose your ID "
                                                    :options="[
                                                        'Business License'
                                                    ]"
                                                    validation="required"
                                                /> 
                                                <FormKit
                                                    type="file"
                                                    label="Certificate Photo upload"
                                                    name="license"
                                                    multiple="true"
                                                    help="Please upload business license"
                                                    accept=".jpg,.png,.pdf"
                                                    validation="required"
                                                />
                                                <!-- Simple Document  -->
                                                <div class="float-">
                                                    <span class="font-bold text-lg">Simple Document</span>
                                                    <!--Simple Document for Uploads-->
                                                    <div class="demo-image__placeholder">
                                                        <div class="block">
                                                            <!--Preview Business Documents -->
                                                            <div class="demo-image__preview">
                                                                <el-image 
                                                                    src="https://www.prasac.com.kh/wp-content/uploads/2020/05/Certificate-of-incorporation-update.png"  
                                                                    style="width: 60%;height: 60%;"
                                                                    :zoom-rate="1.2"
                                                                    :preview-src-list="srcListDocumentPreview"
                                                                    :initial-index="4"
                                                                    fit="cover"
                                                                />
                                                            </div>   
                                                        </div>
                                                        </div>
                                                </div>
                                            </div>
                                            <!-- Individual Account  -->
                                            <div v-if="value.businessInformation.businessType === '1'">
                                                    <FormKit
                                                        type="select"
                                                        label="Choose your ID"
                                                        name="small_country"
                                                        placeholder="Choose your ID "
                                                        :options="[
                                                            'Passport',
                                                            'National ID',
                                                            'Driver License'
                                                        ]"
                                                        validation="required"
                                                        /> 
                                                    <FormKit
                                                        type="file"
                                                        label="Certificate Photo upload"
                                                        name="license"
                                                        multiple="true"
                                                        help="Please upload your id"
                                                        accept=".jpg,.png,.pdf"
                                                        validation="required"
                                                    />
                                                    <!--===============Simple Document==============-->
                                                    <DocumentExample/>
                                            </div>
                                        </div>       
                                </FormKit>
                            </section>

                            <!-- NEW: Adds Next / Previous navigation buttons. -->
                            <div class="step-nav">
                                <FormKit type="button" :disabled="activeStep == 'businessInformation'" @click="setStep(-1)" v-text="'Previous step'" />
                                <FormKit type="button" class="next" :disabled="activeStep == 'verificationInformation'" @click="setStep(1)" v-text="'Next step'"/>
                            </div>

                            <details>
                                <summary>Form data</summary>
                                <pre>{{ value }}</pre>
                            </details>
                        </div>

                        <!-- NEW: Adds submit button. -->
                        <FormKit type="submit" label="Submit Application" :disabled="!valid" />
                        </FormKit>
                    </div>
                </div>
              <!--========Form==============-->
            </div>
        </div>
    </div>
  
</template> 

<!-- Import Files -->
<script setup>
    import {  axios, camel2title } from '../../../utils/utils.js'
    import useSteps  from '../../../utils/useSteps';
    import Header from '../../customers/header_of_subpage/HeaderSubPage.vue';
    import DocumentExample from "../../authencation/steps_acc_register_seller/stepper_acc/document_example/DocumentExaple.vue"
    //Document Previews
    const srcListDocumentPreview = ["https://www.prasac.com.kh/wp-content/uploads/2020/05/Certificate-of-incorporation-update.png"];
    //Acc Steps
    const { steps, visitedSteps, activeStep, setStep, stepPlugin } = useSteps()
    // NEW: submit handler, which posts to our fake backend.
    const submitApp = async (formData, node) => {
        try {
            const res = await axios.post(formData)
            console.log(res)
            node.clearErrors()
            alert('Your application was submitted successfully!')
        } catch (err) {
            node.setErrors(err.formErrors, err.fieldErrors)
        }
    }
    //Check Step
    const checkStepValidity = (stepName) => {
        return (steps[stepName].errorCount > 0 || steps[stepName].blockingCount > 0) && visitedSteps.value.includes(stepName)
    }
</script>
<!-- Styles -->
<style>
    /* Styles imported for brevity */
    /* CSS for multi-step forms is not included in the default Genesis theme.
    styles were custom-written for this example and you will need to provide
    your own. */
   @import "https://cdn.formk.it/web-assets/multistep-form.css";
    .demo-image__placeholder .block {
        display: inline-block;
        width: 60%;
        box-sizing: border-box;
        vertical-align: top;
    }

    .demo-image__placeholder .demonstration {
        display: block;
        color: var(--el-text-color-secondary);
        font-size: 14px;
        margin-bottom: 10px;
    }
    .demo-image__placeholder.image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--el-fill-color-light);
        color: var(--el-text-color-secondary);
        font-size: 14px;
    }

    .demo-image__placeholder .dot {
        animation: dot 2s infinite steps(3, start);
        overflow: hidden;
    }
    .demo-image__error .image-slot {
        font-size: 30px;
    }
    .demo-image__error .image-slot .el-icon {
        font-size: 30px;
    }
    .demo-image__error .el-image {
         width: 100%;
         height: 100%;
    }
    .demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}

</style>

