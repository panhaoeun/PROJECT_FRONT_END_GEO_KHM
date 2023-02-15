<template>
     <loading 
        v-model:active="isLoading"
        :can-cancel="true"
        color='#000000'
        backgroundColor='#ffffff'
     />
  <div>
    <div class="bg-white">
        <div class="flex flex-column align-items-center justify-content-center border-bottom">
            <a href="#" class="flex flex-column align-items-center justify-content-center">
                <img src="../../assets/logo/ecommerce.png" class="w-1 text-center"/>
            </a>
        </div>
        <div class="flex align-items-center justify-content-center overflow-hidden">
            <div class="flex flex-column align-items-center justify-content-center">
                <div>
                    <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                        <div class="text-center mb-5">
                            <div class="text-900 text-3xl font-medium mb-3">Welcome, PzharKhmer!</div>
                            <span class="text-600 font-medium">Sign in to continue</span>
                        </div>
                        <!-- Form Submit -->
                        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid w-25rem">
                                <!-- Input Email or Phone Number -->
                                    <div class="field pb-2">
                                        <MazInput
                                            v-model="v$.phone.$model"
                                            label="Phone Number *"
                                            :error="v$.phone.$invalid && submitted" 
                                           @input="validatePhoneNumber($event)"
                                        />
                                        <small v-if="(v$.phone.$invalid && submitted) || v$.phone.$pending.$response" class="p-error">{{v$.phone.required.$message.replace('Value', 'Phone Number')}}</small>
                                    </div>
                                <!-- Input Password -->
                                    <div class="field">
                                        <MazInput
                                            v-model="v$.password.$model"
                                            label="Password *"
                                            type="password"
                                            :error="v$.password.$invalid && submitted" 
                                        />
                                        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
                                    </div>
                                <!--Forgot Password?-->
                                <div class="flex align-items-center justify-content-between mb-2 gap-2">
                                    <a class="font-medium no-underline hover:underline text-right cursor-pointer" style="color: var(--primary-color);font-size: 11px;">Forgot password?</a>
                                </div>

                                <!-- Messages MazDialog -->
                                <Message v-for="msg of messages" :severity="msg.severity" :life="6000" :sticky="false" :key="msg.content">{{msg.content}}</Message>
                        
                                <!-- Button Submit -->
                                <MazBtn type="submit" >Sign In</MazBtn>
                            </form>
                        <!-- Form Submit -->
                        <!-- Or Authencation with Socail Media -->
                        <div class="bordert py-2 my-4 flex align-items-center justify-content-center">
                            <socailMedia/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  
    <!-- Footer for Auth Login -->
    <footer class="fixed-bottom w-full layout-footer index-1 w-full text-500 p-2 footer" style="background-color: #333;">
        <div class="container text-500">
            <a href="#" class="no-underline hover:underline text-white hover:text-500" ref="nofollow">Intellectual Property Protection</a> - 
            <a href="" class="no-underline hover:underline text-white hover:text-500" ref="nofollow">Privacy Policy</a> 
            - <a href="" class="no-underline hover:underline text-white hover:text-500">Sitemap</a> 
            - <a href="" class="no-underline hover:underline text-white hover:text-500" ref="nofollow">Terms of Use</a> 
            - <a href="" class="no-underline hover:underline text-white hover:text-500" ref="nofollow">User Information Legal Enquiry Guide</a> 
            ©️ {{ Date('YYYY') }} PzharKhmer.com. All rights reserved.
        </div>
    </footer>
    <!-- <AppConfig simple /> -->
</template>

<!-- Login -->
<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
// Componets
import socailMedia from "./socialmedia/SocialMedia.vue";
import MazInput from 'maz-ui/components/MazInput';
import AuthenticationsDataService from  "../../services/authencationDataService";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            phone: '',
            email: '',
            password: '',
            accept: null,
            submitted: false,
            showMessage: false,
            loading: [false,  false, false],
            messages: [],
            results: '',
            isLoading: false
        }
    },
    validations() {
        return {
            phone: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required
            },
            accept: {
                required
            }
        }
    },
    methods: {
       // Handle Submit Business Account
       async handleSubmit(isFormValid) {
            try{
                this.submitted = true;
                if(this.password != '' && this.phone != ''){
                    // Client to Serve 
                    const data = {
                        user_phonenumber : this.phone,
                        user_password: this.password
                    }
                    this.isLoading = true;
                     setTimeout(() => {
                                this.isLoading = false
                    }, 1000);

                    AuthenticationsDataService.authLogin(data).then((response) => {
                        this.messages = [
                             {severity: 'success', content: response.data.message},
                        ]
                        if(response.data.userType === "Vendor"){
                            this.$router.push("/vendors/dashboard");
                        }else if(response.data.userType === "Customer"){
                            this.$router.push("/");
                        }
                    }).catch(error => {
                        console.log(error.response.data.message)
                        //  Toast Alert 
                        this.messages = [
                             {severity: 'error', content: error.response.data.message},
                        ]
                    });

                }
                if (!isFormValid) {
                    return;
                }
                                 
            }catch(error){
                // Message Error
                this.messages = [
                    {severity: 'success', content: error},
                ]
            }
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
            if(!this.showMessage) {
                this.resetForm();
            }
        },
        resetForm() {
            this.phone = '';
            this.email = '';
            this.password = '';
            this.accept = null;
            this.submitted = false;
        },
        // Validation phone number 
        validatePhoneNumber(event){
            // Initial input state
            let prevValue = '';
            let prevSelectionStart = 0;
            const input = event.target
            let value = event.target.value            
            // Check if value is number
            let isValid = +value == +value
            if (isValid) {
                // preserve input state
                prevValue = value
                prevSelectionStart = input.selectionStart
            } else {
                // restore previous valid input state.
                // we have to fire one more Input event in  order to reset cursor position.
                var resetEvent = new InputEvent('input')
                input.value = prevValue
                input.selectionStart = prevSelectionStart
                input.selectionEnd = prevSelectionStart
                input.dispatchEvent(resetEvent)
            }
        }
    },
    components: {
        socailMedia,
        MazInput,
        Loading
    }
}
</script>

<style>
.footer {
    position: fixed;
    height: 100px;
    bottom: 0;
    width: 100%;
}
</style>