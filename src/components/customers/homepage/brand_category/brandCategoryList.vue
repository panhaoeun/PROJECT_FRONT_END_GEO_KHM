<template>
        <div class="px-4 py-4">
            <div class="py-5 border-bottom-1 border-300">
                <div class="grid">
                    <div class="col-12 sm:col-6 md:col-4 lg:col-2" v-for="item in items" :key="item">
                        <span class="text-900 block font-bold line-height-3 mb-3">{{ item.title }}</span>
                        <ul class="list-none p-0 m-0">
                            <li class="mb-2" v-for="(listPro, index) in item.list" :key="index">
                                <a class="text-700 cursor-pointer line-height-3">
                                    {{ listPro }} 
                                </a>
                            </li>
                        </ul>   
                    </div>
                </div>
            </div>
        </div>
</template>

<!-- List of company_logo & category -->
<script>
    export default{
        data(){
            return{
                items: [
                    {
                        id: '1',
                        title:'Fashion Man',
                        list: [
                            'Zeneta Fashion',
                            'Xgard 304',
                            'Never Star',
                            'Rillingen Hood',
                            'DropBrain',
                            'Red Pride',
                            'Onedry 1998',
                            'Starclothing'
                        ]
                    },
                    {
                        id: '2',
                        title:'Woman Fashion',
                        list: [
                            'Fushion',
                            'Aneta Glowing',
                            'Amanda 19',
                            'Kiosku',
                            'Womandry',
                            'Ababil',
                            'Lowly Cloth',
                        ]
                    },
                    {
                        id: '3',
                        title:'Automotive',
                        list: [
                            'Zeneta Fashion',
                            'Xgard 304',
                            'Never Star',
                            'Rillingen Hood'
                        ]
                    },
                    {
                        id: '4',
                        title:'Sports',
                        list: [
                            'Zeneta Fashion',
                            'Xgard 304',
                            'Never Star',
                            'Rillingen Hood'
                        ]
                    },
                    {
                        id: '5',
                        title:'Accesories',
                        list: [
                            'Zeneta Fashion',
                            'Xgard 304',
                            'Never Star',
                            'Rillingen Hood'
                        ]
                    },
                    {
                        id: '6',
                        title:'Gaming',
                        list: [
                            'Stargame.id',
                            'Dunia Games',
                            'Vale Store',
                            'Decade',
                            'Deff Store'
                        ]
                    },
                    {
                        id: '7',
                        title:'Electronic',
                        list: [
                            'Plotion',
                            'Xgard 304',
                            'Never Star',
                            'Rillingen Hood'
                        ]
                    },
                    {
                        id: '8',
                        title:'Property',
                        list: [
                            'Green Property',
                            'Xgard 304',
                            'Never Star',
                            'Rillingen Hood'
                        ]
                    }
                ]
            }
        }
    }
</script>