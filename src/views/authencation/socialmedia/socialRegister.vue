<template>
     <div class="auth-social-media">
            <div class="my-3" v-for="item in socialItem" :key="item">
                <Button class="google p-2 p-button-outlined border-500" aria-label="Google" style="height: 50px; width: 100%;">
                    <div class="auth-title px-4 py-4">
                        <div class="auth-social" style="flex: 0 1 0% !important">
                            <img :src="item.image" alt=""  class="border-200" width="25"> 
                        </div>
                            <div class="px-3 text-center flex align-items-center text-color font-semibold" >
                            <span style="text-align: center;padding-right: 10px;">{{ item.title }}</span>
                            </div>
                    </div>
                </Button>
            </div>
        </div>
</template>

<script>
        export default{
            data(){
                return {
                    socialItem: [
                        {
                            id: '1',
                            title: 'Continue with Facebook',
                            image: 'https://www.facebook.com/images/fb_icon_325x325.png'
                        },
                        {
                            id: '2',
                            title: 'Continue with Google',
                            image: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png'
                        },
                        {
                            id: '3',
                            title: 'Continue with Gmail',
                            image: 'https://img.icons8.com/ios/100/null/new-post--v1.png'
                        },
                    ]
                }
            }
        }
</script>