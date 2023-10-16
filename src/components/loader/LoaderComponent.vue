<template>
  <div id="loading">
    <div :class="`loader simple-loader ${!show ? 'd-none' : ''}`">
      <div class="loader-body">
            <div class="loader-container">
               <img src="@/assets/loading/loading.gif" alt="loader" class="light-loader img-fluid w-50rem" width="100" height="100" />
            </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style >
    /* Background */
.loader-container {
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  width: 100px;
  height: 100px;
}
.loader path {
  fill: #fff;
  transform-origin: center;
  animation: rotate 1.5s linear infinite;
}
.loaderreverse {
  animation-direction: reverse !important;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
  from {
    transform: rotate(0deg);
  }
}
</style>
