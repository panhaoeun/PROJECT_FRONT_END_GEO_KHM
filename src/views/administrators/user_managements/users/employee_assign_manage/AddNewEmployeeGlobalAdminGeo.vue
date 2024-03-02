<template>
    <div class="layout-content px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-2 px-2 py-2">
            <h2
                class="relative text-black text-xl section section-title:before"
            >
                Add New Employee
            </h2>
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click.prevent="
                    $router.push(
                        '/admin/admin-management-employee-assign/list-hrm-assign-employee-role-module'
                    )
                "
            >
                <div class="pl-2 justify-content-center">
                    <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
                    <span class="pl-2">{{ $t("route.routeBack") }}</span>
                </div>
            </el-button>
        </div>
        <!-- Content -->
        <div class="gird">
            <div class="col-12">
                <el-card class="box-card">
                    <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                        <div class="col-12 lg:col-12">
                            <TabView>
                                <!-- Basic Info -->
                                <TabPanel header="Basic Info" :disabled="false">
                                    <div class="m-0 p-0">
                                        <div class="grid formgrid">
                                            <!-- Surname -->
                                            <div class="col-4 lg:col-6 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        class="text-sm font-semibold"
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empSurname
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                    >
                                                        Surname
                                                        <span class="p-error"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <InputText
                                                        class="border-round-lg text-sm"
                                                        type="text"
                                                        v-model="
                                                            v$.empSurname.$model
                                                        "
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empSurname
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        placeholder="Surname"
                                                    />
                                                    <small
                                                        v-if="
                                                            (v$.empSurname
                                                                .$invalid &&
                                                                submitted) ||
                                                            v$.empSurname
                                                                .$pending
                                                                .$response
                                                        "
                                                        class="p-error text-sm"
                                                        >{{
                                                            v$.empSurname.required.$message.replace(
                                                                "Value",
                                                                "Surname"
                                                            )
                                                        }}</small
                                                    >
                                                </div>
                                            </div>
                                            <!-- First name -->
                                            <div class="col-4 lg:col-6 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empFirstName
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        class="text-sm font-semibold"
                                                    >
                                                        First Name
                                                        <span class="p-error"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <InputText
                                                        class="border-round-lg text-sm"
                                                        type="text"
                                                        v-model="
                                                            v$.empFirstName
                                                                .$model
                                                        "
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empFirstName
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        placeholder="First Name"
                                                    />
                                                    <small
                                                        v-if="
                                                            (v$.empFirstName
                                                                .$invalid &&
                                                                submitted) ||
                                                            v$.empFirstName
                                                                .$pending
                                                                .$response
                                                        "
                                                        class="p-error text-sm"
                                                        >{{
                                                            v$.empFirstName.required.$message.replace(
                                                                "Value",
                                                                "First Name"
                                                            )
                                                        }}</small
                                                    >
                                                </div>
                                            </div>
                                            <!-- Email Address -->
                                            <div class="col-4 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empEmailAddr
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        class="text-sm font-semibold"
                                                    >
                                                        Email Address
                                                        <span class="p-error"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <InputText
                                                        class="border-round-lg text-sm"
                                                        type="text"
                                                        v-model="
                                                            v$.empEmailAddr
                                                                .$model
                                                        "
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empEmailAddr
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        placeholder="Email Address"
                                                    />
                                                    <small
                                                        v-if="
                                                            (v$.empEmailAddr
                                                                .$invalid &&
                                                                submitted) ||
                                                            v$.empEmailAddr
                                                                .$pending
                                                                .$response
                                                        "
                                                        class="p-error text-sm"
                                                        >{{
                                                            v$.empEmailAddr.required.$message.replace(
                                                                "Value",
                                                                "Email Address"
                                                            )
                                                        }}</small
                                                    >
                                                </div>
                                            </div>
                                            <!-- Phone Number -->
                                            <div class="col-4 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        class="text-sm font-semibold"
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$
                                                                    .empPhoneNumber
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                    >
                                                        Phone Number
                                                        <span class="p-error"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <InputNumber
                                                        class="border-round-lg text-sm"
                                                        type="number"
                                                        :useGrouping="false"
                                                        :min="1"
                                                        :max="12"
                                                        v-model.number="
                                                            v$.empPhoneNumber
                                                                .$model
                                                        "
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$
                                                                    .empPhoneNumber
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        placeholder="Phone Number"
                                                    />
                                                    <small
                                                        v-if="
                                                            (v$.empPhoneNumber
                                                                .$invalid &&
                                                                submitted) ||
                                                            v$.empPhoneNumber
                                                                .$pending
                                                                .$response
                                                        "
                                                        class="p-error text-sm"
                                                        >{{
                                                            v$.empPhoneNumber.required.$message.replace(
                                                                "Value",
                                                                "Phone Number"
                                                            )
                                                        }}</small
                                                    >
                                                </div>
                                            </div>
                                            <!-- National -->
                                            <div class="col-4 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        class="text-sm font-semibold"
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empNational
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                    >
                                                        National
                                                        <span class="p-error"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <InputText
                                                        class="border-round-lg text-sm"
                                                        type="text"
                                                        :useGrouping="false"
                                                        :min="1"
                                                        :max="12"
                                                        v-model.number="
                                                            v$.empNational
                                                                .$model
                                                        "
                                                        :class="{
                                                            'p-invalid border-round-lg p-error':
                                                                v$.empNational
                                                                    .$invalid &&
                                                                submitted,
                                                        }"
                                                        placeholder="National"
                                                    />
                                                    <small
                                                        v-if="
                                                            (v$.empNational
                                                                .$invalid &&
                                                                submitted) ||
                                                            v$.empNational
                                                                .$pending
                                                                .$response
                                                        "
                                                        class="p-error text-sm"
                                                        >{{
                                                            v$.empNational.required.$message.replace(
                                                                "Value",
                                                                "National"
                                                            )
                                                        }}</small
                                                    >
                                                </div>
                                            </div>
                                            <!-- Address -->
                                            <div class="col-12 field">
                                                <div class="field">
                                                    <label
                                                        for="name_en"
                                                        class="text-sm font-semibold"
                                                    >
                                                        Address
                                                    </label>
                                                    <Textarea
                                                        class="border-round-lg text-sm"
                                                        type="text"
                                                        v-model.trim="
                                                            empAddress
                                                        "
                                                        placeholder="Address"
                                                    />
                                                </div>
                                            </div>
                                            <!-- Description -->
                                            <div class="col-12 field">
                                                <div class="field">
                                                    <label
                                                        for="Description"
                                                        class="text-sm font-semibold"
                                                    >
                                                        Description
                                                    </label>
                                                    <Editor
                                                        class="border-round-lg text-sm"
                                                        type="text"
                                                        v-model.trim="
                                                            empDescription
                                                        "
                                                        editorStyle="height: 320px"
                                                        placeholder="Please enter description"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <!-- Experience Info -->
                                <TabPanel header="Experience">
                                    <div class="m-0 p-0">
                                        <div>
                                            <template
                                                class="grid formgrid border-1 border-round-lg py-2 px-2"
                                            >
                                                <!-- Types -->
                                                <div
                                                    class="col-4 lg:col-6 field"
                                                >
                                                    <div class="field">
                                                        <label
                                                            for="type_name"
                                                            class="text-sm font-semibold"
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empTypeName
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                        >
                                                            Type
                                                            <span
                                                                class="p-error"
                                                                >*</span
                                                            >
                                                        </label>
                                                        <InputText
                                                            class="border-round-lg text-sm"
                                                            type="text"
                                                            v-model="
                                                                v$.empTypeName
                                                                    .$model
                                                            "
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empTypeName
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                            placeholder="Type"
                                                        />
                                                        <small
                                                            v-if="
                                                                (v$.empTypeName
                                                                    .$invalid &&
                                                                    submitted) ||
                                                                v$.empTypeName
                                                                    .$pending
                                                                    .$response
                                                            "
                                                            class="p-error text-sm"
                                                            >{{
                                                                v$.empTypeName.required.$message.replace(
                                                                    "Value",
                                                                    "Type Name"
                                                                )
                                                            }}</small
                                                        >
                                                    </div>
                                                </div>
                                                <!-- Position Name -->
                                                <div
                                                    class="col-4 lg:col-6 field"
                                                >
                                                    <div class="field">
                                                        <label
                                                            for="type_name"
                                                            class="text-sm font-semibold"
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperiencePosName
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                        >
                                                            Position
                                                            <span
                                                                class="p-error"
                                                                >*</span
                                                            >
                                                        </label>
                                                        <InputText
                                                            class="border-round-lg text-sm"
                                                            type="text"
                                                            v-model="
                                                                v$
                                                                    .empExperiencePosName
                                                                    .$model
                                                            "
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperiencePosName
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                            placeholder="Software Developments"
                                                        />
                                                        <small
                                                            v-if="
                                                                (v$
                                                                    .empExperiencePosName
                                                                    .$invalid &&
                                                                    submitted) ||
                                                                v$
                                                                    .empExperiencePosName
                                                                    .$pending
                                                                    .$response
                                                            "
                                                            class="p-error text-sm"
                                                            >{{
                                                                v$.empExperiencePosName.required.$message.replace(
                                                                    "Value",
                                                                    "Position Name"
                                                                )
                                                            }}</small
                                                        >
                                                    </div>
                                                </div>
                                                <!-- Company/Ministry -->
                                                <div
                                                    class="col-4 lg:col-6 field"
                                                >
                                                    <div class="field">
                                                        <label
                                                            for="type_name"
                                                            class="text-sm font-semibold"
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperienceCompany
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                        >
                                                            Company/Ministry
                                                            <span
                                                                class="p-error"
                                                                >*</span
                                                            >
                                                        </label>
                                                        <InputText
                                                            class="border-round-lg text-sm"
                                                            type="text"
                                                            v-model="
                                                                v$
                                                                    .empExperienceCompany
                                                                    .$model
                                                            "
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperienceCompany
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                            placeholder="C.A.I.T Co.ltd"
                                                        />
                                                        <small
                                                            v-if="
                                                                (v$
                                                                    .empExperienceCompany
                                                                    .$invalid &&
                                                                    submitted) ||
                                                                v$
                                                                    .empExperienceCompany
                                                                    .$pending
                                                                    .$response
                                                            "
                                                            class="p-error text-sm"
                                                            >{{
                                                                v$.empExperienceCompany.required.$message.replace(
                                                                    "Value",
                                                                    "Company/Ministry"
                                                                )
                                                            }}</small
                                                        >
                                                    </div>
                                                </div>
                                                <!-- Employee Type-->
                                                <div
                                                    class="col-4 lg:col-6 field"
                                                >
                                                    <div class="field">
                                                        <label
                                                            for="employee_type"
                                                            class="text-sm font-semibold"
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperienceTypeGeo
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                        >
                                                            Employee Type
                                                            <span
                                                                class="p-error"
                                                                >*</span
                                                            >
                                                        </label>
                                                        <InputText
                                                            class="border-round-lg text-sm"
                                                            type="text"
                                                            v-model="
                                                                v$
                                                                    .empExperienceTypeGeo
                                                                    .$model
                                                            "
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperienceTypeGeo
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                            placeholder="Full Time"
                                                        />
                                                        <small
                                                            v-if="
                                                                (v$
                                                                    .empExperienceTypeGeo
                                                                    .$invalid &&
                                                                    submitted) ||
                                                                v$
                                                                    .empExperienceTypeGeo
                                                                    .$pending
                                                                    .$response
                                                            "
                                                            class="p-error text-sm"
                                                            >{{
                                                                v$.empExperienceTypeGeo.required.$message.replace(
                                                                    "Value",
                                                                    "Employee Type"
                                                                )
                                                            }}</small
                                                        >
                                                    </div>
                                                </div>
                                                <!-- Address-->
                                                <div
                                                    class="col-4 lg:col-6 field"
                                                >
                                                    <div class="field">
                                                        <label
                                                            for="employee_type"
                                                            class="text-sm font-semibold"
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperienceAddr
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                        >
                                                            Address
                                                            <span
                                                                class="p-error"
                                                                >*</span
                                                            >
                                                        </label>
                                                        <InputText
                                                            class="border-round-lg text-sm"
                                                            type="text"
                                                            v-model="
                                                                v$
                                                                    .empExperienceAddr
                                                                    .$model
                                                            "
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperienceAddr
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                            placeholder="Address"
                                                        />
                                                        <small
                                                            v-if="
                                                                (v$
                                                                    .empExperienceAddr
                                                                    .$invalid &&
                                                                    submitted) ||
                                                                v$
                                                                    .empExperienceAddr
                                                                    .$pending
                                                                    .$response
                                                            "
                                                            class="p-error text-sm"
                                                            >{{
                                                                v$.empExperienceAddr.required.$message.replace(
                                                                    "Value",
                                                                    "Address"
                                                                )
                                                            }}</small
                                                        >
                                                    </div>
                                                </div>
                                                <!-- Start Date-->
                                                <div
                                                    class="col-4 lg:col-6 field"
                                                >
                                                    <div class="field">
                                                        <label
                                                            for="employee_type"
                                                            class="text-sm font-semibold"
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperienceStartDate
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                        >
                                                            Start Date
                                                            <span
                                                                class="p-error"
                                                                >*</span
                                                            >
                                                        </label>
                                                        <Calendar
                                                            showIcon
                                                            :showOnFocus="true"
                                                            class="border-round-lg text-sm"
                                                            type="text"
                                                            v-model="
                                                                v$
                                                                    .empExperienceStartDate
                                                                    .$model
                                                            "
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperienceStartDate
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                            placeholder="Start Date"
                                                        />
                                                        <small
                                                            v-if="
                                                                (v$
                                                                    .empExperienceStartDate
                                                                    .$invalid &&
                                                                    submitted) ||
                                                                v$
                                                                    .empExperienceStartDate
                                                                    .$pending
                                                                    .$response
                                                            "
                                                            class="p-error text-sm"
                                                            >{{
                                                                v$.empExperienceStartDate.required.$message.replace(
                                                                    "Value",
                                                                    "Start Date"
                                                                )
                                                            }}</small
                                                        >
                                                    </div>
                                                </div>
                                                <!-- End Date-->
                                                <div
                                                    class="col-4 lg:col-6 field"
                                                >
                                                    <div class="field">
                                                        <label
                                                            for="employee_type"
                                                            class="text-sm font-semibold"
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperienceEndDate
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                        >
                                                            End Date
                                                            <span
                                                                class="p-error"
                                                                >*</span
                                                            >
                                                        </label>
                                                        <Calendar
                                                            showIcon
                                                            :showOnFocus="true"
                                                            class="border-round-lg text-sm"
                                                            type="text"
                                                            v-model="
                                                                v$
                                                                    .empExperienceEndDate
                                                                    .$model
                                                            "
                                                            :class="{
                                                                'p-invalid border-round-lg p-error':
                                                                    v$
                                                                        .empExperienceEndDate
                                                                        .$invalid &&
                                                                    submitted,
                                                            }"
                                                            placeholder="End Date"
                                                        />
                                                        <small
                                                            v-if="
                                                                (v$
                                                                    .empExperienceEndDate
                                                                    .$invalid &&
                                                                    submitted) ||
                                                                v$
                                                                    .empExperienceEndDate
                                                                    .$pending
                                                                    .$response
                                                            "
                                                            class="p-error text-sm"
                                                            >{{
                                                                v$.empExperienceEndDate.required.$message.replace(
                                                                    "Value",
                                                                    "End Date"
                                                                )
                                                            }}</small
                                                        >
                                                    </div>
                                                </div>
                                                <!-- Descriptions-->
                                                <div
                                                    class="col-12 lg:col-12 field"
                                                >
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
                                                            v-model="
                                                                empExperienceNotes
                                                            "
                                                            placeholder="Descriptions"
                                                        />
                                                    </div>
                                                </div>
                                            </template>
                                            <!-- Add New Experiences -->
                                            <div class="col-12 lg:col-6 field">
                                                <div class="field">
                                                    <Button
                                                        icon="pi pi-plus-circle"
                                                        class="border-round-lg text-sm w-10rem"
                                                        type="button"
                                                        label="Add Experience"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabView>
                            <!-- Buttons Submits Save -->
                            <div class="col-12 flex justify-content-end mt-4">
                                <Button
                                    icon="pi pi-file"
                                    class="btn-primary py-3 w-10rem"
                                    type="submit"
                                    :loading="loadingAddNewEmp"
                                    :label="
                                        loadingAddNewEmp
                                            ? 'Saving...'
                                            : 'Add New'
                                    "
                                    @click.prevent="
                                        submitAddNewEmpGlobalGeo(!v$.$invalid)
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<!-- Script of global-admin -->
<script>
import { FilterMatchMode } from "primevue/api";
import { useVuelidate } from "@vuelidate/core";
import { maxLength, minLength, numeric, required } from "@vuelidate/validators";
export default {
    components: {},
    props: {},
    setup() {
        return { v$: useVuelidate() };
    },
    validations() {
        return {
            empSurname: { required, minLength: minLength(3) },
            empFirstName: { required, minLength: minLength(3) },
            empPhoneNumber: {
                required,
                numeric,
                minLength: minLength(6),
                maxLength: maxLength(11),
            },
            empEmailAddr: { required, minLength: minLength(3) },
            empNational: { required, minLength: minLength(3) },
            empTypeName: { required, minLength: minLength(3) },
            empExperiencePosName: { required, minLength: minLength(3) },
            empExperienceCompany: { required, minLength: minLength(3) },
            empTypeGeo: { required, minLength: minLength(3) },
            empExperienceTypeGeo: { required },
            empExperienceAddr: { required },
            empExperienceStartDate: { required },
            empExperienceEndDate: { required },
        };
    },
    data() {
        return {
            listAdminEmpGlobal: null,
            activeEmpAdminGeo: 1,
            filtersEmp: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            loadingAddNewEmp: false,
            empSurname: "",
            empFirstName: "",
            empPhoneNumber: 0,
            empNational: "",
            empTypeName: "",
            empExperiencePosName: "",
            empExperienceCompany: "",
            empDescription: "",
            empTypeGeo: "",
            empExperienceAddr: "",
            empExperienceStartDate: "",
            empExperienceEndDate: "",
            empExperienceNotes: "",
            empAddress: "",
            submitted: false,
        };
    },
    created() {},
    methods: {
        async submitAddNewEmpGlobalGeo() {
            try {
                this.loadingAddNewEmp = true;
                this.submitted = true;
                setTimeout(async () => {
                    this.loadingAddNewEmp = false;
                    /**
                     * @Validations
                     * */
                    if (
                        !this.empSurname ||
                        this.empFirstName !== null ||
                        !this.empPhoneNumber
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
                        } else {
                            this.$toast.add({
                                severity: "success",
                                summary: "Success",
                                detail: "Employee added successfully",
                                life: 3000,
                            });
                        }
                    }
                    this.v$.$touch();
                    if (this.v$.$invalid) {
                        return false;
                    }
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
    },
};
</script>
