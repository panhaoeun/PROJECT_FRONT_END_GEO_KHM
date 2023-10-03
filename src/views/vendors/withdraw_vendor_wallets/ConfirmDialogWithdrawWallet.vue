<template>
    <div class="layout-content px-2 py-2">
        <!-- Header -->
        <div class="mb-3">
            <h2 class="h4 mb-0 text-capitalize d-flex align-items-center gap-2">
                <img
                    width="20"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw-icon.png"
                    alt=""
                />
                Withdraw
            </h2>
        </div>
        <!-- Withdraw -->
        <div class="gird">
            <div class="col-12">
                <!-- Seller Withdraw Information -->
                <el-card
                    class="box-card py-2 px-2"
                    header="Seller Withdraw Information"
                >
                    <div class="column gpa-3">
                        <div class="col-md-4 mb-2 mb-md-0 my-2">
                            <!-- Amount -->
                            <div class="flex-start flex-wrap flex justify-content-between">
                                <div>
                                    <h6 class="text-capitalize">Amount :</h6>
                                </div>
                                <div class="mx-1">
                                    <h6>$500.00</h6>
                                </div>
                            </div>
                        </div>
                        <!-- Request time -->
                        <div class="col-md-4 mb-2 mb-md-0 my-4">
                            <div class="flex-start flex-wrap flex justify-content-between">
                                <div>
                                    <h6 class="text-capitalize">Request time :</h6>
                                </div>
                                <div class="mx-1">
                                    <h6>$500.00</h6>
                                </div>
                            </div>
                        </div>
                        <!-- Noted Withdraw -->
                        <div class="col-md-12 mb-2 mb-md-0 my-4">
                            <div class="flex-start">
                                <div class="title-color">Note :</div>
                                <div class="mx-1"></div>
                            </div>
                        </div>
                        <!-- Button Request Payments -->
                        <div class="col-md-12 mb-2 mb-md-0 my-4">
                            <!-- Process Withdraw -->
                            <DialogConfirmToRequestWithdrawAdmin/>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
import DialogConfirmToRequestWithdrawAdmin from "./DialogConfirmToRequestWithdrawAdmin.vue"
export default {
    components: {
        DialogConfirmToRequestWithdrawAdmin
    },
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
