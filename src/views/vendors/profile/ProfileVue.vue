<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="card align-items-center">
                    <div class="profile">
                        <img src="https://yoori.spagreen.net/public/images/default/user.jpg" alt="" width="100" srcset="" />
                    </div>
                    <strong>Testing Name</strong>
                    <span>admin@gmail.com</span>
                    <div class="w-100">
                        <div>
                            <button type="button" class="d-flex align-items-start btn btn-light text-blue w-100">
                                <i class="fa fa-user m-1"></i> Profile
                            </button>
                        </div>
                        <br />
                        <div>
                            <button type="button" class="d-flex align-items-start btn btn-light text-blue w-100">
                                <i class="fa fa-list m-1"></i> Login Ativiities
                            </button>
                        </div>
                        <br />
                        <div>
                            <button type="button" class="d-flex align-items-start btn btn-light text-blue w-100">
                                <i class="fa fa-exchange-alt m-1"></i> Change
                                Password
                            </button>
                        </div>
                        <br />
                        <div>
                            <button type="button" class="d-flex align-items-start btn btn-light text-blue w-100">
                                <i class="fa fa-sign-out-alt m-1"></i> <LogoutModal></LogoutModal>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-7 card ml-4">
                <personal-info></personal-info>
            </div>
        </div>
    </div>
</template>
<script>
import PersonalInfo from "./profileComponents/PersonalInfoVue.vue";
import LogoutModal from "./profileComponents/LogoutModal.vue";
export default {
    name: "profile",
    components: {
        PersonalInfo,
        LogoutModal,
    },
};
</script>
<style scoped>
.profile {
    align-items: center;
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 10px;
}
</style>
