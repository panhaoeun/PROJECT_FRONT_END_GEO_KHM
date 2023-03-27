<template>
    <!-- Logout button -->
    <span type="button" class=" text-blue d-flex w-100" data-toggle="modal" data-target="#logoutModal">Logout</span>

    <!-- Logout modal -->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logoutModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="logoutModalLabel">Logout Confirmation</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body align-items-center">
                    <img src="https://static.vecteezy.com/system/resources/previews/012/042/292/original/warning-sign-icon-transparent-background-free-png.png"
                        width="100" alt="" srcset=""><br>
                    Are you sure you want to logout?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <a href="/logout" class="btn btn-danger">Logout</a>
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
