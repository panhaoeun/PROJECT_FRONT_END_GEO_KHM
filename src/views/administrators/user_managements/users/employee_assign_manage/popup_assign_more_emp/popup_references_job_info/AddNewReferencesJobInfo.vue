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
                    <AccordionTab
                        v-for="(reference, index) in addMultiReferenceInfo"
                        :key="index"
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
                                            reference?.referenceFullName !== ''
                                        "
                                        >{{
                                            truncateLongTextReferneceInfo(
                                                reference?.referenceFullName,
                                                70,
                                                "\b"
                                            ) ?? "(Not Specified)"
                                        }}
                                    </span>
                                    <span v-else>(Not Specified)</span>
                                </div>

                                <!-- Remove Icons -->
                                <div class="p-2 my-2 gap-10 flex pl-2">
                                    <Button
                                        v-show="index != 0"
                                        severity="danger"
                                        @click.prevent="
                                            onRemovedReferJobInfo(index)
                                        "
                                        icon="pi pi-trash"
                                        rounded
                                        class="text-sm w-2rem h-2rem"
                                    />
                                    <Button
                                        severity="info"
                                        @click.prevent="
                                            onAddNewReferenceJobInfo(index)
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
                                        <!-- References Full Name -->
                                        <div class="field col-6 lg:col-6">
                                            <label for="name_en" class="text-sm"
                                                >References Full Name
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                v-model="
                                                    reference.referenceFullName
                                                "
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
                                                v-model="
                                                    reference.companyReferenceName
                                                "
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
                                                v-model="
                                                    reference.emailOfManagerReference
                                                "
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
                                                v-model="
                                                    reference.positionEmpExperience
                                                "
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
                        @click.prevent="onAddNewReferenceJobInfo"
                        icon="pi pi-plus-circle"
                        class="w-15rem text-sm border-2 border-dashed border-200 text-black bg-slate-900 border-round-lg"
                    />
                </div>
            </div>
        </div>
    </div>
    <!-- Confirm Dialogs Refernece Info Job Info -->
    <Dialog
        v-model:visible="deleteItemReferInfo"
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
                @click="deleteItemReferInfo = false"
            />
            <Button
                :label="deleteItemReferInfoLoading ? 'Loading...' : 'Remove'"
                icon="pi pi-check"
                text
                :loading="deleteItemReferInfoLoading"
                @click="confirmRemoveReferInfo()"
            />
        </template>
    </Dialog>
</template>
<!-- experience work -->
<script>
export default {
    mounted(){
        this.$emit('referenceInfo', this.addMultiReferenceInfo);
    },
    data() {
        return {
            dataLevelSkills: [
                { name: "Experts", code: "EC" },
                { name: "Experienced", code: "CS" },
                { name: "Beginners", code: "SW" },
                { name: "None", code: "OH" },
            ],
            dataEmployeeType: [
                { name: "Full Time", code: "FT" },
                { name: "Part Time", code: "PT" },
                { name: "Self-Employed", code: "SE" },
                { name: "Freelancer", code: "FL" },
                { name: "Contract", code: "CA" },
                { name: "Internship", code: "IS" },
                { name: "Other", code: "OH" },
            ],
            addMultiReferenceInfo: [
                {
                    referenceFullName: "",
                    companyReferenceName: "",
                    emailOfManagerReference: "",
                },
            ],
            deleteItemReferInfo: false,
            deletedItemIdex: 0,
            deleteItemReferInfoLoading: false,
        };
    },
    methods: {
        truncateLongTextReferneceInfo(str, length, useWordBoundary) {
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
        onAddNewReferenceJobInfo() {
            try {
                this.addMultiReferenceInfo.push({
                    referenceFullName: "",
                    companyReferenceName: "",
                    emailOfManagerReference: "",
                });
            } catch (e) {
                throw Error(e || e.message);
            }
        },
        onRemovedReferJobInfo(index) {
            try {
                this.deleteItemReferInfo = true;
                this.deletedItemIdex = parseInt(index) ?? 0;
            } catch (error) {
                return Error(error || error.message);
            }
        },
        confirmRemoveReferInfo() {
            try {
                this.deleteItemReferInfoLoading = true;
                setTimeout(() => {
                    this.deleteItemReferInfoLoading = false;
                    this.deleteItemReferInfo = false;
                    this.addMultiReferenceInfo.splice(this.deletedItemIdex, 1);
                }, 1000);
            } catch (error) {
                return Error(error || error.message);
            }
        },
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
