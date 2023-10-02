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
                    <div class="row">
                        <div class="col-md-4 mb-2 mb-md-0">
                            <div class="flex-start flex-wrap flex justify-content-between">
                                <div>
                                    <h6 class="text-capitalize">Amount :</h6>
                                </div>
                                <div class="mx-1">
                                    <h6>$500.00</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="flex-start justify-content-between">
                                <div>
                                    <h6>Request time :</h6>
                                </div>
                                <div class="mx-1">
                                    2022-10-12 08:39:01
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 mb-2 mb-md-0">
                            <div class="flex-start">
                                <div class="title-color">Note :</div>
                                <div class="mx-1"></div>
                            </div>
                        </div>
                        <!-- Button -->
                        <div class="col-md-4">
                            <div class="text-center float-right">
                                 <el-button plain class="w-10rem hover:bg-red-500">Process</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
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
