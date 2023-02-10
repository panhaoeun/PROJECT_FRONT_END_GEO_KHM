export default [
    {
        path: "/admin",
        name:"admin",
        meta: { template: "penel" },
       

        children: [
            {
                path: "/home",
                name: "home",
                // component: ()=> import('./'),
              }, 
        ],
    },
];
