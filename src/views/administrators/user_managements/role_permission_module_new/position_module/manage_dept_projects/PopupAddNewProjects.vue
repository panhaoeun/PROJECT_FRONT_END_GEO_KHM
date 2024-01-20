<template>
    <Toast />
    <div class="pl-2 gap-2 flex align-items-right justify-content-end">
        <Button
            aria-label="Add Department By Country"
            class="border-round-lg h-2.1rem"
            icon="pi pi-plus"
            label="Add New Project"
            @click="openDialogAddNewProjectName()"
        />
    </div>
    <!-- Dialog Departments -->
    <Dialog
        v-model:visible="visibleDialogProjectName"
        modal
        :style="{ width: '30rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <template #header>
            <div
                class="inline-flex align-items-center justify-content-center gap-2"
            >
                <span class="font-bold white-space-nowrap"
                    >Add New Department</span
                >
            </div>
        </template>
        <!-- Content Department Add New -->
        <div
            class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
        >
            <div class="pop-over-content p-20 p-sm-15 card">
                <!-- Project Name -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label
                            :class="{
                                'p-invalid border-round-lg border-round-lg p-error':
                                    v$.orgDeptProjectName.$invalid && submitted,
                            }"
                        >
                            Project Name<span class="p-error">*</span>
                        </label>
                        <InputText
                            id="department_name"
                            placeholder="Please Enter New Project Name"
                            :input="v$.orgDeptProjectName.$touch"
                            v-model="v$.orgDeptProjectName.$model"
                            :oninput="v$.orgDeptProjectName.$touch()"
                            :onblur="v$.orgDeptProjectName.$touch()"
                            :class="{
                                'p-invalid border-round-lg p-error':
                                    v$.orgDeptProjectName.$invalid && submitted,
                            }"
                            type="text"
                            class="text-sm border-round-lg"
                        />
                        <small
                            v-if="
                                (v$.orgDeptProjectName.$invalid && submitted) ||
                                v$.orgDeptProjectName.$pending.$response
                            "
                            class="p-error text-sm"
                            >{{
                                v$.orgDeptProjectName.required.$message.replace(
                                    "Value",
                                    "New Project Name"
                                )
                            }}
                        </small>
                    </div>
                </div>
                <!-- Descriptions -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label>Descriptions</label>
                        <Textarea
                            v-model="orgDeptProjectNoted"
                            placeholder="Please enter descriptions"
                            rows="5"
                            cols="30"
                        />
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button
                label="Cancel"
                @click="cancelAddProjectNameOrgStr()"
                outlined
            />
            <Button
                :label="loadingSubmittedAddProject ? 'Save..' : 'Create'"
                :loading="loadingSubmittedAddProject"
                icon="pi pi-save"
                severity="danger"
                class="w-8rem"
                @click="submittedAddNewProjectNameOrgStr()"
                autofocus
            />
        </template>
    </Dialog>
</template>

<!-- Script of Js -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import geoDeptOrgProjects from "@/mixin/manage_geo_org_str/manageProjectNameHelper";
export default {
    data() {
        return {
            orgDeptProjectName: "",
            orgDeptProjectNoted: "",
            visibleDialogProjectName: false,
            loadingSubmittedAddProject: false,
        };
    },
    mixins: [geoDeptOrgProjects],
    validations() {
        return {
            orgDeptProjectName: {
                required,
                minLength: minLength(3),
            },
        };
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    methods: {
        cancelAddProjectNameOrgStr() {
            this.visibleDialogProjectName = false;
        },
        openDialogAddNewProjectName() {
            this.visibleDialogProjectName = true;
        },
    },
};
</script>
