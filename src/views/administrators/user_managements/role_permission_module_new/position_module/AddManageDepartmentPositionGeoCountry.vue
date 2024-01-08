<template>
    <KeepAlive>
        <div class="pl-2 gap-2 flex align-items-center justify-content-center">
            <Button
                aria-label="Add Position By Country"
                class="border-round-lg w-2rem h-2rem"
                icon="pi pi-plus"
                outlined
                :loading="loadingPopupCountry"
                @click="showDialogAddDepartment()"
            />
        </div>
    </KeepAlive>
    <!-- Dialog Managements -->
    <Dialog
        v-model:visible="visibleDialogPositionCountry"
        maximizable
        modal
        :style="{ width: '80rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <template #header>
            <div
                class="inline-flex align-items-center justify-content-center gap-2"
            >
                <span class="font-bold white-space-nowrap">
                    Manage Departments
                </span>
            </div>
        </template>
        <!-- Form Submitted -->
        <div
            class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
        >
            <div class="pop-over-content p-20 p-sm-15 card">
                <!-- Departments -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <!-- Add more -->
                        <dialog-add-department-base-geo-fence-country />
                    </div>
                </div>
                <div>
                    <!-- Add Position Multiple Level -->
                    <div class="grid formgrid">
                        <DataTable
                            :value="dataPositionsCountry"
                            tableStyle="min-width: 75rem"
                        >
                            <Column
                                field="code"
                                header="SL"
                                sortable
                                style="width: 25%"
                            ></Column>
                            <Column
                                field="name"
                                header="Positions"
                                sortable
                                style="width: 25%"
                            ></Column>
                            <Column
                                field="category"
                                header="Detail"
                                sortable
                                style="width: 25%"
                            ></Column>
                            <Column
                                headerStyle="width: 15rem; text-align: center; alignment-item:center;"
                                :header="$t('route.action')"
                                bodyStyle="text-align: center; overflow: visible"
                            >
                                <template #body>
                                    <div class="flex flex-wrap gap-2">
                                        <Button
                                            icon="pi pi-pencil"
                                            outlined
                                            rounded
                                            class="mr-2"
                                        />
                                        <Button
                                            icon="pi pi-trash"
                                            outlined
                                            rounded
                                            class="mr-2"
                                        />
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button
                label="Cancel"
                class="w-6rem"
                @click="cancelAddGeoCountry()"
                outlined
            />
            <!-- <Button
                :label="loadingSubmittedAddCountry ? 'Save..' : 'Create'"
                :loading="loadingSubmittedAddCountry"
                icon="pi pi-save"
                severity="danger"
                class="w-8rem"
                @click="submittedAddDepartmentPositionCountry()"
                autofocus
            /> -->
        </template>
    </Dialog>
</template>

<!-- Department JS -->
<script>
import DialogAddDepartmentBaseGeoFenceCountry from "./dialogs_departments_country/DialogAddDepartments.vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";

export default {
    components: {
        DialogAddDepartmentBaseGeoFenceCountry,
    },
    setup() {
        return { v$: useVuelidate() };
    },
    props: {
        projectId: {
            type: Number,
            default: 0,
        },
        geoFenceLocation: {
            type: Number,
            default: 0,
        },
    },
    validations() {
        return {
            departmentNewName: {
                required,
                minLength: minLength(3),
            },
            departmentByCountryOptSelect: {
                required,
            },
        };
    },
    computed: {
        getDeptProjectId() {
            return parseInt(this.projectId) ? parseInt(this.projectId) : 0;
        },
        getDeptCountryId() {
            return parseInt(this.geoFenceLocation)
                ? parseInt(this.geoFenceLocation)
                : 0;
        },
    },
    data() {
        return {
            dataPositionsCountry: [],
            visibleDialogPositionCountry: false,
            loadingPopupCountry: false,
            submitted: false,
            loadingSubmittedAddCountry: false,
            departmentByCountryOptSelect: null,
            getOptDepartmentOfCountry: [],
        };
    },
    created() {},
    methods: {
        cancelAddGeoCountry() {
            this.visibleDialogPositionCountry = false;
        },
        showDialogAddDepartment() {
            this.loadingPopupCountry = true;
            setTimeout(() => {
                this.visibleDialogPositionCountry = true;
                this.loadingPopupCountry = false;
            }, 500);
        },
        submittedAddDepartmentPositionCountry(validate) {
            try {
                this.loadingSubmittedAddCountry = true;
                this.submitted = true;

                setTimeout(() => {
                    this.loadingSubmittedAddCountry = false;
                }, 1000);
                this.v$.$touch();
                if (!validate) {
                    this.$toast.add({
                        severity: "error",
                        summary: "Please Fix Below Errors.",
                        detail: "Please input filed position have missing value!",
                        life: 3000,
                    });
                    return false;
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
    },
};
</script>
