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
                    <form method="PUT" enctype="multipart/form-data">
                        <b-row>
                            <!-- Validation -->
                            <Message
                                severity="error"
                                v-for="(
                                    errorArray, index
                                ) in notificationMGUserInfoUpdated"
                                :key="index"
                            >
                                {{ errorArray }}
                            </Message>
                            <!-- Full name -->
                            <b-col md="6" class="form-group">
                                <label for="name_en" class="text-sm"
                                    >Full Name<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <InputText
                                    id="product_name"
                                    placeholder="Full Name"
                                    type="text"
                                    class="py-3 border-round-lg text-sm"
                                    v-model="v$.currentFullName.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.currentFullName.$invalid &&
                                            submitted,
                                    }"
                                />
                                <small
                                    v-if="
                                        (v$.currentFullName.$invalid &&
                                            submitted) ||
                                        v$.currentFullName.$pending.$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.currentFullName.required.$message.replace(
                                            "Value",
                                            "Full Name"
                                        ) || v$.currentFullName.$params.min
                                    }}</small
                                >
                            </b-col>
                            <!-- Phone number -->
                            <b-col md="6" class="form-group">
                                <label for="name_en" class="text-sm"
                                    >Phone Number<span class="p-error"
                                        >*</span
                                    ></label
                                >
                                <InputText
                                    id="product_name"
                                    placeholder="Phone Number"
                                    type="text"
                                    class="py-3 border-round-lg text-sm"
                                    v-model="v$.currentPhoneNum.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.currentPhoneNum.$invalid &&
                                            submitted,
                                    }"
                                />
                                <small
                                    v-if="
                                        (v$.currentPhoneNum.$invalid &&
                                            submitted) ||
                                        v$.currentPhoneNum.$pending.$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.currentPhoneNum.required.$message.replace(
                                            "Value",
                                            "Phone Number"
                                        ) || v$.currentPhoneNum.$params.min
                                    }}</small
                                >
                            </b-col>
                            <!-- Email Address -->
                            <b-col md="6" class="form-group">
                                <label for="name_en" class="text-sm"
                                    >Email</label
                                >
                                <InputText
                                    id="product_name"
                                    placeholder="Email"
                                    type="text"
                                    class="py-3 border-round-lg text-sm"
                                    v-model="v$.currentEmailAddr.$model"
                                    :class="{
                                        'p-invalid p-error':
                                            v$.currentEmailAddr.$invalid &&
                                            submitted,
                                    }"
                                />
                                <small
                                    v-if="
                                        (v$.currentEmailAddr.$invalid &&
                                            submitted) ||
                                        v$.currentEmailAddr.$pending.$response
                                    "
                                    class="p-error"
                                    >{{
                                        v$.currentEmailAddr.required.$message.replace(
                                            "Value",
                                            "Email Address"
                                        ) || v$.currentEmailAddr.$params.min
                                    }}</small
                                >
                            </b-col>
                        </b-row>
                        <hr />
                        <button
                            type="submit"
                            @click.prevent="
                                handleSubmitUpdateCurrentUser(!v$.$invalid)
                            "
                            class="btn btn-primary"
                        >
                            Save Change
                        </button>
                    </form>
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
import { ElMessage } from "element-plus";

export default {
    setup: () => ({ v$: useVuelidate() }),
    props: {
        userProfile: Array,
    },
    created() {
        this.myAccountCurrentClass = new MyAccountAdminPanelInfoLogCurrent();
    },
    mounted() {
        this.editCurrentUserAccountInfo(this.$route.params.currentUserId ?? "");
    },
    //Validations
    validations() {
        return {
            currentFullName: {
                required,
                minLength: minLength(3),
            },
            currentPhoneNum: {
                required,
            },
            currentEmailAddr: {
                required,
            },
        };
    },
    data() {
        return {
            currentFullName: null,
            currentPhoneNum: null,
            currentEmailAddr: null,
            submitted: false,
        };
    },
    methods: {
        async editCurrentUserAccountInfo(currentUserId) {
            this.myAccountCurrentClass
                .currentMyAccountAdmin(currentUserId)
                .then((data) => {
                    try {
                        const { user_email, user_phonenumber } =
                            data?.userResult ?? "";
                        const { name_eng } = data?.empResult ?? "";
                        this.currentFullName = name_eng ?? "";
                        this.currentEmailAddr = user_email ?? "";
                        this.currentPhoneNum = user_phonenumber ?? "";
                    } catch (error) {
                        ElMessage.error(error);
                    }
                });
        },
        async handleSubmitUpdateCurrentUser(isFormValid) {
            this.submitted = true;
            if (!isFormValid) {
                return;
            }
            const updateMyUserInfo = {
                fullNameCurrentLog: this.currentFullName,
                phoneNumberCurrentLog: this.currentPhoneNum,
                emailCurrentLog: this.currentEmailAddr,
                file: this.userProfile ?? [],
            };
            this.myAccountCurrentClass
                .updateCurrentMyAccountAminLog(
                    updateMyUserInfo,
                    this.$route.params.currentUserId ?? ""
                )
                .then((response) => {
                    if (response.data.success == true) {
                        ElMessage.success(response.data.message);
                        return;
                    }
                })
                .catch((error) => {
                    console.log(this.userProfile);
                    ElMessage.error(
                        error.response?.message || error.response.data?.message
                    );
                    this.notificationMGUserInfoUpdated = error.response?.data;
                });
        },
    },
};
</script>
