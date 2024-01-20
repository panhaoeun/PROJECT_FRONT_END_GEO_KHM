<template>
    <div class="gradient">
        <b-container>
            <img
                src="@/assets/img/error/404.png"
                class="img-fluid mb-4 w-50"
                alt="401"
                loading="lazy"
            />
            <h2 class="mb-0 mt-4 text-white">Unauthorized</h2>
            <p class="mt-2 text-white">Access to this resource</p>
            <router-link
                class="btn bg-white text-primary d-inline-flex align-items-center"
                to="/vendor/user/list/crete-user-auth/ui-user-list"
                >Back to Home</router-link
            >
        </b-container>
        <div class="box">
            <div class="c xl-circle">
                <div class="c lg-circle">
                    <div class="c md-circle">
                        <div class="c sm-circle">
                            <div class="c xs-circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
