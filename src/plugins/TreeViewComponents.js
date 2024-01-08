/**
 * Install Tree View 05-Jan-2023.
 */
import VTreeView from "../components/tree_view_items/TreeViewComponents.vue";

VTreeView.install = function (app) {
    app.component('v-tree-view', VTreeView);
}
// if (typeof window !== 'undefined' && window.Vue) {
//     window.Vue.use(VJstree);
// }

export default VTreeView;