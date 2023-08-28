<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between px-2 py-2">
            <h2 class="relative text-black text-3xl section section-title:before">Order Details</h2>
        </div>
        <!-- Data Details -->
        <div class="px-2 w-full">
            <div class="row">
                <!-- List order item -->
                <div class="col-lg-8 col-xl-9">
                    <el-card class="box-card h-100" v-if="customerDetailOrder.length > 0 && customerDetailOrder !== '' ">
                        <div class="flex justify-content-between">
                            <div class="relative text-black text-xl section section-title:before">
                                <p class="h6">Order ID #{{parseInt( customerDetailOrder[0]?.orderId) ?? 0}}</p>
                                <span class="text-sm">{{ customerDetailOrder[0]?.orderDate ?? '' }}</span>
                            </div>
                        </div>
                        <div class="flex justify-content-center align-items-center">
                            <div class="justify-content-center flex">
                                <div class="flex flex-column align-items-center justify-content-center mr-2">
                                   <div class="text-sm pb-3">
                                        <span class="text-sm mr-2">Status:</span>
                                        <Tag severity="danger" value="Pending"></Tag>
                                   </div>
                                   <div class="text-sm">   
                                      <span class="text-sm mr-2">Payment Method:</span> 
                                      <span class="h6 mr-2">{{ customerDetailOrder[0]?.payment_method ?? '' }}</span> 
                                   </div>
                                    <div class="text-sm p-2">   
                                      <span class="text-sm mr-2">Payment Status:</span> 
                                      <span class="h6 mr-2 text-danger">{{ customerDetailOrder[0]?.payment_status ?? ''  }}</span> 
                                   </div>
                                </div>
                            </div>
                        </div>
                         <!-- List items detail -->
                        <div class="align-items-center justify-content-center">
                            <div class="px-2 my-2">
                                <template v-if="orderItems.length === 0 && orderItems == ''">
                                    <el-empty :image-size="150" />
                                </template>
                                <div v-if="orderItems && orderItems.length>0 && orderItems!== ''">
                                    <el-table 
                                        :data="orderItems"
                                        class="text-sm" stripe style="width: 100%"
                                        :summary-method="getSummariesOrderItem"
                                        show-summary
                                    >
                                        <el-table-column type="index" label="ID" width="60"/>
                                        <el-table-column label="Item Details">
                                            <template #default="{ row }">
                                                <div class="flex flex-column">
                                                    <Avatar :image="`${VUE_APP_HOST_URL}uploads/products_img/thumbnail/${row?.thumbnail}`" size="small"  :data-id="row?.product_eng"/>
                                                    <span class="text-sm text-semibold">{{truncateLongText( row?.product_eng, 15 ,'\b') }}</span>
                                                    <span class="text-sm">Price: {{ parseFloat(row?.product_price).toPrecision(5,3) }}</span>
                                                    <span class="text-sm">Qty: {{ parseFloat(row?.quantity).toPrecision(5,3) }}</span>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="product_price" label="Price"/>
                                        <el-table-column prop="discount_amount" label="Discount"/>
                                    </el-table>
                                </div> 
                                <!-- <div class="flex justify-content-end">
                                    <div class="flex flex-column py-3 my-2">
                                        <div class="border-round">
                                            <span class="mr-3">Shipping:</span>
                                            <span class="font-bold">$10.00</span>
                                        </div>
                                        <div class="border-round">
                                            <span class="mr-3 font-bold">Total:</span>
                                            <span class="font-bold">$485.00</span>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </el-card>  
                </div>
                <!-- Detail of Orders -->
                <div class="col-lg-4 grid col-xl-3 d-flex flex-column gap-3">
                   <div class="gap-3 column-gap-4 row-gap-6">
                        <!--================= Order & Shipping Info===============-->
                        <el-card class="box-car">
                            <div class="flex justify-content-between flex flex-wrap gap-3">
                                <div class="relative text-black text-sm section section-title:before">
                                    <p class="h6">Order & Shipping Info</p>
                                </div>
                                <!-- Options Orders -->
                                <div class="grid formgrid text-sm">
                                    <div class="col-12 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm font-semibold">Order Status</label>
                                            <Dropdown v-model="selectedPaymentStatus" :options="orderStatusOption" optionLabel="name" placeholder="Select a Order Status" class="w-full text-sm"/>
                                        </div>
                                    </div>
                                    <div class="col-12 field">
                                        <div class="field">
                                            <label for="name_en" class="text-sm font-semibold">Payment Status</label>
                                            <Dropdown v-model="selectedPaymentStatus" optionLabel="name" placeholder="Select a Payment Status" class="text-sm w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                        <!--================Customer Information============-->
                        <el-card class="box-card" v-if="customerDetailOrder.length > 0 && customerDetailOrder !== '' ">
                            <div class="flex justify-content-between flex flex-wrap gap-3">
                                <div class="relative text-black text-sm section section-title:before">
                                    <p class="h6">Customer Information</p>
                                </div>
                            </div>
                             <!-- Options Orders -->
                            <div class="px-2 py-2">
                                <div class="mb-4 d-flex align-items-center gap-2">
                                    <img class="justify" v-if="customerDetailOrder[0]?.cusProfile !== ''" src="../../../../../src/assets/img/product_icons/customer_icon_default_order.png" alt="Image" width="50"/>
                                    <img class="justify" v-else src="../../../../../src/assets/img/product_icons/customer_icon_default_order.png" alt="Image" width="50"/>
                                    <div class="flex flex-column title-customer-information">
                                        <span>{{ customerDetailOrder[0]?.name_eng ?? '' }}</span>
                                        <span>{{ customerDetailOrder[0]?.user_email  ?? ''}}</span>
                                        <span>{{ customerDetailOrder[0]?.user_phonenumber ?? ''}}</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                        <!--=========== Shipping Address ===========-->
                        <el-card class="box-card" v-if="customerShipping[0]?.shipAdd01 !== '' &&  customerShipping[0]?.shipAdd01 !== null">
                            <div class="flex justify-content-between flex flex-wrap gap-3">
                                <div class="relative text-black text-sm section section-title:before">
                                    <p class="h6">Shipping Address</p>
                                </div>
                            </div>
                             <!-- Options Orders -->
                            <div class="py-2">
                                <div class="d-flex flex-column gap-2">
                                    <div>
                                        <span>Name : {{  customerDetailOrder[0]?.name_eng ?? '' }}</span>
                                        <span>Contact : {{  customerDetailOrder[0]?.user_phonenumber ?? '' }}</span>
                                    </div>
                                    <div class="d-flex align-items-start gap-2">
                                       <i class="pi pi-map-marker" style="font-size: 1.2rem"></i>
                                        {{ customerShipping[0]?.shipAdd01 ?? ''}},
                                        {{ customerShipping[0]?.shipAdd02 ?? '' }},
                                        {{ customerShipping[0]?.shipCity ?? ''}}.
                                    </div>
                                </div>
                            </div>
                        </el-card>
                        <!-- ===============Billing address ===========-->
                        <el-card class="box-card"  v-if="customerShipping[0]?.billAdd01 !== '' &&  customerShipping[0]?.billAdd01 !== null">
                            <div class="flex justify-content-between flex flex-wrap gap-3">
                                <div class="relative text-black text-sm section section-title:before">
                                    <p class="h6">Billing Address</p>
                                </div>
                            </div>
                             <!-- Options Orders -->
                            <div class="py-2">
                                <div class="d-flex flex-column gap-2">
                                    <div>
                                        <span>Name : {{  customerDetailOrder[0]?.name_eng }}</span>
                                    </div>
                                    <div class="d-flex align-items-start gap-2">
                                       <i class="pi pi-map-marker" style="font-size: 1.2rem"></i>
                                        {{ customerShipping[0]?.billAdd01 ?? '' }},
                                        {{ customerShipping[0]?.billAdd02??  ''}},
                                        {{ customerShipping[0]?.billCity ?? '' }}.
                                    </div>
                                </div>
                            </div>
                        </el-card>
                        <!-- ===============Shop Information ===========-->
                        <el-card class="box-card" v-if="shopInfoItemOrder.length >0 && shopInfoItemOrder!==''">
                            <div class="flex justify-content-between flex flex-wrap gap-3">
                                <div class="relative text-black text-sm section section-title:before">
                                    <p class="h6">Shop Information</p>
                                </div>
                            </div>
                            <div class="py-2">
                                <div class="mb-4 d-flex align-items-center gap-2">
                                    <!-- ${VUE_APP_HOST_URL}uploads/products_img/thumbnail/${row?.thumbnail} -->
                                    <img class="justify"
                                        v-if="shopInfoItemOrder[0]?.shopLogo" :title="shopInfoItemOrder[0]?.shopEn ?? ''"
                                        :src="`${VUE_APP_HOST_URL}/uploads/sellers/${shopInfoItemOrder[0]?.shopLogo ?? ''}`"
                                        alt="Image" width="80"/>
                                    <img class="justify" v-else src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f38e9ce54.png" alt="Image" width="80"/>
                                    <div class="flex flex-column title-customer-information">
                                        <span class="pb-2">{{ shopInfoItemOrder[0]?.store ?? '' }}</span>
                                        <div class="pb-2" v-if="shopInfoItemOrder[0]?.buildingAddress !== '' && shopInfoItemOrder[0]?.buildingAddress !== null">
                                            <strong>Building Address: </strong>
                                            <span>{{ shopInfoItemOrder[0]?.buildingAddress ?? '' }}</span>
                                        </div>
                                        <div class="text-sm pb-2" v-if="shopInfoItemOrder[0]?.shopAddr01 !== '' && shopInfoItemOrder[0]?.shopAddr01 !== null">
                                            <strong>City: </strong>
                                            <span>{{ shopInfoItemOrder[0]?.shop_city ?? '' }}</span>
                                        </div>
                                        <div class="d-flex align-items-start gap-2 text-sm" v-if="shopInfoItemOrder[0]?.shopAddr01 !== '' && shopInfoItemOrder[0]?.shopAddr01 !== null">
                                            <i class="pi pi-map-marker" style="font-size: 1.2rem"></i>
                                                <span>{{ shopInfoItemOrder[0]?.shopAddr01  ?? ''}}, 
                                                {{shopInfoItemOrder[0]?.shopAddr02 ?? ''}},
                                                {{shopInfoItemOrder[0]?.shop_city ?? ''}} 
                                                {{shopInfoItemOrder[0]?.shop_zipcode ?? ''}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- Scripts -->
<script>
    import { ElMessage } from 'element-plus';
    import CustomerOrderMSServices from '../../../../services/vendors/order_managements/OrdersManagementsServices';
    export default{
        data(){
            return {
                VUE_APP_HOST_URL: process.env.VUE_APP_PATH_FILE,
                selectedPaymentStatus: null,
                tableDataCusOrderDetails: [],
                orderItems: [],
                customerDetailOrder: [],
                customerShipping: [],
                shopInfoItemOrder: [],
                orderStatusOption: [
                    {
                        name: 'Padding', 
                        status:'Padding'
                    },
                    {
                        name: 'Incomplete', 
                        status:'Incomplete'
                    },
                    {
                        name: 'Complete', 
                        status:'Complete'
                    },
                    {
                        name: 'Declined', 
                        status:'Declined'
                    }
                ]
            }
        },
        created() {
            this.cusOrderMSServices = new CustomerOrderMSServices();
        },
        mounted() {
            this.orderDetailByCustomerID();
        },
        methods: {
            // Smart Way to truncate long string to short      
            truncateLongText(str, length, useWordBoundary){
                if (str.length <= length) { return str; }
                const subString = str.slice(0, length-1); // the original check
                return (useWordBoundary 
                    ? subString.slice(0, subString.lastIndexOf(" ")) 
                    : subString) + "...";
            },
            indexOrderItemCustomer(index){
                return index + 1;
            },
            orderDetailByCustomerID(){
                try{
                    const orderParamId = parseInt(this.$route.params.orderId) ?? 0;
                    this.cusOrderMSServices.getViewCustomerOrderDetailByCustomerID(orderParamId).then((order) => {
                        console.log(order.customerOrder)
                        if (!order) {
                            this.orderItems = Array.isArray() ?? [];
                            this.customerDetailOrder = Array.isArray() ?? [];
                            this.customerShipping = Array.isArray() ?? [];
                            this.shopInfoItemOrder = Array.isArray() ?? [];
                        }   
                        this.orderItems = Array.isArray(order.orderItems) ? order.orderItems.slice() : [];
                        this.customerDetailOrder = Array.isArray(order.customerOrder) ? order.customerOrder.slice() : [];
                        this.customerShipping = Array.isArray(order.customerShipping) ? order.customerShipping.slice() : [];
                        this.shopInfoItemOrder = Array.isArray(order.shopInfo) ? order.shopInfo.slice() : [];
                    });
                }catch(error){
                    ElMessage.error(error.message ?? '');
                }
            },
            getSummariesOrderItem(param){
               const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = 'Total';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if(!values.every(value => isNaN(value))){
                        sums[index] = '៛ ' + values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                        }, 0);
                    }else{
                        sums[index] = 'N/A';
                    }
                });
                return sums;
            }
        }
    }
</script>