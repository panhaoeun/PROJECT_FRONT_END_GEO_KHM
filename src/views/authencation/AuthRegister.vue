<template>
       <div class="register-header">
        <!-- Logo -->
            <header class="pt-5">
                    <table class="">
                        <tbody>
                                <tr>
                                    <td>
                                        <router-link to="/">
                                            <img src="../../assets/logo/ecommerce.png" width="130" height="130" />
                                        </router-link>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
            </header>
       </div>
       <!-- Create Account -->
        <div class="container py-2">
            <div class="signInLink flex px-2 py-2 my-2">
                <span>Already a number?</span>
                <router-link to="/" class="px-2 hover:underline underline">
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
                                <ul role="tablist" class="nav border-500 surface-overlay border-1 nav-pills rounded nav-fill mb-3 px-2 py-2">
                                    <li class="nav-item">
                                            <a data-toggle="pill" href="#personal-account" class="nav-link active px-2 py-2">
                                                   <span class="text-lg"> Personal account </span>
                                            </a>
                                    </li>
                                    <li class="nav-item"> 
                                            <a data-toggle="pill" href="#business-account" class="nav-link px-2 py-2"> 
                                                <span class="text-lg"> Business account </span>
                                            </a> 
                                    </li>
                                </ul>
                            </div> 
                            <!-- Tab Account Personal or Business account -->
                            <div class="tab-content">
                                <!-- Personal account card form contents -->
                                <div id="personal-account" class="tab-pane fade show active pt-3">
                                        <personal-account-register/>
                                </div>
                                 <!-- business account card form contents -->
                                <div class="tab-pane" id="business-account" role="tabpanel" aria-labelledby="profile-tab">
                                    <business-account-register/>
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer info for register -->
        <footer class="h-7rem gfooter container-fluid flex justify-content-center" style="font-size: 10px;">
            <div class="gf-box">
                <div class="gf-footer" role="presentation">
                    <table class="gf-tfooter">
                        <tbody>
                            <tr valign="top" class="flex flex-column">
                                <td class="" style="display: inline;">
                                    Copyright © 1995-2023 PhzarKhmer Inc. All Rights Reserved. 
                                    <router-link to="/">
                                        Accessibility
                                    </router-link>,
                                    <router-link to="/">
                                        User Agreement
                                    </router-link>,
                                    <router-link to="/">
                                        Privacy
                                    </router-link>
                                    <router-link to="/">
                                        Payments Terms of Use
                                    </router-link>
                                    <router-link to="/">
                                        Cookies
                                    </router-link>
                                    <router-link to="/">
                                        Your Privacy Choices
                                    </router-link>
                                    and
                                    <router-link to="/">
                                        AdChoice
                                    </router-link>
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