<template>
    <div>
        <div class="product_wrappers_list">
            <div class="row">
                <div class="col-lg-3">
                    <div class="thumb">
                        <router-link :to="{ path: '/product/'+product.id }" class="image">
                            <img
                                :src="getImageUrl(imageSrc ? imageSrc : product.images[0].src)"
                                :alt="product.title"
                            />
                        </router-link>

                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="content">
                        <div class="product_para_top">
                            <h4 class="title text-capitalize"><router-link :to="{ path: '/product/'+product.id }">{{product.title}}</router-link></h4>
                            <p>{{product.description}}</p>
                            <span class="price">
                                <span class="new" v-if="product.discount" >${{ discountedPrice(product) }}</span>
                                <span class="new" v-else >${{ product.price }}</span>
                            </span>
                        </div>

                        <div class="actions">
                            <button @click="addToWishlist(product)" class="action wishlist bg-transparent" title="Wishlist"><i class="far fa-heart"></i></button>
                            <button id="toggle-btn" @click="toggleModal" class="action quickview bg-transparent" title="Quick view"><i class="fas fa-expand"></i></button>
                            <button @click="addToCompare(product)" class="action compare bg-transparent" title="Compare"><i class="fas fa-exchange-alt"></i></button>
                        </div>
                        <button @click="addToCart(product)" class="add-to-cart offcanvas-toggle btn btn_sm theme-btn-one btn-black-overlay mt-3" title="Add To Cart">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'ProductBox2',
    props: ['product', 'index'],

  data() {
    return {
      // Product Quantity Increment/ Decrement Data
      quantity: 1,
      imageSrc: '',
      cartProduct: {},
      compareProduct: {},
      dismissSecs: 3,
      dismissCountDown: 0,
      activeColor: '',
      selectedSize: '',
      qty: '',
      size: [],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 20,
        freeMode: true
      },
    };
  },
  computed: {
    ...mapState({
      productslist: (state) => state.products.productslist,
    }),
   
    swiper() {
      return this.$refs.mySwiper.swiper
  }

  },
  mounted() {
    // For displaying default color and size on pageload
    this.uniqColor = this.product.variants[0].color
    this.sizeVariant(this.product.variants[0].image_id)
    // Active default color 
    this.activeColor = this.uniqColor
    this.changeSizeVariant(this.product.variants[0].size)
  },

  methods: {
    // Product details Popup id Methods
    toggleModal() {
      this.$refs['product-details-popup'].toggle('#toggle-btn');
    },

    // Image Url
    getImageUrl(path) {
      return require('@/assets/img/product-image/' + path);
    },

    // Product Add To Cart realted methods
    addToCart: function(product) {
      this.dismissCountDown = this.dismissSecs;
      this.cartProduct = product;
      this.$emit('showalert', this.dismissCountDown);
      this.$store.dispatch('cart/addToCart', product);
    },

    // After Add to cart Alert 
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        this.$emit('alertseconds', this.dismissCountDown)
    },

    // Discount Price 
    discountedPrice(product) {
        const price = product.price - ( product.price * product.discount / 100)
        return price
    },
    addToWishlist: function ( product ) {
      this.dismissCountDown = this.dismissSecs;
      this.$emit( 'showalert', this.dismissCountDown )
      this.$store.dispatch('products/addToWishlist', product)
    },
    addToCompare: function (product) {
      this.dismissCountDown = this.dismissSecs;
      this.$emit('showalert', this.dismissCountDown )
      this.$store.dispatch('products/addToCompare', product)
    },

    // Display Unique color 
    Color(variants) {
      const uniqColor = []
      for (let i = 0; i < Object.keys(variants).length; i++) {
        if (uniqColor.indexOf(variants[i].color) === -1) {
            uniqColor.push(variants[i].color)
        }
      }
      return uniqColor
    },
    // Change Size Variant 
    changeSizeVariant(variant) {
      this.selectedSize = variant
    },
    slideTo(id) {
      this.swiper.slideTo(id, 1000, false)
    },
    sizeVariant(id, slideId, color) {
      // this.swiper.slideTo(slideId, 1000, false)
      this.size = []
      this.activeColor = color
      this.product.variants.filter((item) => {
        if (id === item.image_id) {
          this.size.push(item.size)
        }
      })
    }

  },
};
</script>