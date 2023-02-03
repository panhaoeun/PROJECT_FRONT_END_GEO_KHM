<template>
  <div class="vh-100 d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="border border-3 border-primary"></div>
          <div class="card bg-white shadow-lg">
            <div class="card-body p-5">
              <form class="mb-3 mt-md-4">
                <h2 class="fw-bold mb-2 text-uppercase">
                  Multiple Vendors Online
                </h2>
                <p class="mb-5">Create new account</p>
                <div class="mb-3">
                  <label for="name" class="form-label">User name</label>
                  <input
                    type="name"
                    class="form-control"
                    id="name"
                    placeholder="user name"
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Please select Role</label>
                  <select
                    class=" form-select form-control" required
                    aria-label="Default select example"
                  >
                
                    <option value="1">Customer</option>
                    <option value="2">Vendor</option>
                    <option value="3">Admin</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="*******"
                  />
                </div>
                <div class="mb-3">
                  <label for="confirm password" class="form-label"
                    >Confirm Password</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="*******"
                  />
                </div>

                <div class="flex justify-items-center">
                  <button class="btn btn-sm btn-primary" type="submit">
                    Register
                  </button>
                </div>
              </form>
              <div>
                <p class="mb-0 text-center">
                  Did you have an account?
                  <router-link to="/login" class="text-primary fw-bold"
                    >Login</router-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
