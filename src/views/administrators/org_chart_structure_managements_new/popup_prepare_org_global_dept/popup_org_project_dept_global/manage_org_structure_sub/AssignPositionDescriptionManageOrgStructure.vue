<template>
    <div class="layout-content">
        <Toast />
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
                                    loadingAddMoreFromPositionDes
                                        ? 'Add more position description...'
                                        : 'Add new position description'
                                "
                                severity="danger"
                                :loading="loadingAddMoreFromPositionDes"
                                @click.prevent="
                                    onClickAddMorePositionDesOrgStructures()
                                "
                                class="primary-btn outline-btn w-16rem plr-20 mtb-5 border-round"
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
                                ) in state.dyNamicAddNewFrmJobDes"
                                :key="key"
                                :set="v$.dyNamicAddNewFrmJobDes.$each[index]"
                            >
                                <div
                                    class="flex justify-content-between flex-wrap"
                                >
                                    <button
                                        class="ajax-btn outline-btn plr-20 mtb-5 border-round"
                                    >
                                        Position Description -
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
                                                onClickAddMorePositionDesOrgStructures()
                                            "
                                        >
                                            <span>Add More</span>
                                        </button>
                                        <button
                                            class="ajax-btn bg-red-500 text-white plr-20 mtb-5 border-round"
                                            @click.prevent="
                                                removeJobDesOrgStructureByKey(
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
                                                    v$.dyNamicAddNewFrmJobDes
                                                        .$each.$response
                                                        .$errors[key]
                                                        .editNameEngProjectOrgStr
                                                        .length && submitted,
                                            }"
                                            >English Name<span class="p-error"
                                                >*</span
                                            ></label
                                        >
                                        <InputText
                                            id="english_name"
                                            placeholder="Position Title of the English Name"
                                            type="text"
                                            class="py-3 border-round-lg"
                                            v-model="
                                                inputNew.editNameEngProjectOrgStr
                                            "
                                            :class="{
                                                'p-invalid border-round-lg border-round-lg p-error':
                                                    v$.dyNamicAddNewFrmJobDes
                                                        .$each.$response
                                                        .$errors[key]
                                                        .editNameEngProjectOrgStr
                                                        .length && submitted,
                                            }"
                                        />

                                        <small
                                            v-if="
                                                v$.dyNamicAddNewFrmJobDes.$each
                                                    .$response.$data[key]
                                                    .editNameEngProjectOrgStr
                                                    .$invalid && submitted
                                            "
                                            class="p-error text-sm"
                                        >
                                            {{
                                                v$.dyNamicAddNewFrmJobDes.$each.$response.$errors[
                                                    key
                                                ].editNameEngProjectOrgStr[0].$message.replace(
                                                    "Value",
                                                    "Position Title of the English Name"
                                                )
                                            }}
                                        </small>
                                    </div>
                                    <!-- Position Title of the English Name -->
                                    <div class="col-6 field">
                                        <label for="name_en">Khmer Name</label>
                                        <InputText
                                            id="english_name"
                                            placeholder="Position Title of the Khmer Name"
                                            type="text"
                                            class="py-3 border-round-lg"
                                            v-model="
                                                inputNew.editNameKhmerProjectOrgStr
                                            "
                                        />
                                    </div>
                                    <!-- Descriptions -->
                                    <div class="col-12 field">
                                        <label for="description_org_structure"
                                            >Position Descriptions</label
                                        >
                                        <Textarea
                                            id="descriptions_org_structure"
                                            placeholder="Position Descriptions"
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
                            <div class="col-12 flex justify-content-end mb-4">
                                <Button
                                    icon="pi pi-send"
                                    class="p-button-lg py-3 w-10rem text-sm"
                                    type="submit"
                                    :label="
                                        loadingBtnEdit ? 'Saving...' : 'Create'
                                    "
                                    :loading="loadingBtnEdit"
                                    @click.prevent="
                                        handleEditJobDescriptionsSubmit(
                                            !v$.$invalid
                                        )
                                    "
                                />
                            </div>
                        </div>
                    </div>
                    <!--List Positions Assign to org-structure-->
                    <div class="col-12 field px-2 py-2">
                        <list-datable-global-position-description-org-chart-structure />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Scripts of org-structure management base projects -->
<script>
import { required, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive } from "vue";
import ListDatableGlobalPositionDescriptionOrgChartStructure from "../../ListDatableGlobalPositionDescriptionOrgChartStructure.vue";
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
export default {
    props: {
        orgStrNameEditedId: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    computed: {
        getOrgStructureAdd() {
            const getOrgStrData = this.orgStrNameEditedId
                ? this.orgStrNameEditedId
                : {};
            if (
                (getOrgStrData !== null && getOrgStrData !== undefined) ||
                typeof getOrgStrData !== "object"
            ) {
                return getOrgStrData;
            } else {
                throw Error(
                    "Please selected org-structure for create positions"
                );
            }
        },
    },
    setup: () => {
        const rules = {
            dyNamicAddNewFrmJobDes: {
                $each: helpers.forEach({
                    editNameEngProjectOrgStr: {
                        required,
                        minLength: minLength(3),
                    },
                }),
            },
        };
        const state = reactive({
            dyNamicAddNewFrmJobDes: [
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
    mixins: [managerJobPositionOrgStructureProjectLevelZeroHelper],
    data() {
        return {
            loadingBtnEdit: false,
            loadingAddMoreFromPositionDes: false,
            submitted: false,
            editNameEngProjectOrgStr: "",
            editNameKhmerProjectOrgStr: "",
            editDescriptionProjectOrgStr: "",
            dyNamicAddNewFrmJobDes: [
                {
                    editNameEngProjectOrgStr: "",
                    editNameKhmerProjectOrgStr: "",
                    editDescriptionProjectOrgStr: "",
                },
            ],
            addJobDescType: "Position",
        };
    },
    components: {
        ListDatableGlobalPositionDescriptionOrgChartStructure,
    },
};
</script>
