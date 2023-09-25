<template>
    <!-- The toaster component -->
    <Toast />
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
                        <div class="pro-dec-big-img-slider slick-initialized slick-slider">
                            <div class="easyzoom-style">
                                <!-- Thumbnail Image -->
                                <div class="easyzoom easyzoom--overlay">
                                    <!-- Thumbnail -->
                                    <template  v-if="activeImage == ''">
                                        <a href="#">
                                            <img 
                                                :src="productThumbnailRULFormate ?? ''" 
                                                :aria-atomic="title"
                                                class="main-img"
                                            >
                                        </a>
                                    </template>
                                    <!-- Change Thumbnail -->
                                    <template v-if="activeImage !==''" >
                                            <img 
                                                :src="productMultiImgURLFormate(activeImage)" 
                                                class="main-img" />
                                    </template>
                                </div>
                            </div>
                        </div>
                        <!-- Cart Item -> Product Detail Image -->
                        <div class="cart-item">
                            <div class="image-section" 
                                v-for="multiImg in productImgMulti.slice(0, 4)" 
                                :key="multiImg">
                            <div class="img-thumbnails">
                                <img
                                    v-for="(image, index) in multiImg"
                                    :key="index"
                                    :src="productMultiImgURLFormate(image?.fileName)"
                                    class="thumbnail"
                                    @click="setActiveImage(index)"
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="product-details-content pro-details-content-mrg">
                        <h2>{{title ?? 'Eleventh-day'}}</h2>
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
                        <template v-if="productSpec">
                            <template v-if="productSpec.length> 0 && productSpec !== ''" class="px-2 py-2">
                                <template v-for="(proItem, index) in productSpec" :key="index" class="px-2 py-2 gap-3">
                                    <span>{{ proItem?.item }}:</span>
                                    <template v-if="proItem.additional" class="px-2 py-2">
                                        <div class="flex flex-column w-20rem">
                                            <el-select v-model="productSpecSelected" placeholder="Select" size="large" class="my-4">
                                                <el-option
                                                    v-for="(proType, index) in proItem?.additional"
                                                    :key="index"
                                                    :label="proType?.item"
                                                    :value="proType?.item">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </template>
                                </template>
                            </template>
                         
                        </template>
                        <!-- <div class="pro-details-size" v-if="productSpec">
                            <template v-if="productSpec.length> 0 && productSpec !== ''">
                                <template v-for="(proItem, index) in productSpec" :key="index">
                                    <span>{{ proItem?.item }}:</span>
                                    <div class="pro-details-size-content">
                                        <ul ref="proTypeItem"   v-if="proItem.additional">
                                            <li
                                                 v-for="(proType, index) in proItem.additional" 
                                                    :class="{'bg-red-500': (activeTypeId === index)}" 
                                                    :key="index"
                                                    @click.stop="toggleActiveItemType(index,proItem?.item,proItem.additional)">
                                                <a class="w-10rem">{{ proType?.item }}</a>
                                                <input class="w-10rem hidden" :value="proType?.item ?? 0"/>
                                              
                                            </li>
                                            <el-select v-model="value" clearable placeholder="Select">
                                                <el-option
                                                v-for="(proType, index) in proItem.additional"
                                                :key="index"
                                                :label="proType?.item"
                                                :value="proType?.item">
                                                </el-option>
                                            </el-select>
                                        </ul>
                                    </div>
                                </template>
                            </template>
                        </div> -->

                        <!-- QTY -->
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
                                <MazBtn color="danger" size="lg"  class="font-bold btn-red" @click.prevent="buyProductItemToCart()" style="background-color:red; padding: 18px 50px 17px; border-radius: 0%;">Buy It Now</MazBtn>
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
    import { mapActions, mapState } from "vuex";
    import $ from "jquery";

    export default {
        components: {
            // EmptyThumbnail
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
            productArrDetail: {type: Array,default: Array.isArray() ?? ''}
        },
        data(){
            return{
                productSpecSelected: '',
                quantity: 1,
                activeImageThumbnail: this.productThumbnail,
                ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE.replace("https", "http"),
                multipleImgPATH: '',
                quantityItemOrder: 1,
                activeImage: '',
                activeType: false,
                activeTypeId: 0,
                activeTypeSpec: [],
                selectedTypeItem: []
            }
        },
        created(){
            this.productDesSliderSmall();
        },  
        methods: {
            ...mapActions('cart',{
                addProduct: "addToCart"
            }),
            setActiveImage(image) {
                const proxy = new Proxy(this.productImgMulti, {});
                const arrayImg = JSON.parse(JSON.stringify(proxy));
                // this.activeImage = String(arrayImg[0][image]) ?? [];
                this.activeImage = arrayImg[0][image].fileName;
            },
            toggleActiveItemType(id){
                this.activeTypeId = parseInt(id) ? id : 0;
                this.selectedTypeItem = this.productSpec[id];
            },
            /**
             * Add TO CART
             * BUY IT NOW 
            * */ 
           async addProductItemsToCart(){
               const qtyItem =  document.getElementsByClassName('cart-plus-minus-box');
                let itemProduct = {
                    ...this.productArrDetail ?? '',
                    product: this.productArrDetail[0].product ?? '',
                    productId: this.productArrDetail[0].product[0].productId ?? 0,
                    quantity: parseInt((parseInt(qtyItem[0].value ?? 0))),
                    unitPrice: parseFloat((parseFloat(this.productUnitPrice))),
                    productSpec: this.productSpec ?? []
                }
                if(!Array.isArray(itemProduct) || !itemProduct.length > 0){
                    // Messgae
                   this.$toast.add({ severity: 'info', summary: 'Successfully add to cart', detail: 'Successfully add to cart', life: 3000 });
                    this.$store.dispatch("cart/addToCart", itemProduct);
                }else{
                   this.$toast.add({ severity: 'error', summary: 'Unsuccessfully add to cart', detail: 'Unsuccessfully add to cart', life: 3000 });
                }
               
           },
           async buyProductItemToCart(){
                const qtyItem =  document.getElementsByClassName('cart-plus-minus-box');
                let itemProduct = {
                    ...this.productArrDetail ?? '',
                    product: this.productArrDetail[0].product ?? '',
                    productId: this.productArrDetail[0].product[0].productId ?? 0,
                    quantity: parseInt((parseInt(qtyItem[0].value ?? 0))),
                    unitPrice: parseFloat((parseFloat(this.productUnitPrice))),
                    productSpec: this.productSpec ?? []
                }
                if(!Array.isArray(itemProduct) || !itemProduct.length > 0){
                    this.$store.dispatch("cart/addToCart", itemProduct);
                    // Message
                   this.$toast.add({ severity: 'info', summary: 'Success', detail: 'Successfully process buy now', life: 3000 });
                    this.$router.push({path: '/customer/shopping-cart/product-list/cart-items'});
                }else{
                  this.$toast.add({ severity: 'error', summary: 'Success', detail: 'Unsuccessfully add to cart', life: 3000 });
                }
              
           },
            /**
             * Product Thumbnail
             * Product Small Carousel 
             * */ 
            productMultiImgURLFormate(filePath){ 
                return this.ENV_HOST_PATH_FILE + `uploads/products_img/list_img_products/` + String(filePath);
            },
            productDesSliderSmall(){
                $(document).ready(function() {
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
                    
                });
            },
            /**
             * Product Thumbnail
             * Product Small Carousel 
            * */   
        },
        computed: {
            ...mapState('cart', ['']),
            productThumbnailRULFormate(){
                return this.ENV_HOST_PATH_FILE + `uploads/products_img/thumbnail/` + String(this.productThumbnail) ?? '';
            },
        } 
    }
  </script>

<!-- Style Cart Item -->
<style scoped>
.cart-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 5rem;
    padding-bottom: 2rem;
    margin-top: 10px;
}

.image-section {
    width: 47%;
}

.image-section,
.product-details {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#back {
    padding: 1rem 1.8rem;
    font-size: 2rem;
    border: none;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    background-color: var(--dark-blue);
    transition: opacity 0.25s;
    display: grid;
    place-content: center;
    width: fit-content;
}

#back:hover {
    opacity: 0.85;
}

.main-img {
    height: 55vh;
    max-width: 100%;
    object-fit: cover;
}

.img-thumbnails {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    padding-top: 1rem;
    width: 100%;
}

.img-thumbnails .thumbnail {
    height: auto;
    max-width: 100%;
    cursor: pointer;
}

.img-thumbnails .thumbnail:hover {
    opacity: 0.7;
}

/* Product Details */
.product-details {
    width: 60%;
    padding-block: 2.5rem;
}

.product-details span {
    font-size: 1.4rem;
}

.product-details h4 {
    padding: 1.5rem 0 1rem 0;
}

.product-details select {
    max-width: 120px;
    padding: 0.8rem 1rem;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    cursor: pointer;
}

.extra {
    padding-block: 4.5rem;
    text-align: center;
}

.product-description {
    line-height: 2.5rem;
}

@media (max-width: 599px) {
    .cart-item {
        flex-direction: column;
    }
    .image-section,
    .product-details {
        width: 100%;
    }

    .image-section {
        padding-top: 2rem;
    }
    .image-section a {
        top: -2rem;
        left: 0;
    }
}
</style>
