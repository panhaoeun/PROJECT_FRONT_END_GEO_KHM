<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between px-2 py-2">
            <h2
                class="relative text-black text-3xl section section-title:before"
            >
                Order Details
            </h2>
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click.prevent="
                    $router.push('/vendor/order_managements/order_list')
                "
            >
                <div class="pl-2 justify-content-center">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{ $t("route.routeBack") }}</span>
                </div>
            </el-button>
        </div>
        <!-- Data Details -->
        <div class="px-2 w-full">
            <div class="row">
                <!-- List order item -->
                <div class="col-lg-8 col-xl-9">
                    <el-card
                        class="box-card h-100"
                        v-if="
                            customerDetailOrder.length > 0 &&
                            customerDetailOrder !== ''
                        "
                    >
                        <div class="flex justify-content-between">
                            <div
                                class="relative text-black text-xl section section-title:before"
                            >
                                <p class="h6">
                                    Order ID #{{
                                        customerDetailOrder[0]?.invoiceNoId
                                            ? customerDetailOrder[0]
                                                  ?.invoiceNoId
                                            : ""
                                    }}
                                </p>
                                <span class="text-sm">{{
                                    customerDetailOrder[0]?.orderDate
                                        ? customerDetailOrder[0]?.orderDate
                                        : ""
                                }}</span>
                            </div>
                        </div>
                        <div
                            class="flex justify-content-center align-items-center"
                        >
                            <div class="justify-content-center flex">
                                <div class="flex flex-column mr-2">
                                    <div class="text-sm pb-3">
                                        <span class="text-sm mr-2"
                                            >Status:</span
                                        >
                                        <Tag
                                            severity="danger"
                                            :value="
                                                customerDetailOrder[0]
                                                    ?.order_status
                                            "
                                        ></Tag>
                                    </div>
                                    <div class="text-sm">
                                        <span class="text-sm mr-2"
                                            >Payment Method:</span
                                        >
                                        <span class="h6 mr-2">{{
                                            customerDetailOrder[0]
                                                ?.payment_method ??
                                            "Pay By Cash"
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- List items detail -->
                        <div class="align-items-center justify-content-center">
                            <div class="px-2 my-2">
                                <template
                                    v-if="
                                        orderItems.length === 0 &&
                                        orderItems == ''
                                    "
                                >
                                    <el-empty :image-size="150" />
                                </template>
                                <div
                                    v-if="
                                        orderItems &&
                                        orderItems.length > 0 &&
                                        orderItems !== ''
                                    "
                                >
                                    <el-table
                                        :data="orderItems"
                                        class="text-sm"
                                        stripe
                                        border
                                        style="width: 100%"
                                    >
                                        <el-table-column
                                            type="index"
                                            label="ID"
                                            width="60"
                                        />
                                        <el-table-column label="Item Details">
                                            <template #default="{ row }">
                                                <div class="flex flex-column">
                                                    <Avatar
                                                        :image="`${VUE_APP_HOST_URL}uploads/products_img/thumbnail/${row?.thumbnail}`"
                                                        size="large"
                                                        :data-id="
                                                            row?.product_eng
                                                        "
                                                    />
                                                    <span
                                                        class="text-sm text-semibold"
                                                    >
                                                        {{
                                                            truncateLongText(
                                                                row?.product_eng,
                                                                40,
                                                                "\b"
                                                            )
                                                        }}
                                                    </span>
                                                    <span class="text-sm">
                                                        <label class="font-bold"
                                                            >Price:</label
                                                        >
                                                        {{
                                                            currencyFormattedKHRiel(
                                                                row?.product_price
                                                            )
                                                        }}</span
                                                    >
                                                    <span class="text-sm">
                                                        <label
                                                            class="font-bold"
                                                        >
                                                            Qty:
                                                        </label>
                                                        {{
                                                            parseInt(
                                                                row?.quantity
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="variantName"
                                            label="Variations"
                                        >
                                            <template #default="{ row }">
                                                <template
                                                    v-if="
                                                        row?.variantName &&
                                                        row?.variantName !== ''
                                                    "
                                                >
                                                    <template
                                                        v-for="(
                                                            [key, value], index
                                                        ) in Object.entries(
                                                            row?.variantName
                                                        )"
                                                        :key="index"
                                                    >
                                                        <div
                                                            class="flex flex-column"
                                                        >
                                                            <p
                                                                class="text-blue-600"
                                                            >
                                                                {{ key }} :
                                                                {{ value }}
                                                            </p>
                                                        </div>
                                                    </template>
                                                </template>
                                            </template>
                                        </el-table-column>
                                        <!-- Shipping Price -->
                                        <el-table-column
                                            prop="delivery_price_khr"
                                            label="Shipping Price"
                                        >
                                            <template #default="{ row }">
                                                <template v-if="row?.total">
                                                    <p>
                                                        {{
                                                            currencyFormattedKHRiel(
                                                                row?.delivery_price_khr
                                                            )
                                                        }}
                                                    </p>
                                                </template>
                                            </template>
                                        </el-table-column>
                                        <!-- Price -->
                                        <el-table-column
                                            prop="total"
                                            label="Sub Total"
                                        >
                                            <template #default="{ row }">
                                                <template v-if="row?.total">
                                                    <p>
                                                        {{
                                                            currencyFormattedKHRiel(
                                                                row?.total
                                                            )
                                                        }}
                                                    </p>
                                                </template>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <!-- Shipping Total -->
                                <div class="flex justify-content-end">
                                    <div class="flex flex-column py-3 my-2">
                                        <div class="border-round">
                                            <span class="mr-3">Shipping:</span>
                                            <span class="font-bold">
                                                {{
                                                    currencyFormattedKHRiel(
                                                        customerDetailOrder[0]
                                                            ?.shippingPrice
                                                    )
                                                }}
                                            </span>
                                        </div>

                                        <div class="border-round">
                                            <span class="mr-3">Sub Total:</span>
                                            <span class="font-bold"
                                                >{{
                                                    currencyFormattedKHRiel(
                                                        customerDetailOrder[0]
                                                            ?.totalSubShipping
                                                    )
                                                }}
                                            </span>
                                        </div>
                                        <div class="border-round">
                                            <span class="mr-3">Total:</span>
                                            <span class="font-bold">
                                                {{
                                                    currencyFormattedKHRiel(
                                                        customerDetailOrder[0]
                                                            ?.subTotal
                                                    )
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <!-- Empty Product Item -->
                    <el-card class="box-card h-100" v-else>
                        <el-empty :image-size="300" />
                    </el-card>
                </div>
                <!-- Detail of Orders -->
                <div class="col-lg-4 grid col-xl-3 d-flex flex-column gap-3">
                    <div class="gap-3 column-gap-4 row-gap-6">
                        <!--================= Order & Shipping Info===============-->
                        <el-card class="box-car px-2 py-2">
                            <div
                                class="flex justify-content-between flex flex-wrap gap-3"
                            >
                                <div class="text-black text-sm font-bold">
                                    <p class="h6">Order & Shipping Info</p>
                                </div>
                                <!-- Options Orders Status-->
                                <div class="grid formgrid text-sm">
                                    <div class="col-12" style="width: 20rem">
                                        <div class="field">
                                            <label
                                                for="name_en"
                                                class="text-sm font-semibold"
                                                >Order Status</label
                                            >
                                            <select
                                                class="form-select form-select-md w-full select-lg"
                                                style="width: 10rem"
                                                aria-label="Default select example"
                                                @change="
                                                    changeStatusOrderConfirmByVendor(
                                                        $event
                                                    )
                                                "
                                                v-permission="[
                                                    {
                                                        functionName:
                                                            'report_managements_module',
                                                        moduleName: 'fun_edit',
                                                    },
                                                ]"
                                            >
                                                <option
                                                    disabled
                                                    value="not_choose_express_delivery"
                                                >
                                                    Choose an option
                                                </option>
                                                <!-- Pending -->
                                                <template
                                                    v-if="
                                                        getCurrentRoleAccess !==
                                                            '' &&
                                                        getCurrentRoleAccess !==
                                                            undefined
                                                    "
                                                >
                                                    <template
                                                        v-if="
                                                            getCurrentRoleAccess ===
                                                                'Owner' ||
                                                            getCurrentRoleAccess ===
                                                                'Manager'
                                                        "
                                                    >
                                                        <option
                                                            value="Pending"
                                                            :selected="
                                                                customerDetailOrder[0]
                                                                    ?.order_status ===
                                                                'Pending'
                                                            "
                                                        >
                                                            Pending
                                                        </option>
                                                    </template>
                                                </template>
                                                <!-- Access Roles -->
                                                <template
                                                    v-if="
                                                        getCurrentRoleAccess !==
                                                            '' &&
                                                        getCurrentRoleAccess !==
                                                            undefined
                                                    "
                                                >
                                                    <!-- Manager -->
                                                    <template
                                                        v-if="
                                                            getCurrentRoleAccess ===
                                                                'Owner' ||
                                                            getCurrentRoleAccess ===
                                                                'Manager'
                                                        "
                                                    >
                                                        <option
                                                            value="Processing"
                                                            :selected="
                                                                customerDetailOrder[0]
                                                                    ?.order_status ===
                                                                'Processing'
                                                            "
                                                        >
                                                            Processing
                                                        </option>
                                                        <option
                                                            value="Declined"
                                                            :selected="
                                                                customerDetailOrder[0]
                                                                    ?.order_status ===
                                                                'Declined'
                                                            "
                                                        >
                                                            Declined
                                                        </option>
                                                    </template>

                                                    <!-- Seller -->
                                                    <template
                                                        v-if="
                                                            getCurrentRoleAccess ===
                                                            'Seller'
                                                            && 
                                                            customerDetailOrder[0]
                                                                    ?.order_status ===
                                                                'Processing'
                                                        "
                                                    >
                                                        <!-- Check  -->
                                                        <template
                                                            v-if="
                                                                customerDetailOrder[0]
                                                                    ?.order_status ===
                                                                'Declined'
                                                            "
                                                        >
                                                            <option disabled>
                                                                {{
                                                                    customerDetailOrder[0]
                                                                        ?.order_status
                                                                }}
                                                            </option>
                                                        </template>
                                                        <template v-else>
                                                            <option
                                                                value="Packing"
                                                                :selected="
                                                                    customerDetailOrder[0]
                                                                        ?.order_status ===
                                                                    'Packing'
                                                                "
                                                            >
                                                                Packing
                                                            </option>
                                                            <option
                                                                value="Delivery"
                                                                :selected="
                                                                    customerDetailOrder[0]
                                                                        ?.order_status ===
                                                                    'Delivery'
                                                                "
                                                            >
                                                                Delivery
                                                            </option>
                                                        </template>
                                                    </template>
                                                </template>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                        <!--================Customer Information============-->
                        <el-card
                            class="box-card"
                            v-if="
                                customerDetailOrder.length > 0 &&
                                customerDetailOrder !== ''
                            "
                        >
                            <div
                                class="flex justify-content-between flex flex-wrap gap-3"
                            >
                                <div class="text-black text-sm font-bold">
                                    <p class="h6">Customer Information</p>
                                </div>
                            </div>
                            <!-- Options Orders -->
                            <div class="px-2 py-2">
                                <div
                                    class="mb-4 d-flex align-items-center gap-2"
                                >
                                    <!-- <img class="justify" v-if="customerDetailOrder[0]?.cusProfile !== ''"
                                        src="../../../../../src/assets/img/product_icons/customer_icon_default_order.png"
                                        alt="Image" width="50" />
                                    <img class="justify" v-else
                                        src="../../../../../src/assets/img/product_icons/customer_icon_default_order.png"
                                        alt="Image" width="50" /> -->
                                    <div
                                        class="flex flex-column title-customer-information"
                                    >
                                        <span
                                            >Name:
                                            {{
                                                customerDetailOrder[0]
                                                    ?.name_eng ?? ""
                                            }}</span
                                        >
                                        <span
                                            >Email:
                                            {{
                                                customerDetailOrder[0]
                                                    ?.user_email ?? ""
                                            }}</span
                                        >
                                        <span
                                            >Phone:
                                            {{
                                                customerDetailOrder[0]
                                                    ?.user_phonenumber ?? ""
                                            }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </el-card>
                        <!--=========== Shipping Address ===========-->
                        <el-card
                            class="box-card"
                            v-if="
                                customerDetailOrder[0]?.shippingAddress !==
                                    '' &&
                                customerDetailOrder[0]?.shippingAddress !== null
                            "
                        >
                            <div
                                class="flex justify-content-between flex flex-wrap gap-3"
                            >
                                <div class="text-black text-sm font-bold">
                                    <p class="h6">Shipping Address</p>
                                </div>
                            </div>
                            <!-- Options Orders -->
                            <div class="py-2">
                                <div class="d-flex flex-column gap-2">
                                    <div class="flex flex-column">
                                        <span
                                            >Name :
                                            {{
                                                customerDetailOrder[0]
                                                    ?.name_eng ?? ""
                                            }}</span
                                        >
                                        <span
                                            >Contact :
                                            {{
                                                customerDetailOrder[0]
                                                    ?.user_phonenumber ?? ""
                                            }}</span
                                        >
                                    </div>
                                    <div class="d-flex align-items-start gap-2">
                                        <i
                                            class="pi pi-map-marker"
                                            style="font-size: 1.2rem"
                                        ></i>
                                        {{
                                            customerDetailOrder[0]
                                                ?.shippingAddress
                                        }}
                                    </div>
                                </div>
                            </div>
                        </el-card>
                        <!-- ===============Billing address ===========-->
                        <!-- <el-card
                            class="box-card"
                            v-if="
                                customerDetailOrder[0]?.billingAddress !== '' &&
                                customerDetailOrder[0]?.billingAddress !== null
                            "
                        >
                            <div
                                class="flex justify-content-between flex flex-wrap gap-3"
                            >
                                <div
                                    class="relative text-black text-sm section section-title:before"
                                >
                                    <p class="h6">Billing Address</p>
                                </div>
                            </div>
                            <div class="py-2">
                                <div class="d-flex flex-column gap-2">
                                    <div>
                                        <span
                                            >Name :
                                            {{
                                                customerDetailOrder[0]?.name_eng
                                            }}</span
                                        >
                                    </div>
                                    <div class="d-flex align-items-start gap-2">
                                        <i
                                            class="pi pi-map-marker"
                                            style="font-size: 1.2rem"
                                        ></i>
                                        {{
                                            customerDetailOrder[0]
                                                ?.billingAddress
                                        }}
                                    </div>
                                </div>
                            </div>
                        </el-card> -->
                        <!-- ===============Shop Information ===========-->
                        <el-card
                            class="box-card"
                            v-if="
                                shopInfoItemOrder.length > 0 &&
                                shopInfoItemOrder !== ''
                            "
                        >
                            <div
                                class="flex justify-content-between flex flex-wrap gap-3"
                            >
                                <div class="relative text-black text-sm">
                                    <p class="h6">Shop Information</p>
                                </div>
                            </div>
                            <div class="py-2">
                                <div
                                    class="mb-4 d-flex align-items-center gap-2"
                                >
                                    <!-- ${VUE_APP_HOST_URL}uploads/products_img/thumbnail/${row?.thumbnail} -->
                                    <img
                                        class="justify"
                                        v-if="shopInfoItemOrder[0]?.shopLogo"
                                        :title="
                                            shopInfoItemOrder[0]?.shopEn ?? ''
                                        "
                                        :src="`${VUE_APP_HOST_URL}/uploads/sellers/${
                                            shopInfoItemOrder[0]?.shopLogo ?? ''
                                        }`"
                                        alt="Image"
                                        width="80"
                                    />
                                    <img
                                        class="justify"
                                        v-else
                                        src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f38e9ce54.png"
                                        alt="Image"
                                        width="80"
                                    />
                                    <div
                                        class="flex flex-column title-customer-information"
                                    >
                                        <span class="pb-2">{{
                                            shopInfoItemOrder[0]?.store ?? ""
                                        }}</span>
                                        <div
                                            class="pb-2"
                                            v-if="
                                                shopInfoItemOrder[0]
                                                    ?.billingAddress !== '' &&
                                                shopInfoItemOrder[0]
                                                    ?.buildingAddress !== null
                                            "
                                        >
                                            <strong>Building Address: </strong>
                                            <span>{{
                                                shopInfoItemOrder[0]
                                                    ?.buildingAddress ?? ""
                                            }}</span>
                                        </div>
                                        <div
                                            class="text-sm pb-2"
                                            v-if="
                                                shopInfoItemOrder[0]
                                                    ?.shopAddr01 !== '' &&
                                                shopInfoItemOrder[0]
                                                    ?.shopAddr01 !== null
                                            "
                                        >
                                            <strong>City: </strong>
                                            <span>{{
                                                shopInfoItemOrder[0]
                                                    ?.shop_city ?? ""
                                            }}</span>
                                        </div>
                                        <div
                                            class="d-flex align-items-start gap-2 text-sm"
                                            v-if="
                                                shopInfoItemOrder[0]
                                                    ?.shopAddr01 !== '' &&
                                                shopInfoItemOrder[0]
                                                    ?.shopAddr01 !== null
                                            "
                                        >
                                            <i
                                                class="pi pi-map-marker"
                                                style="font-size: 1.2rem"
                                            ></i>
                                            <span
                                                >{{
                                                    shopInfoItemOrder[0]
                                                        ?.shopAddr01 ?? ""
                                                }},
                                                {{
                                                    shopInfoItemOrder[0]
                                                        ?.shopAddr02 ?? ""
                                                }},
                                            </span>
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
import CustomerOrderMSServices from "../../../../services/vendors/order_managements/OrdersManagementsServices";
import { mapGetters } from "vuex";
// roles
export default {
    data() {
        return {
            VUE_APP_HOST_URL: process.env.VUE_APP_PATH_FILE,
            selectedPaymentStatus: "Processing",
            tableDataCusOrderDetails: [],
            orderItems: [],
            customerDetailOrder: [],
            customerShipping: [],
            shopInfoItemOrder: [],
            orderStatusOption: [
                {
                    name: "Processing",
                    status: "Processing",
                },
                {
                    name: "Declined",
                    status: "Declined",
                },
                {
                    name: "Packing",
                    status: "Packing",
                },
                {
                    name: "Delivery",
                    status: "Delivery",
                },
            ],
        };
    },
    computed: {
        ...mapGetters({
            getRole: "users/roles",
        }),
        getCurrentRoleAccess() {
            return this.getRole[0].role_name ? this.getRole[0].role_name : "";
        },
    },
    created() {
        this.cusOrderMSServices = new CustomerOrderMSServices();
    },
    mounted() {
        this.orderDetailByCustomerID();
    },
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
        // Smart Way to truncate long string to short
        truncateLongText(str, length, useWordBoundary) {
            if (str.length <= length) {
                return str;
            }
            const subString = str.slice(0, length - 1); // the original check
            return (
                (useWordBoundary
                    ? subString.slice(0, subString.lastIndexOf(" "))
                    : subString) + "..."
            );
        },
        indexOrderItemCustomer(index) {
            return index + 1;
        },
        orderDetailByCustomerID() {
            try {
                const orderParamId = parseInt(this.$route.params.orderId) ?? 0;
                this.cusOrderMSServices
                    .getViewCustomerOrderDetailByCustomerID(orderParamId)
                    .then((order) => {
                        if (!order) {
                            this.orderItems = Array.isArray() ?? [];
                            this.customerDetailOrder = Array.isArray() ?? [];
                            this.customerShipping = Array.isArray() ?? [];
                            this.shopInfoItemOrder = Array.isArray() ?? [];
                        }
                        this.orderItems = Array.isArray(order.orderItems)
                            ? order.orderItems.slice()
                            : [];
                        this.customerDetailOrder = Array.isArray(
                            order.customerOrder
                        )
                            ? order.customerOrder.slice()
                            : [];
                    });
            } catch (error) {
                return Promise.reject(error);
            }
        },
        getSummariesOrderItem(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "Total";
                    return;
                }
                const values = data.map((item) =>
                    Number(item[column.property])
                );
                if (!values.every((value) => isNaN(value))) {
                    console.log(values);
                    sums[index] =
                        "៛ " +
                        values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                } else {
                    sums[index] = "";
                }
            });
            return sums;
        },
        // Change Status Confirm To Order
        changeStatusOrderConfirmByVendor(event) {
            if (!event) {
                this.$notify.error({
                    title: "Please select order status",
                    showClose: true,
                });
            }
            this.$confirm(
                "You wont be able to revert this!",
                `Are you sure Change this`,
                {
                    showCancelButton: true,
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    type: "warning",
                    cancelButtonClass:
                        "surface-hover font-bold hover:surface-300 w-7rem",
                    confirmButtonClass:
                        "bg-red-500 border-none font-bold hover:surface-300 w-10rem",
                    beforeClose: (action, instance, done) => {
                        if (action === "confirm") {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = "Loading...";
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 1000);
                        } else {
                            done();
                        }
                    },
                }
            ).then(() => {
                const orderStatus = event.target.value
                    ? event.target.value
                    : "";
                // Confirm Order
                const orderPayStatus = {
                    orderStatusConfirm: orderStatus
                        ? orderStatus
                        : "Processing",
                    paymentStatus: "",
                };
                const orderParamId = parseInt(this.$route.params.orderId) ?? 0;
                this.cusOrderMSServices
                    .updatedConfirmToPaymentsOrderByVendor(
                        orderParamId,
                        orderPayStatus
                    )
                    .then((orderItem) => {
                        if (orderItem.data.success === true) {
                            this.$notify.success({
                                title: "Successfully change order status",
                                message: orderItem.data?.message
                                    ? orderItem.data?.message
                                    : "",
                                showClose: false,
                            });
                            //Close form -> Successfully to submitted
                            this.centerDialogVisibleWithdrawAdmin = false;
                            this.$router.push(
                                "/vendor/order_managements/order_list"
                            );
                        } else {
                            this.$notify.error({
                                title: "Error withdraw from wallet confirm by admin",
                                message: "Please contact to us",
                                showClose: false,
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error) {
                            this.$notify.error({
                                title: "Unsuccessfully change order status...",
                                message:
                                    error.response.data.error.message ??
                                    "Unsuccessfully for change status order item",
                                showClose: false,
                            });
                            if (error.response.data.error.error.errors) {
                                for (
                                    let index = 0;
                                    index <
                                    error.response.data.error.error.errors
                                        .length;
                                    index++
                                ) {
                                    const messageValidation =
                                        error.response.data.error.error.errors[
                                            index
                                        ].message ?? "";
                                    this.$notify.error({
                                        title: "Unsuccessfully change order status...",
                                        message:
                                            messageValidation ??
                                            "Unsuccessfully for change status order item",
                                        showClose: true,
                                    });
                                }
                            }
                        }
                    });
            });
        },
    },
};
</script>
