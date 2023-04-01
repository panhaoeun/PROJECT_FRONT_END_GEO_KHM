<template>
    <div class="container">
        <span><strong>Change Password</strong></span>
        <br />
        <form action="">
            <label for="">Old Password *</label>
            <input type="password" required class="form-control" placeholder="Old Password" /><br>
            <label for="">New Password *</label>
            <input type="password" required class="form-control" placeholder="New Password" /><br>
            <label for="">Confirm Password *</label>
            <input type="password" required class="form-control" placeholder="Confirm Password" /><br>
            <div class="d-flex justify-content-end"><button class=" text-end btn btn-dark" type="submit">Submit</button>
            </div>
        </form>
    </div>
</template>