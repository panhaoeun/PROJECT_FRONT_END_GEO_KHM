<template>
    <div class="container">
        <div>
            <div class="flex flex-column gap-15 border-round m-2">
                <h5 class="flex align-items-center justify-content-center">
                    Languages Information
                </h5>
                <!-- Add More Experience Informations -->
                <Accordion
                    contentClass="border-round-lg"
                    class="border-round-lg"
                    selectOnFocus="true"
                    :multiple="true"
                >
                    <AccordionTab
                        v-for="(languages, index) in addMultiLanguagesInfo"
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
                                            languages?.languagesNameKnow !== ''
                                        "
                                        >{{
                                            truncateLongTextLanguageInfo(
                                                languages?.languagesNameKnow,
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
                                            onRemovedLanguageKnow(index)
                                        "
                                        icon="pi pi-trash"
                                        rounded
                                        class="text-sm w-2rem h-2rem"
                                    />
                                    <Button
                                        severity="info"
                                        @click.prevent="
                                            onAddNewLanguagesWorkEmpInfo(index)
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
                                        <!-- Positions -->
                                        <div class="field col-6 lg:col-6">
                                            <label for="name_en" class="text-sm"
                                                >Languages
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                v-model="
                                                    languages.languagesNameKnow
                                                "
                                                placeholder="English or Khmer Language"
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
                                                v-model="
                                                    languages.selectedLevelLan
                                                "
                                                :options="dataLevelLanguages"
                                                optionLabel="name"
                                                placeholder="Select a entry level languages"
                                                class="w-full border-round-lg text-sm"
                                            />
                                        </div>
                                        <!-- Descriptions -->
                                        <div class="field col-12">
                                            <label for="name_en" class="text-sm"
                                                >Descriptions</label
                                            >
                                            <Editor
                                                v-model="
                                                    languages.descriptionLanguages
                                                "
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
                        label="Add Languages"
                        severity="info"
                        text
                        @click.prevent="onAddNewLanguagesWorkEmpInfo"
                        icon="pi pi-plus-circle"
                        class="w-15rem text-sm border-2 border-dashed border-200 text-black bg-slate-900 border-round-lg"
                    />
                </div>
            </div>
        </div>
    </div>
    <!-- Confirm Dialogs Languages for workings -->
    <Dialog
        v-model:visible="deleteItemLang"
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
                @click="deleteItemLang = false"
            />
            <Button
                :label="deleteItemLanguagesLoading ? 'Loading...' : 'Remove'"
                icon="pi pi-check"
                text
                :loading="deleteItemLanguagesLoading"
                @click="confirmRemoveLanguagesInfoItem()"
            />
        </template>
    </Dialog>
</template>
<!-- experience work -->
<script>
export default {
    mounted() {
        this.$emit("languagesInfo", this.addMultiLanguagesInfo);
    },
    data() {
        return {
            selectedLevelLan: null,
            dataLevelLanguages: [
                { name: "Native Speaker", code: "EC" },
                { name: "Fluent", code: "CS" },
                { name: "Very Good", code: "SW" },
                { name: "Basic", code: "OH" },
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
            addMultiLanguagesInfo: [
                {
                    languagesNameKnow: "",
                    selectedLevelLan: null,
                    descriptionLanguages: "",
                },
            ],
            deleteItemLang: false,
            deletedItemIdex: 0,
            deleteItemLanguagesLoading: false,
        };
    },
    methods: {
        truncateLongTextLanguageInfo(str, length, useWordBoundary) {
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
        onAddNewLanguagesWorkEmpInfo() {
            try {
                this.addMultiLanguagesInfo.push({
                    languagesNameKnow: "",
                    selectedLevelLan: null,
                    descriptionLanguages: "",
                });
            } catch (e) {
                throw Error(e || e.message);
            }
        },
        onRemovedLanguageKnow(index) {
            try {
                this.deleteItemLang = true;
                this.deletedItemIdex = parseInt(index) ?? 0;
            } catch (error) {
                return Error(error || error.message);
            }
        },
        confirmRemoveLanguagesInfoItem() {
            try {
                this.deleteItemLanguagesLoading = true;
                setTimeout(() => {
                    this.deleteItemLanguagesLoading = false;
                    this.deleteItemLang = false;
                    this.addMultiLanguagesInfo.splice(this.deletedItemIdex, 1);
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
