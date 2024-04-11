<template>
    <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
        <div class="col-12 lg:col-12">
            <div
                class="flex flex-column gap-15 align-items-center justify-content-center border-round my-4"
            >
                <h5>Personal Info</h5>
            </div>
            <div class="grid formgrid">
                <!-- English Name -->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <TextFiledVueValidate
                            name="perInfoEnglishName"
                            type="text"
                            label="English Name"
                            placeholder="Please enter english name"
                        />
                    </div>
                </div>
                <!-- Khmer Name -->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <TextFiledVueValidate
                            name="perInfoKhmerName"
                            type="text"
                            label="Khmer Name"
                            placeholder="Please enter khmer name"
                        />
                    </div>
                </div>
                <!-- Phone Number -->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <TextFiledVueValidate
                            name="perInfoPhoneNumber"
                            type="number"
                            label="Phone Number"
                            placeholder="Please enter phone number"
                        />
                    </div>
                </div>
                <!-- Email -->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <TextFiledVueValidate
                            name="perInfoEmail"
                            type="email"
                            label="Email"
                            placeholder="Please enter email"
                        />
                    </div>
                </div>
                <!--Address-->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <TextFiledVueValidate
                            name="perInfoAddress"
                            type="text"
                            label="Address"
                            placeholder="Please enter address"
                        />
                    </div>
                </div>
                <!--National-->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <TextFiledVueValidate
                            name="perInfoNational"
                            type="text"
                            label="Nationality"
                            placeholder="Please enter your nationality"
                        />
                    </div>
                </div>
                <!--Descriptions-->
                <div class="col-12 lg:col-12 field">
                    <div class="field">
                        <TextAreaFiledVueValidate
                            name="perInfoDescriptions"
                            type="text"
                            label="Descriptions"
                            styleClass="w-auto"
                            placeholder="Please enter description"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Personal Informations -->
<script>
import TextFiledVueValidate from "@/components/vue_validated_components/TextFiledVueValidate";
import TextAreaFiledVueValidate from "@/components/vue_validated_components/TextAreaFiledVueValidate";
export default {
    components: {
        // Field,
        // ErrorMessage,
        TextFiledVueValidate,
        TextAreaFiledVueValidate,
    },
    validate(value, { target }) {
        console.log(value, target);
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
