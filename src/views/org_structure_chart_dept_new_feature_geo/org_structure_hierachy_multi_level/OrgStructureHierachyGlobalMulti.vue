<template>
    <Toast />
    <!-- Dialogs Confirm Deleted OrgStructures-->
    <Dialog
        v-model:visible="isOpenDialogEditRemoveOrgStr"
        :style="{ width: '600px' }"
        class="text-sm"
        :header="'Confirm Org Chart Structures' + '\n' + orgDeptName"
        :modal="true"
    >
        <div class="confirmation-content flex flex-row">
            <i class="pi pi-exclamation-triangle" style="font-size: 2rem" />
            <span>Are you sure you want to delete org-strictures</span>
        </div>
        <template #footer>
            <Button
                label="No"
                icon="pi pi-times"
                text
                @click="isOpenDialogEditRemoveOrgStr = false"
            />
            <Button
                :label="loadingOrgStructuresRemoved ? 'Loading...' : 'Remove'"
                icon="pi pi-check"
                text
                :loading="loadingOrgStructuresRemoved"
                @click.prevent="deletedOrgChartStructuresGlobal()"
            />
        </template>
    </Dialog>
    <div class="orgchart-container card overflow-x-auto">
        <!-- Dialogs of View Org-Structures -->
        <ViewDetailListEmpGlobalOrg
            v-if="isOpenDialogViewEmpOrg"
            @close="closeViewEmpOrgDialogs"
            :empOrgStrDataId="idOrgStructures ? idOrgStructures : 0"
            :departmentOrgName="orgDeptName ? orgDeptName : ''"
        />
        <!-- Dialogs of View Assign Manager -->
        <EditAssignEmpManagerGlobalOrg
            v-if="isOpenDialogEditAssignEmpOrg"
            @close="closeAssignEmpOrgStructureData"
            :assignEmployeeData="orgNodeData ? orgNodeData : {}"
            :departmentOrgName="orgDeptName ? orgDeptName : ''"
        />
        <!-- Dialogs of View Assign Employee -->
        <OpenEditOrgStructureName
            v-if="isOpenEditOrgStrData"
            @close="closeEditOrgStrData"
            :orgStrDataTree="orgTreeData ? orgTreeData : {}"
            :edit-org-str-dept-name="orgNodeData ? orgNodeData : {}"
        />
        <!-- Dialogs of view edit org-structure name  -->
        <OpenGlobalAssignDescription
            v-if="isOpenAssignDesOrgStr"
            @close="closeOrgStrAssignData"
            :editOrgStrDeptName="orgNodeData ? orgNodeData : {}"
            :orgAssignDesStructureId="idOrgStructures ? idOrgStructures : 0"
            @on-click-assign-description="onOnClickAssignDescription"
        />
        <!-- Dialogs of add new node org-structures-->
        <open-dialog-add-node-org-structures
            v-if="isOpenDialogsAddNode"
            :tree-org-structure-data="orgNodeData ? orgNodeData : {}"
            :dialog="isOpenDialogsAddNode"
            :orgDeptKey="keyOrgNodeStructure ? keyOrgNodeStructure : {}"
            @close-dialog="closeDialogAddNodeOrgStructures"
        />
        <!-- =======Management Dialogs Position========= -->
        <OpenDialogAddNewPositionOrgDept
            v-if="dialogDeptLogAddPosition"
            @close="closedDialogAddNewPosition"
            :editOrgStrDeptName="orgNodeData ? orgNodeData : {}"
            :department-org-name="orgDeptName"
            :orgStrDeptPosId="idOrgStructures ? idOrgStructures : 0"
        />
        <!-- List Position -->
        <AssignListAllPositionDeptOrg
            v-if="dialogDeptOrgDeptListPos"
            @close="closeDialogsListPositionDeptOrg"
            :editOrgStrDeptName="orgNodeData ? orgNodeData : {}"
            :department-org-name="orgDeptName"
            :orgAssignDesStructureId="idOrgStructures ? idOrgStructures : 0"
        />
        <!-- Job Dep. Position -->
        <OpenAssignDeptJobPositionDescription
            v-if="dialogDeptPosJobDes"
            @close="closeDialogDeptJobDes"
            :editOrgStrDeptName="orgNodeData ? orgNodeData : {}"
            :department-org-name="orgDeptName"
            :orgAssignDesStructureId="idOrgStructures ? idOrgStructures : 0"
        />
        <!-- Popup Position Job Dept Employee Assign -->
        <GlobalAddListEmployeeOfMainOrg
            v-if="openDialogEmpOrgAssignOfficer"
            :orgAssignId="idOrgStructures ? idOrgStructures : 0"
            @close="closeDialogEmpOrgAssignOfficer"
            :dialog-change-position="openDialogEmpOrgAssignOfficer"
            :departmentName="orgDeptName ? orgDeptName : ''"
        />
        <!-- Popup Assign History to Officer -->
        <OpenDialogHistoryOfficerOrgStr
            v-if="openDialogHistoryOfficer"
            :orgAssignId="idOrgStructures ? idOrgStructures : 0"
            @close="closeDialogHistoryOfficer"
            :departmentOrgName="orgDeptName ? orgDeptName : ''"
        />

        <!--Popup resign form request by employee -->
        <ResignationRequestFormAddEmployee
            :dialog-resign-form="openDialogResignRequestAdd"
            :orgAssignId="idOrgStructures ? idOrgStructures : 0"
            :departmentName="orgDeptName ? orgDeptName : ''"
            @close-dialog="closeDialogFormResignAddRequest()"
        />
        <!-- Popup Change Position  -->
        <EmployeeChangePositionForm
            :orgAssignId="idOrgStructures ? idOrgStructures : 0"
            :departmentName="orgDeptName ? orgDeptName : ''"
            :dialog-change-position-form="openDialogChangePositionEmp"
            @close-dialog="closeDialogChangePosition()"
        />
        <!-- Popup Resign Employee -->
        <ListResignJobRequestEmployee
            v-if="openDialogListResign"
            :orgAssignId="idOrgStructures ? idOrgStructures : 0"
            :departmentName="orgDeptName ? orgDeptName : ''"
            :dialog-change-position-form="openDialogChangePositionEmp"
            @close="closeDialogEmployeeResignOfficer()"
        />
        <!-- =======Management Dialogs Position========= -->
        <!-- Context Menu Of Organization Chart-Hierarchy Global -->
        <Sidebar
            v-model:visible="isOpenDialogDrawer"
            position="right"
            :style="{ width: '30rem' }"
        >
            <!--  Action Buttons -->
            <div class="overflow-y-auto">
                <!-- Header Org-Structures -->
                <div>
                    <div
                        class="flex w-full justify-content-around flex-wrap text-center gap-10"
                    >
                        <h6
                            class="font-bold text-md flex text-sm flex-column align-items-center gap-10 justify-content-center"
                        >
                            <span
                                class="font-global-moul-18"
                                v-if="
                                    orgDeptNameKh !== null ||
                                    orgDeptNameKh !== ''
                                "
                                >ការគ្រប់គ្រងរចនាសម្ព័ន្ធរបស់
                                <label
                                    class="text-pink-500 font-global-moul-18 text-md"
                                >
                                    {{ orgDeptNameKh }}</label
                                ></span
                            >
                            <span class="text-sm" v-if="orgDeptNameKh !== null"
                                >Org. Structure Management:
                                <label class="text-pink-500">
                                    {{ orgDeptName }}</label
                                ></span
                            >
                            <span
                                class="font-global-moul-18"
                                v-if="
                                    orgDeptNameKh == null || orgDeptNameKh == ''
                                "
                                >Org. Structure Management:
                                <label
                                    class="text-pink-500 font-global-moul-18 text-md"
                                >
                                    {{ orgDeptName }}</label
                                ></span
                            >
                        </h6>

                        <div
                            class="border-bottom-2 border-600 border-dashed border-primary-500 surface-overlay font-bold w-full surface-overlay font-bold flex align-items-center justify-content-center border-none surface-border"
                        ></div>
                    </div>
                </div>
                <!-- List FUnctions -->
                <ul class="list-none p-3 gap-10 m-0">
                    <!--=========== Department Information =========-->
                    <li>
                        <a
                            v-ripple
                            @click.prevent="
                                openAddNewNodeOrgStructuresHierarchy
                            "
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-sitemap mr-2"></i>
                            <span class="font-medium">Add New Department</span>
                        </a>
                    </li>
                    <li>
                        <a
                            v-ripple
                            @click.prevent="openEditOrgStructureData"
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-file-edit mr-2"></i>
                            <span class="font-medium">Edit Department</span>
                        </a>
                    </li>
                    <li>
                        <a
                            v-ripple
                            @click.prevent="openAssignOrgStructureDescription"
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-cog mr-2"></i>
                            <span class="font-medium"
                                >Manage Dept. Job Description</span
                            >
                        </a>
                    </li>
                    <li>
                        <a
                            @click.prevent="openAssignDeptEmpOrgStructure"
                            v-ripple
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-briefcase mr-2"></i>
                            <span class="font-medium">Assign Manager</span>
                        </a>
                    </li>
                    <li>
                        <a
                            v-ripple
                            @click.prevent="openRemoveOrgStrBaseId"
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-trash mr-2"></i>
                            <span class="font-medium">Remove</span>
                        </a>
                    </li>
                    <hr />
                    <!--=========== Positions ============-->
                    <li>
                        <a
                            @click.prevent="openDialogsAddNewPositionDept"
                            v-ripple
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-shopping-bag mr-2"></i>
                            <span class="font-medium">Add New Position</span>
                        </a>
                    </li>
                    <li>
                        <a
                            @click.prevent="openDialogListPositionDeptOrg"
                            v-ripple
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-list mr-2"></i>
                            <span class="font-medium">List Position</span>
                        </a>
                    </li>
                    <!-- <li>
                        <a
                            @click.prevent="openAssignPositionOfficerDialog"
                            v-ripple
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-trash mr-2"></i>
                            <span class="font-medium">Remove Position</span>
                        </a>
                    </li> -->
                    <li>
                        <a
                            @click.prevent="openManageDeptPositionJobDesDialog"
                            v-ripple
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-database mr-2"></i>
                            <span class="font-medium"
                                >Manage Dept. Position Job Descriptions</span
                            >
                        </a>
                    </li>

                    <!--============= Human Resources ============-->
                    <hr />
                    <li>
                        <a
                            v-ripple
                            @click.prevent="openViewEmployeeListBaseOrg"
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-users mr-2"></i>
                            <span class="font-medium"
                                >List of Human Resources</span
                            >
                        </a>
                    </li>
                    <li>
                        <a
                            v-ripple
                            @click.prevent="openAssignPositionOfficerDialog"
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-clone mr-2"></i>
                            <span class="font-medium"
                                >Assign Position to Officer</span
                            >
                        </a>
                    </li>
                    <li>
                        <a
                            v-ripple
                            @click.prevent="openDialogChangePositionToOfficer()"
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-sync mr-2"></i>
                            <span class="font-medium">Exchange Position</span>
                        </a>
                    </li>
                    <li>
                        <a
                            v-ripple
                            @click.prevent="openDialogResignFormRequest()"  
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-eject mr-2"></i>
                            <span class="font-medium">Resign Officer</span>
                        </a>
                    </li>
                    <li>
                        <a
                            v-ripple
                            @click.prevent="openDialogEmployeeResignOfficer()"
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-folder-open mr-2"></i>
                            <span class="font-medium"
                                >List of Resign Officer</span
                            >
                        </a>
                    </li>

                    <li>
                        <a
                            v-ripple
                            @click.prevent="
                                openViewHistoryOfficerEmployeeListBaseOrg
                            "
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-history mr-2"></i>
                            <span class="font-medium"
                                >List of Historical Officer</span
                            >
                        </a>
                    </li>
                </ul>
            </div>
        </Sidebar>
        <!--=========== Organization Chart-Hierarchy Global ========-->
        <div
            v-if="
                orgTreeData !== null &&
                Array.isArray(orgTreeData) &&
                orgTreeData.length
            "
        >
            <div class="my-2 px-2 py-2">
                <!-- <div class="my-4">
                    <h1
                        class="my-2 justify-content-center text-center flex flex-column font-global-moul-01 font-bold"
                    >
                        Organizations Chart Structures Of
                        {{ "\n" + String(departmentName).toString("No Name") }}
                    </h1>
                </div> -->
                <!-- Org-Chart Structured -->
                <OrganizationChart
                    v-model:selectionKeys="selectionKeyOrg"
                    :value="getConvertDataObj"
                    collapsible
                    expanded
                    selectionMode="single"
                    @node-select="onSelectedNodeChange"
                    styleClass="bg-teal-100 text-white border-round-xl align-items-center justify-content-center"
                >
                    <template #default="slotProps">
                        <div class="flex flex-column">
                            <!-- More Detail Updated -->
                            <div
                                class="flex font-global-khmer flex-column align-items-center w-full lg:w-12rem xl:w-12rem white-space-normal overflow-hidden"
                            >
                                <!-- Employee Profile -->
                                <img
                                    v-if="
                                        slotProps.node.empOrgStrProfile !==
                                            null &&
                                        slotProps.node.empOrgStrProfile !== ''
                                    "
                                    :alt="slotProps?.node.empName"
                                    class="p-avatar p-component p-avatar-circle h-4rem w-4rem p-avatar-xl mr-2"
                                    :src="
                                        imageURLEmpOrgStructures(
                                            slotProps.node?.empOrgStrProfile
                                        )
                                    "
                                    @error="pictureLoadingError"
                                />
                                <Avatar
                                    :label="
                                        extendedSplit(slotProps?.node.label)
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
                                <div
                                    class="flex flex-column align-items-center white-space-nowrap overflow-hidden my-2 text-overflow-ellipsis"
                                >
                                    <span
                                        class="font-bold mb-2 white-space-nowrap overflow-hidden text-overflow-ellipsis font-global-khmer"
                                        >{{
                                            slotProps.node.empName ?? ""
                                        }}</span
                                    >
                                    <!-- Org  Structure Data -->
                                    <span
                                        class="white-space-normal flex flex-row line-height-3 flex font-bold"
                                        >{{
                                            slotProps.node.departmentKH ??
                                            "មិនទាន់មានឈ្មោះផ្នែក"
                                        }}</span
                                    >
                                    <span
                                        class="white-space-normal flex flex-row line-height-3 flex"
                                        >{{
                                            slotProps.node.department ??
                                            "No Name"
                                        }}</span
                                    >
                                </div>
                            </div>
                            <!-- Icons More  and Edit are not included in free license -->
                            <div
                                class="align-items-end justify-content-end text-right"
                            >
                                <i
                                    class="pi pi-ellipsis-h"
                                    style="font-size: 1.3rem"
                                ></i>
                            </div>
                        </div>
                    </template>
                </OrganizationChart>
            </div>
        </div>
        <!-- No OrgChart Hierarchy Multiple-->
        <div v-else>
            <div class="my-2 px-2 py-2">
                <div
                    class="my-2 justify-content-center text-center flex flex-column font-global-moul-01"
                >
                    <h1 class="font-bold font-global-moul-01">
                        មិនមាននៃគំនូសតាងរចនាសម្ព័ន្ធ
                    </h1>
                    <h5 class="font-global-moul-01">
                        Not Found Org Chart Structure
                    </h5>
                    <small
                        >Please select company or nation congress structures for
                        view org-structures</small
                    >
                </div>
                <!-- OrgChart -->
                <OrganizationChart :value="dataOrgStr" collapsible>
                    <template #person="slotProps">
                        <div class="flex flex-column">
                            <div class="flex flex-column align-items-center">
                                <img
                                    :alt="slotProps.node.data.name"
                                    :src="slotProps.node.data.image"
                                    class="mb-3 w-3rem h-3rem"
                                />
                                <span class="font-bold mb-2 text-black">{{
                                    slotProps.node.data.name
                                }}</span>
                                <span class="text-black">{{
                                    slotProps.node.data.title
                                }}</span>
                            </div>
                        </div>
                    </template>
                    <template #default="slotProps">
                        <span class="text-black">{{
                            slotProps.node.label
                        }}</span>
                    </template>
                </OrganizationChart>
            </div>
        </div>
        <!--=========== Organization Chart-Hierarchy Global ========-->
    </div>
</template>

<!-- Org-Structure Hierarchy Global Levels-->
<script>
import Sidebar from "primevue/sidebar";
import ViewDetailListEmpGlobalOrg from "./assign_org_str_hierarchy/GlobalAddListEmployeeOfMainOrg.vue";
import EditAssignEmpManagerGlobalOrg from "./assign_org_str_hierarchy/GlobalEditedAssignEmployeeOfMainOrg";
import OpenEditOrgStructureName from "./assign_org_str_hierarchy/GlobalEditOrgStrName";
import OpenGlobalAssignDescription from "./assign_org_str_hierarchy/OpenGlobalAssignDescription";
import OpenDialogAddNodeOrgStructures from "./assign_org_str_hierarchy/AddNodeOrgStrHierarchyGlobal";

import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
import manageOrgDeptPositionStructuresHelper from "@/mixin/manage_org_structure_dept_new_features/manage_org_job_dept_pos_des_feature/manage_assign_position_dept_org/manageAssignPositionDeptOrgHelper";

// Features fo position
import OpenDialogAddNewPositionOrgDept from "./assign_org_dept_positions/AddAssignOrgDeptPosition.vue";
import OpenAssignDeptJobPositionDescription from "./assign_org_dept_positions/AssignJobPositionDesDeptOrg.vue";
import AssignListAllPositionDeptOrg from "./assign_org_dept_positions/AssignListAllPositionDeptOrg";
import GlobalAddListEmployeeOfMainOrg from "./assign_employee_dept_pos/GlobalAssignEmpDeptAddNewGeoOrg.vue";
import OpenDialogHistoryOfficerOrgStr from "./assign_history_officer_dept_org/GlobalListAssignHistoryOfficerOrgEmp.vue";
import ResignationRequestFormAddEmployee from "./resignation_request_employee/ResignAddFormEmployeeRequest";
import EmployeeChangePositionForm from "./change_position_officer_employee/ChangePositionOfficerEmployee";
import ListResignJobRequestEmployee from "./resignation_request_employee/GlobalListResignRequestEmployee.vue";

export default {
    components: {
        Sidebar,
        ViewDetailListEmpGlobalOrg,
        EditAssignEmpManagerGlobalOrg,
        OpenEditOrgStructureName,
        OpenGlobalAssignDescription,
        OpenDialogAddNodeOrgStructures,
        // Positions of the assign
        OpenDialogAddNewPositionOrgDept,
        OpenAssignDeptJobPositionDescription,
        AssignListAllPositionDeptOrg,
        GlobalAddListEmployeeOfMainOrg,
        OpenDialogHistoryOfficerOrgStr,
        ResignationRequestFormAddEmployee,
        EmployeeChangePositionForm,
        ListResignJobRequestEmployee,
    },
    mixins: [
        manageOrgStructureDeptNewFeatures,
        manageOrgDeptPositionStructuresHelper,
    ],
    created() {},
    props: {
        orgTreeData: {
            type: Object,
            required: true,
            default: () => {},
        },
        departmentName: {
            type: String,
            required: true,
            default: () => "No Department",
        },
    },
    computed: {
        getConvertDataObj() {
            let object = {};
            this.orgTreeData.forEach((item) => {
                object = Object.assign({}, item ? item : {});
            });
            if (!object) {
                return {};
            }
            return object;
        },
    },
    data() {
        return {
            backupSrc: require("@/assets/img/avatars/not_profile.png"),
            ENV_HOST_PATH_FILE: process.env.VUE_APP_PATH_FILE.replace(
                "https",
                "http"
            ),
            selectionKeyOrg: null,
            isOpenDialogDrawer: false,
            orgDeptName: "",
            idOrgStructures: 0,
            isOpenDialogViewEmpOrg: false,
            isOpenDialogEditAssignEmpOrg: false,
            isOpenEditOrgStrData: false,
            isOpenDialogEditRemoveOrgStr: false,
            isOpenAssignDesOrgStr: false,
            isOpenDialogsAddNode: false,
            openDialogHistoryOfficer: false,
            keyOrgNodeStructure: null,
            orgDeptNameKh: null,
            dialogDeptLogAddPosition: false,
            dialogDeptPosJobDes: false,
            dialogDeptOrgDeptListPos: false,
            envFilePath: process.env.VUE_APP_PATH_FILE.replace("https", "http"),
            openDialogEmpOrgAssignOfficer: false,
            openDialogResignRequestAdd: false,
            openDialogListResign: false,
            openDialogChangePositionEmp: false,
            dataOrgStr: {
                key: "0",
                type: "person",
                styleClass: "bg-indigo-100 text-white border-round-xl",
                data: {
                    image: "https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png",
                    name: "Panha Laosou",
                    title: "CEO",
                },
                children: [
                    {
                        key: "0_0",
                        type: "person",
                        styleClass: "bg-purple-100 text-white border-round-xl",
                        data: {
                            image: "https://primefaces.org/cdn/primevue/images/avatar/annafali.png",
                            name: "Anna Fali",
                            title: "CMO",
                        },
                        children: [
                            {
                                label: "Sales",
                                styleClass:
                                    "bg-purple-100 text-white border-round-xl",
                            },
                            {
                                label: "Marketing",
                                styleClass:
                                    "bg-purple-100 text-white border-round-xl",
                            },
                        ],
                    },
                    {
                        key: "0_1",
                        type: "person",
                        styleClass: "bg-teal-100 text-white border-round-xl",
                        data: {
                            image: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
                            name: "Amy Elsner",
                            title: "CTO",
                        },
                        children: [
                            {
                                label: "Development",
                                styleClass:
                                    "bg-teal-100 text-white border-round-xl",
                            },
                            {
                                label: "UI/UX Design",
                                styleClass:
                                    "bg-teal-100 text-white border-round-xl",
                            },
                        ],
                    },
                ],
            },
            loadingOrgStructuresRemoved: false,
            didLoad: false,
            orgNodeData: [],
        };
    },
    methods: {
        imageURLEmpOrgStructures(path) {
            return (
                this.ENV_HOST_PATH_FILE +
                `uploads/user_profile/admin_staff/` +
                path
            );
        },
        extendedSplit(str) {
            let splitFirstChart;
            if (typeof str !== "undefined") {
                splitFirstChart = String(str)
                    .split(/\s/)
                    .reduce(
                        (response, word) => (response += word.slice(0, 1)),
                        ""
                    )
                    .toUpperCase();
                return splitFirstChart;
            }
            return "ORG";
        },
        onSelectedNodeChange(nodeData) {
            this.isOpenDialogDrawer = true;
            this.orgDeptName = String(nodeData?.department).toString();
            this.orgDeptNameKh = String(nodeData?.departmentKH).toString();
            this.idOrgStructures = parseInt(nodeData?.id) ?? 0;
            this.keyOrgNodeStructure = String(nodeData?.key).toString() ?? null;
            this.orgNodeData = nodeData ? nodeData : [];
            this.$emit("node-click", nodeData);
        },
        onOnClickAssignDescription() {
            console.log(this.orgNodeData);
        },
        // Open Dialogs Hierarchy for global multi
        closeViewEmpOrgDialogs() {
            this.isOpenDialogViewEmpOrg = false;
        },
        closeAssignEmpOrgStructureData() {
            this.isOpenDialogEditAssignEmpOrg = false;
        },
        closeEditOrgStrData() {
            this.isOpenEditOrgStrData = false;
        },
        closeOrgStrAssignData() {
            this.isOpenAssignDesOrgStr = false;
        },
        openEditOrgStructureData() {
            this.isOpenEditOrgStrData = true;
            this.isOpenDialogDrawer = false;
        },
        openViewEmployeeListBaseOrg() {
            this.isOpenDialogDrawer = false;
            this.isOpenDialogViewEmpOrg = true;
        },
        openAssignDeptEmpOrgStructure() {
            this.isOpenDialogEditAssignEmpOrg = true;
            this.isOpenDialogDrawer = false;
        },
        openRemoveOrgStrBaseId() {
            this.isOpenDialogEditRemoveOrgStr = true;
            this.isOpenDialogDrawer = false;
        },
        openAssignOrgStructureDescription() {
            this.isOpenAssignDesOrgStr = true;
            this.isOpenDialogDrawer = false;
        },
        // Positions
        openDialogsAddNewPositionDept() {
            this.dialogDeptLogAddPosition = true;
            this.isOpenDialogDrawer = false;
        },
        closedDialogAddNewPosition() {
            this.dialogDeptLogAddPosition = false;
        },
        openManageDeptPositionJobDesDialog() {
            this.dialogDeptPosJobDes = true;
            this.isOpenDialogDrawer = false;
        },
        closeDialogDeptJobDes() {
            this.dialogDeptPosJobDes = false;
        },
        openDialogListPositionDeptOrg() {
            this.dialogDeptOrgDeptListPos = true;
            this.isOpenDialogDrawer = false;
        },
        closeDialogsListPositionDeptOrg() {
            this.dialogDeptOrgDeptListPos = false;
        },
        openAssignPositionOfficerDialog() {
            this.openDialogEmpOrgAssignOfficer = true;
            this.isOpenDialogDrawer = false;
        },
        closeDialogEmpOrgAssignOfficer() {
            this.openDialogEmpOrgAssignOfficer = false;
        },
        closeDialogHistoryOfficer() {
            this.openDialogHistoryOfficer = false;
        },
        openViewHistoryOfficerEmployeeListBaseOrg() {
            this.openDialogHistoryOfficer = true;
            this.isOpenDialogDrawer = false;
        },
        openDialogResignFormRequest() {
            this.openDialogResignRequestAdd = true;
            this.isOpenDialogDrawer = false;
        },
        closeDialogFormResignAddRequest() {
            this.openDialogResignRequestAdd = false;
        },
        openDialogChangePositionToOfficer() {
            this.openDialogChangePositionEmp = true;
        },
        closeDialogChangePosition() {
            this.openDialogChangePositionEmp = false;
        },
        openDialogEmployeeResignOfficer() {
            this.openDialogListResign = true;
            this.isOpenDialogDrawer = false;
        },
        closeDialogEmployeeResignOfficer() {
            this.openDialogListResign = false;
        },
        /**
         * Org-Structures Hierarchy Multi-Level Structure Methods
         **/
        async deletedOrgChartStructuresGlobal() {
            try {
                await this.removedOrgChartHierarchy(this.idOrgStructures);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        /**
         * Add Org-Structures Node
         **/
        closeDialogAddNodeOrgStructures() {
            this.isOpenDialogsAddNode = false;
        },
        openAddNewNodeOrgStructuresHierarchy() {
            this.isOpenDialogDrawer = false;
            this.isOpenDialogsAddNode = true;
        },
        pictureLoadingError(e) {
            this.didLoad = false;
            e.target.src = this.backupSrc;
        },
    },
    mounted() {},
};
</script>

<!-- Style of Custom Chart Node -->
<style>
.orgchart-container {
    position: relative;
    display: inline-block;
    height: 1200px;
    width: calc(100% - 24px);
    border: 1px dashed #aaa;
    border-radius: 5px;
    overflow: auto;
    text-align: center;
    padding: 10px;
}
</style>
