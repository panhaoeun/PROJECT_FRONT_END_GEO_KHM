<template>
    <b-card>
        <b-card-header class="d-flex justify-content-between">
            <div class="header-title">
                <h4 class="card-title">User Profile</h4>
            </div>
        </b-card-header>
        <b-card-body>
            <div class="new-user-info">
                <form>
                    <b-row>
                        <!-- Full name -->
                        <b-col md="6" class="form-group">
                            <label class="form-label" for="mobno">Full Name:</label>
                            <input type="text" class="form-control" id="fullName" placeholder="Mobile Number" />
                        </b-col>
                        <!-- Phone number -->
                        <b-col md="6" class="form-group">
                            <label class="form-label" for="phoneNumber">Phone Number:</label>
                            <input type="text" class="form-control" id="phoneNumber" placeholder="Mobile Number" />
                        </b-col>
                        <!-- Email Address -->
                        <b-col md="6" class="form-group">
                            <label class="form-label" for="phoneNumber">Email:</label>
                            <input type="text" class="form-control" id="emailAddress" placeholder="Email Address" />
                        </b-col>
                    
                    </b-row>
                    <hr />
                    <button type="submit" class="btn btn-primary">Save Change</button>
                </form>
            </div>
        </b-card-body>
    </b-card>
</template>