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
          <!-- user management -->
          <li class="nav-item">
            
            <a href="#" class="nav-link">
              <i class="nav-icon pi pi-shopping-bag"></i>
              <p>
                 PRODUCT MANAGEMENT
                <i class="fas fa-angle-left right"></i>
                <!-- <span class="badge badge-info right">6</span> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/vendor/products" class="nav-link">
                    <i class="pi pi-chevron-right"></i>
                     <p class="pl-2">Products</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
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
