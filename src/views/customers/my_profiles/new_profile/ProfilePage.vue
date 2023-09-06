<template>
    <div class="flex flex-col relative justify-start items-start  w-screen h-screen bg-gray-200 overflow-x-hidden">
        <!-- Header  -->
        <div class="w-full flex py-3 md:px-10 px-5 items-center  z-20 justify-between bg-white sticky top-0">
            <!-- Left Site -->
            <div class=" flex justify-start items-center w-full space-x-4 uppercase font-bold text-md">
                <button class="uppercase">Women</button>
                <button class="uppercase">Man</button>
                <button class="uppercase">Kids</button>
                <button class="uppercase text-red-500">Sale</button>

            </div>

            <!-- Center -->
            <!-- Right -->
        </div>
        <!-- Body -->
        <div class="mt-10 lg:px-10 px-4 flex w-full flex-col ">
            <div class="my-4 lg:px-20  flex items-center space-x-2">
                <div class="w-20 h-20 sm:w-[100px] sm:h-[100px] border-2 border-blue-400 rounded-full bg-gray-300 relative">
                    <div
                        class=" absolute w-[15px] h-[15px] border-2 border-white bottom-2  right-1 rounded-full bg-green-500 ">
                    </div>
                    <img class="w-full h-full object-cover rounded-full"
                        src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="">
                </div>
                <div class="lg:text-4xl font-medium text-black text-2xl">Hello, Senghong</div>
            </div>
            <div
                class="flex w-full  lg:flex-row lg:space-y-0 xl:px-20  space-y-4 flex-col justify-center items-start lg:space-x-2">
                <!-- Menu List -->
                <MenuTab />
                <!-- Data -->
                <div class="w-full  flex flex-col bg-white px-2  rounded-md py-4 justify-start items-start relative">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import axios from 'axios'
import MenuTab from './MenuTab.vue'

export default {
    components: {
        MenuTab
    },
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        onpenMe() {
            this.isOpen = !this.isOpen
            console.log(this.isOpen)
        }
    }
}

</script>
