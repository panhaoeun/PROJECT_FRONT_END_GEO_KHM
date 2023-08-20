<template>
    <!-- Header -->
    <Header/>
    <!--Contents -->
    <div class="conatiner-fluid content-inner py-4 px-4">
        <b-row>
            <b-col sm="12">
                <b-card no-body class="card">
                    <b-card-header class="d-flex justify-content-between">
                    <div class="header-title">
                        <b-card-title>
                            <h3>Apply to Seller</h3>
                        </b-card-title>
                    </div>
                    </b-card-header>
                    <b-card-body color="#d41c21">
                        <!-- Form Submit Apply Vendors -->
                        <Form
                            keep-values
                            :validation-schema="currentSchemaRegisterSellAcc"
                            @submit="nextStepRegisterSellAcc"
                        >
                            <form-wizard>
                                <!-- Business information's -->
                                <tab-content title="Seller Information" icon="fa fa-user">
                                    <fieldset>
                                        <div class="form-card text-start">
                                        <b-row>
                                            <div class="col-7">
                                                <h5 class="mb-4">Seller Information:</h5>
                                            </div>
                                        </b-row>
                                        <b-row>
                                                <b-col md="6">
                                                    <b-form-group label="Seller Type: *">
                                                            <MazSelect
                                                                v-model="selectBusinessType"
                                                                label="Select Seller Type"
                                                                name="businessType"
                                                                type="text"
                                                                search
                                                                :options="[
                                                                    {label: 'Business' , value: 'business-type'},
                                                                    {label: 'None, I am an individual', value: 'individual-type'}
                                                                ]"
                                                                validation="required"
                                                            />
                                                    </b-form-group>
                                                </b-col>
                                                <!--===========Check Show/Hide Input==============-->
                                                <!-- Business Account -->
                                                <b-col md="6" v-if="selectBusinessType === 'business-type'">
                                                    <b-form-group label="Business Name: *">
                                                        <MazInput
                                                            v-model="busNameIdxRegisterName"
                                                            label="Business Name"
                                                            name="busNameIdxRegisterName"
                                                        />
                                                        <ErrorMessage class="p-error" name="busNameIdxRegisterName" />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="6" v-if="selectBusinessType === 'business-type'">
                                                    <b-form-group label="Company Register number: *">
                                                        <MazInput
                                                            v-model="busNameIdxRegisterNum"
                                                            label="Company register number"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <!-- Individual Account -->
                                                <b-col md="6" v-if="selectBusinessType === 'individual-type'">
                                                    <b-form-group label="Owner Name: *">
                                                        <MazInput
                                                            v-model="ownerNameIdxIndividual"
                                                            label="Owner Name"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="6">
                                                    <b-form-group label="Phone Number: *">
                                                        <!-- Phone number of seller info -->
                                                        <MazPhoneNumberInput
                                                            defaultCountryCode="KH"
                                                            type="number"
                                                            v-model="mobilePhoneNumber"
                                                            :translations="{
                                                                countrySelector: {
                                                                    placeholder: 'Country code',
                                                                    error: 'Choose country',
                                                                },
                                                                phoneInput: {
                                                                    placeholder: 'Phone number',
                                                                    example: 'Example:',
                                                                },
                                                                }"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="6">
                                                    <b-form-group label="Email Address: *">
                                                        <MazInput
                                                            v-model="emailAddr"
                                                            label="Email Address"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <!--===========Check Show/Hide Input==============-->
                                                <!--====Upload Shop Logo======-->
                                                <b-col md="12">
                                                    <b-form-group label="Profile Image: *">
                                                        <el-upload action="#" 
                                                                list-type="picture-card" 
                                                                :on-preview="handlePictureCardPreview"
                                                                :on-remove="handleRemove" 
                                                                :auto-upload="false" 
                                                                :on-change="handleChange" 
                                                                :class="objClassSeller"
                                                                :file-list="fileList" 
                                                                v-model="file"
                                                                ref="file"
                                                                :limit="1">
                                                            <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                        </el-upload>
                                                    </b-form-group>
                                                </b-col>
                                        </b-row>
                                        </div>
                                    </fieldset>
                                </tab-content>
                                <!-- Business information's -->
                                <tab-content title="Shop Information">
                                    <fieldset>
                                        <div class="form-card text-start">
                                            <b-row>
                                                <div class="col-7">
                                                    <h5 class="mb-4">Shop Information:</h5>
                                                </div>
                                            </b-row>
                                            <b-row>
                                                <b-col md="6">
                                                    <b-form-group label="Address Line 01">
                                                        <MazInput
                                                            type="text"
                                                            v-model="addressLine01"
                                                            label="Address Line 01"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="6">
                                                    <b-form-group label="Address Line 02">
                                                        <MazInput
                                                            type="text"
                                                            v-model="addressLine02"
                                                            label="Address Line 02"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="6">
                                                    <b-form-group label="City/Town">
                                                        <MazInput
                                                            type="text"
                                                            v-model="addressCityTown"
                                                            label="City/Town"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="6">
                                                    <b-form-group label="Region/Province">
                                                        <MazInput
                                                            type="text"
                                                            v-model="addressStateOrProvince"
                                                            label="Region/Province"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="6">
                                                    <b-form-group label="Zip/Postal Code">
                                                        <MazInput
                                                            type="text"
                                                            v-model="addZipOrPostalCode"
                                                            label="Zip/Postal Code"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="6">
                                                    <b-form-group label="If vou sell your product online. enter your website URL (optional)">
                                                        <MazInput
                                                            type="text"
                                                            v-model="urlShopWebSite"
                                                            label="www.7day.com.kh/7dayshop"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <!-- Shop Banner & Logo -->
                                                <b-col md="12">
                                                    <b-form-group label="Shop Logo: *">
                                                        <el-upload action="#" 
                                                                list-type="picture-card" 
                                                                :on-preview="handlePictureCardPreview"
                                                                :on-remove="handleRemove" 
                                                                :auto-upload="false" 
                                                                :on-change="handleChange" 
                                                                :class="objClassSeller"
                                                                :file-list="fileList" 
                                                                v-model="file"
                                                                ref="file"
                                                                :limit="1">
                                                            <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                        </el-upload>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="12">
                                                    <b-form-group label="Shop Banner: *">
                                                        <el-upload action="#" 
                                                                list-type="picture-card" 
                                                                :on-preview="handlePictureCardPreview"
                                                                :on-remove="handleRemove" 
                                                                :auto-upload="false" 
                                                                :on-change="handleChange" 
                                                                :class="objClassSeller"
                                                                :file-list="fileList" 
                                                                v-model="file"
                                                                ref="file"
                                                                :limit="1">
                                                            <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                        </el-upload>
                                                    </b-form-group>
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </fieldset>
                                </tab-content>
                                <!-- Store Information's -->
                                <tab-content title="Verification Information">
                                    <fieldset>
                                            <div class="form-card text-start">
                                                <b-row>
                                                    <div class="col-7">
                                                        <h5 class="mb-4">Store Information:</h5>
                                                    </div>
                                                </b-row>
                                                <b-row>
                                                <b-col md="6">
                                                    <!-- Store Name -->
                                                    <b-form-group label="Shop Name">
                                                        <MazInput
                                                            type="text"
                                                            v-model="storeNameInfo"
                                                            label="Store Name"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <!-- Product Categories -->
                                                <b-col md="12">
                                                   <b-form-group label="Product Categories">
                                                        <!--====@=>Product Categories====-->
                                                        <MazRadioButtons
                                                            v-model="selectedCompetitionProCategories"
                                                            :options="competitions"
                                                        >
                                                            <template #default="{ option, selected }">
                                                                <div style="display: flex;">
                                                                <MazAvatar
                                                                    v-if="option.areaEnsignUrl"
                                                                    :src="option.areaEnsignUrl"
                                                                    style="margin-right: 16px;"
                                                                    size="0.8rem"
                                                                />
                                                                <div style="display: flex; flex-direction: column;">
                                                                    <span>
                                                                    {{ option.label }}
                                                                    </span>
                                                                    <span :class="{ 'maz-text-muted': !selected }">
                                                                        {{ option.areaName }}
                                                                    </span>
                                                                </div>
                                                                </div>
                                                            </template>
                                                        </MazRadioButtons>
                                                   </b-form-group>
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </fieldset>
                                </tab-content>
                                <!-- Verify Information's -->
                                <tab-content title="Verification Information">
                                    <fieldset>
                                            <div class="form-card text-start">
                                                <b-row>
                                                    <div class="col-7">
                                                        <h5 class="mb-4">Verify Information:</h5>
                                                    </div>
                                                </b-row>
                                                <b-row>
                                                <!--Business ID License No-->
                                                <b-col md="6">
                                                    <b-form-group label="National ID/Passport/License No *">
                                                        <MazInput
                                                            type="text"
                                                            v-model="verifyDocumentID"
                                                            label="National ID/Passport/License No *"
                                                        />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="6" v-if="selectBusinessType === 'business-type'">
                                                    <b-form-group label="Choose Your ID: *">
                                                            <MazSelect
                                                                v-model="selectYourIDBusinessID"
                                                                label="Select Your ID"
                                                                name="businessYourID"
                                                                type="text"
                                                                search
                                                                :options="[
                                                                    {label: 'Business License' , value: 'business-license'}
                                                                ]"
                                                                validation="required"
                                                            />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="6" v-if="selectBusinessType === 'business-type'">
                                                    <b-form-group label="Certificate Photo Upload: *">
                                                        <el-upload action="#" 
                                                                list-type="picture-card" 
                                                                :on-preview="handlePictureCardPreview"
                                                                :on-remove="handleRemove" 
                                                                :auto-upload="false" 
                                                                :on-change="handleChange" 
                                                                :class="objClassSeller"
                                                                :file-list="fileList" 
                                                                v-model="file"
                                                                ref="file"
                                                                :limit="1">
                                                            <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                        </el-upload>
                                                    </b-form-group>
                                                </b-col>
                                                <!--=== Passport or Nation ID Upload======-->
                                                <b-col md="6" v-if="selectBusinessType === 'individual-type'">
                                                    <b-form-group label="Choose Your ID: *" >
                                                            <MazSelect
                                                                v-model="selectYourIDBusinessID"
                                                                label="Select Your ID"
                                                                name="businessYourIndividualType"
                                                                type="text"
                                                                search
                                                                :options="[
                                                                    {label: 'Passport' , value: 'passport-license'},
                                                                    {label: 'National ID' , value: 'national-license'},
                                                                    {label: 'Driver License' , value: 'driver-license'}
                                                                ]"
                                                                validation="required"
                                                            />
                                                    </b-form-group>
                                                </b-col>
                                                <b-col md="12" v-if="selectBusinessType === 'individual-type'">
                                                    <b-form-group label="Document Upload: *" >
                                                        <el-upload action="#" 
                                                                list-type="picture-card" 
                                                                :on-preview="handlePictureCardPreview"
                                                                :on-remove="handleRemove" 
                                                                :auto-upload="false" 
                                                                :on-change="handleChange" 
                                                                :class="objClassSeller"
                                                                :file-list="fileList" 
                                                                v-model="file"
                                                                ref="file"
                                                                :limit="1">
                                                            <i class="pi pi-cloud-upload" style="font-size: 2rem"></i>
                                                        </el-upload>
                                                    </b-form-group>
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </fieldset>
                                </tab-content>
                                <!-- Button Submit Apply to Seller --> 
                            </form-wizard>
                        </Form>
                        <!-- Form Submit Apply Vendors -->
                     
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>

</template> 

<!-- Import Files -->
<script>
    import Header from '../../customers/header_of_subpage/HeaderSubPage.vue';
    import MazSelect from 'maz-ui/components/MazSelect';
    import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
    import MazRadioButtons from 'maz-ui/components/MazRadioButtons';
    import { FormWizard, TabContent } from "vue3-form-wizard";
    import MazAvatar from 'maz-ui/components/MazAvatar'
    import { Form,ErrorMessage } from "vee-validate";
    import * as yup from "yup";
    export default {
        data(){
            return{
                formWizard: FormWizard,
                objClassSeller: {
                    upLoadShowSellerRegister: true,
                    upLoadHideSellerRegister: false,
                },
                competitions: [
                    {
                        value: "1",
                        label: "Ligue 1",
                        areaName: "France",
                        areaEnsignUrl: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
                    },
                    {
                        value: "2",
                        label: "Premier League",
                        areaName: "England",
                        areaEnsignUrl: "https://crests.football-data.org/770.svg",
                    },
                ],
                selectedCompetitionProCategories: '',
                selectBusinessType: 'business-type',
                currentStep: 0,
                stepLength: 3,
                busNameIdxRegisterName: '',
                busNameIdxRegisterNum: '',
                ownerNameIdxIndividual: '',
                storeNameInfo: '',
                addressLine01: '',
                addressLine02: '',
                addressCityTown: '',
                addressStateOrProvince: '',
                addZipOrPostalCode: '',
                urlShopWebSite: '',
                mobilePhoneNumber:'',
                emailAddr: '',
                verifyDocumentID: '',
                selectYourIDBusinessID: '',
                businessYourIndividualType: null,
                // Each step should have its own validation schema
                schemas: [
                    yup.object({
                        busNameIdxRegisterName: yup.string().required("Please Enter your business name"),
                        email: yup.string().required().email(),
                    }),
                ],
            }
        },
        computed:{
            currentSchemaRegisterSellAcc () {
               return this.schemas[this.currentStep];
            }
        },
        components: {
            MazRadioButtons,
            ErrorMessage,
            MazAvatar,
            Form,
            MazSelect,
            MazPhoneNumberInput,
            Header,
            FormWizard,
            TabContent,
        },
        method:{
            nextStepRegisterSellAcc(values){
                console.log(values)
                if (this.currentStep === this.stepLength) {
                    console.log("Done: ", JSON.stringify(values, null, 2));
                    alert("Submit Success");
                    return;
                }
                this.currentStep++;
                // next step function to move to the next step
                // this.formWizard?.nextTab();
            },
            prevStepRegisterSell(){
                if (this.currentStep <= 0) {
                    return;
                }
                this.currentStep--;
                // previous step function to move to the previous step
                this.formWizard?.prevTab();
            },
            onCompleteSubmitRegApplyAccSell(){
                console.log()
            }
        }
    }
<<<<<<< HEAD
    //Check Step
    const checkStepValidity = (stepName) => {
        return (steps[stepName].errorCount > 0 || steps[stepName].blockingCount > 0) && visitedSteps.value.includes(stepName)
    }
=======
>>>>>>> main
</script>


<!-- Style -->
<style>
/*当upLoadShowSellerRegister为true时，启用如下样式，即上传框的样式，若为false则不启用该样式*/
.upLoadShowSellerRegister .el-upload {
    width: 15rem !important;
    height: 15rem !important;
    line-height: 15rem !important;
}

    /*当upLoadHideSellerRegister为true时，启用如下样式，即缩略图的样式，若为false则不启用该样式*/
.upLoadHideSellerRegister .el-upload-list--picture-card .el-upload-list__item {
    width: 15rem !important;
    height: 15rem !important;
    line-height: 15rem !important;
}
    /*当upLoadHideSellerRegister为true时，启用如下样式，即上传框的样式，若为false则不启用该样式*/
.upLoadHideSellerRegister .el-upload {
    display: none;
}
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}

</style>