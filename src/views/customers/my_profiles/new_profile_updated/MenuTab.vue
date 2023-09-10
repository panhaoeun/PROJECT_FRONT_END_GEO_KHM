<template>
    <button class="  top-0 right-2 z-20 my_button fixed   block md:hidden" @click="isOpen = !isOpen">Menu</button>

    <div class="min-w-[calc(100vh/3+50px)]  shadow-md   my_animation   w-full md:max-w-sm px-3 py-3  rounded-md color_default02 shadow_default"
        :class="isOpen === true ? ' sticky md:static top-[45px] left-0 z-10 ' : 'hidden md:block'">

        <span class="text-xl font-medium   text-blue-700 ">Welcome, Senghong</span><br><br>
        <router-link :to="item.path"
            class="hover:bg-gray-200  default_text flex justify-between px-3 py-3 my-1 rounded-md  font-medium hover:text-gray-800"
            v-for="(item, index) in accountMenus" :key="index" @click="isOpen = false"
            :class="{ 'bg-blue-500 text-white': $route.matched[2].path === item.path }">
            <div class="flex justify-start space-x-2 ">
                <div v-html="item.icon">
                </div>
                <span>{{ item.name }}</span>
            </div>
            <div class="flex  justify-end items-center">
                <svg class="w-[10px] h-[10px] text-gray-600 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                </svg>
            </div>
        </router-link>
        <div class="flex justify-end w-full mt-4">
            <button class="my_button bg-red-500 hover:bg-red-400 py-[10px] px-4" @click="console.log('tes')">Sign
                Out</button>
        </div>

    </div>
</template>
<script>
export default {
    props: {
        openMenu: {
            type: Boolean,
        }
    },
    data() {
        return {
            isOpen: false,
            accountMenus: [
                {
                    name: "Order",
                    path: '/profile',
                    icon: `  <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 21">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                d="M7.24 7.194a24.16 24.16 0 0 1 3.72-3.062m0 0c3.443-2.277 6.732-2.969 8.24-1.46 2.054 2.053.03 7.407-4.522 11.959-4.552 4.551-9.906 6.576-11.96 4.522C1.223 17.658 1.89 14.412 4.121 11m6.838-6.868c-3.443-2.277-6.732-2.969-8.24-1.46-2.054 2.053-.03 7.407 4.522 11.959m3.718-10.499a24.16 24.16 0 0 1 3.719 3.062M17.798 11c2.23 3.412 2.898 6.658 1.402 8.153-1.502 1.503-4.771.822-8.2-1.433m1-6.808a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                        </svg>`,
                },
                {
                    name: "My Wallet",
                    path: '/profile/my-wallet',
                    icon: ` <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.905 1.316 15.633 6M18 10h-5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h5m0-5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1m0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-3m-6.367-9L7.905 1.316 2.352 6h9.281Z"/>
  </svg>`,
                },
                {
                    name: "Favorite",
                    path: '/profile/favorite',
                    icon: `<svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
    <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z"/>
  </svg>`,
                },
                {
                    name: "Address",
                    path: '/profile/address',
                    icon: `  <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"/>
  </svg>`,
                },
                {
                    name: "Personal Data",
                    path: '/profile/acount-info',
                    icon: `  <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 21">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                d="M7.24 7.194a24.16 24.16 0 0 1 3.72-3.062m0 0c3.443-2.277 6.732-2.969 8.24-1.46 2.054 2.053.03 7.407-4.522 11.959-4.552 4.551-9.906 6.576-11.96 4.522C1.223 17.658 1.89 14.412 4.121 11m6.838-6.868c-3.443-2.277-6.732-2.969-8.24-1.46-2.054 2.053-.03 7.407 4.522 11.959m3.718-10.499a24.16 24.16 0 0 1 3.719 3.062M17.798 11c2.23 3.412 2.898 6.658 1.402 8.153-1.502 1.503-4.771.822-8.2-1.433m1-6.808a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                        </svg>`,
                },
                {
                    name: "Change Password",
                    path: '/profile/change-password',
                    icon: ` <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/>
  </svg>`,
                },
                //                 {
                //                     name: "Sign Out",
                //                     path: '#',
                //                     icon: `<svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                //     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                //   </svg>`,
                //                 }
            ],

        }
    },

}

</script>
<style></style>