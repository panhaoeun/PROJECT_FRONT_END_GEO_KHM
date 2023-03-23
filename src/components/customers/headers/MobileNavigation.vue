<template>
    <div class="overlay" data-overlay @click.prevent="mobileMenuClose()"></div>
    <div class="mobile-bottom-navigation">
        <button class="action-btn" @click.prevent="drawerOpenMenuMobile()">
        <ion-icon name="menu-outline"></ion-icon>
        </button>

        <button class="action-btn">
        <ion-icon name="bag-handle-outline"></ion-icon>
        <span class="count">0</span>
        </button>

        <button class="action-btn">
        <ion-icon name="home-outline"></ion-icon>
        </button>

        <button class="action-btn">
        <ion-icon name="heart-outline"></ion-icon>

        <span class="count">0</span>
        </button>

        <button class="action-btn" data-mobile-menu-open-btn>
        <ion-icon name="grid-outline"></ion-icon>
        </button>
    </div>
    <!-- Drawer Navigation Mobile -->
    <nav class="mobile-navigation-menu  has-scrollbar" id="drawerMobileMenu">
          <div class="menu-top">
            <h2 class="menu-title">Menu</h2>
            <!-- Button Close Drawer -->
            <button class="menu-close-btn"  id="data-mobile-menu-close-btn" @click.prevent="mobileMenuClose()">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>

          <ul class="mobile-menu-category-list">
            <!-- Sub Categories -->
            <li class="menu-category">
              <button class="accordion-menu" data-accordion-btn @click.prevent="subMenuAccordion()">
                <p class="menu-title">Perfume</p>

                <div>
                  <ion-icon name="add-outline" class="add-icon"></ion-icon>
                  <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
                </div>
              </button>

              <ul class="submenu-category-list" id="data-accordion">

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Clothes Perfume</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Deodorant</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Flower Fragrance</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Air Freshener</a>
                </li>

              </ul>

            </li>

            <li class="menu-category">
              <a href="#" class="menu-title">Blog</a>
            </li>

            <li class="menu-category">
              <a href="#" class="menu-title">Hot Offers</a>
            </li>

          </ul>

          <div class="menu-bottom">

            <ul class="menu-category-list">

              <li class="menu-category">

                <button class="accordion-menu" data-accordion-btn>
                  <p class="menu-title">Language</p>

                  <ion-icon name="caret-back-outline" class="caret-back"></ion-icon>
                </button>

                <ul class="submenu-category-list" data-accordion>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">English</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Espa&ntilde;ol</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Fren&ccedil;h</a>
                  </li>

                </ul>

              </li>

              <li class="menu-category">
                <button class="accordion-menu" data-accordion-btn>
                  <p class="menu-title">Currency</p>
                  <ion-icon name="caret-back-outline" class="caret-back"></ion-icon>
                </button>

                <ul class="submenu-category-list" data-accordion>
                  <li class="submenu-category">
                    <a href="#" class="submenu-title">USD &dollar;</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">EUR &euro;</a>
                  </li>
                </ul>
              </li>

            </ul>

            <ul class="menu-social-container">

              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>

            </ul>

          </div>

        </nav>
</template>

<!-- Script of Mobile Navigation -->
<script>
    export default{
        data() {
            return {
                drawerMobile: false
            }
        },
        methods: {
            async drawerOpenMenuMobile(){
                // mobile menu function
                const overlay = document.querySelector('[data-overlay]');
                // const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
                const drawerMobile = document.getElementById("drawerMobileMenu");
                
                drawerMobile.classList.add('active');
                overlay.classList.add('active');
            },
            async mobileMenuClose(){      
                const overlay = document.querySelector('[data-overlay]');    
                const drawerMobile = document.getElementById("drawerMobileMenu");

                drawerMobile.classList.remove('active');
                overlay.classList.remove('active');
            },
            // accordion variables
            async subMenuAccordion() {
                // const accordion = document.querySelectorAll('[data-accordion]');
                // const clickedBtn = this.nextElementSibling.classList.contains('active');
               
            }
        },
        mounted() {
           
        }
    }
</script>