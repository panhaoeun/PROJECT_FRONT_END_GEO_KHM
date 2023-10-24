<template>
    <!-- Order List -->
    <div class="myaccount-content">
        <template v-if="isLoggedIn()">
            <h3>Orders</h3>
            <div class="myaccount-table table-responsive text-center">
                <template v-if="customerOrderList.length > 0 && customerOrderList !== ''">
                    <el-table :data="customerOrderList" :v-loading="loadingOrderList" stripe style="width: 100%">
                        <el-table-column label="ID" type="index" width="50" />
                        <el-table-column prop="invoice_no" label="Invoice No" width="180" />
                        <el-table-column prop="orderDated" fixed label="Order Date" width="180" />
                        <el-table-column label="Total" width="200">
                            <template #default="scope">
                                {{ currencyFormattedKHRiel(scope.row?.total_price) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="Status" width="150" >
                            <template #default="scope">
                                <el-tag class="ml-2" :type="getOrderStatusPay(scope.row?.order_status ? scope.row?.order_status : '')">{{ scope.row?.order_status }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="Operation" width="200">
                            <template #default="scope">
                                <el-button size="small" @click="viewCustomerOrderItem(scope.row?.order_id)" class="bg-red-500 text-white hover:bg-red-500 w-5rem">
                                    View
                                </el-button >
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-else>
                    <el-empty description="Product Order Not Found!" />
                </template>
            </div>
        </template>
        <template v-else>
            Not Found Product Order
        </template>
    </div>
    <!--========Customer Order Dialogs============-->
    <el-dialog v-model="customerOrderDialog">
        <!-- Customer Order -->
        <div class="container">
            <div class="your-order-area">
                    <h3>My Order</h3>
                    <!-- View Order Product -->
                    <div class="your-order-wrap gray-bg-4">
                        <div class="your-order-info-wrap">
                            <div class="your-order-info">
                                <!-- My Order Information -->
                                <div class="your-order-info">
                                    <el-row :gutter="12">
                                        <!-- Customer Information -->
                                        <el-col :span="12">
                                            <el-card > 
                                                <div class="billing-info-wrap">
                                                    <h6>Customer Information</h6>
                                                    <div class="flex flex-column">
                                                        <div class="font-bold">
                                                            <span>{{ editOrderDetail?.customerName ?? '' }}</span>
                                                        </div>
                                                        <div>
                                                            <span>{{ editOrderDetail?.customerEmail ?? ''}}</span>
                                                        </div>
                                                        <div>
                                                            <span>{{ editOrderDetail?.customerPhone ?? '' }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                        <!-- Shop Information -->
                                        <el-col :span="12">
                                            <el-card>
                                                <div class="billing-info-wrap">
                                                    <h6>Shop Information</h6>
                                                    <div class="flex flex-column">
                                                        <div class="font-bold">
                                                            <span>{{ editOrderDetail?.shopName ?? '' }}</span>
                                                        </div>
                                                        <div>
                                                            <span>{{ editOrderDetail?.vendorEmail ?? ''}}</span>
                                                        </div>
                                                        <div>
                                                            <span>{{ editOrderDetail?.vendorPhone ?? ''}}</span>
                                                        </div>
                                                        <div>
                                                            <span>{{ editOrderDetail?.shopLocations ?? ''}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                            <div class="your-order-middle">
                                <ul>
                                    <li>
                                        Order no:
                                        <span>{{ editOrderDetail?.invoiceNo }}</span>
                                    </li>
                                    <li>
                                        Order date:
                                        <span>{{ editOrderDetail?.orderedDate }}</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- Product Orders List-->
                            <div class="your-order-middle" v-for="(orderList,index) in editOrderDetail?.orderListProduct" :key="index">
                                <ul v-if="orderList.orderItem">
                                    <li>
                                       <label class="font-bold text-red-500"> {{ orderList.orderItem?.product_name }}</label>
                                       <div class="flex flex-column">
                                          <span>
                                                Price: <label class="font-bold"> {{ currencyFormattedKHRiel(orderList.orderItem.product_price) }}</label>
                                          </span>
                                          <span>
                                            Qty: {{ orderList.orderItem.quantity }}
                                          </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <!-- Sub total -->
                             <div class="your-order-info order-subtotal">
                                <ul>
                                    <li>Subtotal <span>{{ currencyFormattedKHRiel(editOrderDetail?.subTotal) }} </span></li>
                                </ul>
                            </div>
                            <div class="your-order-info order-subtotal">
                                <ul>
                                    <li>Shipping <span>{{ currencyFormattedKHRiel(editOrderDetail?.deliveryCost) }} </span></li>
                                </ul>
                            </div>
                            <div class="your-order-info order-total">
                                <ul>
                                    <li>Total <span>{{ currencyFormattedKHRiel(editOrderDetail?.totalPrice) }}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- Shipping Address & Billing Address -->
                    <div class="your-order-info order-shipping gap-2">
                        <div class="myaccount-content pb-2">
                            <h3>Shipping Address</h3>
                            <address>
                                <p>
                                    <strong>{{ editOrderDetail?.shippingName }}</strong>
                                </p>
                                <p>
                                    <strong>{{ editOrderDetail?.shippingPhoneNumber }}</strong>
                                </p>
                                <p>
                                    {{ editOrderDetail?.shippingAddr }}
                                </p>
                            </address>
                        </div>
                        <!-- Billing Address -->
                        <div class="myaccount-content pb-2">
                            <h3>Billing Address</h3>
                            <address>
                                <p>
                                    <strong>{{ editOrderDetail?.billingName }}</strong>
                                </p>
                                <p>
                                    <strong>{{ editOrderDetail?.billingPhoneNumber }}</strong>
                                </p>
                                <p>
                                      {{ editOrderDetail?.billingAddr }}
                                </p>
                            </address>
                        </div>
                    </div>
                </div>
        </div>
    </el-dialog>
    <!--========Customer Order Dialogs============-->
</template>
<!--Script of order list of customer report -->
<script>
    import {isLoggedIn} from '@/utils/auth/auth';
    import CustomerOrdersServices from "@/services/customers/order_payments/CustomerOrdersServices";
    export default{
        data() {
            return {
                customerOrderDialog: false,
                customerOrderList: [],
                loadingOrderList: true,
                editOrderDetail: [],
                ENV_HOST_PATH_FILE : process.env.VUE_APP_PATH_FILE
            }
        },
        created() {
            this.customerOrderSer = new CustomerOrdersServices();
        },
        mounted() {
            this.getOrderListCustomerOrder();
        },  
        methods: {
            currencyFormattedKHRiel: function (value) {
                return new Intl.NumberFormat('km-KH', { style: 'currency', currency: 'KHR', currencyDisplay: 'symbol' }).format(value ? value : 0).replace(/\b(\w*KHR\w*)\b/, '៛');
            },
            currencyFormattedUSD: function (value) {
                return Number(value ? value : 0).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                });
            },
            // Check login
            isLoggedIn() {
                return isLoggedIn();
            },
            getOrderListCustomerOrder(){
                this.customerOrderSer.getCustomerOrderList()
                    .then((order) => {
                        if(!order){
                            this.customerOrderList = Array.isArray()?? [];
                            this.loadingOrderList = false;
                        }
                        setTimeout(function(){
                            this.loadingOrderList = false;
                        }.bind(this),1000);
                        this.customerOrderList = order ? order : '';
                    })
                    .catch((error) => {
                        return Promise.reject(error);
                    })
            },
            getOrderStatusPay(status) {
                switch (status) {
                    case 'Pending':
                        return 'warning';
                    case 'Processing':
                        return 'warning';
                    case 'Declined':
                        return 'danger';
                    case 'Packing':
                        return 'warning';
                    case 'Delivery':
                        return 'success';
                    default:
                        return null;
                }
            },

            viewCustomerOrderItem(orderId){
                this.customerOrderDialog = true;
                this.customerOrderSer.getOrderDetailItem(orderId)
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
            }
        }
    }
</script>