<template>
    <Button
        aria-label="Add Org Structure"
        class="border-round-sm w-11rem h-2rem text-sm text-danger"
        outlined
        label="Manage Org Structure"
        @click.prevent="openDialogOrgStructure()"
    />
    <!-- List Org.Structures of board mgt -->
    <Dialog
        v-model:visible="showModalOrgStructures"
        header="Manage Of Org Structure"
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
            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <div class="col-12 lg:col-12">
                    <!-- Form Layouts -->
                    <div class="grid formgrid">
                        <!-- Stricture Org Level 01-->
                        <div class="col-6 field">
                            <label
                                for="parent_level_root_level"
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v$.selectedOptOrgChartRootLevel
                                            .$invalid && submitted,
                                }"
                            >
                                Parent Level 01 (Root Level)
                                <span class="p-error">*</span>
                            </label>
                            <div class="flex field flex-row">
                                <TreeSelect
                                    v-model="
                                        v$.selectedOptOrgChartRootLevel.$model
                                    "
                                    :options="objTreeSelectOrgStrBoardMgt"
                                    :class="{
                                        'p-invalid border-round-lg border-round-lg p-error':
                                            v$.selectedOptOrgChartRootLevel
                                                .$invalid && submitted,
                                    }"
                                    placeholder="Select Parent Level 01 (Root Level)"
                                    class="w-full border-round-lg"
                                />
                                <!-- Add New Parent(Root Level) Org-Structure Board Mgt -->
                                <add-new-parent-root-org-str-board-mgt/>
                            </div>
                            <small
                                v-if="
                                    (v$.selectedOptOrgChartRootLevel.$invalid &&
                                        submitted) ||
                                    v$.selectedOptOrgChartRootLevel.$pending
                                        .$response
                                "
                                class="p-error"
                            >
                                {{
                                    v$.selectedOptOrgChartRootLevel.required.$message.replace(
                                        "Value",
                                        "Parent Level 01 (Root Level)"
                                    )
                                }}
                            </small>
                        </div>
                        <!-- Stricture Org Level 02-->
                        <div class="col-6 field">
                            <label for="name_en">
                                Structure Level 02
                                <span class="p-error">*</span>
                            </label>
                            <div class="flex field flex-row">
                                <TreeSelect
                                    v-model="selectedOptOrgChartRootLevel"
                                    :options="objTreeSelectOrgStrBoardMgt"
                                    placeholder="Select Structure Level 02"
                                    class="w-full border-round-lg"
                                />
                                <!-- Add New Level 02 -->
                                <add-new-global-org-str-board-mgt />
                            </div>
                        </div>
                        <!-- Stricture Org Level 03-->
                        <div class="col-6 field">
                            <label for="name_en">
                                Structure Level 03
                                <span class="p-error">*</span>
                            </label>
                            <div class="flex field flex-row">
                                <TreeSelect
                                    v-model="selectedOptOrgChartRootLevel"
                                    :options="objTreeSelectOrgStrBoardMgt"
                                    placeholder="Select Structure Level 03"
                                    class="w-full border-round-lg"
                                />
                                <!-- Add New Level 03 -->
                                <add-new-global-org-str-board-mgt />
                            </div>
                        </div>
                        <!-- Stricture Org Level 04-->
                        <div class="col-6 field">
                            <label for="name_en">
                                Structure Level 04
                                <span class="p-error">*</span>
                            </label>
                            <div class="flex field flex-row">
                                <TreeSelect
                                    v-model="selectedOptOrgChartRootLevel"
                                    :options="objTreeSelectOrgStrBoardMgt"
                                    placeholder="Select Structure Level 04"
                                    class="w-full border-round-lg"
                                />
                                <!-- Add New Level 04 -->
                                <add-new-global-org-str-board-mgt />
                            </div>
                        </div>
                        <!-- Stricture Org Level 05-->
                        <div class="col-6 field">
                            <label for="name_en">
                                Structure Level 05
                                <span class="p-error">*</span>
                            </label>
                            <div class="flex field flex-row">
                                <TreeSelect
                                    v-model="selectedOptOrgChartRootLevel"
                                    :options="objTreeSelectOrgStrBoardMgt"
                                    placeholder="Select Structure Level 05"
                                    class="w-full border-round-lg"
                                />
                                <!-- Add New Level 02-->
                                <add-new-global-org-str-board-mgt />
                            </div>
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
                :label="
                    loadingSubmittedAddNew
                        ? 'Saving New Org.Structure'
                        : 'Add New Org.Structure'
                "
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
import AddNewGlobalOrgStrBoardMgt from "./AddNewGlobalOrgStrBoardMgt";
import AddNewParentRootOrgStrBoardMgt from "./ManageParentRootOrgStrBoardMgt";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";

export default {
    setup() {
        return { v$: useVuelidate() };
    },
    validations() {
        return {
            selectedOptOrgChartRootLevel: { required },
        };
    },
    mixins: [manageOrgChartBoardMgtLevelHelper],
    components: {
        AddNewGlobalOrgStrBoardMgt,
        AddNewParentRootOrgStrBoardMgt,
    },
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
            selectedOptOrgChartRootLevel: null,
        };
    },
    created() {},
    methods: {
        openDialogOrgStructure() {
            this.showModalOrgStructures = true;
        }
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
