<template>
    <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
        <div class="col-12 lg:col-12">
            <div
                class="flex flex-column gap-15 align-items-center justify-content-center border-round my-4"
            >
                <h5>Personal Info</h5>
            </div>
            <div class="grid formgrid">
                <!-- English Name -->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <label for="perInfoKhmerName">English Name <span class="p-error">*</span></label>
                        <Field
                            label="English Name"
                            name="empEnglishName"
                            class="p-inputtext p-component border-round-lg text-sm"
                            v-model="personalInfoEmpAssign.empEnglishName"
                            type="text"
                            placeholder="Please enter english name"
                        />
                        <!-- <TextFiledVueValidate
                            name="perInfoEnglishName"
                            type="text"
                            icon="*"
                            v-model="personalInfoEmpAssign.empNationCountry"
                            :value="
                                personalInfoEmpAssign?.empEnglishName
                                    ? personalInfoEmpAssign?.empEnglishName
                                    : ''
                            "
                            label="English Name"
                            placeholder="Please enter english name"
                        /> -->
                    </div>
                </div>
                <!-- Khmer Name -->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <label for="perInfoKhmerName">Khmer Name <span class="p-error">*</span></label>
                        <Field
                            name="perInfoKhmerName"
                            label="Khmer Name"
                            type="text"
                            class="p-inputtext p-component border-round-lg text-sm"
                            v-model="personalInfoEmpAssign.empKhmerName"
                            placeholder="Please enter khmer name"
                        />
                        <!-- <TextFiledVueValidate
                            name="perInfoKhmerName"
                            type="text"
                            :value="
                                personalInfoEmpAssign?.empKhmerName
                                    ? personalInfoEmpAssign?.empKhmerName
                                    : ''
                            "
                            label="Khmer Name"
                            placeholder="Please enter khmer name"
                        /> -->
                    </div>
                </div>
                <!-- Phone Number -->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <label for="perInfoKhmerName">Phone Number<span class="p-error">*</span></label>
                        <Field
                            name="perInfoPhoneNumber"
                            label="Phone Number"
                            type="tel"
                            class="p-inputtext p-component border-round-lg text-sm"
                            v-model="personalInfoEmpAssign.empPhoneNumber"
                            placeholder="Please enter phone number"
                        />
                        <!-- <TextFiledVueValidate
                            name="perInfoPhoneNumber"
                            type="text"
                            icon="*"
                            :value="personalInfoEmpAssign?.empPhoneNumber ?? 0"
                            v-model="personalInfoEmpAssign.empPhoneNumber"
                            label="Phone Number"
                            placeholder="Please enter phone number"
                        /> -->
                    </div>
                </div>
                <!-- Email -->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <label for="perInfoKhmerName">Email <span class="p-error">*</span></label>
                        <Field
                            name="perInfoEmail"
                            label="Email"
                            type="text"
                            class="p-inputtext p-component border-round-lg text-sm"
                            v-model="personalInfoEmpAssign.empEmailAddr"
                            placeholder="Please enter email"
                        />
                        <!-- <TextFiledVueValidate
                            name="perInfoEmail"
                            type="email"
                            label="Email"
                            :value="personalInfoEmpAssign?.empEmailAddr ?? ''"
                            placeholder="Please enter email"
                        /> -->
                    </div>
                </div>
                <!--Address-->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <label for="perInfoKhmerName">Address</label>
                        <Field
                            name="perInfoAddress"
                            type="text"
                            :value="personalInfoEmpAssign?.empAddress ?? ''"
                            v-model="personalInfoEmpAssign.empAddress"
                            label="Address"
                            placeholder="Please enter address"
                            class="p-inputtext p-component border-round-lg text-sm"
                        />
                    </div>
                </div>
                <!--National-->
                <div class="col-4 lg:col-6 field">
                    <div class="field">
                        <label for="perInfoKhmerName">Nationality <span class="p-error">*</span></label>
                        <Field
                            name="perInfoNational"
                            type="text"
                            :value="personalInfoEmpAssign?.empNationCountry ?? ''"
                            v-model="personalInfoEmpAssign.empNationCountry"
                            label="Address"
                            placeholder="Please enter your nationality"
                            class="p-inputtext p-component border-round-lg text-sm"
                        />
                        <!-- <TextFiledVueValidate
                            icon="*"
                            v-model="personalInfoEmpAssign.empNationCountry"
                            name="perInfoNational"
                            type="text"
                            :value="
                                personalInfoEmpAssign?.empNationCountry ?? ''
                            "
                            label="Nationality"
                            placeholder="Please enter your nationality"
                        /> -->
                    </div>
                </div>
                <!-- Upload Files Department Job Descriptions-->
                <div class="col-6 field">
                    <label> Upload File </label>
                    <div>
                        <FileUpload
                            name="demo[]"
                            url="/api/upload"
                            :multiple="false"
                            accept="image/jpeg,image/gif,image/png,image/x-eps"
                            :maxFileSize="300000000"
                            @select="onSelectedFileEmployeeProfile"
                            :fileLimit="1"
                            :previewWidth="500"
                        >
                            <template
                                #header="{
                                    chooseCallback,
                                    clearCallback,
                                    files,
                                }"
                            >
                                <div
                                    class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2"
                                >
                                    <div class="flex gap-2">
                                        <Button
                                            @click="chooseCallback()"
                                            icon="pi pi-images"
                                            rounded
                                            class="w-3rem h-3rem"
                                            outlined
                                        ></Button>
                                        <Button
                                            @click="clearCallback()"
                                            icon="pi pi-times"
                                            rounded
                                            outlined
                                            class="w-3rem h-3rem"
                                            severity="danger"
                                            :disabled="
                                                !files || files.length === 0
                                            "
                                        ></Button>
                                    </div>
                                </div>
                            </template>
                            <template #content="{ files, removeFileCallback }">
                                <div v-if="files.length > 0">
                                    <div
                                        class="flex flex-wrap p-0 sm:p-2 gap-1"
                                    >
                                        <div
                                            v-for="(file, index) of files"
                                            :key="
                                                file.name +
                                                file.type +
                                                file.size
                                            "
                                            class="card m-0 px-2 flex flex-row border-1 item-center surface-border align-items-center gap-2 w-full"
                                        >
                                            <div
                                                class="ml-3"
                                                v-if="
                                                    file.type !==
                                                    'application/pdf'
                                                "
                                            >
                                                <img
                                                    role="presentation"
                                                    :alt="file?.name"
                                                    :src="file?.objectURL"
                                                    width="100"
                                                    height="50"
                                                />
                                            </div>
                                            <div v-else class="ml-3">
                                                <i
                                                    class="pi pi-file-pdf text-danger"
                                                    style="font-size: 2rem"
                                                ></i>
                                            </div>
                                            <span
                                                class="font-semibold text-sm"
                                                >{{ file.name }}</span
                                            >
                                            <div class="text-red-500">
                                                ({{ formatSize(file.size) }})
                                            </div>
                                            <Button
                                                icon="pi pi-times"
                                                @click="
                                                    onRemoveTemplatingFile(
                                                        file,
                                                        removeFileCallback,
                                                        index
                                                    )
                                                "
                                                rounded
                                                text
                                                severity="danger"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #empty>
                                <div
                                    class="flex align-items-center justify-content-center flex-column"
                                >
                                    <i
                                        class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400"
                                    />
                                    <p class="mt-4 mb-0">
                                        Drag and drop files to here to upload.
                                    </p>
                                </div>
                            </template>
                        </FileUpload>
                    </div>
                </div>
                <!--Descriptions-->
                <div class="col-12 lg:col-12 field">
                    <div class="field">
                        <TextAreaFiledVueValidate
                            name="perInfoDescriptions"
                            type="text"
                            label="Descriptions"
                            styleClass="w-auto"
                            :value="personalInfoEmpAssign?.empNoted ?? ''"
                            placeholder="Please enter description"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Personal Informations -->
<script>
// import TextFiledVueValidate from "@/components/vue_validated_components/TextFiledVueValidate";
import TextAreaFiledVueValidate from "@/components/vue_validated_components/TextAreaFiledVueValidate";
import manageResignRequestEmployeeHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageResignRequestEmployeeHelper";
import addNewEmpUserAdminHelper from "@/mixin/admin_user_management/addNewEmpUserAdminHelper.js";
import { Field } from 'vee-validate';
export default {
    components: {
        // TextFiledVueValidate,
        TextAreaFiledVueValidate,
        Field
    },
    props: {
        personalInfoEmp: {
            type: Array,
            required: true,
            default: () => [],
        },
        empEnglishName: {
            type: String,
            required: true,
            default: () => {
                return "";
            },
        },
    },
    computed: {
        personalInfoEmpAssign() {
            const getEmpInfo = this.personalInfoEmp ? this.personalInfoEmp : [];
            return getEmpInfo;
        },
        // empEnglishName(){
        //     const getEmpInfoEnglishName = this.personalInfoEmp?.empEnglishName ? this.personalInfoEmp?.empEnglishName : '';
        //     console.log(getEmpInfoEnglishName, "getEmpInfoEnglishName")
        //     return  getEmpInfoEnglishName ? getEmpInfoEnglishName : '';
        // },
        // empKhmerName(){
        //     const getEmpInfoKhmerName = this.personalInfoEmp?.empKhmerName ? this.personalInfoEmp?.empKhmerName : '';
        //     return getEmpInfoKhmerName ? getEmpInfoKhmerName : '';
        // }
    },
    data() {
        return {
            totalSize: 0,
            totalSizePercent: 0,
            editEnglishNameEmp: "",
        };
    },
    mixins: [manageResignRequestEmployeeHelper, addNewEmpUserAdminHelper],
    validate(value, { target }) {
        console.log(value, target);
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
