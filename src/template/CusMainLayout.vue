
<template id="customerApp">
    <div :class="routeName">
        <transition
        name="fade"
        mode="out-in"
        >
        <div
            v-if="popupWrapperVisible"
            class="popup-banner-wrapper"
        >
            <banner
                class="popup-banner"
                :banner="popupBanner"
                v-outside-click="bannerClosed"
                @close="closedPermanently"
                @clicked="closedPermanently"
            />
        </div>
        </transition>
        <!-- Headers -->
        <Header
            @going-next="goingNext"
        />
        <main>
            <router-view
                :ref_key="componentId"
            />
        </main>
        <!-- Footer -->
        <Footer/>
        <transition name="fade" mode="out-in">
        <toast-message
            v-if="toastMessageStatus"
            :is-error="toastError"
            @hide="hideToast"
            :message="toastMessage"
        />
    </transition>
  </div>
</template>

<!-- @Componet: Control all components for create standard master page  -->
<script type="text/x-template">
    import ToastMessage from '@/components/ui_component_new_frontend/ToastMessage.vue'
    import Header from "../views/customer_new_ui/layout_new_customer/partials/HeaderNewCustomer.vue";
    import Footer from "../views/customer_new_ui/layout_new_customer/partials/FooterNewCustomer.vue";
    export default {
        components: {
            Header,
            Footer,
            ToastMessage
        },
        data(){
            return {
                displayBasic: false,
            }
        },
        methods: {
            openBasic(){
                this.displayBasic = true;
            }
        },
        computed: {
            routeName() {
                return this.$route?.name?.split('___')[0] || 'error'
            },
        }
    };
</script>
