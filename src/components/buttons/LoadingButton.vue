<template>
    <el-button type="primary" class="py-5 text-xl px-4 text-center" :loading="loading">
         <template #loading>
                <div class="custom-loading">
                    <svg class="circular" viewBox="-10, -10, 50, 50">
                        <path
                        class="path"
                        d="
                        M 30 15
                        L 28 17
                        M 25.61 25.61
                        A 15 15, 0, 0, 1, 15 30
                        A 15 15, 0, 1, 1, 27.99 7.5
                        L 15 15
                        "
                        style="stroke-width: 10px; fill: rgba(0, 0, 0, 0)"
                        />
                    </svg>
                </div>
                 Loading...
        </template>
        <div :class="{'invisible px-5 py-4' : loading}" style="width: 100px;">
               {{ title }}
             <slot></slot>
        </div>
      
    </el-button>
</template>

<script>
export default ({
   props: {
       title: String,
       loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        
    }
})
</script>

<style scoped>
.el-button .custom-loading .circular {
    margin-right: 6px;
    width: 18px;
    height: 18px;
    animation: loading-rotate 2s linear infinite;
}

.el-button .custom-loading .circular .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: var(--el-button-text-color);
    stroke-linecap: round;
}
</style>