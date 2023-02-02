import { toRefs, reactive } from 'vue';

// const contextPath = import.meta.env.BASE_URL;
const layoutConfig = reactive({
    ripple: false,
    darkTheme: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'lara-light-indigo',
    scale: 14,
    activeMenuItem: null
});
const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
});

export function useLayout(){
    return {layoutConfig: toRefs(layoutConfig),layoutState: toRefs(layoutState)};
}