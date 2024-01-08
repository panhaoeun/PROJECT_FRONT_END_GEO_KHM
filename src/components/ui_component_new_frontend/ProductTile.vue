<template>
    <div class="p-tile">
        <router-link
            :title="product?.product_eng"
            :to="productLinkURL(product)"
            class="page-link"
        >
            <div class="block img-wrapper">
                <lazy-image
                    v-if="isLazyImage"
                    :data-src="
                        getProductImageURLThumbnail(product?.product_picture)
                    "
                    :title="product?.product_eng"
                    :alt="product?.product_eng"
                />
                <img
                    v-else
                    :src="getProductImageURLThumbnail(product?.product_picture)"
                    :title="product?.product_eng"
                    :alt="product?.product_eng"
                    height="50"
                    width="50"
                />
            </div>

            <div class="item-title">
                <h6 class="ellipsis" :class="`ellipsis-${titleEllipsis}`">
                    {{ product?.product_eng }}
                </h6>
                <!-- <div class="mtb-5">
          <rating-star
            :rating="parseFloat(product.rating)"
          />
          <span class="f-10 ml-5 semi-bold color-lite">{{ $t('productReview.reviews', {count: product.review_count}) }}</span>
        </div> -->
                <div class="flex wrap start pt-2">
                    <h6 class="price-wrapper">
                        <span class="price">
                            <label class="text-red-500">
                                {{
                                    currencyFormattedKHRiel(
                                        product?.product_unit_price_khr
                                    )
                                }}</label
                            >
                            <span
                                >({{
                                    currencyFormattedUSD(
                                        product?.product_unit_price
                                    )
                                }})</span
                            >
                        </span>
                    </h6>
                    <!-- <span
            v-if="reducedPercent"
            class="discount ml-10"
          >
            -{{reducedPercent}}%</span> -->
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import LazyImage from "./LazyImage";
import util from "@/mixin/util";
import productPriceHelper from "@/mixin/productPriceHelper";
import productHelper from "@/mixin/productHelper";
import compareHelper from "@/mixin/compareHelper";
import { mapGetters, mapActions } from "vuex";
//   import PriceFormat from "./PriceFormat";
//   import RatingStar from "./RatingStar";

export default {
    name: "ProductTile",
    props: {
        product: {
            type: Object,
            default() {
                return null;
            },
        },
        isLazyImage: {
            type: Boolean,
            default: true,
        },
        compared: {
            type: Boolean,
            default: false,
        },
        titleEllipsis: {
            type: Number,
            default: 2,
        },
    },
    data() {
        return {
            ajaxingCompare: false,
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE,
        };
    },
    components: {
        //   RatingStar,
        //   PriceFormat,
        LazyImage,
    },
    mixins: [util, productHelper, productPriceHelper, compareHelper],
    computed: {
        badge() {
            return this.product?.badge;
        },
        ...mapGetters("common", ["currencyIcon", "setting"]),
    },
    mounted() {},
    methods: {
        currencyFormattedKHRiel: function (value) {
            return new Intl.NumberFormat("km-KH", {
                style: "currency",
                currency: "KHR",
                currencyDisplay: "symbol",
            })
                .format(value ? value : 0)
                .replace(/\b(\w*KHR\w*)\b/, "៛");
        },
        currencyFormattedUSD: function (value) {
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
        getProductImageURLThumbnail(pathName) {
            if (typeof pathName !== undefined) {
                return `${this.ENV_HOST_PATH_FILE}uploads/products_img/thumbnail/${pathName}`;
            } else {
                return "";
            }
        },
        ...mapActions("common", [
            "postRequest",
            "setToastMessage",
            "setToastError",
        ]),
    },
};
</script>
