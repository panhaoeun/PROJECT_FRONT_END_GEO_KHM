<template>
    <div class="login-register-area pt-60 pb-90 bg-white">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 col-md-12 ms-auto me-auto">
                    <div class="box-card-ecommerce">
                        <div class="container">
                            <div id='card' class="animated fadeIn border border-1 rounded">
                                <div id="upper-side">
                                    <i class="pi pi-check-circle" style="color: #fff; font-size: 8rem;"></i>                     
                                    <h4 class="status text-white pt-4">Your order has been placed successfully! !</h4>
                                </div>
                                <div id='lower-side'>
                                    <h2 class="pb-4">Hello, Dev</h2>
                                    <p id='message'>
                                        You order has been confirmed and will be shipped according to the method you selected!
                                    </p>
                                    <!-- Button -->
                                    <div class="flex">
                                        <button id="contBtn" @click="$router.push('/')" style="background: #427AEC">Go to Shopping</button>
                                        <button id="contBtn" @click="$router.push('/customer/my_profile/view-customer-detail')">Check Order</button>
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
    components: {
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
<!-- Styles -->
<style>

#card {
  position: relative;
  width: auto;
  display: block;
  margin: auto;
  text-align: center;
}

#upper-side {
  padding: 2em;
  background-color: #e92e2e;
  display: block;
  color: #fff;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

#checkmark {
  font-weight: lighter;
  fill: #fff;
  margin: -3.5em auto auto 20px;
}

#status {
  font-weight: lighter;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1em;
  margin-top: -.2em;
  color: #fff;
  margin-bottom: 0;
}

#lower-side {
  padding: 2em 2em 5em 2em;
  background: #fff;
  display: block;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}

#message {
  margin-top: -.5em;
  color: #757575;
  letter-spacing: 1px;
}

#contBtn {
  position: relative;
  top: 1.5em;
  text-decoration: none;
  background: #e92e2e;
  color: #fff;
  margin: auto;
  padding: .8em 3em;
  -webkit-box-shadow: 0px 15px 30px rgba(50, 50, 50, 0.21);
  -moz-box-shadow: 0px 15px 30px rgba(50, 50, 50, 0.21);
  box-shadow: 0px 15px 30px rgba(50, 50, 50, 0.21);
  border-radius: 25px;
  -webkit-transition: all .4s ease;
		-moz-transition: all .4s ease;
		-o-transition: all .4s ease;
		transition: all .4s ease;
}

#contBtn:hover {
  -webkit-box-shadow: 0px 15px 30px rgba(50, 50, 50, 0.41);
  -moz-box-shadow: 0px 15px 30px rgba(50, 50, 50, 0.41);
  box-shadow: 0px 15px 30px rgba(50, 50, 50, 0.41);
  -webkit-transition: all .4s ease;
		-moz-transition: all .4s ease;
		-o-transition: all .4s ease;
		transition: all .4s ease;
}
</style>