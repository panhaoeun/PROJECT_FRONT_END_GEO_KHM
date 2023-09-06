<template>
    <div class=" flex w-full  sticky top-0 px-4 bg-white z-2  py-2">
        <span class="text-xl font-bold text-black ">Order</span>
    </div>
    <div class="w-full  border flex flex-col  p-2 group my-2 hover:bg-green-50 min-w-[400px] " v-for="item in orders"
        :key="item.id">
        <div class="flex justify-between w-full relative  overflow-x-auto">
            <div class="flex mix-w[300px]  gap-4 p-3 justify-start ">
                <div class="" v-for="(img, index) in item.images" :key="index">
                    <div class="max-w-[100px] h-[150px]">
                        <img class="w-full h-full object-cover" :src="img" alt="">
                    </div>
                </div>
            </div>
            <div>
                <button
                    class="absolute top-0 right-0 border px-2 py-1 rounded-md bg-blue-400 text-white hover:bg-blue-300 ">
                    view order
                </button>
            </div>
        </div>
        <div class=" flex w-full items-start justify-start px-5 py-2 gap-x-6 divide-x-2 overflow-x-auto">
            <div class="flex flex-col justify-center ">
                <div class="text-gray-800 font-bold">Order Number</div>
                <div>{{ item.orderNumber }}</div>
            </div>
            <div class="flex flex-col justify-center pl-4">
                <div class="text-gray-800 font-bold">Shipping Date</div>
                <div>{{ item.sippingDate }}</div>
            </div>
            <div class="flex flex-col justify-center  pl-4">
                <div class="text-gray-800 font-bold">Total</div>
                <div>{{ item.Total }}</div>
            </div>
            <div class="flex flex-col justify-center  pl-4">
                <div class="text-gray-800 font-bold">Status</div>
                <div class=" font-bold"
                    :class="item.Status == 1 ? 'text-green-600' : item.Status == 2 ? 'text-yellow-600' : 'text-red-600'">
                    <span v-if="item.Status == 1"> Delivered</span>
                    <span v-else-if="item.Status == 2">Pending</span>
                    <span v-else> Closed</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script >
import axios from 'axios'
export default {
    data() {
        return {

            orders: null,
        }
    },
    mounted() {
        this.getOders()
    },
    methods: {
        async getOders() {
            const result = await axios.get("http://localhost:3001/orders")
            const response = result.data
            this.orders = response
        }
    }
}
</script>