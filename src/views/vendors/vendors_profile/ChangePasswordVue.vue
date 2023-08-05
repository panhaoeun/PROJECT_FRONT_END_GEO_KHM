<template>
  <div class="px-2 py-2">
    <b-card>
        <b-card-header class="d-flex justify-content-between">
            <div class="header-title">
                <h4 class="card-title h3">Change Password</h4>
            </div>
        </b-card-header>
        <b-card-body>
            <div class="new-user-info">
                <form method="PUT" enctype="multipart/form-data">
                    <!-- Validation -->
                    <Message severity="error" v-for="(errorArray, index) in notificationMGUserInfoPass" :key="index">
                        {{ errorArray }} 
                    </Message>
                    <b-row>
                        <!-- Full name -->
                        <b-col md="6" class="form-group">
                            <label for="name_en" class="text-sm">Current Password<span class="p-error">*</span></label>
                            <InputText id="product_name" placeholder="Current Password" type="text" class="py-3 border-round-lg text-sm"
                                        v-model="v$.currentPassword.$model"
                                        :class="{ 'p-invalid p-error': v$.currentPassword.$invalid && submitted }" />
                                    <small
                                        v-if="(v$.currentPassword.$invalid && submitted) || v$.currentPassword.$pending.$response"
                                        class="p-error">{{ v$.currentPassword.required.$message.replace('Value',
                                            'Current Password') || v$.currentPassword.$params.min }}</small>
                        </b-col>
                        <!-- Phone number -->
                        <b-col md="6" class="form-group">
                            <label for="name_en" class="text-sm">New Password<span class="p-error">*</span></label>
                            <InputText id="product_name" placeholder="New Password" type="text" class="py-3 border-round-lg text-sm"
                                    v-model="v$.newPassword.$model"
                                    :class="{ 'p-invalid p-error': v$.newPassword.$invalid && submitted }" />
                                <small
                                    v-if="(v$.newPassword.$invalid && submitted) || v$.newPassword.$pending.$response"
                                    class="p-error">{{ v$.newPassword.required.$message.replace('Value',
                                        'New Password') || v$.newPassword.$params.min }}</small>
                        </b-col>
                        <!-- Email Address -->
                        <b-col md="6" class="form-group">
                            <label for="name_en" class="text-sm">Confirm Password<span class="p-error">*</span></label>
                            <InputText id="product_name" placeholder="Confirm Password" type="text" class="py-3 border-round-lg text-sm"
                                    v-model="v$.confirmPassword.$model"
                                    :class="{ 'p-invalid p-error': v$.confirmPassword.$invalid && submitted }" />
                                <small
                                    v-if="(v$.confirmPassword.$invalid && submitted) || v$.confirmPassword.$pending.$response"
                                    class="p-error">{{ v$.confirmPassword.required.$message.replace('Value',
                                        'Email Address') || v$.confirmPassword.$params.min }}</small>
                        </b-col>
                    </b-row>
                    <hr />
                    <!-- Save Change -->
                    <button type="submit" @click.prevent="handleSubmitUpdateCurrentUser(!v$.$invalid)" class="btn btn-primary">Save Change</button>
                </form>
            </div>
        </b-card-body>
    </b-card>
  </div>
</template>
<!-- Script -->
<script>
    import { required, minLength } from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";
    import { ElMessage } from "element-plus";
    export default{
        setup: () => ({ v$: useVuelidate() }),
        //Validations
        validations() {
            return {
                currentPassword: {
                    required,
                    minLength: minLength(3)
                },
                newPassword: {
                    required
                },
                confirmPassword: {
                    required
                }
            }
        },
        data(){
            return {
                currentPassword: null,
                newPassword: null,
                confirmPassword: null,
                submitted: false
            }
        },
        methods: {
            async handleSubmitUpdateCurrentUser(isFormValid){
                this.submitted = true;
                if (!isFormValid) {
                    return;
                }
                const updateMyUserPassword = {
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword,
                    passwordConfirmation: this.confirmPassword,
                    file: this.userProfile ?? []
                }
                this.myAccountCurrentClass.changeCurrentPasswordLogAdmin(updateMyUserPassword, this.$route.params.currentUserId ?? '')
                    .then(response => {
                        if (response.data.success == true) {
                            ElMessage.success(response.data?.message);
                            return;
                        }
                    }).catch((error) => {
                        ElMessage.error(error.response?.message || error.response.data?.message);
                        this.notificationMGUserInfoPass = error.response?.data;
                });
            }
        }
    }
</script>