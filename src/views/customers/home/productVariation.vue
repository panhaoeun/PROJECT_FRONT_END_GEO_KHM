<template>
    <!-- Product variation -->
    <section id="product_variation_one" class="pt-100 px-2 py-2">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="product_variation_one_boxed img-zoom-hover">
              <img :src="require('@/assets/img/offer/woman.png')" alt="img" />
              <div class="product_var_one_text">
                <h4 class="color_one">Outerwear</h4>
                <h2>New</h2>
                <h4>Collection</h4>
                <nuxt-link
                  to="/shop/shop-2"
                  class="theme-btn-one bg-black btn_sm"
                  >Shop Now</nuxt-link
                >
              </div>
            </div>
            <div class="product_variation_one_boxed img-zoom-hover">
              <img :src="require('../../../assets/img/offer/woman.png')" alt="img" />
              <div class="product_var_one_text">
                <h4 class="color_one">Summer</h4>
                <h2>Hot</h2>
                <h4>Collection</h4>
                <nuxt-link to="/shop" class="theme-btn-one bg-black btn_sm"
                  >Shop Now</nuxt-link
                >
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="product_variation_one_boxed img-zoom-hover">
              <img :src="require('../../../assets/img/offer/bag.png')" alt="img" />
              <div class="product_var_one_text_center">
                <h2 class="color_one">10% Offer</h2>
                <h4>No Selected Models</h4>
                <nuxt-link
                  to="/shop/shop-3"
                  class="theme-btn-one bg-black btn_sm"
                  >Shop Now</nuxt-link
                >
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="product_variation_one_boxed img-zoom-hover">
              <img :src="require('../../../assets/img/offer/woman4.png')" alt="img" />
              <div class="product_var_one_text">
                <h2>New</h2>
                <h4 class="color_one">Arrivals</h4>
                <nuxt-link
                  to="/shop/shop-2"
                  class="theme-btn-one bg-black btn_sm"
                  >Shop Now</nuxt-link
                >
              </div>
            </div>
            <div class="product_variation_one_boxed img-zoom-hover">
              <img :src="require('../../../assets/img/offer/kids.png')" alt="img" />
              <div class="product_var_one_text">
                <h2>Hot</h2>
                <h4 class="color_one">Offer</h4>
                <nuxt-link to="/shop" class="theme-btn-one bg-black btn_sm"
                  >Shop Now</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>