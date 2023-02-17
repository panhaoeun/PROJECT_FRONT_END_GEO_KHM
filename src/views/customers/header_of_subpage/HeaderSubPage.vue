<template>
    <header class="header">
        <!-- Header Main -->
        <div class="header_main">
            <div class="container">
                <Menubar :model="items">
                    <template #start>
                        <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40" class="mr-2">
                    </template>
                    <template #end>
                        <InputText placeholder="Search" type="text" />
                    </template>
                </Menubar>
            </div>
        </div>
        <!-- Product Type -->
        <div class="border-top py-4">
            <p>Store Home</p>
        </div>
    </header>
</template>

<!-- Script -->
<script>
        export default{
            data(){
                return{
                    items: [
                            {
                                label:'File',
                                icon:'pi pi-fw pi-file',
                                items:[
                                    {
                                        label:'New',
                                        icon:'pi pi-fw pi-plus',
                                        items:[
                                            {
                                                label:'Bookmark',
                                                icon:'pi pi-fw pi-bookmark'
                                            },
                                            {
                                                label:'Video',
                                                icon:'pi pi-fw pi-video'
                                            }
                                        ]
                                    },
                                    {
                                        label:'Delete',
                                        icon:'pi pi-fw pi-trash'
                                    },
                                    {
                                        separator:true
                                    },
                                    {
                                        label:'Export',
                                        icon:'pi pi-fw pi-external-link'
                                    }
                                ]
                            },
                            {
                                label:'Edit',
                                icon:'pi pi-fw pi-pencil',
                                items:[
                                    {
                                        label:'Left',
                                        icon:'pi pi-fw pi-align-left'
                                    },
                                    {
                                        label:'Right',
                                        icon:'pi pi-fw pi-align-right'
                                    },
                                    {
                                        label:'Center',
                                        icon:'pi pi-fw pi-align-center'
                                    },
                                    {
                                        label:'Justify',
                                        icon:'pi pi-fw pi-align-justify'
                                    }
                                ]
                            }
                        ]
                    }
                }
                
        }
        
</script>