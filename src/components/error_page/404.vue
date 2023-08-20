<template>
<<<<<<< HEAD
   <div class="container text-center px-2 py-2 mt-10" style="margin-top: 120px;">
     <h1 class="text-center text-2xl my-10 zoom-area">404 Error Page #2</h1>
    <p class="zoom-area"><b>CSS</b> animations to make a cool 404 page. </p>
    <section class="error-container">
    <span class="four"><span class="screen-reader-text">4</span></span>
    <span class="zero"><span class="screen-reader-text">0</span></span>
    <span class="four"><span class="screen-reader-text">4</span></span>
    </section>
    <div class="link-container">
    <a target="_blank" href="https://www.silocreativo.com/en/creative-examples-404-error-css/" class="more-link">Visit the original article</a>
    </div>
   </div>
</template>
<!-- 404 Style -->
    <style>
    .error-container {
    text-align: center;
    font-size: 106px;
    font-family: 'Catamaran', sans-serif;
    font-weight: 800;
    margin: 70px 15px;
    }
    .error-container > span {
    display: inline-block;
    position: relative;
    }
    .error-container > span.four {
    width: 136px;
    height: 43px;
    border-radius: 999px;
    background:
        linear-gradient(140deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 43%, transparent 44%, transparent 100%),
        linear-gradient(105deg, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.06) 41%, rgba(0, 0, 0, 0.07) 76%, transparent 77%, transparent 100%),
        linear-gradient(to right, #d89ca4, #e27b7e);
    }
    .error-container > span.four:before,
    .error-container > span.four:after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 999px;
    }
    .error-container > span.four:before {
    width: 43px;
    height: 156px;
    left: 60px;
    bottom: -43px;
    background:
        linear-gradient(128deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 40%, transparent 41%, transparent 100%),
        linear-gradient(116deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 50%, transparent 51%, transparent 100%),
        linear-gradient(to top, #99749D, #B895AB, #CC9AA6, #D7969E, #E0787F);
    }
    .error-container > span.four:after {
    width: 137px;
    height: 43px;
    transform: rotate(-49.5deg);
    left: -18px;
    bottom: 36px;
    background: linear-gradient(to right, #99749D, #B895AB, #CC9AA6, #D7969E, #E0787F);
    }
    .error-container > span.zero {
    vertical-align: text-top;
    width: 156px;
    height: 156px;
    border-radius: 999px;
    background: linear-gradient(-45deg, transparent 0%, rgba(0, 0, 0, 0.06) 50%,  transparent 51%, transparent 100%),
        linear-gradient(to top right, #99749D, #99749D, #B895AB, #CC9AA6, #D7969E, #ED8687, #ED8687);
    overflow: hidden;
    animation: bgshadow 5s infinite;
    }
    .error-container > span.zero:before {
    content: '';
    display: block;
    position: absolute;
    transform: rotate(45deg);
    width: 90px;
    height: 90px;
    background-color: transparent;
    left: 0px;
    bottom: 0px;
    background:
        linear-gradient(95deg, transparent 0%, transparent 8%, rgba(0, 0, 0, 0.07) 9%, transparent 50%, transparent 100%),
        linear-gradient(85deg, transparent 0%, transparent 19%, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.07) 91%, transparent 92%, transparent 100%);
    }
    .error-container > span.zero:after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 999px;
    width: 70px;
    height: 70px;
    left: 43px;
    bottom: 43px;
    background: #FDFAF5;
    box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.1);
    }

    .screen-reader-text {
        position: absolute;
        top: -9999em;
        left: -9999em;
    }
        
    @keyframes bgshadow {
    0% {
        box-shadow: inset -160px 160px 0px 5px rgba(0, 0, 0, 0.4);
    }
    45% {
        box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
    }
    55% {
        box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
    }
    100% {
        box-shadow: inset 160px -160px 0px 5px rgba(0, 0, 0, 0.4);
    }
    }

    /* demo stuff */
    .zoom-area { 
        max-width: 490px;
        margin: 30px auto 30px;
        font-size: 19px;
        text-align: center;
    }
    .link-container {
    text-align: center;
    }
    a.more-link {
    text-transform: uppercase;
    font-size: 13px;
        background-color: #de7e85;
        padding: 10px 15px;
        border-radius: 0;
        color: #fff;
        display: inline-block;
        margin-right: 5px;
        margin-bottom: 5px;
        line-height: 1.5;
        text-decoration: none;
        margin-top: 50px;
        letter-spacing: 1px;
    }
    </style>
=======
    <div id="notfound">
		<div class="notfound-bg">
            <NotFound404Page/>
        </div>
		<div class="notfound">
			<div class="notfound-404">
				<h1>404</h1>
			</div>
			<h2>we are sorry, but the page you requested was not found</h2>
			<router-link to="/" class="home-btn">Go Home</router-link>
			<router-link to="#" class="contact-btn">Contact us</router-link>
			<div class="notfound-social">
				<a href="#"><i class="fa fa-facebook"></i></a>
				<a href="#"><i class="fa fa-twitter"></i></a>
				<a href="#"><i class="fa fa-pinterest"></i></a>
				<a href="#"><i class="fa fa-google-plus"></i></a>
			</div>
		</div>
	</div>
</template>

<script>
  import NotFound404Page from "../icons/illustrations_icons_svg/404/Error404NotFound.vue";
  export default {
    components: {
        NotFound404Page
    },
    name: 'NotFound'
  }

</script>

<style>
    svg#freepik_stories-404-error-page-not-found-with-people-connecting-a-plug:not(.animated) .animable {opacity: 0;}
    svg#freepik_stories-404-error-page-not-found-with-people-connecting-a-plug.animated #freepik--background-complete--inject-19 {
    animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideDown,3s Infinite  linear wind;animation-delay: 0s,2s;}svg
    #freepik_stories-404-error-page-not-found-with-people-connecting-a-plug.animated #freepik--Stains--inject-19 {
        animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) fadeIn,1.5s Infinite  linear floating;animation-delay: 0s,1s;
    }
    svg#freepik_stories-404-error-page-not-found-with-people-connecting-a-plug.animated #freepik--character-2--inject-19 {
        animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideDown,1.5s Infinite  linear floating;animation-delay: 0s,1s;
    }svg
    #freepik_stories-404-error-page-not-found-with-people-connecting-a-plug.animated
     #freepik--character-1--inject-19 {animation: 1s 1 forwards linear slideUp,1.5s Infinite  linear floating;animation-delay: 0s,1s;}
     svg#freepik_stories-404-error-page-not-found-with-people-connecting-a-plug.animated 
     #freepik--error-404--inject-19 {animation: 1s 1 forwards linear zoomOut;animation-delay: 0s;}          
    @keyframes slideDown {       
        0% {   
            opacity: 0; 
            transform: translateY(-30px);              
        }                
        100% {     
            opacity: 1;                    
            transform: translateY(0);         
        }           
    }                       
    @keyframes wind {           
        0% {               
                transform: rotate( 0deg );              
        }           
        25% {                
            transform: rotate( 1deg );           
        }               
        75% {         
        transform: rotate( -1deg );             
    }            }                
    @keyframes fadeIn {         
            0% {                  
                opacity: 0;              
            }          
            100% {            
                opacity: 1;          
                    
            }          
                
    }                    
    @keyframes floating {          
                0% {               
                        opacity: 1;                    
                        transform: translateY(0px);            
                    
                }                
                50% {                 
                        transform: translateY(-10px);    
                                
                    }                
                100% {                 
                    opacity: 1;                
                    transform: translateY(0px);        
                
                }          
    }           
    @keyframes slideUp {            
                0% {                 
                    opacity: 0;                   
                    transform: translateY(30px);   
                }         
                100% {       
                    opacity: 1;          
                    transform: inherit;       
                }            
    }              
    @keyframes zoomOut {         
                0% {                   
                    opacity: 0;            
                    transform: scale(1.5);               
                }          
                100% {        
                    opacity: 1;             
                    transform: scale(1);       
                }       
    }        
    #notfound {
        position: relative;
        height: 100vh;
    }

    #notfound .notfound-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgb(205, 38, 38);
        background-size: cover;
    }

    #notfound .notfound-bg:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 0, 36, 0.7);
    }

    #notfound .notfound {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
    }

    .notfound {
        max-width: 910px;
        width: 100%;
        line-height: 1.4;
        text-align: center;
    }

    .notfound .notfound-404 {
        position: relative;
        height: 200px;
    }

    .notfound .notfound-404 h1 {
        font-family: 'Montserrat', sans-serif;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
        font-size: 220px;
        font-weight: 900;
        margin: 0px;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 10px;
    }

    .notfound h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 22px;
        font-weight: 700;
        text-transform: uppercase;
        color: #fff;
        margin-top: 20px;
        margin-bottom: 15px;
    }

    .notfound .home-btn, .notfound .contact-btn {
        font-family: 'Montserrat', sans-serif;
        display: inline-block;
        font-weight: 700;
        text-decoration: none;
        background-color: transparent;
        border: 2px solid transparent;
        text-transform: uppercase;
        padding: 13px 25px;
        font-size: 18px;
        border-radius: 40px;
        margin: 7px;
        -webkit-transition: 0.2s all;
        transition: 0.2s all;
    }

    .notfound .home-btn:hover, .notfound .contact-btn:hover {
        opacity: 0.9;
    }

    .notfound .home-btn {
        color: rgba(255, 0, 36, 0.7);
        background: #fff;
    }

    .notfound .contact-btn {
        border: 2px solid rgba(255, 255, 255, 0.9);
        color: rgba(255, 255, 255, 0.9);
    }

    .notfound-social {
    margin-top: 25px;
    }

    .notfound-social>a {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        width: 40px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
        margin: 0px 6px;
        -webkit-transition: 0.2s all;
        transition: 0.2s all;
    }
    .notfound-social>a:hover {
        color: rgba(255, 0, 36, 0.7);
        background-color: #fff;
        border-radius: 50%;
    }

    @media only screen and (max-width: 767px) {
    .notfound .notfound-404 h1 {
    font-size: 182px;
    }
    }

    @media only screen and (max-width: 480px) {
    .notfound .notfound-404 {
    height: 146px;
    }
    .notfound .notfound-404 h1 {
    font-size: 146px;
    }
    .notfound h2 {
    font-size: 16px;
    }
    .notfound .home-btn, .notfound .contact-btn {
    font-size: 14px;
    }
    }
  center {
    margin: 15vw;
  }

  h1 {
    color: var(--border);
    font-size: 2em;
  }

</style>
>>>>>>> main
