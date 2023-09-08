<template>
    <div class="flex flex-col justify-start items-center w-full space-y-2">
        <div class=" flex justify-center items-center flex-col space-y-2 my-2">
            <label for="" class="title_4">Available Balance</label>
            <h3 class="text-3xl font-bold font-sans ">400453434.00៛</h3>
        </div>
        <div class="flex flex-wrap items-center justify-center sm:space-x-4 w-full">

            <button class="my_button title_4 sm:w-auto w-full">Transfer</button>
            <button class="my_button title_4  sm:w-auto w-full"
                @click="$router.push('/profile/my-wallet/add-deposit')">Deposit</button>

            <button class="my_button title_4 sm:w-auto w-full">Withdrawal</button>
        </div>
        <div class="bg-gray-200 rounded-md py-1.5 w-full flex px-3">
            <label for="transaction" class="title_4 font-medium">Transaction</label>
        </div>

        <div class="bg-sky-50 hover:bg-sky-100 rounded-lg p-4 flex justify-between w-full"
            v-for="(data, index) in transactions" :key="index">
            <div class="flex flex-col">
                <label for="" class="text-blue-800 font-bold">Transaction:<span>{{ data.id }}</span></label>
                <label for="" class="text-sm">Amount</label>
                <label for="" class="text-sm">
                    {{ data.desc }}
                </label>
            </div>
            <div class="flex flex-col items-end">
                    <label for="amount" class="text-sm font-bold text-green-800">{{ data.amount }}$</label>
                    <label for="date" class="text-sm">{{ data.date }}</label>
                </div>
        </div>

    </div>
</template>
<script>

export default {
    data() {
        return {
            transactions: [
                {
                    id: 103, amount: 3500, date: '2023-Sep-08', desc: "transer for to by a phone"
                },
                {
                    id: 134, amount: 38000, date: '2023-Sep-08', desc: "transer for this mounth"
                },
                {
                    id: 159, amount: 980000, date: '2023-Sep-08', desc: "transer for to by a phone"
                },
            ]
        }
    },
}
</script>