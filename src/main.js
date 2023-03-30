import { createApp } from 'vue'
import App from './App.vue'
window.$ = window.jQuery = require("jquery");

//import adminlte styles


//import adminlte scripts
import "../node_modules/admin-lte/dist/js/adminlte.min.js"
import "../node_modules/admin-lte/plugins/select2/js/select2.full.min.js"
import "../node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js"
import "../node_modules/admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"


// E-Commerce Website
import "./assets/css/customer_ecommerce_app/style_prefix.css";
// Import Style
import "./assets/styles/style.css";
import "./assets/styles/account-tab.css";
import "./assets/styles/navbar.css";
// Admin Kit 
import "./assets/styles/adminkit/css/app.css";
/* @Routes */
import routes from "./routes/routes";
/* @Prime Vue*/ 
import './assets/primeflex.scss';
import "primevue/resources/themes/lara-light-indigo/theme.css";     
//icons
import "primeicons/primeicons.css";


import InputNumber from 'primevue/inputnumber';
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
import Divider from 'primevue/divider';
import Message from 'primevue/message';
import InlineMessage from 'primevue/inlinemessage';
import Card from 'primevue/card';
import InputMask from 'primevue/inputmask';
import Menubar from 'primevue/menubar';
import Toolbar from 'primevue/toolbar';
import Editor from 'primevue/editor';
import Dropdown from 'primevue/dropdown';
import Sidebar from 'primevue/sidebar';
import InputSwitch from 'primevue/inputswitch';
import AvatarGroup from 'primevue/avatargroup';   //Optional for grouping
import Steps from "primevue/steps";
import Calendar from 'primevue/calendar';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import OverlayPanel from 'primevue/overlaypanel';
import Listbox from 'primevue/listbox';

// Databases
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';                     //optional for row



// Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css'

// Fabric Icons
import "./assets/uifabricIcons/css/fabric-icons.css";
import 'vue-loading-overlay/dist/css/index.css';
// Vue Progress
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'
// Allow CORS Access ( http client vue.js plugin for cross origin access without prefligh)
import axios from 'axios';
import VueAxios from 'vue-axios';

import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
 import MazInputTags from 'maz-ui/components/MazInputTags';
import 'maz-ui/css/main.css';

const app = createApp(App);
app.config && (app.config.productionTip = false);

///Form Kit
import { plugin, defaultConfig } from '@formkit/vue';
import { createMultiStepPlugin } from '@formkit/addons';
import { generateClasses } from '@formkit/themes';
//Multiple Steps
import '@formkit/addons/css/multistep'
import genesis from '@formkit/themes/genesis';

//google Map 
import VueGoogleMaps from '@fawmi/vue-google-maps'
app.use(VueGoogleMaps, {
    load: {
         key:'AIzaSyBOXZ8ExfHJAN7vrX4fMqcL5AQy7TCK3ZE',
    }
});


/* @Routers */
app.use(routes);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(DialogService);
app.component('InlineMessage', InlineMessage);
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
app.component('MazInputTags',MazInputTags);
app.component('Card', Card);
app.component('InputMask',InputMask);
app.component('Menubar', Menubar);
app.component('DataTable',DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Toolbar', Toolbar);
app.component('Editor', Editor);
app.component('Dropdown',Dropdown);
app.component('InputNumber',InputNumber);
app.use('InputSwitch',InputSwitch);
app.use('AvatarGroup', AvatarGroup);
app.component('Sidebar',Sidebar);
app.component('Calendar',Calendar);
app.component('Steps',Steps);
app.component('ConfirmPopup',ConfirmPopup);
app.use(ConfirmationService);
app.component('OverlayPanel',OverlayPanel);
app.component('Listbox',Listbox);

// Config IONIC
app.config.ignoredElements = [/^ion-/];
// Element Plus
app.use(ElementPlus);
// Form Kit
app.use(plugin, defaultConfig({
   config: {
    classes: generateClasses(genesis),
  },
    plugins: [
        createMultiStepPlugin()
    ]
}));


app.mount('#app')