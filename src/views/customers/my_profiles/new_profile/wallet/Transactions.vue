<template>
    <div class=" w-full justify-center items-start block px-2 md:px-0 ">
        <div class="flex justify-start px-10 w-full space-x-3   mb-4 border-b-2 border-blue-400">
            <h2 class="title_2">Transaction</h2>
        </div>
        <div class="flex justify-start md:px-10 w-full space-x-4 mb-4 border-b-2 border-yellow-400 overflow-x-auto">

            <div class="flex min-w-[400px]">
                <router-link :to="route.path" for="title" v-for="(route, index) in links" :key="index"
                    @click="onChanged(index)" class="title_4 px-2 py-1"
                    :class="{ ' bg-blue-500 rounded-t-md border-b-[3px]  border-green-500 text-white font-medium': $route.path === route.path }">{{
                        route.name }}</router-link>
            </div>
        </div>
        <router-view />
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectedIndex: null,
            links: [
                { name: "My Wallet", path: `/profile/my-wallet` },
                { name: "Create Deposit", path: `/profile/my-wallet/add-deposit` },
                { name: "History", path: `/profile/my-wallet/history` },
                { name: "Statement", path: `/profile/my-wallet/history1` },
            ],

        }
    },

}
</script>