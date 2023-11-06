<template>
  <account-layout
    v-if="isSessionActiveProfile"
    class="user-profile-wrapper"
    active-route="profile"
    :class="{'email-login': !loggedInWithEmail}"
  >
    <template v-slot:rightArea>

      <div
        class="spinner-wrapper flex"
        v-if="fetchingProfileData"
      >
        <spinner
          :radius="100"
        />
      </div>
      <!-- User Profile -->
      <div v-else class="card">
        <h5 class="ptb-10 plr-20 plr-sm-15 b-b bold flex sided mlr-0">
          {{ $t('accountLayout.myProfile') }}
        </h5>
        <div
          class="flex wrap sided align-start p-20 pb-0 p-sm-15 pb-sm pb-xs"
        >
          <div>
            <div class="input-wrap">
              <label>
                {{ $t('accountLayout.loggedWith') }}
              </label>
              <p>{{ loggedInWith }}</p>
            </div>

            <form
              class="user-form mt-20 mt-sm-15"
              @submit.prevent="updateUserProfile"
            >
              <p class="form-title">
                {{ $t('accountLayout.updateProfile') }}
              </p>

              <div
                class="input-wrap"
                :class="{invalid: !name && hasProfileError}"
              >
                <label>
                  {{ $t('addressPopup.name') }}
                </label>
                <div class="icon-input">
                  <i
                    class="icon-ms user-icon"
                  />
                  <input
                    type="text"
                    v-model="name"
                    :placeholder="$t('addressPopup.name')"
                  >
                </div>
                <span
                  class="error"
                  v-if="!name && hasProfileError"
                >
                    {{ $t('addressPopup.isRequired', { type: $t('addressPopup.name')}) }}
                  </span>
              </div>

              <div class="flex j-end m-0">
                <ajax-button
                  class="primary-btn plr-30 plr-sm-15"
                  :fetching-data="profileSubmitting"
                  :text="$t('accountLayout.updateProfile')"
                />
              </div>
            </form>
          </div>

          <!-- Updated Password (v-if="loggedInWithEmail") -->
          <div>
            <form class="user-form" @submit.prevent="updatePassword">
              <p class="form-title">
                {{ $t('accountLayout.updatePassword') }}
              </p>
              <!-- PAssword -->
              <div
                class="input-wrap"
                :class="{invalid: !currentPassword && hasPasswordError}"
              >
                <label>
                  {{ $t('accountLayout.currentPassword') }}
                </label>
                <password-field
                  :value="currentPassword"
                  @input="event => currentPassword = event.target.value"
                />
                <span
                  class="error"
                  v-if="!currentPassword && hasPasswordError"
                >
                    {{ $t('addressPopup.isRequired', {type: $t('accountLayout.currentPassword') }) }}
                  </span>
              </div>
              {{ currentPassword.target }}
              <div class="input-wrap" :class="{invalid: !passwordValid && hasPasswordError}">
                <label>
                     {{ $t('accountLayout.password') }}
                </label>
                <password-field
                  :value="newPassword"
                 @input="event => newPassword = event.target.value"
                />
                <span
                  class="error"
                  v-if="!newPassword && hasPasswordError"
                >
                     {{ $t('addressPopup.isRequired', {type: $t('accountLayout.password') }) }}
                  </span>
                <span
                  class="error"
                  v-else-if="invalidPassword && hasPasswordError"
                >
                    {{ $t('accountLayout.invalidLength') }}
                  </span>
              </div>
              <div
                class="input-wrap"
                :class="{invalid: (!passwordValid || confirmPassword !== newPassword)  && hasPasswordError}"
              >
                <label>
                  {{ $t('accountLayout.confirmPassword') }}
                </label>
                <password-field
                    :value="confirmPassword"
                    @input="event => confirmPassword = event.target.value"
                />
                <span
                  class="error"
                  v-if="!confirmPassword && hasPasswordError"
                >
                     {{ $t('addressPopup.isRequired', {type: $t('accountLayout.confirmPassword') }) }}
                  </span>
                <span
                  class="error"
                  v-else-if="confirmPassword !== newPassword && hasPasswordError"
                >
                     {{ $t('accountLayout.noMatch') }}
                  </span>
              </div>
              <!-- Updated Password -->
              <div class="flex j-end m-0">
                <ajax-button
                  class="primary-btn plr-30"
                  :fetching-data="passwordSubmitting"
                  :loading-text="$t('accountLayout.updatingPassword')"
                  :text="$t('accountLayout.updatePassword')"
                />
              </div>
            </form>
          </div>
        </div>


      </div>
    </template>
  </account-layout>
</template>

<!-- Script User Profile-->
<script>
  import CustomerServices from '@/services/administrator/customers/CustomerServices';
  import util from '@/mixin/util'
  import validation from '@/mixin/validation'
  import AccountLayout from '@/components/ui_component_new_frontend/AccountLayout'
  import Spinner from '@/components/ui_component_new_frontend/Spinner'
  import {mapGetters, mapActions} from 'vuex'
  import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
  import PasswordField from "@/components/ui_component_new_frontend/PasswordField";
  import { isLoggedIn } from "@/utils/auth/auth";

  export default {
    middleware: ['common-middleware', 'auth'],
    head() {
      return {
        title: 'Profile',
        meta: []
      }
    },
    created() {
        this.customerInfoServices = new CustomerServices();
        this.getCustomerProfileCurrentAuth();
    },
    data() {
      return {
        customerProfile: '',
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        hasProfileError: false,
        deletingAccount: false,
        hasPasswordError: false,
        profileSubmitting: false,
        passwordSubmitting: false,
        fetchingProfileData: false
      }
    },
    components: {
      PasswordField,
      AjaxButton,
      AccountLayout,
      Spinner
    },

    watch: {
      profile(value) {
        if (this.customerProfile) {
          this.name = value?.name_eng;
        }
      },
    },
    mixins: [util, validation],
    computed: {
      loggedInWithGoogle() {
        return this.profile && this.profile?.google_id
      },
      loggedInWithFacebook() {
        return this.profile && this.profile?.facebook_id
      },
      loggedInWithEmail() {
        return this.customerProfile && !this.customerProfile?.facebook_id && !this.profile?.google_id
      },
      invalidPassword() {
        return !this.isValidLength(this.newPassword)
      },
      passwordValid() {
        return this.newPassword && !this.invalidPassword
      },
      ...mapGetters('profile', ['profile'])
    },
    methods: {
        isSessionActiveProfile(){
            return isLoggedIn();
        },
        async deleteAccount() {
            if (confirm(this.$t('cartProductTile.deleteAlert'))) {
            this.deletingAccount = true

            const data = await this.deleteRequest({
                api: 'deleteAccount',
                requiredToken: true,
                lang: this.langCode,
            })
            this.deletingAccount = false


            if(data?.status === 200){
                this.setToastMessage(data.message)
                this.$auth.logout()
            }else {
                this.setToastError(data.data.form.join(', '))
            }
            this.deletingAccount = 0
            }
        },
        // Customer Info
        async getCustomerProfileCurrentAuth(){
            this.customerInfoServices.getCustomerInfoProfile()
                .then((profile) => {
                    if (!Array.isArray(profile) || !profile.length > 0) {
                        this.customerProfile = [];
                    }
                    if (!Array.isArray(profile) || profile !== undefined || profile !== null) {
                        this.customerProfile = profile ? profile : '';
                        this.name = profile?.name_eng ? profile?.name_eng : '';
                    }
                });
        },
       async updatePassword() {
        console.log(this.currentPassword)
        if (this.currentPassword && this.newPassword && (this.newPassword === this.confirmPassword)) {
             this.passwordSubmitting = true;
             const updateUserPassword = {
                    oldPassword: this.currentPassword,
                    newPassword: this.newPassword
                }
                this.customerInfoServices.updatedCustomerPasswordChange(updateUserPassword).then((response) => {
                    if (response.data.success === true) {
                        this.passwordSubmitting = false;
                        this.setToastMessage(response.data?.message)
                    }
                }).catch((err) => {
                    this.loggingOut()
                    this.setToastError(err.response.data.error.message)
                    if(err.response.data.error.error.errors){
                        for (let index = 0; index < err.response.data.error.error.errors.length; index++) {
                            const messageValidation = err.response.data.error.error.errors[index].message ?? '';
                            this.setToastError(messageValidation);
                        }
                    } 
                });
                this.passwordSubmitting = false;
        } else {
          this.hasPasswordError = true
        }
      },
      async loggingOut() {
        try {
          this.$auth.logout()
          this.emptyCartProduct()
        } catch (e) {
          return Promise.reject(e);
        }
      },
      async updateUserProfile() {
        if (this.name) {
            this.profileSubmitting = true
            const updateProfileFIled = {
                customerName: this?.name ? this?.name : ''
            }
           this.customerInfoServices.updatedCustomerProfile(updateProfileFIled).then((response) => {
                if (response.data.success === true) {
                    this.profileSubmitting = false;
                    this.setToastMessage(response.data?.message);
                    this.$router.push('/user/profile');
                }
            }).catch((err) => {
                this.setToastError(err.response.data.error.message);
                if(err.response.data.error.message){
                     for (let index = 0; index < err.response.data.error.message.length; index++) {
                        const messageValidation = err.response.data.error.error.errors[index].message ?? '';
                        this.hasError(messageValidation);
                        this.setToastError('Unscesffully updated customer info')
                     }
                }
            });
        } else {
          this.hasProfileError = true
        }
      },
      ...mapActions('cart', ['emptyCartProduct']),
      ...mapActions('common', ['setToastMessage', 'setToastError', 'deleteRequest']),
      ...mapActions('profile', ['updateProfile', 'updateUserPassword'])
    },
    async mounted() {
      if (this.profile) {
        this.email = this.profile?.email
        this.name = this.profile?.name
      }
    },
  }
</script>