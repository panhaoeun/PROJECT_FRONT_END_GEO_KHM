<template lang="">
    <button
        type="button"
        class="btn btn-sm mt-1 btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
    >
       <strong> <i class="fa fa-edit"></i> EDIT</strong>
    </button>

    <!-- Modal -->
    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog" >
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Update profile
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body ">
                    <form action="">
                        <label for="name">First Name *</label>
                        <input
                            type="text"
                            class="form-control"
                            required
                        /><br />
                        <label for="name">Last Name *</label>
                        <input
                            type="text"
                            class="form-control"
                            required
                        /><br />
                        <label for="name">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            required
                        /><br />

                        <label for="">Profile</label>
                        <div class=" size-box ">
                    
                        <img
                            :src="imageUrl"
                            v-if="imageUrl"
                            class="image"
                            alt="Preview"
                        />
                    </div>
                        <label for="formFile" class="form-label"
                            >Select image file</label
                        >
                        <input
                            class="form-control"
                            type="file"
                            id="formFile"
                            @change="onFileSelected($event)"
                        />
                    </form>
                   
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button type="button" class="btn btn-primary">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: "",
        };
    },
    methods: {
        onFileSelected(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    this.imageUrl = reader.result;
                });
                reader.readAsDataURL(file);
            }
        },
    },
};
</script>

<style>
.size-box {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>