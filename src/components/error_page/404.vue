<template>
    <div class="gradient">
        <b-container>
            <img src="@/assets/img/error/404.png" class="img-fluid mb-4 w-50" alt="400" loading="lazy" />
            <h2 class="mb-0 mt-4 text-white">Oops! This Page is Not Found.</h2>
            <h2 class="mt-2 text-white text-center align-center">The requested page dose not exist.</h2>
           <div class="px-4 py-4">
             <router-link class="btn bg-white text-primary d-inline-flex align-items-center" to="/">Back to Home</router-link>
           </div>
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
