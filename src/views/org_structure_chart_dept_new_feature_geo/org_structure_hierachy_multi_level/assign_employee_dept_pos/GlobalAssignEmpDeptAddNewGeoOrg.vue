<template>
    <form @submit.prevent="submittedAssignOrgEmpPosition(!v$.$invalid)">
        <Toast />
        <!-- Spinner -->
        <transition name="fade" mode="out-in">
            <div class="spinner-wrapper flex layer-white" v-if="loadingSpinner">
                <spinner :radius="100" />
            </div>
        </transition>
        <!-- Popup Dialog Geo Locations Country -->
        <pop-over
            v-if="projectStrGeoData"
            @close="$emit('close')"
            elem-id="user-address-pop-over"
            :layer="true"
            :title="`Assign Employee This Department: ${departmentName}`"
            class="address-popup popup-top-auto z-100"
        >
            <!-- Contents -->
            <template v-slot:content>
                <div class="text-left" style="width: 50rem">
                    <!-- Employee -->
                    <div class="flex start mlr--5 w-auto">
                        <div class="input-wrap mlr-5" style="width: 50rem">
                            <label
                                :class="{
                                    'p-invalid p-error':
                                        v$.selectedAssignEmp.$invalid &&
                                        submitted &&
                                        hasErrorAssignStrEmp,
                                }"
                            >
                                Employee <span class="p-error">*</span>
                            </label>
                            <Dropdown
                                showClear
                                v-model="v$.selectedAssignEmp.$model"
                                :class="{
                                    'p-invalid p-error':
                                        v$.selectedAssignEmp.$invalid &&
                                        submitted &&
                                        hasErrorAssignStrEmp,
                                }"
                                :options="getEmpDataOrgDept"
                                optionLabel="geo_english_name"
                                empty="Empty manager"
                                filter
                                placeholder="Select a employee"
                                inputId="geo_english_name"
                                aria-describedby="dd-error"
                                :highlightOnSelect="false"
                                class="w-full border-round-lg"
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
                                                slotProps.value
                                                    .full_latin_name ?? ""
                                            }})
                                        </div>
                                    </div>
                                    <span v-else class="text-sm">
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div
                                        class="flex align-items-center text-sm"
                                    >
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
                                                slotProps.option
                                                    .full_latin_name ?? ""
                                            }})
                                        </div>
                                    </div>
                                </template>
                            </Dropdown>
                            <small
                                v-if="
                                    (v$.selectedAssignEmp.$invalid &&
                                        submitted) ||
                                    v$.selectedAssignEmp.$pending.$response
                                "
                                class="p-error"
                                >{{
                                    v$.selectedAssignEmp.required.$message.replace(
                                        "Value",
                                        "Employee"
                                    ) || v$.selectedAssignEmp.$params.min
                                }}</small
                            >
                        </div>
                    </div>
                    <!-- Positions -->
                    <!-- <div class="flex start mlr--5 w-auto">
                        <div class="input-wrap mlr-5" style="width: 50rem" >
                            <label
                                :class="{
                                    'p-invalid p-error':
                                        v$.selectedAssignPositionOrg.$invalid &&
                                        submitted &&
                                        hasErrorAssignStrEmp,
                                }"
                            >
                                Position <span class="p-error">*</span>
                            </label>
                            <Dropdown
                                showClear
                                :options="getEmpDataOrgDept"
                                v-model="v$.selectedAssignPositionOrg.$model"
                                :class="{
                                    'p-invalid p-error':
                                        v$.selectedAssignPositionOrg.$invalid &&
                                        submitted &&
                                        hasErrorAssignStrEmp,
                                }"
                                optionLabel="geo_english_name"
                                empty="Empty Position"
                                filter
                                placeholder="Select a position"
                                inputId="geo_english_name"
                                aria-describedby="dd-error"
                                :highlightOnSelect="false"
                                class="w-full border-round-lg"
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
                                                slotProps.value
                                                    .full_latin_name ?? ""
                                            }})
                                        </div>
                                    </div>
                                    <span v-else class="text-sm">
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div
                                        class="flex align-items-center text-sm"
                                    >
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
                                                slotProps.option
                                                    .full_latin_name ?? ""
                                            }})
                                        </div>
                                    </div>
                                </template>
                            </Dropdown>
                            <small
                                v-if="
                                    (v$.selectedAssignPositionOrg.$invalid &&
                                        submitted) ||
                                    v$.selectedAssignPositionOrg.$pending
                                        .$response
                                "
                                class="p-error"
                                >{{
                                    v$.selectedAssignPositionOrg.required.$message.replace(
                                        "Value",
                                        "Position"
                                    ) ||
                                    v$.selectedAssignPositionOrg.$params.min
                                }}</small
                            >
                        </div>
                    </div> -->
                    <!-- Descriptions -->
                    <div class="flex start mlr--5">
                        <div class="input-wrap mlr-5" style="width: 50rem">
                            <label> Descriptions </label>
                            <TextArea
                                class="border-round-lg text-sm w-30rem"
                                v-model="assignEmpNoted"
                                type="text"
                                placeholder="Please enter description"
                            />
                        </div>
                    </div>
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
                    <ajax-button
                        class="primary-btn plr-30 plr-sm-15"
                        :fetching-data="submittingAssignEmpData"
                        :loading-text="$t('addressPopup.saving')"
                        :text="
                            $t('projectOrgStr.thisEmployee', {
                                type:
                                    editing > 0
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
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
import manageGlobalOrgEmployeeHelper from "@/mixin/manage_geo_org_str/manageGlobalOrgEmployeeHelper";
import { mapActions } from "vuex";
export default {
    setup: () => ({ v$: useVuelidate() }),
    //Validations
    validations() {
        return {
            selectedAssignEmp: {
                required,
            },
            // selectedAssignPositionOrg: {
            //     required,
            // },
        };
    },
    components: {
        Spinner,
        PopOver,
        AjaxButton,
    },
    props: {
        departmentName: {
            type: String,
            default() {
                return null;
            },
        },
        geoOrgProjectStrData: {
            type: Object,
            default() {
                return null;
            },
        },
        orgAssignId: {
            type: Number,
            required: true,
            default: () => 0,
        },
    },
    computed: {
        nameProject() {
            return this.geoOrgProjectStrData?.project_name || "";
        },
        selectedAssignEmployeeOrg() {
            let orgStrEmpId;
            const getOrgEmpOrgId = this.selectedAssignEmp
                ? this.selectedAssignEmp
                : null;
            if (
                (getOrgEmpOrgId !== null && getOrgEmpOrgId !== "") ||
                typeof getOrgEmpOrgId !== "undefined" ||
                typeof orgStrEmpId !== "string"
            ) {
                orgStrEmpId = parseInt(getOrgEmpOrgId?.id);
            }
            return orgStrEmpId;
        },
    },
    mixins: [
        util,
        validation,
        manageOrgStructureDeptNewFeatures,
        manageGlobalOrgEmployeeHelper,
    ],
    data() {
        return {
            submitted: false,
            loadingSpinner: false,
            projectStrGeoData: null,
            hasProvinceErrors: false,
            submittingAssignEmpData: false,
            assignEmpNoted: null,
            selectedAssignEmp: null,
            selectedAssignPositionOrg: null,
            hasErrorAssignStrEmp: false,
        };
    },
    async mounted() {
        if (this.geoOrgProjectStrData) {
            this.projectStrGeoData = {
                ...this.projectStrGeoData,
                ...this.geoOrgProjectStrData,
            };
        } else {
            this.projectStrGeoData = {
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
        geoNameToTitleCase(str) {
            return str
                .toLowerCase()
                .replace(/(^|\s|-|')(\w)/g, function (match) {
                    return match.toUpperCase();
                });
        },
        closeDialogEmpOrgAssign() {
            this.openDialogEmpOrg = false;
        },
    },
};
</script>
