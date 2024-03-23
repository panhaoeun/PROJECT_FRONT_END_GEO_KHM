<template>
    <form @submit.prevent="submittedDialogAssignEmployeeOrgDept">
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinner">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="employeeAssignEdited"
            :title="`Assign Manager:` + ' ' + assignPositionName"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            class="address-popup popup-top-auto z-100 text-left"
        >
            <!-- Contents -->
            <template v-slot:content>
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label
                            :class="{
                                'p-error':
                                    !employeeAssignEdited?.department &&
                                    hasErrorNewOrgStr,
                            }"
                        >
                            Manager
                            <span class="p-error text-danger">*</span>
                        </label>
                        <Dropdown
                            :class="{
                                'p-error':
                                    !editOrgStrData?.department &&
                                    hasErrorNewOrgStr,
                            }"
                            showClear
                            v-model="selectedAssignEmp"
                            :options="getEmpDataOrgDept"
                            optionLabel="geo_english_name"
                            empty="Empty manager"
                            filter
                            placeholder="Select a manager"
                            inputId="geo_english_name"
                            aria-describedby="dd-error"
                            :highlightOnSelect="false"
                            class="w-full md:w-30rem border-round-lg"
                        >
                            <template #value="slotProps">
                                <div
                                    v-if="slotProps.value"
                                    class="flex align-items-center"
                                >
                                    <div class="text-sm">
                                        {{
                                            geoNameToTitleCase(
                                                String(
                                                    slotProps.value
                                                        ?.full_kh_name ?? ""
                                                )
                                            )
                                        }}({{
                                            slotProps.value.full_latin_name ??
                                            ""
                                        }})
                                    </div>
                                </div>
                                <span v-else class="text-sm">
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center text-sm">
                                    <div class="text-sm">
                                        {{
                                            geoNameToTitleCase(
                                                String(
                                                    slotProps.option
                                                        .full_kh_name ?? ""
                                                )
                                            )
                                        }}
                                        ({{
                                            slotProps.option.full_latin_name ??
                                            ""
                                        }})
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                        <!-- Position -->
                        <span
                            class="error"
                            v-if="
                                !hasErrorNewOrgStr.department &&
                                hasErrorNewOrgStr
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "Position of english name",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Descriptions </label>
                        <TextArea
                            class="border-round-lg text-sm w-30rem"
                            v-model="employeeAssignEdited.descriptionNoted"
                            type="text"
                            placeholder="Descriptions"
                        />
                    </div>
                </div>
            </template>
            <!-- Footer -->
            <template v-slot:pop-footer>
                <div class="flex j-end gap-10">
                    <button
                        class="outline-btn plr-30 plr-sm-15 border-round"
                        aria-label="Employee cancel"
                        @click.prevent="$emit('close')"
                    >
                        {{ $t("addressPopup.cancel") }}
                    </button>
                    <ajax-button
                        class="primary-btn plr-30 plr-sm-15"
                        :fetching-data="submittingPositionData"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('projectOrgStr.thisOrgAssignEMp', {
                                type:
                                    editingAssEmployeeData > 0
                                        ? $t('addressPopup.update')
                                        : $t('addressPopup.save'),
                            })
                        "
                    />
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
import manageGlobalOrgEmployeeHelper from "@/mixin/manage_geo_org_str/manageGlobalOrgEmployeeHelper";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import { mapActions } from "vuex";
export default {
    components: {
        Spinner,
        PopOver,
        AjaxButton,
    },
    props: {
        assignEmployeeData: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        assignPositionName() {
            return this.assignEmployeeData?.department || "";
        },
        editingAssEmployeeData() {
            return (
                this.assignEmployeeData &&
                parseInt(this.assignEmployeeData.deptOrgStrId)
            );
        },
    },
    mixins: [
        geoDeptOrgProjects,
        util,
        validation,
        manageGlobalOrgEmployeeHelper,
        manageOrgStructureDeptNewFeatures,
    ],
    data() {
        return {
            loadingSpinner: false,
            employeeAssignEdited: null,
            hasAssignPositionErrors: false,
            submittingPositionData: false,
            openDataAssEmp: [],
            selectedAssignEmp: null,
            descriptionDeptEmpAssign: null,
            hasErrorNewOrgStr: false,
        };
    },
    async mounted() {
        if (this.assignEmployeeData) {
            this.employeeAssignEdited = {
                ...this.employeeAssignEdited,
                ...this.assignEmployeeData,
            };
        } else {
            this.employeeAssignEdited = {
                id: 0,
                deptOrgStrId: 0,
                department: "",
                departmentKH: "",
                descriptionNoted: "",
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
        geoNameToTitleCase(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
    },
};
</script>
