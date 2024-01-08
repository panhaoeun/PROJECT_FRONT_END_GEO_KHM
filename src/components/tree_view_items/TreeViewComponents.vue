<template>
    <div role="tree">
        <ul role="group" class="tree">
            {{
                treeData
            }}
            <tree-item
                v-for="(child, index) in treeData"
                :key="index"
                :data="child"
                :menu="menu"
            ></tree-item>
        </ul>
    </div>
</template>

<!-- Script of Tree View Item -->
<script>
import { nextTick } from "vue";
import findIndex from "lodash";
import { getSortData } from "@/utils/tree_view/toolTreeView";
import CreateMenu from "@/utils/tree_view/createMenuTreeView";
import Emit from "@/utils/tree_view/eventTreeView";
import TreeItem from "./TreeViewItem.vue";

let TREE_ID = 1;

export default {
    name: "VTreeView",
    /**
     * data => Data Item Array
     * highlightCurrent => Whether to highlight the currently selected tree item
     * defaultExpandAll => Whether to fully expand
     */
    props: {
        data: {
            type: Array,
        },
        highlightCurrent: {
            type: Boolean,
            default: false,
        },
        defaultExpandAll: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectBarTop: 0,
            selectBarDisplay: "none",
            // formatted tree data
            treeData: [],
            // contextmenu select tree id
            targetTree: {},
            //custom menu
            menuTreeView: new CreateMenu([
                {
                    name: "Create new directory",
                    type: "folder",
                    onClick: function (e) {
                        const dir = {
                            id: TREE_ID++,
                            text: "unknown file",
                            opended: false,
                            selected: false,
                            children: [],
                            rename: true,
                        };
                        this.menuTreeView.hiddenMenu(e);

                        // Insert by location
                        const firstFileIndex = findIndex(
                            this.targetTree.children,
                            (tree) => !tree.children
                        );
                        this.targetTree.children?.splice(
                            firstFileIndex,
                            0,
                            dir
                        );
                        this.inputAutoFocus(dir.id);
                    },
                },
                {
                    name: "create a new file",
                    type: "folder",
                    onClick: function (e) {
                        const file = {
                            id: TREE_ID++,
                            text: "unknown file",
                            opended: false,
                            selected: false,
                            rename: true,
                        };
                        this.menu.hiddenMenu(e);
                        this.targetTree.children?.push(file);
                        this.inputAutoFocus(file.id);
                    },
                },
                {
                    name: "double naming",
                    type: "all",
                    onClick: function (e) {
                        this.menu.hiddenMenu(e);
                        this.targetTree.rename = !this.targetTree.rename;
                        this.inputAutoFocus(this.targetTree.id);
                    },
                },
                {
                    name: "delete",
                    type: "all",
                    onClick: function (e) {
                        this.menu.hiddenMenu(e);
                        this.targetTree.delete = !this.targetTree.delete;
                    },
                },
            ]),
        };
    },
    components: {
        TreeItem,
    },
    mounted() {
        // emit event
        Emit.on("contextMenu", this.onContextmenu);
        // Highlight the currently selected node
        if (this.highlightCurrent) {
            Emit.on("toggleSelectBar", this.toggleSelectBar);
        }
    },
    // watch props.data and format
    watch: {
        datTreeViewItem() {},
        // () => this.data,
        //     async (data) => {
        //         // To be optimized
        //         const newData = data?.map((item) => {
        //             const data = {
        //                 id: TREE_ID++,
        //                 text: item.text || "unknown file",
        //                 opended: this.defaultExpandAll || item.opended || false,
        //                 selected: item.selected || false,
        //                 children: item.children
        //                     ? this.formatItem(item.children, `${TREE_ID - 1}`)
        //                     : undefined,
        //                 rename: item.rename || false,
        //             };
        //             return data;
        //         });
        //         this.treeData = getSortData(newData);
        //     },
        //     {
        //         deep: true,
        //         immediate: true,
        //     };
    },
    methods: {
        formatItem(data, anchorID) {
            const newData = data.map((item) => {
                const newData = {
                    id: TREE_ID++,
                    anchorID,
                    text: item.text || "unknown file",
                    opended:
                        this.props.defaultExpandAll || item.opended || false,
                    selected: item.selected || false,
                    children: item.children
                        ? this.formatItem(
                              item.children,
                              `${anchorID}-${TREE_ID - 1}`
                          )
                        : undefined,
                    rename: item.rename || false,
                };

                return newData;
            });
            return getSortData(newData);
        },
        inputAutoFocus(treeID) {
            nextTick(() => {
                const input = document.getElementById(`${treeID}`);
                input?.focus();
            });
        },
        // create custom contextmenu
        onContextmenu(e, data) {
            e.preventDefault();
            this.targetTree = data ? data : {};
            data.children
                ? this.menuTreeView.showMenu(e, "floder")
                : this.menuTreeView.showMenu(e, "file");
        },
        // toggle selectBar
        toggleSelectBar(e, display) {
            this.selectBarTop = e.target.offsetTop;
            this.selectBarDisplay = display;
        },
    },
};
</script>

<!-- Tree View Styles-->
<style lang="scss">
@import "./scss_tree/styles.scss";
</style>
