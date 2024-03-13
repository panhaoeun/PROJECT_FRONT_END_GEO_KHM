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
            v-if="editOrgStrData"
            @close="$emit('close')"
            :title="'Edit Org Structure:' + '\t' + orgStrName"
            elem-id="edit-org-structure-pop-over"
            :layer="true"
            class="address-popup popup-top-auto text-left"
        >
            <!-- Contents -->
            <template v-slot:content>
                <!-- Parent Department -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Parent Department </label>
                        <TreeSelect
                            v-model="selectedParentDeptOrgStrProject"
                            :options="orgStrDataTree"
                            placeholder="Parent department"
                            class="border-round-lg text-sm w-full md:w-30rem"
                        />
                        <label class="text-sm text-danger">
                            Select the org-structures parent department.
                        </label>
                    </div>
                </div>
                <!-- Root Name English -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label
                            :class="{
                                'p-error':
                                    !editOrgStrData?.department &&
                                    hasErrorNewOrgStr,
                            }"
                        >
                            Root Name (English Name)
                            <span class="p-error">*</span></label
                        >
                        <InputText
                            class="border-round-lg text-sm w-full md:w-30rem"
                            id="username"
                            v-model="editOrgStrData.department"
                            :class="{
                                invalid:
                                    !editOrgStrData?.department &&
                                    hasErrorNewOrgStr,
                            }"
                            placeholder="Please enter a root node name for english name"
                            aria-describedby="username-help"
                        />
                        <span
                            class="error"
                            v-if="
                                !editOrgStrData?.department && hasErrorNewOrgStr
                            "
                        >
                            {{
                                $t("addressPopup.isRequired", {
                                    type: "Root Name (English Name)",
                                })
                            }}
                        </span>
                    </div>
                </div>
                <!-- Root Name Khmer -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Root Name (Khmer Name)</label>
                        <InputText
                            class="border-round-lg text-sm w-full md:w-30rem"
                            id="username"
                            v-model="editOrgStrData.departmentKH"
                            placeholder="Please enter a root node name for khmer name"
                            aria-describedby="username-help"
                        />
                    </div>
                </div>
                <!-- Description Org-Structure -->
                <div class="flex start mlr--5">
                    <div class="input-wrap mlr-5">
                        <label> Descriptions </label>
                        <TextArea
                            class="border-round-lg text-sm w-30rem"
                            v-model="editOrgStrData.descriptionNoted"
                            type="text"
                            placeholder="Please eneter descriptions"
                        />
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
                        :fetching-data="submittingOrgStrData"
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
            </template>
        </pop-over>
    </form>
</template>

<!-- Script of edited org-structures chart multi-level -->
<script>
import Spinner from "@/components/ui_component_new_frontend/Spinner";
import PopOver from "@/components/ui_component_new_frontend/PopOver";
import util from "@/mixin/util";
import validation from "@/mixin/validation";
import AjaxButton from "@/components/ui_component_new_frontend/AjaxButton";
import { mapActions } from "vuex";
import manageOrgStructureDeptNewFeatures from "@/mixin/manage_org_structure_dept_new_features/manageOrgStructureDeptNewFeatures";
export default {
    components: {
        Spinner,
        PopOver,
        AjaxButton,
    },
    props: {
        orgStrDataTree: {
            type: Object,
            required: true,
            default: () => {},
        },
        editOrgStrDeptName: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    computed: {
        orgStrName() {
            return this.editOrgStrDeptName?.department || "";
        },
        editing() {
            return this.editOrgStrDeptName && this.editOrgStrDeptName.id;
        },
    },
    mixins: [util, validation, manageOrgStructureDeptNewFeatures],
    data() {
        return {
            loadingSpinner: false,
            editOrgStrData: null,
            getOrgStrParentDept: [],
            selectedParentDept: null,
            hasProvinceErrors: false,
            submittingOrgStrData: false,
            hasErrorNewOrgStr: false,
        };
    },
    async mounted() {
        if (this.editOrgStrDeptName) {
            this.editOrgStrData = {
                ...this.editOrgStrData,
                ...this.editOrgStrDeptName,
            };
        } else {
            this.editOrgStrData = {
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
    },
};
</script>
