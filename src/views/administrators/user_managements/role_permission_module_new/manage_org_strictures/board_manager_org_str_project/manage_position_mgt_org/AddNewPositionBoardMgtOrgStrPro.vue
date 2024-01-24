<template>
    <Button
        aria-label="Add Positions"
        severity="help"
        class="border-round-sm w-10rem h-2rem text-sm"
        outlined
        label="Add New Position"
        @click="openDialogsAddPositionBoardMgtOrgPro()"
    />
    <!-- Dialog Departments -->
    <Dialog
        v-model:visible="visibleDialogAddPositionBoardMgt"
        modal
        :style="{ width: '30rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <template #header>
            <div
                class="inline-flex align-items-center justify-content-center gap-2"
            >
                <span class="font-bold white-space-nowrap"
                    >Add New Position</span
                >
            </div>
        </template>
        <!-- Content Department Add New -->
        <div
            class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
        >
            <div class="pop-over-content p-20 p-sm-15 card">
                <!-- Departments -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label> Parent Positions </label>
                        <TreeSelect
                            v-model="selectedParentDeptOrgStrBoardMgt"
                            :options="getAllDeptOrgStrProvinceState"
                            aria-labelledby="parentDeptId"
                            placeholder="Select Positions..."
                            aria-describedby="parentDeptId"
                            selectionMode="single"
                            display="comma"
                            emptyMessage="No result found position..."
                            filter
                            showClear
                            class="border-round-lg border-round-lg w-full"
                        />
                        <small class="text-sm flex text-blue-600"
                            >Leave it blank to create parent position</small
                        >
                    </div>
                </div>
                <!-- Positions Name -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label
                            :class="{
                                'p-invalid border-round-lg border-round-lg p-error':
                                    v$.orgDeptBoardMgtPositionName.$invalid &&
                                    submitted
                            }"
                        >
                            Position<span class="p-error">*</span>
                        </label>
                        <InputText
                            id="position_name"
                            placeholder="Please Enter Position"
                            :input="v$.orgDeptBoardMgtPositionName.$touch"
                            v-model="v$.orgDeptBoardMgtPositionName.$model"
                            :oninput="v$.orgDeptBoardMgtPositionName.$touch()"
                            :onblur="v$.orgDeptBoardMgtPositionName.$touch()"
                            :class="{
                                'p-invalid border-round-lg p-error':
                                    v$.orgDeptBoardMgtPositionName.$invalid &&
                                    submitted,
                            }"
                            type="text"
                            class="text-sm border-round-lg"
                        />
                        <small
                            v-if="
                                (v$.orgDeptBoardMgtPositionName.$invalid &&
                                    submitted) ||
                                v$.orgDeptBoardMgtPositionName.$pending
                                    .$response
                            "
                            class="p-error text-sm"
                            >{{
                                v$.orgDeptBoardMgtPositionName.required.$message.replace(
                                    "Value",
                                    "New Position"
                                )
                            }}
                        </small>
                    </div>
                </div>
                <!-- Descriptions -->
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <label>Descriptions</label>
                        <Textarea
                            v-model="orgDeptBoardMgtDescription"
                            placeholder="Descriptions"
                            rows="5"
                            cols="30"
                        />
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button
                label="Cancel"
                @click="cancelAddBoardMgtOrgStr()"
                outlined
            />
            <Button
                :label="loadingSubmittedPosMgtStr ? 'Save..' : 'Create'"
                :loading="loadingSubmittedPosMgtStr"
                icon="pi pi-save"
                severity="danger"
                class="w-8rem"
                @click="submittedAddNewBoardMgtOrgStrPro(!v$.$invalid)"
                autofocus
            />
        </template>
    </Dialog>
</template>
<!-- Manager Position base Board Mgt -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import manageOrgStrMgtPositionHelper from "@/mixin/manage_geo_org_str/manage_org_geo_str_mgt_dept_pos/manage_mgt_pos_org_str/manageOrgStrMgtPositionHelper";
export default {
    components: {},
    props: {},
    data() {
        return {
            orgDeptBoardMgtPositionName: "",
            orgDeptBoardMgtDescription: "",
            visibleDialogAddPositionBoardMgt: false,
            loadingSubmittedPosMgtStr: false,
            submitted: false,
        };
    },
    validations() {
        return {
            orgDeptBoardMgtPositionName: {
                required,
                minLength: minLength(3),
            },
        };
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    mixins: [manageOrgStrMgtPositionHelper],
    created() {},
    methods: {
        cancelAddBoardMgtOrgStr() {
            this.visibleDialogAddPositionBoardMgt = false;
        },
        openDialogsAddPositionBoardMgtOrgPro() {
            this.visibleDialogAddPositionBoardMgt = true;
        },
    },
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
