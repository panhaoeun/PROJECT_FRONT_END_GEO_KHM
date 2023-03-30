<template>
    <!-- Header -->
    <Header/>
    <!-- Category -->
    <div class="container px-2 py-2">
        <el-row :gutter="12">
            <el-col :span="8" v-for="data in dataStore" :key="data">
    <el-card
        class="relative w-full max-w-xs"
        :body-style="{ padding: 0 }"
      >
        <header class="relative">
          <img
            src="https://www.kindpng.com/picc/m/186-1866709_small-business-icon-free-small-businesses-icon-png.png"
            class="block w-full h-60"
          />
          <el-avatar
            src="https://avatars.githubusercontent.com/u/27342882?v=4"
            :size="80"
            class="absolute -bottom-10 left-[50%] transform -translate-x-1/2"
          />
        </header>
      </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<!-- Script -->
<script setup>
    import Header from '../../../views/customers/header_of_subpage/HeaderSubPage.vue';
    const dataStore =  [
        {
            title: 'Business',
            url: '',
            image: 'https://www.kindpng.com/picc/m/186-1866709_small-business-icon-free-small-businesses-icon-png.png',

        },
    ]
</script>
