<template>
    <!-- Loading -->
    <loading 
        v-model:active="isLoadingPersonal"
        :can-cancel="true"
        color='#000000'
        backgroundColor='#ffffff'
     />
    <!-- Modal Popup - MazDialogs OPT Verify -->
    <MazDialog v-model="isOpenMazDialogs" title="Dialog Title">
        <p>
        Your content
        </p>
        <template #footer>
        <MazBtn @click="isOpenMazDialogs = false">
            Confirm
        </MazBtn>
        </template>
    </MazDialog>

     <form role="form" @submit.prevent="handleSubmitPersonalAcc(!v$.$invalid)" method="POST" enctype="multipart/form-data">
            <div>
                <div class="p-fluid grid">
                    <!-- Username -->
                    <div class="col-6 md:col-6">
                       <div class="p-float-label">
                            <InputText id="user_acc_firstname" type="text" v-model="v$.user_acc_firstname.$model" :class="{'p-invalid p-inputtext-lg':v$.user_acc_firstname.$invalid && submitted}"  style="height: 50px;"/>
                            <label for="user_acc_firstname" :class="{'p-error font-light':v$.user_acc_firstname.$invalid && submitted}" style="font-size: 14px;">First name <span class="p-error">*</span> </label>
                       </div>
                       <small v-if="(v$.user_acc_firstname.$invalid && submitted) || v$.user_acc_firstname.$pending.$response" class="p-error">{{v$.user_acc_firstname.required.$message.replace('Value', 'First name')}}</small>
                    </div>
        
                     <div class="col-6 md:col-6">
                       <div class="p-float-label">
                            <InputText id="user_acc_lastname" type="text" v-model="v$.user_acc_lastname.$model" :class="{'p-invalid p-inputtext-lg':v$.user_acc_lastname.$invalid && submitted}"  style="height: 50px;"/>
                            <label for="user_acc_lastname" :class="{'p-error font-light':v$.user_acc_lastname.$invalid && submitted}" style="font-size: 14px;">Last name <span class="p-error">*</span> </label>
                       </div>
                       <small v-if="(v$.user_acc_lastname.$invalid && submitted) || v$.user_acc_lastname.$pending.$response" class="p-error">{{v$.user_acc_lastname.required.$message.replace('Value', 'Last name')}}</small>
                    </div>
                    <!-- Phone number registers -->
                    <div class="col-12 md:col-12">
                        <div class="p-float-label">
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
                       </div>
                       <small v-if="(v$.user_acc_phonenumber.$invalid && submitted) || v$.user_acc_phonenumber.$pending.$response" class="p-error">{{v$.user_acc_phonenumber.required.$message.replace('Value', 'Phone Number')}}</small>
                    </div>
                    <!-- Email Account Personal-->
                    <div class="col-12 md:col-12">
                        <div class="p-float-label">
                            <InputText id="user_acc_email" class="p-inputtext-lg" type="email" style="height: 50px;"/>
                            <label for="user_acc_email" style="font-size: 14px;">Personal Email</label>
                       </div>
                    </div>
                    <!-- Password -->
                    <div class="col-12 md:col-12">
                        <div class="p-float-label">
                            <Password id="password" v-model="v$.user_acc_password.$model" :class="{'p-invalid':v$.user_acc_password.$invalid && submitted}" toggleMask  style="height: 50px;">
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
                            <label for="user_acc_password" :class="{'p-error':v$.user_acc_password.$invalid && submitted}" style="font-size: 14px;">Password <span class="p-error">*</span> </label>
                        </div>
                        <small v-if="(v$.user_acc_password.$invalid && submitted) || v$.user_acc_password.$pending.$response" class="p-error">{{v$.user_acc_password.required.$message.replace('Value', 'Password')}}</small>
                    </div>
                  
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
            </div>
            <!-- Create account button -->
            <div class="flex justify-content-center">
                <Button type="submit" label="Create account" :loading="isLoading" class="mt-2 p-button-rounded p-button-md" style="font-size: 16px; color: white;width: 230px; height: 40px;"/>
            </div>
        </form>
        <!-- Messages Alert-->
        <Message v-for="msg of messages_acc_per" :severity="msg.severity" :life="5000" :sticky="false" :key="msg.content">{{msg.content}}</Message>
        <!-- Or Authentication -->
        <div class="or-border">
            <div class="border-align bordert my-4 flex align-items-center justify-content-center"></div>  
        </div>
        <!-- Authentication Social Media -->
        <div class="authentication">
            <div class="auth-title">
                <social-register/>
            </div>
        </div>
</template>

<!-- Personal Account Register -->
<script>
    import {required} from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";
    import socialRegister from '../socialmedia/socialRegister.vue';
    import AuthenticationsDataService from "../../../services/authencationDataService";
    import MazDialog from 'maz-ui/components/MazDialog';
    import MazBtn from 'maz-ui/components/MazBtn';
    import Loading from 'vue-loading-overlay';

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
                isLoadingPersonal: false
            }
        },
    
        validations() {
            return {
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
            socialRegister,
            MazDialog,
            MazBtn,
            Loading
        },
        methods: {
            async handleSubmitPersonalAcc(isFormValid){
                    try{
                        this.submitted = true;
                        // Loading Button
                        this.isLoading = true;
                        setTimeout(() => (this.isLoading = false), 1000);
                        // Check validations
                        if (!isFormValid) {
                            return;
                        }
                        // Data 
                        const data = {
                            user_email : this.user_acc_email,
                            user_password: this.user_acc_password,
                            user_firstname: this.user_acc_firstname,
                            user_lastname: this.user_acc_lastname,
                            user_phonenumber: this.results.nationalNumber,
                            user_type: "Customer"
                        }
                        AuthenticationsDataService.create(data).then((response) => {
                        this.submitted = true;
                        this.messages_acc_per = [
                                {severity: 'success', content: response.data.message},
                            ]
                        }).catch(e => {
                            //  Toast Alert 
                            this.messages_acc_per = [
                                {severity: 'error', content: e.response.data.error},
                            ]
                    })
                                
                                
                }catch(err){
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