<template>
   <div class="vh-100 d-flex justify-content-center align-items-center bg-blue  ">
      <div class="container">
        <div class="row d-flex justify-content-center ">
          <div class="col-12 col-md-8 col-lg-6">
            <div class="card bg-white">
              <div class="card-body p-5">
                <form class="mb-3 mt-md-4 " method="POST">
                  <h2 class="fw-bold mb-2 text-uppercase">Mutiple Vendors Online</h2>
                  <p class=" mb-5">Please enter your login and password!</p>
                  <div class="mb-3">
                    <label for="email" class="form-label ">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="name@example.com">
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label ">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="*******">
                  </div>
                  <p class="small"><router-link class="text-primary" to="/#">Forgot password?</router-link></p>
                  <div class=" d-flex justify-content-end">
                    <router-link to="/" class="btn btn-sm btn-primary "> Login </router-link>
                  </div>
                </form>
                <div>
                  <p class="mb-0  text-center">Don't have an account? <router-link to="/register" class="text-primary fw-bold">Sign
                      Up</router-link></p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>