<template>
  <client-only>
    <account-layout
      active-route="orders"
      @clicked-orders="loadData"
      class="mb-5"
    >
      <template v-slot:rightArea>
            <div>
                    <!-- <order-tabbing
                        ref="orderTab"
                        @fetch-data="fetchingData"
                    /> -->
                    <div
                    class="spinner-wrapper flex justify-content-center flex-wrap layer-white"
                    v-if="fetchingOrderData"
                    >
                    <spinner
                        :radius="100"
                    />
                    </div>
                    <div
                        v-else-if="currentOrders && !currentOrders.length"
                        class="info-msg"
                    >
                        No order yet...
                    </div>
                    <div v-else>
                    <div
                        v-for="(value, index) in currentOrders"
                        :key="index"
                        class="card mb-15"
                    >
                        <div class="flex sided b-b ptb-10 plr-20 plr-sm-15 block-xs">
                            <!-- Order Status -->
                            <div>
                                <router-link
                                    :to="`/user/orders/${parseInt(value?.order_id)}`"
                                    class="block font-bold text-black"
                                >
                                Order
                                <span class="link-color">
                                    #{{ value?.invoice_no }}
                                </span>
                                </router-link>
                                <span class="color-lite f-9">
                                    Placed on
                                    {{ convertDateHistory(value?.order_date) }}
                                </span>
                            </div>
                            <div>
                                <router-link
                                :to="`/user/orders/${parseInt(value?.order_id)}`"
                                class="link-color mt-xs-5"
                                >
                                    View Details
                                </router-link>
                            </div>
                        </div>
                        <!-- Order -->
                        <div
                        class="flex sided ptb-10 plr-20 plr-sm-15"
                        >
                        <div class="flex grow gap-15">
                            <!-- Order Manger -->
                            <div class="flex grow sided block-xs">
                                <div class="flex-column flex">
                                    <p>
                                        <label class="font-bold text-black">Name:</label>
                                       {{ value?.shipping_name }}
                                    </p>
                                    <p>
                                        <label class="font-bold text-black">Phone Number:</label>
                                       {{ value?.shipping_phone_number }}
                                    </p>
                                    <span>
                                        <label class="font-bold text-black">Address:</label>
                                        {{ value?.shipping_address }}
                                    </span>
                                </div>
                                <div class="flex-column flex-end gap-10">
                                    <h5 class="text-sm mr-20 mr-sm-15">
                                        <span class="color-lite font-bold f-9 mr-5">
                                            Shipping Fee:
                                        </span>
                                        {{ currencyFormattedKHRiel(value?.deliver_cost) }}
                                    </h5>
                                    <h5 class="text-sm">
                                        <span class="color-lite f-9 mr-5 font-bold">
                                            Total:
                                        </span>
                                        {{ currencyFormattedKHRiel(value?.total_price) }}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        </div>
                        <!-- Order Status -->
                        <div
                        class="flex sided block-xs b-t ptb-10 plr-20 plr-sm-15 pos-rel"
                        >
                                <!-- Payment method -->
                                    <p
                                        class="mr-15"
                                    >
                                    <span
                                        class="color-lite f-8 mr-5"
                                    >
                                        Payment Method:
                                    </span>
                                    <span class="pl-2 font-bold text-black">
                                        {{ value?.payment_method ? value?.payment_method : '' }}
                                    </span>
                                </p>
                                <!-- Order Status -->
                                <div class="flex sided">
                                    <p>
                                        <span
                                        class="color-lite f-8 mr-5"
                                        >
                                            Order Status:
                                        </span>
                                        <span
                                            class=" mr-5"
                                        >
                                            <el-tag size="large" class="w-6rem text-md font-bold" :type="getOrderStatusHistory(value?.order_status ? value?.order_status : '')">{{ value?.order_status }}</el-tag>
                                        </span>
                                    </p>
                                    <!-- <pay-button
                                    v-if="parseInt(dataFromObject(value, 'cancelled', 0)) !== status.PUBLIC
                                        && parseInt(value.payment_done) === paymentStatusIn.UNPAID
                                        && parseInt(value.order_method) !== orderMethods.CASH_ON_DELIVERY"
                                    :order="value"
                                    /> -->
                                </div>
                        </div>
                        </div>
                    </div>

                    <div class="flow-hidden">
                    <pagination
                        v-if="!changedSelectedOrder"
                        ref="orderPagination"
                        :total-page="totalPage"
                        @fetching-data="currentOrders"
                    />
                    </div>
            </div>
      </template>
    </account-layout>
  </client-only>
</template>
<!-- Script-->
<script>
  import moment from "moment-timezone";
  import CustomerOrdersServices from "@/services/customers/order_payments/CustomerOrdersServices";
  import {isLoggedIn} from '@/utils/auth/auth';
  import {mapGetters, mapActions} from 'vuex'
  import util from '@/mixin/util'
  import metaHelper from '@/mixin/metaHelper'
//   import LazyImage from '@/components/ui_component_new_frontend/LazyImage'
//   import RatePopup from '@/components/ui_component_new_frontend/RatePopup'
//   import PaymentPopup from '@/components/ui_component_new_frontend/PaymentPopup'
  import AccountLayout from '@/components/ui_component_new_frontend/AccountLayout'
  import routeParamHelper from '@/mixin/routeParamHelper'
  import Pagination from '@/components/ui_component_new_frontend/Pagination'
//   import OrderTabbing from "@/components/ui_component_new_frontend/OrderTabbing";
  import Spinner from "@/components/ui_component_new_frontend/Spinner";
//   import convertRielToUSDAmount from "@/utils/convertRielToUSD";
//   import PayButton from "@/components/ui_component_new_frontend/PayButton";
//   import PriceFormat from "@/components/ui_component_new_frontend/PriceFormat";

  export default {
    middleware: ['common-middleware'],
    head() {
      return {
        title: 'Orders',
        meta: []
      }
    },
    data() {
      return {
        payNowOrder: null,
        deactivate: true,
        fetchingOrderData: false,
        changedSelectedOrder: false,
        rateProductId: 0,
        rateOrderId: 0,
        orderParams: {},
        customerOrderList: [],
        exchangeAmountOrderUSD: 0
      }
    },
    watch: {},
    components: {
    //   PriceFormat,
    //   PayButton,
      Spinner,
    //   OrderTabbing,
    //   LazyImage,
    //   RatePopup,
      AccountLayout,
      Pagination
    },
    mixins: [util, metaHelper, routeParamHelper],
    computed: {
      totalPage() {
        return this.customerOrderList.length;
      },
      currentOrders() {
        return this.customerOrderList
      },
      ...mapGetters('language', ['langCode']),
      ...mapGetters('order', ['orderedList']),
      ...mapGetters('common', ['currencyIcon', 'setting'])
    },
    created() {
        this.customerOrderSer = new CustomerOrdersServices();
        this.getOrderListCustomerOrder();
    },  
    methods: {
        // Convert Currency Amount
        currencyFormattedKHRiel(value){
            return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol'}).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/,'៛');  
        },
        currencyFormattedUSD(value){
            return Number(value ? value : 0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });  
        },
       convertDateHistory(dataFormate){
            if (dataFormate) {
                return moment(String(dataFormate)).format('hh:mm:ss dddd MMMM D, YYYY')
            }
       },
       async generateParam() {
        this.changedSelectedOrder = true
        await this.fetchingData()
      },
      rateNow(ordered) {
        this.rateProductId = ordered.product.id
        this.rateOrderId = parseInt(ordered.order_id)
      },
      loadData() {
        this.$refs.orderPagination.routeParam()
      },
      async fetchingData() {
        this.fetchingOrderData = true
        setTimeout(async () => {
          try {
            this.settingRouteParam()
            const params = {
              ...{
                time_zone: this.timeZone,
                order_by: this.orderBy,
                type: this.orderByType,
                page: this.page,
                q: this.search,
                user_token: await this.getUserToken(),
              },
              ...this.$refs.orderTab?.generateParam()
            }
            const data = await this.getOrderByUser({
              payload: params,
              lang: this.langCode
            })
            if (data?.status !== 200) {
              this.hasError(data)
            }
          } catch (e) {
            return Promise.reject(e);
          }
          this.changedSelectedOrder = false
          this.fetchingOrderData = false
        }, 100)
      },
        ...mapActions('user', ['getUserToken']),
        ...mapActions('order', ['getOrderByUser']),
        // Check login
        isLoggedIn() {
            return isLoggedIn();
        },
        getOrderListCustomerOrder(){
            this.fetchingOrderData = true
            this.customerOrderSer.getCustomerOrderList()
                .then((order) => {
                    if(!order){
                        this.customerOrderList = Array.isArray()?? [];
                        this.loadingOrderList = false;
                    }
                    setTimeout(function(){
                        this.customerOrderList = order ? order : '';
                        this.loadingOrderList = false;
                    }.bind(this),1000);
                    this.changedSelectedOrder = false
                    this.fetchingOrderData = false
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
        },
        getOrderStatusHistory(status) {
            switch (status) {
                case 'Pending':
                    return 'info';
                case 'Processing':
                    return 'warning';
                case 'Declined':
                    return 'danger';
                case 'Packing':
                    return 'light';
                case 'Delivery':
                    return 'success';
                default:
                    return null;
            }
        },
    },

    async mounted(){
       await this.fetchingData()
        window.scrollTo(0,0);
    },
    async asyncData({store, error, $auth}) {
      try {

        if(!store.state?.common?.setting?.guest_checkout) {
          if (!$auth.loggedIn) {
            $auth.redirect('login')
            return false
          }
        }

        if(!store.state.common.paymentGateway){
          const data = await store.dispatch('common/getRequest', {
            params: {},
            api: 'paymentGateway'
          })

          store.commit('common/SET_PAYMENT_GATEWAY', data.data)
        }
      } catch (e) {
        error(e)
      }
    },
  }
</script>

<style>

</style>