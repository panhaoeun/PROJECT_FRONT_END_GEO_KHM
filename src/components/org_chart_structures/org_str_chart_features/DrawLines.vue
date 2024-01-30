<template>
    <svg class="graph" id="svg">
        <path
            v-for="line in lines"
            :key="line"
            :d="line.d"
            style="stroke: #b6b4b4; stroke-width: 2"
            fill="transparent"
        ></path>
    </svg>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "DrawLines",
    computed: {
        ...mapState("orgStrChart", ["lines"]),
    },
};
</script>
<style scoped>
.graph {
    width: 100%;
    height: 800px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
}
</style>
