<template>
    <header :style="'background-color' + ':' + config.title.color">
        <div class="edit_indicator"></div>
    </header>
</template>
<!-- Config Pages Header Org.Structure -->
<script>
import { mapState, mapActions } from "vuex";
export default {
    components: {},
    computed: {
        ...mapState("orgStrChart", [
            "chart",
            "editMode",
            "config",
            "updatedOn",
        ]),
    },
    props: {},
    data() {
        return {
            infoOpen: false,
            editConfig: false,
        };
    },
    created() {},
    methods: {
        ...mapActions(["initZoom"]),
    },
};
</script>
<!-- Styles -->
<style scoped>
.header {
    width: 100%;
    height: 50px;
    color: white;
    text-align: center;
    font-size: 40px;
    font-weight: 500;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 2;
}
.screenshot1 {
    display: inline-block;
    box-sizing: content-box;
    position: absolute;
    top: 10px;
    left: 70px;
}
.screenshot,
.home {
    cursor: pointer;
}
.home1 a {
    color: white;
}
.home1 {
    display: inline-block;
    box-sizing: content-box;
    position: absolute;
    top: 10px;
    left: -50px;
}
.screenshot:hover,
.home:hover,
.info_icon:hover {
    border: 1px solid white;
}
.menu {
    position: absolute;
    top: 5px;
    left: 60px;
    font-size: 16px;
    width: 200px;
    text-align: left;
    padding: 10px;
}
.gh {
    position: absolute;
    right: 10px;
    top: 5px;
    width: 30px;
}
.info_icon {
    cursor: pointer;
}
.info {
    position: absolute;
    top: 0px;
    right: 20px;
}
.i-github {
    position: relative;
}
.i-github:hover {
    background-color: lightgrey;
}
.i-github-text {
    padding: 10px;
    display: inline-block;
    font-size: 20px;
    color: grey;
}

.info-text {
    width: 300px;
    font-size: 14px;
    color: grey;
    background-color: white;
    border: 1px solid lightgrey;
    position: absolute;
    top: 40px;
    right: 20px;
    box-shadow: 2px 2px 2px grey;
}
.info-close {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    font-size: 14px;
}
.i-text {
    padding: 10px;
}
.edit_indicator {
    position: absolute;
    top: 50px;
    right: 0px;
    font-size: 16px;
    background-color: red;
    padding: 5px;
    cursor: pointer;
}

.updated_info {
    font-size: 12px;
    color: grey;
    padding: 5px;
}
</style>
