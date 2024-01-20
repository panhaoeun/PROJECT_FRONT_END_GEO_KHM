<template>
  <div>
    <!-- <subscription /> -->
    <footer class="link-hover bg-red-50">
      <div class="top-area section pb-0">
        <div class="container">
            <!-- List all categories -->
            <!-- <ul class="table-tree">
              <footer-tree-node
                v-for="value in commonCategoriesList"
                :node="value"
                :key="value.id"
              />
            </ul> -->
        
         <!-- Logo E-Commerce -->
          <div class="ptb-15 mt-20 mt-sm-15 b-t center-text">
            <router-link
              to="/" class="logo"
            >
              <img
                src="../../../../assets/company_logo/geo_khm.png"
                :alt="$t('footer.siteLogo')"
                height="100"
                width="100"
              >
            </router-link>
          </div>
        </div>
        <!--container-->
      </div>

      <div class="bottom-area section pb-0">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 mb-15">
              <h5 class="bold mb-15">
                   Services
              </h5>
              <router-link
                :to="pageLink(item)"
                v-for="(item, i) in aboutServices"
                :key="i"
              >
                {{item.title}}
              </router-link>
            </div>

            <div class="col-lg-3 col-md-6 mb-15">
              <h5 class="bold mb-15">
                About
              </h5>
              <router-link
                :to="pageLink(item)"
                v-for="(item, i) in aboutFooter"
                :key="i"
              >
                {{item.title}}
              </router-link>
            </div>
            <div class="col-lg-3 col-md-6 mb-15 mb-xs">
              <h5 class="bold mb-15">
                Stay connected
              </h5>
              <a :href="item.link" target="_blank" v-for="(item, i) in socialAbout" :key="i">
                <lazy-image
                  :data-src="item.socialIcon"
                  :alt="item.title"
                  :title="item.title"
                />
                {{item.title}}
              </a>
            </div>
             <div class="col-lg-3 col-md-6 mb-15 mb-xs">
              <h5 class="bold mb-15">
                Contact Us
              </h5>
               <div class="payment-icons pb-2">
                <p class="text-black">
                   Phone Number: 
                   <label class="font-bold">+85516387467</label>
                </p>
              </div>
              <div class="payment-icons">
                <span class="text-black">
                   Address:  Sangkat Tuol Sangkae,
                    Khan Russey Keo,
                    Phnom Penh, Cambodia.
                </span>
              </div>
             

            </div>

          </div>
          <!--row-->
          <p class="ptb-15 mt-10 b-t center-text">
            © {{ getYear }} -  All rights reserved by C.A.I.T
          </p>
        </div>
        <!--container-->
      </div>
    </footer>
  </div>

</template>

<script>
  import  CommonListPublicServices from "@/services/customers/common_list/CommonListPublicServices.js";
  import util from '@/mixin/util'
  import LazyImage from "@/components/ui_component_new_frontend/LazyImage";
//   import Subscription from "@/components/ui_component_new_frontend/Subscription";
//   import TreeNode from "@/components/ui_component_new_frontend/TreeNode";
//   import FooterTreeNode from "@/components/ui_component_new_frontend/FooterTreeNode";
  export default {
    data() {
      return {
        commonCategoriesList: null,
        commonSubCategoriesList: null,
        socialAbout: [
            {
                index: 1,
                title: 'Instagram',
                link: '/',
                socialIcon: 'https://cdn.ishop.cholobangla.com/uploads/instagram.png',
            },
            {
                index: 2,
                link: '/',
                title: 'Twitter',
                socialIcon: 'https://cdn.ishop.cholobangla.com/uploads/twitter.png',
            },
            {
                index: 3,
                link: '/',
                title: 'Facebook',
                socialIcon: 'https://cdn.ishop.cholobangla.com/uploads/facebook.png'
            }
        ],
        aboutFooter: [
            {
                index: 1,
                link: '/',
                title: 'Refund Policy'
            },
            {
                index: 2,
                link: '/',
                title: 'Privacy Policy'
            },
            {
                index: 3,
                link: '/',
                title: 'Help'
            },
            {
                index: 4,
                link: '/',
                title: 'Sitemap'
            }
        ],
        aboutServices: [
            {
                index: 1,
                link: '/',
                title: 'About'
            },
            {
                index: 2,
                link: '/',
                title: 'Faq'
            },
            {
                index: 3,
                link: '/',
                title: 'Contact'
            }
        ]
      }
    },
    mounted(){
        // Common Categories
        this.getCommonCategories();
    },
    created() {
        this.commonServices = new CommonListPublicServices();
    },
    mixins: [util],
    components: { LazyImage},
    methods: {
        // Categories
        getCommonCategories(){
            this.commonServices.getCommonCategoriesSubCategories()
            .then((common)=> {
                if (!common) {
                    this.commonCategoriesList = Array.isArray() ?? [];
                    this.commonSubCategoriesList = Array.isArray() ?? [];
                }
                this.commonCategoriesList = common?.categories;
                this.commonSubCategoriesList = common?.subCategory;
            })
        },
    }
  }
</script>