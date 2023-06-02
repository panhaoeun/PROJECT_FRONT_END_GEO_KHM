<template>
    <!-- Product variation -->
    <section id="electronics_banner_bottom" class="ptb-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-12 ">
                    <div class="el_banner_bottom el-ban-bottom-left">
                        <router-link to="/shop">
                          <img :src="require('@/assets/img/banner/small-banner.jpg')" alt="img">
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <div class="el_banner_bottom">
                        <router-link to="/shop">
                          <img :src="require('@/assets/img/banner/small-banner01.jpg')" alt="img">
                        </router-link>
                    </div>
                    <div class="el_banner_bottom">
                        <router-link to="/shop">
                          <img :src="require('@/assets/img/banner/small-banner02.jpg')" alt="img">
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="el_feature_wrappers">
                <div class="row">
                    <div class="col-sm-6 col-md-6 col-lg-3">
                        <div class="el_feature_box">
                            <img :src="require('@/assets/img/electronics/icon/world.png')" alt="img">
                            <div class="el_feature_text">
                                <h3>Free Returns</h3>
                                <p>Returns are free within 9 days</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-3">
                        <div class="el_feature_box">
                            <img :src="require('@/assets/img/electronics/icon/lock.png')" alt="img">
                            <div class="el_feature_text">
                                <h3>100% Payment Secure</h3>
                                <p>Your payment are safe with us.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-3">
                        <div class="el_feature_box">
                            <img :src="require('@/assets/img/electronics/icon/phone.png')" alt="img">
                            <div class="el_feature_text">
                                <h3>Support 24/7</h3>
                                <p>Contact us 24 hours a day</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
</template>