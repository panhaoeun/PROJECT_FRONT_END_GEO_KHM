<template>
    <div class="related-product pb-115 bg-white">
    <div class="container">
        <div class="section-title mb-45 text-center">
            <h2>Related Product</h2>
        </div>
        <div class="related-product-active">
            <div class="product-plr-1">
                <div class="single-product-wrap">
                    <div class="product-img product-img-zoom mb-15">
                        <a href="product-details.html">
                            <img src="../../../../assets/img/product/product-14.jpg" alt="">
                        </a>
                        <div class="product-action-2 tooltip-style-2">
                            <button title="Wishlist"><i class="icon-heart"></i></button>
                            <button title="Quick View" data-toggle="modal" data-target="#exampleModal"><i class="icon-size-fullscreen icons"></i></button>
                            <button title="Compare"><i class="icon-refresh"></i></button>
                        </div>
                    </div>
                    <div class="product-content-wrap-2 text-center">
                        <div class="product-rating-wrap">
                            <div class="product-rating">
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star gray"></i>
                            </div>
                            <span>(2)</span>
                        </div>
                        <h3><a href="product-details.html">Basic Joggin Shorts</a></h3>
                        <div class="product-price-2">
                            <span>$20.50</span>
                        </div>
                    </div>
                    <div class="product-content-wrap-2 product-content-position text-center">
                        <div class="product-rating-wrap">
                            <div class="product-rating">
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star gray"></i>
                            </div>
                            <span>(2)</span>
                        </div>
                        <h3><a href="product-details.html">Basic Joggin Shorts</a></h3>
                        <div class="product-price-2">
                            <span>$20.50</span>
                        </div>
                        <div class="pro-add-to-cart">
                            <button title="Add to Cart">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>   
            <div class="product-plr-1">
                <div class="single-product-wrap">
                    <div class="product-img product-img-zoom mb-15">
                        <a href="product-details.html">
                            <img src="../../../../assets/img/product/product-14.jpg" alt="">
                        </a>
                        <div class="product-action-2 tooltip-style-2">
                            <button title="Wishlist"><i class="icon-heart"></i></button>
                            <button title="Quick View" data-toggle="modal" data-target="#exampleModal"><i class="icon-size-fullscreen icons"></i></button>
                            <button title="Compare"><i class="icon-refresh"></i></button>
                        </div>
                    </div>
                    <div class="product-content-wrap-2 text-center">
                        <div class="product-rating-wrap">
                            <div class="product-rating">
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star gray"></i>
                            </div>
                            <span>(2)</span>
                        </div>
                        <h3><a href="product-details.html">Basic Joggin Shorts</a></h3>
                        <div class="product-price-2">
                            <span>$20.50</span>
                        </div>
                    </div>
                    <div class="product-content-wrap-2 product-content-position text-center">
                        <div class="product-rating-wrap">
                            <div class="product-rating">
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star"></i>
                                <i class="icon_star gray"></i>
                            </div>
                            <span>(2)</span>
                        </div>
                        <h3><a href="product-details.html">Basic Joggin Shorts</a></h3>
                        <div class="product-price-2">
                            <span>$20.50</span>
                        </div>
                        <div class="pro-add-to-cart">
                            <button title="Add to Cart">Add To Cart</button>
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
    import $ from "jquery";
    export default {
        data(){
            return {

            }
        },
        mounted() {
            this.relatedProductActiveSlick();
        },
        methods: {
            async  relatedProductActiveSlick(){
                $('.related-product-active').slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    fade: false,
                    loop: true,
                    dots: false,
                    arrows: false,
                    responsive: [
                        {
                            breakpoint: 1199,
                            settings: {
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 575,
                            settings: {
                                slidesToShow: 1,
                            }
                        }
                    ]
                }); 
            }
        }
    }
</script>