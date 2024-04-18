<template>
    <div class="container">
        <div class="flex justify-content-evenly flex-wrap">
            <div class="flex flex-column gap-15 border-round m-2">
                <h5 class="align-items-center justify-content-center flex">
                    Skills Information
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
                                        <!-- Positions -->
                                        <div class="field col-6 lg:col-6">
                                            <label for="name_en" class="text-sm"
                                                >Skill
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                v-model="positionEmpExperience"
                                                placeholder="Software Development"
                                                class="border-round-lg text-sm h-3rem"
                                            />
                                        </div>
                                        <!-- Type Governments -->
                                        <div class="col-6 lg:col-6 field">
                                            <label for="name_en" class="text-sm"
                                                >Level
                                                <span class="p-error">*</span>
                                            </label>
                                            <Dropdown
                                                v-model="selectedTypeExperience"
                                                :options="dataLevelSkills"
                                                optionLabel="name"
                                                placeholder="Select a entry level skill"
                                                class="w-full border-round-lg text-sm"
                                            />
                                        </div>
                                        <!-- Type Governments -->
                                        <div class="col-6 lg:col-6 field">
                                            <label for="name_en" class="text-sm"
                                                >Applications
                                            </label>
                                            <div
                                                class="flex gap-2 items-center"
                                            >
                                                <InputText
                                                    type="text"
                                                    v-model="
                                                        positionEmpExperience
                                                    "
                                                    placeholder="Machine Learning"
                                                    class="border-round-lg text-sm h-3rem"
                                                />
                                                <!-- Plus Add More New -->
                                                <Button
                                                    class="text-sm h-1rem w-1rem border-round"
                                                    icon="pi pi-plus-circle"
                                                />
                                            </div>
                                        </div>
                                        <!-- Descriptions -->
                                        <div class="field col-12">
                                            <label for="name_en" class="text-sm"
                                                >Descriptions</label
                                            >
                                            <Editor
                                                v-model="value"
                                                placeholder="Enter Descriptions"
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
                        label="Add Skill"
                        severity="info"
                        text
                        icon="pi pi-plus-circle"
                        class="w-10rem text-sm border-2 border-dashed border-200 text-black bg-slate-900 border-round-lg"
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
