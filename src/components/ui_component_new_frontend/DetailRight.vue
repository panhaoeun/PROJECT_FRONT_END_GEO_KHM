<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="detail-right">
    <div class="sticky-right">
      <div class="content">
        <h2 class="price-wrapper mb-2 text-xl">
          <span
            class="color-deep price"
          >
            {{ currencyFormattedKHRiel(product?.product_unit_price_khr) }}
            ( {{ currencyFormattedUSD(product?.product_unit_price) }})
          </span>
          <span
            class="strike-through f-8"
            v-if="prevPrice"
          >
            <price-format
              :price="prevPrice"
            />
          </span>
        </h2>
        <!-- Product Spec -->
        <div
          v-if="!attrRender"
          v-for="(value, index) in productAttributes"
          :key="index"
          class="start flex mb-10 wrap"
        >
          <span
            class="mr-10 mn-w-70x font-bold text-black"
          >
            {{value?.item}}:
          </span>
          <!-- Product Detail Dropdown -->
          <dvi>
                <select
                    class="dropdown-wrapper"
                    :label-for="value?.item + aid"
                    style="border: 1px solid #bbb;justify-content:space-between;padding:15px 30px 20px 30px;transition:all .1s;"
                    v-model="selectedCustomizations[value?.item]"
                    :track-by="currentSelected.proSpecItem"
                >
                    <!--  -->
                    <option disabled value="not_choose">
                        Choose an option
                    </option>
                    <option
                        v-for="(
                            add, index
                        ) in value?.additional"
                        :key="index"
                        :name="add?.item"
                        :value="add?.item"
                       
                    > 
                        <span>{{ add?.item }}</span>
                    </option>
                </select>
          </dvi>
        </div>
        <!-- Shipping Price -->
        <div
          v-if="!attrRender"
          class="start flex mb-10 wrap"
        >
          <span
            class="mr-10 mn-w-70x font-bold text-black"
          >
            Delivery:
          </span>
          <!-- Product Detail Dropdown -->
          <dvi>
                <select
                    class="dropdown-wrapper"
                    :label-for="value?.item + aid"
                    style="border: 1px solid #bbb;justify-content:space-between;padding:15px 15px 15px 15px;transition:all .1s;"
                    @change="selectExpressDeliveryShippingPrice"
                >
                    <!--Choose option-->
                    <option disabled value="not_choose">
                        Choose an option
                    </option>
                    <!-- Express (1-2 Day) -->
                    <option
                        value="Express (1-2 Day)"
                        :name="
                            exchangeExpressDay &&
                            product?.expressPrice
                        "
                        :data-deliver-name="
                            product?.shippingCompany +
                            ' | ' +
                            'Express (1-2 Day)'
                        "
                        :data-deliver-price="
                            exchangeExpressDay
                        "
                        :data-deliver-khr="product?.expressPrice"
                        :selected="
                            selectExpressDeliveryShippingPrice ==
                            'Express (1-2 Day)'
                        "
                    >
                        <div class="flex">
                            <p>
                                <span>
                                    {{ currencyFormattedKHRiel(
                                       product?.expressPrice
                                    ) }}
                                </span>
                                <input
                                    hidden
                                    :value="
                                        convertAmountRateExpressDay(
                                            product?.expressPrice
                                            ? product?.expressPrice
                                            : 0
                                        )
                                    "
                                />
                                ({{ currencyFormattedUSD(exchangeExpressDay) }}) -
                            </p>
                            <span> Express (1-2 Day)</span>
                        </div>
                    </option>
                    <!-- Normal (4-4 Day) -->
                    <option
                        value="Normal (3-4 Day)"
                        :name="
                            exchangeNormalDay &&
                            product?.normalPrice
                        "
                        :data-deliver-price="exchangeNormalDay"
                        :data-deliver-khr="product?.normalPrice"
                        :data-deliver-name="
                            product?.shippingCompany +
                            ' | ' +
                            'Normal (3-4 Day)'
                        "
                        :selected="
                            selectExpressDeliveryShippingPrice ==
                            'Normal (3-4 Day)'
                        "
                    >
                        <p>
                            <span>
                                {{ currencyFormattedKHRiel(
                                    product?.normalPrice
                                ) }}
                            </span>
                            <input
                                hidden
                                :value="
                                    convertAmountRateNormalDay(
                                        product?.normalPrice
                                            ? product?.normalPrice
                                            : 0
                                    )
                                "
                            />
                            ({{
                                currencyFormattedUSD(exchangeNormalDay)
                            }}) -
                        </p>
                        <span> Normal (3-4 Day)</span>
                    </option>
                </select>
          </dvi>
        </div>

        <p
          v-if="cartError.attribute"
          class="error mb-10"
        >
          {{cartError.attribute}}</p>
        <div
          class="start flex gap-10 mb-2 wrap"
        >
          <span
            class="mt-5 mn-w-70x font-bold text-black"
          >
            Quantity
          </span>
          <quantity-nav
            class="mt-5"
            :quantity="quantity"
            :product-inventory="product"
            :max="maxQuantity"
            @value-changed="quantity = $event.value"
          />

          <p
            v-if="cartError.inventory"
            class="error mb-10"
          >
            {{cartError.inventory}}
          </p>
        </div>
        <!-- Express Price -->
        <div class="flex-sm mlr-sm--2-5">
            <template v-if="isLoggedIn()">
                <!-- Customer -->
                <template v-if="customerRole === 'Customer' && customerRole !== 'Admin' && customerRole !== 'Vendor'">
                    <ajax-button
                        class="w-100 w-sm-50 primary-btn mtb-10 mlr-sm-2-5"
                        :disabled="disabled"
                        type="button"
                        :fetching-data="ajaxing"
                        @clicked="addToCart"
                        loading-text="Adding"
                        text="Add To Cart"
                    />
                    <!-- <ajax-button
                        class="w-100 w-sm-50 outline-btn  mtb-10 mlr-sm-2-5"
                        :disabled="disabled"
                        type="button"
                        color="primary"
                        :fetching-data="buyingNow"
                        @clicked="addToCart(true)"
                        loading-text="Buy Now"
                        text="Buy Now"
                    /> -->
                </template>
                <!-- Vendor and Admin -->
                <template v-if="customerRole !== 'Customer' && customerRole === 'Admin' || customerRole === 'Vendor'">
                    <ajax-button
                        class="w-100 w-sm-50 primary-btn mtb-10 mlr-sm-2-5"
                        :disabled="disabled"
                        type="button"
                        :fetching-data="ajaxing"
                        @clicked="addToCart"
                        loading-text="Adding"
                        :text="customerRole === 'Admin' ? 'Web Page': 'My Shop'"
                        @click="$router.push('/vendor-dashboard/default-layouts')"
                    />
                </template>
            </template>
        </div>

        <!-- <div class="pos-rel inline">
          <button
            class="clear-height ml--7-5 mtb-10 f-10 semi-bold flex color-deep"
            aria-label="submit"
            @click.prevent="secureTrans = !secureTrans"
            data-ignore="secure-trans"
          >
            <i
              class="no-click icon lock-icon mr-5 opacity-35 dimen-20x"
            />
                 Secure transaction
          </button>
          <pop-over
            :title="$t('detailRight.transactionIsSecured')"
            v-if="secureTrans"
            @close="closeSecureTrans"
            class="secure-trans"
            elem-id="secure-trans"
          >
            <template v-slot:content>
              <p class="mn-w-350x mn-w-sm-0">
                {{ $t('detailRight.secureTransaction') }}
                {{ $t('detailRight.secureTransactionMsg') }}
              </p>
            </template>
          </pop-over>
        </div> -->

        <client-only>
          <!-- <p class="f-9">Arrives : <span class="color-lite semi-bold">{{arrivesAt}}</span></p> -->
          <!-- <ajax-button
            class="mt-15 w-100 outline-btn hide-sm"
            type="button"
            color="primary"
            :fetching-data="ajaxingWishlist"
            @clicked="wishListAction"
            :loading-text="!wishListed ? $t('detailRight.addingToWishlist') : $t('detailRight.removingFromWishlist')"
            :text="!wishListed ? 'Add from wishlist' : 'Remove from wishlist'"
          /> -->
        </client-only>
      </div>

      <!-- <client-only>
        <social-share
          class="hide-sm mb-15"
          :product="product"
        />
      </client-only> -->

      <!-- Store -->
      <store-tile
        class="mt-10"
        :store="product"
      />

    </div><!-- detail-right -->
  </div><!-- detail-right -->
</template>

<script>
//   import moment from 'moment'
  import util from '@/mixin/util'
  import productHelper from '@/mixin/productHelper'
  import productPriceHelper from '@/mixin/productPriceHelper'
//   import Dropdown from './Dropdown'
//   import PopOver from './PopOver'
//   import SocialShare from './SocialShare'
  import QuantityNav from './QuantityNav'
  import AjaxButton from './AjaxButton'
  import {mapGetters, mapActions} from 'vuex'
  import PriceFormat from "./PriceFormat"
  import StoreTile from "./StoreTile";
  import _ from "lodash";
  import convertRielToUSDAmount from "@/utils/convertRielToUSD";
  import { isLoggedIn } from "@/utils/auth/auth";

  export default {
    data() {
      return {
        exchangeExpressDay: 0,
        exchangeNormalDay: 0,
        expressDelivery: {},
        cartError: {
          attribute: null,
          quantity: null,
        },
        currentSelected: {},
        selectedCustomizations: {},
        productInventory: {},
        currentAttributes: [],
        attrRender: false,
        ajaxing: false,
        ajaxingWishlist: false,
        inventory: null,
        price: 0,
        selectedAttributesTitle: {},
        quantity: 1,
        pricePopOver: false,
        buyingNow: false,
        secureTrans: false,
        selectedShippingExpressDelivery: "Normal (1-2 Day)",
        expressOptionSelected: {},
        selectedCustomDeliveryExpress: {},
        customerRole: null
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      product: {
        type: Object
      }
    },
    components: {
      StoreTile,
      PriceFormat,
    //   Dropdown,
    //   PopOver,
    //   SocialShare,
      QuantityNav,
      AjaxButton
    },
    mixins: [util, productHelper, productPriceHelper],
    computed: {
      wishListed() {
        return this.$auth?.user?.id && this.product?.wishlisted
      },
      maxQuantity() {
        return parseInt(this.productInventory || 0)
      },
      isInStock() {
        if (this.inventory) {
          return this.inventory.quantity > 0
        }
        return this.product?.in_stock
      },
      productPrice() {
        if (this.productInventory?.inventory_attributes?.length > 0 && this.productInventory?.price > 0) {
          return this.productInventory?.price
        }
        return this.product.price > 0
          ? this.product.price : this.product.offered > 0
            ? this.product.offered : this.product.selling
      },

      /*productPrice() {
        if (this.productInventory?.price > 0) {
          return this.productInventory?.price
        }
        return this.product.price !== null
          ? this.product.price : this.product.offered > 0
            ? this.product.offered : this.product.selling
      },*/
      totalPrice() {
        return parseFloat(this.productPrice) + parseFloat(this.shippingPrice)
      },
    //   shippingPlace() {
    //     const all = this.shippingRule.find(obj => {
    //       return obj.country.toUpperCase() === 'ALL'
    //     })
    //     if (!all) {
    //       let maxPrice = 0
    //       let maxObj = 0
    //       this.shippingRule.forEach((obj) => {
    //         if (parseFloat(obj.price) > maxPrice) {
    //           maxPrice = obj.price
    //           maxObj = obj
    //         }
    //       })
    //       return maxObj
    //     } else return all
    //   },
    //   arrivesAt() {
    //     const momentDate = moment()
    //       .add(this.shippingPlace?.day_needed, 'days')

    //     const day = momentDate.format('ddd').toLowerCase()
    //     const mon = momentDate.format('MMM').toLowerCase()
    //     const date = momentDate.format('D')
    //     return this.$t('date.ddddMMMD', {day: this.$t(`date.${day}`), mon: this.$t(`date.${mon}`), date: date })
    //   },
    //   shippingPrice() {
    //     return this.shippingPlace?.price
    //   },
    //   shippingRule() {
    //     return this.product?.shipping_rule?.shipping_places;
    //   },
      productAttributes() {
        return this.product?.product_spec.map(i => {
          return {
            ...i, ...{
              values: i.additional.reduce((a, item) => {
                a[`${item}-${item.item}`] = item
                return a;
              }, {})
            }
          }
        })
      },
      ...mapGetters('language', ['langCode']),
      ...mapGetters('common', ['currencyIcon', 'setting']),
      ...mapGetters('cart', ['cartProducts']),
    },
    methods: {
        isLoggedIn() {
            return isLoggedIn();
        },
        customerRoleType(){
            if(isLoggedIn()){
                const userRoleAuth = localStorage.getItem('userRole');
                if (JSON.parse(userRoleAuth) !== 'Vendor' && JSON.parse(userRoleAuth) !== 'Admin' && JSON.parse(userRoleAuth) === "Customer"){
                    this.customerRole = JSON.parse(userRoleAuth) ? JSON.parse(userRoleAuth) : '';
                }else{
                   this.customerRole = JSON.parse(userRoleAuth) ? JSON.parse(userRoleAuth) : '';
                }
            }
        },
        // Express Price
        async selectExpressDeliveryShippingPrice($event) {
            if ($event.target.options.selectedIndex > -1) {
                const deliverPriceExpress =
                    $event.target.options[$event.target.options.selectedIndex]
                        .dataset.deliverPrice ?? 0;
                const deliveryPriceKHR =
                    $event.target.options[$event.target.options.selectedIndex]
                        .dataset.deliverKhr ?? 0;
                const deliveryName =
                    $event.target.options[$event.target.options.selectedIndex]
                        .dataset.deliverName ?? 0;
                this.expressOptionSelected = {
                    deliveryPriceUSD: parseFloat(deliverPriceExpress).toFixed(
                        2,
                        4
                    )
                        ? parseFloat(deliverPriceExpress).toFixed(2, 4)
                        : 0,
                    deliveryPriceKHR: deliveryPriceKHR ? deliveryPriceKHR : 0,
                    deliveryName: deliveryName ? deliveryName : "",
                };
                // Selected Customization is just used for the simplicity. The values are also changed in this.product.
                this.selectedCustomDeliveryExpress = _.cloneDeep(
                    this.expressOptionSelected
                );
            }
        },
        async convertAmountRateExpressDay(rielAmount) {
            try {
                const amountConvertRielExpress = parseInt(rielAmount)? parseInt(rielAmount): 0;
                this.exchangeExpressDay = (await convertRielToUSDAmount(amountConvertRielExpress ? amountConvertRielExpress : 0)) ?? 0;
                const result = await Promise.resolve(amountConvertRielExpress);
                return result;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async convertAmountRateNormalDay(rielAmount) {
            try {
                const amountConvertRielNormal = parseInt(rielAmount)? parseInt(rielAmount): 0;
                this.exchangeNormalDay = (await convertRielToUSDAmount(amountConvertRielNormal ? amountConvertRielNormal : 0)) ?? 0;
                const resultNormal = await Promise.resolve(
                    amountConvertRielNormal
                );
                return resultNormal;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        currencyFormattedKHRiel(value){
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD(value){
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
        toFixed(num) {
            return parseFloat(num).toFixed(2)
        },
        closePricePopOver() {
            this.pricePopOver = false
        },
        closeSecureTrans() {
            this.secureTrans = false
        },
        // selectedAttribute(data) {
        //     this.cartError.attribute = null

        //     this.currentAttributes[data] = data

        //     if (Object.values(this.currentAttributes).length === this.productAttributes.length) {
        //     const selected = Object.values(this.currentAttributes).map(i => {
        //         return i.productId;
        //     })
        //     let currentInventory = null
        //     this.productInventory = currentInventory
        //     // // Emitting the changed value to update the in stock message and price in detail component
        //     // this.$emit('option-changed', currentInventory)
        //     }
        // },
       async cartAdd() {
            this.ajaxing = true
            const addToCart = {
                    shipCompanyId: this.product.shipCompanyId ? this.product.shipCompanyId : 0,
                    shopId: this.product.shopId ? this.product.shopId : 0,
                    vendorId: this.product.vendorId ? this.product.vendorId : 0,
                    productId: parseInt(this.product.productId)
                        ? parseInt(this.product.productId)
                        : 1,
                    productQty: parseInt(this.quantity)
                        ? parseInt(this.quantity)
                        : 1,
                    productPrice: this.product.product_unit_price_khr ? this.product.product_unit_price_khr : 1,
                    productVariantName: this.currentSelected,
                    shippingDayCompanyName: this.expressOptionSelected
                        .deliveryName
                        ? this.expressOptionSelected.deliveryName
                        : "",
                    expressDeliveryPriceUSD: this.expressOptionSelected
                        .deliveryPriceUSD
                        ? this.expressOptionSelected.deliveryPriceUSD
                        : 0,
                    expressDeliveryPriceKHR: this.expressOptionSelected
                        .deliveryPriceKHR
                        ? this.expressOptionSelected.deliveryPriceKHR
                        : 0,
                    maxOrder: this.product.maxOrder ? this.product.maxOrder : 0,
                    packageType: this.product.packingType,
                    type: "new",
            };
            await this.addToTheCart({...addToCart})
            this.ajaxing = false
      },
      async buyNowProduct() {
        return new Promise(resolve => {
          this.buyingNow = true
          this.buyNow({
            payload: {
              user_token: this.getUserToken(),
              product_id: this.product.id,
              inventory_id: this.productInventory.id,
              quantity: this.quantity
            },
            lang: this.langCode
          }).then(() => {
            this.buyingNow = false
            resolve();
          })
        })
      },
      //Add to cart
      async addToCart(isBuyNow = false) {
        this.cartError = {
          attribute: null,
          quantity: null
        }
         if (
            Object.keys(this.selectedCustomizations).length === 0 &&
            this.selectedCustomizations.constructor === Object &&
            !Array.isArray(this.currentSelected)
        ) {
            this.cartError.attribute = 'Please select all required attributes.'
            return false;
        }
       if (
            Object.keys(this.expressOptionSelected).length === 0 &&
            !Array.isArray(this.expressOptionSelected)
        ) {
            this.cartError.attribute = 'Please select express delivery.'
            return false;
        }
        if (this.product?.product_qty < this.quantity) {
              this.cartError.quantity = 'exceeds inventory'
          return false
        }
        // Check Empty Selected Product Spec
        if (this.currentSelected) {
            // Disable the popover in case the add to cart is possible
            Object.keys(this.selectedCustomizations).forEach((key) => {
                if (
                    typeof this.selectedCustomizations[key] === "string"
                ) {
                    this.currentSelected = this.selectedCustomizations;
                    this.currentSelected[
                        key
                    ] = `${this.selectedCustomizations[key]}`;
                } else {
                    this.currentSelected[
                        key
                    ] = `${this.selectedCustomizations[key]}|${this.selectedCustomizations[key]}`;
                }
            });
        }
        /*let current = -1
        current = this.cartProducts.findIndex((obj) => {
          return obj.product_id === this.product.id &&
            obj.inventory_id === this.productInventory.id &&
            obj.user_id === this.$auth.user.id
        })*/
        if (isBuyNow) {
          await this.buyNowProduct()
            .then(() => {

              setTimeout(() => {
                this.$router.push({path: '/shipping'})
              }, 300)

            })

        } else {
          await this.cartAdd()
        }
      },
      ...mapActions('common', ['setToastMessage', 'setToastError']),
      ...mapActions('cart', ['addToTheCart', 'buyNow']),
      ...mapActions('user', ['getUserToken']),
      ...mapActions('wishlist', ['userWishlistAction'])
    },
    mounted() {
      //Checking if the product has no attribute
      if (this.product?.inventory?.length === 1 && this.product?.inventory[0]?.inventory_attributes?.length === 0) {
        this.productInventory = this.product?.inventory[0]
      }
      this.customerRoleType();
    },
    activated() {
      this.attrRender = true
      setTimeout(() => {
        this.attrRender = false
      }, 10)
    }
  }
</script>

<style>

</style>
