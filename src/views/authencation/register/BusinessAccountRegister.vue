<template>
    <!-- Loading -->
    <loading 
        v-model:active="isLoadingBusiness"
        :can-cancel="true"
        color='#000000'
        backgroundColor='#ffffff'
     />
    <form @submit.prevent="handleSubmitBusinessAcc(!v$.$invalid)" class="p-fluid" method="POST" enctype="multipart/form-data"  role="form">    
            <div>
                <div class="p-fluid grid">
                    <!-- Username -->
                    <div class="col-6 md:col-6">
                       <div class="p-float-label">
                            <InputText id="user_firstname" type="text" v-model="v$.user_firstname.$model" :class="{'p-invalid p-inputtext-lg':v$.user_firstname.$invalid && submitted}"  style="height: 50px;"/>
                            <label for="first_name" :class="{'p-error font-light':v$.user_firstname.$invalid && submitted}" style="font-size: 14px;">First name <span class="p-error">*</span> </label>
                       </div>
                       <small v-if="(v$.user_firstname.$invalid && submitted) || v$.user_firstname.$pending.$response" class="p-error">{{v$.user_firstname.required.$message.replace('Value', 'First name')}}</small>
                    </div>
                    <!-- Last name -->
                    <div class="col-6 md:col-6">
                        <div class="p-float-label">
                            <InputText id="user_lastname" type="text" v-model="v$.user_lastname.$model" :class="{'p-invalid p-inputtext-lg':v$.user_lastname.$invalid && submitted}"  style="height: 50px;"/>
                            <label for="last_name" :class="{'p-error font-light':v$.user_lastname.$invalid && submitted}" style="font-size: 14px;">Last name <span class="p-error">*</span> </label>
                       </div>
                       <small v-if="(v$.user_lastname.$invalid && submitted) || v$.user_lastname.$pending.$response" class="p-error">{{v$.user_lastname.required.$message.replace('Value', 'Last name')}}</small>
                    </div>
                    <!-- Phone number registers -->
                    <div class="col-12 md:col-12">
                        <div class="p-float-label">
                            <!-- Phone Number Input -->
                            <MazPhoneNumberInput
                                id="user_phonenumber" 
                                v-model="v$.user_phonenumber.$model" 
                                :error="v$.user_phonenumber.$invalid && submitted" 
                                color="info"
                                defaultCountryCode="KH"
                                size="lg"
                                :no-example="true"
                                type="number"
                                :valid-button-loading="true"	
                                @update="results = $event"
                                :success="results?.isValid"
                                v-on:keypress="inputNumOnly"
                            />
                            
                            <div>
                                <code>
                                    <!-- {{ results }} -->
                                </code>
                            </div>
                       </div>
                       <small v-if="(v$.user_phonenumber.$invalid && submitted) || v$.user_phonenumber.$pending.$response" class="p-error">{{v$.user_phonenumber.required.$message.replace('Value', 'Phone Number')}}</small>
                    </div>
                    
                     <!-- Business Emails -->
                     <div class="col-12 md:col-12">
                        <div class="p-float-label">
                            <InputText id="email_business" type="email" class="p-inputtext-lg"  style="height: 50px;" />
                            <label for="email" style="font-size: 14px;">Business Email</label>
                       </div>
                    </div>
                    <!-- Password -->
                    <div class="col-12 md:col-12">
                        <div class="p-float-label">
                            <Password id="password" v-model="v$.user_password.$model" :class="{'p-invalid':v$.user_password.$invalid && submitted}" toggleMask  style="height: 50px;">
                                <template #header>
                                    <h6>Pick a password</h6>
                                </template>
                                <template #footer="sp">
                                    {{sp.level}}
                                    <Divider />
                                    <p class="mt-2">Suggestions</p>
                                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                        <li>At least one lowercase</li>
                                        <li>At least one uppercase</li>
                                        <li>At least one numeric</li>
                                        <li>Minimum 8 characters</li>
                                    </ul>
                                </template>
                            </Password>
                            <label for="user_password" :class="{'p-error':v$.user_password.$invalid && submitted}" style="font-size: 14px;">Password <span class="p-error">*</span> </label>
                        </div>
                        <small v-if="(v$.user_password.$invalid && submitted) || v$.user_password.$pending.$response" class="p-error">{{v$.user_password.required.$message.replace('Value', 'Password')}}</small>
                    </div>
                  
                 <!-- Check while create account -->
                    <div class="field-checkbox px-3">
                        <Checkbox v-model="checked" :binary="true" />
                        <label for="accept" class="" style="line-height: 17px; margin-bottom: -25px; font-size: 12px;">
                            While creating a website account: I agree to abide by the PhzarKhmer Membership Agreement- Willing to receive emails from PhzarKhmer.com members and services
                        </label>
                    </div>
                    <!-- Privacy and conditions -->
                     <!-- Label Privacy -->
                     <div class="px-4 py-4">
                        <p  style="font-size:12px; color: #767676; line-height: 1.5; padding: 8px 0;">
                            By
                            <b>Creating an account</b>,
                            , you agree to our 
                            <router-link to="/">
                                <span> User Agreement </span>
                            </router-link>
                            and acknowledge reading our 
                            <router-link to="/">
                                <span> User Privacy Notice </span>
                            </router-link>
                            .
                        </p>
                    </div>
                </div>

                <!-- Messages MazDialog -->
                <Message v-for="msg of messages" :severity="msg.severity" :life="5000" :sticky="false" :key="msg.content">{{msg.content}}</Message>
                    
            </div>
            <!-- Create business account button -->
            <div class="flex justify-content-center">
                <Button type="submit" label="Create account" class="mt-2 p-button-rounded p-button-md"  :loading="isLoading"  style="font-size: 16px; color: white;width: 250px; height: 50px;"/>
            </div>
        </form>
    
</template>

<!-- Business Account Register -->
<script>
    // Validations
    import {required} from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";
    import AuthenticationsDataService from "../../../services/authencationDataService";
    import Loading from 'vue-loading-overlay';

    export default {
        setup: () => ({ v$: useVuelidate() }),
        validations() {
            return {
                user_phonenumber:{
                    required
                },
                user_firstname: {
                    required
                },
                user_lastname: {
                    required
                },
                user_password:{
                    required
                }
            }
        },
        components: {
            Loading
        },
        methods: {
            // Handle Submit Business Account
            async handleSubmitBusinessAcc(isFormValid) {
                try {
                    this.isLoading = true;
                    setTimeout(() => (this.isLoading = false), 1000);
                    // Data 
                    const data = {
                        user_email : this.user_email,
                        user_password: this.user_password,
                        user_firstname: this.user_firstname,
                        user_lastname: this.user_lastname,
                        user_phonenumber: this.results.nationalNumber,
                        user_type: "Vendor"
                    }
                  
                    this.submitted = true;
                    if (!isFormValid) {
                        return;
                    }
                    AuthenticationsDataService.create(data).then((response) => {
                       this.submitted = true;
                       this.messages = [
                             {severity: 'success', content: response.data.message},
                        ]
                        //After register success push to page verify opt
                        // Set Loading 
                        this.isLoadingBusiness = true;
                            setTimeout(() => {
                                this.isLoadingBusiness = false
                        }, 1000);
                        //this.$router.push({path: '/auth/opt-verify/:verify='+encodeURI('phone-5digit')});
                        //Push Router
                        this.$router.push("/auth/login");    
                    }).catch(e => {
                        //  Toast Alert 
                        this.messages = [
                             {severity: 'error', content: e.response.data.error},
                        ]
                    })
                    // JSON responses are automatically parsed.
                } catch (error) {
                    console.log(error);
                }
            }, 
             //Reset Form    
            resetFrom () {
                this.user_firstname = '';
                this.user_lastname = '';
                this.user_password = '';
                this.user_email = '';
                this.user_phonenumber = '';
                this.accept = null;
                this.submitted = false;
            },
             // Input number only 
            inputNumOnly(evt){
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                // Disable input character 
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46 || charCode == 0 ) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            }
    
        },
        data(){
            return {
                phone:'',
                checked: false,
                phoneNumber: null,
                submitted:false,
                accept: null,
                user_firstname: '',
                user_lastname: '',
                user_phonenumber: '',
                user_password: '',
                user_email: '',
                messages: [],
                isLoading: false,
                loading: [false, false, false],
                results: '',
                isLoadingBusiness: false
            }
        }
    }
</script>