<template>
    <div class="container">
        <div>
            <div class="flex flex-column gap-15 border-round m-2">
                <h5 class="flex align-items-center justify-content-center">
                    Educations Information
                </h5>
                <!-- Add More Experience Informations -->
                <Accordion
                    contentClass="border-round-lg"
                    class="border-round-lg"
                    selectOnFocus="true"
                    :multiple="true"
                >
                    <AccordionTab
                        v-for="(educations, index) in addMultiEducationInfo"
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
                                            educations?.schoolDegreeName !== ''
                                        "
                                        >{{
                                            truncateLongTextEducation(
                                                educations?.schoolDegreeName,
                                                70,
                                                "\b"
                                            ) ?? "(Not Specified)"
                                        }}
                                    </span>
                                    <span v-else>(Not Specified)</span>
                                    <!-- Date of present day experience  -->
                                    <small
                                        v-if="
                                            educations?.selectedStartDate !==
                                                null ||
                                            educations?.selectedStartDate !==
                                                undefined
                                        "
                                    >
                                        {{
                                            formatDateEducation(
                                                educations?.selectedStartDate
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
                                                formatDateEducation(
                                                    educations?.selectedEndDate
                                                )
                                            }}
                                        </template>
                                        <template
                                            v-if="
                                                (educations?.selectedStartDate !==
                                                    '' &&
                                                    endDatePresentCheck ==
                                                        '') ||
                                                disabledSelectedEndDate == false
                                            "
                                        >
                                            {{
                                                "-" +
                                                formatDateEducation(
                                                    educations?.selectedEndDate
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
                                            onRemoveAddNewEducationTap(index)
                                        "
                                        icon="pi pi-trash"
                                        rounded
                                        class="text-sm w-2rem h-2rem"
                                    />
                                    <Button
                                        severity="info"
                                        @click.prevent="
                                            onAddNewEducationsEmpInfo(index)
                                        "
                                        icon="pi pi-plus-circle"
                                        rounded
                                        class="text-sm w-2rem h-2rem"
                                    />
                                </div>
                            </span>
                        </template>

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
                                                v-model="
                                                    educations.selectedEducationInfo
                                                "
                                                :options="dataEducationsInfo"
                                                optionLabel="name"
                                                placeholder="Select a education type"
                                                class="w-full border-round-lg text-sm"
                                            />
                                        </div>
                                        <!-- Positions -->
                                        <div class="field col-4">
                                            <label for="name_en" class="text-sm"
                                                >Degree
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                v-model="
                                                    educations.schoolDegreeName
                                                "
                                                placeholder="Degree"
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
                                                placeholder="Grade"
                                                class="border-round-lg text-sm h-3rem"
                                                v-model="
                                                    educations.gradeNumberOfSchool
                                                "
                                            />
                                        </div>
                                        <!-- School -->
                                        <div class="field col-4">
                                            <label for="school" class="text-sm"
                                                >School
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                placeholder="School"
                                                class="border-round-lg text-sm h-3rem"
                                                v-model="
                                                    educations.schoolDegreeUniversityName
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
                                                placeholder="06/12/2022"
                                                class="border-round-lg text-sm h-3rem"
                                                v-model="
                                                    educations.selectedStartDate
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
                                                :disabled="
                                                    disabledSelectedEndDate
                                                "
                                                iconDisplay="input"
                                                class="border-round-lg text-sm h-3rem"
                                                placeholder="03/10/2023"
                                                v-model="
                                                    educations.selectedEndDate
                                                "
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
                                                            educations.checkPresentsDay
                                                        "
                                                        :binary="true"
                                                        inputId="checkPresentsDay"
                                                        name="checkPresentsDay"
                                                        value="Present Day"
                                                        @update:modelValue="
                                                            onChangePresentDayCheckEducation(
                                                                educations?.checkPresentsDay,
                                                                educations?.selectedEndDate
                                                            )
                                                        "
                                                    />
                                                    <label
                                                        for="checkPresentsDay"
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
                                                v-model="
                                                    educations.descriptionEducation
                                                "
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
                        @click.prevent="onAddNewEducationsEmpInfo()"
                        icon="pi pi-plus-circle"
                        class="w-15rem text-sm border-2 border-dashed border-200 text-black bg-slate-900 border-round-lg"
                    />
                </div>
            </div>
        </div>
    </div>
    <!-- Confirm Dialogs Education for Study -->
    <Dialog
        v-model:visible="deleteItemEdu"
        :style="{ width: '450px' }"
        header="Delete Item"
        :modal="true"
    >
        <div class="confirmation-content">
            <i
                class="pi pi-exclamation-triangle mr-3"
                style="font-size: 2rem"
            />
            <!-- Education Title -->
            <span class="white-space-nowrap font-semibold"
                >Are you sure you want to delete this item?
            </span>
        </div>
        <template #footer>
            <Button
                label="No"
                icon="pi pi-times"
                text
                @click="deleteItemEdu = false"
            />
            <Button
                :label="deleteItemEducationLoading ? 'Loading...' : 'Remove'"
                icon="pi pi-check"
                text
                :loading="deleteItemEducationLoading"
                @click="confirmRemoveEducationsInfoItem()"
            />
        </template>
    </Dialog>
</template>
<!-- Educations Emp Info -->
<script>
export default {
    mounted() {
        this.$emit("educationInfo", this.addMultiEducationInfo);
    },
    data() {
        return {
            disabledSelectedEndDate: false,
            endDatePresentCheck: "",
            deleteItemEducationLoading: false,
            deletedItemIdex: 0,
            deleteItemEdu: false,
            dataEducationsInfo: [
                { name: "Primary School", code: "EC" },
                { name: "High School", code: "CS" },
                { name: "University", code: "SW" },
                { name: "Institute", code: "IN" },
                { name: "Other", code: "SW" },
            ],
            dataEmployeeType: [
                { name: "Full Time", code: "FT" },
                { name: "Part Time", code: "PT" },
                { name: "Self-Employed", code: "SE" },
                { name: "Freelancer", code: "FL" },
                { name: "Contract", code: "CA" },
                { name: "Internship", code: "IS" },
            ],
            addMultiEducationInfo: [
                {
                    checkPresentsDay: null,
                    selectedEducationInfo: null,
                    schoolDegreeName: "",
                    gradeNumberOfSchool: "",
                    schoolDegreeUniversityName: "",
                    nameOfCompanyMinistry: "",
                    selectedStartDate: "",
                    selectedEndDate: "",
                    addressExperiencesWork: "",
                    selectedEmploymentType: null,
                    descriptionEducation: "",
                },
            ],
        };
    },
    methods: {
        truncateLongTextEducation(str, length, useWordBoundary) {
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
        formatDateEducation(date) {
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
        onChangePresentDayCheckEducation(checkPresent, endDate) {
            this.disabledSelectedEndDate = false;
            if (checkPresent !== false && checkPresent === true) {
                this.disabledSelectedEndDate = true;
                return (this.endDatePresentCheck = "Present");
            } else {
                this.disabledSelectedEndDate = false;
                return (this.endDatePresentCheck = endDate);
            }
        },
        onAddNewEducationsEmpInfo() {
            try {
                this.addMultiEducationInfo.push({
                    selectedEducationInfo: null,
                    schoolDegreeName: "",
                    gradeNumberOfSchool: "",
                    schoolDegreeUniversityName: "",
                    nameOfCompanyMinistry: "",
                    selectedStartDate: "",
                    selectedEndDate: "",
                    addressExperiencesWork: "",
                    selectedEmploymentType: null,
                    checkPresentsDay: null,
                    descriptionEducation: "",
                });
            } catch (e) {
                throw Error(e || e.message);
            }
        },
        onRemoveAddNewEducationTap(index) {
            try {
                this.deleteItemEdu = true;
                this.deletedItemIdex = parseInt(index) ?? 0;
            } catch (error) {
                return Error(error || error.message);
            }
        },
        confirmRemoveEducationsInfoItem() {
            try {
                this.deleteItemEducationLoading = true;
                setTimeout(() => {
                    this.deleteItemEducationLoading = false;
                    this.deleteItemEdu = false;
                    this.addMultiEducationInfo.splice(this.deletedItemIdex, 1);
                }, 1000);
            } catch (error) {
                return Error(error || error.message);
            }
        },
    },
};
</script>
