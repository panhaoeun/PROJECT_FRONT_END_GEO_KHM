<template>
    <Button
        aria-label="Add Org Structure"
        class="border-round-sm w-13rem h-2.5rem text-sm text-danger"
        outlined
        label="Manage Org Structure"
        @click.prevent="openDialogOrgStructure()"
        icon="pi pi-sitemap"
    />
    <!-- List Org.Structures of board mgt -->
    <Dialog
        v-model:visible="showModalOrgStructures"
        header="Manage Of Org Structures"
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
                                <Dropdown
                                    filter
                                    showClear
                                    dataKey="orgStrId"
                                    clear
                                    @click.passive="
                                        openReloadDeptOrgStrMgtBoardRootLevel()
                                    "
                                    v-model="
                                        v$.selectedOptOrgChartRootLevel.$model
                                    "
                                    :options="getAllDeptOrgStrMgtOrg"
                                    :class="{
                                        'p-invalid border-round-lg border-round-lg p-error':
                                            v$.selectedOptOrgChartRootLevel
                                                .$invalid && submitted,
                                    }"
                                    placeholder="Select Parent Level 01 (Root Level)"
                                    class="w-full border-round-lg"
                                >
                                    <template #value="slotProps">
                                        <div
                                            v-if="slotProps.value"
                                            class="flex align-items-center"
                                        >
                                            <div>
                                                {{
                                                    slotProps.value
                                                        ?.orgStrDeptName
                                                }}
                                            </div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div>
                                                {{
                                                    slotProps.option
                                                        ?.orgStrDeptName
                                                }}
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <!-- Add New Parent(Root Level) Org-Structure Board Mgt -->
                                <add-new-parent-root-org-str-board-mgt
                                    :projectIdOrgRoot="
                                        getProjectId ? getProjectId : 0
                                    "
                                />
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
                                <Dropdown
                                    filter
                                    showClear
                                    dataKey="orgStrId"
                                    clear
                                    @click.prevent="
                                        openDataSecondLevelSelectedParentLevel()
                                    "
                                    v-model="selectedOptOrgChartSecondLevel"
                                    :options="getAllDeptOrgStrBoardSecondLevel"
                                    placeholder="Select Structure Level 02"
                                    class="w-full border-round-lg"
                                >
                                    <template #value="slotProps">
                                        <div
                                            v-if="slotProps.value"
                                            class="flex align-items-center"
                                        >
                                            <div>
                                                {{
                                                    slotProps.value
                                                        ?.orgStrDeptName
                                                }}
                                            </div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div>
                                                {{
                                                    slotProps.option
                                                        ?.orgStrDeptName
                                                }}
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <!-- Add New Level 02 -->
                                <add-new-global-org-str-board-mgt-second-level
                                    :secondBoardMgtLevelProId="
                                        getProjectId ? getProjectId : 0
                                    "
                                    :secondBoardMgtLevelParentLevelId="
                                        getParentLevelOrgStructure
                                            ? getParentLevelOrgStructure
                                            : 0
                                    "
                                />
                            </div>
                        </div>
                        <!-- Stricture Org Level 03-->
                        <div class="col-6 field">
                            <label for="name_en">
                                Structure Level 03
                                <span class="p-error">*</span>
                            </label>
                            <div class="flex field flex-row">
                                <Dropdown
                                    filter
                                    showClear
                                    dataKey="orgStrId"
                                    clear
                                    @click.prevent="
                                        openDataThirdLevelSelectedSecondLevel()
                                    "
                                    v-model="selectedOptOrgChartThirdLevel"
                                    :options="getAllDeptOrgStrBoardThirdLevel"
                                    placeholder="Select Structure Level 03"
                                    class="w-full border-round-lg"
                                >
                                    <template #value="slotProps">
                                        <div
                                            v-if="slotProps.value"
                                            class="flex align-items-center"
                                        >
                                            <div>
                                                {{
                                                    slotProps.value
                                                        ?.orgStrDeptName
                                                }}
                                            </div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div>
                                                {{
                                                    slotProps.option
                                                        ?.orgStrDeptName
                                                }}
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <!-- Add New Level 03 -->
                                <add-new-global-org-str-board-mgt-third-level
                                    :secondBoardMgtLevelProId="
                                        getProjectId ? getProjectId : 0
                                    "
                                    :secondBoardMgtLevelThirdLevelId="
                                        getSecondLevelOrgStructure
                                            ? getSecondLevelOrgStructure
                                            : 0
                                    "
                                />
                            </div>
                        </div>
                        <!-- Stricture Org Level 04-->
                        <div class="col-6 field">
                            <label for="name_en">
                                Structure Level 04
                                <span class="p-error">*</span>
                            </label>
                            <div class="flex field flex-row">
                                <Dropdown
                                    filter
                                    showClear
                                    dataKey="orgStrId"
                                    clear
                                    v-model="selectedOptOrgChartFourthLevel"
                                    :options="getAllDeptOrgStrBoardFourLevel"
                                    placeholder="Select Structure Level 04"
                                    class="w-full border-round-lg"
                                >
                                    <template #value="slotProps">
                                        <div
                                            v-if="slotProps.value"
                                            class="flex align-items-center"
                                        >
                                            <div>
                                                {{
                                                    slotProps.value
                                                        ?.orgStrDeptName
                                                }}
                                            </div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div>
                                                {{
                                                    slotProps.option
                                                        ?.orgStrDeptName
                                                }}
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <!-- Add New Level 04 -->
                                <add-new-global-org-str-board-mgt-forth-level
                                    :secondBoardMgtLevelProId="
                                        getProjectId ? getProjectId : 0
                                    "
                                    :secondBoardMgtLevelFourthLevelId="
                                        getThirdLevelOrgStructure
                                            ? getThirdLevelOrgStructure
                                            : 0
                                    "
                                />
                            </div>
                        </div>
                        <!-- Stricture Org Level 05-->
                        <div class="col-6 field">
                            <label for="name_en">
                                Structure Level 05
                                <span class="p-error">*</span>
                            </label>
                            <div class="flex field flex-row">
                                <Dropdown
                                    filter
                                    showClear
                                    dataKey="orgStrId"
                                    clear
                                    v-model="selectedOptOrgChartFiveLevel"
                                    :options="getAllDeptOrgStrBoardFiveLevel"
                                    placeholder="Select Structure Level 05"
                                    class="w-full border-round-lg"
                                >
                                    <template #value="slotProps">
                                        <div
                                            v-if="slotProps.value"
                                            class="flex align-items-center"
                                        >
                                            <div>
                                                {{
                                                    slotProps.value
                                                        ?.orgStrDeptName
                                                }}
                                            </div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div>
                                                {{
                                                    slotProps.option
                                                        ?.orgStrDeptName
                                                }}
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                                <!-- Add New Level 05-->
                                <add-new-global-org-str-board-mgt-five-level
                                    :secondBoardMgtLevelProId="
                                        getProjectId ? getProjectId : 0
                                    "
                                    :secondBoardMgtLevelFiveLevelId="
                                        getFourthLevelOrgStructure
                                            ? getFourthLevelOrgStructure
                                            : 0
                                    "
                                />
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

<!--Script of Manage chart board manager-->
<script>
import { FilterMatchMode } from "primevue/api";
// Global org-chat-board-mgt
import AddNewParentRootOrgStrBoardMgt from "./ManageParentRootOrgStrBoardMgt";
import AddNewGlobalOrgStrBoardMgtSecondLevel from "./AddNewGlobalOrgStrBoardMgtSecondLevel";
import AddNewGlobalOrgStrBoardMgtThirdLevel from "./AddNewGlobalOrgStrBoardMgtThirdLevel";
import AddNewGlobalOrgStrBoardMgtForthLevel from "./AddNewGlobalOrgStrBoardMgtFourthLevel";
import AddNewGlobalOrgStrBoardMgtFiveLevel from "./AddNewGlobalOrgStrBoardMgtFiveLevel";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";
import manageGlobalOrgChartMgt from "@/mixin/manage_geo_org_str/manageGlobalOrgChartStructure";

export default {
    name: "ManageOrgChart",
    setup() {
        return { v$: useVuelidate() };
    },
    props: {
        manageRootProjectId: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    validations() {
        return {
            selectedOptOrgChartRootLevel: { required },
        };
    },
    mixins: [manageOrgChartBoardMgtLevelHelper, manageGlobalOrgChartMgt],
    components: {
        AddNewGlobalOrgStrBoardMgtSecondLevel,
        AddNewParentRootOrgStrBoardMgt,
        AddNewGlobalOrgStrBoardMgtThirdLevel,
        AddNewGlobalOrgStrBoardMgtForthLevel,
        AddNewGlobalOrgStrBoardMgtFiveLevel,
    },
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
            selectedOptOrgChartSecondLevel: null,
            selectedOptOrgChartThirdLevel: null,
            selectedOptOrgChartFourthLevel: null,
            selectedOptOrgChartFiveLevel: null,
        };
    },
    methods: {
        openDialogOrgStructure() {
            this.showModalOrgStructures = true;
        },
    },
};
</script>
