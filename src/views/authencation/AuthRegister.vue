<template>
       <div class="register-header">
        <!-- Logo -->
            <header class="pt-5">
                    <table class="">
                        <tbody>
                                <tr>
                                    <td>
                                        <router-link to="/">
                                            <img src="../../assets/logo/ecommerce.png" width="200" height="200" />
                                        </router-link>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
            </header>
       </div>
       <!-- Create Account -->
        <div class="container py-5">
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
                        <div class="px-2 py-2">
                            <div class="bg-white pt-4 pb-2 pl-2 pr-2 pb-2">
                                <!-- Credit card form tabs -->
                                <ul role="tablist" class="nav bg-light nav-pills rounded nav-fill mb-3">
                                    <li class="nav-item">
                                            <a data-toggle="pill" href="#personal-account" class="nav-link active ">
                                            <i class="fas fa-credit-card mr-2"></i>Personal account 
                                            </a>
                                    </li>
                                    <li class="nav-item"> 
                                            <a data-toggle="pill" href="#business-account" class="nav-link"> 
                                                <i class="fab fa-paypal mr-2"></i>
                                                 Business account 
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