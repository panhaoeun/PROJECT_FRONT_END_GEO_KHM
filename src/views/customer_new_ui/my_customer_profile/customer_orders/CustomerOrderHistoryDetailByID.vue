<template>
    <client-only>
        <account-layout
            active-route="orders"
            class="mb-20 mb-sm-15"
        >
            <template v-slot:rightArea>
                <!-- Spinner -->
                <div
                    class="spinner-wrapper flex"
                    v-if="fetchingOrderData"
                >
                    <spinner
                        :radius="100"
                    />
                </div>
                <!--Order Detail-->
                <div class="card"  v-if="Object.keys(editOrderDetail).length">
                    <div class="flex justify-content-center">
                        <div class="flex flex-column justify-content-center">
                            <h5 class="justify-content-center font-bold">
                                Invoice
                                ({{ editOrderDetail?.shopName }})
                            </h5>
                        </div>
                    </div>
                    <div class="p-20 p-sm-15 pt-20">
                        <!-- Invoices -->
                       
                        <div class="flex f-reverse sided block-md mb-30 mb-sm-15">
                            <!-- Payment Info -->
                            <ul class="mx-w-400x order-details mb-md-15">
                                <p class="font-bold text-danger">Payment Info:</p>
                                <li>
                                    <span>
                                        Order no:
                                    </span>
                                    <span>#{{ editOrderDetail?.invoiceNo }}</span>
                                </li>
                                <li>
                                    <span>
                                        Payment Method:
                                    </span>
                                    <span>{{ editOrderDetail?.paymentMethod }}</span>
                                </li>
                                <li>
                                    <span>
                                        Order date:
                                    </span>
                                    <span>{{ editOrderDetail?.orderedDate }}</span>
                                </li>
                            </ul>
                            
                            <!-- Shipping Address of Customer -->
                            <div
                                class="mx-w-100x lh-2"
                            >
                                <p class="font-bold text-danger">Customer Info:</p>
                                <b>{{ dataFromObject(editOrderDetail?.shippingAddr, 'name') }}</b>
                                <span class="block">
                                    {{ generateAddress(editOrderDetail?.shippingAddr) }}
                                   <label class="font-bold">Shipping Address:</label> {{editOrderDetail?.shippingAddr}}
                                </span>
                                <span  
                                v-if="editOrderDetail?.customerEmail"
                                class="block">
                                   <label class="font-bold">Email:</label>  {{ editOrderDetail?.customerEmail }}
                                </span>
                                <span class="block">
                                     <label class="font-bold">Phone:</label>{{ editOrderDetail?.customerPhone }}
                                </span>
                                
                            </div>
                        </div>
                        <!-- Order Status -->
                        <!-- <div class="mb-15">
                            <ordered-status
                                :status-of-order="ordered.status"
                            />
                        </div> -->
                        <!-- Order List Detail Item -->
                        <div class="flow-auto mtb-15">
                            <table class="mn-w-600x no-bg w-100 mtb-0">
                                <tr class="lite-bold">
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                                <tr
                                v-for="(value, index) in editOrderDetail?.orderListProduct"
                                :key="index"
                                >
                                    <td>
                                        <router-link
                                            to="/"
                                            class="font-bold text-black"
                                        >
                                            {{ truncateLongText(value.orderItem?.product_name,50, '\b') }}
                                            <span
                                                class="block text-blue-800"
                                                v-if="value?.orderItem"
                                            >
                                                <span v-for="([key, value], index) in Object.entries(value.orderItem?.product_spec)" :key="index">
                                                    <b>{{key}}</b> : {{value}}
                                                </span>
                                            </span>
                                        </router-link>
                                    </td>
                                    <td>
                                        {{ value.orderItem?.quantity }}
                                    </td>
                                    <td>
                                        {{ currencyFormattedKHRiel(value.orderItem?.product_price) }}
                                        <!-- {{ productItemPrice }} -->
                                    </td>
                                </tr>
                              
                            </table>
                        </div>
                        <!-- Vendor Info -->
                        <div class="left">
                            <ul class="mx-w-400x order-details mb-md-15">
                                <p class="font-bold text-danger">Vendor Info</p>
                                <li>
                                    <span>
                                        Shop:
                                    </span>
                                    <span>{{ editOrderDetail?.shopName }}</span>
                                </li>
                                <li>
                                    <span>
                                        Phone:
                                    </span>
                                    <span>
                                        {{ editOrderDetail?.vendorPhone}}
                                    </span>
                                </li>
                                <!-- <li v-if="editOrderDetail?.vendorEmail">
                                    <span>
                                        Email:
                                    </span>
                                    <span>
                                        {{ editOrderDetail?.vendorEmail}}
                                    </span>
                                </li> -->
                                <li>
                                    <span>
                                        Location:
                                    </span>
                                    <span>
                                        {{ editOrderDetail?.shopLocations}}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <!-- Total Amount Item -->
                        <div class="flex right no-space">
                            <ul
                                class="mx-w-700x order-details order-price gap-10"
                            >
                                <li>
                                    <span>
                                        Sub Total:
                                    </span>
                                    <span class="semi-bold">   
                                        {{ currencyFormattedKHRiel(editOrderDetail.subTotal) }}
                                        ({{ currencyFormattedUSD(editOrderDetail.subTotalUSD) }} )
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Shipping Cost:
                                    </span>
                                    <span class="semi-bold">
                                        {{ currencyFormattedKHRiel(editOrderDetail?.deliveryCost) }}
                                        ({{ currencyFormattedUSD(editOrderDetail?.deliveryCostUSD) }})
                                    </span>
                                </li>
                                <li
                                    class="mb-0"
                                    >
                                    <span>
                                        Total:
                                    </span>
                                    <span class="semi-bold f-11">
                                        {{ currencyFormattedKHRiel(editOrderDetail?.unitPrice) }}
                                        ({{ currencyFormattedUSD(editOrderDetail?.unitPriceUSD) }})
                                    </span>
                                </li>
                            </ul>
                        </div>
                </div>
                </div>
            </template>
        </account-layout>
    </client-only>
</template>
<!-- Script -->
<script>
import convertRielToUSDAmount from "@/utils/convertRielToUSD";
import {isLoggedIn} from '@/utils/auth/auth';
import CustomerOrdersServices from "@/services/customers/order_payments/CustomerOrdersServices";
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import AccountLayout from '@/components/ui_component_new_frontend/AccountLayout';
import metaHelper from '@/mixin/metaHelper';
import util from '@/mixin/util';

export default {
    middleware: ['common-middleware'],
    components: {
        AccountLayout,
        Spinner
    },
    computed:{
        orderId() {
            return parseInt(this.$route.params.orderId)
        },  
    },
    mixins: [util, metaHelper],
    props: {},
    head() {
      return {
        title: 'Order',
        meta: []
      }
    },
    data() {
        return {
            customerOrderDialog: false,
            customerOrderList: [],
            loadingOrderList: true,
            editOrderDetail: [],
            ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE,
            cancelPopup: false,
            fetchingOrderData: false,
            rateProductId: 0,
            productItemPrice: 0
        };
    },
    created() {
        this.customerOrder = new CustomerOrdersServices();
        this.viewCustomerOrderItem();
    },
    methods: {
        productAttributes(itemSpec) {
            console.log(itemSpec)
            return itemSpec?.product_spec.map(i => {
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
        truncateLongText(str, length, useWordBoundary){
            if (str.length <= length) { return str; }
            const subString = str.slice(0, length - 1); // the original check
            return (useWordBoundary
                ? subString.slice(0, subString.lastIndexOf(" "))
                : subString) + "...";
        },
        currencyFormattedKHRiel: function (value) {
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol' }).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/, '៛');
        },
        currencyFormattedUSD: function (value) {
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });
        },
        generateAddress(obj) {
            if (!obj) {
                return ''
            }
        },
        // Check login
        isLoggedIn() {
            return isLoggedIn();
        },
        viewCustomerOrderItem(){
            this.customerOrder.getOrderDetailItem(this.orderId)
                .then((order) => {
                    if(!order){
                        this.editOrderDetail = Array.isArray()?? [];
                        this.loadingOrderList = false;
                    }
                    setTimeout(function(){
                        this.loadingOrderList = false;
                    }.bind(this),1000);
                    this.editOrderDetail = order ? order : '';
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
        },
        productThumbnailRULFormate(productThumbnail){
            return this.ENV_HOST_PATH_FILE + `uploads/products_img/thumbnail/` + String(productThumbnail) ?? '';
        },
        async convertAmountProductPriceItem(rielAmount) {
            try {
                const amountConvertRielExpress = parseInt(rielAmount)? parseInt(rielAmount): 0;
                this.productItemPrice = (await convertRielToUSDAmount(amountConvertRielExpress ? amountConvertRielExpress : 0)) ?? 0;
                const result = await Promise.resolve(amountConvertRielExpress);
                return result;
            } catch (error) {
                return Promise.reject(error);
            }
        },
    },
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>