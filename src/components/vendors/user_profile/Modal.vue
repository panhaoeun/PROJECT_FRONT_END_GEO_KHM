<template>
    <!-- Logout button -->
    <button type="button" class=" btn btn-dark" data-toggle="modal" data-target="#EditModal"> <i class="fa fa-edit"></i>
        EDIT</button>

    <!-- Logout modal -->
    <div class="modal fade" id="EditModal" tabindex="-1" role="dialog" aria-labelledby="EditModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="EditNameModalLabel">
                        Update profile
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body ">
                    <form action="">
                        <label for="name">First Name *</label>
                        <input type="text" class="form-control" required /><br />
                        <label for="name">Last Name *</label>
                        <input type="text" class="form-control" required /><br />
                        <label for="name">Email</label>
                        <input type="email" class="form-control" required /><br />

                        <label for="">Profile</label>
                        <div class=" size-box ">

                            <img :src="imageUrl" v-if="imageUrl" class="image" width="100" alt="Preview" />
                        </div>
                        <label for="formFile" class="form-label">Select image file</label>
                        <input class="form-control" type="file" id="formFile" @change="onFileSelected($event)" />
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
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
<style  scoped></style>