<template>
    <Toast />
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Add New Employee
            </h2>
            <Button
                label="Back"
                icon="pi pi-arrow-left"
                iconPos="left"
                class="text-sm h-2.3rem w-10rem"
                @click.prevent="
                    $router.push(
                        '/admin/admin-management-employee-assign/list-hrm-assign-employee-role-module'
                    )
                "
            />
        </div>
        <!--Create Products-->
        <el-card class="box-card">
            <!-- Toast Alert -->
            <Toast />
            <!-- Tabs -->
            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <div
                    class="col-12 lg:col-12 justify-content-center items-center container"
                >
                    <!-- :validation-schema="currentSchema" -->
                    <Form
                        @submit="nextStep"
                        keep-values
                        class="custom-form"
                        v-slot="{ values }"
                    >
                        <FormWizard ref="formWizard">
                            <!-- Access WizardStep Component directly with all props  -->
                            <template v-slot:step="props">
                                <WizardStep
                                    :tab="props.tab"
                                    :transition="props.transition"
                                    :index="props.index"
                                    @click="props.navigateToTab(props.index)"
                                >
                                    <small
                                        style="
                                            color: red;
                                            font-size: 12px;
                                            margin: auto 2px;
                                            font-weight: bold;
                                        "
                                    >
                                        Step {{ props.index + 1 }}
                                    </small>
                                </WizardStep>
                            </template>

                            <!-- Tab contents personal informations -->
                            <TabContent
                                title="Profile details"
                                icon="pi pi-user"
                            >
                                <div>
                                    <PersonalInformation />
                                </div>
                            </TabContent>
                            <!-- Tab contents Experiences -->
                            <TabContent
                                title="Experiences"
                                icon="pi pi-briefcase"
                            >
                                <PersonalExperiences />
                            </TabContent>
                            <!-- Tab contents Educations -->
                            <TabContent title="Educations" icon="pi pi-book">
                                <EducationsInformation />
                            </TabContent>
                            <!-- Tab contents Skills -->
                            <TabContent title="Skills" icon="pi pi-database">
                                <SkillsInformation />
                            </TabContent>
                            <!-- Tab contents Languages -->
                            <TabContent title="Languages" icon="pi pi-language">
                                <LanguagesInformation />
                            </TabContent>
                            <!-- Tab contents References -->
                            <TabContent
                                title="Reference"
                                icon="pi pi-megaphone"
                            >
                                <ReferencesWorkInformation />
                            </TabContent>
                            <!-- Tab contents Hobbies -->
                            <TabContent title="Hobbies" icon="pi pi-compass">
                                <HobbiesPersonalInformation />
                            </TabContent>

                            <!-- Button  next/prev step  -->
                            <!-- Access footer  directly with all props options -->
                            <!-- You can create custom design and event -->
                            <template v-slot:footer="props">
                                <div
                                    class="col-12 flex justify-between mt-4 gap-10"
                                >
                                    <Button
                                        label="Previous"
                                        icon="pi pi-chevron-left"
                                        class="w-10rem border-round-lg"
                                        type="submit"
                                        outlined
                                        v-if="
                                            props.activeTabIndex > 0 &&
                                            !props.isLastStep
                                        "
                                        :style="props.fillButtonStyle"
                                        @click.prevent="prevStep"
                                    />
                                </div>
                                <div class="wizard-footer-right">
                                    <Button
                                        label="Next"
                                        class="w-10rem border-round-lg"
                                        icon="pi pi-chevron-right"
                                        severity="danger"
                                        outlined
                                        type="submit"
                                        :style="props.fillButtonStyle"
                                        v-if="!props.isLastStep"
                                        @click.prevent="nextStep"
                                    />
                                    <Button
                                        :label="
                                            props.isLastStep ? 'Done' : 'Next'
                                        "
                                        icon="pi pi-check-circle"
                                        class="w-10rem border-round-lg"
                                        type="submit"
                                        outlined
                                        v-else
                                        :style="props.fillButtonStyle"
                                    />
                                </div>
                            </template>

                            <!-- <div
                                class="col-12 flex justify-content-end mt-4 gap-10"
                            >
                                <Button
                                    label="Previous"
                                    icon="pi pi-chevron-left"
                                    class="w-10rem border-round-lg"
                                    @click="prevStep"
                                    type="submit"
                                    outlined
                                    v-if="currentStep !== 0"
                                />
                                <Button
                                    label="Next"
                                    class="w-10rem border-round-lg"
                                    icon="pi pi-chevron-right"
                                    severity="danger"
                                    outlined
                                    type="submit"
                                    v-if="currentStep !== stepLength"
                                />
                                <Button
                                    label="Finish"
                                    icon="pi pi-check-circle"
                                    class="w-10rem border-round-lg"
                                    type="submit"
                                    outlined
                                    v-if="currentStep === stepLength"
                                />
                            </div> -->
                        </FormWizard>
                        <pre>{{ values }}</pre>
                    </Form>
                </div>
            </div>
        </el-card>
    </div>
</template>

<!-- Scripts Employee Admin -->
<script>
import { Form } from "vee-validate";
import { FormWizard, TabContent, WizardStep } from "vue3-form-wizard";
import addNewEmpUserAdminHelper from "@/mixin/admin_user_management/addNewEmpUserAdminHelper.js";
/**
 * @Global Add New Employee
 * */
import PersonalInformation from "./employee_assign_manage/popup_assign_more_emp/personal_information/PersonalInformationAssignEmp";
import PersonalExperiences from "./employee_assign_manage/popup_assign_more_emp/popup_experience_info/AddNewExperienceWork";
import EducationsInformation from "./employee_assign_manage/popup_assign_more_emp/popup_education_info/AddNewEducationEmpInfo.vue";
import SkillsInformation from "./employee_assign_manage/popup_assign_more_emp/popup_skill_info/AddNewSkillWorkInfo.vue";
import LanguagesInformation from "./employee_assign_manage/popup_assign_more_emp/popup_languages_info/AddNewLanguagesWorkInfo.vue";
import ReferencesWorkInformation from "./employee_assign_manage/popup_assign_more_emp/popup_references_job_info/AddNewReferencesJobInfo.vue";
import HobbiesPersonalInformation from "./employee_assign_manage/popup_assign_more_emp/popup_hobbies_personal/AddNewHobbiesInfo.vue";

export default {
    mixins: [addNewEmpUserAdminHelper],
    data() {
        return {
            currentStep: 0,
            // step length to control the number of steps
            stepLength: 6,
            // form wizard reference to control the steps
            formWizard: 0,
            // Each step should have its own validation schema
        };
    },
    components: {
        FormWizard,
        TabContent,
        Form,
        WizardStep,
        PersonalInformation,
        PersonalExperiences,
        EducationsInformation,
        SkillsInformation,
        LanguagesInformation,
        ReferencesWorkInformation,
        HobbiesPersonalInformation,
    },
    computed: {
        currentSchema() {
            return this.schemas[this.currentStep];
        },
    },
    methods: {
        nextStep() {
            // if (this.currentStep === this.stepLength) {
            //     console.log(values);
            //     return;
            // }
            this.currentStep++;
            // next step function to move to the next step
            this.$refs.formWizard?.nextTab();
        },
        prevStep() {
            // if (this.currentStep <= 0) {
            //     return;
            // }
            // this.currentStep--;
            // previous step function to move to the previous step
            this.$refs.formWizard?.prevTab();
        },
    },
};
</script>

<!-- Styles -->
<style>
:root {
    --primary-color: #0071fe;
    --error-color: #f23648;
    --error-bg-color: #fddfe2;
    --success-color: #21a67a;
    --success-bg-color: #e0eee4;
}
.custom-form {
    margin: 0px auto;
    padding-bottom: 10px;
}
</style>
