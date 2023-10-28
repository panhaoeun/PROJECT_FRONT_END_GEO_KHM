<template>
  <nav :class="`nav navbar navbar-expand-xl navbar-light iq-navbar`">
    <!-- <nav :class="`nav navbar navbar-expand-xl navbar-light iq-navbar ${headerNavbar} ${navbarHide.join('')}`"> -->
    <div class="container-fluid navbar-inner">
      <slot></slot>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon">
          <span class="mt-2 navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
         <!--Languages Multiple-->
         <Languagesi18N/>
          <li class="nav-item dropdown">
            <a href="#" class="nav-link" id="notification-drop" data-bs-toggle="dropdown">
              <icon-component type="dual-tone" icon-name="bell"></icon-component>
              <span class="bg-danger dots"></span>
            </a>
            <div class="p-0 sub-drop dropdown-menu dropdown-menu-end" aria-labelledby="notification-drop">
              <b-card no-body class="m-0 shadow-none">
                <div class="py-3 card-header d-flex justify-content-between bg-primary">
                  <b-card-title>
                    <h5 class="mb-0 text-white">All Notifications</h5>
                  </b-card-title>
                </div>
                <!-- <b-card-body class="p-0">
                  <a href="#" class="iq-sub-card">
                    <div class="d-flex align-items-center">
                      <img class="avatar-40 rounded-pill bg-soft-primary p-1" src="../../../assets/img/shapes/01.png" alt="" />
                      <div class="ms-3 w-100">
                        <h6 class="mb-0">Emma Watson Bni</h6>
                        <div class="d-flex justify-content-between align-items-center">
                          <p class="mb-0">95 MB</p>
                          <small class="float-end font-size-12">Just Now</small>
                        </div>
                      </div>
                    </div>
                  </a>
                </b-card-body> -->
              </b-card>
            </div>
          </li>
        
          <li class="nav-item dropdown">
            <a href="#" class="nav-link" id="mail-drop" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <icon-component type="dual-tone" icon-name="message"></icon-component>
              <span class="bg-primary count-mail"></span>
            </a>
            <div class="p-0 sub-drop dropdown-menu dropdown-menu-end" aria-labelledby="mail-drop">
              <b-card no-body class="m-0 shadow-none">
                <div class="py-3 card-header d-flex justify-content-between bg-primary">
                  <b-card-title>
                    <h5 class="mb-0 text-white">All Message</h5>
                  </b-card-title>
                </div>
                <b-card-body class="p-0">
                  <a href="#" class="iq-sub-card">
                    <div class="d-flex align-items-center">
                      <div class="">
                        <img class="avatar-40 rounded-pill bg-soft-primary p-1" src="../../../assets/img/shapes/01.png" alt="" />
                      </div>
                      <div class="ms-3">
                        <h6 class="mb-0">Bni Emma Watson</h6>
                        <small class="float-start font-size-12">13 Jun</small>
                      </div>
                    </div>
                  </a>
                </b-card-body>
              </b-card>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="../../../assets/img/avatars/01.png" alt="User-Profile" class="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
              <img src="../../../assets/img/avatars/avtar_1.png" alt="User-Profile" class="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded" />
              <img src="../../../assets/img/avatars/avtar_2.png" alt="User-Profile" class="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded" />
              <img src="../../../assets/img/avatars/avtar_4.png" alt="User-Profile" class="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded" />
              <img src="../../../assets/img/avatars/avtar_5.png" alt="User-Profile" class="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded" />
              <img src="../../../assets/img/avatars/avtar_3.png" alt="User-Profile" class="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded" />
              <div class="caption ms-3 d-none d-md-block">
                <h6 class="mb-0 caption-title">{{ user ? user[0]?.name_eng ?? user[0]?.full_latin_name : 'E-24market' }}</h6>
                <p class="mb-0 caption-sub-title"> {{ user?user[1].typeUser : 'E-24market' }}</p>
              </div>
            </a>
            <ul v-if="user" class="dropdown-menu dropdown-menu-end px-2 py-2" aria-labelledby="navbarDropdown">
                  <li><router-link class="dropdown-item" :to="{path: `/vendor-profile/vendor-profile/${user[0]?.user_id ?? ''}`, currentUserId: user[0]?.user_id ?? ''}">Profile</router-link></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><span class="dropdown-item cursor-pointer" @click="authVenAdLogout">Logout</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Languagesi18N from "./languages_i18n/Languagesi18n";
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex';
import { isLoggedIn } from "@/utils/auth/auth";
export default {
  components: {
    Languagesi18N
  },
  props: {
    isGoPro: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isSessionActiveVendor(){
        return isLoggedIn();
    },
  },    
  setup(props, { emit }) {
    const store = useStore()
    // const headerNavbar = computed(() => store.getters['setting/header_navbar'])
    const isHidden = ref(false)

    const onscroll = () => {
      const yOffset = document.documentElement.scrollTop
      const navbar = document.querySelector('.navs-sticky')
      if (navbar !== null) {
        if (yOffset >= 100) {
          navbar.classList.add('menu-sticky')
        } else {
          navbar.classList.remove('menu-sticky')
        }
      }
    }

    const carts = computed(() => store.getters.carts)

    onMounted(() => {
      window.addEventListener('scroll', onscroll())
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', onscroll())
    })
    return {
    //   headerNavbar,
      isHidden,
      carts,
      emit
    }
  }
}
</script>
<!-- Script Setup -->
<script setup>
import AuthenticationsDataService from '../../../services/authencationDataService';
// import { useRouter } from "vue-router";
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import { useAuthStoreToken } from "../../../utils/auth/AuthStoreTokenJWT";
const { user } = storeToRefs(useAuthStoreToken());
const { setAuthUser } = useAuthStoreToken();
// const router = useRouter();


function authVenAdLogout() {
    try {
        /*
            Auto Return To Login
        */
        AuthenticationsDataService.authLogout().then((response) => {
            ElMessage.success(response.data.message);
            window.location.reload();
            localStorage.clear('token');
            localStorage.clear('tokenExpiry');
            localStorage.clear('expiresIn')
            localStorage.clear('user');
            localStorage.clear('userId');
            setAuthUser(null);
            this.$route.push("/auth/login");
            /**
             * Delete Cookies
             * */
            deleteAllCookies();
        }).catch((error) => {
            return Promise.reject(error);
        });
    } catch (error) {
       Promise.reject(error);
    }
}
function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + `=;expires=${new Date(
            0
        ).toUTCString()}`;
    }
}
</script>