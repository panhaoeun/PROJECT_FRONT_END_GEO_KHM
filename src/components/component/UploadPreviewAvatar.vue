<template>
    <div
            class="base-image-input"
            :style="{ 'background-image': `url(${imageData})` }"
            @click="chooseImage"
        >
        <input
            class="file-input"
            ref="fileInput"
            type="file"
            @input="onSelectFile"
        >
         <span
            v-if="!imageData"
            class="placeholder"
        >
           <i class="pi pi-camera text-white" style="font-size: 1.5rem"></i>
        </span>
    </div>
</template>

<!-- Script Upload preview avatar -->
<script>
    export default { 
        data() {
            return {
                imageData: null
            }
        },
        methods: {
            chooseImage() { 
                this.$refs.fileInput.click()
            },
            onSelectFile() { 
                const input = this.$refs.fileInput
                const files = input.files
                if (files && files[0]) {
                    const reader = new FileReader
                    reader.onload = e => {
                        this.imageData = e.target.result
                    }
                    reader.readAsDataURL(files[0])
                    this.$emit('input', files[0])
                }
            }
        }
    }
</script>
<!-- Style upload photo and preview image -->
<style scoped>
.base-image-input {
    display: block;
    width: 90px;
    height: 90px;
    cursor: pointer;
    background-size: cover;
    background-position: center center;
    border-radius: 50%;
}
.placeholder {
    background-image: url('../../assets/img/icons/avatar_icons.png') ;
    width: 100%;
    background-size: cover;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    border-radius: 50%;
    font-size: 5px;
    font-family: Helvetica;
    box-shadow: inset 0px 0px 20px 1px rgba(148, 148, 148, 0.9);
}

.file-input {
    display: none;
}</style>