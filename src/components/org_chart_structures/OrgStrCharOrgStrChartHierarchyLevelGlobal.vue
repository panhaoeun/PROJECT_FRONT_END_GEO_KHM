<template>
    <div class="p-container" v-on:mousemove.self="onMouseMove">
        <div class="container1" id="xparent">
            <org-str-chart-hierarchy-level-global v-if="chart" />
        </div>
    </div>
</template>
<!-- Script Multi-Dept Level -->
<script>
import OrgStrChartHierarchyLevelGlobal from "./org_str_chart_features/OrganizationStructuresChart.vue";
import { mapState, mapActions } from "vuex";
export default {
    components: {
        OrgStrChartHierarchyLevelGlobal,
    },
    props: {
        orgStrDataHierarchy: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            page: { left: 0, top: 0 },
        };
    },
    computed: {
        ...mapState("orgStrChart", [
            "geoOrgPositionOrg",
            "chart",
            "getValue",
            "activeDepartment",
            "onlyShowParents",
            "showEditMenu",
            "moveDepartment",
            "showPerson",
        ]),
        getStrOrg() {
            const jsonString = JSON.stringify(this.chart, (key, value) => {
                // Omit the 'parent' property during serialization
                if (key === "parent") {
                    return undefined;
                }
                return value;
            });
            return jsonString;
        },
        urlParam: function () {
            if (this.showPerson) {
                return { employee: this.showPerson.id };
            }
            if (!this.activeDepartment) {
                return null;
            }
            var parents;
            if (!this.activeDepartment.showParents) {
                parents = "hide";
            } else if (this.onlyShowParents) {
                parents = "only";
            } else {
                parents = "all";
            }
            var children = this.activeDepartment.showChildren ? "show" : "hide";
            return {
                dept: this.activeDepartment.id,
                parents: parents,
                children: children,
            };
        },
    },
    watch: {
        urlParam(qry) {
            this.setUrl(qry);
        },
    },
    mounted: function () {
        this.initStore();
        this.setHierarchyDataState();
        this.getUrl(this.$route.query);
    },
    methods: {
        ...mapActions("orgStrChart", [
            "initStore",
            "setActiveDepartmentById",
            "setActiveEmployeeById",
            "setHideParents",
            "setOnlyShowParents",
            "showChildren",
            "hierarchyTreeDataActions",
        ]),
        setHierarchyDataState: function () {
            this.hierarchyTreeDataActions(this.orgStrDataHierarchy);
        },
        onMouseMove(e) {
            const chartpos = document
                .getElementById("chart")
                .getBoundingClientRect();

            this.page.left = e.clientX - 0 * chartpos.left + 10;
            this.page.top = e.clientY - 0 * chartpos.top + 10;
        },
        setUrl: function (qry) {
            this.$router.push({ path: this.$route.path, query: qry });
        },
        getUrl: function (qry) {
            if (qry && qry.employee) {
                console.log(qry.employee);
                this.setActiveEmployeeById(qry.employee);
                return;
            }
            if (qry && qry.dept) {
                this.setActiveDepartmentById(qry.dept);
                if (qry.parents == "hide") {
                    this.setHideParents(true);
                } else if (qry.parents == "only") {
                    this.setOnlyShowParents(true);
                    this.setActiveDepartmentById(qry.dept);
                }
            }
            if (this.activeDepartment && qry.children == "show") {
                this.showChildren(this.activeDepartment);
            }
            if (!this.activeDepartment) {
                this.$router.push({ path: this.$route.path, query: null });
            }
        },
    },
};
</script>

<!-- Style Hierarchy Dept Level -->
<style>
#move_dept {
    position: absolute;
    width: 114px;
    height: 50px;
    margin: 4px 10px;
    text-align: center;
    font-size: 11px;
    vertical-align: middle;
    display: flex;
    border-radius: 3px;
    align-items: center; /* align vertical */

    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    padding: 2px 2px;
    box-sizing: border-box;
    top: 0px;
    left: 0px;
    border: 1px dashed #006696;
}
</style>
