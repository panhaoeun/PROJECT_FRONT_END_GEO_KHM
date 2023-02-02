<template>
    <div class="footer-hglobal">
        <footer class="gfooter">
            <div class="container px-4 py-4">
                <div class="gfoot px-2">
                    <table class="gtfoot-pro">
                        <tbody>
                            <tr>
                                <!-- Buy -->
                                <td>
                                    <h3 class="gf-pro-tt">Buy</h3>
                                    <ul class="ul-gtt">
                                        <li class="gf-li">
                                            <router-link to="/" class="a-info  hover:underline">
                                                Registration
                                            </router-link>
                                        </li>
                                        <li class="gf-li">
                                            <router-link to="/" class="a-info  hover:underline">
                                                Bidding & buying help
                                            </router-link>
                                        </li>
                                        <li class="gf-li">
                                            <router-link to="/" class="a-info  hover:underline">
                                                Stores
                                            </router-link>            
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Privacy -->
                <table>
                    <tbody>
                        <tr>
                            <td colspan="2"></td>
                        </tr>
                        <tr valing="top"> 
                            <td class="px-2">
                                Copyright © 1995-2023 eBay Inc. All Rights Reserved. 
                                <router-link to="/" class="hover:underline">
                                    Accessibility
                                </router-link>,
                                <router-link to="/">
                                    User Agreement
                                </router-link>,
                                <router-link to="/">
                                    Payments Terms of Use
                                </router-link>,
                                <router-link to="/">
                                    Cookies
                                </router-link>,
                                <router-link to="/">
                                    Your Privacy Choices
                                </router-link>,
                                and
                                <router-link to="/">
                                    AdChoice
                                </router-link>
                            </td>
                            <td nowarp align="center"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </footer>
    </div>
</template>

<script>
        export default {
            data() {
                return{
                    footers: [
                        {
                            id: '1',

                        }
                    ]
                }
            }
        }
</script>