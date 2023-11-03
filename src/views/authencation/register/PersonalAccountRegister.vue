<template>
    <!-- Modal Popup - MazDialogs OPT Verify -->
     <form role="form" @submit.prevent="handleSubmitPersonalAcc(!v$.$invalid)" method="POST" enctype="multipart/form-data" class="bg-white">
            <div>
                <div class="p-fluid grid">
                    <!-- Username -->
                    <div class="col-6 md:col-6">
                        <label for="user_acc_firstname" :class="{'p-error font-light':v$.user_acc_firstname.$invalid && submitted}" style="font-size: 14px;">First name <span class="p-error">*</span> </label>
                       <MazInput
                            v-model="v$.user_acc_firstname.$model"
                            label="First Name"
                            :error="v$.user_acc_firstname.$invalid && submitted" 
                        />
                       <small v-if="(v$.user_acc_firstname.$invalid && submitted) || v$.user_acc_firstname.$pending.$response" class="p-error">{{v$.user_acc_firstname.required.$message.replace('Value', 'First name')}}</small>
                    </div>
        
                     <div class="col-6 md:col-6">
                        <label for="user_acc_lastname" :class="{'p-error font-light':v$.user_acc_lastname.$invalid && submitted}" style="font-size: 14px;">Last name <span class="p-error">*</span> </label>
                        <MazInput
                            v-model="v$.user_acc_lastname.$model"
                            label="First Name"
                            :error="v$.user_acc_lastname.$invalid && submitted" 
                        />
                       <small v-if="(v$.user_acc_lastname.$invalid && submitted) || v$.user_acc_lastname.$pending.$response" class="p-error">{{v$.user_acc_lastname.required.$message.replace('Value', 'Last name')}}</small>
                    </div>
                    <!-- Phone number registers -->
                    <div class="col-12 md:col-12">
                       <!-- Phone Number Input -->
                        <MazPhoneNumberInput
                            id="user_acc_phonenumber" 
                            v-model="v$.user_acc_phonenumber.$model" 
                            :error="v$.user_acc_phonenumber.$invalid && submitted" 
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
                       <small v-if="(v$.user_acc_phonenumber.$invalid && submitted) || v$.user_acc_phonenumber.$pending.$response" class="p-error">{{v$.user_acc_phonenumber.required.$message.replace('Value', 'Phone Number')}}</small>
                    </div>
                    <!-- Email Account Personal-->
                    <div class="col-12 md:col-12">
                        <label for="user_acc_email" style="font-size: 14px;">Personal Email</label>
                       <MazInput
                            v-model="v$.user_acc_email.$model"
                            label="Email"
                            type="email"
                            :error="v$.user_acc_email.$invalid && submitted" 
                        />
                        <small v-if="(v$.user_acc_email.$invalid && submitted) || v$.user_acc_email.$pending.$response" class="p-error">{{v$.user_acc_email.required.$message.replace('Value', 'Email Address')}}</small>
                    </div>
                    <!-- Password -->
                    <div class="col-12 md:col-12">
                        <label for="user_acc_password" :class="{'p-error':v$.user_acc_password.$invalid && submitted}" style="font-size: 14px;">Password <span class="p-error">*</span> </label>
                        <MazInput
                                v-model="v$.user_acc_password.$model"
                                label="Password *"
                                type="password"
                                :error="v$.user_acc_password.$invalid && submitted" 
                            />
                        <small v-if="(v$.user_acc_password.$invalid && submitted) || v$.user_acc_password.$pending.$response" class="p-error">{{v$.user_acc_password.required.$message.replace('Value', 'Password')}}</small>
                    </div>
                    <!--Auth-->
                    <div class="signInLink flex px-4 py-2 pl-2 my-2">
                        <span>Already have as account?</span>
                        <router-link to="/auth/login" class="px-2 hover:underline underline">
                            Sign In
                        </router-link>
                    </div>
                    <!-- Label Privacy -->
                    <div class="px-4 py-4 pb-4">
                        
                        <!-- Privacy -->
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
            </div>
            <!-- Create account button -->
            <div class="flex justify-content-center">
                <MazBtn  color="danger" style="background-color: #c51b1e;" type="submit" block :loading="isLoadingPersonal">Create account</MazBtn>
            </div>
        </form>
</template>

<!-- Personal Account Register -->
<script>
    import {required} from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";
    // import socialRegister from '../socialmedia/socialRegister.vue';
    import { ElLoading } from 'element-plus';
    import AuthenticationsDataService from "../../../services/authencationDataService";

    export default {
        setup: () => ({ v$: useVuelidate() }),
        data() {
            return {
                results: '',
                isLoading: false,
                loading: [false, false, false],
                user_acc_firstname: '',
                user_acc_lastname: '',
                user_acc_phonenumber: '',
                user_acc_email: '',
                user_acc_password: '',
                messages_acc_per: [],
                submitted:false,
                accept: null,
                isLoadingPersonal: false,
                btnLoading: false
            }
        },
    
        validations() {
            return {
                user_acc_email: {
                    required
                },
                user_acc_firstname: {
                    required
                },
                user_acc_lastname: {
                    required
                },
                user_acc_phonenumber:{
                    required
                },
                user_acc_password: {
                    required
                }
            }
        },  
        components: {
            // socialRegister
        },
        methods: {
            async handleSubmitPersonalAcc(isFormValid){
                    try{
                        this.submitted = true;
                        this.btnLoading = false;
                        // Loading Button
                        this.isLoadingPersonal = true;
                        setTimeout(() => {
                            this.isLoadingPersonal = false
                        }, 1000);
                        // Check validations
                        if (!isFormValid) {
                            return;
                        }
                        // Data 
                        const signUpAccount = {
                            userEmail : this.user_acc_email,
                            userPassword: this.user_acc_password,
                            userName: this.user_acc_firstname + this.user_acc_lastname,
                            userPhone: this.results.nationalNumber,
                            userType: "Customer",
                            userStatus: "Active"
                        }
                        AuthenticationsDataService.create(signUpAccount).then((response) => {
                            this.$notify.success({
                                title: 'Successful sing up account customer',
                                message: response.data?.message ? response.data?.message : '' ,
                                showClose: true
                            });
                            this.btnLoading = true;    
                            this.submitted = true;
                            this.isLoadingPersonal = true;
                            let loadingAuthSignUp = ElLoading.service({ 
                                lock: true,
                                text: 'Please waiting...',
                                background: 'rgb(255,250,250)'
                            });
                            this.$router.push({path: "/"});
                            setTimeout(() => {
                                loadingAuthSignUp.close();
                                window.location.reload();
                            }, 2000)
                            return;
                        }).catch(error => {
                            this.$notify.error({
                                title: 'Unsuccessfully sign up account',
                                showClose: false
                            });  
                            if(error.response.data){
                                this.$notify.error({
                                    title: error.response.data?.message,
                                    showClose: true
                                });   
                            }
                            if(error.response.data.data.errors){
                                for (let index = 0; index < error.response.data.data.errors.length; index++) {
                                    const messageValidationAuthentication = error.response.data.data.errors[index].message ?? '';
                                    this.$notify.error({
                                        title: error.response.data?.message ?  error.response.data?.message :  'Unsuccessfully sigup account',
                                        message: messageValidationAuthentication ? messageValidationAuthentication : '',
                                        showClose: true
                                    });   
                                }                    
                            }     
                        });                              
                }catch(err){
                    console.log(err)
                   // Alert Error 
                  this.messages_acc_per  [
                    {severity: 'error' , content: err}
                  ]
                   // Alert Error 
                  this.messages_acc_per  [
                    {severity: 'error' , content: err}
                  ]
                }
            },
            //Reset Form Input 
            resetFrom(){
                this.user_acc_firstname,
                this.user_acc_lastname,
                this.user_acc_phonenumber,
                this.user_acc_email,
                this.user_acc_password,
                this.submitted = false
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
            },
        },
    }
</script>