<template>
    <div class="flex">
        <!--Org.Structures Chart-->
        <div id="chart">
            <div class="chart-container">
                <show-hierarchy-dept-level :parent="chart" :level="1" />
                <draw-line v-if="chart" />
                <view-menu v-if="showViewMenu" /> 
            </div>
        </div>
    </div>
</template>

<!-- Organization Chart (Manage Org.structures) -->
<script>
import ShowHierarchyDeptLevel from "./ShowHierarchyDeptLevel.vue";
import DrawLine from "./DrawLines.vue";
import ViewMenu from "./ViewMenu.vue";
import { mapState, mapActions } from "vuex";
export default {
    components: {
        ShowHierarchyDeptLevel,
        DrawLine,
        ViewMenu,
    },
    data() {
        return {
            dataArr: this.chart,
            data: {
                tree: null,
                cancelScroll: null,
                scrollOptions: {
                    container: "body",
                    easing: "ease-in",
                    offset: -500,
                    force: true,
                    cancelable: true,
                    onStart: function (element) {
                        console.log(element);
                        // scrolling started
                    },
                    onDone: function (element) {
                        // scrolling is done
                        console.log(element);
                    },
                    onCancel: function () {
                        // scrolling has been interrupted
                    },
                    x: true,
                    y: true,
                },
            },
        };
    },
    computed: {
        ...mapState("orgStrChart", [
            "chart",
            "options",
            "showEditMenu",
            "showViewMenu",
            "moveDepartment",
            "columnView",
            "columnView_noStaff",
            "activeDepartment",
        ]),
        getAllChart() {
            return JSON.parse(JSON.stringify(this.chart));
        },
    },
    watch: {
        activeDepartment: function (val) {
            console.log(val);
        },
    },
    mounted: function () {
        setTimeout(() => {
            this.initZoom();
            this.$store.commit("orgStrChart/addLine");
        }, 500);
    },
    methods: {
        ...mapActions("orgStrChart", ["initZoom"]),
    },
};
</script>

<!--Styles Org.Structures Chart-->
<style scoped>
#chart {
    position: relative;
    margin-left: 300px;
    padding: 10px;
    margin-top: 50px;
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
    min-width: 500px;
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
    /*box-shadow: 0px 0px 25px 3px lightgrey;*/

    background-color: white;
    /*cursor: grab;*/
}
.arrow {
    font-size: 30px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    margin: -8px;
}
.chart-container {
    margin: auto;
    display: inline-block;
}
.down {
    cursor: zoom-in;
}
.up {
    cursor: zoom-out;
}
</style>
