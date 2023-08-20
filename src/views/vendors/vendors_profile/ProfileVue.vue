<template>
   <div class="px-4 py-4">
     <b-row>
        <b-col lg="12">
            <b-card>
                <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="d-flex flex-wrap align-items-center">
                        <div class="profile-img position-relative me-3 mb-3 mb-lg-0 profile-logo profile-logo1">
                             <img v-if="urlProfile" class="img-fluid rounded-pill avatar-100 rounded-pill" :src="urlProfile" @click="selectImage" />
                            <!-- Empty URL Image Uploads -->
                            <div  v-else>
                                 <img src="@/assets/img/avatars/01.png" alt="User-Profile"
                                    class="theme-color-default-img img-fluid rounded-pill avatar-100" loading="lazy" />
                                <img src="@/assets/img/avatars/avtar_1.png" alt="User-Profile"
                                    class="theme-color-purple-img img-fluid rounded-pill avatar-100" loading="lazy" />
                                <img src="@/assets/img/avatars/avtar_2.png" alt="User-Profile"
                                    class="theme-color-blue-img img-fluid rounded-pill avatar-100" loading="lazy" />
                                <img src="@/assets/img/avatars/avtar_4.png" alt="User-Profile"
                                    class="theme-color-green-img img-fluid rounded-pill avatar-100" loading="lazy" />
                                <img src="@/assets/img/avatars/avtar_5.png" alt="User-Profile"
                                    class="theme-color-yellow-img img-fluid rounded-pill avatar-100" loading="lazy" />
                                <img src="@/assets/img/avatars/avtar_3.png" alt="User-Profile"
                                    class="theme-color-pink-img img-fluid rounded-pill avatar-100" loading="lazy" />
                            </div>
                            <!-- Edit User Profile -->
                            <div class="upload-icone bg-primary">
                                <svg class="upload-button" width="14" height="14" viewBox="0 0 24 24"  @click="$refs.fileInput.click()">
                                    <path fill="#ffffff" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                </svg>
                                <input class="file-upload" ref="fileInput"  @change="onFileChangeProfileVen" enctype="multipart/form-data" type="file" accept=".jpg,.jpeg,.png" />
                            </div>
                        </div>
                        <div class="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                            <h4 class="me-2 h4">{{ currentFullNameUser ?? '' }}</h4>
                            <span> - {{ currentUserType ?? '' }}</span>
                        </div>
                    </div> 
                    <!-- Profile Tabs-->
                    <ul class="d-flex nav nav-pills mb-0 text-center profile-tab" data-toggle="slider-tab" id="profile-pills-tab" role="tablist">
                        <li class="nav-item">
                             <a class="nav-link active show" data-bs-toggle="tab" href="#profile-feed" role="tab" aria-selected="false">User Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#password-change" role="tab" aria-selected="false">Password</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#user-log-activity" role="tab" aria-selected="false">Login Activities</a>
                        </li>
                    </ul>
                </div>
            </b-card>
        </b-col>
        <!-- User Profile -->
        <b-col lg="12" class="px-2 py-2">
             <div class="profile-content tab-content iq-tab-fade-up">
                <!-- User Profiles -->
                <div id="profile-feed" class="tab-pane fade active show">
                    <current-user-profile :userProfile="fileRawName"/>
                </div>
                <!-- Change Password -->
                <div id="password-change" class="tab-pane fade">
                    <change-password/>
                </div>
                <!-- Change Password -->
                <div id="user-log-activity" class="tab-pane fade">
                    <log-activities/>
                </div>
             </div>
        </b-col>
    </b-row>
   </div>
</template>
<!-- Script -->
<script>
import MyAccountAdminPanelInfoLogCurrent from "../../../services/authencations/users_info/VendorAdminUserInfo";
import ChangePassword from './ChangePasswordVue.vue';
import CurrentUserProfile from './CurrentUserProfile.vue';
import LogActivities from './LogActivities.vue';
import { ElMessage } from 'element-plus';
export default {
    data(){
      return {
        ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE,
        urlProfile: null,
        currentUserType: '',
        currentFullNameUser: '',
        currentProfileImg: '',
      }
    },
    created() {
        this.myAccountCurrentClass = new MyAccountAdminPanelInfoLogCurrent()
    },
    mounted() {
        this.editCurrentUserAccountInfo(this.$route.params.currentUserId ?? '');
    },
    components: {
       ChangePassword,
       CurrentUserProfile,
       LogActivities
    },
    methods: {
        async editCurrentUserAccountInfo(currentUserId){
            this.myAccountCurrentClass.currentMyAccountAdmin(currentUserId)
                .then((data) => {
                    try {
                        const {user_type}  = data?.userResult ?? '';
                        const {name_eng, profile} = data?.empResult ?? '';
                        this.currentUserType = user_type ?? '';
                        this.currentFullNameUser = name_eng ?? '';
                        this.currentProfileImg = profile ?? '';
                    } catch (error) {
                        ElMessage.error(error);
                    }
                }
            );
        }
    }
}
</script>
