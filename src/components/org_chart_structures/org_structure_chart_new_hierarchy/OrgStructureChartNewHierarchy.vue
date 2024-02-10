<template>
    <!-- Open Dialogs Org-structure-->
    <Toast />
    <global-assign-position-dept-geo
        v-if="openDialogOrgStrChartAssignPosition"
        @close="closingPopupPositionOrgChart"
        dataOrgStrChartDept=""
    />
    <!-- DHX -->
    <section class="dhx-container">
        <div class="dhx-container_header">
            <div class="dhx_sample-container">
                <div class="dhx-container_inner" v-bind:class="classObject">
                    <div
                        class="dhx_sample-widget overflow_hidden"
                        ref="diagram"
                        v-show="collapsed"
                    ></div>
                    <div
                        class="dhx_sample-widget"
                        ref="editor"
                        v-show="expanded"
                    ></div>
                </div>
            </div>
        </div>
        <!-- Content Menu -->
        <!-- Tired Menu Popup -->
        <ContextMenu
            ref="menuOrgChart"
            id="overlay_menu"
            class="w-5rem md:w-15rem border-round"
            :model="items"
        />
    </section>
</template>
<!-- Hierarchy opened dialogs org-structure-->
<script>
import dhxRequire from "./formCDN";
import { medicalWorkers } from "./data";
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
                    this.$toast.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Invitation sent!",
                        life: 3000,
                    });
                },
            },
        ],
    }),
    mounted() {
        dhxRequire([
            "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.js",
            "https://cdn.dhtmlx.com/diagram/pro/edge/diagramWithEditor.css",
            "https://snippet.dhtmlx.com/codebase/assets/css/auxiliary_controls.css",
            "https://cdn.materialdesignicons.com/4.5.95/css/materialdesignicons.min.css",
        ]).then(() => {
            // eslint-disable-next-line no-undef
            this.diagram = new dhx.Diagram(this.$refs.diagram, {
                type: "org",
                defaultShapeType: "template",
                controls: {
                    apply: false, // hides/shows the Apply All button
                    reset: false, // hides/shows the Reset Changes button
                    import: false, // hides/shows the Import Data button
                    export: false, // hides/shows the Export Data button
                    gridStep: false, // hides/shows the Grid step sidebar option in the right panel of the editor
                },
            });
            // eslint-disable-next-line no-undef
            const template = ({ name, photo, post, phone, mail }) => `
                <div class="dhx_diagram_template_a_box dhx_diagram_template_a">
                    <div class="dhx_diagram_template_a__inside">
                        <div class="dhx_diagram_template_a__picture" style="background-image: url(${photo});"></div>
                        <div class="dhx_diagram_template_a__body">
                            <div class="dhx_diagram_template_a__title">${name}</div>
                            <div class="dhx_diagram_template_a__row">
                                <span class="dhx_diagram_template_a__text">${post}</span>
                            </div>
                            <div class="dhx_diagram_template_a__row">
                                <span class="dhx_diagram_template_a__icon mdi mdi-cellphone-android"></span>
                                <span class="dhx_diagram_template_a__text">${phone}</span>
                            </div>
                            <div class="dhx_diagram_template_a__row">
                                <span class="dhx_diagram_template_a__icon mdi mdi-email-outline"></span>
                                <span class="dhx_diagram_template_a__text">
                                    <a class="dhx_diagram_template_a__link" href="mailto:${mail}" target="_blank">${mail}</a>
                                </span>
                            </div>
                        </div>
                        <div class="toggle_container">
                            <img class="template_icon" src="https://snippet.dhtmlx.com/codebase/data/diagram/03/img/menu.svg" alt="toggle"></img>
                        </div>
                    </div>
                </div>
            `;
            // eslint-disable-next-line no-undef
            this.editor = new dhx.DiagramEditor(this.$refs.editor, {
                type: "org",
                shapeType: "template",
                controls: {
                    gridStep: true,
                },
            });
            // Add Shape
            this.diagram.addShape("template", {
                template: template,
                defaults: {
                    height: 115,
                    width: 330,
                },

                eventHandlers: {
                    onclick: {
                        toggle_container: this.show,
                    },
                },
            });
            this.editor.diagram.addShape("template", {
                template: template,
                defaults: {
                    title: "Name and First name",
                    post: "Position held",
                    phone: "(405) 000-00-00",
                    mail: "some@mail.com",
                    photo: "https://snippet.dhtmlx.com/codebase/data/img/avatars/big_img/big-avatar-1.jpg",

                    height: 115,
                    width: 330,
                },
                eventHandlers: {
                    onclick: {
                        toggle_container: this.show,
                    },
                },
            });
            this.editor.events.on("ApplyButton", () => {
                this.applyButton();
            });

            this.editor.events.on("ResetButton", () => {
                this.resetButton();
            });

            this.diagram.data.parse(medicalWorkers);
        });
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

<!-- Style of org-structure -->
<style>
.dhx_diagram_template_a_box {
    background-color: transparent;
}
.dhx_diagram_template_a_box {
    padding: 0;
    border: 1px solid #dfdfdf;
    background-color: #fff;
    overflow: hidden;
}
.dhx_diagram_template_a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 12px;
}
.dhx_diagram_template_a__inside {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
}
.dhx_diagram_template_a__picture {
    width: 90px;
    min-width: 90px;
    background: center center/cover no-repeat #f7f7f7;
}
.dhx_diagram_template_a__picture:before {
    content: "";
    display: block;
    padding-top: 100%;
}
.dhx_diagram_template_a__body {
    padding-left: 12px;
    min-width: 200px;
}
.dhx_diagram_template_a__title,
.dhx_diagram_template_a__text {
    font: normal 14px/20px Roboto, sans-serif;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.dhx_diagram_template_a__title {
    text-align: start;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 500;
}
.dhx_diagram_template_a__row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 4px 0;
}
.dhx_diagram_template_a__icon {
    font-size: 18px;
    margin-right: 4px;
    color: rgba(0, 0, 0, 0.7);
}
.dhx_diagram_template_a__text {
    color: rgba(0, 0, 0, 0.7);
}
.dhx_diagram_template_a__link {
    color: #0288d1;
}
.dhx_sample-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
    height: 60px;
    border-bottom: 1px solid #dfdfdf;
    font-family: Roboto, Arial, Tahoma, Verdana, sans-serif;
    font-size: 14px;
}
.dhx_sample-controls button:not(:last-child),
.dhx_sample-controls input:not(:last-child),
.dhx_sample-controls select:not(:last-child) {
    margin-right: 12px;
}
.dhx_sample-controls .dhx_form-group {
    margin: 0;
}
.dhx_sample-controls .dhx_form-group .dhx_label {
    padding-left: 6px;
    line-height: 24px;
    max-width: 100%;
}

.dhx-container_inner,
.dhx_sample-widget {
    height: 100%;
}

.dhx_sample-container__with-editor.dhx-container_inner,
.dhx_sample-container {
    height: calc(100% - 60px);
}

.dhx_sample-container__without-editor.dhx-container_inner {
    height: calc(100% - 120px);
}
.dhx_sample-controls {
    background: #fff;
}
.dhx_sample-combobox__container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
}
.dhx_combobox {
    margin: 0;
}
.dhx_selected .dhx_diagram_template_a_box {
    outline: 2px solid #8c8c8c;
}
.toggle_container {
    position: absolute;
    right: 2px;
    top: 10px;
    cursor: pointer;
    height: 20px;
    width: 20px;
}
.toggle_container .template_icon {
    height: 14px;
    width: 4px;
    margin: 0;
}
.dhx_diagram_template_a_box {
    background-color: transparent;
}
.dhx_diagram_template_a_box {
    padding: 0;
    border: 1px solid #dfdfdf;
    background-color: #fff;
    overflow: hidden;
}
.dhx_diagram_template_a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 12px;
}
.dhx_diagram_template_a__inside {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
}
.dhx_diagram_template_a__picture {
    width: 90px;
    min-width: 90px;
    background: center center/cover no-repeat #f7f7f7;
}
.dhx_diagram_template_a__picture:before {
    content: "";
    display: block;
    padding-top: 100%;
}
.dhx_diagram_template_a__body {
    padding-left: 12px;
    min-width: 200px;
}
.dhx_diagram_template_a__title,
.dhx_diagram_template_a__text {
    font: normal 14px/20px Roboto, sans-serif;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.dhx_diagram_template_a__title {
    text-align: start;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 500;
}
.dhx_diagram_template_a__row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 4px 0;
}
.dhx_diagram_template_a__icon {
    font-size: 18px;
    margin-right: 4px;
    color: rgba(0, 0, 0, 0.7);
}
.dhx_diagram_template_a__text {
    color: rgba(0, 0, 0, 0.7);
}
.dhx_diagram_template_a__link {
    color: #0288d1;
}
</style>
