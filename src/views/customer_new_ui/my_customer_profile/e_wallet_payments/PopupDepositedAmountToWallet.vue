<template>
    <form @submit.prevent="savingPopupDepositedAmountWallet">
        <transition
            name="fade"
            mode="out-in"
        >
            <div
                class="spinner-wrapper flex layer-white"
                v-if="loading"
            >
                <spinner
                :radius="100"
                />
            </div>
        </transition>
        <!-- Pop Over Dialogs Wallet -->
        <pop-over
            v-if="addressData"
            title="User Address"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto"
        >
        <template
            v-slot:content
        >
            <div>
                <div
                    class="input-wrap mlr-5"
                    :class="{invalid: !addressData.contact_name && hasAddressErrors}"
                >
                    <label>
                        Name
                    </label>
                    <input
                    type="text"
                    v-model="addressData.contact_name"
                    />
                    <span
                    class="error"
                    v-if="!addressData.contact_name && hasAddressErrors"
                    >
                    {{ $t('addressPopup.isRequired', {type: $t('addressPopup.name')}) }}
                    </span>
                </div>
                <!-- Phone number -->
                <div
                    class="input-wrap mlr-5"
                    :class="{invalid: !addressData.phone_number_contact && hasAddressErrors}"
                >
                    <label>
                        Phone Number
                    </label>
                    <div class="input-text">
                    <span>
                        +855
                    </span>
                    <input
                        v-on:keypress="inputNumberOnly()"
                        type="text"
                        v-model="addressData.phone_number_contact"
                    />
                    </div>

                    <span
                    class="error"
                    v-if="!addressData.phone_number_contact && hasAddressErrors"
                    >
                        {{ $t('addressPopup.isRequired', {type: $t('addressPopup.phone')}) }}
                    </span>
                </div>

                <div
                    class="input-wrap"
                    :class="{invalid: !addressData.shipAdd01 && hasAddressErrors}"
                >
                    <label>
                    {{ $t('addressPopup.address') }}
                    </label>
                    <input
                    class="mb-10"
                    type="text"
                    v-model="addressData.shipAdd01"
                    :placeholder="$t('addressPopup.addressPlaceholder')"
                    />
                    <input
                    type="text"
                    v-model="addressData.shipAdd02"
                    :placeholder="$t('addressPopup.addressPlaceholder')"
                    />
                    <span
                    class="error"
                    v-if="!addressData.shipAdd01 && hasAddressErrors"
                    >
                    {{ $t('addressPopup.isRequired', {type: $t('addressPopup.address')}) }}
                    </span>
                </div>

                <div class="flex start mlr--5">
                    <div
                    class="input-wrap mlr-5"
                    :class="{invalid: !addressData.shipCity && hasAddressErrors}"
                    >
                    <label>
                        {{ $t('addressPopup.city') }}
                    </label>
                    <input
                        type="text"
                        v-model="addressData.shipCity"
                    />
                    <span
                        class="error"
                        v-if="!addressData.shipCity && hasAddressErrors"
                    >
                        {{ $t('addressPopup.isRequired', {type: $t('addressPopup.city')}) }}
                    </span>
                    </div>
                    <div
                    class="input-wrap mlr-5"
                    :class="{invalid: !addressData.shipZipCode && hasAddressErrors}"
                    >
                    <label>
                        {{ $t('addressPopup.zipCode') }}
                    </label>
                    <input
                        type="text"
                        v-model="addressData.shipZipCode"
                    />
                    <span
                        class="error"
                        v-if="!addressData.shipZipCode && hasAddressErrors"
                    >
                        {{ $t('addressPopup.isRequired', {type: $t('addressPopup.zipCode')}) }}
                    </span>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:pop-footer>
            <div class="flex j-end gap-10">
            <button
                class="outline-btn text-black plr-30 plr-sm-15"
                aria-label="Address cancel"
                @click.prevent="$emit('close')"
            >
                {{ $t('addressPopup.cancel') }}
            </button>
            <ajax-button
                class="primary-btn plr-30 plr-sm-15"
                :fetching-data="submittingAddressData"
                :loading-text="$t('addressPopup.saving')"
                :text=" $t('addressPopup.thisAddress', {type: editing > 0 ? $t('addressPopup.update') : $t('addressPopup.save')})"
            />
            </div>
        </template>
        </pop-over>
    </form>
</template>
<!-- Script -->
<script>
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import util from '@/mixin/util'
import validation from '@/mixin/validation'
export default {
    mixins: [util, validation],
    components: {
        Spinner
    },
    props: {},
    data() {
        return {
            loading: false,
        };
    },
    created() {},
    methods: {
        async savingPopupDepositedAmountWallet(){
            if (!this.hasAddressErrors) {
            this.$emit('close')
            }
        }
    },
    mounted() {},
};
</script>
<style scoped>
</style>
<style lang='scss' scoped>
</style>