<template>
    <div v-if="data != null">
        <div class="align-left description" style="padding: 10px">
            <h2>{{ data[0]?.product[0].product_eng ?? "" }}</h2>
            <span class="pb-2"></span>
            <h6>By {{ data[0]?.product[0].shop_eng }}</h6>
            <div class="mb-3 my-4">
                <span class="h3 font-weight-normal text-accent">
                    <input
                        hidden
                        :value="
                            convertRielAmountProductToCart(
                                data[0]?.product[0]?.product_unit_price
                                    ? data[0]?.product[0]?.product_unit_price
                                    : 0
                            )
                        "
                    />
                    ៛ {{ exchangeRateRielProPrice }}
                </span>
                <span class="ml-2 text-lg font-regular text-red-500">
                    (<span id="set-tax-amount ">{{
                        currencyFormattedUSD(
                            data[0]?.product[0]?.product_unit_price
                        )
                    }}</span
                    >)
                </span>
            </div>
            <!-- Max Order -->
            <div class="detail">
                <div class="shipping-details-bottom-border pb-2">
                    <img
                        class="w-1"
                        src="../../../assets/img/payments/box_726475.png"
                        alt=""
                    />
                    <span class="pl-2">Shipping Information</span>
                </div>
                <div class="d-flex flex-wrap align-items-center mb-2 pro">
                    <p
                        class="font-regular font-for-tab d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-md-2 mr-0 pl-md-2 pl-sm-1 pr-md-2 pr-sm-1 text-capitalize"
                    >
                        Max Order: {{ data[0]?.product[0].maxOrder }}
                    </p>
                    <span class="px-2 py-2">|</span>
                    <p
                        class="font-regular font-for-tab d-inline-block font-size-sm text-body align-middle mt-1 ml-1 mr-md-2 mr-0 pl-md-2 pl-sm-1 pr-md-2 pr-sm-1 text-capitalize"
                    >
                        Packing Type: {{ data[0]?.product[0].packingType }}
                    </p>
                </div>
            </div>
            <!-- Custom Attributes -->
            <div class="custom-attributes my-4">
                <template
                    v-if="
                        data[0]?.product[0].product_spec !== null &&
                        data[0]?.product[0].product_spec !== undefined
                    "
                >
                    <div class="custom-attributes my-2 pb-2">
                        <div
                            v-for="(attrib, aid) in data[0]?.product[0]
                                .product_spec"
                            v-bind:key="attrib.variantId"
                        >
                            <!-- Show Color selection for colors -->
                            <div class="gap-3" :id="aid">
                                <p
                                    :for="attrib?.item"
                                    class="col-fixed"
                                    style="width: 100px"
                                >
                                    {{ attrib?.item }} :
                                </p>
                                <select
                                    class="form-control text-green-900 border-1 px-2 py-3"
                                    name="color"
                                    style="
                                        max-width: 230px;
                                        border: 1px solid red;
                                    "
                                    :label-for="attrib.item + aid"
                                    :track-by="currentSelected.proSpecItem"
                                    v-model="
                                        selectedCustomizations[attrib?.item]
                                    "
                                >
                                    <!--  -->
                                    <option disabled value="not_choose">
                                        Choose an option
                                    </option>
                                    <option
                                        v-for="(
                                            add, index
                                        ) in attrib.additional"
                                        :key="index"
                                        :name="add?.item"
                                        :value="add?.item"
                                    >
                                        {{ add?.item }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- Shipping Company-->
                    <div class="gpa-3">
                        <div class="my-2 pb-4">
                            <p class="text-color-secondary font-lg">
                                Shipping Company:
                            </p>
                            <div class="text-blue-500">
                                <p class="w-6 text-blue-500 border-1 px-2 py-3">
                                    {{ data[0]?.product[0]?.shippingCompany }}
                                </p>
                            </div>
                        </div>
                        <!-- Shipping Price Express Delivery-->
                        <div class="my-2 pb-4">
                            <p class="text-color-secondary font-lg">
                                Express Delivery:
                            </p>
                            <div class="text-indigo-900">
                                <select
                                    class="form-control text-green-900 border-1 px-2 py-3 cursor-pointer"
                                    style="
                                        max-width: 350px;
                                        border: 1px solid rgb(4, 166, 190);
                                    "
                                    :track-by="expressDelivery"
                                    @change="selectExpressDeliveryShippingPrice"
                                    v-model="selectedShippingExpressDelivery"
                                >
                                    <option
                                        disabled
                                        value="not_choose_express_delivery"
                                    >
                                        Choose an option
                                    </option>
                                    <option
                                        value="Express (1-2 Day)"
                                        :name="
                                            exchangeExpressDay &&
                                            data[0]?.product[0]?.expressPrice
                                        "
                                        :data-deliver-name="
                                            data[0]?.product[0]
                                                .shippingCompany +
                                            ' | ' +
                                            'Express (1-2 Day)'
                                        "
                                        :data-deliver-price="
                                            data[0]?.product[0]?.expressPrice
                                        "
                                        :data-deliver-khr="exchangeExpressDay"
                                        :selected="
                                            selectExpressDeliveryShippingPrice ==
                                            'Express (1-2 Day)'
                                        "
                                    >
                                        <div class="flex">
                                            <p>
                                                <span
                                                    >៛
                                                    {{
                                                        exchangeExpressDay
                                                            ? exchangeExpressDay
                                                            : 0
                                                    }}</span
                                                >
                                                <input
                                                    hidden
                                                    :value="
                                                        convertAmountRateExpressDay(
                                                            data[0]?.product[0]
                                                                ?.expressPrice
                                                                ? data[0]
                                                                      ?.product[0]
                                                                      ?.expressPrice
                                                                : 0
                                                        )
                                                    "
                                                />
                                                ({{
                                                    currencyFormattedUSD(
                                                        data[0]?.product[0]
                                                            ?.expressPrice
                                                    )
                                                }}) -
                                            </p>
                                            <span> Express (1-2 Day)</span>
                                        </div>
                                    </option>
                                    <option
                                        value="Normal (3-4 Day)"
                                        :name="
                                            exchangeNormalDay &&
                                            data[0]?.product[0]?.normalPrice
                                        "
                                        :data-deliver-price="
                                            data[0]?.product[0]?.normalPrice
                                        "
                                        :data-deliver-khr="exchangeNormalDay"
                                        :data-deliver-name="
                                            data[0]?.product[0]
                                                .shippingCompany +
                                            ' | ' +
                                            'Normal (3-4 Day)'
                                        "
                                        :selected="
                                            selectExpressDeliveryShippingPrice ==
                                            'Normal (3-4 Day)'
                                        "
                                    >
                                        <p>
                                            <span
                                                >៛ {{ exchangeNormalDay }}</span
                                            >
                                            <input
                                                hidden
                                                :value="
                                                    convertAmountRateNormalDay(
                                                        data[0]?.product[0]
                                                            ?.normalPrice
                                                            ? data[0]
                                                                  ?.product[0]
                                                                  ?.normalPrice
                                                            : 0
                                                    )
                                                "
                                            />
                                            ({{
                                                currencyFormattedUSD(
                                                    data[0]?.product[0]
                                                        ?.normalPrice
                                                )
                                            }}) -
                                        </p>
                                        <span> Normal (3-4 Day)</span>
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <!-- Product Quantity -->
            <div class="quantity-toggle">
                <button
                    @click="decreaseCount()"
                    class="btn-num-product-down border border-1 border-round"
                >
                    <i class="pi pi-minus" aria-hidden="true"></i>
                </button>
                <input
                    class="size8 m-text18 t-center num-product w-10rem quantity"
                    @keypress="isNumberQty($event)"
                    type="number"
                    step="1"
                    name="num-product"
                    v-model="quantityCart"
                    @input="updateQuantity(data[0]?.product[0], $event)"
                    @blur="checkQuantity(data[0]?.product[0], $event)"
                    :min="minQuantityUpdated(data[0]?.product[0].product_qty)"
                />
                <button
                    @click="increaseCount()"
                    class="btn-num-product-up color1 flex-c-m size7 bg8 eff2"
                >
                    <i class="pi pi-plus" aria-hidden="true"></i>
                </button>
            </div>
            <!-- Add to cart -->
            <p style="margin-top: 40px">
                <b-button
                    id="add-to-cart-sync"
                    class="add-to-cart"
                    @click="
                        addToCart(
                            parseInt(data[0]?.product[0].productId),
                            data[0]?.product[0]?.product_unit_price,
                            data[0]?.product[0]?.packingType,
                            data[0]?.product[0]?.maxOrder,
                            data[0]?.product[0]?.vendorId,
                            data[0]?.product[0]?.shopId,
                            data[0]?.product[0]?.shipCompanyId
                        )
                    "
                >
                    <i class="icon-basket-loaded"></i>
                    &nbsp; Add to Cart
                </b-button>
            </p>
            <hr />
            <div
                v-html="data[0]?.product[0].product_description_eng"
                class="description-wra"
            ></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isLoggedIn } from "@/utils/auth/auth";
import _ from "lodash";
import convertUSDToRiel from "@/utils/convertUSDTORiel";
export default {
    name: "ProductDescription",
    props: {
        countQty: {
            type: Number,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            exchangeRateRielProPrice: 0,
            exchangeExpressDay: 0,
            exchangeNormalDay: 0,
            product: null,
            selectedAddItem: null,
            selectedCustomizations: {},
            selectedCustomDeliveryExpress: {},
            showLoginPopover: false,
            currentSelected: {},
            quantityCart: 1,
            productDecs: {},
            expressDelivery: {},
            selectedShippingExpressDelivery: "Normal (3-4 Day)",
            expressOptionSelected: {},
        };
    },
    created() {
        this.product = this.data;
        // Selected Customization is just used for the simplicity. The values are also changed in this.product.
        this.selectedCustomizations = _.cloneDeep(this.currentSelected);
    },
    filters: {
        currencyFormatted: function (value) {
            return Number(value).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        },
    },
    computed: {
        ...mapGetters({
            currentUser: "auth/currentUserAuth",
        }),
        currentUserAuth() {
            return this.currentUser ? this.currentUser : null;
        },
    },
    methods: {
        truncateLongText(str, length, useWordBoundary){
            if (str.length <= length) { return str; }
            const subString = str.slice(0, length - 1); // the original check
            return (useWordBoundary
                ? subString.slice(0, subString.lastIndexOf(" "))
                : subString) + "...";
        },
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
        async convertRielAmountProductToCart(usdAmount) {
            try {
                const amountConvertRiel = parseInt(usdAmount)
                    ? parseInt(usdAmount)
                    : 0;
                this.exchangeRateRielProPrice =
                    (await convertUSDToRiel(amountConvertRiel)) ?? 0;
                const result = await Promise.resolve(amountConvertRiel);
                return result;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        updateQuantity: function (proQty, event) {
            var value = event.target.value;
            // parseInt(data[0]?.product[0].product_qty)
            var productQty = parseInt(proQty.product_qty);
            var valueInt = parseInt(value);
            // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
            if (value === "") {
                productQty = value;
            } else if (valueInt > 0 && valueInt < 100) {
                productQty = valueInt;
            }
            return productQty;
        },
        checkQuantity: function (proQty, event) {
            // Update quantity to 1 if it is empty
            if (event.target.value === "") {
                var product = 1;
                proQty.product_qty = parseInt(product);
                return product;
            }
        },
        minQuantityUpdated(min) {
            if (min == undefined) {
                min = parseInt(min);
            }
            return parseInt(min);
        },
        isLoggedIn() {
            return isLoggedIn();
        },
        increaseCount() {
            this.quantityCart += 1;
        },
        decreaseCount() {
            this.quantityCart -= 1;
            if (this.quantityCart === 1 && this.quantityCart < 0) {
                this.quantityCart = 1;
            }
            if (this.quantityCart === 0) {
                this.quantityCart = 1;
            }
        },
        async isNumberQty(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57) &&
                charCode !== 46
            ) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        async convertAmountRateExpressDay(usdAmount) {
            try {
                const amountConvertRielExpress = parseInt(usdAmount)
                    ? parseInt(usdAmount)
                    : 0;
                this.exchangeExpressDay =
                    (await convertUSDToRiel(amountConvertRielExpress)) ?? 0;
                const result = await Promise.resolve(amountConvertRielExpress);
                return result;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async convertAmountRateNormalDay(usdAmount) {
            try {
                const amountConvertRielExpress = parseInt(usdAmount)
                    ? parseInt(usdAmount)
                    : 0;
                this.exchangeNormalDay =
                    (await convertUSDToRiel(amountConvertRielExpress)) ?? 0;
                const resultNormal = await Promise.resolve(
                    amountConvertRielExpress
                );
                return resultNormal;
            } catch (error) {
                return Promise.reject(error);
            }
        },
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
        async addToCart(
            productId,
            productPrice,
            packageType,
            maxOrder,
            vendorId,
            shopId,
            shipCompanyId
        ) {
            if (!this.isLoggedIn()) {
                // this.$refs.popover.$emit('enable');
                this.showLoginPopover = true;
                return;
            }
            if (
                Object.keys(this.expressOptionSelected).length === 0 &&
                !Array.isArray(this.expressOptionSelected)
            ) {
                this.$notify.error({
                    title: `Please select express delivery`,
                    showClose: true,
                });
                return false;
            }
            if (
                Object.keys(this.selectedCustomizations).length === 0 &&
                this.selectedCustomizations.constructor === Object &&
                !Array.isArray(this.currentSelected)
            ) {
                this.$notify.error({
                    title: `Please select product spec`,
                    showClose: true,
                });
                return false;
            } else {
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
                    // Add to cart to order products
                    const addToCart = {
                        shipCompanyId: shipCompanyId ? shipCompanyId : 0,
                        shopId: shopId ? shopId : 0,
                        vendorId: vendorId ? vendorId : 0,
                        productId: parseInt(productId)
                            ? parseInt(productId)
                            : 1,
                        productQty: parseInt(this.quantityCart)
                            ? parseInt(this.quantityCart)
                            : 1,
                        productPrice: productPrice ? productPrice : 1,
                        productVariantName: this.currentSelected
                            ? this.currentSelected
                            : "",
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
                        maxOrder: maxOrder ? maxOrder : 0,
                        packageType: packageType ? packageType : "",
                        type: "new",
                    };
                    await this.$store.dispatch("cart/addToTheCart", {
                        ...addToCart,
                    });
                }
            }
        },
    },
};
</script>
<!-- Style -->
<style>
input {
    transition: all 0.25s linear;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}

input {
    outline: none;
}
.quantity > input {
    display: inline-block;
    width: 60px;
    height: 60px;
    position: relative;
    left: calc(50% - 30px);
    background: #fff;
    border: 2px solid #ddd;
    color: #7f7f7f;
    text-align: center;
    font: 600 1.5rem Helvetica, Arial, sans-serif;
}

.quantity > input:hover,
.quantity > input:focus {
    border-color: #f58551;
}
</style>
<style lang="scss" scoped>
// Product Qty Inputs
pre {
    background: #eee;
    padding: 1rem;
    border-radius: 5px;
}

$border: 2px solid #ddd;

.quantity-toggle {
    display: flex;

    input {
        border: 0;
        border-top: $border;
        border-bottom: $border;
        width: 2.5rem;
        text-align: center;
        padding: 0 0.5rem;
    }

    button {
        border: $border;
        padding: 0.5rem;
        background: #f5f5f5;
        color: #888;
        font-size: 1rem;
        cursor: pointer;
    }
}
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
        font-size: 18px;
        padding: 10px 40px;
    }
    .add-to-cart:hover {
        background-color: rgb(214, 38, 38); /*this for transparent button*/
        border: 2px solid rgb(214, 38, 38); /* this is for button border*/
        border-radius: 0px;
        color: white;
    }
    h3 {
        color: black;
    }
}
</style>
