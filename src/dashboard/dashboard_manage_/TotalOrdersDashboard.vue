<!-- eslint-disable vue/require-v-for-key -->
<template>
    <b-col xl="4">
    <b-card>
        <div class="d-flex justify-content-between align-itmes-center">
        <div>
            <div class="p-3 rounded bg-soft-info">
                <svg class="icon-20" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 
                            17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861
                            13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 
                            7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742
                            17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 
                            2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 
                            5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 
                            6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 
                            18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 
                            20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z" fill="currentColor">
                        </path>                                            
                </svg>
            </div>
        </div>
        <div>
            <h5>{{ resultTotalOrder }}</h5>
            <p class="mb-0">Total Orders</p>
        </div>
        <!-- Select Date -->
        <div>
            <div :class="{'dropdown' : defaultSelectedDate}">
                <!-- Toggle Name -->
                <a href="#" class="text-secondary dropdown-toggle" 
                    id="dropdownMenuButton1" 
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <template v-if="selectedId === 1 ">
                        This Current Date
                    </template>
                    <template v-if="selectedId === 2 ">
                        This Week
                    </template>
                    <template v-if="selectedId === 3 ">
                        This Month
                    </template>
                    <template v-if="selectedId === 4 ">
                        This Year
                    </template>
                    <template else>
                        This Current Date
                    </template>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                    <li v-for="item in productItem" :key="item.id" @click="onChangeFilterOrderByDate(item?.id)">
                        <a class="dropdown-item">{{ item?.name }}</a>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </b-card>
    </b-col>
</template>
<script>
import { ElMessage } from "element-plus";
import ProductsDashboardServices from "../../services/dashboard_graph_service/ProductsDashboardService";
export default {
    props: {},
    data() {
        return {
            defaultSelectedDate: false,
            selectedId : 2,
            resultTotalOrder: 50,
            productItem: [
                {
                    id: 1,
                    name: 'Current Date'
                },
                {
                    id: 2,
                    name: 'This Week'
                },
                {
                    id: 3,
                    name: 'This Month'
                },
                {
                    id: 4,
                    name: 'This Year'
                }
            ]
        };
    },
    created() {
        this.productMSDashboardService = new ProductsDashboardServices();
    },
    methods: {
        onChangeFilterOrderByDate(itemId){
            this.selectedId = itemId;
            this.defaultSelectedDate = !this.defaultSelectedDate;
            // Get Order
            this.productMSDashboardService.getOrdersCountCurrent(itemId ?? 1).then((result) => {
                if(!result){
                    this.resultTotalOrder = 0;
                }
                if(result.countAllOrder && result.countAllOrder !== undefined){
                    this.resultTotalOrder = parseInt(result?.countAllOrder.count) ?? 0;
                }
                else if(result.weekOrder && result.weekOrder !== undefined){
                    this.resultTotalOrder = parseInt(result.weekOrder) ?? 0;
                }
                else if(result.mothOrder && result.mothOrder !== undefined){
                    this.resultTotalOrder = parseInt(result.mothOrder) ?? 0;
                }
                else if(result.yearOrder && result.yearOrder !== undefined){
                    this.resultTotalOrder = parseInt(result.yearOrder) ?? 0;
                }
                else{
                    this.resultTotalOrder =  result.countAllOrder ? result.countAllOrder : 0;
                }
                // if(result)
            }).catch((err) => {
                ElMessage.error(err.message ?? []);
            });
        }
    },
};
</script>