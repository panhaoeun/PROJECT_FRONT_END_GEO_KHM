import role from './role';

const install = function (app) {
    app.directive('role', role);
};

if (window.app) {
    window['role'] = role;
    app.use(install); // eslint-disable-line
}

role.install = install;
export default role;
