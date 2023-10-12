<template>
    <div id="shipping-detail" class="align-left shipping card bg-cyan-50">
        <br>
            <h4>Shipping Method</h4>
        <hr>
        <div v-if="isSessionActive()">
            <b-form-group>
                <label for="method">Method</label>
                <b-form-select
                    v-model="shippingMethods"
                    size="xl"
                    name="method"
                    id="method"
                    @input="selectedShippingMethod()"
                >
                    <option :value="null" disabled>Please select an option</option>
                    <option v-for="(ship,sid) in shippingMethod" v-bind:key="sid" :value="ship">
                        {{ship?.ship_company}}
                       (<span>
                            {{ ship?.duration }}
                        </span>)
                       {{ ship?.const_price }} $
                    </option>
                </b-form-select>
            </b-form-group>
            <p class="info">Please select the shipping method to get final prices</p>
        </div>
        <div v-else>
            <div class="empty-info">
                <p>Nothing to display</p>
            </div>
        </div>
    </div>
</template>
<!-- Script of JS -->
<script>
    import {mapGetters} from 'vuex'
    import { isLoggedIn } from "@/utils/auth/auth";
    export default {
        data() {
            return {

            };
        },
        created(){
            this.getShippingMethod();
        },
        methods: {
            isSessionActive(){
                return isLoggedIn();
            },
            async selectedShippingMethod() {
                if (!this.isSessionActive()) return;
                 if (!this.getSelectedAddressShip || !this.selectedAddressBilling || !this.shippingMethod) {
                    this.$notify.warning({
                        title: 'Please select shipping method first',
                        message: 'The shipping method and address should be selected first.',
                        showClose: false
                    });
                    return;
                } 
            },
            async getShippingMethod(){
                try {
                    await this.$store.dispatch('shippingStore/getDeliveryTracking');
                } catch (error) {
                    return Promise.reject(error);
                }
            },
            
        },
        computed: {
            shippingMethods: {
                get() {
                    return this.$store.getters['shippingStore/shippingMethod'];
                },
                set(val) {
                    this.$store.commit('shippingStore/setShippingMethod', val);
                },
            },
            ...mapGetters({
                getSelectedAddressShip: 'shippingStore/getSelectedAddress',
                selectedAddressBilling: 'billingStore/getSelectedBillingAddress',
                shippingMethod:'shippingStore/shippingTrackDeliveryMethod',
            }),
        },
    }
</script>