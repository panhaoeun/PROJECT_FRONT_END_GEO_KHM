<template>
    <KeepAlive>
        <div class="pl-2 gap-2 flex align-items-center justify-content-center">
            <Button
                aria-label="Add Position By Country"
                class="border-round-lg w-1rem h-1rem"
                icon="pi pi-plus"
                outlined
                @click="showDialogAddNewGloOrgStrBoardMgt()"
            />
        </div>
    </KeepAlive>
    <!-- Dialogs Add New Mgt Board Org-->
    <Dialog
        v-model:visible="visibleDialogOrgStrBoard"
        maximizable
        modal
        :style="{ width: '80rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <template #header>
            <div
                class="inline-flex align-items-center justify-content-center gap-2"
            >
                <span class="font-bold white-space-nowrap">
                    Manage Parent Level 01 (Root Level)
                </span>
            </div>
        </template>
        <!-- Form Submitted -->
        <div
            class="shipping-rule mb-20 mb-sm-15 border-1 border-primary-100 border-round gap-15"
        >
            <div class="pop-over-content p-20 p-sm-15 card">
                <div class="flex gap-15">
                    <div class="input-wrap flex-1">
                        <!--Add New Org-Structure Board Mgt-->
                        <PopupAddNewParentRootBoardOrgStrMgt />
                    </div>
                </div>
                <!-- Add Manage Org Chat-Multiple Level -->
                <div class="grid formgrid">
                    <el-table
                        height="500"
                        :data="getAllOrgDept"
                        style="width: 100%; margin-bottom: 20px"
                        row-key="orgDeptId"
                        border
                        highlight-current-row
                        :tree-props="{
                            children: 'children',
                            hasChildren: 'hasChildren',
                        }"
                    >
                        <el-table-column
                            label="SL"
                            type="index"
                            index="return index + 1"
                            width="50"
                        />
                        <el-table-column
                            prop="label"
                            label="Org Stricture Name"
                            sortable
                        />
                        <el-table-column prop="orgDeptName" label="Actions">
                            <template #default="scope">
                                <div class="flex flex-wrap gap-2">
                                    <Button
                                        icon="pi pi-pencil"
                                        aria-label="Edit Org Dept"
                                        outlined
                                        @click="
                                            editGeoOrgDeptProvince(scope.row)
                                        "
                                        rounded
                                        class="w-2 h-2 p-button-sm text-sm"
                                        label="Edit"
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        aria-label="Edit Org Dept"
                                        outlined
                                        @click="
                                            removeDeptOrgByProvincePopup(
                                                scope.row
                                            )
                                        "
                                        rounded
                                        class="w-3 h-2 p-button-sm text-sm text-danger"
                                        label="Delete"
                                    />
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <template #footer>
            <Button
                label="Cancel"
                class="w-6rem"
                @click="cancelAddNewOrgStrBoardMgt()"
                outlined
            />
        </template>
    </Dialog>
</template>
<!-- Script of global-org-str-board-mgt parent(Root) -->
<script>
import PopupAddNewParentRootBoardOrgStrMgt from "./popup_add_org_chart_boat_mgt/PopupAddNewParentRootBoardOrgStrMgt.vue";
export default {
    components: {
        PopupAddNewParentRootBoardOrgStrMgt,
    },
    props: {},
    data() {
        return {
            visibleDialogOrgStrBoard: false,
        };
    },
    created() {},
    methods: {
        showDialogAddNewGloOrgStrBoardMgt() {
            this.visibleDialogOrgStrBoard = true;
        },
        cancelAddNewOrgStrBoardMgt() {
            this.visibleDialogOrgStrBoard = false;
        },
    },
    mounted() {},
};
</script>
<style scoped></style>
<style lang="scss" scoped></style>
