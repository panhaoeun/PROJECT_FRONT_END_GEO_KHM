<template>
    <!-- Open Dialogs Org-structure-->
    <Toast />
    <global-assign-position-dept-geo
        v-if="openDialogOrgStrChartAssignPosition"
        @close="closingPopupPositionOrgChart"
        dataOrgStrChartDept=""
    />
    <!-- DHX -->
    <section>
        <highcharts :options="chartOptions"></highcharts>
    </section>
</template>
<!-- Hierarchy opened dialogs org-structure-->
<script>
import dhxRequire from "./formCDN";
// import { workers } from "./data";
import GlobalAssignPositionDeptGeo from "./GlobalAssignPositionDeptGeo";
export default {
    name: "OrgChartEditorCustomShape",
    components: {
        GlobalAssignPositionDeptGeo,
    },
    props: {
        orgStrData: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    data: () => ({
        openDialogOrgStrChartAssignPosition: false,
        diagram: null,
        editor: null,
        contextMenu: null,
        collapsed: true,
        expanded: false,
        items: [
            {
                label: "Position",
                icon: "pi pi-briefcase",
            },
            {
                label: "Manager",
                icon: "pi pi-user-plus",
                command: () => {
                    console.log(this.openPopupDialogOrgStructureChartAssPos);
                },
            },
        ],
        chartOptions: {
            chart: {
                height: 600,
                inverted: true,
            },
            title: {
                text: "Highcharts Org Chart",
            },

            accessibility: {
                point: {
                    descriptionFormat:
                        "{add index 1}. {toNode.name}" +
                        "{#if (ne toNode.name toNode.id)}, {toNode.id}{/if}, " +
                        "reports to {fromNode.id}",
                },
            },
            series: [
                {
                    type: "organization",
                    name: "Highsoft",
                    keys: ["from", "to"],
                    data: [
                        ["Shareholders", "Board"],
                        ["Board", "CEO"],
                        ["CEO", "CTO"],
                        ["CEO", "CPO"],
                        ["CEO", "CSO"],
                        ["CEO", "HR"],
                        ["CTO", "Product"],
                        ["CTO", "Web"],
                        ["CSO", "Sales"],
                        ["HR", "Market"],
                        ["CSO", "Market"],
                        ["HR", "Market"],
                        ["CTO", "Market"],
                    ],
                    levels: [
                        {
                            level: 0,
                            color: "silver",
                            dataLabels: {
                                color: "black",
                            },
                            height: 25,
                        },
                        {
                            level: 1,
                            color: "silver",
                            dataLabels: {
                                color: "black",
                            },
                            height: 25,
                        },
                        {
                            level: 2,
                            color: "#980104",
                        },
                        {
                            level: 4,
                            color: "#359154",
                        },
                    ],
                    nodes: [
                        {
                            id: "Shareholders",
                        },
                        {
                            id: "Board",
                        },
                        {
                            id: "CEO",
                            title: "CEO",
                            name: "Atle Sivertsen",
                            image: "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2022/06/30081411/portrett-sorthvitt.jpg",
                        },
                        {
                            id: "HR",
                            title: "CFO",
                            name: "Anne Jorunn Fjærestad",
                            color: "#007ad0",
                            image: "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg",
                        },
                        {
                            id: "CTO",
                            title: "CTO",
                            name: "Christer Vasseng",
                            image: "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg",
                        },
                        {
                            id: "CPO",
                            title: "CPO",
                            name: "Torstein Hønsi",
                            image: "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131213/Highsoft_03998_.jpg",
                        },
                        {
                            id: "CSO",
                            title: "CSO",
                            name: "Anita Nesse",
                            image: "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg",
                        },
                        {
                            id: "Product",
                            name: "Product developers",
                        },
                        {
                            id: "Web",
                            name: "Web devs, sys admin",
                        },
                        {
                            id: "Sales",
                            name: "Sales team",
                        },
                        {
                            id: "Market",
                            name: "Marketing team",
                            column: 5,
                        },
                    ],
                    colorByPoint: false,
                    color: "#007ad0",
                    dataLabels: {
                        color: "white",
                    },
                    borderColor: "white",
                    nodeWidth: 65,
                },
            ],
            tooltip: {
                outside: true,
            },
            exporting: {
                allowHTML: true,
                sourceWidth: 800,
                sourceHeight: 600,
            },
        },
    }),
    mounted() {
        dhxRequire([
            "https://code.highcharts.com/highcharts.js",
            "https://cdn.jsdelivr.net/npm/highcharts-vue@1.3.5/dist/highcharts-vue.min.js",
        ]).then(() => {});
    },
    methods: {
        /**
         * @Open Dialogs Position and Manager(Employee)
         * */
        closingPopupPositionOrgChart() {
            this.openDialogOrgStrChartAssignPosition = false;
        },
        openPopupDialogOrgStructureChartAssPos() {
            this.openDialogOrgStrChartAssignPosition = true;
        },
        runEditor() {
            this.expanded = true;
            this.collapsed = false;
            this.editor.import(this.diagram);
        },
        applyButton() {
            this.collapsed = true;
            this.expanded = false;
            this.diagram.data.parse(this.editor.serialize());
        },
        resetButton() {
            this.collapsed = true;
            this.expanded = false;
        },
        // Show Dialog Buttons
        show(event, shape) {
            // eslint-disable-next-line no-undef
            this.$refs.menuOrgChart.show(event);
            console.log(shape, this.$refs);
            event.preventDefault();
        },
    },
    computed: {
        classObject: function () {
            return {
                "dhx_sample-container__with-editor":
                    this.expanded && !this.collapsed,
                "dhx_sample-container__without-editor":
                    this.collapsed && !this.expanded,
            };
        },
    },
    beforeUnmount() {
        if (this.diagram) {
            this.diagram.destructor();
        }
    },
};
</script>

<!--Style of org-structure -->
<style>
.highcharts-figure,
.highcharts-data-table table {
    min-width: 360px;
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}

#container h4 {
    text-transform: none;
    font-size: 14px;
    font-weight: normal;
}

#container p {
    font-size: 13px;
    line-height: 16px;
}

@media screen and (max-width: 600px) {
    #container h4 {
        font-size: 2.3vw;
        line-height: 3vw;
    }

    #container p {
        font-size: 2.3vw;
        line-height: 3vw;
    }
}
</style>
