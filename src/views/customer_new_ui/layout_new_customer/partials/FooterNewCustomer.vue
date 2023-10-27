<template>
  <div>
    <!-- <subscription /> -->
    <footer class="link-hover">
      <div class="top-area section pb-0">
        <div class="container">
            <ul class="table-tree">
             <!-- List all categories -->
              <footer-tree-node
                v-for="value in categories"
                :node="value"
                :key="value.id"
              />
            <!-- List all categories -->
            </ul>

          <div class="ptb-15 mt-20 mt-sm-15 b-t center-text">
            <router-link
              to="/" class="logo"
            >
              <img
                src="../../../../assets/company_logo/ecommerce_logo.png"
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
              <h4 class="bold mb-15">
                   Services
              </h4>
              <router-link
                :to="pageLink(item)"
                v-for="(item, i) in aboutServices"
                :key="i"
              >
                {{item.title}}
              </router-link>
            </div>

            <div class="col-lg-3 col-md-6 mb-15">
              <h4 class="bold mb-15">
                About
              </h4>
              <router-link
                :to="pageLink(item)"
                v-for="(item, i) in aboutFooter"
                :key="i"
              >
                {{item.title}}
              </router-link>
            </div>

            <!-- <div class="col-lg-3 col-md-6 payment mb-20 mb-sm-15">
              <h4 class="bold mb-15">
                Payment
              </h4>
              <div class="payment-icons">
                <a :href="item.link"
                   target="_blank"
                   v-for="(item, i) in payment"
                   :key="i"
                >
                  <lazy-image
                    :data-src="imageURL(item)"
                    :alt="item.title"
                    :title="item.title"
                  />
                </a>
              </div>

            </div> -->

            <div class="col-lg-3 col-md-6 mb-15 mb-xs">
              <h4 class="bold mb-15">
                Social
              </h4>
              <a :href="item.link" target="_blank" v-for="(item, i) in socialAbout" :key="i">
                <lazy-image
                  :data-src="imageURL(item.socialIcon)"
                  :alt="item.title"
                  :title="item.title"
                />
                {{item.title}}
              </a>
            </div>
          </div><!--row-->
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
  import util from '@/mixin/util'
  import {mapGetters} from 'vuex'
  import LazyImage from "@/components/ui_component_new_frontend/LazyImage";
//   import Subscription from "@/components/ui_component_new_frontend/Subscription";
//   import TreeNode from "@/components/ui_component_new_frontend/TreeNode";
  import FooterTreeNode from "@/components/ui_component_new_frontend/FooterTreeNode";
  export default {
    data() {
      return {
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
                title: 'Twitter'
            },
            {
                index: 3,
                link: '/',
                title: 'Facebook'
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
    mixins: [util],
    components: { LazyImage,FooterTreeNode},
    computed: {
      ...mapGetters('common', ['site_setting', 'categories', 'services', 'about', 'payment', 'social'])
    },
  }
</script>