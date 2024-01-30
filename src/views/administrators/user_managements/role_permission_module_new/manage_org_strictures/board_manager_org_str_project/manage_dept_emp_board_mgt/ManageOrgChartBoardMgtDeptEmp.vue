<template>
    <Button
        aria-label="Add Of Department"
        class="border-round-sm w-12rem h-2rem text-sm text-danger"
        outlined
        severity="info"
        label="Manage of Departments"
        @click.prevent="openDialogOrgStructure()"
    />
    <!-- List Org.Structures of board mgt -->
    <Dialog
        v-model:visible="showModalOrgStructures"
        header="Manage Of Departments"
        :style="{ width: '75vw' }"
        modal
        maximizable
        :contentStyle="{ height: '600px' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :draggable="false"
        :pt="{
            mask: {
                style: 'backdrop-filter: blur(2px)',
            },
        }"
    >
        <!-- Table Selected Manage Org-Chart Board Mgt -->
        <div
            class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 card border-round gap-15"
        >
            <!-- Add New Parent Departments => Org-Structure Board Mgt -->
            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <div class="col-12 lg:col-12">
                    <!-- Form Layouts -->
                    <div class="grid formgrid">
                        <!-- Name of Departments -->
                        <div class="col-6 field text-sm">
                            <label
                                for="parent_level_root_level"
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error text-sm':
                                        v$.nameOfDepartmentMgtBoard
                                            .$invalid && submitted,
                                }"
                                class="text-sm"
                            >
                                Department Name
                                <span class="p-error">*</span>
                            </label>
                            <InputText
                                v-model="
                                    v$.nameOfDepartmentMgtBoard.$model
                                "
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v$.nameOfDepartmentMgtBoard
                                            .$invalid && submitted,
                                }"
                                placeholder="Select Parent Departments"
                                class="w-full border-round-lg"
                            />
                            <small
                                v-if="
                                    (v$.nameOfDepartmentMgtBoard
                                        .$invalid &&
                                        submitted) ||
                                    v$.nameOfDepartmentMgtBoard.$pending
                                        .$response
                                "
                                class="p-error"
                            >
                                {{
                                    v$.nameOfDepartmentMgtBoard.required.$message.replace(
                                        "Value",
                                        "Department Name"
                                    )
                                }}
                            </small>
                        </div>
                        <!-- Manager of Employee-->
                        <div class="col-6 field text-sm">
                            <label
                                for="parent_level_root_level"
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v$.selectedOptOrgChartDeptParent
                                            .$invalid && submitted,
                                }"
                            >
                                Parent Department
                                <span class="p-error">*</span>
                            </label>
                            <TreeSelect
                                v-model="
                                    v$.selectedOptOrgChartDeptParent.$model
                                "
                                :options="objTreeSelectOrgStrBoardMgt"
                                :class="{
                                    'p-invalid border-round-lg border-round-lg text-sm p-error':
                                        v$.selectedOptOrgChartDeptParent
                                            .$invalid && submitted,
                                }"
                                placeholder="Select Parent Departments"
                                class="w-full text-sm border-round-lg"
                            />
                            <small
                                v-if="
                                    (v$.selectedOptOrgChartDeptParent
                                        .$invalid &&
                                        submitted) ||
                                    v$.selectedOptOrgChartDeptParent.$pending
                                        .$response
                                "
                                class="p-error"
                            >
                                {{
                                    v$.selectedOptOrgChartDeptParent.required.$message.replace(
                                        "Value",
                                        "Parent Department"
                                    )
                                }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!------------------------- Add New Org.structures of board mgt ------------------------>
        <template #footer>
            <Button
                label="Cancel"
                icon="pi pi-sign-out"
                @click="showModalOrgStructures = false"
                autofocus
                severity="secondary"
            />
            <Button
                :label="loadingSubmittedAddNew ? 'Saving New' : 'Add New'"
                icon="pi pi-send"
                :loading="loadingSubmittedAddNew"
                @click="btnSubmittedAddNewOrgStrMultiLevel(!v$.$invalid)"
                autofocus
            />
        </template>
    </Dialog>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
// Global org-chat-board-mgt
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";

export default {
    setup() {
        return { v$: useVuelidate() };
    },
    validations() {
        return {
            selectedOptOrgChartDeptParent: { required },
            nameOfDepartmentMgtBoard: {required}
        };
    },
    mixins: [manageOrgChartBoardMgtLevelHelper],
    components: {},
    props: {},
    data() {
        return {
            objTreeSelectOrgStrBoardMgt: [],
            filtersGeoProvince: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            showModalOrgStructures: false,
            loadingSubmittedAddNew: false,
            submitted: false,
            // Multi-Level Manage Organization Chart
            selectedOptOrgChartDeptParent: null,
            nameOfDepartmentMgtBoard: ""
        };
    },
    created() {},
    methods: {
        openDialogOrgStructure() {
            this.showModalOrgStructures = true;
        },
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
