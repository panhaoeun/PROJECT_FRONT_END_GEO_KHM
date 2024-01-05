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
            <!-- Tree Views -->
            <!-- <v-tree-view
                :data="data"
                :item-events="itemEvents"
                show-checkbox
                multiple
                allow-batch
                whole-row
                draggable
                @item-click="itemClick"
                @item-drag-start="itemDragStart"
                @item-drag-end="itemDragEnd"
                @item-drop-before="itemDropBefore"
                @item-drop="itemDrop"
                ref="tree"
            >
            </v-tree-view> -->
            <!-- Tree Views -->
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
            data: [
                    {
                        "text": "Same but with checkboxes",
                        "children": [
                            {
                                "text": "initially selected",
                                "selected": true
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-danger"
                            },
                            {
                                "text": "initially open",
                                "icon": "fa fa-folder icon-state-default",
                                "opened": true,
                                "children": [
                                    {
                                        "text": "Another node"
                                    }
                                ]
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-warning"
                            },
                            {
                                "text": "disabled node",
                                "icon": "fa fa-check icon-state-success",
                                "disabled": true
                            }
                        ]
                    },
                    {
                        "text": "Same but with checkboxes",
                        "opened": true,
                        "children": [
                            {
                                "text": "initially selected",
                                "selected": true
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-danger"
                            },
                            {
                                "text": "initially open",
                                "icon": "fa fa-folder icon-state-default",
                                "opened": true,
                                "children": [
                                    {
                                        "text": "Another node"
                                    }
                                ]
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-warning"
                            },
                            {
                                "text": "disabled node",
                                "icon": "fa fa-check icon-state-success",
                                "disabled": true
                            }
                        ]
                    },
                    {
                        "text": "And wholerow selection"
                    },
                    {
                        "text": "drag disabled",
                        "icon": "fa fa-warning icon-state-danger",
                        "dragDisabled": true
                    },
                    {
                        "text": "drop disabled",
                        "icon": "fa fa-warning icon-state-danger",
                        "dropDisabled": true
                    }
                ],
        };
    },
    methods: {},
};
</script>
