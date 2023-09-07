<template>
    <div>
        <form class="flex w-full  flex-col items-center">
            <div class="flex flex-col items-start space-y-5">

                <div class="flex w-full flex-col items-center justify-start md:items-start">
                    <label for="balance" class="title_4 before:content-['*'] before:text-red-500 before:mr-1">Select A
                        Bank</label>
                    <div class=" space-y-4">

                        <div class="flex items-center space-x-2" v-for="(option, index) in radioOptions" :key="index">
                            <input type="radio" :name="option" :value="option" v-model="selected"
                                @change="handleChange(option)"
                                class="form-radio w-[20px] h-[20px]  text-blue-600 border-2 border-blue-600">
                            <label for="" class=" text-gray-800 "
                                :class="{ 'text-red-800 font-medium': selected === index }">{{
                                    option
                                }}</label>
                        </div>
                    </div>
                </div>
                <!-- amout field -->
                <div class="flex w-full flex-col items-center justify-start md:items-start">
                    <label for="balance" class="title_4 before:content-['*'] before:text-red-500 before:mr-1">Amount</label>
                    <div class="flex h-[40px] w-[220px] space-x-1">
                        <button type="button" @click=" amount > 0 ? amount-- : amount"
                            class=" cursor-pointer h-full items-center focus:border-2  focus:border-green-500 justify-center flex bg-gray-500 rounded-md text-white w-[40px] text-2xl">
                            -</button>
                        <input type="number" v-model="amount"
                            class="form-control text-black text-xl outline-none w-full h-full">
                        <button type="button" @click="amount++"
                            class=" cursor-pointer h-full items-center focus:border-2 focus:border-green-500  justify-center flex bg-gray-500 rounded-md text-white w-[40px] text-2xl">
                            +</button>

                    </div>
                </div>
                <div class="flex w-full flex-col items-center justify-start md:items-start">
                    <label for="date" class="title_4 before:content-['*'] before:text-red-500 before:mr-1">Deposit
                        Date</label>
                    <div class="w-[220px]">
                        <input type="date" class=" form-control text-gray-900">
                    </div>
                </div>
                <div class="flex w-full flex-col items-center justify-start md:items-start">
                    <label for="image" class="title_4  before:content-['*'] before:text-red-500 before:mr-1">Upload fill
                    </label>
                    <div
                        class="w-[120px] h-[120px] relative flex flex-col items-center justify-center rounded-md border-2 border-dashed">
                        <div class=" absolute">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                        </div>
                        <img v-if="imageUrl" :src="imageUrl" class="w-full absolute h-full rounded-md object-fill"
                            alt="Uploaded Image">
                        <input @change="handleImageUpload" type="file" class=" opacity-0">


                    </div>

                </div>
                <!-- description -->
                <div class="w-full">
                    <label for="Description"
                        class="title_4  before:content-['*'] before:text-red-500 before:mr-1">Description
                    </label>
                    <textarea id="message" rows="4"
                        class="block p-2.5 w-[300px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."></textarea>
                </div>
            </div>
            <div class="mt-2">
                <button class="my_button " type="submit">Save</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selected: null,
            radioOptions: ['ABA Bank', 'Wing Bank', 'Acleda Bank', 'Satapana Bank'],
            amount: 0,
            imageUrl: null,
        };
    },
    methods: {
        // Handle the change event to ensure only one checkbox is checked
        handleChange(option) {
            this.selected = option
            console.log(this.selected)

        },

        handleImageUpload(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.imageUrl = e.target.result;
                };

                reader.readAsDataURL(file);
            } else {
                this.imageUrl = null;
            }
        },

    }


};
</script>
  