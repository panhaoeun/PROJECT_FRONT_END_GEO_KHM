<template>
    <!--Manage Department Base Positions-->
    <div class="gird">
        <div class="col-12">
            <!--Define Position of Hierarchy -->
            <div
                class="pl-2 gap-2 flex align-items-center justify-content-center"
            >
                <Button
                    aria-label="Add Departments"
                    class="border-round-lg w-2rem h-2rem"
                    icon="pi pi-plus"
                    outlined
                />
            </div>
            <el-card class="box-card">
                <div class="clearfix">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column
                            prop="Id"
                            label="Id"
                            width="70"
                            sortable
                        >
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="Name"
                            width="280"
                            sortable
                        >
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="Detail"
                            width="280"
                            sortable
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </div>
    </div>
</template>

<!-- Script of JS -->
<script type="module">
export default {
    props: {
        tableData: Array,
    },
    data() {
        return {
            dialogFormVisible: false,
        };
    },
    methods: {},
};
</script>
