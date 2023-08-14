import PageNotfound from "../components/error_page/404.vue";
import UnauthorizedError from "../components/error_page/UnauthorizedError.vue";

export default [
    {
        path: "/page/error/not-found",
        meta: {template: 'error-page'},
        hidden: true,
        children: [
          //Status Code 404 -> Not Found 
            { path: '/:pathMatch(.*)*', component: PageNotfound },
            {
                path: '/error/401',
                component: UnauthorizedError,
                meta: {
                    title: "Unauthorized | 7Day"
                },
            },
        ]
    }
];