<template>
    <div class="gird my-4">
        <div class="card mb-3">
                <div class="card-body">
                    <!-- Wallet Current Account -->
                    <div
                        class="row justify-content-between align-items-center g-2 mb-3"
                    >
                        <div class="col-sm-6">
                            <h4
                                class="d-flex align-items-center text-capitalize gap-10 mb-0"
                            >
                                <img
                                    width="20"
                                    class="mb-1"
                                    src="https://6valley.6amtech.com/public/assets/back-end/img/admin-wallet.png"
                                    alt=""
                                />
                                Admin Wallet
                            </h4>
                        </div>
                    </div>
                    <!-- Wallet Current Account Admin Wallet -->
                    <div class="row g-2" id="order_stats">
                        <!-- Earing -->
                        <div class="col-lg-4">
                            <div
                                class="card h-100 d-flex justify-content-center align-items-center"
                            >
                                <div
                                    class="card-body d-flex flex-column gap-10 align-items-center justify-content-center"
                                >
                                    <img
                                        width="48"
                                        class="mb-2"
                                        src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw.png"
                                        alt=""
                                    />
                                    <h3 class="for-card-count mb-0 fz-24">$9,351.50</h3>
                                    <div class="font-weight-bold text-capitalize mb-30 text-black">
                                        In-House Earning
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Delivery Charge Earned -->
                        <div class="col-lg-8">
                            <div class="row g-2">
                                <!-- Pending Amount -->
                                <div class="col-md-6">
                                    <div
                                        class="card card-body h-100 justify-content-center"
                                    >
                                        <div
                                            class="d-flex gap-2 justify-content-between align-items-center"
                                        >
                                            <div
                                                class="d-flex flex-column align-items-start"
                                            >
                                                <h3 class="mb-1 fz-24">$722.00</h3>
                                                <div class="text-capitalize mb-0 text-black">
                                                   Pending Amount
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    width="40"
                                                    class="mb-2"
                                                    src="https://6valley.6amtech.com/public/assets/back-end/img/pw.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                  <!-- Delivery Charge Earned -->
                                <div class="col-md-6">
                                    <div
                                        class="card card-body h-100 justify-content-center"
                                    >
                                        <div
                                            class="d-flex gap-2 justify-content-between align-items-center"
                                        >
                                            <div
                                                class="d-flex flex-column align-items-start"
                                            >
                                                <h3 class="mb-1 fz-24">$600.00</h3>
                                                <div class="text-capitalize mb-0 text-black">
                                                    Already Withdrawn
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    width="40"
                                                    src="https://6valley.6amtech.com/public/assets/back-end/img/aw.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
<style scoped>
</style>
<style lang='scss' scoped>
</style>