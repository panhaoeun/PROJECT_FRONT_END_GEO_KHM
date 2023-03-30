<template>
    <div class="p-fluid">
        <!-- User Profile -->
        <div class="field gird">
            <div class="row">
                <!-- Personal information -->
                <div class="field grid">
                    <label for="name" class="col-12 mb-4 xl:col-12 md:col-12 md:mb-0 my-2 font-bold">Personal Information</label>
                    <div class="col-12 md:col-6 pb-2">
                        <InputText id="name" v-model="value" placeholder="Contact Name*" size="large"/>
                    </div>
                        <div class="col-12 md:col-6 pb-2">
                        <InputText id="name" v-model="value" placeholder="Phone Number" />
                    </div>
                    <div class="col-12">
                            <small id="username-help">Please enter a Contact Name. </small>
                    </div>
                </div>
                <!-- Address -->
                <div class="field grid">
                    <label for="name" class="col-12 mb-4 xl:col-12 md:col-12 md:mb-0 my-2 font-bold">Address</label>
                    <div class="col-12 md:col-6 pb-2">
                        <InputText id="name" v-model="value" placeholder="Street,house/department/unit*" size="large"/>
                    </div>
                    <div class="col-12 md:col-6 pb-2">
                        <InputText id="name" v-model="value" placeholder="Apt,Suite/unit*"/>
                    </div>
                    <div class="col-12 md:col-6 pb-2">
                        <InputText id="name" v-model="value" placeholder="Province*"/>
                    </div>
                    <div class="col-12 md:col-6 pb-2">
                        <InputText id="name" v-model="value" placeholder="City*"/>
                    </div>
                    <div class="col-12 md:col-6 pb-2">
                        <InputText id="name" v-model="value" placeholder="ZipCode*"/>
                    </div>
                </div>
                <!-- Set as default shipping address -->
                <div class="field grid">
                    <div class="col-12">
                        <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                        <label for="ingredient1" class="ml-2"> Set as default shipping address </label>
                    </div>
                </div>
                <!-- Google Map Address -->
            </div>
        </div>
        <!-- Button Submitted -->
        <div class="py-4 flex flex-wrap gap-3">
            <Button label="Confirm" icon="pi pi-check" class="p-button-lg py-3 w-10rem" onclick=""/>
            <Button label="Cancel" icon="pi pi-times" class="p-button-lg py-3 p-button-outlined w-10rem mr-3" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const pizza = ref();
</script>

<style>
.iframe-container {
    position: relative;
    width: 100%;
    padding-bottom: 10.25%;
    /* Ratio 16:9 ( 100%/16*9 = 56.25% ) */
}

.iframe-container>* {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

/* Demo styles */

.iframe-container {
    margin-bottom: 50px;

    background: #eee;
}
</style>