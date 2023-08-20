<template>
    <div class="lds-ring pro-details-add-to-cart">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {};
</script>

<style>
/* Loading Spinner for button */
.lds-ring {
    display: inline-block;
    position: relative;
    width: 30px;
    height: 18px;
}
.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 25px;
    height: 25px;
    border: 7px solid #fff;
    border-radius: 100%;
    animation: lds-ring 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #f8f8f8b3 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
