<template>
    <!-- Footer Section Start -->
    <footer :class="`footer ${footerStyle} p-0`">
        <div class="footer-body">
            <ul class="left-panel list-inline mb-0 p-0">
                <li class="list-inline-item">
                    <span> Privacy Policy </span>
                </li>
                <li class="list-inline-item">
                    <span>Terms of Use </span>
                </li>
            </ul>
            <div class="right-panel flex">
                <brand-name class="pr-2"> ©7Day </brand-name>
                <span data-setting="app_name" class="pr-2">
                    {{ new Date().getFullYear() }}
                </span>
                <span> CopyRight C.A.I.T@2021 </span>
            </div>
        </div>
    </footer>
    <!-- Footer Section End -->
    <b-offcanvas
        v-model="shareOffcanvas"
        @hide="hideShareOffcanvas"
        placement="bottom"
        title="Share"
    >
        <share-offcanvas></share-offcanvas>
    </b-offcanvas>
</template>

<script>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";
import ShareOffcanvas from "../widgets/ShareOffcanvasNew.vue";
export default {
    components: { ShareOffcanvas },
    setup() {
        const store = useStore();
        const footerStyle = computed(
            () => store.getters["setting/footer_style"]
        );

        // Bottom Canvas
        const shareOffcanvas = ref(false);
        watch(
            () => store.getters.shareOffcanvas,
            (newValue) => {
                shareOffcanvas.value = newValue;
            }
        );
        const hideShareOffcanvas = () => {
            store.dispatch("openBottomCanvasAction", {
                name: "shareOffcanvas",
                value: false,
            });
        };
        return {
            footerStyle,
            shareOffcanvas,
            hideShareOffcanvas,
        };
    },
};
</script>
