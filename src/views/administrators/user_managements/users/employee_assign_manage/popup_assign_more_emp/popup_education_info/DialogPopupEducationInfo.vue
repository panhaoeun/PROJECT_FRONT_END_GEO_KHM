<!-- eslint-disable vue/no-mutating-props -->
<template>
    <Dialog
        v-model:visible="openDialogsAddExperience"
        modal
        header="Create new experience"
        :style="{ width: '60rem' }"
        maximizable
    >
        <Toast />
        <!-- Headers of Exp-Info -->
        <template #closeicon>
            <i class="pi pi-times" @click.prevent="closeExpAddNew"></i>
        </template>
        <div class="m-0 p-0">
            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <TabView v-model:activeIndex="active">
                    <!-- Primary School -->
                    <TabPanel header="Primary School">
                        <template class="grid formgrid py-2 px-2">
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="school"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduPriSchool.$invalid &&
                                                submitted,
                                        }"
                                    >
                                        School
                                        <span class="p-error">*</span>
                                    </label>
                                    <InputText
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="v$.empEduPriSchool.$model"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduPriSchool.$invalid &&
                                                submitted,
                                        }"
                                        placeholder="School Name"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduPriSchool.$invalid &&
                                                submitted) ||
                                            v$.empEduPriSchool.$pending
                                                .$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduPriSchool.required.$message.replace(
                                                "Value",
                                                "School Name"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Position Name -->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="type_name"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduGradePrimary
                                                    .$invalid && submitted,
                                        }"
                                    >
                                        Grade
                                        <span class="p-error">*</span>
                                    </label>
                                    <InputText
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="v$.empEduGradePrimary.$model"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduGradePrimary
                                                    .$invalid && submitted,
                                        }"
                                        placeholder="Grade 1-4"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduGradePrimary.$invalid &&
                                                submitted) ||
                                            v$.empEduGradePrimary.$pending
                                                .$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduGradePrimary.required.$message.replace(
                                                "Value",
                                                "Grade"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Address-->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="employee_type"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduAddr.$invalid &&
                                                submitted,
                                        }"
                                    >
                                        Address
                                        <span class="p-error">*</span>
                                    </label>
                                    <InputText
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="v$.empEduAddr.$model"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduAddr.$invalid &&
                                                submitted,
                                        }"
                                        placeholder="Address"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduAddr.$invalid &&
                                                submitted) ||
                                            v$.empEduAddr.$pending.$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduAddr.required.$message.replace(
                                                "Value",
                                                "Address"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Start Date-->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="employee_type"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduStartDate.$invalid &&
                                                submitted,
                                        }"
                                    >
                                        Start Date
                                        <span class="p-error">*</span>
                                    </label>
                                    <Calendar
                                        showIcon
                                        :showOnFocus="true"
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="v$.empEduStartDate.$model"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduStartDate.$invalid &&
                                                submitted,
                                        }"
                                        placeholder="Start Date"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduStartDate.$invalid &&
                                                submitted) ||
                                            v$.empEduStartDate.$pending
                                                .$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduStartDate.required.$message.replace(
                                                "Value",
                                                "Start Date"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- End Date-->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="employee_type"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduEndDate.$invalid &&
                                                submitted,
                                        }"
                                    >
                                        End Date
                                        <span class="p-error">*</span>
                                    </label>
                                    <Calendar
                                        showIcon
                                        :showOnFocus="true"
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="v$.empEduEndDate.$model"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduEndDate.$invalid &&
                                                submitted,
                                        }"
                                        placeholder="End Date"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduEndDate.$invalid &&
                                                submitted) ||
                                            v$.empEduEndDate.$pending.$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduEndDate.required.$message.replace(
                                                "Value",
                                                "End Date"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Descriptions-->
                            <div class="col-12 lg:col-12 field">
                                <div class="field">
                                    <label
                                        for="descriptions"
                                        class="text-sm font-semibold"
                                    >
                                        Description
                                    </label>
                                    <Textarea
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="empPriNotedDes"
                                        placeholder="Descriptions"
                                    />
                                </div>
                            </div>
                        </template>
                    </TabPanel>
                    <!-- High School -->
                    <TabPanel header="High School">
                        <template class="grid formgrid py-2 px-2">
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="type_name"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduHighSchool.$invalid &&
                                                submitted,
                                        }"
                                    >
                                        School
                                        <span class="p-error">*</span>
                                    </label>
                                    <InputText
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="v$.empEduHighSchool.$model"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduHighSchool.$invalid &&
                                                submitted,
                                        }"
                                        placeholder="School Name"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduHighSchool.$invalid &&
                                                submitted) ||
                                            v$.empEduHighSchool.$pending
                                                .$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduHighSchool.required.$message.replace(
                                                "Value",
                                                "School"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="type_name"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduGradeHightName
                                                    .$invalid && submitted,
                                        }"
                                    >
                                        Grade
                                        <span class="p-error">*</span>
                                    </label>
                                    <InputText
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="v$.empEduGradeHightName.$model"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduGradeHightName
                                                    .$invalid && submitted,
                                        }"
                                        placeholder="Grade 1-4"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduGradeHightName.$invalid &&
                                                submitted) ||
                                            v$.empEduGradeHightName.$pending
                                                .$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduGradeHightName.required.$message.replace(
                                                "Value",
                                                "Grade"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Address-->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="employee_type"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduAddr.$invalid &&
                                                submitted,
                                        }"
                                    >
                                        Address
                                        <span class="p-error">*</span>
                                    </label>
                                    <InputText
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="v$.empEduAddr.$model"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduAddr.$invalid &&
                                                submitted,
                                        }"
                                        placeholder="Address"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduAddr.$invalid &&
                                                submitted) ||
                                            v$.empEduAddr.$pending.$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduAddr.required.$message.replace(
                                                "Value",
                                                "Address"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Start Date-->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="employee_type"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduHighStartDate
                                                    .$invalid && submitted,
                                        }"
                                    >
                                        Start Date
                                        <span class="p-error">*</span>
                                    </label>
                                    <Calendar
                                        showIcon
                                        :showOnFocus="true"
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="v$.empEduHighStartDate.$model"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduHighStartDate
                                                    .$invalid && submitted,
                                        }"
                                        placeholder="Start Date"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduHighStartDate.$invalid &&
                                                submitted) ||
                                            v$.empEduHighStartDate.$pending
                                                .$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduHighStartDate.required.$message.replace(
                                                "Value",
                                                "Start Date"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- End Date-->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="employee_type"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduHighEndDate.$invalid &&
                                                submitted,
                                        }"
                                    >
                                        End Date
                                        <span class="p-error">*</span>
                                    </label>
                                    <Calendar
                                        showIcon
                                        :showOnFocus="true"
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="v$.empEduHighEndDate.$model"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduHighEndDate.$invalid &&
                                                submitted,
                                        }"
                                        placeholder="End Date"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduHighEndDate.$invalid &&
                                                submitted) ||
                                            v$.empEduHighEndDate.$pending
                                                .$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduHighEndDate.required.$message.replace(
                                                "Value",
                                                "End Date"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Descriptions-->
                            <div class="col-12 lg:col-12 field">
                                <div class="field">
                                    <label
                                        for="descriptions"
                                        class="text-sm font-semibold"
                                    >
                                        Description
                                    </label>
                                    <Textarea
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="empDesHightSchool"
                                        placeholder="Descriptions"
                                    />
                                </div>
                            </div>
                        </template>
                    </TabPanel>
                    <!-- University and Master -->
                    <TabPanel header="University">
                        <template class="grid formgrid py-2 px-2">
                            <!-- University -->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="type_name"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduUniversityNameSchool
                                                    .$invalid && submitted,
                                        }"
                                    >
                                        University
                                        <span class="p-error">*</span>
                                    </label>
                                    <InputText
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="
                                            v$.empEduUniversityNameSchool.$model
                                        "
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduUniversityNameSchool
                                                    .$invalid && submitted,
                                        }"
                                        placeholder="University"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduUniversityNameSchool
                                                .$invalid &&
                                                submitted) ||
                                            v$.empEduUniversityNameSchool
                                                .$pending.$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduUniversityNameSchool.required.$message.replace(
                                                "Value",
                                                "University"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Degree -->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="type_name"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduDegreeUniversityName
                                                    .$invalid && submitted,
                                        }"
                                    >
                                        Degree
                                        <span class="p-error">*</span>
                                    </label>
                                    <InputText
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="
                                            v$.empEduDegreeUniversityName.$model
                                        "
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduDegreeUniversityName
                                                    .$invalid && submitted,
                                        }"
                                        placeholder="Degree"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduDegreeUniversityName
                                                .$invalid &&
                                                submitted) ||
                                            v$.empEduDegreeUniversityName
                                                .$pending.$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduDegreeUniversityName.required.$message.replace(
                                                "Value",
                                                "Degree"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Address-->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="employee_type"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduUniversityAddr
                                                    .$invalid && submitted,
                                        }"
                                    >
                                        Address
                                        <span class="p-error">*</span>
                                    </label>
                                    <InputText
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="v$.empEduUniversityAddr.$model"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduUniversityAddr
                                                    .$invalid && submitted,
                                        }"
                                        placeholder="Address"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduUniversityAddr.$invalid &&
                                                submitted) ||
                                            v$.empEduUniversityAddr.$pending
                                                .$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduUniversityAddr.required.$message.replace(
                                                "Value",
                                                "Address"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Start Date-->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="employee_type"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduUniversityStartDate
                                                    .$invalid && submitted,
                                        }"
                                    >
                                        Start Date
                                        <span class="p-error">*</span>
                                    </label>
                                    <Calendar
                                        showIcon
                                        :showOnFocus="true"
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="
                                            v$.empEduUniversityStartDate.$model
                                        "
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduUniversityStartDate
                                                    .$invalid && submitted,
                                        }"
                                        placeholder="Start Date"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduUniversityStartDate
                                                .$invalid &&
                                                submitted) ||
                                            v$.empEduUniversityStartDate
                                                .$pending.$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduUniversityStartDate.required.$message.replace(
                                                "Value",
                                                "Start Date"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- End Date-->
                            <div class="col-4 lg:col-6 field">
                                <div class="field">
                                    <label
                                        for="employee_type"
                                        class="text-sm font-semibold"
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduUniversityEndDate
                                                    .$invalid && submitted,
                                        }"
                                    >
                                        End Date
                                        <span class="p-error">*</span>
                                    </label>
                                    <Calendar
                                        showIcon
                                        :showOnFocus="true"
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="
                                            v$.empEduUniversityEndDate.$model
                                        "
                                        :class="{
                                            'p-invalid border-round-lg p-error':
                                                v$.empEduUniversityEndDate
                                                    .$invalid && submitted,
                                        }"
                                        placeholder="End Date"
                                    />
                                    <small
                                        v-if="
                                            (v$.empEduUniversityEndDate
                                                .$invalid &&
                                                submitted) ||
                                            v$.empEduUniversityEndDate.$pending
                                                .$response
                                        "
                                        class="p-error text-sm"
                                        >{{
                                            v$.empEduUniversityEndDate.required.$message.replace(
                                                "Value",
                                                "End Date"
                                            )
                                        }}</small
                                    >
                                </div>
                            </div>
                            <!-- Descriptions-->
                            <div class="col-12 lg:col-12 field">
                                <div class="field">
                                    <label
                                        for="descriptions"
                                        class="text-sm font-semibold"
                                    >
                                        Description
                                    </label>
                                    <Textarea
                                        class="border-round-lg text-sm"
                                        type="text"
                                        v-model="empDesUniversityDesNoted"
                                        placeholder="Descriptions"
                                    />
                                </div>
                            </div>
                        </template>
                    </TabPanel>
                </TabView>
            </div>
        </div>
        <!-- Footers -->
        <template #footer>
            <Button
                label="Cancel"
                text
                class="w-7rem"
                severity="secondary"
                @click.prevent="closeExpAddNew"
                autofocus
            />
            <Button
                :label="loadingBtnExp ? 'Add New' : 'Save'"
                class="w-10rem"
                severity="info"
                raised
                @click.prevent="addNewEducationInfo(!v$.$invalid)"
                autofocus
                :loading="loadingBtnExp"
            />
        </template>
    </Dialog>
</template>
<!-- Script of Dialogs Infor -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
export default {
    components: {},
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            empExperienceNotes: "",
            empEduPriSchool: "",
            empExperienceCompany: "",
            empTypeGeo: "",
            empExperienceTypeGeo: "",
            // Primary
            empEduAddr: "",
            empEduGradePrimary: "",
            empEduStartDate: "",
            empEduEndDate: "",
            empPriNotedDes: "",
            // High
            empEduHighSchool: "",
            empEduGradeHightName: "",
            empEduHighStartDate: "",
            empEduHighEndDate: "",
            empDesHightSchool: "",
            // University
            empEduUniversityNameSchool: "",
            empEduDegreeUniversityName: "",
            empEduUniversityAddr: "",
            empEduUniversityStartDate: "",
            empEduUniversityEndDate: "",
            empDesUniversityDesNoted: "",

            loadingBtnExp: false,
            submitted: false,
        };
    },
    validations() {
        return {
            empEduPriSchool: { required, minLength: minLength(3) },
            empEduGradePrimary: { required, minLength: minLength(3) },
            empExperienceCompany: { required, minLength: minLength(3) },
            empTypeGeo: { required, minLength: minLength(3) },
            empExperienceTypeGeo: { required },
            // Primary
            empEduAddr: { required },
            empEduStartDate: { required },
            empEduEndDate: { required },
            // Hight School
            empEduHighSchool: { required },
            empEduGradeHightName: { required },
            empEduHighStartDate: { required },
            empEduHighEndDate: { required },
            // University
            empEduUniversityNameSchool: { required },
            empEduDegreeUniversityName: { required },
            empEduUniversityAddr: { required },
            empEduUniversityStartDate: { required },
            empEduUniversityEndDate: { required },
        };
    },
    props: {
        dialogAddExperience: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    computed: {
        openDialogsAddExperience() {
            return this.dialogAddExperience || false;
        },
    },
    methods: {
        closeExpAddNew() {
            this.$emit("close-dialog");
        },
        addNewEducationInfo() {
            try {
                this.loadingBtnExp = true;
                this.submitted = true;

                setTimeout(async () => {
                    this.loadingBtnExp = false;
                    this.v$.$touch();
                    if (this.v$.$invalid) {
                        return false;
                    }
                    /**
                     * @Validations
                     * */
                    if (
                        !this.empEduPriSchool ||
                        this.empEduPriSchool !== null ||
                        !this.empEduPriSchool
                    ) {
                        const validation = await this.v$.$validate();
                        if (validation === false) {
                            const errorValidation = this.v$.$errors;
                            this.$notify.error({
                                title: "Please input filed in required",
                                message: errorValidation[0]?.$message
                                    ? errorValidation[0]?.$message
                                    : "",
                                showClose: true,
                            });
                        }
                    } else {
                        if (this.v$.$invalid === true) {
                            this.$toast.add({
                                severity: "error",
                                summary: "Error",
                                detail: "Please fill all required fields",
                                life: 3000,
                            });
                        }
                    }
                    // this.serviceManageStructuresProject
                    // const addNewOrgStrMgtPosDept = {
                    //     empNameEng: String(this.empSurname).toString(),
                    //     empNameKh: String(this.empFirstName).toString(),
                    //     empGender: this.selectedUserGender?.name,
                    //     empDOB: this.userDateOfBirth,
                    //     empStatus: "Approved",
                    //     empType: "Admin",
                    //     empStartDate: "",
                    //     empNoted: String(this.empDescription).toString(),
                    //     pathNameEmpProfile: "",
                    //     orgDepartId: "",
                    //     empAddress: String(this.empAddress).toString(),
                    //     emailAddress: String(this.empEmailAddr),
                    // };
                    // console.log(addNewOrgStrMgtPosDept);
                    // // Add New Organization Chart Root Level Info
                    // this.serviceManageStructuresProject
                    //     ?.createStoreEmpOrg(
                    //         addNewOrgStrMgtPosDept ? addNewOrgStrMgtPosDept : []
                    //     )
                    //     .then(async (addOrgStr) => {
                    //         if (addOrgStr?.data.success === true) {
                    //             this.$router.push(
                    //                 "/admin/admin-management-employee-assign/list-hrm-assign-employee-role-module"
                    //             );
                    //             this.loadingAddNewEmp = false;
                    //             this.$toast.add({
                    //                 severity: "success",
                    //                 summary:
                    //                     "Successfully add new root org-structure.",
                    //                 detail: addOrgStr.data?.message
                    //                     ? addOrgStr.data?.message
                    //                     : null,
                    //                 life: 3000,
                    //             });
                    //             // Clear Data Input
                    //             this.orgStrBoardMgtEnglishName = "";
                    //             this.orgStrBoardMgtKhmerName = "";
                    //             this.descriptionOrgStrBoardMgt = "";
                    //         }
                    //     })
                    //     .catch((error) => {
                    //         this.loadingSubmittedAddMgtBoardStrOrg = false;
                    //         this.$toast.add({
                    //             severity: "error",
                    //             summary: "Please Fix Below Errors.",
                    //             detail: error?.response.data.error?.message
                    //                 ? error?.response.data.error?.message
                    //                 : "Please input filed add new employee value!",
                    //             life: 3000,
                    //         });
                    //         if (error?.response.data.error.error?.errors) {
                    //             for (
                    //                 let index = 0;
                    //                 index <
                    //                 error.response.data.error.error?.errors
                    //                     .length;
                    //                 index++
                    //             ) {
                    //                 const validationError =
                    //                     error.response.data.error.error?.errors[
                    //                         index
                    //                     ].message ?? [];
                    //                 this.$toast.add({
                    //                     severity: "error",
                    //                     summary: "Please Fix Below Errors.",
                    //                     detail: validationError
                    //                         ? validationError
                    //                         : "Please input add new employee have missing value!",
                    //                     life: 3000,
                    //                 });
                    //             }
                    //         }
                    //     });
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
    },
};
</script>
