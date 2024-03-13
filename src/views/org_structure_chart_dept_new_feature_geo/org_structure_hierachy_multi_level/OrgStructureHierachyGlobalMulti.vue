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
            :department-name="departmentName"
        />
        <!-- Dialogs of View Assign Manager -->
        <EditAssignEmpManagerGlobalOrg
            v-if="isOpenDialogEditAssignEmpOrg"
            @close="closeAssignEmpOrgStructureData"
            :assignEmployeeData="orgNodeData ? orgNodeData : {}"
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
        />

        <!-- Context Menu Of Organization Chart-Hierarchy Global -->
        <Sidebar
            v-model:visible="isOpenDialogDrawer"
            header="View Org Structure"
            position="right"
        >
            <template #header class="border-1">
                <div class="flex align-items-center gap-2">
                    <span class="font-bold">View Org Structure</span>
                </div>
            </template>
            <div class="overflow-y-auto">
                <ul class="list-none p-3 m-0">
                    <li>
                        <a
                            v-ripple
                            @click.prevent="openAddNewNodeOrg"
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-sitemap mr-2"></i>
                            <span class="font-medium">Add Node</span>
                        </a>
                    </li>
                    <li>
                        <a
                            v-ripple
                            @click.prevent="openEditOrgStructureData"
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-file-edit mr-2"></i>
                            <span class="font-medium">Edit</span>
                        </a>
                    </li>
                    <li>
                        <a
                            v-ripple
                            @click.prevent="openAssignOrgStructureDescription"
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-sitemap mr-2"></i>
                            <span class="font-medium"
                                >Assign Description Organization Structure</span
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
                            @click.prevent="openViewEmployeeListBaseOrg"
                            class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        >
                            <i class="pi pi-building mr-2"></i>
                            <span class="font-medium">View Employee</span>
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
                <div class="my-4">
                    <h1 class="font-bold">
                        Organizations Chart Structures Of
                        {{ "\n" + String(departmentName).toString("No Name") }}
                    </h1>
                </div>
                <!-- Org-Chart Structured -->
                <OrganizationChart
                    v-model:selectionKeys="selectionKeyOrg"
                    :value="getConvertDataObj"
                    collapsible
                    expanded
                    selectionMode="single"
                    @node-select="onSelectedNodeChange"
                    styleClass="bg-teal-100 text-white border-round-xl"
                >
                    <template #default="slotProps">
                        <div class="flex flex-column">
                            <!-- More Detail Updated -->
                            <div
                                class="flex font-global-khmer flex-column align-items-center w-full lg:w-12rem xl:w-12rem white-space-normal overflow-hidden"
                            >
                                <!-- Img -->
                                <img
                                    v-if="
                                        slotProps.node.empOrgStrProfile !==
                                            null &&
                                        slotProps.node.empOrgStrProfile !== ''
                                    "
                                    :alt="slotProps.node.empName"
                                    :src="slotProps.node.empOrgStrProfile"
                                    class="mb-1 w-3rem h-3rem"
                                />
                                <Avatar
                                    :label="extendedSplit(slotProps.node.label)"
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
                                    class="flex flex-column align-items-center white-space-nowrap overflow-hidden text-overflow-ellipsis"
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
        <!-- No OrgChart -->
        <div v-else>
            <div class="my-2 px-2 py-2">
                <div class="my-2">
                    <h1 class="font-bold">Org Chart Example</h1>
                    <small
                        >Please select company or nation congress structures for
                        view org-structures</small
                    >
                </div>
                <!-- OrgChart -->
                <OrganizationChart :value="data" collapsible>
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

<!-- Org-Structure Hierarchy Global -->
<script>
import Sidebar from "primevue/sidebar";
import ViewDetailListEmpGlobalOrg from "./assign_org_str_hierarchy/GlobalListEmployeeOfMainOrg";
import EditAssignEmpManagerGlobalOrg from "./assign_org_str_hierarchy/GlobalEditedAssignEmployeeOfMainOrg";
import OpenEditOrgStructureName from "./assign_org_str_hierarchy/GlobalEditOrgStrName";
import OpenGlobalAssignDescription from "./assign_org_str_hierarchy/OpenGlobalAssignDescription";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";

export default {
    components: {
        Sidebar,
        ViewDetailListEmpGlobalOrg,
        EditAssignEmpManagerGlobalOrg,
        OpenEditOrgStructureName,
        OpenGlobalAssignDescription,
    },
    mixins: [manageOrgStructureDeptNewFeatures],
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
            selectionKeyOrg: null,
            isOpenDialogDrawer: false,
            orgDeptName: "",
            idOrgStructures: 0,
            isOpenDialogViewEmpOrg: false,
            isOpenDialogEditAssignEmpOrg: false,
            isOpenEditOrgStrData: false,
            isOpenDialogEditRemoveOrgStr: false,
            isOpenAssignDesOrgStr: false,
            envFilePath: process.env.VUE_APP_PATH_FILE,
            data: {
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
            orgNodeData: [],
        };
    },
    methods: {
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
            this.orgDeptName = String(nodeData.department).toString();
            this.idOrgStructures = parseInt(nodeData.id) ?? 0;
            this.orgNodeData = nodeData ? nodeData : [];
            this.$emit("node-click", nodeData);
        },
        onCollapsedNodeChange(nodeData) {
            console.log(nodeData);
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
        openAddNewNodeOrg() {},
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
