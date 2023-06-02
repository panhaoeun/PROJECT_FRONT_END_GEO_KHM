<template>
    <b-card>
        <b-card-header class="d-flex justify-content-between">
            <div class="header-title">
                <h4 class="card-title">Change Password</h4>
            </div>
        </b-card-header>
        <b-card-body>
            <div class="new-user-info">
                <form>
                    <b-row>
                        <!-- Full name -->
                        <b-col md="6" class="form-group">
                            <label class="form-label" for="mobno">Password:</label>
                            <input type="text" class="form-control" id="passwordProAdmin" placeholder="Password" />
                        </b-col>
                        <!-- Phone number -->
                        <b-col md="6" class="form-group">
                            <label class="form-label" for="phoneNumber">Confirm Password:</label>
                            <input type="text" class="form-control" id="phone" placeholder="Confirm Password" />
                        </b-col>
                    </b-row>
                    <hr />
                    <button type="submit" class="btn btn-primary">Save Change</button>
                </form>
            </div>
        </b-card-body>
    </b-card>
</template>
<script>
export default {
    name: "profile",
    components: {
    },
};
</script>