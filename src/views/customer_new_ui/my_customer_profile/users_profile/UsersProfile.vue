<template>
  <account-layout
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

      <div v-else class="card">
        <h5 class="ptb-10 plr-20 plr-sm-15 b-b bold flex sided mlr-0">
          {{ $t('accountLayout.myProfile') }}
            <!-- <ajax-button
                class="primary-btn plr-30 plr-sm-15"
                type="button"
                :fetching-data="deletingAccount"
                @clicked="deleteAccount"
                :text="$t('date.da')"
            /> -->
        </h5>
        <div
          class="flex wrap sided align-start p-20 pb-0 p-sm-15 pb-sm pb-xs"
        >
          <div>
            <div class="input-wrap">
              <label>
                {{ $t('addressPopup.email') }}
              </label>
              <p>{{ email }}</p>
            </div>

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
              <div
                class="input-wrap"
                :class="{invalid: !currentPassword && hasPasswordError}"
              >
                <label>
                  {{ $t('accountLayout.currentPassword') }}
                </label>
                <password-field
                  :value="currentPassword"
                  @change="currentPassword = $event"
                />
                <span
                  class="error"
                  v-if="!currentPassword && hasPasswordError"
                >
                    {{ $t('addressPopup.isRequired', {type: $t('accountLayout.currentPassword') }) }}
                  </span>
              </div>

              <div class="input-wrap" :class="{invalid: !passwordValid && hasPasswordError}">
                <label>
                  {{ $t('accountLayout.password') }}
                </label>

                <password-field
                  :value="newPassword"
                  @change="newPassword = $event"
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
                  @change="confirmPassword = $event"
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
  import util from '@/mixin/util'
  import validation from '@/mixin/validation'
  import AccountLayout from '@/components/ui_component_new_frontend/AccountLayout'
  import Spinner from '@/components/ui_component_new_frontend/Spinner'
  import {mapGetters, mapActions} from 'vuex'
  import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
  import PasswordField from "@/components/ui_component_new_frontend/PasswordField";

  export default {
    middleware: ['common-middleware', 'auth'],
    head() {
      return {
        title: 'Profile',
        meta: []
      }
    },
    data() {
      return {
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
        if (this.profile) {
          this.email = value?.email
          this.name = value?.name
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
        return this.profile && !this.profile?.facebook_id && !this.profile?.google_id
      },
      invalidPassword() {
        return !this.isValidLength(this.newPassword)
      },
      passwordValid() {
        return this.newPassword && !this.invalidPassword
      },
      ...mapGetters('user', ['profile'])
    },
    methods: {

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

      async updatePassword() {

        if (this.currentPassword && this.newPassword && (this.newPassword === this.confirmPassword)) {
          this.passwordSubmitting = true
          const data = await this.updateUserPassword({
            current_password: this.currentPassword,
            new_password: this.newPassword
          })
          if (data?.status === 201) {
            this.setToastError(data.data.form.join(', '))
          } else if (data?.status === 200) {
            this.loggingOut()
            this.setToastMessage(data.message)
          }
          this.passwordSubmitting = false
        } else {
          this.hasPasswordError = true
        }
      },
      async loggingOut() {
        try {
          this.$auth.logout()
          this.emptyCartProduct()
        } catch (e) {
          return this.$nuxt.error(e)
        }
      },
      async updateUserProfile() {
        if (this.name) {
          this.profileSubmitting = true
          const data = await this.updateProfile({
            name: this.name
          })
          this.profileSubmitting = false
          if (data?.status === 201) {
            this.setToastError(data.data.form.join(', '))

          } else if (data?.status === 200) {
            const updatedUser = {...this.$auth.user}
            updatedUser.name = data.data.name
            this.$auth.setUser(updatedUser)
            this.setToastMessage(data.message)
          } else if (data?.status !== 200) {
            this.hasError(data)
          }
        } else {
          this.hasProfileError = true
        }
      },
      ...mapActions('cart', ['emptyCartProduct']),
      ...mapActions('common', ['setToastMessage', 'setToastError', 'deleteRequest']),
      ...mapActions('user', ['updateProfile', 'updateUserPassword'])
    },
    async mounted() {
      if (this.profile) {
        this.email = this.profile?.email
        this.name = this.profile?.name
      }
    },
  }
</script>