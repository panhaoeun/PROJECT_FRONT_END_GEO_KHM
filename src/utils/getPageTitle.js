import defaultSettings from './defaultSetting';
import i18n from '../lang';
const title = defaultSettings.title || '7day - Admin Panel';

console.log(i18n.te)
export default function getPageTitle(key) {
    const hasKey = i18n.te(`route.${key}`);
    if (hasKey) {
        const pageName = i18n.t(`route.${key}`);
        return `${pageName} - ${title}`;
    }
    return `${title}`;
}
