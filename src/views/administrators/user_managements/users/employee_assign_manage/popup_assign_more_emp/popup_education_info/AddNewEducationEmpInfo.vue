<template>
    <div class="container">
        <div class="flex justify-content-evenly flex-wrap">
            <div class="flex flex-column gap-15 border-round m-2">
                <h5 class="flex align-items-center justify-content-center">
                    Educations Information
                </h5>
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
                                                >Education Type
                                                <span class="p-error">*</span>
                                            </label>
                                            <Dropdown
                                                v-model="selectedEducationInfo"
                                                :options="dataEducationsInfo"
                                                optionLabel="name"
                                                placeholder="Select a education type"
                                                class="w-full border-round-lg text-sm"
                                            />
                                        </div>
                                        <!-- Positions -->
                                        <div class="field col-4">
                                            <label for="name_en" class="text-sm"
                                                >School
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                v-model="positionEmpExperience"
                                                placeholder="Royal university of phnom penh (RUPP)"
                                                class="border-round-lg text-sm h-3rem"
                                            />
                                        </div>
                                        <!-- Grade -->
                                        <div class="field col-4">
                                            <label for="name_en" class="text-sm"
                                                >Grade
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                placeholder="Royal University Phnom Penh"
                                                class="border-round-lg text-sm h-3rem"
                                                v-model="nameOfCompanyMinistry"
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

                                        <!-- CHecking Present Day -->
                                        <div class="field col-12">
                                            <div
                                                class="flex flex-wrap gap-3 justify-end"
                                            >
                                                <div
                                                    class="flex align-items-center"
                                                >
                                                    <Checkbox
                                                        v-model="pizza"
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                    />
                                                    <label
                                                        for="ingredient1"
                                                        class="ml-2"
                                                    >
                                                        Present
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Descriptions -->
                                        <div class="field col-12">
                                            <label for="name_en" class="text-sm"
                                                >Descriptions</label
                                            >
                                            <Editor
                                                placeholder="Enter Descriptions"
                                                v-model="value"
                                                editorStyle="height: 320px"
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
                        label="Add Education"
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
            selectedEducationInfo: null,
            dataEducationsInfo: [
                { name: "Primary School", code: "EC" },
                { name: "High School", code: "CS" },
                { name: "University", code: "SW" },
                { name: "Institute", code: "IN" },
                { name: "Other", code: "SW" },
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
