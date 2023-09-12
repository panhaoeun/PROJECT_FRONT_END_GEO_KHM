<template>
    <div class="card h-100">
        <div class="card-body">
            <div class="d-flex justify-content-between gap-2">
                <h5 class="mb-4 flex-grow-1">My Wallet</h5>
                <span class="text-dark d-md-none" data-bs-toggle="modal" data-bs-target="#instructionModal">
                    <i class="bi bi-info-circle"></i>
                </span>
            </div>
            <div 
                class="wallet-card pb-3 rounded-10 overlay ov-hidden bg-img"
                style="--bg-color: var(--bs-primary); 
                background-image: url(&quot;https://6valley-aster.6amtech.com/resources/themes/theme_aster/public/assets/img/media/wallet-card.png&quot;);">
                <div class="card-body d-flex flex-column gap-2 absolute-white">
                    <img width="34"
                        src="https://6valley-aster.6amtech.com/resources/themes/theme_aster/public/assets/img/icons/profile-icon5.png"
                        alt="" class="dark-support">
                    <h2 class="fs-36 absolute-white">៛ 0.00</h2>
                    <p>Total Balance</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Dialog -->
</template>
<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    mounted() { },
};
</script>
<style scoped></style>
<style lang='scss' scoped></style>