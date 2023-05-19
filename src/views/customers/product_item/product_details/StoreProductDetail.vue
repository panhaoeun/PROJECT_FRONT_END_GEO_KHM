<template>
    <div class="container">
       <div class="row">
            <!-- Slider Top Seller Products -->
            <div class="product-extend-sidebar col-lg-12 col-md-12 col-sm-12">
                <!-- Products Detail and Shops Details -->
                <div class="card">
                 <div class="product_details_tabs">
                    <!--Tab View -->
                    <el-tabs v-model="activeName">
                        <!-- Tab 01 -->
                        <el-tab-pane label="Description"  name="desTabPanel" active id="description">
                            <div class="product_description">
                            <p>
                                Curabitur arcu erat, accumsan id imperdiet et, porttitor
                                at sem. Vestibulum ac diam sit amet quam vehicula
                                elementum sed sit amet dui. Sed porttitor lectus nibh.
                                Vivamus magna justo, lacinia eget consectetur sed,
                                convallis at tellus. Sed porttitor lectus nibh. Donec
                                sollicitudin molestie malesuada. Vivamus magna justo,
                                lacinia eget consectetur sed, convallis at tellus.
                                Curabitur arcu erat, accumsan id imperdiet et, porttitor
                                at sem.
                            </p>
                            <ul>
                                <li>Vivamus magna justo, lacinia eget consectetur sed</li>
                                <li>Curabitur aliquet quam id dui posuere blandit</li>
                                <li>
                                Mauris blandit aliquet elit, eget tincidunt nibh
                                pulvinar
                                </li>
                            </ul>
                            <p>
                                Donec sollicitudin molestie malesuada. Cras ultricies
                                ligula sed magna dictum porta. Mauris blandit aliquet
                                elit, eget tincidunt nibh pulvinar a. Nulla porttitor
                                accumsan tincidunt. Cras ultricies ligula sed magna dictum
                                porta. Curabitur arcu erat, accumsan id imperdiet et,
                                Pellentesque in ipsum id orci porta dapibus. Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit. porttitor at
                                sem. Quisque velit nisi, pretium ut lacinia in, elementum
                                id enim.
                            </p>
                            </div>
                        </el-tab-pane>
                        <!-- Tab 02 -->
                        <el-tab-pane label="Additional Information" name="addTabPanel" id="additional">
                            <div class="product_additional">
                            <ul>
                                <li>Weight: <span>400 g</span></li>
                                <li>Dimensions: <span>10 x 10 x 15 cm</span></li>
                                <li>
                                Materials: <span> 60% cotton, 40% polyester</span>
                                </li>
                                <li>
                                Other Info:
                                <span>
                                    American heirloom jean shorts pug seitan
                                    letterpress</span
                                >
                                </li>
                            </ul>
                            </div>
                        </el-tab-pane>
                        <!-- Tab 03 -->
                        <el-tab-pane label="Reviews" name="reviewTabPanel" id="review">
                            <div class="product_reviews">
                            <ul>
                                <li class="media">
                                <div class="media-img">
                                    <img
                                    :src="require('@/assets/img/user/user1.png')"
                                    alt="img"
                                    />
                                </div>
                                <div class="media-body">
                                    <div class="media-header">
                                    <div class="media-name">
                                        <h4>Sara Anela</h4>
                                        <p>5 days ago</p>
                                    </div>
                                    <div class="post-share">
                                        <a href="#!" class="replay">Replay</a>
                                        <a href="#!" class="">Report</a>
                                    </div>
                                    </div>
                                    <div class="media-pragraph">
                                        <div class="product_review_strat">
                                            <span
                                            ><a href="#!"><i class="fas fa-star"></i></a
                                            ></span>
                                            <span
                                            ><a href="#!"><i class="fas fa-star"></i></a
                                            ></span>
                                            <span
                                            ><a href="#!"><i class="fas fa-star"></i></a
                                            ></span>
                                            <span
                                            ><a href="#!"><i class="fas fa-star"></i></a
                                            ></span>
                                            <span
                                            ><a href="#!"><i class="fas fa-star"></i></a
                                            ></span>
                                        </div>
                                        <p>
                                            Cras sit amet nibh libero, in gravida nulla. Nulla
                                            vel metus scelerisque Praesent sapien massa,
                                            convallis a pellentesque nec, egestas non nisi.
                                            Cras ultricies ligula sed magna dictum porta.
                                            Vestibulum ac diam sit amet quam vehicula
                                            elementum sed sit amet dui. Vivamus magna justo.
                                        </p>
                                    </div>
                                </div>
                                </li>
                                <li class="media">
                                <div class="media-img">
                                    <img
                                    :src="require('@/assets/img/user/user2.png')"
                                    alt="img"
                                    />
                                </div>
                                <div class="media-body">
                                    <div class="media-header">
                                    <div class="media-name">
                                        <h4>Sara Anela</h4>
                                        <p>5 days ago</p>
                                    </div>
                                    <div class="post-share">
                                        <a href="#!" class="replay">Replay</a>
                                        <a href="#!" class="">Report</a>
                                    </div>
                                    </div>
                                    <div class="media-pragraph">
                                    <div class="product_review_strat">
                                        <span
                                        ><a href="#!"><i class="fas fa-star"></i></a
                                        ></span>
                                        <span
                                        ><a href="#!"><i class="fas fa-star"></i></a
                                        ></span>
                                        <span
                                        ><a href="#!"><i class="fas fa-star"></i></a
                                        ></span>
                                        <span
                                        ><a href="#!"><i class="fas fa-star"></i></a
                                        ></span>
                                        <span
                                        ><a href="#!"><i class="fas fa-star"></i></a
                                        ></span>
                                    </div>
                                    <p>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla
                                        vel metus scelerisque Praesent sapien massa,
                                        convallis a pellentesque nec, egestas non nisi.
                                        Cras ultricies ligula sed magna dictum porta.
                                        Vestibulum ac diam sit amet quam vehicula
                                        elementum sed sit amet dui. Vivamus magna justo.
                                    </p>
                                    </div>
                                </div>
                                </li>
                                <li class="media">
                                <div class="media-img">
                                    <img
                                    :src="require('@/assets/img/user/user3.png')"
                                    alt="img"
                                    />
                                </div>
                                <div class="media-body">
                                    <div class="media-header">
                                    <div class="media-name">
                                        <h4>Sara Anela</h4>
                                        <p>5 days ago</p>
                                    </div>
                                    <div class="post-share">
                                        <a href="#!" class="replay">Replay</a>
                                        <a href="#!" class="">Report</a>
                                    </div>
                                    </div>
                                    <div class="media-pragraph">
                                    <div class="product_review_strat">
                                        <span
                                        ><a href="#!"><i class="fas fa-star"></i></a
                                        ></span>
                                        <span
                                        ><a href="#!"><i class="fas fa-star"></i></a
                                        ></span>
                                        <span
                                        ><a href="#!"><i class="fas fa-star"></i></a
                                        ></span>
                                        <span
                                        ><a href="#!"><i class="fas fa-star"></i></a
                                        ></span>
                                        <span
                                        ><a href="#!"><i class="fas fa-star"></i></a
                                        ></span>
                                    </div>
                                    <p>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla
                                        vel metus scelerisque Praesent sapien massa,
                                        convallis a pellentesque nec, egestas non nisi.
                                        Cras ultricies ligula sed magna dictum porta.
                                        Vestibulum ac diam sit amet quam vehicula
                                        elementum sed sit amet dui. Vivamus magna justo.
                                    </p>
                                    </div>
                                </div>
                                </li>
                            </ul>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
               </div>
                <!-- Top Seller Products -->
                <div class="card">
                    <div class="single category">
                        <h3 class="side-title">Top Selling</h3>
                        <MazCarousel>
                            <template #title></template>
                                <MazCard
                                        v-for="(item, i) in Array(8)"
                                        :key="i"
                                        :images="[
                                            'https://ae01.alicdn.com/kf/S0b1cabc0b92a4cbfae377ce9db93ecbdJ/Y50-Bluetooth-Earphone-Outdoor-Sports-Wireless-Headset-5-0-With-Charging-Bin-Power-Display-Touch-Control.jpg_480x480q90.jpg'
                                        ]"
                                        style="min-width: 170px;"
                                        >
                                    <template #title>
                                    <!-- Tittle -->
                                    <p class="maz-m-0 text-dark cursor-pointer hover:outline">
                                        LG OLED Evo C2 Series 48" 4K UHD Smart TV - 2022 Model
                                    </p>
                                </template>
                                    <template #content>
                                        <p class="maz-text-muted" style="margin-bottom: 0;">
                                            <span>US $946.99</span>
                                        </p>
                                    </template>
                                </MazCard>
                        </MazCarousel>
                    </div>
                </div>
            </div>
       </div>
    </div>
</template>

<!-- Product Details -->
<script>
    import MazCarousel from 'maz-ui/components/MazCarousel'
    import MazCard from 'maz-ui/components/MazCard'
    export default {
        components: {
            MazCarousel,
            MazCard
        },
        data(){
            return{
                activeName: "desTabPanel"
            }
        }
    }
</script>