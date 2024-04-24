<template>
    <div class="container">
        <div>
            <div class="flex flex-column gap-15 border-round m-2">
                <h5 class="align-items-center justify-content-center flex">
                    Skills Information
                </h5>
                <!-- Add More Experience Informations -->
                <Accordion
                    contentClass="border-round-lg"
                    class="border-round-lg"
                    selectOnFocus="true"
                    :multiple="true"
                >
                    <AccordionTab
                        v-for="(skill, index) in addMultiSkillExpInfo"
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
                                        v-if="skill?.skillWorkInfoJobExp !== ''"
                                        >{{
                                            truncateLongTextSkill(
                                                skill?.skillWorkInfoJobExp,
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
                                            onRemoveAddNewSkillWorkTap(index)
                                        "
                                        icon="pi pi-trash"
                                        rounded
                                        class="text-sm w-2rem h-2rem"
                                    />
                                    <Button
                                        severity="info"
                                        @click.prevent="
                                            onAddNewSkillWorkEmpInfo(index)
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
                                                >Skill
                                                <span class="p-error">*</span>
                                            </label>
                                            <InputText
                                                type="text"
                                                v-model="
                                                    skill.skillWorkInfoJobExp
                                                "
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
                                                v-model="
                                                    skill.selectedLevelSkillInfoJob
                                                "
                                                :options="dataLevelSkills"
                                                optionLabel="name"
                                                placeholder="Select a entry level skill"
                                                class="w-full border-round-lg text-sm"
                                            />
                                        </div>
                                        <!-- Type of Applications of skill info-->
                                        <div class="col-6 lg:col-6 field">
                                            <label for="name_en" class="text-sm"
                                                >Applications
                                            </label>
                                            <div
                                                class="flex gap-10 items-center"
                                                v-for="(
                                                    application, index
                                                ) in addAppToUseEmpInfo"
                                                :key="index"
                                            >
                                                <InputText
                                                    type="text"
                                                    v-model="
                                                        application.skillWorkInfoJobExp
                                                    "
                                                    placeholder="Word, Excel or Adobe Photo Shop"
                                                    class="border-round-lg text-sm h-3rem gap-10 my-2"
                                                />
                                                <!-- Plus Add More New -->
                                                <Button
                                                    class="text-sm h-1rem w-1rem border-round"
                                                    icon="pi pi-plus-circle"
                                                    @click.prevent="
                                                        onAddNewApplicationInfoSkill
                                                    "
                                                    severity="info"
                                                />
                                                <Button
                                                    v-if="index !== 0"
                                                    rounded
                                                    severity="danger"
                                                    @click.prevent="
                                                        onRemovedApplicationSkill(
                                                            index
                                                        )
                                                    "
                                                    class="text-sm h-1rem w-1rem border-round"
                                                    icon="pi pi-trash"
                                                />
                                            </div>
                                        </div>
                                        <!-- Descriptions -->
                                        <div class="field col-12">
                                            <label for="name_en" class="text-sm"
                                                >Descriptions</label
                                            >
                                            <Editor
                                                v-model="
                                                    skill.descriptionSkillInfoJob
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
                        label="Add Skill"
                        severity="info"
                        text
                        @click.prevent="onAddNewSkillWorkEmpInfo()"
                        icon="pi pi-plus-circle"
                        class="w-10rem text-sm border-2 border-dashed border-200 text-black bg-slate-900 border-round-lg"
                    />
                </div>
            </div>
        </div>
    </div>
    <!-- Confirm Dialogs Skill for workings -->
    <Dialog
        v-model:visible="deleteItemSkill"
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
                @click="deleteItemSkill = false"
            />
            <Button
                :label="deleteItemSkillLoading ? 'Loading...' : 'Remove'"
                icon="pi pi-check"
                text
                :loading="deleteItemSkillLoading"
                @click="confirmRemoveSkillInfoItem()"
            />
        </template>
    </Dialog>
</template>
<!-- experience work -->
<script>
export default {
    mounted() {
        this.$emit("skillWorkInfo", {
            skillExp: this.addMultiSkillExpInfo,
            application: this.addAppToUseEmpInfo,
        });
    },
    data() {
        return {
            dataLevelSkills: [
                { name: "Experts" },
                { name: "Experienced" },
                { name: "Beginners" },
                { name: "None" },
            ],
            dataEmployeeType: [
                { name: "Full Time" },
                { name: "Part Time" },
                { name: "Self-Employed" },
                { name: "Freelancer" },
                { name: "Contract" },
                { name: "Internship" },
                { name: "Other" },
            ],
            addMultiSkillExpInfo: [
                {
                    selectedLevelSkillInfoJob: null,
                    skillWorkInfoJobExp: "",
                    descriptionSkillInfoJob: "",
                },
            ],
            disabledSelectedEndDate: false,
            endDatePresentCheck: "",
            deleteItemSkillLoading: false,
            deletedItemIdex: 0,
            deleteItemSkill: false,
            addAppToUseEmpInfo: [
                {
                    applicationEmpName: "",
                },
            ],
        };
    },
    computed: {
        getOptSkillWorkInfoJob() {
            const getSkillInfo = this.selectedOptOrgChartRootLevel
                ? this.selectedOptOrgChartRootLevel
                : 0;
            if (
                !getSkillInfo ||
                (typeof getSkillInfo !== "undefined" && getSkillInfo !== null)
            ) {
                return getSkillInfo?.orgSupDeptStrId
                    ? getSkillInfo?.orgSupDeptStrId
                    : 0;
            }
            return null;
        },
    },
    methods: {
        truncateLongTextSkill(str, length, useWordBoundary) {
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
        onAddNewSkillWorkEmpInfo() {
            try {
                this.addMultiSkillExpInfo.push({
                    selectedLevelSkillInfoJob: null,
                    skillWorkInfoJobExp: "",
                    descriptionSkillInfoJob: "",
                });
            } catch (e) {
                throw Error(e || e.message);
            }
        },
        onRemoveAddNewSkillWorkTap(index) {
            try {
                this.deleteItemSkill = true;
                this.deletedItemIdex = parseInt(index) ?? 0;
            } catch (error) {
                return Error(error || error.message);
            }
        },
        confirmRemoveSkillInfoItem() {
            try {
                this.deleteItemSkillLoading = true;
                setTimeout(() => {
                    this.deleteItemSkillLoading = false;
                    this.deleteItemSkill = false;
                    this.addMultiSkillExpInfo.splice(this.deletedItemIdex, 1);
                }, 1000);
            } catch (error) {
                return Error(error || error.message);
            }
        },
        // App Skill
        onAddNewApplicationInfoSkill() {
            this.addAppToUseEmpInfo.push({
                applicationEmpName: "",
            });
        },
        onRemovedApplicationSkill(index) {
            this.addAppToUseEmpInfo.splice(index ? index : 0, 1);
        },
    },
};
</script>
