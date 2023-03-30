<template>
    <!-- Header Top -->
    <HeaderTop/>
     <header class="bg-header-standard pb-1">
        <!-- Headers -->
        <div class="header-main">
          <div class="container">
            <!-- Logo -->
            <a href="#" class="header-logo">
              <img src="../../assets/company_logo/ecommerce_logo.png" alt="Anon's logo" width="100" class="border-round-md shadow-md">
            </a>
            <!-- INput -->
            <div class="header-search-container">
                <!-- Input Search Products -->
              <input type="search" name="search" class="search-field" placeholder="Enter your product name...">
              <button class="search-btn">
                <ion-icon name="search-outline" style="color: #fff; font-weight: bold;"></ion-icon>
              </button>
            </div>
            <!--  -->
            <div class="header-user-actions">
              <button class="action-btn" @click="showNotAuthentications($event)">
                <ion-icon name="person-outline" class="text-white"></ion-icon>
              </button>
              <button class="action-btn">
                <ion-icon name="heart-outline" class="text-white"></ion-icon>
                <span class="count">0</span>
              </button>
              <button class="action-btn">
                 <ion-icon name="bag-handle-outline" class="text-white"></ion-icon>
                <span class="count">40</span>
              </button>



            <!-- Toggle Not Register or Not Login -->
            <OverlayPanel ref="toggleNotAuth">
                <!-- Toggle My Account -->
                <div class="px-1 py-1">
                    <div class="-menu" aria-labelledby="navbarDropdown">
                        <p>Welcome Phzarkhmer</p>
                        <div class="flex flex-column align-items-start justify-content-start">
                            <div class="flex align-items-center justify-content-start  h-4rem ">
                                  <Button
                                    label="Register"
                                    class=" py-2 p-button-outlined w-10rem mr-3" />
                                <Button label="Login" class=" py-2 w-10rem"/>
                            </div>
                        </div>
                        <!-- Title -->
                        <div class="flex flex-column align-items-start justify-content-start py-2">
                            <div class="flex align-items-center justify-content-start  h-2rem">
                                <router-link to="/">
                                    <span class="font-bold text-sm text-black">My Account</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </OverlayPanel>
            <!--Overlay Panel of Toggle My Accounts-->
            <OverlayPanel ref="toggleMyAccount">
               <!-- Toggle My Account -->
               <div class="px-1 py-1">
                    <div class="-menu" aria-labelledby="navbarDropdown">
                        <div class="flex align-items-center justify-content-center">
                            <Avatar image="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" class="mr-2" size="xlarge" shape="circle" />
                            <div class="flex flex-column card-container align-content-center">
                                <div class="flex align-items-start justify-content-start text-lg">
                                    Phzarkhmer
                                </div>
                                  <div class="flex align-items-start justify-content-start text-sm">
                                    devpanha@gmail.com                                   
                                </div>

                            </div>
                        </div>
                        <!-- List -->
                       <div class="flex flex-column align-items-start justify-content-start">
                            <div class="flex align-items-center justify-content-start  h-2rem">
                                <router-link to="/">
                                    <span class="font-bold text-lg">Sign Out </span>
                                </router-link>
                            </div>
                       </div>
                    </div>
               </div>
            </OverlayPanel>

              
            </div>

          </div>

        </div>

        <nav class="desktop-navigation-menu text-white">

          <div class="container">

            <ul class="desktop-menu-category-list text-white">

              <li class="menu-category">
                <a href="#" class="menu-title">Home</a>
              </li>

              <li class="menu-category">
                <a href="#" class="menu-title">Categories</a>

                <div class="dropdown-panel">

                  <ul class="dropdown-panel-list">

                    <li class="menu-title">
                      <a href="#">Electronics</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Desktop</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Laptop</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Camera</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Tablet</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Headphone</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">
                        <!-- <img src="./assets/images/electronics-banner-1.jpg" alt="headphone collection" width="250" -->
                          height="119">
                      </a>
                    </li>

                  </ul>

                  <ul class="dropdown-panel-list">

                    <li class="menu-title">
                      <a href="#">Men's</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Formal</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Casual</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Sports</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Jacket</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Sunglasses</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">
                        <!-- <img src="./assets/images/mens-banner.jpg" alt="men's fashion" width="250" height="119"> -->
                      </a>
                    </li>

                  </ul>

                  <ul class="dropdown-panel-list">

                    <li class="menu-title">
                      <a href="#">Women's</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Formal</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Casual</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Perfume</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Cosmetics</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Bags</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">
                        <!-- <img src="./assets/images/womens-banner.jpg" alt="women's fashion" width="250" height="119"> -->
                      </a>
                    </li>

                  </ul>

                  <ul class="dropdown-panel-list">

                    <li class="menu-title">
                      <a href="#">Electronics</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Smart Watch</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Smart TV</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Keyboard</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Mouse</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">Microphone</a>
                    </li>

                    <li class="panel-list-item">
                      <a href="#">
                        <!-- <img src="./assets/images/electronics-banner-2.jpg" alt="mouse collection" width="250" height="119"> -->
                      </a>
                    </li>

                  </ul>

                </div>
              </li>

              <li class="menu-category">
                <a href="#" class="menu-title">Men's</a>

                <ul class="dropdown-list">

                  <li class="dropdown-item">
                    <a href="#">Shirt</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Shorts & Jeans</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Safety Shoes</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Wallet</a>
                  </li>

                </ul>
              </li>

              <li class="menu-category">
                <a href="#" class="menu-title">Women's</a>

                <ul class="dropdown-list">

                  <li class="dropdown-item">
                    <a href="#">Dress & Frock</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Earrings</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Necklace</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Makeup Kit</a>
                  </li>

                </ul>
              </li>

              <li class="menu-category">
                <a href="#" class="menu-title">Jewelry</a>

                <ul class="dropdown-list">

                  <li class="dropdown-item">
                    <a href="#">Earrings</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Couple Rings</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Necklace</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Bracelets</a>
                  </li>

                </ul>
              </li>

              <li class="menu-category">
                <a href="#" class="menu-title">Perfume</a>

                <ul class="dropdown-list">

                  <li class="dropdown-item">
                    <a href="#">Clothes Perfume</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Deodorant</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Flower Fragrance</a>
                  </li>

                  <li class="dropdown-item">
                    <a href="#">Air Freshener</a>
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

          </div>

        </nav>
        <!--=================Mobile Navigation==========-->
        <MobileNavigation/>
        <nav class="mobile-navigation-menu  has-scrollbar" data-mobile-menu>

          <div class="menu-top">
            <h2 class="menu-title">Menu</h2>

            <button class="menu-close-btn" data-mobile-menu-close-btn>
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>

          <ul class="mobile-menu-category-list">

            <li class="menu-category">
              <a href="#" class="menu-title">Home</a>
            </li>

            <li class="menu-category">

              <button class="accordion-menu" data-accordion-btn>
                <p class="menu-title">Men's</p>

                <div>
                  <ion-icon name="add-outline" class="add-icon"></ion-icon>
                  <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
                </div>
              </button>

              <ul class="submenu-category-list" data-accordion>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Shirt</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Shorts & Jeans</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Safety Shoes</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Wallet</a>
                </li>

              </ul>

            </li>

            <li class="menu-category">

              <button class="accordion-menu" data-accordion-btn>
                <p class="menu-title">Women's</p>

                <div>
                  <ion-icon name="add-outline" class="add-icon"></ion-icon>
                  <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
                </div>
              </button>

              <ul class="submenu-category-list" data-accordion>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Dress & Frock</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Earrings</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Necklace</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Makeup Kit</a>
                </li>

              </ul>

            </li>

            <li class="menu-category">

              <button class="accordion-menu" data-accordion-btn>
                <p class="menu-title">Jewelry</p>

                <div>
                  <ion-icon name="add-outline" class="add-icon"></ion-icon>
                  <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
                </div>
              </button>

              <ul class="submenu-category-list" data-accordion>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Earrings</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Couple Rings</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Necklace</a>
                </li>

                <li class="submenu-category">
                  <a href="#" class="submenu-title">Bracelets</a>
                </li>

              </ul>

            </li>

            <li class="menu-category">

              <button class="accordion-menu" data-accordion-btn>
                <p class="menu-title">Perfume</p>

                <div>
                  <ion-icon name="add-outline" class="add-icon"></ion-icon>
                  <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
                </div>
              </button>

              <ul class="submenu-category-list" data-accordion>

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

      </header>
</template>

<!-- Export NavigationBar -->
<script>
    import HeaderTop from "../../components/customers/headers/TopHeader.vue";
    import MobileNavigation from "../../components/customers/headers/MobileNavigation.vue";
    export default{
        components: {
            HeaderTop,
            MobileNavigation
        },
        data(){
            return{
                selectedCity: null,
                cities: [
                    { name: 'New York', code: 'NY' },
                    { name: 'Rome', code: 'RM' },
                    { name: 'London', code: 'LDN' },
                    { name: 'Istanbul', code: 'IST' },
                    { name: 'Paris', code: 'PRS' }
                ]
            }
        },
        methods: {
            showMyAccount(event){
               this.$refs.toggleMyAccount.toggle(event);
            },
            // Not Account Authentications
            showNotAuthentications(event){
                this.$refs.toggleNotAuth.toggle(event);
            }
        }
    }
</script>
