<template>
    <div>
        <div class="">
            <div
                class="flex flex-column align-items-center justify-content-center border-bottom"
            >
                <a
                    href="#"
                    class="flex flex-column align-items-center justify-content-center"
                >
                    <img
                        src="../../assets/company_logo/geo_khm.png"
                        class="w-1 text-center"
                    />
                </a>
            </div>
            <div
                class="flex align-items-center justify-content-center overflow-hidden"
            >
                <div
                    class="flex flex-column align-items-center justify-content-center"
                >
                    <div class="px-4 py-4">
                        <div
                            class="w-full surface-card py-6 px-12 sm:px-8"
                            style="border-radius: 53px"
                        >
                            <div class="text-center mb-5">
                                <div class="text-900 text-3xl font-medium mb-3">
                                    Welcome, GEO-KHM!
                                </div>
                                <span class="text-600 font-medium"
                                    >Sign in to continue</span
                                >
                            </div>
                            <!-- Form Submit -->
                            <form
                                @submit.prevent="handleSubmit(!v$.$invalid)"
                                class="p-fluid w-25rem"
                            >
                                <!-- Input Email or Phone Number -->
                                <div class="field pb-2">
                                    <MazInput
                                        v-model="v$.userLogin.$model"
                                        label="Phone Number or Email *"
                                        :error="
                                            v$.userLogin.$invalid && submitted
                                        "
                                    />
                                    <small
                                        v-if="
                                            (v$.userLogin.$invalid &&
                                                submitted) ||
                                            v$.userLogin.$pending.$response
                                        "
                                        class="p-error"
                                        >{{
                                            v$.userLogin.required.$message.replace(
                                                "Value",
                                                "Phone Number or Email"
                                            )
                                        }}</small
                                    >
                                </div>
                                <!-- Input Password -->
                                <div class="field">
                                    <MazInput
                                        v-model="v$.password.$model"
                                        label="Password *"
                                        type="password"
                                        :error="
                                            v$.password.$invalid && submitted
                                        "
                                    />
                                    <small
                                        v-if="
                                            (v$.password.$invalid &&
                                                submitted) ||
                                            v$.password.$pending.$response
                                        "
                                        class="p-error"
                                        >{{
                                            v$.password.required.$message.replace(
                                                "Value",
                                                "Password"
                                            )
                                        }}</small
                                    >
                                </div>
                                <!--Forgot Password?-->
                                <div
                                    class="flex align-items-center justify-content-between mb-2 gap-2"
                                >
                                    <router-link
                                        to="/auth/register"
                                        class="font-medium no-underline hover:underline text-right cursor-pointer"
                                        style="font-size: 11px"
                                        >Don't have account?
                                    </router-link>
                                </div>

                                <!-- Messages MazDialog -->
                                <div class="form-group">
                                    <div
                                        v-if="messages"
                                        class="alert alert-danger p-error px-2 py-2"
                                        role="alert"
                                    >
                                        {{
                                            messages.userPassword["0"] ||
                                            messages.userLogin["0"] ||
                                            messages
                                        }}
                                    </div>
                                </div>
                                <!-- Button Submit -->
                                <MazBtn
                                    type="submit"
                                    color="danger"
                                    style="background-color: #c51b1e"
                                    :loading="userLoggedIn"
                                    >Sign In</MazBtn
                                >
                                <!-- Errors -->
                            </form>
                            <!-- Form Submit -->
                            <!-- Or Authencation with Socail Media -->
                            <div
                                class="bordert py-2 my-4 flex align-items-center justify-content-center text-lg"
                            >
                                <!-- <socailMedia/> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer for Auth Login -->
    <footer
        class="fixed-bottom w-full flex layout-footer index-1 w-full text-500 p-2 footer-login"
        style="background-color: #333"
    >
        <div class="container text-500 flex">
            ©️ {{ Date("YYYY") }} E-24market.com. All rights reserved.
        </div>
    </footer>
    <!-- <AppConfig simple /> -->
</template>

<!-- Login -->
<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ElLoading } from "element-plus";
// Components
// import socailMedia from "./socialmedia/SocialMedia.vue";
import MazInput from "maz-ui/components/MazInput";
// import { mapActions } from "vuex";
import Cookie from "js-cookie";
export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            userLogin: "",
            email: "",
            password: "",
            userLoggedIn: false,
            accept: null,
            submitted: false,
            showMessage: false,
            loading: [false, false, false],
            messages: "",
            results: "",
            isLoading: false,
            loginError: "",
        };
    },
    validations() {
        return {
            userLogin: {
                required,
            },
            email: {
                required,
                email,
            },
            password: {
                required,
            },
            accept: {
                required,
            },
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.initialState.status.loggedIn;
        },
    },
    methods: {
        // ...mapActions(["set_user"]),
        // Handle Submit Business Account
        async handleSubmit(isFormValid) {
            try {
                this.submitted = true;
                if (this.password != "" && this.userLogin != "") {
                    // Client to Serve
                    const data = {
                        userLogin: this.userLogin,
                        userPassword: this.password,
                    };
                    this.$store.dispatch("auth/login", data).then(
                        (response) => {
                            //Check validation
                            if (response.success == true) {
                                // this.set_user(response ?? []);
                                this.userLoggedIn = true;
                                this.$store.dispatch(
                                    "auth/setCurrentUser",
                                    response
                                );
                                this.$store.dispatch(
                                    "auth/setToken",
                                    Cookie.get("token")
                                );
                                if (response.userType === "Admin") {
                                    this.$router.push({
                                        path: "/vendor/user/list/crete-user-auth/ui-user-list",
                                    });
                                }
                                if (response.userType === "Vendor") {
                                    this.$router.push({
                                        path: "/vendor/user/list/crete-user-auth/ui-user-list",
                                    });
                                }
                                if (response.userType === "Delivery") {
                                    this.$router.push({
                                        path: "/vendor/user/list/crete-user-auth/ui-user-list",
                                    });
                                } else if (response.userType === "Customer") {
                                    this.$router.push({ path: "/" });
                                }
                                let loadingAuthLogin = ElLoading.service({
                                    lock: true,
                                    text: "Please waiting...",
                                    background: "rgb(255,250,250)",
                                });
                                setTimeout(() => {
                                    loadingAuthLogin.close();
                                    window.location.reload();
                                }, 2000);
                                return;
                            } else {
                                throw response;
                            }
                        },
                        (error) => {
                            console.log(error);
                            this.userLoggedIn = false;
                            if (typeof error.response.data.name !== undefined) {
                                this.$notify.error({
                                    title: "Error SigIn",
                                    setTimeout: 10,
                                    message: error.response.data.error?.message,
                                });
                            }
                            if (
                                typeof error.response.data.error.error !==
                                undefined
                            ) {
                                this.loginError =
                                    error.response.data.error ?? "";
                                this.$notify.error({
                                    title:
                                        error.response.data?.message ??
                                        "Error Sign In",
                                    message:
                                        error.response.data.error.error
                                            .userPassword[0] ?? "",
                                });
                            }
                        }
                    );
                }
                if (!isFormValid) {
                    this.userLoggedIn = true;
                    setTimeout(
                        function () {
                            this.userLoggedIn = false;
                        }.bind(this),
                        1000
                    );
                    return;
                }
            } catch (error) {
                // Message Error
                this.userLoggedIn = false;
                this.messages = [{ severity: "success", content: error }];
            }
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
            if (!this.showMessage) {
                this.resetForm();
            }
        },
        resetForm() {
            this.userLogin = "";
            this.email = "";
            this.password = "";
            this.accept = null;
            this.submitted = false;
        },
    },
    components: {
        // socailMedia,
        MazInput,
    },
};
</script>

<style>
.footer-login {
    position: fixed;
    height: 100px;
    bottom: 0;
    width: 100%;
}
</style>
