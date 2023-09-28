<template>
    <!-- The toaster component -->
    <Toast />
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
                        <div class="pro-details-size" v-if="productSpec">
                            <template v-if="productSpec.length> 0 && productSpec !== ''">
                                <template v-for="proItem in productSpec" :key="proItem.variantId">
                                    <span>{{ proItem?.item }}:</span>
                                    <div class="pro-details-size-content">
                                        <ul ref="proTypeItem"   v-if="proItem.additional">
                                            <li
                                                 v-for="(proType, index) in proItem.additional" 
                                                    :key="index"
                                                    @click.stop="toggleActiveItemType(index,proItem?.item,proItem.additional)">
                                                <a class="w-10rem">{{ proType?.item }}</a>
                                                <input class="w-10rem hidden" :value="proType?.item ?? 0"/>
                                            </li>
                                        </ul>
                                    </div>
                                </template>
                            </template>
                        </div>

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

<style lang="scss" scoped>
.description {
  p {
    padding: 5px 0px;
    margin: 0px;

    span {
      margin-right: 10px;
    }

    .icon {
      font-size: 1.5em;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .color-select {
    padding-left: 0px;
    li,
    div {
      display: inline-block;
      height: 30px;
      width: 30px;
      margin-right: 10px;

      &:hover {
        cursor: pointer;
      }

      .selected {
        border: 2px solid black;
      }
    }
  }

  .custom-attributes {
    margin-top: 1rem;
  }
  .section-title {
    font-size: 1.2em;
  }
  .add-to-cart {
    background-color: white; /*this for transparent button*/
    border: 2px solid black; /* this is for button border*/
    border-radius: 0px;
    color: black;
    padding: 10px 40px;
  }
  .add-to-cart:hover {
    background-color: black; /*this for transparent button*/
    border: 2px solid black; /* this is for button border*/
    border-radius: 0px;
    color: white;
  }
  h3 {
    color: black;
  }
}
</style>

