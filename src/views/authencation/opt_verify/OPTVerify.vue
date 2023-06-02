<template>
    <div>
      <div class="bg-white">
          <div class="flex flex-column align-items-center justify-content-center border-bottom">
              <a href="#" class="flex flex-column align-items-center justify-content-center">
                <!-- Logo E-Commerce -->
                  <img src="../../../assets/logo/ecommerce.png" class="w-1 text-center"/>
              </a>
          </div>
          <div class="flex align-items-center justify-content-center overflow-hidden px-4 py-4">
                <!-- Form Submit -->
                <div class="card">
                    <form @submit.prevent="handleSubmitDigitPhoneVerify()">
                        <div class="py-2 px-3">
                            <!-- Text -->
                            <div class="text-center mb-5">
                                <div class="text-900 text-3xl font-medium mb-3">Verify mobile number</div>
                                <span class="text-600 font-medium">A text with a One Time Password (OTP) has been sent to your mobile number</span>
                            </div>
                        </div>
                           <!--Input Verify OPT -->
                            <div class="col-6 md:col-6">
                                <label for="opt-verify-input">Enter OTP:</label>
                                <span class="p-input-icon-right">
                                    <InputMask id="opt-verify-input" class="p-inputtext-lg p-fluid" style="height: 50px; width: 40rem;" mask="9-9-9-9-9-9" v-model="valInputVerifyOPT" placeholder="Enter 6 Digit" />
                                    <i class="pi pi-spin pi-spinner" />
                                </span>
                                
                            </div>
                            <!-- Create account button -->
                            <div class="flex justify-content-center">
                                <Button type="submit" label="Continue" :loading="isLoading" class="mt-2 p-button-rounded p-button-md" style="font-size: 16px; color: white;width: 300px; height: 50px;"/>
                            </div>
                        <div class="px-4 py-4">
                            By creating an account, you agree to PzharKhmer Conditions of Use and Privacy Notice.
                        </div>
                    </form>
                </div>  
                <!-- Form Submit -->        
          </div>
      </div>
    </div>
    <!-- Footer for Auth Login -->
    <footer class="fixed-bottom w-full layout-footer index-1 w-full text-500 p-2 footer-verify" style="background-color: #333;">
          <div class="container text-500">
              <a href="#" class="no-underline hover:underline text-white hover:text-500" ref="nofollow">Intellectual Property Protection</a> - 
              <a href="" class="no-underline hover:underline text-white hover:text-500" ref="nofollow">Privacy Policy</a> 
              - <a href="" class="no-underline hover:underline text-white hover:text-500">Sitemap</a> 
              - <a href="" class="no-underline hover:underline text-white hover:text-500" ref="nofollow">Terms of Use</a> 
              - <a href="" class="no-underline hover:underline text-white hover:text-500" ref="nofollow">User Information Legal Enquiry Guide</a> 
              ©️ {{ Date('YYYY') }} PzharKhmer.com. All rights reserved.
          </div>
      </footer>
  </template>
  
  <!-- Input Verify OPT - 5digit -->
  <script>
        export default{
            data(){
                return {
                    isLoading: false,
                    valInputVerifyOPT: ''
                }
            },
            methods: {
                async handleSubmitDigitPhoneVerify(){
                    console.log(this.valInputVerifyOPT)
                }
            }
        }
  </script>
  
  <style>
  .footer-verify {
      position: fixed;
      height: 100px;
      bottom: 0;
      width: 100%;
  }
  </style>