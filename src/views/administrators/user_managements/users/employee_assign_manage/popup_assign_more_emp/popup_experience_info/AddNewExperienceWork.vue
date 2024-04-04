<template>
    <div class="container">
        <div class="flex justify-content-evenly flex-wrap">
            <div
                class="flex flex-column gap-20 align-items-center justify-content-center border-round m-2"
            >
                <h5>Experience Information</h5>
                <Button
                    label="Add Experience Information"
                    severity="info"
                    text
                    icon="pi pi-plus"
                    class="w-30rem text-sm border-2 border-dashed border-200 text-black bg-slate-900 border-round"
                />
                <!-- Add More Experience Informations -->
                <div>
                    <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                        <div class="col-12 lg:col-12">
                            <div class="grid formgrid">
                                <div class="field flex gap-10">
                                    <div class="field col-2">
                                        <label for="name_en" class="text-sm"
                                            >Type</label
                                        >
                                        <InputText
                                            type="text"
                                            v-model="value"
                                        />
                                    </div>
                                    <div class="field col-3">
                                        <label for="name_en" class="text-sm"
                                            >Position</label
                                        >
                                        <InputText
                                            type="text"
                                            v-model="value"
                                        />
                                    </div>
                                    <div class="field col-3">
                                        <label for="name_en" class="text-sm"
                                            >Company/Ministry</label
                                        >
                                        <InputText
                                            type="text"
                                            v-model="value"
                                        />
                                    </div>
                                    <div class="field col-3">
                                        <label for="name_en" class="text-sm"
                                            >Employment Type</label
                                        >
                                        <InputText
                                            type="text"
                                            v-model="value"
                                        />
                                    </div>
                                    <div class="field col-2">
                                        <div class="field items-center justify-center">  
                                            <i class="pi pi-times-circle" style="width: 2rem;"></i>
                                        </div>
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
<!-- experience work -->
<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
