<template>
    <!-- List Position base on org-structure -->
    <div class="px-2 py-2">
        <!-- Titles -->
        <div class="flex justify-content-between my-4 px-4 py-4">
            <h1 class="text-2xl text-gray-800 font-medium">Job Description List</h1>
            <el-button
                type="info"
                size="large"
                class="btn btn-primary"
                @click.prevent="openDialogAddNewJobDes"
            >
                <div class="button">
                    <i class="pi pi-plus" style="font-size: 1rem"></i>
                    <span class="pl-2">Create</span>
                </div>
            </el-button>
        </div>
        <div class="gird">
            <div class="col-12">
                <el-card class="box-card py-2 px-2 text-sm">
                    <div class="px-2">
                        <ListDatableGlobalPositionOrgChartStructure />
                        <!-- Edited Org-Position -->
                    </div>
                </el-card>
            </div>
        </div>
        <!-- Open Dialogs of Positions -->
        <Dialog
            v-model:visible="visibleDialogPosition"
            modal
            header="Assign Position"
            :style="{ width: '95rem' }"
            maximized
            maximizable
        >
            <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <div class="col-12 lg:col-12 text-sm">
                    <div class="grid formgrid">
                        <div class="col-12 lg:col-12 text-sm">
                            <div
                                class="dply-felx flex justify-content-between mtb-3 mtb-sm-15 oflow-hidden"
                            >
                                <Button
                                    icon="pi pi-plus-circle"
                                    :label="
                                        loadingAddMoreFrom
                                            ? 'Add more positions...'
                                            : 'Add new Positions'
                                    "
                                    severity="danger"
                                    :loading="loadingAddMoreFrom"
                                    @click.prevent="
                                        onClickAddMorePositionOrgStructures()
                                    "
                                    class="primary-btn outline-btn w-13rem plr-20 mtb-5 border-round"
                                />
                            </div>
                            <!--Add From Positions -->
                            <div
                                class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
                            >
                                <div
                                    class="pop-over-content p-20 p-sm-15 card"
                                    v-for="(
                                        inputNew, key
                                    ) in state.dyNamicAddNewFrm"
                                    :key="key"
                                    :set="v$.dyNamicAddNewFrm.$each[index]"
                                >
                                    <div
                                        class="flex justify-content-between flex-wrap"
                                    >
                                        <button
                                            class="ajax-btn outline-btn plr-20 mtb-5 border-round"
                                        >
                                            Position -
                                            <span class="font-bold pl-1">{{
                                                key + 1
                                            }}</span>
                                        </button>
                                        <!-- Button Actions -->
                                        <div class="flex gap-3">
                                            <button
                                                class="ajax-btn outline-btn plr-20 mtb-5 border-round"
                                                v-show="key != 0"
                                                @click.prevent="
                                                    onClickAddMorePositionOrgStructures()
                                                "
                                            >
                                                <span>Add More</span>
                                            </button>
                                            <button
                                                class="ajax-btn bg-red-500 text-white plr-20 mtb-5 border-round"
                                                @click.prevent="
                                                    removePositionOrgStructureByKey(
                                                        key
                                                    )
                                                "
                                                v-show="key != 0"
                                            >
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="grid formgrid">
                                        <!-- English Name -->
                                        <div class="col-6 field">
                                            <label
                                                for="name_en"
                                                :class="{
                                                    'p-invalid border-round-lg border-round-lg p-error':
                                                        v$.dyNamicAddNewFrm
                                                            .$each.$response
                                                            .$errors[key]
                                                            .editNameEngProjectOrgStr
                                                            .length &&
                                                        submitted,
                                                }"
                                                >English Name<span
                                                    class="p-error"
                                                    >*</span
                                                ></label
                                            >
                                            <InputText
                                                id="english_name"
                                                placeholder="Position of the English"
                                                type="text"
                                                class="py-3 border-round-lg"
                                                v-model="
                                                    inputNew.editNameEngProjectOrgStr
                                                "
                                                :class="{
                                                    'p-invalid border-round-lg border-round-lg p-error':
                                                        v$.dyNamicAddNewFrm
                                                            .$each.$response
                                                            .$errors[key]
                                                            .editNameEngProjectOrgStr
                                                            .length &&
                                                        submitted,
                                                }"
                                            />

                                            <small
                                                v-if="
                                                    v$.dyNamicAddNewFrm.$each
                                                        .$response.$data[key]
                                                        .editNameEngProjectOrgStr
                                                        .$invalid && submitted
                                                "
                                                class="p-error text-sm"
                                            >
                                                {{
                                                    v$.dyNamicAddNewFrm.$each.$response.$errors[
                                                        key
                                                    ].editNameEngProjectOrgStr[0].$message.replace(
                                                        "Value",
                                                        "Position of the English"
                                                    )
                                                }}
                                            </small>
                                        </div>
                                        <!-- Khmer Name -->
                                        <div class="col-6 field">
                                            <label for="name_en"
                                                >Khmer Name</label
                                            >
                                            <InputText
                                                id="english_name"
                                                placeholder="Position of the Khmer"
                                                type="text"
                                                class="py-3 border-round-lg"
                                                v-model="
                                                    inputNew.editNameKhmerProjectOrgStr
                                                "
                                            />
                                        </div>
                                        <!-- Descriptions -->
                                        <div class="col-12 field">
                                            <label
                                                for="description_org_structure"
                                                >Descriptions</label
                                            >
                                            <Textarea
                                                id="descriptions_org_structure"
                                                placeholder="Descriptions"
                                                type="text"
                                                class="py-3 border-round-lg"
                                                v-model="
                                                    inputNew.editDescriptionProjectOrgStr
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>
                                <!-- Save button  -->
                                <div
                                    class="col-12 flex justify-content-end mb-4"
                                >
                                    <Button
                                        icon="pi pi-check"
                                        class="p-button-lg py-3 w-10rem text-sm"
                                        type="submit"
                                        :label="
                                            loadingBtnEdit
                                                ? 'Saving...'
                                                : 'Create'
                                        "
                                        :loading="loadingBtnEdit"
                                        @click.prevent="
                                            handleEditStructureOrgProChartSubmit(
                                                !v$.$invalid
                                            )
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                        <!--List Positions Assign to org-structure-->
                        <!-- <div class="col-12 field px-2 py-2">
                            <list-datable-global-position-org-chart-structure
                                positionData=""
                            />
                        </div> -->
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<!-- Script of Positions Add new -->
<script>
import { required, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive } from "vue";
import ListDatableGlobalPositionOrgChartStructure from "../../../org_chart_structure_managements_new/popup_prepare_org_global_dept/ListDatableGlobalJobDescriptionOrgChartStructure.vue";
// import OpenEditedJobDescriptionOrgStructure from "../../../org_chart_structure_managements_new/popup_prepare_org_global_dept/popup_org_project_dept_global/global_prepare_org_str_dept/EditJobDescriptionOrgStrData.vue";
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
import managerPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/managePositionOrgStructureChartProjectLevelZeroHelper";
export default {
    mixins: [
        managerJobPositionOrgStructureProjectLevelZeroHelper,
        managerPositionOrgStructureProjectLevelZeroHelper,
    ],
    setup: () => {
        const rules = {
            dyNamicAddNewFrm: {
                $each: helpers.forEach({
                    editNameEngProjectOrgStr: {
                        required,
                        minLength: minLength(3),
                    },
                }),
            },
        };
        const state = reactive({
            dyNamicAddNewFrm: [
                {
                    editNameEngProjectOrgStr: "",
                    editNameKhmerProjectOrgStr: "",
                    editDescriptionProjectOrgStr: "",
                },
            ],
        });
        const v$ = useVuelidate(rules, state);
        return { v$, state };
    },
    components: {
        ListDatableGlobalPositionOrgChartStructure,
        // OpenEditedJobDescriptionOrgStructure,
    },
    props: {},
    data() {
        return {
            visibleDialogPosition: false,
            dyNamicAddNewFrm: [
                {
                    editNameEngProjectOrgStr: "",
                    editNameKhmerProjectOrgStr: "",
                    editDescriptionProjectOrgStr: "",
                },
            ],
        };
    },
    methods: {
        openDialogAddNewJobDes() {
            this.visibleDialogPosition = true;
        },
        onClickAddMorePositionOrgStructures() {
            try {
                this.loadingAddMoreFrom = true;
                setTimeout(() => {
                    this.loadingAddMoreFrom = false;
                    try {
                        this.state.dyNamicAddNewFrm.push({
                            editNameEngProjectOrgStr: "",
                            editNameKhmerProjectOrgStr: "",
                            editDescriptionProjectOrgStr: "",
                        });
                    } catch (error) {
                        throw Error(error || error.message);
                    }
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        removePositionOrgStructureByKey(index) {
            this.dyNamicAddNewFrm.splice(index, 1);
        },
        resetForm() {
            (this.state.editNameEngProjectOrgStr = ""),
                (this.proCategoryNameKh = ""),
                (this.submitted = false);
        },
    },
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
