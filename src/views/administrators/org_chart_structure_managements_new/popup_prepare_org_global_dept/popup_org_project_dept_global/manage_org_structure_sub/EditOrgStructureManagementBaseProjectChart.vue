<template>
    <div class="layout-content px-2 py-2">
        <Toast />
        <form
            class="grid grid-nogutter flex-wrap gap-3 p-fluid"
            @submit.prevent="handleEditStructureOrgProChartSubmit"
        >
            <!-- Spinner -->
            <transition name="fade" mode="out-in">
                <div
                    class="spinner-wrapper flex layer-white"
                    v-if="loadingSpinner"
                >
                    <spinner :radius="100" />
                </div>
            </transition>
            <div class="col-12 lg:col-12 text-sm">
                <div class="grid formgrid">
                    <!-- English -->
                    <div class="col-6 field">
                        <label
                            for="name_en"
                            :class="{
                                'p-error':
                                    !editOrgStructureData?.orgName &&
                                    hasOrgStructureDataErrors,
                            }"
                            >English</label
                        >
                        <InputText
                            id="english_name"
                            placeholder="Edit khmer name for org-structure"
                            type="text"
                            class="py-3 border-round-lg"
                            v-model="editOrgStructureData.orgName"
                            :class="{
                                invalid:
                                    !editOrgStructureData?.orgName &&
                                    hasOrgStructureDataErrors,
                            }"
                        />
                        <span
                            class="error"
                            v-if="
                                !editOrgStructureData?.orgName &&
                                hasOrgStructureDataErrors
                            "
                        >
                            {{
                                $t("projectOrgStr.isRequired", {
                                    type: "English Name",
                                })
                            }}
                        </span>
                    </div>
                    <!-- Khmer Name -->
                    <div class="col-6 field">
                        <label for="name_en">Khmer Name</label>
                        <InputText
                            id="english_name"
                            placeholder="Edit khmer name for org-structure"
                            type="text"
                            class="py-3 border-round-lg"
                            v-model="editOrgStructureData.khmerName"
                        />
                    </div>
                    <!-- Descriptions -->
                    <div class="col-12 field">
                        <label for="description_org_structure"
                            >Descriptions</label
                        >
                        <Textarea
                            id="descriptions_org_structure"
                            placeholder="Descriptions for org-structure"
                            type="text"
                            class="py-3 border-round-lg"
                            v-model="editOrgStructureData.descriptionEdited"
                        />
                    </div>
                    <!-- Save button  -->
                    <div class="col-12 flex justify-content-end mt-4">
                        <div class="flex j-end gap-10">
                            <button
                                class="outline-btn plr-30 plr-sm-15 border-round"
                                aria-label="Country cancel"
                                @click.prevent="$emit('close')"
                            >
                                {{ $t("addressPopup.cancel") }}
                            </button>
                            <ajax-button
                                v-if="editOrgStrData"
                                class="primary-btn plr-30 plr-sm-15 border-round"
                                :fetching-data="submittingProjectDataLoading"
                                :disabled="submittingProjectDataLoading"
                                :loading-text="$t('addressPopup.saving')"
                                :text="
                                    $t('projectOrgStr.thisOrgManagement', {
                                        type:
                                            editing > 0
                                                ? $t('addressPopup.update')
                                                : $t('addressPopup.save'),
                                    })
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<!-- Scripts of org-structure management base projects -->
<script>
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import { mapActions } from "vuex";
import managerOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageOrgStructureChartProjectLevelZeroHelper";
import manageOrgChartBoardMgtLevelHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgChartBoardMgtLevelHelper";
export default {
    setup: () => ({ v$: useVuelidate() }),
    components: {
        AjaxButton,
        Spinner,
    },
    props: {
        editOrgStrData: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    mixins: [
        managerOrgStructureProjectLevelZeroHelper,
        manageOrgChartBoardMgtLevelHelper,
    ],
    data() {
        return {
            loadingBtnEdit: false,
            submitted: false,
            editNameEngProjectOrgStr: "",
            editNameKhmerProjectOrgStr: "",
            editDescriptionProjectOrgStr: "",
            orgStrEditDataName: null,
            hasOrgStructureDataErrors: false,
            submittingProjectDataLoading: false,
            loadingSpinner: false,
        };
    },
    //Validations
    validations() {
        return {
            editNameEngProjectOrgStr: {
                required,
                minLength: minLength(3),
            },
        };
    },
    computed: {
        nameOrgStructEdit() {
            return this.editOrgStrData?.orgName || "";
        },
        editing() {
            return this.orgStrEditDataName && this.orgStrEditDataName.id;
        },
        editOrgStructureData() {
            if (this.editOrgStrData) {
                const editOrgStrId = {
                    ...this.orgStrEditDataName,
                    ...this.editOrgStrData,
                };
                return editOrgStrId;
            } else {
                const orgStrEditDataName = {
                    id: 0,
                    textName: "",
                    orgName: "",
                    khmerName: "",
                    descriptionEdited: "",
                };
                return orgStrEditDataName;
            }
        },
    },
    methods: {
        ...mapActions("common", [
            "fetchLocation",
            "setToastMessage",
            "setToastError",
            "getRequest",
        ]),
        resetForm() {
            (this.editNameEngProjectOrgStr = ""),
                (this.proCategoryNameKh = ""),
                (this.submitted = false);
        },
    },
};
</script>
