<template>
    <form @submit.prevent="submittedDialogEditGeoProjectStr">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinner">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="positionAssignEdited"
            :title="`Employee List:`"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content>
                <div
                    class="d-flex flex-column justify-content-center mb-primary"
                >
                    <h3 class="text-center">{{ getDepartmentName }}</h3>
                    <p class="text-center text-lg">
                        Total Employee -
                        {{ parseInt(countEmpByDeptName).toFixed() }}
                    </p>
                </div>
                <!-- List of dataview- -->
                <div class="mb-primary border-bottom">
                    <DataView
                        :value="getDataEmpOrg"
                        paginator
                        :rows="10"
                        :sortOrder="sortOrderEmpGlobal"
                        :sortField="sortFieldEmpGlobal"
                        :layout="layout"
                    >
                        <!-- Header -->
                        <template #header>
                            <div class="flex justify-content-end">
                                <DataViewLayoutOptions v-model="layout" />
                            </div>
                        </template>
                        <!-- List Data Employee -->
                        <template #list="slotProps">
                            <div class="grid grid-nogutter">
                                <div
                                    v-for="(item, index) in slotProps"
                                    :key="index"
                                    class="col-12"
                                >
                                    <div
                                        class="flex flex-column sm:flex-row sm:align-items-start p-4 gap-3"
                                        :class="{
                                            'border-top-1 surface-border':
                                                index !== 0,
                                        }"
                                    >
                                        <div class="md:w-10rem relative flex">
                                            <div>
                                                <Avatar
                                                    label="V"
                                                    class="mr-2"
                                                    size="xlarge"
                                                    shape="circle"
                                                    style="
                                                        background-color: #ece9fc;
                                                        color: #2a1261;
                                                    "
                                                />
                                            </div>
                                            <!-- Employee data info -->
                                            <div
                                                class="gap-2 flex flex-column md:flex-row justify-content-between md:align-items-center"
                                            >
                                                <div
                                                    class="w-35rem justify-content-between align-items-start"
                                                >
                                                    <span
                                                        class="text-lg font-medium text-900"
                                                    >
                                                        {{ item.name }}
                                                    </span>
                                                    <span
                                                        class="font-sm flex text-secondary"
                                                    >
                                                        {{ item.phone }}
                                                    </span>
                                                    <span
                                                        class="font-sm flex text-secondary"
                                                    >
                                                        {{ item.email }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <!-- Grid Data Employee -->
                        <template #grid="slotProps">
                            <div class="grid grid-nogutter">
                                <div
                                    v-for="(item, index) in slotProps"
                                    :key="index"
                                    class="col-12 sm:col-6 md:col-4 xl:col-6 p-2"
                                >
                                    <div
                                        class="p-4 border-1 surface-border surface-card border-round flex flex-column"
                                    >
                                        <div
                                            class="surface-50 flex justify-content-center border-round p-3"
                                        >
                                            <div class="relative mx-auto">
                                                <Avatar
                                                    label="V"
                                                    class="mr-2"
                                                    size="xlarge"
                                                    shape="circle"
                                                    style="
                                                        background-color: #ece9fc;
                                                        color: #2a1261;
                                                    "
                                                />
                                            </div>
                                        </div>
                                        <div class="pt-4">
                                            <div
                                                class="flex flex-row justify-content-between align-items-start gap-2"
                                            >
                                                <div>
                                                    <div
                                                        class="text-lg font-medium text-900 mt-1"
                                                    >
                                                        Panha
                                                    </div>
                                                    <span
                                                        class="font-sm flex text-secondary"
                                                    >
                                                        016387467
                                                    </span>
                                                    <span
                                                        class="font-sm flex text-secondary"
                                                    >
                                                        devpanha@gmail.com
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                class="flex flex-column gap-4 mt-4"
                                            >
                                                <div class="flex gap-2">
                                                    <Button
                                                        icon="pi pi-arrow-right"
                                                        label="View "
                                                        class="flex-auto white-space-nowrap"
                                                    ></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </DataView>
                </div>
            </template>
            <!-- Footer -->
            <template v-slot:pop-footer>
                <div class="flex j-end gap-10">
                    <button
                        class="outline-btn plr-30 plr-sm-15 border-round"
                        aria-label="Country cancel"
                        @click.prevent="$emit('close')"
                    >
                        {{ $t("addressPopup.cancel") }}
                    </button>
                </div>
            </template>
        </pop-over>
    </form>
</template>

<!-- Script of edited projects -->
<script>
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
import geoDeptOrgProjects from "@/mixin/manage_geo_org_str/manageProjectNameHelper";
import managerPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/managePositionOrgStructureChartProjectLevelZeroHelper";
import manageOrgStrMgtPositionHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgStrMgtPositionHelper";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import { mapActions } from "vuex";

export default {
    components: {
        Spinner,
        PopOver,
    },
    props: {
        departmentName: {
            type: String,
            default() {
                return null;
            },
        },
        countEmp: {
            type: Number,
            default() {
                return 0;
            },
        },
        assignPositionData: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        getDepartmentName() {
            return this.departmentName || "";
        },
        countEmpByDeptName() {
            return this.countEmp || 0;
        },
        editingAssPosData() {
            return (
                this.assignPositionData &&
                parseInt(this.assignPositionData.deptOrgStrId)
            );
        },
    },
    mixins: [
        geoDeptOrgProjects,
        util,
        validation,
        managerPositionOrgStructureProjectLevelZeroHelper,
        manageOrgStrMgtPositionHelper,
    ],
    data() {
        return {
            loadingSpinner: false,
            positionAssignEdited: null,
            hasAssignPositionErrors: false,
            submittingPositionData: false,
            openDataAssPosition: [],
            selectedAssignPosition: null,
            layout: "list",
            getDataEmpOrg: [
                {
                    id: "1000",
                    code: "f230fh0g3",
                    name: "Bamboo Watch",
                    description: "Product Description",
                    image: "bamboo-watch.jpg",
                    phone: 65,
                    email: "devpanha@gmail.com",
                    quantity: 24,
                    inventoryStatus: "INSTOCK",
                    rating: 5,
                },
            ],
            sortOrderEmpGlobal: null,
            sortFieldEmpGlobal: null,
        };
    },
    async mounted() {
        if (this.assignPositionData) {
            this.positionAssignEdited = {
                ...this.positionAssignEdited,
                ...this.assignPositionData,
            };
        } else {
            this.positionAssignEdited = {
                id: 0,
                project_name: "",
                project_noted: "",
            };
        }
    },
    methods: {
        ...mapActions("common", [
            "fetchLocation",
            "setToastMessage",
            "setToastError",
            "getRequest",
        ]),
        getFirstCharacter() {},
    },
};
</script>
