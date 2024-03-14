<template>
    <div class="layout-content">
        <Toast />
        <Dialog
            v-model:visible="openDialogs"
            modal
            header="Add Node Org Chart Structure"
            :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            maximizable
        >
            <!-- Header Icons-->
            <template #closeicon>
                <i class="pi pi-times" @click.prevent="close"></i>
            </template>
            <!-- Contents -->
            <div class="address-popup popup-top-auto z-100">
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
                                        class="primary-btn outline-btn w-20rem plr-20 mtb-5 border-round"
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
                                        :set="
                                            v$.dyNamicAddNewFrmJobDes.$each[
                                                index
                                            ]
                                        "
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
                                                            v$
                                                                .dyNamicAddNewFrmJobDes
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
                                                    placeholder="Position Title of the English Name"
                                                    type="text"
                                                    class="py-3 border-round-lg"
                                                    v-model="
                                                        inputNew.editNameEngProjectOrgStr
                                                    "
                                                    :class="{
                                                        'p-invalid border-round-lg border-round-lg p-error':
                                                            v$
                                                                .dyNamicAddNewFrmJobDes
                                                                .$each.$response
                                                                .$errors[key]
                                                                .editNameEngProjectOrgStr
                                                                .length &&
                                                            submitted,
                                                    }"
                                                />

                                                <small
                                                    v-if="
                                                        v$
                                                            .dyNamicAddNewFrmJobDes
                                                            .$each.$response
                                                            .$data[key]
                                                            .editNameEngProjectOrgStr
                                                            .$invalid &&
                                                        submitted
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
                                                <label for="name_en"
                                                    >Khmer Name</label
                                                >
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
                                                <label
                                                    for="description_org_structure"
                                                    >Position
                                                    Descriptions</label
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer -->
            <template #footer>
                <Button
                    label="Cancel"
                    text
                    class="w-10rem border-round-lg"
                    severity="success"
                    @click.prevent="close"
                    autofocus
                />
                <Button
                    outlined
                    severity="secondary"
                    class="w-10rem border-round-lg"
                    :label="loadingBtnEdit ? 'Saving...' : 'Create'"
                    :loading="loadingBtnEdit"
                    @click.prevent="
                        handleEditJobDescriptionsSubmit(!v$.$invalid)
                    "
                    autofocus
                />
            </template>
        </Dialog>
    </div>
</template>

<!-- Scripts of org-structure management base projects -->
<script>
import { required, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive } from "vue";
import managerJobPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/manageJobPositionDescriptionOrgStructureChartProjectLevelZeroHelper";
export default {
    props: {
        orgStrNameEditedId: {
            type: Object,
            required: true,
            default: () => {},
        },
        dialog: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    computed: {
        openDialogs() {
            return this.dialog ? this.dialog : false;
        },
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

    methods: {
        close() {
            this.$emit("close-dialog");
        },
        async handleEditStructureOrgProChartSubmit(validate) {
            try {
                this.submitted = true;
                this.loadingBtnEdit = true;
                this.v$.$touch();
                setTimeout(async () => {
                    this.loadingBtnEdit = false;
                    if (!validate) {
                        const isFormCorrect = await this.v$.$validate();
                        if (isFormCorrect !== true || isFormCorrect == false) {
                            this.$toast.add({
                                severity: "error",
                                summary: "Please Fix Below Errors.",
                                detail: "Please input filed position description form have missing value!",
                                life: 3000,
                            });
                            return false;
                        }
                        return false;
                    }
                    // Check get value multiple inputs fields
                    // let objectPositionData;
                    const objInputPositionsFiled = this.state
                        ?.dyNamicAddNewFrmJobDes
                        ? this.state?.dyNamicAddNewFrmJobDes
                        : [];
                    for (
                        let index = 0;
                        index < objInputPositionsFiled.length;
                        index++
                    ) {
                        let objFiled = {};
                        console.log(objFiled);
                    }
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        onClickAddMorePositionDesOrgStructures() {
            try {
                this.loadingAddMoreFromPositionDes = true;
                setTimeout(() => {
                    this.loadingAddMoreFromPositionDes = false;
                    this.state.dyNamicAddNewFrmJobDes.push({
                        editNameEngProjectOrgStr: "",
                        editNameKhmerProjectOrgStr: "",
                        editDescriptionProjectOrgStr: "",
                    });
                }, 1000);
            } catch (error) {
                throw Error(error || error.message);
            }
        },
        removeJobDesOrgStructureByKey(index) {
            this.state.dyNamicAddNewFrmJobDes.splice(index, 1);
        },
        resetForm() {
            (this.state.editNameEngProjectOrgStr = ""),
                (this.proCategoryNameKh = ""),
                (this.submitted = false);
        },
    },
};
</script>
