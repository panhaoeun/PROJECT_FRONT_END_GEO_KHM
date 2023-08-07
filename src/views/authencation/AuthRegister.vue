<template>
       <div class="register-header">
        <!-- Logo -->
            <header>
                    <table class="">
                        <tbody>
                                <tr>
                                    <td>
                                        <router-link to="/">
                                            <img src="../../assets/company_logo/ecommerce_logo.png" width="120" height="120" />
                                        </router-link>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
            </header>
       </div>
       <!-- Create Account -->
        <div class="container">
            <div class="signInLink flex px-2 py-2 my-2">
                <span>Already a number?</span>
                <router-link to="/auth/login" class="px-2 hover:underline underline">
                    Sign In
                </router-link>
            </div>
            <!-- For demo purpose -->
            <div class="row mb-4">
                <div class="col-lg-8 mx-auto text-center">
                    <h1 class="display-6">Create Accounts</h1>
                </div>
            </div>
             <!-- End -->
            <div class="row">
                <div class="col-lg-6 mx-auto">
                    <div class="card ">
                        <div class="py-2">
                            <div class="bg-white pt-4 pb-2 pl-2">
                                <!-- Credit card form tabs -->
                                <ul role="tablist" class="nav nav-pills border-500 surface-overlay border-1 nav-pills rounded nav-fill mb-3 px-2 py-2" id="pills-tab">
                                    <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                                   <span class="text-lg"> Personal account </span>
                                            </button>
                                    </li>
                                    <li class="nav-item"> 
                                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"> 
                                                <span class="text-lg"> Business account </span>
                                            </button> 
                                    </li>
                                </ul>
                            </div> 
                            <!-- Tab Account Personal or Business account -->
                            <div class="tab-content" id="tab-tabContent">
                                <!-- Personal account card form contents -->
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <personal-account-register/>
                                </div>
                                 <!-- business account card form contents -->
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <business-account-register/>
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer info for register -->
        <footer class="gfooter container-fluid flex justify-content-center" style="font-size: 10px;">
            <div class="gf-box">
                <div class="gf-footer" role="presentation">
                    <table class="gf-tfooter">
                        <tbody>
                            <tr valign="top" class="flex flex-column">
                                <td class="" style="display: inline;">
                                        Copyright © 1995-2023 PhzarKhmer Inc. All Rights Reserved.,
                                        Accessibility,
                                        User Agreement,
                                        Privacy,
                                        Payments Terms of Use,
                                        Cookies,
                                        Your Privacy Choices
                                        and
                                        AdChoice
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </footer>
</template>
<!-- Auth Register -->
<script>
    import BusinessAccountRegister from "./register/BusinessAccountRegister.vue";
    import PersonalAccountRegister from "./register/PersonalAccountRegister.vue";
    export default {
        components:{
            PersonalAccountRegister,
            BusinessAccountRegister
        }
    }
</script>