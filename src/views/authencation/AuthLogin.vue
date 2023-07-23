<template>
  <div>
    <div class="">
        <div class="flex flex-column align-items-center justify-content-center border-bottom">
            <a href="#" class="flex flex-column align-items-center justify-content-center">
                <img src="../../assets/company_logo/ecommerce_logo.png" class="w-1 text-center"/>
            </a>
        </div>
        <div class="flex align-items-center justify-content-center overflow-hidden">
            <div class="flex flex-column align-items-center justify-content-center">
                <div class="px-4 py-4">
                    <div class="w-full surface-card py-6 px-12 sm:px-8" style="border-radius: 53px">
                        <div class="text-center mb-5">
                            <div class="text-900 text-3xl font-medium mb-3">Welcome, PzharKhmer!</div>
                            <span class="text-600 font-medium">Sign in to continue</span>
                        </div>
                        <!-- Form Submit -->
                        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid w-25rem">
                            <!-- Loading -->
                            <loading 
                               :active="isLoading" :is-full-page="fullPage" :loader="loader"
                            />
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
    <footer class="fixed-bottom w-full layout-footer index-1 w-full text-500 p-2 footer-login" style="background-color: #333;">
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
// Components
import socailMedia from "./socialmedia/SocialMedia.vue";
import MazInput from 'maz-ui/components/MazInput';
// import AuthenticationsDataService from  "../../services/authencationDataService";
import Loading from 'vue-loading-overlay';
import { ElMessage } from "element-plus";
import Cookie from "js-cookie";

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
                    }, 300);
                    this.$store.dispatch("auth/login", data).then(
                        (response) => {
                            //Check validation  
                            if(response.success == true){
                                this.$store.dispatch("auth/setCurrentUser", localStorage.getItem('user'));
                                this.$store.dispatch("auth/setToken", Cookie.get('token'));
                                if (response.userType === "Admin") {
                                    this.$router.push({path: "/vendor-dashboard/default-layouts"});
                                }
                                if (response.userType === "Vendor") {
                                    this.$router.push({path: "/vendor-dashboard/default-layouts"});
                                } else if (response.userType === "Customer") {
                                    this.$router.push({path: "/"});
                                }
                                return;
                            }                
                        },
                        (error) => {
                            console.log(process.env.VUE_APP_URL)
                            if(typeof(error.response.data.error.error) !== undefined){
                                ElMessage.error(error.response.data.message);
                                ElMessage.error(error.response.data.error.error);
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
.footer-login {
    position: fixed;
    height: 100px;
    bottom: 0;
    width: 100%;
}
</style>