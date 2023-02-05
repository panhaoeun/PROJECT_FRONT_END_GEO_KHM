<template>
     <form role="form">
            <div>
                <div class="p-fluid grid">
                    <!-- Username -->
                    <div class="col-6 md:col-6">
                        <InputText id="inputtext" type="text" v-model="value1" placeholder="First Name" class="p" style="height: 50px;"/>
                    </div>
                    <div class="col-6 md:col-6">
                        <InputText id="inputtext" type="text" v-model="value1" placeholder="Last Name" class="p" style="height: 50px;" />
                    </div>
                    <!-- Email -->
                    <div class="col-12 md:col-12">
                        <InputText id="inputtext" type="email" v-model="value1" placeholder="Email" class="p" style="height: 50px;"/>
                    </div>
                    <!-- Password -->
                    <div class="col-12 md:col-12">
                        <Password id="inputtext" type="password" toggleMask v-model="password" placeholder="Password" class="p" style="height: 50px;">
                                <template #header>
                                    <h6>Pick a password</h6>
                                </template>
                                <template #footer>
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
                <Button type="submit" label="Create account" class="mt-2 p-button-rounded p-button-md" style="font-size: 16px; color: white;width: 230px; height: 40px;"/>
            </div>
        </form>
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
<script>
        import socialRegister from '../socialmedia/socialRegister.vue';
        export default {
            components: {
                socialRegister
            }
        }
</script>