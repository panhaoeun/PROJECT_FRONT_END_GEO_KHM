<template>
    <div class="container">
        <div>
            <div class="flex flex-column gap-15 border-round m-2">
                <h5 class="flex align-items-center justify-content-center">
                    Experience Information
                </h5>

                <!-- Add More Experience Informations -->
                <Accordion
                    contentClass=" border-round-lg"
                    class="border-round-lg"
                    selectOnFocus="true"
                    :multiple="true"
                >
                    <AccordionTab
                        v-for="(experience, index) in experienceAddMulti"
                        :key="index"
                        expandIcon="pi pi-plus"
                        collapseIcon="pi pi-minus"
                    >
                        <!-- Headers -->
                        <template #header>
                            <Badge :value="index + 1" class="ml-auto mr-2" />
                            <span
                                class="flex align-items-center gap-2 w-full justify-between"
                            >
                                <!-- Position Experiences -->
                                <div class="flex flex-column">
                                    <span
                                        class="white-space-nowrap font-semibold"
                                        v-if="
                                            experience?.positionEmpExperience !==
                                            ''
                                        "
                                        >{{
                                            truncateLongTextExperiences(
                                                experience?.positionEmpExperience,
                                                70,
                                                "\b"
                                            ) ?? "(Not Specified)"
                                        }}
                                    </span>
                                    <span v-else>(Not Specified)</span>
                                    <!-- Date of present day experience  -->
                                    <small
                                        v-if="
                                            experience?.selectedStartDate !==
                                                null ||
                                            experience?.selectedStartDate !==
                                                undefined
                                        "
                                    >
                                        {{
                                            formatDateExperienceWork(
                                                experience?.selectedStartDate
                                            ) || ""
                                        }}
                                        <!-- End Date or Present day -->
                                        <template
                                            v-if="
                                                endDatePresentCheck !== '' &&
                                                disabledSelectedEndDate == true
                                            "
                                        >
                                            {{
                                                "-" + endDatePresentCheck ||
                                                formatDateExperienceWork(
                                                    experience?.selectedEndDate
                                                )
                                            }}
                                        </template>
                                        <template
                                            v-if="
                                                experience?.selectedStartDate !==
                                                    '' &&
                                                endDatePresentCheck == '' ||
                                                disabledSelectedEndDate == false
                                            "
                                        >
                                            {{
                                                "-" +
                                                formatDateExperienceWork(
                                                    experience?.selectedEndDate
                                                )
                                            }}
                                        </template>
                                    </small>
                                </div>

                                <!-- Remove Icons -->
                                <div class="p-2 my-2 gap-10 flex pl-2">
                                    <Button
                                        v-show="index != 0"
                                        severity="danger"
                                        @click.prevent="
                                            onRemoveAddNewExperienceTap(index)
                                        "
                                        icon="pi pi-trash"
                                        rounded
                                        class="text-sm w-2rem h-2rem"
                                    />
                                    <Button
                                        severity="info"
                                        @click.prevent="
                                            onClickAddMoreExperienceInformation(
                                                index
                                            )
                                        "
                                        icon="pi pi-plus-circle"
                                        rounded
                                        class="text-sm w-2rem h-2rem"
                                    />
                                </div>
                            </span>
                        </template>
                        <!-- Experiences -->
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
                                                v-model="
                                                    experience.selectedTypeExperience
                                                "
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
                                                v-model="
                                                    experience.positionEmpExperience
                                                "
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
                                                v-model="
                                                    experience.nameOfCompanyMinistry
                                                "
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
                                                v-model="
                                                    experience.addressExperiencesWork
                                                "
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
                                                placeholder="06/12/2024"
                                                class="border-round-lg text-sm h-3rem"
                                                v-model="
                                                    experience.selectedStartDate
                                                "
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
                                                placeholder="03/10/2024"
                                                :disabled="
                                                    disabledSelectedEndDate
                                                "
                                                v-model="
                                                    experience.selectedEndDate
                                                "
                                            />
                                        </div>
                                        <!-- Employment Type -->
                                        <div class="field col-4">
                                            <label for="name_en" class="text-sm"
                                                >Employment Type
                                                <span class="p-error">*</span>
                                            </label>
                                            <Dropdown
                                                v-model="
                                                    experience.selectedEmploymentType
                                                "
                                                :options="dataEmployeeType"
                                                optionLabel="name"
                                                placeholder="Select a Type Experience"
                                                class="w-full border-round-lg text-sm"
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
                                                        v-model="
                                                            experience.checkPresentsDay
                                                        "
                                                        inputId="present_day"
                                                        name="present_day"
                                                        :binary="true"
                                                        value="Present Day"
                                                        @update:modelValue="
                                                            onChangePresentDayCheck(
                                                                experience?.checkPresentsDay,
                                                                experience?.selectedEndDate
                                                            )
                                                        "
                                                    />
                                                    <label
                                                        for="present_day_checked"
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
                                                v-model="descriptionExperiences"
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
                        label="Add Experience"
                        severity="info"
                        text
                        @click.prevent="onClickAddMoreExperienceInformation()"
                        icon="pi pi-plus-circle"
                        class="w-15rem text-sm border-2 border-dashed border-200 text-black bg-slate-900 border-round-lg"
                    />
                </div>
            </div>
        </div>
    </div>
    <!-- Confirm Dialogs Experiences Working -->
    <Dialog
        v-model:visible="deleteItemExp"
        :style="{ width: '450px' }"
        header="Delete Item"
        :modal="true"
    >
        <div class="confirmation-content">
            <i
                class="pi pi-exclamation-triangle mr-3"
                style="font-size: 2rem"
            />
            <!-- Position Experiences -->
            <span class="white-space-nowrap font-semibold"
                >Are you sure you want to delete this item?
            </span>
        </div>
        <template #footer>
            <Button
                label="No"
                icon="pi pi-times"
                text
                @click="deleteItemExp = false"
            />
            <Button
                :label="deleteItemExpLoading ? 'Loading...' : 'Remove'"
                icon="pi pi-check"
                text
                :loading="deleteItemExpLoading"
                @click="confirmRemoveExpWorkInfoItem()"
            />
        </template>
    </Dialog>
</template>
<!-- experience work -->
<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            dataEmployeeType: [
                { name: "Full Time", code: "FT" },
                { name: "Part Time", code: "PT" },
                { name: "Self-Employed", code: "SE" },
                { name: "Freelancer", code: "FL" },
                { name: "Contract", code: "CA" },
                { name: "Internship", code: "IS" },
                { name: "Other", code: "OH" },
            ],
            dataExperienceWork: [
                { name: "Educations", code: "EC" },
                { name: "Civil service", code: "CS" },
                { name: "Social work", code: "SW" },
                { name: "Others", code: "OH" },
            ],
            experienceAddMulti: [
                {
                    selectedTypeExperience: null,

                    positionEmpExperience: "",
                    nameOfCompanyMinistry: "",
                    selectedStartDate: "",
                    selectedEndDate: "",
                    addressExperiencesWork: "",
                    selectedEmploymentType: null,
                    checkPresentsDay: null,
                    descriptionExperiences: "",
                },
            ],
            deleteItemExp: false,
            deletedItemIdex: 0,
            deleteItemExpLoading: false,
            endDatePresentCheck: "",
            disabledSelectedEndDate: false,
        };
    },
    methods: {
        truncateLongTextExperiences(str, length, useWordBoundary) {
            if (str.length <= length) {
                return str;
            }
            const subString = str.slice(0, length - 1); // the original check
            return (
                (useWordBoundary
                    ? subString.slice(0, subString.lastIndexOf(" "))
                    : subString) + "..."
            );
        },
        formatDateExperienceWork(date) {
            if (date !== "" && typeof date !== "undefined") {
                var d = new Date(date),
                    month =
                        "" + d?.toLocaleString("default", { month: "long" }),
                    day = "" + d?.getDate(),
                    year = d?.getFullYear();
                if (month?.length < 2) month = "0" + month;
                if (day?.length < 2) day = "0" + day;
                return [month, year].join(" ");
            }
            return "";
        },
        onClickAddMoreExperienceInformation() {
            try {
                this.experienceAddMulti.push({
                    selectedTypeExperience: null,
                    positionEmpExperience: "",
                    nameOfCompanyMinistry: "",
                    selectedStartDate: "",
                    selectedEndDate: "",
                    addressExperiencesWork: "",
                    checkPresentsDay: null,
                    descriptionExperiences: "",
                });
            } catch (error) {
                return Error(error || error.message);
            }
        },
        onRemoveAddNewExperienceTap(index) {
            try {
                this.deleteItemExp = true;
                this.deletedItemIdex = parseInt(index) ?? 0;
                // this.experienceAddMulti.splice(index, 1);
            } catch (error) {
                return Error(error || error.message);
            }
        },
        confirmRemoveExpWorkInfoItem() {
            try {
                this.deleteItemExpLoading = true;
                setTimeout(() => {
                    this.deleteItemExpLoading = false;
                    this.deleteItemExp = false;
                    this.experienceAddMulti.splice(this.deletedItemIdex, 1);
                }, 1000);
            } catch (error) {
                return Error(error || error.message);
            }
        },
        onChangePresentDayCheck(checkPresent, endDate) {
            this.disabledSelectedEndDate = false;
            if (checkPresent !== false && checkPresent === true) {
                this.disabledSelectedEndDate = true;
                return (this.endDatePresentCheck = "Present");
            } else {
                this.disabledSelectedEndDate = false;
                return (this.endDatePresentCheck = endDate);
            }
        },
    },
};
</script>
