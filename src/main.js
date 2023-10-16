import {createApp} from 'vue'
import App from './App.vue';
import {CartService} from "@/services/customers/add_to_cart/CartCustomerService";
/*
   @E-Commerces
   @Library E-Commerces
*/
import "./assets/commerce_frontend_/css/commerce_frontend.css";
// Global Font and Icons
import "./assets/commerce_frontend_/css/icon_font_global.css";
// Customize Plugins
import "./assets/commerce_frontend_/css/plugins/animate.css";
import "./assets/commerce_frontend_/css/plugins/easyzoom.css";
import "./assets/commerce_frontend_/css/plugins/slick.css";
// Slick Slider
import "./assets/commerce_frontend_/js/slick.js";
// Global Functions
// import "./assets/commerce_frontend_/js/main_global_functions.js";
import "./assets/commerce_frontend_/css/plugins/magnific-popup.css";
import InnerImageZoom from 'vue-inner-image-zoom';
import VueSidebarMenu from 'vue-sidebar-menu';
/**
 * Vendor or Administrator use type check permissions 
 * can access to use modules auth sign 
 * */ 
import "./permissions";
/**
 * Plugin Install on projects
 * * */ 

/* @Prime Vue*/
import './assets/primeflex.scss';
import "primevue/resources/themes/md-light-indigo/theme.css";
// Admin Kit 
// import "./assets/css/adminlte.min.css";
import './assets/css/element_plus/index.css';
import './assets/css/element_plus/display.css';
// Allow CORS Access ( http client vue.js plugin for cross origin access without prefligh)
import "primeicons/primeicons.css";
import 'maz-ui/css/main.css';
import CounterUp from 'vue3-autocounter';

// style scss
import "./assets/scss/product_detail_front/global_pro_detail.scss";
//global registration Vue3FormWizard
import Vue3FormWizard from 'vue3-form-wizard'
import 'vue3-form-wizard/dist/style.css'
/*
   @E-Commerces Dashboard
   @Library E-Commerces Dashboard
*/
import "./assets/custom-vue/scss/styles.scss";
import globalComponent from './plugins/global-components';
import globalDirective from './plugins/global-directive';
import globalMixin from './plugins/global-mixin';
import BootstrapVue3 from 'bootstrap-vue-3';
// PRIMEVUE
import ConfirmDialog from 'primevue/confirmdialog';
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
import AvatarGroup from 'primevue/avatargroup'; //Optional for grouping
import Steps from "primevue/steps";
import Calendar from 'primevue/calendar';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import OverlayPanel from 'primevue/overlaypanel';
import Listbox from 'primevue/listbox';
import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';
import Menu from 'primevue/menu';
import Tag from 'primevue/tag';
import TreeTable from 'primevue/treetable';
import Tree from 'primevue/tree';
import ProgressSpinner from 'primevue/progressspinner';
// Databases
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; //optional for column grouping
import Row from 'primevue/row';
import VueUploadComponent from 'vue-upload-component' //optional for row
// Element Plus
import ElementPlus, { ElMessage } from 'element-plus';
import axios from 'axios';
import VueAxios from 'vue-axios';
// MAZ
import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
import MazInputTags from 'maz-ui/components/MazInputTags';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';


import {
    createPinia
} from 'pinia';
const pinia = createPinia();
const app = createApp(App);
app.config && (app.config.productionTip = false);
import VueCookies from 'vue-cookies';
// Vue Query Initialization
import {
    VueQueryPlugin
} from "@tanstack/vue-query";
app.use(VueQueryPlugin);

/*
     @Routes
 */
import routes from "./routes/routes";

//google Map 
import VueGoogleMaps from '@fawmi/vue-google-maps'
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBOXZ8ExfHJAN7vrX4fMqcL5AQy7TCK3ZE',
    }
});
// app.use(Vue3FormWizard);
app.use(Vue3FormWizard);

/*
   @Vue I18n: Vue - Languages 
   @Link: https: //kazupon.github.io/vue-i18n/installation.html#direct-download-cdn
*/
import i18n from "./lang";
app.use(i18n);

//Vuex
import Vuex from 'vuex';
import store from "./store";
import { handlingExpiredToken } from './utils/auth/handlingExpiredToken';
app.use(Vuex);
app.use(store);

/* @Routers */
app.use(pinia);
app.use(routes);
app.use(PrimeVue, {
    ripple: true
});
app.use(ToastService);
app.use(DialogService);
app.component('InlineMessage', InlineMessage);
app.component('Message', Message);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('Dialog', Dialog);
app.component('Password', Password);
app.component('TabMenu', TabMenu);
app.component('TabPanel', TabPanel);
app.component('TabView', TabView);
app.component('Avatar', Avatar);
app.component('Image', Image);
app.directive('ripple', Ripple);
app.component('Toast', Toast);
app.component('Divider', Divider);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios) // provide 'axios'
app.component('MazBtn', MazBtn)
app.component('MazInput', MazInput)
app.component('MazPhoneNumberInput', MazPhoneNumberInput);
app.component('MazInputTags', MazInputTags);
app.component('Card', Card);
app.component('InputMask', InputMask);
app.component('Menubar', Menubar);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Toolbar', Toolbar);
app.component('Editor', Editor);
app.component('Dropdown', Dropdown);
app.component('InputNumber', InputNumber);
app.use('InputSwitch', InputSwitch);
app.use('AvatarGroup', AvatarGroup);
app.component('Sidebar', Sidebar);
app.component('Calendar', Calendar);
app.component('Steps', Steps);
app.component('Tag', Tag);
app.component('ConfirmPopup', ConfirmPopup);
app.component('Menu', Menu);
app.use(ConfirmationService);
app.component('OverlayPanel', OverlayPanel);
app.component('Listbox', Listbox);
app.component('RadioButton', RadioButton);
app.component('Textarea', Textarea);
app.use(ConfirmationService);
app.component('FileUpload', FileUpload);
app.component('ConfirmDialog', ConfirmDialog);
//Vue Uoloads
app.component('file-upload', VueUploadComponent);
app.component('TreeTable', TreeTable);
app.component('Tree', Tree);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
/*
    @Front-End Library 
*/
app.use(VueSidebarMenu);
app.component('inner-image-zoom', InnerImageZoom);
app.component('counter-up', CounterUp);
app.use(VueCookies);
/*
   @E-Commerces Dashboard
   @Library E-Commerces Dashboard
*/
// Custom Components & Directives
app.use(globalComponent)
app.use(globalDirective)
app.mixin(globalMixin)

// Config IONIC
app.config.ignoredElements = [/^ion-/];
/**
 * @Element UI  
 * */
app.use(ElementPlus, {
    i18n: (key, value) => i18n.t(key, value)
});
app.use(BootstrapVue3);
// Get product cart add to cart
const cart = CartService.getCart();
store.commit('cart/SET_CART_ITEMS', cart);
/**
 * @Handling Expired Token(Forbidden Requests) 
 * use AxiosJS 
 * */ 
handlingExpiredToken(routes);
// register global utility filters.
import * as filters from "./filters";
Object.keys(filters).forEach(key => {
   app.config.globalProperties.$filters = filters[key];
});
/*
    @Directive Permissions and roles
**/ 
app.directive("permission", async (el, binding) => {
    const { value} = binding;
    if (value && value instanceof Array && value.length > 0) {
            const functionName = value[0].functionName;
            const moduleName = value[0].moduleName;
            const resultModuleAcc = await store.dispatch('users/permUserCanAccModule', {
                functionName,
                moduleName
            });
            const permissionModule =  store.getters && store.getters['users/permissionModules'];
            if (!Array.isArray(permissionModule) || permissionModule !== undefined || permissionModule !== null) {
                if (!resultModuleAcc) {
                    ElMessage.error("Permission of Module Not Found...");
                }
                const requiredPermissions = value;
                const hasPermission = permissionModule.some((permission) => {
                    if (!permission) {
                        return false;
                    }
                    return requiredPermissions.push(permission)
                });
                if (!hasPermission) {
                    el.parentNode && el.parentNode.removeChild(el);
                }
            }
            
       
    } else {
        throw new Error(`Permissions are required! Example: v-permission="['dashboard','view create']"`);
    }
});
/*
    @Remove product item cookie and replace add new to database
**/

app.mount('#app');