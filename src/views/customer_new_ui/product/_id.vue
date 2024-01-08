<template>
    <div class="bg-white">
        <div v-if="product">
            <div class="detail-menu hide-sm">
                <div class="container-fluid">
                    <div class="mlr--15">
                        <router-link to="#" class="font-bold text-black">
                            {{ product[0]?.product[0]?.catNameEn }}
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- Products -->
            <div class="container-fluid mtb-30 mt-sm-10 mn-h-400x">
                <div>
                    <!--Bread crumb-->
                    <div class="product-detail">
                        <!-- Detail Left -->
                        <div class="detail-left pr-30 pr-sm-0">
                            <div class="flex start align-start block-md">
                                <div class="product-main">
                                    <div class="detail-image-wrapper">
                                        <div
                                            class="detail-image-inner"
                                            :class="{ 'z-2': imagePopup }"
                                        >
                                            <!-- Product Image and Image Detail 10 images -->
                                            <product-images
                                                v-if="
                                                    productImageThumbnail ||
                                                    productImageList
                                                "
                                                :title="productTitle"
                                                :product="product"
                                                :main-image="
                                                    productImageThumbnail
                                                "
                                                :images="productImageList"
                                                @image-popup="
                                                    imagePopup = $event
                                                "
                                                @add-to-wishlist="
                                                    $refs.detailRight.wishListAction()
                                                "
                                            />
                                        </div>
                                    </div>
                                    <!-- Products -->
                                    <div class="pl-30 pl-md grow">
                                        <h6 class="f-16">
                                            {{ productTitle }}
                                        </h6>
                                        <div class="mt-10">
                                            <span
                                                class="f-10 ml-5 semi-bold text-black"
                                            >
                                                <img
                                                    src="@/assets/img/payments/box_726475.png"
                                                    alt=""
                                                    style="width: 20px"
                                                />
                                                Shipping Information:
                                                <div clsss="text-black">
                                                    <label
                                                        class="font-regular text-black font-for-tab d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-md-2 mr-0 pl-md-2 pl-sm-1 pr-md-2 pr-sm-1 text-capitalize"
                                                    >
                                                        Max Order:
                                                        {{
                                                            product[0]
                                                                ?.product[0]
                                                                ?.maxOrder
                                                        }}
                                                    </label>
                                                    <span class="p-2">|</span>
                                                    <label
                                                        class="font-regular font-for-tab d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-md-2 mr-0 pl-md-2 pl-sm-1 pr-md-2 pr-sm-1 text-capitalize"
                                                    >
                                                        Packing Type:
                                                        {{
                                                            product[0]
                                                                ?.product[0]
                                                                ?.packingType
                                                        }}
                                                    </label>
                                                </div>
                                            </span>
                                        </div>
                                        <!-- Time -->
                                        <div class="devider w-md-100 mtb-15">
                                            &nbsp;
                                        </div>
                                        <div
                                            v-if="endTime"
                                            class="flex sided warning-msg ptb-10 plr-15 mb-15 wrap gap-10"
                                        >
                                            <h5 class="color-inherit">
                                                {{ $t("product.shocking") }}
                                            </h5>
                                            <div class="gap-10 flex">
                                                <h5 class="color-inherit">
                                                    {{ $t("product.endsIn") }}
                                                </h5>
                                                <b>
                                                    <countdown
                                                        :time-zone="
                                                            product.time_zone
                                                        "
                                                        :end-time="endTime"
                                                    />
                                                </b>
                                            </div>
                                        </div>
                                        <h4
                                            class="mb-15 bold"
                                            :class="[
                                                { 'color-success': isInStock },
                                                { 'color-success': !isInStock },
                                            ]"
                                        >
                                            {{ inStock }}
                                        </h4>
                                        <!-- <div
                      v-if="vouchers && vouchers.length"
                      class="two-sided mb-15 ">
                      <h6 class="left">
                        {{ $t('accountLayout.vouchers') }}
                      </h6>
                      <div class="pos-rel ">
                        <div
                          class="right mlr--2-5 cp"
                          data-ignore="voucher-pop-over"
                          @click.passive="voucherPopOver = !voucherPopOver"
                        >
                          <span
                            v-for="(value, index) in vouchers"
                            :key="index"
                            class="no-click info-msg ptb-5 mlr-2-5 mb-5"
                          >
                            {{ $t('detailRight.off', { amount: getPriceType(value) }) }}
                          </span>
                        </div>
                        <pop-over
                          v-if="voucherPopOver"
                          :title="$t('filter.shop')"
                          @close="closeVoucherPopOver"
                          elem-id="voucher-pop-over"
                          :layer="false"
                        >
                          <template v-slot:content>
                            <vouchers
                              ref="voucherPagination"
                              :changing-route="false"
                            />
                          </template>
                        </pop-over>
                      </div>
                    </div> -->
                                        <!-- Product  Detail Add to Cart -->
                                        <div class="two-sided mb-15">
                                            <!-- product-detail -->
                                            <detail-right
                                                ref="detailRight"
                                                :disabled="!statusPublic"
                                                :product="
                                                    product[0]?.product[0]
                                                "
                                                @option-changed="optionChanged"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Product Descriptions -->
                            <div
                                class="ellipsis-para editor mt-30 mt-sm-15"
                                :class="{ expanded: descriptionExpand }"
                                v-dompurify-html="description"
                            />
                            <button
                                @click.prevent="descriptionToggle"
                                aria-label="Read less"
                                class="link mt-15 mb-5"
                            >
                                {{
                                    descriptionExpand
                                        ? "Read Less"
                                        : "Read More"
                                }}
                            </button>
                        </div>
                        <!-- Product Details Right -->
                        <detail-right-store-item
                            ref="detailRight"
                            :disabled="!statusPublic"
                            :product="product[0]?.product[0]"
                            @option-changed="optionChanged"
                        />
                    </div>
                </div>
            </div>
            <!-- Suggested Product -->
            <client-only>
                <!-- <div
          :class="{'mx-h-0': !hasReview, 'review-loaded': !reviewLoaded}"
          class="container-fluid suggested-container mn-h-400x"
        >
          <lazy-area
            v-slot:default="{renderArea}"
          >
            <product-review
              v-if="renderArea"
              :id="product.id"
              class="b-t pt-20 pt-sm-15  "
              @has-review="fetchedReview"
            />
          </lazy-area>
        </div> -->

                <div class="container-fluid suggested-container mn-h-400x">
                    <lazy-area v-slot:default="{ renderArea }">
                        <suggested-products
                            v-if="renderArea"
                            :product-id="productId"
                        />
                    </lazy-area>
                </div>
            </client-only>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import util from "@/mixin/util";
//   import productPriceHelper from '@/mixin/productPriceHelper'
//   import metaHelper from '@/mixin/metaHelper'
import productHelper from "@/mixin/productHelper";
import ProductImages from "@/components/ui_component_new_frontend/ProductImages";
import DetailRight from "@/components/ui_component_new_frontend/DetailRight";
import DetailRightStoreItem from "@/components/ui_component_new_frontend/DetailRightStoreItem";
import LazyArea from "@/components/ui_component_new_frontend/LazyArea";
import SuggestedProducts from "@/components/ui_component_new_frontend/SuggestedProducts";
//   import ProductReview from '@/components/ui_component_new_frontend/ProductReview';
//   import Vouchers from "@/components/ui_component_new_frontend/Vouchers";
//   import PopOver from "@/components/ui_component_new_frontend/PopOver";
import Countdown from "@/components/ui_component_new_frontend/Countdown";
//   import RatingStar from "@/components/ui_component_new_frontend/RatingStar";
//   import Breadcrumb from "@/components/ui_component_new_frontend/Breadcrumb";

export default {
    mixins: [util, productHelper],
    head() {
        return {
            title: this.product?.meta_title,
            meta: [
                this.generatingMeta(
                    "description",
                    this.product?.meta_description
                ),
                this.generatingMeta("og:image", this.imageURL(this.product)),
                this.generatingMeta("og:title", this.product?.meta_title),
                this.generatingMeta(
                    "og:description",
                    this.product?.meta_description
                ),
            ],
            link: [
                {
                    rel: "preload",
                    as: "image",
                    href: this.productThumbnailRULFormate(this.productImage),
                },
            ],
        };
    },

    data() {
        return {
            descriptionExpand: false,
            optionChange: false,
            productInventory: null,
            imagePopup: false,
            hasReview: true,
            reviewLoaded: true,
            activatedPage: false,
            voucherPopOver: false,
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
        };
    },
    components: {
        //   Breadcrumb,
        //   RatingStar,
        Countdown,
        //   PopOver,
        //   Vouchers,
        DetailRightStoreItem,
        ProductImages,
        LazyArea,
        SuggestedProducts,
        DetailRight,
        //   ProductReview
    },
    // mixins: [util, metaHelper, productHelper, productPriceHelper],
    computed: {
        description() {
            return this.product[0]?.product[0]?.product_description_eng || null;
        },
        overview() {
            return this.product?.overview || null;
        },
        reviewCount() {
            return this.product?.review_count || 0;
        },
        productRating() {
            return this.product?.rating || 0;
        },
        productImage() {
            return this.product[0]?.product[0].thumbnail || null;
        },
        productImageThumbnail() {
            return this.product[0]?.product[0].thumbnail || null;
        },
        productImageList() {
            let productImgMal = [];
            this.product[0].productImages.forEach((product) => {
                // const productImg = this.productMultiImgURLFormate(product?.fileName) ?? '';
                productImgMal.push({
                    image: product?.fileName ? product?.fileName : "",
                });
            });
            return productImgMal || null;
        },
        timeDifference() {
            const len = this.product.id.toString()?.length;
            let highest = "";
            for (let i = 1; i <= len; i++) {
                highest += "9";
            }
            return ((this.product.id / highest) * 100).toFixed(2);
        },
        endTime() {
            return this.product?.end_time || null;
        },
        productId() {
            return this.$route.params.productId;
        },
        statusPublic() {
            return parseInt(this.product[0].product[0]?.in_stock_no) === 1;
        },
        category() {
            return this.product?.category;
        },
        currentCategories() {
            return this.product?.current_categories;
        },
        productTitle() {
            return this.product[0].product[0]?.product_eng || "";
        },
        preparedSlug() {
            return this.categoryData
                ?.map((i) => {
                    return { title: i.title, link: this.categoryLink(i) };
                })
                ?.reverse();
        },
        categoryData() {
            return this.product?.category_data;
        },
        productSlug() {
            return this.product?.slug;
        },
        bundleDeal() {
            return this.product?.bundle_deal;
        },
        /*productPrice() {
        console.log(this.productInventory?.inventory_attributes?.length)
        if (this.productInventory?.inventory_attributes?.length > 0 && this.productInventory?.price > 0) {
          return this.productInventory?.price
        }
        return this.product.price > 0
          ? this.product.price : this.product.offered > 0
            ? this.product.offered : this.product.selling
      },*/
        isInStock() {
            return this.optionChange
                ? this.productInventory?.quantity > 0
                : this.product.in_stock;
        },
        inStock() {
            return this.isInStock ? "In Stock" : "In Stock";
        },
        vouchers() {
            return this.product?.vouchers;
        },
        brand() {
            return this.product?.brand?.title || "";
        },
        //   ...mapGetters('common', ['currencyIcon', 'currencyPosition', 'setting']),
        ...mapGetters("detail", ["product"]),
    },
    methods: {
        /**
         * Product Thumbnail
         * Product Small Carousel
         * */
        productMultiImgURLFormate(filePath) {
            return (
                this.ENV_HOST_PATH_FILE +
                `uploads/products_img/list_img_products/` +
                String(filePath)
            );
        },
        productThumbnailRULFormate(thumbnail) {
            return (
                this.ENV_HOST_PATH_FILE +
                `uploads/products_img/thumbnail/` +
                thumbnail
            );
        },
        async asyncData() {
            try {
                await this.$store.dispatch("detail/fetchProduct", {
                    params: {
                        id: this.$route.params?.productId,
                    },
                });
            } catch (e) {
                return Promise.reject(e);
            }
        },
        descriptionToggle() {
            this.descriptionExpand = !this.descriptionExpand;
        },
        closeVoucherPopOver() {
            this.voucherPopOver = false;
        },
        fetchedReview(evt) {
            this.hasReview = !!evt;
            this.reviewLoaded = !evt;
        },
        optionChanged(evt) {
            this.optionChange = true;
            this.productInventory = evt;
        },
        qty(direction) {
            if (this.quantity + direction === 0) {
                return;
            }
            this.quantity += direction;
        },
        ...mapActions("common", ["fetchLocation"]),
        ...mapActions("detail", ["emptySuggestedProducts"]),
        ...mapActions("user", ["emptyVoucher"]),
    },
    beforeUnmount() {
        document.body.classList.remove("detail-page");
    },
    async mounted() {
        this.emptyVoucher();
        this.emptySuggestedProducts();
        document.body.classList.add("detail-page");
        //Product Detail
        this.asyncData();
    },
};
</script>
