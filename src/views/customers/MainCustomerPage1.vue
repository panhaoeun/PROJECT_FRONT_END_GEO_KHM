<template>
    <div class="flex bg-gray-300   w-screen h-screen justify-center items-start relative">
        <div class="w-full h-[60px] bg-white sticky top-0 flex px-10 justify-end items-center">

            <router-link to="/profile" class=" flex space-x-2 px-2 hover:bg-gray-200 rounded-md py-1">
                <div>
                    <svg class="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
                    </svg>
                </div>
                <span>
                    Account

                </span>
            </router-link>
        </div>
    </div>
</template>
<script setup>

</script>
