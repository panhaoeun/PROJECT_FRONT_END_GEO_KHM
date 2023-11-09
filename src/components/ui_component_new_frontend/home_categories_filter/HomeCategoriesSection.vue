<template>
    <div class="bottom-area text-nowrap">
        <div class="container-fluid">
            <div class="flex sided">
                <!-- Dropdown menu -->
                <div class="cd-dropdown-wrapper">
                    <!-- Header -->
                    <router-link class="cd-dropdown-trigger hover:text-white text-md" @click.prevent="openDropdownMenu" to="#">All Categories</router-link>
                    <nav class="cd-dropdown">
                        <h2 class="text-sm text-white">All Categories</h2>
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
                                    <li class="go-back" @click="goBackLinkMenuCategories"><a href="#0">Menu</a></li>
                                    <li class="see-all">
                                        <router-link to="#">Browse {{ categories?.catNameEn }}</router-link>
                                    </li>
                                    <li v-for="(subCat, index) in commonSubCategoriesList" :key="index">
                                        <a class="cd-dropdown-item align-content-center item-1" v-if="subCat.superCatId === categories?.catID" href="#">
                                            <h6>{{ subCat?.categoryNameEng }}</h6>
                                        </a>
                                    </li>
                                </ul> 
                            </li> 
                        </ul>
                    </nav> 
                    <!-- Headers -->
                </div> 
                <!-- List Top Categories -->
                <div>
                    <p>dsadasd</p>
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
  export default {
    name: 'Categories Menu',
    directives: {
      outsideClick
    },
    data() {
        return {
            commonCategoriesList: null,
            commonSubCategoriesList: null,

        }
    },
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