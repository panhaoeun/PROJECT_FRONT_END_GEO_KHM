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
                                            v-model="v$.userLogin.$model"
                                            label="Phone Number or Email *"
                                            :error="v$.userLogin.$invalid && submitted" 
                                        />
                                        <small v-if="(v$.userLogin.$invalid && submitted) || v$.userLogin.$pending.$response" class="p-error">{{v$.userLogin.required.$message.replace('Value', 'Phone Number or Email')}}</small>
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
                                <div class="form-group">
                                    <div v-if="messages"  class="alert alert-danger p-error px-2 py-2" role="alert">
                                        {{ messages.userPassword['0'] ||  messages.userLogin['0']  || messages }}
                                    </div>
                                </div>    
                                <!-- Button Submit -->
                                <MazBtn type="submit" >Sign In</MazBtn>
                            </form>
                        <!-- Form Submit -->
                        <!-- Or Authencation with Socail Media -->
                        <div class="bordert py-2 my-4 flex align-items-center justify-content-center text-lg">
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
        <div class="container text-500 flex">
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
// import AuthenticationsDataService from  "../../services/authencationDataService";
import Loading from 'vue-loading-overlay';

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            userLogin: '',
            email: '',
            password: '',
            accept: null,
            submitted: false,
            showMessage: false,
            loading: [false,  false, false],
            messages: '',
            results: '',
            isLoading: false
        }
    },
    validations() {
        return {
            userLogin: {
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
    computed: {
        loggedIn() {
            return this.$store.state.auth.initialState.status.loggedIn;
        },
    },
    methods: {
       // Handle Submit Business Account
       async handleSubmit(isFormValid) {
            try{
                this.submitted = true;
                if(this.password != '' && this.userLogin != ''){
                    // Client to Serve 
                    const data = {
                        userLogin : this.userLogin,
                        userPassword: this.password
                    }
                    this.isLoading = true;
                     setTimeout(() => {
                                this.isLoading = false
                    }, 1000);
                    this.$store.dispatch("auth/login", data).then(
                        (response) => {
                            //Check validation  
                            if(response.success == true){
                                if (response.userType === "Vendor") {
                                    this.$router.push("/vendors/dashboard");
                                } else if (response.userType === "Customer") {
                                    this.$router.push("/");
                                }
                            }                
                        },
                        (error) => {
                            if(error.response.data.success === false){
                              if (typeof (error.response.data.error.error) !== undefined) {
                                this.messages = (error.response.data.error.error);
                              }    
                            }
                        }
                    );
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
            this.userLogin = '';
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