<template>
    <div class="grid grid-nogutter flex-wrap p-fluid">
        <div class="col-12 lg:col-12">
            <div
                class="flex flex-column align-items-center justify-content-center border-round my-4"
            >
                <h5>Hobbies Information</h5>
            </div>
            <div class="grid formgrid">
                <!--Descriptions-->
                <div class="col-12 lg:col-12 field">
                    <!-- Hobbies -->
                    <div class="col-12 lg:col-6 field">
                        <label for="name_en" class="text-sm">
                            Hobbies
                            <span class="p-error">*</span>
                        </label>
                        <div
                            class="flex gap-2 items-center my-2"
                            v-for="(hobbies, index) in multiAddHobbiesInfo"
                            :key="index"
                        >
                            <InputText
                                type="text"
                                v-model="hobbies.hobbiesInfoName"
                                placeholder="Enter hobbies"
                                class="border-round-lg text-sm h-3rem"
                            />
                            <!-- Plus Add More New -->
                            <div
                                class="flex align-items-center justify-content-center gap-1"
                            >
                                <Button
                                    severity="success"
                                    class="text-sm h-1rem w-1rem border-round"
                                    icon="pi pi-plus-circle"
                                    @click.prevent="
                                        onAddNewHobbiesInfoMulti(index)
                                    "
                                />
                                <Button
                                    class="text-sm h-1rem w-1rem border-round"
                                    icon="pi pi-minus-circle"
                                    v-if="index !== 0"
                                    @click.prevent="
                                        confirmRemoveReferInfo(index)
                                    "
                                    severity="danger"
                                />
                            </div>
                        </div>
                    </div>
                    <!-- Button Add New Languages -->
                    <div class="col-12 lg:col-12 field">
                        <div class="items-end justify-items-end flex">
                            <Button
                                label="Add Hobbies"
                                severity="info"
                                text
                                @click.prevent="onAddNewHobbiesInfoMulti"
                                icon="pi pi-plus-circle"
                                class="w-15rem text-sm border-2 border-dashed border-200 text-black bg-slate-900 border-round-lg"
                            />
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
    mounted(){
        this.$emit('hobbiesInfo', this.multiAddHobbiesInfo);
    },  
    data() {
        return {
            multiAddHobbiesInfo: [
                {
                    hobbiesInfoName: "",
                },
            ],
        };
    },
    methods: {
        onAddNewHobbiesInfoMulti() {
            try {
                this.multiAddHobbiesInfo.push({
                    hobbiesInfoName: "",
                });
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        confirmRemoveReferInfo(index) {
            try {
                this.multiAddHobbiesInfo.splice(index, 1);
            } catch (error) {
                return Error(error || error.message);
            }
        },
    },
};
</script>
