<template>
    <div>
        <!-- Staff Children -->
        <table>
            <template v-if="!staffChildren.length">
                <tr>
                    <td>
                        <show-dept-box-hierarchy-level
                            :department-data="parent"
                            :level="level"
                            type="normal"
                        />
                        <!-- Parent Dept -->
                        <template
                            v-if="
                                columnView &&
                                (!parent.parent ||
                                    parent.parent.showChildren) &&
                                !parent.showChildren
                            "
                        >
                            <table
                                class="hierarchy-table"
                                v-if="!(parent.isStaff && columnView_noStaff)"
                            >
                                <tr
                                    v-for="child in parent.children"
                                    :key="child"
                                >
                                    <td class="hierarchy-td">
                                        <show-dept-box-hierarchy-level
                                            :department-data="child"
                                            :level="level + 1"
                                            type="column"
                                        />
                                    </td>
                                </tr>
                            </table>
                        </template>
                    </td>
                </tr>
            </template>
            <template v-else>
                <!-- Sub Dept -->
                <tr rowspan="2">
                    <td class="dept hierarchy-td">
                        <show-dept-box-hierarchy-level
                            :department-data="parent"
                            :level="level"
                            type="normal"
                        />
                        <template
                            v-if="
                                columnView &&
                                (!parent.parent ||
                                    parent.parent.showChildren) &&
                                !parent.showChildren
                            "
                        >
                            <table
                                class="hierarchy-table"
                                v-if="!(parent.isStaff && columnView_noStaff)"
                            >
                                <tr
                                    v-for="child in parent.children"
                                    :key="child"
                                >
                                    <td class="hierarchy-td">
                                        <show-dept-box-hierarchy-level
                                            :department-data="child"
                                            :level="level + 1"
                                            type="column"
                                        />
                                    </td>
                                </tr>
                            </table>
                        </template>
                    </td>
                </tr>
            </template>
            <!-- Staff -->
            <tr v-if="parent.showChildren">
                <!-- Staff Left -->
                <td>
                    <div class="staff-left">
                        <table>
                            <tr v-for="staff in staffChildren" :key="staff">
                                <td>
                                    <show-hierarchy-dept-level
                                        :parent="staff.left"
                                        :level="level + 1"
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
                <!-- Staff Right -->
                <td class="dept hierarchy-td">
                    <div class="staff-right">
                        <table>
                            <tr v-for="staff in staffChildren" :key="staff">
                                <show-hierarchy-dept-level
                                    :parent="staff.right"
                                    :level="level + 1"
                                />
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
        <!-- Tab of Staff Children -->
        <table class="tabchildren">
            <tr v-if="parent.showChildren">
                <td
                    class="tabchild"
                    v-for="child in hierarchyChildren"
                    :key="child"
                >
                    <show-hierarchy-dept-level
                        :parent="child"
                        :level="level + 1"
                        type="column"
                    />
                </td>
            </tr>
        </table>
    </div>
</template>

<!-- Hierarchy Dept Level -->
<script>
import { mapState } from "vuex";
import ShowDeptBoxHierarchyLevel from "./DeptBoxChartMgtOrg.vue";
export default {
    name: "ShowHierarchyDeptLevel",
    components: {
        ShowDeptBoxHierarchyLevel,
    },
    props: {
        parent: {
            type: Object,
            required: true,
            default: null,
        },
        level: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    data() {
        return {
            showChildren: false,
        };
    },
    computed: {
        ...mapState("orgStrChart", ["columnView", "columnView_noStaff"]),
        staffChildren() {
            if (this.parent.onlyShowThisChild) {
                return [];
            }
            const staff = this.parent.children.filter((e) => e.isStaff);
            const result = [];
            staff.forEach((e, i) => {
                if (i % 2 === 0) {
                    result.push({ left: e, right: null });
                } else {
                    result[result.length - 1].right = e;
                }
            });
            return result;
        },
        staffChildrenR() {
            return this.parent.children.filter((e, i) => {
                return e.isStaff && i % 2 === 0;
            });
        },
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
<!-- Styles Hierarchy Level Tree -->
<style scoped>
.hierarchy-table {
    table-layout: fixed;
    border: 0px solid green;
    margin: auto;
}
.hierarchy-td {
    border: 0px dashed rgba(100, 100, 100, 0.3);
    width: 30%;
}
.hierarchy-td.dept {
    width: 60px;
}
div.staff-left {
    float: right;
}
div.staff-right {
    float: left;
}
.container {
    display: inline-block;
    position: relative;
    margin: 20px 5px 10px 5px;
    text-align: center;
}
table.staff {
    margin: auto;
}
.parent {
    display: inline-block;
    border: 1px solid grey;
}
.child {
    display: inline-block;
}
.dept {
    border: 0px solid red;
}
table {
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0px;
    padding: 0px;
    border-collapse: collapse;
    box-sizing: border-box;
    border: 0px solid orange;
}
tr {
    box-sizing: border-box;
}
td {
    text-align: center;
    vertical-align: top;
    box-sizing: border-box;
}
.col {
    border: 1px solid red;
}
.tabchildren {
}
.tabchild {
    width: auto;
}
</style>
