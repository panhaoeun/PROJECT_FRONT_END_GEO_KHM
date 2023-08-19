<template>
    <!-- Breadcrumb -->
    <div class="breadcrumb-area bg-bluegray-100">
        <div class="container">
            <div class="breadcrumb-content text-center">
                <ul>
                    <li>
                        <a href="index.html">Home</a>
                    </li>
                    <li class="active">Product Details</li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Product Detail Slider -->
    <div class="product-details-area pt-120 pb-115">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6">
                    <div class="product-details-tab">
                        <div class="pro-dec-big-img-slider">
                            <div class="easyzoom-style">
                                <div class="easyzoom easyzoom--overlay" v-if="productThumbnailRULFormate && productThumbnailRULFormate!== null">
                                    <a href="#">
                                        <img 
                                            :src="productThumbnailRULFormate ?? ''" 
                                            :aria-atomic="title"
                                        >
                                    </a>
                                </div>
                                <!-- Empty Thumbnail -->
                                <EmptyThumbnail v-else/>
                                <!-- Image Popup expandable -->
                                <a 
                                    data-mfp-src="image-for-popup.jpg"
                                    class="easyzoom-pop-up img-popup" 
                                    href="../../../../assets/img/product/b-large-1.jpg"
                                >
                                    <i class="icon-size-fullscreen"></i>
                                </a>
                            </div>
                        </div>
                        <!-- Product Multiple Image -->
                        <!-- {{ productImgMulti }} -->
                        <div class="product-dec-slider-small product-dec-small-style1" 
                            v-for="multiImg in productImgMulti.slice(0, 4)" 
                            :key="multiImg"
                        >        
                            <div class="product-dec-small"
                               v-for="(image,index) in multiImg" :key="index"
                            >
                                <img 
                                    v-on:mouseover="setActiveImageThumbnail(index)"
                                    :src="productMultiImgURLFormate(image?.fileName)"
                                    :alt="image?.fileName"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="product-details-content pro-details-content-mrg">
                        <h2>{{title ?? '7Day'}}</h2>
                        <div class="product-ratting-review-wrap" v-if="rating">
                            <div class="product-ratting-digit-wrap">
                                <div class="product-ratting">
                                  <i v-for="rating in productRating" :key="rating" class="icon_star"></i>
                                </div>
                            </div>
                            <!-- <div class="product-review-order">
                                <span>242 orders</span>
                            </div> -->
                        </div>
                        <div class="pro-details-price">
                            <span class="new-price">{{ productUnitPrice ?? 0 }}</span>
                            <!-- <span class="old-price">$95.72</span> -->
                        </div>
                        <!-- Product Spec -->
                        <div class="pro-details-size" v-if="productSpec">
                            {{ productSpec }}
                            <!-- <span>Size:</span>
                            <div class="pro-details-size-content">
                                <ul>
                                    <li><a href="#">XS</a></li>
                                </ul>
                            </div> -->
                        </div>
                        <div class="pro-details-quality">
                            <span>Quantity:</span>
                            <div class="cart-plus-minus">
                                <input class="cart-plus-minus-box" type="text" name="qtybutton" value="1"/>
                            </div>
                        </div>
                        <div class="product-details-meta">
                            <ul>
                                <li>
                                    <span>Categories:</span> <a href="#">{{ categories ?? '' }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="pro-details-action-wrap" style="font-weight: 500">
                            <!-- Add To Cart -->
                             <div class="pro-details-add-to-cart">
                                <MazBtn color="danger" size="lg"  class="font-bold btn-red" @click.prevent="addProductItemsToCart()" style="background-color:#0053a0; padding: 18px 50px 17px;border-radius: 0%;">Add To Cart</MazBtn>
                             </div>
                            <div class="pro-details-add-to-cart-red">
                                <MazBtn color="danger" size="lg"  class="font-bold btn-red" style="background-color:red; padding: 18px 50px 17px; border-radius: 0%;">Buy It Now</MazBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- Script -->
<script>
    import EmptyThumbnail from "../../../../components/error_page/EmptyThumbnail.vue";
    import { mapActions, mapState } from "vuex";
    import $ from "jquery";
    export default {
        components: {
            EmptyThumbnail
        },
        props: {
            title: {type: String},
            productThumbnail: {type: String, required: true, default: ''},
            productImgMulti: {type: Array, required: true},
            productSpec: {type: Array, default: Array.isArray() ?? []},
            productQty: {type: Number, default : 1},
            productRating: {type: Number},
            productUnitPrice: {type: Number},
            categories: {type: String},
            productArrDetail: {type: Array,default: Array.isArray() ?? []}
        },
        data(){
            return{
                quantity: 1,
                activeImageThumbnail: this.productThumbnail,
                ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE.replace("https", "http"),
                multipleImgPATH: '',
                quantityItemOrder: 1
            }
        },
        created(){
            this.productDesSliderSmall();
        },  
        methods: {
            ...mapActions('cart',["addToCart"]),
            /**
             * Add TO CART
             * BUY IT NOW 
            * */ 
           async addProductItemsToCart(){
               const qtyItem =  document.getElementsByClassName('cart-plus-minus-box');
                let itemProduct = {
                    ...Array(this.productArrDetail ?? []),
                    quantity: parseInt((parseInt(qtyItem[0].value ?? 0))),
                    unitPrice: parseFloat((parseFloat(this.productUnitPrice))),
                    productSpec: this.productSpec ?? []
                }
                this.$store.dispatch("cart/addToCart", itemProduct);
           },
            /**
             * Product Thumbnail
             * Product Small Carousel 
             * */ 
            productMultiImgURLFormate(filePath){ 
                return this.ENV_HOST_PATH_FILE + `uploads/products_img/list_img_products/` + String(filePath);
            },
            setActiveImageThumbnail(index){
                const proxy = new Proxy(this.productImgMulti, {});
                const arrayImg = JSON.parse(JSON.stringify(proxy));
                console.log( String(arrayImg[0][index].fileName) ?? []);
            },
            productDesSliderSmall(){
                $(document).ready(function() {
                    /*------- Color active -----*/
                    $('.pro-details-color-content').on('click', 'a', function(e){
                        e.preventDefault();
                        $(this).addClass('active').parent().siblings().children('a').removeClass('active');
                    });
                    $('.pro-details-size-content').on('click', 'a', function(e){
                        e.preventDefault();
                        $(this).addClass('bg-red-500').parent().siblings().children('a').removeClass('bg-red-500');
                    });
                     /*----------------------------
                        Cart Plus Minus Button
                    ------------------------------ */
                    var cartPlusMinus = $('.cart-plus-minus');
                    cartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
                    cartPlusMinus.append('<div class="inc qtybutton">+</div>');
                    $(".qtybutton").on("click", function() {
                        var $button = $(this);
                        var oldValue = $button.parent().find("input").val();
                        if ($button.text() === "+") {
                            var newVal = !isNaN(oldValue) && parseFloat(oldValue) + 1;
                        } else {
                            // Don't allow decrementing below zero
                            if (oldValue > 1) {
                                // eslint-disable-next-line no-redeclare
                                var newVal =  !isNaN(oldValue) &&  parseFloat(oldValue) - 1;
                            } else { 
                                newVal = 1;
                            }
                        }
                        $button.parent().find("input").val(newVal);
                    });
                    
                    /*-------------------------------------
                    Product details big image slider
                    ---------------------------------------*/
                    $('.pro-dec-big-img-slider').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        draggable: false,
                        fade: false,
                        asNavFor: '.product-dec-slider-small',
                    });
                    /*---------------------------------------
                        Product details small image slider
                    -----------------------------------------*/
                    $('.product-dec-slider-small').slick({
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        asNavFor: '.pro-dec-big-img-slider',
                        dots: false,
                        focusOnSelect: true,
                        fade: false,
                        prevArrow: '<span class="pro-dec-prev"><i class="icon-arrow-left"></i></span>',
                        nextArrow: '<span class="pro-dec-next"><i class="icon-arrow-right"></i></span>',
                        responsive: [{
                                breakpoint: 991,
                                settings: {
                                    slidesToShow: 3,
                                }
                            },
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 4,
                                }
                            },
                            {
                                breakpoint: 575,
                                settings: {
                                    slidesToShow: 2,
                                }
                            }
                        ]
                    });
                });
            },
            /**
             * Product Thumbnail
             * Product Small Carousel 
            * */   
        },
        computed: {
            ...mapState('cart',['cart']),
            productThumbnailRULFormate(){
                return this.ENV_HOST_PATH_FILE + `uploads/products_img/thumbnail/` + String(this.productThumbnail) ?? '';
            },
        } 
    }
  </script>