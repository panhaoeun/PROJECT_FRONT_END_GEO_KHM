<template>
    <div class="vh-100 d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <div class="border border-3 border-primary"></div>
            <div class="card bg-white shadow-lg">
              <div class="card-body p-5">
                <form class="mb-3 mt-md-4">
                  <h2 class="fw-bold mb-2 text-uppercase">Brand</h2>
                  <p class="mb-5">Please enter your login and password!</p>
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
                  <p class="small">
                    <router-link class="text-primary" to="/login"
                      >Forgot password?</router-link
                    >
                  </p>
                  <div class="flex justify-items-center">
                    <button class="btn btn-sm btn-primary" type="submit">
                      Login
                    </button>
                  </div>
                </form>
                <div>
                  <p class="mb-0 text-center">
                    Don't have an account?
                    <router-link to="/login" class="text-primary fw-bold">Sign Up</router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  