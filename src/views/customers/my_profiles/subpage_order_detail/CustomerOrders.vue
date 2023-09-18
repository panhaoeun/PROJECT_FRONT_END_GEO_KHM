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
                        <el-table-column label="Total">
                            <template #default="scope">
                                {{ scope.row?.total_price }}
                            </template>
                        </el-table-column>
                        <el-table-column label="Status">
                            <template #default="scope">
                                <el-tag class="ml-2" :type="getOrderStatusPay(scope.row?.payment_status ? scope.row?.payment_status : '')">{{ scope.row?.payment_status }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="Operation" width="200">
                            <template #default="scope">
                                <el-button size="small" @click="viewCustomerOrderItem(scope.row?.order_id)">
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
                                <ul>
                                    <li>
                                        Product
                                        <span>Total</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="your-order-middle">
                                <ul>
                                    <li>
                                        Order no:
                                        <span>{{ editOrderDetail?.orderedDate }}</span>
                                    </li>
                                    <li>
                                        Order date:
                                        <span>{{ editOrderDetail?.orderedDate }}</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- Product Orders -->
                            <div class="your-order-middle" v-for="(orderList,index) in editOrderDetail?.orderListProduct" :key="index">
                                <ul v-if="orderList.orderItem && orderList.productImg.product_picture">
                                    <li>
                                        <img :src='`${ENV_HOST_PATH_FILE}uploads/products_img/thumbnail/${orderList.productImg?.product_picture}`' width="50" class="pl-2"/>
                                       {{ orderList.orderItem.product_name }}
                                       <span>
                                          <p>
                                            Price:   {{ orderList.orderItem.product_price }}
                                          </p>
                                          <p>
                                            Qty: {{ orderList.orderItem.quantity }}
                                          </p>
                                       </span>
                                    </li>
                                </ul>
                            </div>
                            <div class="your-order-info order-subtotal">
                                <ul>
                                    <li>Subtotal <span>{{ editOrderDetail?.subTotal }} ៛ </span></li>
                                </ul>
                            </div>
                            <div class="your-order-info order-total">
                                <ul>
                                    <li>Total <span>8,315.86 ៛</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- Shipping Address & Billing Address -->
                    <div class="your-order-info order-shipping gap-2">
                        <div class="myaccount-content pb-2">
                            <h3>Shipping Address</h3>
                            <address>
                                    <p><strong>Alex Tuntuni</strong></p>
                                    <p>1355 Market St, Suite 900 <br>
                                San Francisco, CA 94103</p>
                                    <p>Mobile: (123) 456-7890</p>
                            </address>
                        </div>
                        <div class="myaccount-content pb-2">
                            <h3>Billing Address</h3>
                            <address>
                                    <p><strong>Alex Tuntuni</strong></p>
                                    <p>1355 Market St, Suite 900 <br>
                                San Francisco, CA 94103</p>
                                    <p>Mobile: (123) 456-7890</p>
                            </address>
                        </div>
                    </div>
                </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="customerOrderDialog = false">Cancel</el-button>
                <el-button type="primary" @click="innerVisible = true">
                open the inner Dialog
                </el-button>
            </div>
        </template>
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