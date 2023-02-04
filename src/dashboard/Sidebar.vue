<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4 fixed-top fixed-bottom ">
    <!-- Brand Logo -->
    <a href="/" class="brand-link flex">
      <img
        src="../assets/img/photos/vue.jpeg"
        width="100"
        class="rounded"
        alt="..."
      />
      <span class="brand-text font-weight-bold px-5"> MVO </span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <br />
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input
            class="form-control form-control-sidebar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item menu-open">
            <!-- <a href="#" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i class="right fas fa-angle-left"></i>
              </p>
            </a> -->
            <!-- <ul class="nav nav-treeview">
              <li class="nav-item">
                <a
                  href=""
                  @click="$router.push('/home')"
                  class="nav-link active"
                >
                  <i class="far fa-circle nav-icon"></i>
                  <p>home</p>
                </a>
              </li>
            </ul> -->
          </li>

          <!-- user management -->
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              <p>
                User managements
                <i class="fas fa-angle-left right"></i>
                <!-- <span class="badge badge-info right">6</span> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/user" class="nav-link">
                  <i class="fas fa-user nav-icon"></i>
                  <p>User List</p>
                </router-link>
              </li>
            </ul>
          </li>
          <!-- user management -->
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Categories
                <i class="fas fa-angle-left right"></i>
                <!-- <span class="badge badge-info right">6</span> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/category" class="nav-link">
                  <i class="fas fa-user nav-icon"></i>
                  <p>Category List</p>
                </router-link>
              </li>
            </ul>
          </li>
          <!-- Products -->
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Products
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/product" class="nav-link">
                  <i class="fas fa-user nav-icon"></i>
                  <p>product list</p>
                </router-link>
              </li>
            </ul>
          </li>
          
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Orders
                <i class="fas fa-angle-left right"></i>
                <!-- <span class="badge badge-info right">6</span> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/" class="nav-link">
                  <i class="fas  nav-icon"></i>
                  <p>My order</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link to="/home" class="nav-link">
              <i class="nav-icon fas fa-database"></i>
              <p>Reports</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/home" class="nav-link">
              <i class="nav-icon fas fa-database"></i>
              <p>Reports</p>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-cog"></i>
              <p>
                settings
                <i class="fas fa-angle-left right"></i>
                <!-- <span class="badge badge-info right">6</span> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/profile" class="nav-link">
                  <i class="fas fa-key nav-icon"></i>
                  <p>Change password</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul></ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {};
</script>

<style></style>
