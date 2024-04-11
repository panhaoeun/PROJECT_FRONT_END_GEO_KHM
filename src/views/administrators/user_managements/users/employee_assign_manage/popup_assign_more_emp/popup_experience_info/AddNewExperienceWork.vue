<template>
    <div class="container">
        <div class="flex justify-content-evenly flex-wrap">
            <div
                class="flex flex-column gap-15 align-items-center justify-content-center border-round m-2"
            >
                <h5>Experience Information</h5>
                <Button
                    label="Add Experience Information"
                    severity="info"
                    text
                    icon="pi pi-plus-circle"
                    class="w-30rem text-sm border-2 border-dashed border-200 text-black bg-slate-900 border-round-lg"
                />
                <!-- Add More Experience Informations -->
                <Accordion
                    contentClass="w-30rem border-round-lg"
                    style="max-width: 70rem; width: 70rem"
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
                                        <!-- Type Governments -->
                                        <div class="col-4 lg:col-6 field">
                                            <label for="name_en" class="text-sm"
                                                >Type
                                                <span class="p-error">*</span>
                                            </label>
                                            <Dropdown
                                                v-model="selectedTypeExperience"
                                                :options="dataExperienceWork"
                                                optionLabel="name"
                                                placeholder="Select a Type Experience"
                                                class="w-full border-round-lg text-sm"
                                            />
                                        </div>
                                        <!-- Positions -->
                                        <div class="field col-4">
                                            <label for="name_en" class="text-sm"
                                                >Position
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                v-model="positionEmpExperience"
                                                placeholder="Software Development"
                                                class="border-round-lg text-sm h-3rem"
                                            />
                                        </div>
                                        <!-- Company/Ministry -->
                                        <div class="field col-4">
                                            <label for="name_en" class="text-sm"
                                                >Company/Ministry
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                placeholder="ABC Company Co ltd"
                                                class="border-round-lg text-sm h-3rem"
                                                v-model="nameOfCompanyMinistry"
                                            />
                                        </div>
                                        <!-- Address -->
                                        <div class="field col-4">
                                            <label for="name_en" class="text-sm"
                                                >Address
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                placeholder="Phnom Penh"
                                                class="border-round-lg text-sm h-3rem"
                                                v-model="addressExperiencesWork"
                                            />
                                        </div>
                                        <!-- Start Time -->
                                        <div class="field col-4">
                                            <label for="name_en" class="text-sm"
                                                >Start Date
                                                <span class="p-error">*</span>
                                            </label>
                                            <Calendar
                                                showIcon
                                                iconDisplay="input"
                                                placeholder="06/12/2022"
                                                class="border-round-lg text-sm h-3rem"
                                                v-model="selectedStartDate"
                                            />
                                        </div>
                                        <!-- End Time -->
                                        <div class="field col-4">
                                            <label for="name_en" class="text-sm"
                                                >End Date
                                                <span class="p-error">*</span>
                                            </label>
                                            <Calendar
                                                showIcon
                                                iconDisplay="input"
                                                class="border-round-lg text-sm h-3rem"
                                                placeholder="03/10/2023"
                                                v-model="selectedEndDate"
                                            />
                                        </div>
                                        <!-- Employment Type -->
                                        <div class="field col-4">
                                            <label for="name_en" class="text-sm"
                                                >Employment Type
                                                <span class="p-error">*</span>
                                            </label>
                                            <Dropdown
                                                v-model="selectedEmploymentType"
                                                :options="dataEmployeeType"
                                                optionLabel="name"
                                                placeholder="Select a Type Experience"
                                                class="w-full border-round-lg text-sm"
                                            />
                                        </div>
                                        <!-- Descriptions -->
                                        <div class="field col-12">
                                            <label for="name_en" class="text-sm"
                                                >Descriptions</label
                                            >
                                            <Textarea
                                                type="text"
                                                v-model="value"
                                                class="border-round-lg text-sm h-3rem"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionTab>
                </Accordion>
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
            dataExperienceWork: [
                { name: "Educations", code: "EC" },
                { name: "Civil service", code: "CS" },
                { name: "Social work", code: "SW" },
                { name: "Others", code: "OH" },
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
