<template>
    <div class="layout-content">
        <Toast />
        <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
            <div class="col-12 lg:col-12 text-sm">
                <div class="grid formgrid">
                    <!--List Positions Assign to org-structure-->
                    <div class="col-12 field px-2 py-2">
                        <list-datable-global-position-org-chart-structure
                            positionData=""
                        />
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
import ListDatableGlobalPositionOrgChartStructure from "../../../ListDatableGlobalPositionOrgChartStructure.vue";
import managerPositionOrgStructureProjectLevelZeroHelper from "@/mixin/manage_geo_org_str/manage_org_structure_new_feature_dev/managePositionOrgStructureChartProjectLevelZeroHelper";
export default {
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
    data() {
        return {
            loadingBtnEdit: false,
            loadingAddMoreFrom: false,
            submitted: false,
            editNameEngProjectOrgStr: "",
            editNameKhmerProjectOrgStr: "",
            editDescriptionProjectOrgStr: "",
            dyNamicAddNewFrm: [
                {
                    editNameEngProjectOrgStr: "",
                    editNameKhmerProjectOrgStr: "",
                    editDescriptionProjectOrgStr: "",
                },
            ],
            orgPositionLevel: "GL01",
        };
    },
    mixins: [managerPositionOrgStructureProjectLevelZeroHelper],
    components: {
        ListDatableGlobalPositionOrgChartStructure,
    },
    methods: {
        onClickAddMorePositionOrgStructures() {
            try {
                this.loadingAddMoreFrom = true;
                setTimeout(() => {
                    this.loadingAddMoreFrom = false;
                    this.state.dyNamicAddNewFrm.push({
                        editNameEngProjectOrgStr: "",
                        editNameKhmerProjectOrgStr: "",
                        editDescriptionProjectOrgStr: "",
                    });
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
};
</script>
