<script setup>

</script>

<template>
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
                                        <div class="p-float-label">
                                            <InputText id="phone" v-model="v$.phone.$model" :class="{'p-invalid p-inputtext-lg':v$.phone.$invalid && submitted}" />
                                            <label for="phone" :class="{'p-error font-light text-sm':v$.email.$invalid && submitted}" style="font-size: 11px;">Email address or Phone number</label>
                                        </div>
                                        <small v-if="(v$.phone.$invalid && submitted) || v$.phone.$pending.$response" class="p-error">{{v$.phone.required.$message.replace('Value', 'Email Address or Phone Number')}}</small>
                                    </div>
                                <!-- Input Password -->
                                    <div class="field">
                                        <div class="p-float-label">
                                            <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
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
                                            <label for="password" :class="{'p-error':v$.password.$invalid && submitted}" style="font-size: 11px;">Password</label>
                                        </div>
                                        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
                                    </div>
                                <!--Forgot Password?-->
                                <div class="flex align-items-center justify-content-between mb-2 gap-2">
                                    <a class="font-medium no-underline hover:underline text-right cursor-pointer" style="color: var(--primary-color);font-size: 11px;">Forgot password?</a>
                                </div>
                                <!-- Button Submit -->
                                    <Button type="submit" label="Submit" class="mt-2 p-button-rounded p-button-md" style="font-size: 12px;" />
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
    <footer class="fixed-bottom w-full layout-footer index-1 w-full text-500 p-2" style="background-color: #333;">
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
import socailMedia from "./socialmedia/SocialMedia.vue"
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
            loading: [false,  false, false]
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
        handleSubmit(isFormValid, index) {
            this.submitted = true;
            this.loading[index] = true;
            if (!isFormValid) {
                return;
            }
            this.toggleDialog();
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
        // Loadin Submit
        load(index) {
            this.loading[index] = true;
            setTimeout(() => {
                this.loading[index] = false;
            }, 100);
        }
    },
    components: {
        socailMedia
    }
}
</script>

<style>
footer {
    position: fixed;
    height: 100px;
    bottom: 0;
    width: 100%;
}
</style>