import { createApp } from 'vue'
import App from './App.vue'
window.$ = window.jQuery = require("jquery");
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {dom, library} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
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
// Import Style
import "./assets/styles/style.css"
/* @Routes */
import routes from "./routes/routes";
library.add(fas, fab, far, faLock, faEnvelope, faFacebook, faGooglePlus);
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


// Fabric Icons
import "./assets/uifabricIcons/css/fabric-icons.css";
// Vue Progress
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'
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
app.use(routes);
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
app.use(VueProgress);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'
app.component('MazBtn', MazBtn)
app.component('MazInput', MazInput)
app.component('MazPhoneNumberInput', MazPhoneNumberInput);
app.component('Card', Card);
app.component('InputMask',InputMask);
app.component('Menubar', Menubar);


app.mount('#app')


