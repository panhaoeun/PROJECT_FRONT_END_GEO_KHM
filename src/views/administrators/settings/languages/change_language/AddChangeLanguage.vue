<template>
    <div>
        <div class="button mx-2">
            <Button class="ajax-btn primary-btn outline-btn pl r-20 mt b-5 border-round " label="Add"
                icon="pi pi-plus-circle" @click="add_new_language = true" />
        </div>
        <Dialog v-model:visible="add_new_language" modal header="Add New Country Language" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="project-input">
                <div class="p-fluid">
                    <div class="p-field">
                        <label for="language">Language</label>
                        <InputText id="language" v-model="language" :class="{ 'p-invalid': !isLanguageValid }"></InputText>
                        <small class="p-error" v-if="!isLanguageValid">Language is required.</small>
                    </div>
                    <div class="p-field">
                        <label for="shortCode">Short Code</label>
                        <InputText id="shortCode" v-model="shortCode" :class="{ 'p-invalid': !isShortCodeValid }">
                        </InputText>
                        <small class="p-error" v-if="!isShortCodeValid">Short Code is required.</small>
                    </div>
                    <div class="p-field">
                        <label for="countryCode">Country Code</label>
                        <InputText id="countryCode" v-model="countryCode" :class="{ 'p-invalid': !isCountryCodeValid }">
                        </InputText>
                        <small class="p-error" v-if="!isCountryCodeValid">Country Code is required.</small>
                    </div>
                    <Button label="Save" @click="saveLanguage"></Button>
                </div>
            </div>
        </Dialog>
    </div>
</template>
  
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const add_new_language = ref(false);
        const language = ref('');
        const shortCode = ref('');
        const countryCode = ref('');
        const products = ref([]);
        const isLanguageValid = ref(true);
        const isShortCodeValid = ref(true);
        const isCountryCodeValid = ref(true);

        const saveLanguage = () => {
            let isFormValid = true;

            if (language.value === '') {
                isLanguageValid.value = false;
                isFormValid = false;
            } else {
                isLanguageValid.value = true;
            }

            if (shortCode.value === '') {
                isShortCodeValid.value = false;
                isFormValid = false;
            } else {
                isShortCodeValid.value = true;
            }

            if (countryCode.value === '') {
                isCountryCodeValid.value = false;
                isFormValid = false;
            } else {
                isCountryCodeValid.value = true;
            }

            if (!isFormValid) {
                return;
            }

            // Save language logic
            console.log('Language:', language.value);
            console.log('Short Code:', shortCode.value);
            console.log('Country Code:', countryCode.value);

            // Reset form fields
            language.value = '';
            shortCode.value = '';
            countryCode.value = '';
            isLanguageValid.value = true;
            isShortCodeValid.value = true;
            isCountryCodeValid.value = true;
        };

        return {
            add_new_language,
            language,
            shortCode,
            countryCode,
            products,
            isLanguageValid,
            isShortCodeValid,
            isCountryCodeValid,
            saveLanguage,
        };
    },
});
</script>
  
<style scoped>
.p-field {
    margin-bottom: 1rem;
}

.p-invalid {
    border-color: red;
}

.p-error {
    color: red;
}
</style>