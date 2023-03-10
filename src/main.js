import { createApp } from 'vue'
import App from './App.vue'
window.$ = window.jQuery = require("jquery");
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {dom, library} from '@fortawesome/fontawesome-svg-core';
import { fas, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svcg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faGooglePlus} from '@fortawesome/free-brands-svg-icons';

//import adminlte scripts
import "../node_modules/admin-lte/dist/js/adminlte.min.js"
import "../node_modules/admin-lte/plugins/select2/js/select2.full.min.js"
import "../node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js"
import "../node_modules/admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"
//import "../node_modules/admin-lte/plugins/summernote/summernote-bs4.min.js"
//import "../node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"
import "../node_modules/admin-lte/plugins/daterangepicker/daterangepicker.js"
//mport "../node_modules/admin-lte/plugins/moment/moment.min.js"
import "../node_modules/admin-lte/plugins/jquery-knob/jquery.knob.min.js"
//import "../node_modules/admin-lte/plugins/jqvmap/maps/jquery.vmap.usa.js"
//import "../node_modules/admin-lte/plugins/jqvmap/jquery.vmap.min.js"
import "../node_modules/admin-lte/plugins/sparklines/sparkline.js"
//import "../node_modules/admin-lte/plugins/chart.js/Chart.min.js"
import "../node_modules/admin-lte/plugins/jquery/jquery.min.js"
import "../node_modules/admin-lte/plugins/jquery-ui/jquery-ui.min.js"
import "../node_modules/admin-lte/plugins/inputmask/jquery.inputmask.min.js"
//import "../node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"
import "../node_modules/admin-lte/plugins/bootstrap-switch/js/bootstrap-switch.min.js"
import "../node_modules/admin-lte/plugins/bs-stepper/js/bs-stepper.min.js"
import "../node_modules/admin-lte/plugins/dropzone/min/dropzone.min.js"
//import adminlte styles
import './assets/styles/adminlte.min.css'
import "../node_modules/admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css"
import "../node_modules/admin-lte/plugins/summernote/summernote-bs4.min.css"
import "../node_modules/admin-lte/plugins/daterangepicker/daterangepicker.css"
import "../node_modules/admin-lte/plugins/jqvmap/jqvmap.min.css"
import "../node_modules/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css"
import "../node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"
import "../node_modules/admin-lte/plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css"
import "../node_modules/admin-lte/plugins/bs-stepper/css/bs-stepper.min.css"
import "../node_modules/admin-lte/plugins/dropzone/min/dropzone.min.css";

import 'element-plus/dist/index.css'

//New import
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

// Import Style
import "./assets/styles/style.css";
import "./assets/styles/account-tab.css";
import "./assets/styles/navbar.css";
/* @Routes */
import routes from "./routes/routes";
library.add(fas, fab, far, faLock, faEnvelope, faFacebook, faGooglePlus, faShoppingCart);
dom.watch()
/* @Prime Vue*/ 
import './assets/primeflex.scss';
import "primevue/resources/themes/saga-blue/theme.css"
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Password from "primevue/password";
import TabMenu from 'primevue/tabmenu';
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Avatar from 'primevue/avatar';
import Ripple from 'primevue/ripple';
import Image from 'primevue/image';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice'
import Divider from 'primevue/divider';
import Message from 'primevue/message';
import InlineMessage from 'primevue/inlinemessage';
import Card from 'primevue/card';
import InputMask from 'primevue/inputmask';
import Menubar from 'primevue/menubar';
import Toolbar from 'primevue/toolbar';
import Editor from 'primevue/editor';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';




// Databases
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';      //optional for row
import Textarea from 'primevue/textarea';
import OverlayPanel from 'primevue/overlaypanel';


// Fabric Icons
import "./assets/uifabricIcons/css/fabric-icons.css";
import 'vue-loading-overlay/dist/css/index.css';
// Vue Progress
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'
import Breadcrumb from 'primevue/breadcrumb';


// Allow CORS Access ( http client vue.js plugin for cross origin access without prefligh)
import axios from 'axios';
import VueAxios from 'vue-axios';

import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
import 'maz-ui/css/main.css';





const app = createApp(App);
app.config && (app.config.productionTip = false);
/* @Routers */

import FileUpload from 'primevue/fileupload';

//Google Maps
import VueGoogleMaps from '@fawmi/vue-google-maps'
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBOXZ8ExfHJAN7vrX4fMqcL5AQy7TCK3ZE',
    },
});


// app.use(VueTabs);
app.use(routes);
app.component('FileUpload',FileUpload);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(DialogService);
app.component('InlineMessage', InlineMessage);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component('Message', Message);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('Dialog',Dialog);
app.component('Password', Password);
app.component('TabMenu', TabMenu);
app.component('TabPanel',TabPanel);
app.component('TabView',TabView);
app.component('Avatar', Avatar);
app.component('Image',Image);
app.directive('ripple', Ripple);
app.component('Toast', Toast);
app.component('Divider', Divider);
app.component('Textarea',Textarea);
app.use(VueProgress);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'
app.component('MazBtn', MazBtn)
app.component('MazInput', MazInput)
app.component('MazPhoneNumberInput', MazPhoneNumberInput);
app.component('Card', Card);
app.component('InputMask',InputMask);
app.component('Menubar', Menubar);
app.component('DataTable',DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Toolbar', Toolbar);
app.component('Editor', Editor);
app.component('InputNumber', InputNumber);
app.component('Dropdown',Dropdown);
app.component('MultiSelect', MultiSelect);
app.component('OverlayPanel',OverlayPanel);
app.use('Breadcrumb',Breadcrumb);

// File Upload Previews
import FileUploadWithPreview from 'file-upload-with-preview';
import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';

/* add icons to the library */
library.add(faShoppingCart)

app.component('FileUploadWithPreview',FileUploadWithPreview);
app.component('font-awesome-icon', FontAwesomeIcon);

// Element Plus
import ElementPlus from 'element-plus';
app.use(ElementPlus)


app.component('MazBtn', MazBtn)
app.component('MazInput', MazInput)
app.component('MazPhoneNumberInput', MazPhoneNumberInput);

app.mount('#app')