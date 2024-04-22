<template>
    <div class="container">
        <div>
            <div class="flex flex-column gap-15 border-round m-2">
                <h5 class="align-items-center justify-content-center flex">
                    References Information
                </h5>
                <!-- Add More Experience Informations -->
                <Accordion
                    contentClass="w-30rem border-round-lg"
                    class="border-round-lg"
                    selectOnFocus="true"
                >
                    <AccordionTab header="(Not Specified)">
                        <div class="m-0">
                            <div
                                class="grid grid-nogutter flex-wrap gap-3 p-fluid"
                            >
                                <div class="col-12 lg:col-12">
                                    <div class="grid formgrid">
                                        <!-- References Full Name -->
                                        <div class="field col-6 lg:col-6">
                                            <label for="name_en" class="text-sm"
                                                >References Full Name
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                v-model="positionEmpExperience"
                                                placeholder="References full name"
                                                class="border-round-lg text-sm h-3rem"
                                            />
                                        </div>
                                        <!-- Company -->
                                        <div class="field col-6 lg:col-6">
                                            <label for="name_en" class="text-sm"
                                                >Company
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                v-model="positionEmpExperience"
                                                placeholder="Company"
                                                class="border-round-lg text-sm h-3rem"
                                            />
                                        </div>
                                        <!-- Email -->
                                        <div class="field col-6 lg:col-6">
                                            <label for="name_en" class="text-sm"
                                                >Email
                                            </label>
                                            <InputText
                                                type="text"
                                                v-model="positionEmpExperience"
                                                placeholder="Email"
                                                class="border-round-lg text-sm h-3rem"
                                            />
                                        </div>
                                        <!-- Phone Number -->
                                        <div class="field col-6 lg:col-6">
                                            <label for="name_en" class="text-sm"
                                                >Phone Number
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                v-model="positionEmpExperience"
                                                placeholder="Phone number"
                                                class="border-round-lg text-sm h-3rem"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionTab>
                </Accordion>
                <!-- Button Add New Languages -->
                <div class="items-end justify-items-end flex">
                    <Button
                        label="Add References"
                        severity="info"
                        text
                        icon="pi pi-plus-circle"
                        class="w-15rem text-sm border-2 border-dashed border-200 text-black bg-slate-900 border-round-lg"
                    />
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
        return {
            selectedTypeExperience: null,
            dataLevelSkills: [
                { name: "Experts", code: "EC" },
                { name: "Experienced", code: "CS" },
                { name: "Beginners", code: "SW" },
                { name: "None", code: "OH" },
            ],
            positionEmpExperience: "",
            nameOfCompanyMinistry: "",
            selectedStartDate: "",
            selectedEndDate: "",
            addressExperiencesWork: "",
            selectedEmploymentType: null,
            dataEmployeeType: [
                { name: "Full Time", code: "FT" },
                { name: "Part Time", code: "PT" },
                { name: "Self-Employed", code: "SE" },
                { name: "Freelancer", code: "FL" },
                { name: "Contract", code: "CA" },
                { name: "Internship", code: "IS" },
                { name: "Other", code: "OH" },
            ],
        };
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
