<template>
    <!--Define Position of Hierarchy -->
    <div class="gap-2 flex my-2">
        <Button
            aria-label="Add Positions"
            class="border-round-lg w-15rem h-2.1rem"
            icon="pi pi-plus"
            outlined
            @click="openDialogAddPositionByOrgDept()"
            label="Add Positions"
        />
    </div>
    <!-- Dialogs Positions Department-->
    <Dialog
        v-model:visible="visibleDialogModelDeptOrg"
        modal
        header="Add New Positions"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :draggable="false"
        maximizable
        :pt="{
            mask: {
                style: 'backdrop-filter: blur(2px)',
            },
        }"
    >
        <!-- Add Form Dialogs Positions -->
        <form id="addFormPositionsDepartment">
            <div class="flex-wrap gap-3 p-fluid">
                <div class="grid formgrid">
                    <!-- Departments -->
                    <div class="col-6 field">
                        <div class="field">
                            <label for="proKh" class="text-sm">
                                Department
                                <span class="p-error">*</span>
                            </label>
                            <TreeSelect
                                v-model="v$.selectedDeptOrgCountry.$model"
                                :class="{
                                    'p-invalid border-round-lg border-round-lg p-error':
                                        v$.selectedDeptOrgCountry.$invalid &&
                                        submitted,
                                }"
                                filter
                                showClear
                                :options="getAllOrgStrDeptCountry"
                                aria-labelledby="orgDeptId"
                                placeholder="Select Department..."
                                aria-describedby="orgDeptId"
                                selectionMode="single"
                                display="comma"
                                emptyMessage="No result found department..."
                                class="border-round-lg border-round-lg w-full"
                            />
                            <small
                                v-if="
                                    (v$.selectedDeptOrgCountry.$invalid &&
                                        submitted) ||
                                    v$.selectedDeptOrgCountry.$pending.$response
                                "
                                class="p-error"
                            >
                                {{
                                    v$.selectedDeptOrgCountry.required.$message.replace(
                                        "Value",
                                        "Department"
                                    )
                                }}
                            </small>
                        </div>
                    </div>
                    <!-- Positions -->
                    <div class="col-6 field">
                        <div class="field">
                            <label for="proKh" class="text-sm">
                                Parent Position
                                <span class="p-error">*</span>
                            </label>
                            <TreeSelect
                                v-model="selectedDeptOrgStrLevel"
                                filter
                                showClear
                                :options="getAllPositionOrgStr"
                                aria-labelledby="orgMgrPosId"
                                placeholder="Select Position..."
                                aria-describedby="orgMgrPosId"
                                selectionMode="single"
                                display="comma"
                                emptyMessage="No result found position..."
                                class="border-round-lg border-round-lg w-full"
                            />
                            <small class="text-sm flex text-blue-600"
                                >Leave it blank to create parent position</small
                            >
                        </div>
                    </div>
                    <div class="col-6 field">
                        <div class="field">
                            <label for="PositionName" class="text-sm">
                                Position Name
                                <span class="p-error">*</span>
                            </label>
                            <InputText
                                id="position_name"
                                placeholder="Position Name"
                                type="text"
                                class="py-2 border-round-lg text-sm"
                                v-model="v$.orgDeptPositionName.$model"
                                :class="{
                                    'p-invalid p-error':
                                        v$.orgDeptPositionName.$invalid &&
                                        submitted,
                                }"
                            />
                            <small
                                v-if="
                                    (v$.orgDeptPositionName.$invalid &&
                                        submitted) ||
                                    v$.orgDeptPositionName.$pending.$response
                                "
                                class="p-error"
                            >
                                {{
                                    v$.orgDeptPositionName.required.$message.replace(
                                        "Value",
                                        "Position Name"
                                    ) || v$.orgDeptPositionName.$params.min
                                }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <!-- Footer Add New -->
        <template #footer>
            <Button
                label="No"
                icon="pi pi-times"
                @click="closeDialogAddPostDeptOrg()"
                text
            />
            <Button
                :label="loadingDeptOrgBtn ? 'Save...' : 'Create'"
                class="w-7rem"
                severity="info"
                icon="pi pi-file-import"
                autofocus
                :loading="loadingDeptOrgBtn"
                @click.prevent="
                    handleSubmittedNewPositionByDeptOrgCountry(!v$.$invalid)
                "
            />
        </template>
    </Dialog>
</template>

<!-- Script of add dialog position departments -->
<script>
import geoOrgStrDeptPosHelper from "@/mixin/manage_geo_org_str/org_pos_geo_str/geoOrgStrDeptPositionCountryHelper";
import useSubmitButtonState from "@/modules/useSubmitButtonState";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
    name: "DialogAddByPositionsCountry",
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            visibleDialogModelDeptOrg: false,
            loadingDeptOrgBtn: false,
            submitted: false,
            optionsDeptObjOrgSL: [],
            // Form Submitted
            orgDeptPositionName: "",
            selectedDeptOrgCountry: null,
            descriptionDepartmentPos: "",
            selectedDeptOrgStrLevel: null,
        };
    },
    mixins: [geoOrgStrDeptPosHelper],
    props: {
        projectIdDepOrgStr: {
            type: Number,
            default: 0,
        },
        geoDeptCountryId: {
            type: Number,
            default: 0,
        },
    },
    //Validations
    validations() {
        return {
            selectedDeptOrgCountry: {
                required,
            },
            orgDeptPositionName: {
                required,
                minLength: minLength(3),
            },
        };
    },
    computed: {
        ...mapGetters("orgDeptStrCou", ["allGeoDeptOrg"]),
        disabledBtnAdd() {
            const { isSubmitButtonDisabled } = useSubmitButtonState(this.$data);
            return isSubmitButtonDisabled;
        },
        getAllOrgStrDeptCountry() {
            const getOrgStrDept = this.allGeoDeptOrg ? this.allGeoDeptOrg : [];
            return getOrgStrDept;
        },
    },
    methods: {
        openDialogAddPositionByOrgDept() {
            this.visibleDialogModelDeptOrg = true;
            this.fetchingDataGeoCountryOrgStrPosition();
        },
        closeDialogAddPostDeptOrg() {
            this.visibleDialogModelDeptOrg = false;
        },
        handleSubmittedNewPositionByDeptOrgCountry(validate) {
            this.addNewGeoOrgDeptBaseOnPositionLevelCountry(validate);
        },
    },
};
</script>
