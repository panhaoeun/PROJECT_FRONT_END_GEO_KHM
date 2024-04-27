<template>
    <div class="layout-content">
        <!-- Titles -->
        <div class="flex flex-row justify-content-between pl-2">
            <h2 class="text-black text-xl section section-title:before">
                View Detail Employee
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
        <!-- Employee details -->
        <div
            class="content gap-5"
            v-if="
                getViewDetailEmployeeData !== null ||
                (getViewDetailEmployeeData != '' &&
                    typeof getViewDetailEmployeeData !== 'object')
            "
        >
            <div class="row px-2 py-2 my-2">
                <div class="col-sm-12 col-md-4 employee-cv">
                    <div
                        class="card-header resume bg-teal-100 justify-content-center items-center flex p-30"
                    >
                        <div>
                            <!-- Employee Profile -->
                            <img
                                v-if="
                                    getViewDetailEmployeeData?.employeeProfile
                                        ?.profile !== null &&
                                    getViewDetailEmployeeData?.employeeProfile
                                        ?.profile !== ''
                                "
                                :alt="slotProps?.node.empName"
                                class="p-avatar p-component p-avatar-circle h-4rem w-4rem p-avatar-xl mr-2"
                                :src="
                                    imageURLEmpOrgProfile(
                                        getViewDetailEmployeeData
                                            ?.employeeProfile?.profile
                                    )
                                "
                                @error="pictureLoadingError"
                            />
                            <Avatar
                                :label="
                                    extendedSplit(
                                        getViewDetailEmployeeData
                                            ?.employeeProfile?.empEnglishName
                                    )
                                "
                                class="mr-2"
                                size="xlarge"
                                shape="circle"
                                style="
                                    background-color: #ece9fc;
                                    color: #2a1261;
                                "
                                v-else
                            />
                        </div>
                    </div>
                    <div
                        class="card-content bg-white border-round-bottom-lg gap-10"
                    >
                        <div
                            class="card-content-member text-center items-center justify-items-center gap-10"
                        >
                            <h4 class="m-t-0 text-md py-2">
                                {{
                                    String(
                                        getViewDetailEmployeeData
                                            ?.employeeProfile?.empEnglishName
                                    ) ?? "N/A"
                                }}
                            </h4>
                            <h5 class="text-sm">Department:</h5>
                            <p class="m-0">
                                <i class="pi pi-mobile" aria-hidden="true"></i>
                                {{
                                    parseInt(
                                        getViewDetailEmployeeData
                                            ?.employeeProfile?.empPhoneNumber
                                    ) ?? ""
                                }}
                            </p>
                        </div>
                        <!-- Personal Information -->
                        <div class="card-content-languages mt-6">
                            <div class="card-content-languages-group"></div>
                            <div class="card-content-languages-group">
                                <h5
                                    class="text-center items-center justify-items-center font-bold my-4"
                                >
                                    Personal Information
                                </h5>

                                <table class="table table-hover">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Name</th>
                                            <td>
                                                {{
                                                    String(
                                                        getViewDetailEmployeeData
                                                            ?.employeeProfile
                                                            ?.empEnglishName
                                                    ) ?? "N/A"
                                                }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Phone</th>
                                            <td>
                                                {{
                                                    parseInt(
                                                        getViewDetailEmployeeData
                                                            ?.employeeProfile
                                                            ?.empPhoneNumber
                                                    ) ?? ""
                                                }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email Address</th>
                                            <td>
                                                {{
                                                    String(
                                                        getViewDetailEmployeeData
                                                            ?.employeeProfile
                                                            ?.empEmailAddr
                                                    ) ?? "N/A"
                                                }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address</th>
                                            <td>
                                                {{
                                                    String(
                                                        getViewDetailEmployeeData
                                                            ?.employeeProfile
                                                            ?.empAddress
                                                    ) ?? "N/A"
                                                }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- Personal Informations -->
                            <div class="card-content-languages-group">
                                <table class="table table-hover" width="100%">
                                    <tbody>
                                        <tr>
                                            <th scope="col">
                                                National Country
                                            </th>
                                            <td>
                                                {{
                                                    getViewDetailEmployeeData
                                                        ?.employeeProfile
                                                        ?.empNationCountry ??
                                                    "N/A"
                                                }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="col">Date of Birth</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>Gender</th>
                                            <td>
                                                {{
                                                    String(
                                                        getViewDetailEmployeeData
                                                            ?.employeeProfile
                                                            ?.empGender
                                                    ) ?? "N/A"
                                                }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Marital Status</th>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="card-footer-stats">
                                <div>
                                    <p></p>
                                    <span class="stats-small"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Positional Information -->
                <div class="col-sm-12 col-md-8 employee-cv-info">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 rating-block card">
                            <h5
                                class="text-center items-center justify-items-center font-bold my-4"
                            >
                                Positional Information
                            </h5>
                            <table class="table table-hover" width="100%">
                                <tbody>
                                    <tr>
                                        <th>Position</th>
                                        <td>N/A</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- Education Informations -->
                        <div
                            class="col-sm-12 col-md-12 rating-block card container"
                        >
                            <h5
                                class="text-center items-center justify-items-center font-bold my-4"
                            >
                                Educations Information
                            </h5>
                            <div class="table-responsive">
                                <table
                                    class="table table-hover table-responsive scroll-m-0"
                                    width="100%"
                                    v-if="
                                        getViewDetailEmployeeData?.educations !==
                                            null ||
                                        typeof getViewDetailEmployeeData?.educations !==
                                            'object'
                                    "
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Education Type</th>
                                            <th scope="col">Degree</th>
                                            <th scope="col">Grade</th>
                                            <th scope="col">School</th>
                                            <th scope="col">Start Date</th>
                                            <th scope="col">End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        v-for="(
                                            education, index
                                        ) in getViewDetailEmployeeData?.educations"
                                        :key="index"
                                    >
                                        <tr>
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>
                                                {{
                                                    education?.empTypeEdu ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    education?.empEducationEmp ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    education?.empGradeEdu ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    education?.empStartEdu ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    education?.empEndDateEdu ??
                                                    "N/A"
                                                }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- Experiece Informations -->
                        <div
                            class="col-sm-12 col-md-12 rating-block card container"
                        >
                            <h5
                                class="text-center items-center justify-items-center font-bold my-4"
                            >
                                Experience Information
                            </h5>
                            <div class="table-responsive">
                                <table
                                    class="table table-hover table-responsive"
                                    width="100%"
                                    v-if="
                                        getViewDetailEmployeeData?.experience !==
                                            null ||
                                        typeof getViewDetailEmployeeData?.experience !==
                                            'object'
                                    "
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Experience Type</th>
                                            <th scope="col">Employee Type</th>
                                            <th scope="col">Position</th>
                                            <th scope="col">
                                                Company/Ministry
                                            </th>
                                            <th scope="col">Start Date</th>
                                            <th scope="col">End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        v-for="(
                                            experience, index
                                        ) in getViewDetailEmployeeData?.experience"
                                        :key="index"
                                    >
                                        <tr>
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>
                                                {{
                                                    experience?.typeExpWork ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    experience?.empType ?? "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    experience?.positionName ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    experience?.companyMinistryName ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    experience?.startedDateEmp ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    experience?.endDateEmp ??
                                                    "N/A"
                                                }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- Experiece Informations -->
                        <div
                            class="col-sm-12 col-md-12 rating-block card container"
                        >
                            <h5
                                class="text-center items-center justify-items-center font-bold my-4"
                            >
                                Experience Information
                            </h5>
                            <div class="table-responsive">
                                <table
                                    class="table table-hover table-responsive"
                                    width="100%"
                                    v-if="
                                        getViewDetailEmployeeData?.experience !==
                                            null ||
                                        typeof getViewDetailEmployeeData?.experience !==
                                            'object'
                                    "
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Experience Type</th>
                                            <th scope="col">Employee Type</th>
                                            <th scope="col">Position</th>
                                            <th scope="col">
                                                Company/Ministry
                                            </th>
                                            <th scope="col">Start Date</th>
                                            <th scope="col">End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        v-for="(
                                            experience, index
                                        ) in getViewDetailEmployeeData?.experience"
                                        :key="index"
                                    >
                                        <tr>
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>
                                                {{
                                                    experience?.typeExpWork ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    experience?.empType ?? "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    experience?.positionName ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    experience?.companyMinistryName ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    experience?.startedDateEmp ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    experience?.endDateEmp ??
                                                    "N/A"
                                                }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- Skill Informations -->
                        <div
                            class="col-sm-12 col-md-12 rating-block card container"
                        >
                            <h5
                                class="text-center items-center justify-items-center font-bold my-4"
                            >
                                Skill Information
                            </h5>
                            <div class="table-responsive">
                                <table
                                    class="table table-hover table-responsive"
                                    width="100%"
                                    v-if="
                                        getViewDetailEmployeeData?.skill !==
                                            null ||
                                        typeof getViewDetailEmployeeData?.skill !==
                                            'object'
                                    "
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Skill</th>
                                            <th scope="col">
                                                Entry Level Skill
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        v-for="(
                                            skill, index
                                        ) in getViewDetailEmployeeData?.skill"
                                        :key="index"
                                    >
                                        <tr>
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>
                                                {{
                                                    skill?.empSkillName ?? "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    skill?.empLevelEntrySkill ??
                                                    "N/A"
                                                }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- Languages Informations -->
                        <div
                            class="col-sm-12 col-md-12 rating-block card container"
                        >
                            <h5
                                class="text-center items-center justify-items-center font-bold my-4"
                            >
                                Languages Information
                            </h5>
                            <div class="table-responsive">
                                <table
                                    class="table table-hover table-responsive"
                                    width="100%"
                                    v-if="
                                        getViewDetailEmployeeData?.languages !==
                                            null ||
                                        typeof getViewDetailEmployeeData?.languages !==
                                            'object'
                                    "
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Languages</th>
                                            <th scope="col">
                                                Entry Level Languages
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        v-for="(
                                            languages, index
                                        ) in getViewDetailEmployeeData?.languages"
                                        :key="index"
                                    >
                                        <tr>
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>
                                                {{
                                                    languages?.empLanName ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    languages?.empLevelEntryLan ??
                                                    "N/A"
                                                }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- Referenece Informations -->
                        <div
                            class="col-sm-12 col-md-12 rating-block card container"
                        >
                            <h5
                                class="text-center items-center justify-items-center font-bold my-4"
                            >
                                Reference Information
                            </h5>
                            <div class="table-responsive">
                                <table
                                    class="table table-hover table-responsive"
                                    width="100%"
                                    v-if="
                                        getViewDetailEmployeeData?.languages !==
                                            null ||
                                        typeof getViewDetailEmployeeData?.languages !==
                                            'object'
                                    "
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Reference Name</th>
                                            <th scope="col">Company</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        v-for="(
                                            reference, index
                                        ) in getViewDetailEmployeeData?.references"
                                        :key="index"
                                    >
                                        <tr>
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>
                                                {{
                                                    reference?.empReferFullName ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    reference?.empReferCompanyName ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    reference?.empReferPhoneNumber ??
                                                    "N/A"
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    reference?.empReferEmail ??
                                                    "N/A"
                                                }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- Hobbies Informations -->
                        <div
                            class="col-sm-12 col-md-12 rating-block card container"
                        >
                            <h5
                                class="text-center items-center justify-items-center font-bold my-4"
                            >
                                Hobbies Information
                            </h5>
                            <div class="table-responsive">
                                <table
                                    class="table table-hover table-responsive"
                                    width="100%"
                                    v-if="
                                        getViewDetailEmployeeData?.hobbies !==
                                            null ||
                                        typeof getViewDetailEmployeeData?.hobbies !==
                                            'object'
                                    "
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Hobbies Name</th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        v-for="(
                                            hobbies, index
                                        ) in getViewDetailEmployeeData?.hobbies"
                                        :key="index"
                                    >
                                        <tr>
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>
                                                {{
                                                    hobbies?.empHobbiesNameEng ??
                                                    "N/A"
                                                }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content gap-5" v-else>
            <h5>Employee not found!</h5>
        </div>
    </div>
</template>

<!-- View Detail Employee Profile -->
<script>
import addNewEmpUserAdminHelper from "@/mixin/admin_user_management/addNewEmpUserAdminHelper.js";
export default {
    mixins: [addNewEmpUserAdminHelper],
    data() {
        return {
            employeeDetailData: [],
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE.replace(
                "https",
                "http"
            ),
        };
    },
    mounted() {
        this.viewDetailOfEmployeeProfile();
    },
    methods: {
        viewDetailOfEmployeeProfile() {
            const getEmpId = this.$route.params.id ? this.$route.params.id : 0;
            if (!getEmpId || getEmpId !== "" || getEmpId !== null) {
                this.getAllReloadJobHistoryWorkDeptPositionOrg(getEmpId);
            }
        },
    },
};
</script>
