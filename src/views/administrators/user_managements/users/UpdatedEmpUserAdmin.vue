<template>
    <Toast />
    <div class="layout-content px-4 py-4">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-2 py-2">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Edit Employee Profile
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
                        :validation-schema="currentSchema"
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
                                    @click="props?.navigateToTab(props.index)"
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
                                    <PersonalInformation
                                        @employeeFile="
                                            onSelectedFileEmpPersonal
                                        "
                                        :personalInfoEmp="
                                            empProfilePersonalInfo
                                                ? empProfilePersonalInfo
                                                : null
                                        "
                                        :empEnglishName="empProfilePersonalInfo?.empEnglishName"
                                    />
                                </div>
                            </TabContent>
                            <!-- Tab contents Experiences -->
                            <TabContent
                                title="Experiences"
                                icon="pi pi-briefcase"
                            >
                                <PersonalExperiences
                                    @experiencesInfo="
                                        experiencesInfoJobWorkInfo
                                    "
                                    :personalInfoExperiences="
                                        empProfileExperience
                                            ? empProfileExperience
                                            : []
                                    "
                                />
                            </TabContent>
                            <!-- Tab contents Educations -->
                            <TabContent title="Educations" icon="pi pi-book">
                                <EducationsInformation
                                    @educationInfo="educationStudyKnowledge"
                                />
                            </TabContent>
                            <!-- Tab contents Skills -->
                            <TabContent title="Skills" icon="pi pi-database">
                                <SkillsInformation
                                    @skillWorkInfo="skillWorkExpInfo"
                                />
                            </TabContent>
                            <!-- Tab contents Languages -->
                            <TabContent title="Languages" icon="pi pi-language">
                                <LanguagesInformation
                                    @languagesInfo="languagesKnowledgeExpInfo"
                                />
                            </TabContent>
                            <!-- Tab contents References -->
                            <TabContent
                                title="Reference"
                                icon="pi pi-megaphone"
                            >
                                <ReferencesWorkInformation
                                    @referenceInfo="referenceInfoJobExpInfo"
                                />
                            </TabContent>
                            <!-- Tab contents Hobbies -->
                            <TabContent title="Hobbies" icon="pi pi-compass">
                                <HobbiesPersonalInformation
                                    @hobbiesInfo="hobbiesPersonalInfo"
                                />
                            </TabContent>
                            <!-- Finish Step Current Admin Employee-->
                            <TabContent
                                title="Confirm"
                                icon="pi pi-check-circle"
                            >
                                <div
                                    class="justify-content-center items-center flex"
                                >
                                    <el-result
                                        icon="success"
                                        title="Confirm the add new"
                                        sub-title="Successfully add new employee!"
                                    >
                                    </el-result>
                                </div>
                            </TabContent>

                            <!-- Button Next/Prev Step  -->
                            <!-- You can create custom design and event -->
                            <template v-slot:footer="props">
                                <div
                                    class="col-12 flex justify-between mt-4 gap-10 items-end"
                                >
                                    <Button
                                        label="Previous"
                                        icon="pi pi-chevron-left"
                                        iconPos="left"
                                        class="w-10rem border-round-lg"
                                        type="submit"
                                        outlined
                                        v-if="
                                            props.activeTabIndex > 0 &&
                                            !props.isLastStep &&
                                            currentStep !== 0
                                        "
                                        :style="props.fillButtonStyle"
                                        @click.prevent="prevStep"
                                    />
                                    <!-- Arrow  Right Icon For Next Step-->
                                    <div
                                        class="wizard-footer-right text-right justify-self-end"
                                    >
                                        <Button
                                            label="Next"
                                            class="w-10rem border-round-lg"
                                            icon="pi pi-chevron-right"
                                            severity="danger"
                                            outlined
                                            type="submit"
                                            iconPos="right"
                                            :style="props.fillButtonStyle"
                                            v-if="!props.isLastStep"
                                            @click.prevent="nextStep"
                                        />
                                        <Button
                                            :label="
                                                props.isLastStep
                                                    ? 'Done...'
                                                    : 'Next'
                                            "
                                            :loading="loadingAddNewEmp"
                                            iconPos="left"
                                            :icon="
                                                props?.isLastStep
                                                    ? 'pi pi-check-circle'
                                                    : 'pi pi-file-export'
                                            "
                                            class="w-10rem border-round-lg"
                                            type="submit"
                                            outlined
                                            @click.prevent="
                                                storeModifyAdminUserBaseMultiInfo(
                                                    values
                                                )
                                            "
                                            v-else
                                            :style="props.fillButtonStyle"
                                        />
                                    </div>
                                </div>
                            </template>
                        </FormWizard>
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
import PersonalExperiences from "./employee_assign_manage/popup_assign_more_emp/popup_experience_info/EditedNewExperienceWork";
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
            stepLength: 7,
            // form wizard reference to control the steps
            formWizard: 0,
            // Each step should have its own validation schema
            experiencesInfo: [],
            educationInfo: [],
            skillInfo: [],
            languagesInfo: [],
            referenceInfo: [],
            hobbiesPersonalInfo: [],
            loadingWizard: false,
            profileEmp: null,
            loadingAddNewEmp: false,
            // Updated Emp Admin Geo-fence
            empProfilePersonalInfo: null,
            empProfileEducation: null,
            empProfileExperience: null,
            empProfileHobbies: null,
            empProfileLanguages: null,
            empProfileReference: null,
            empProfileSkill: null,
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
    mounted() {
        const empId = parseInt(this.$route.params.id)
            ? parseInt(this.$route.params.id)
            : 0;
        this.getViewDetailEmployeeDataOfficerOrg(empId);
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
            if (this.currentStep <= 0) {
                return;
            }
            // this.currentStep--;
            // previous step function to move to the previous step
            this.$refs.formWizard?.prevTab();
        },
        setLoading: function (value) {
            this.loadingWizard = value;
        },
        experiencesInfoJobWorkInfo(info) {
            return (this.experiencesInfo = info ? info : []);
        },
        educationStudyKnowledge(edu) {
            return (this.educationInfo = edu ? edu : []);
        },
        skillWorkExpInfo(skill) {
            return (this.skillInfo = skill ? skill : []);
        },
        languagesKnowledgeExpInfo(lan) {
            return (this.languagesInfo = lan ? lan : []);
        },
        referenceInfoJobExpInfo(reference) {
            return (this.referenceInfo = reference ? reference : []);
        },
        hobbiesInfoInfoJobExpInfo(hobbiesInfo) {
            return (this.hobbiesPersonalInfo = hobbiesInfo ? hobbiesInfo : []);
        },
        storeModifyAdminUserBaseMultiInfo(formWizard) {
            try {
                const expInfo = this.experiencesInfo
                    ? this.experiencesInfo
                    : [];
                const eduInfo = this.educationInfo ? this.educationInfo : [];
                const skillInfo = this.skillInfo ? this.skillInfo : [];
                const languagesInfo = this.languagesInfo
                    ? this.languagesInfo
                    : [];
                const referenceInfo = this.referenceInfo
                    ? this.referenceInfo
                    : [];
                const hobbiesPersonalInfo = this.hobbiesPersonalInfo
                    ? this.hobbiesPersonalInfo
                    : [];
                const employeeAdmin = {
                    formWizard,
                    expInfo,
                    eduInfo,
                    skillInfo,
                    languagesInfo,
                    referenceInfo,
                    hobbiesPersonalInfo,
                };
                this.addUpdatedEmpPersonalInfoMulti(
                    employeeAdmin ? employeeAdmin : []
                );
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        onSelectedFileEmpPersonal(file) {
            this.profileEmp = file ? file : [];
        },
    },
};
</script>
