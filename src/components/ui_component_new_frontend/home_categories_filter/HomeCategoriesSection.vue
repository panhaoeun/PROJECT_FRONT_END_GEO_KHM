<template>
    <div class="bottom-area text-nowrap">
        <div class="container-fluid">
            <div class="flex sided align-items-center">
                <!-- Dropdown menu -->
                <div class="cd-dropdown-wrapper">
                    <!-- Header -->
                    <div class="cd-dropdown-trigger font-bold text-sm" @click.prevent="openDropdownMenu">All Categories</div>
                    <nav class="cd-dropdown">
                        <h2 class="text-sm text-white uppercase">All Categories</h2>
                        <a href="#0" class="cd-close" @click.prevent="closeMenuDropdown">Close</a>
                        <ul class="cd-dropdown-content list-none">
                            <li class="has-children"
                                v-for="(categories, index) in commonCategoriesList"
                                :key="index"
                                @mouseover="hoverDropdownMenuItem"
                            >   
                                <!-- Name Categories -->
                                <a href="#" class="my-2 text-black tree-node">{{ categories?.catNameEn }}</a>
                                <!-- Sub Categories -->
                                <ul class="cd-dropdown-icons is-hidden list-none">
                                    <li class="go-back" @click="goBackLinkMenuCategories"><a href="#">Menu</a></li>
                                    <li class="see-all">
                                        <router-link to="#">Browse {{ categories?.catNameEn }}</router-link>
                                    </li>
                                    <li v-for="(subCat, index) in commonSubCategoriesList" :key="index">
                                        <router-link to="/" class="cd-dropdown-item" v-if="subCat.superCatId === categories?.catID">
                                            <h6>{{ subCat?.categoryNameEng }}</h6>
                                       </router-link>
                                    </li>
                                </ul> 
                            </li> 
                        </ul>
                    </nav> 
                    <!-- Headers -->
                </div> 
                <!-- List Top Categories Left-->
                <div>
                    <router-link 
                        :to="getUrl(item)"
                        v-for="(item, index) in headerLeft?.item"
                        :key="index"
                        class="text-black border-round hover:border-round "
                    >
                        <span>
                            {{ getTitle(item) }}
                        </span>
                    </router-link>
                </div>
                <!--Right-->
                <div>
                    <router-link 
                        :to="getUrl(item)"
                        v-for="(item, index) in headerRight?.item"
                        :key="index"
                        class="text-purple-900 font-bold border-round hover:border-round"
                    >
                        <span>
                            {{ getTitle(item) }}
                        </span>
                    </router-link>
                </div>
            </div>   
        </div>
    </div>
</template>
<!-- Script -->
<script>
  import  CommonListPublicServices from "@/services/customers/common_list/CommonListPublicServices.js";
  import $ from "jquery";
  import outsideClick from '@/directive/outside-click';
  import util from '@/mixin/util'
  export default {
    name: 'Categories Menu',
    directives: {
      outsideClick
    },
    data() {
        return {
            commonCategoriesList: null,
            commonSubCategoriesList: null,
            headerLeft: {
                item: [
                    {
                        id: 1,
                        title: 'Accessories',
                        url: '/discover/products'
                    },
                    {
                        id: 2,
                        title: 'Home & Garden',
                        url: '/discover/products'
                    },
                    {
                        id: 3,
                        title: 'Hair Extensions & Wigs',
                        url: '/discover/products'
                    },
                    {
                        id: 4,
                        title: 'Consumer Electronics',
                        url: '/discover/products'
                    },
                    {
                        id: 5,
                        title: 'Home Improvement & Lighting',
                        url: '/discover/products'
                    }
                ],
            },
            headerRight: {
                item: [
                    {
                        id: 1,
                        title: 'faq',
                        url: '/discover/products'
                    },
                    {
                        id: 2,
                        title: 'help',
                        url: '/discover/products'
                    },
                    {
                        id: 3,
                        title: 'contact us',
                        url: '/discover/products'
                    }
                ],
            }
        }
    },
    mixins: [util],
    mounted() {
        //on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
        // this.hoverDropdownMenuItem();
        // Common Categories
        this.getCommonCategories();
    },
    created() {
        this.commonServices = new CommonListPublicServices();
    },
    methods: {
        openDropdownMenu(){
            this.openToggleNavbar();
        },
        closeMenuDropdown(){
            this.openToggleNavbar();
        },
        openToggleNavbar(){
            var navIsVisible = ( !$('.cd-dropdown').hasClass('dropdown-is-active') ) ? true : false;
            $('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
            if( !navIsVisible ) {
                $('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
                    $('.has-children ul').addClass('is-hidden');
                    $('.move-out').removeClass('move-out');
                    $('.is-active').removeClass('is-active');
                });	
            }
        },
        hoverDropdownMenuItem(){
            const submenuDirection = ( !$('.cd-dropdown-wrapper').hasClass('open-to-left') ) ? 'right' : 'left';
            $('.cd-dropdown-content').menuAim({
                activate: function(row) {
                    $(row).children().addClass('is-active').removeClass('fade-out');
                    if( $('.cd-dropdown-content .fade-in').length == 0 ) $(row).children('ul').addClass('fade-in');
                },
                deactivate: function(row) {
                    $(row).children().removeClass('is-active');
                    if( $('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row)) ) {
                        $('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');
                        $(row).children('ul').addClass('fade-out')
                    }
                },
                exitMenu: function() {
                    $('.cd-dropdown-content').find('.is-active').removeClass('is-active');
                    return true;
                },
                submenuDirection: submenuDirection,
            });
            //submenu items - go back link
            $('.go-back').on('click', function(){
                var selected = $(this)
                selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
            });
            //on mobile - open submenu
            $('.has-children').children('a').on('click', function(event){
                //prevent default clicking on direct children of .has-children 
                event.preventDefault();
                var selected = $(this);
                selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
            });
        },
        goBackLinkMenuCategories(){
            const visibleNavSelected = $(this); 
            visibleNavSelected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
        },
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