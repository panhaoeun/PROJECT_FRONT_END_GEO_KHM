<template>
  <div class="px-2 py-2">
    <b-card>
        <b-card-header class="d-flex justify-content-between">
            <div class="header-title">
                <h4 class="card-title h3">User Profile</h4>
            </div>
        </b-card-header>

        <b-card-body>
            <div class="new-user-info">
                <p>Logs</p>
            </div>
        </b-card-body>
    </b-card>
  </div>
</template>
<!-- Script -->
<script>
    import MyAccountAdminPanelInfoLogCurrent from "../../../services/authencations/users_info/VendorAdminUserInfo";
    import { required, minLength } from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";
    import { ElMessage } from 'element-plus';

    export default{
        setup: () => ({ v$: useVuelidate() }),
        props: {
            userProfile: Array
        },
        created() {
            this.myAccountCurrentClass = new MyAccountAdminPanelInfoLogCurrent()
        },
        mounted() {
            this.editCurrentUserAccountInfo(this.$route.params.currentUserId ?? '');
        },
        //Validations
        validations() {
            return {
                currentFullName: {
                    required,
                    minLength: minLength(3)
                },
                currentPhoneNum: {
                    required
                },
                currentEmailAddr: {
                    required
                }
            }
        },
        data(){
            return {
                currentFullName: null,
                currentPhoneNum: null,
                currentEmailAddr: null,
                submitted: false,
            }
        },
        methods: {
            async editCurrentUserAccountInfo(currentUserId){
                this.myAccountCurrentClass.currentMyAccountAdmin(currentUserId)
                    .then((data) => {
                        try {
                            const {user_email, user_phonenumber}  = data?.userResult ?? '';
                            const {name_eng} = data?.empResult ?? '';
                            this.currentFullName = name_eng ?? '';
                            this.currentEmailAddr = user_email ?? '';
                            this.currentPhoneNum = user_phonenumber ?? '';
                        } catch (error) {
                            ElMessage.error(error);
                        }
                    }
                );
            },
            async handleSubmitUpdateCurrentUser(isFormValid){
                this.submitted = true;
                if (!isFormValid) {
                    return;
                }
                const updateMyUserInfo = {
                    fullNameCurrentLog: this.currentFullName,
                    phoneNumberCurrentLog: this.currentPhoneNum,
                    emailCurrentLog: this.currentEmailAddr,
                    file: this.userProfile ?? []
                }
                this.myAccountCurrentClass.updateCurrentMyAccountAminLog(updateMyUserInfo, this.$route.params.currentUserId ?? '').then(response => {
                    if (response.data.success == true) {
                        ElMessage.success(response.data.message);
                        return;
                    }
                }).catch((error) => {
                    console.log(this.userProfile)
                    ElMessage.error(error.response?.message || error.response.data?.message);
                    this.notificationMGUserInfoUpdated = error.response?.data;
                });
            }
        }
    }
</script>