<template>
    <div class="layout-content">
        <Toast />
        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
            <div class="col-12 lg:col-12 text-sm">
                <div class="grid formgrid">
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
import ListDatableGlobalPositionDescriptionOrgChartStructure from "../../../ListDatableGlobalPositionDescriptionOrgChartStructure.vue";
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
    methods: {
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
