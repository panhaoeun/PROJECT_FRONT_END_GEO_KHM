<template>
    <table>
        <tbody>
            <tr>
                <td
                    :colspan="
                        datasource.children && datasource.children.length
                            ? datasource.children.length * 2
                            : null
                    "
                >
                    <div
                        class="node"
                        :id="datasource.id"
                        @click.stop="handleClick(datasource)"
                    >
                        <slot :node-data="datasource">
                            <div class="title">
                                <div class="avatar">
                                    <avatar-icons-org-chart
                                        sizeHeight="70"
                                        sizeWidth="70"
                                    />
                                </div>
                                <span class="mr-10 p-10">{{
                                    String(datasource.name).toUpperCase() ?? ""
                                }}</span>
                            </div>
                            <div class="content">
                                <h6 class="text-sm">
                                    {{ String(datasource.department) ?? "" }}
                                </h6>
                                <span class="">
                                    {{ datasource.position }}
                                </span>
                            </div>
                        </slot>
                    </div>
                </td>
            </tr>
            <template v-if="datasource.children && datasource.children.length">
                <tr class="lines">
                    <td :colspan="datasource.children.length * 2">
                        <div class="downLine"></div>
                    </td>
                </tr>
                <tr class="lines">
                    <td class="rightLine"></td>
                    <template
                        v-for="n in datasource.children.length - 1"
                        :key="n"
                    >
                        <td class="leftLine topLine"></td>
                        <td class="rightLine topLine"></td>
                    </template>
                    <td class="leftLine"></td>
                </tr>
                <tr class="nodes">
                    <td
                        colspan="2"
                        v-for="child in datasource.children"
                        :key="child.id"
                    >
                        <node :datasource="child" :handle-click="handleClick">
                            <!-- {{ scopedSlots }} -->
                            <!-- <template
                                v-for="slot in Object.keys(scopedSlots)"
                                :v-slot="slot"
                            >
                                <slot :name="slot" v-bind="scope" />
                            </template> -->
                        </node>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>
<!-- Script -->
<script>
import AvatarIconsOrgChart from "./AvatarIconsOrgChart.vue";
export default {
    name: "node",
    components: {
        AvatarIconsOrgChart,
    },
    props: {
        datasource: Object,
        handleClick: Function,
    },
    data() {
        return {};
    },
    created() {},
    methods: {},
    mounted() {},
};
</script>
