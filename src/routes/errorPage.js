import PageNotfound from "../components/error_page/404.vue";
export default [
    {
        path: "/page/error/not-found",
        meta: {template: 'error-page'},
        children: [
          //Status Code 404 -> Not Found 
           { path: '/:pathMatch(.*)*', component: PageNotfound },
        ]
    }
];