import jquery from "jquery";

   /*====== Sidebar menu Active ======*/
(function ($) {
    "use strict";
   function mobileHeaderActive() {
       var navbarTrigger = $('.mobile-header-button-active'),
           endTrigger = $('.sidebar-close'),
           container = $('.mobile-header-active'),
           wrapper4 = $('.main-wrapper');
           console.log(navbarTrigger)

       wrapper4.prepend('<div class="body-overlay-1"></div>');

       navbarTrigger.on('click', function (e) {
           e.preventDefault();
           container.addClass('sidebar-visible');
           wrapper4.addClass('overlay-active-1');
       });

       endTrigger.on('click', function () {
           container.removeClass('sidebar-visible');
           wrapper4.removeClass('overlay-active-1');
       });

       $('.body-overlay-1').on('click', function () {
           container.removeClass('sidebar-visible');
           wrapper4.removeClass('overlay-active-1');
       });
   }
   mobileHeaderActive();
})(jquery);