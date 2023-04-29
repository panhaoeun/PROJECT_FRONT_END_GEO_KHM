<template>
    <div>
        <input id="file-input" class="hide-file-input bg-color-standard-blue-gradient" type="file" accept="image/*" @change="onFileChange($event)" />
        <label class="file-label" for="file-input">{{ uploadName }} </label>
    </div>
</template>
<script>
export default {
    props: {
        uploadName: String
    },
    methods: {
        onFileChange($event) {
            const file = $event.target.files[0]
            const reader = new FileReader()
            if (file) {
                reader.readAsDataURL(file)
                reader.onload = () => {
                    // Set a new property on the captured `file` and set it to the converted base64 image
                    file.previewBase64 = reader.result
                    // Emit the file with the new previewBase64 property on it
                    this.$emit('file-updated', file)
                }
                reader.onerror = (error) => {
                    console.log('Error ', error)
                }
            }
        },
    },
}
</script>
<style scoped>
.hide-file-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

.file-label {
    color: #fff;
    background-image: linear-gradient(to right top, #2169ce, #1676d5, #1483da, #1e8fde, #2e9be2, #2498e2, #1694e2, #0091e2, #007ddc, #0067d5, #0050ca, #0537bb);
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

input[type='file']:focus+.file-label {
    box-shadow: 0 0 0 4px #bae6fd;
}
</style>