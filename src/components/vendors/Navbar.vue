<template>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
    >
        <el-sub-menu index="1">
            <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
            </template>
            <el-menu-item-group>
                <template #title><span>Group One</span></template>
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
                <template #title><span>item four</span></template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
        </el-menu-item>
    </el-menu>
</template>



<script >
    import {
        Document,
        Menu as IconMenu,
        Location,
        Setting,
    } from '@element-plus/icons-vue';
    export default {
        components: {
            Document,
            IconMenu,
            Location,
            Setting,
        },
        data() {
          return{
              isCollapse: true
          }  
        },
        methods:{
            handleOpen(key,KeyPath){
                console.log(key, KeyPath)
            },
            handleClose(key,KeyPath){
                console.log(key, KeyPath)
            }
        }
   }
</script>

<style>
.c-nav {
    grid-area: nav;
    width: 215px;
    transition: width .25s cubic-bezier(0.4,0.0,0.2,1);
    overflow: hidden;
}
.c-nav.is-closed { width: 80px; }

.c-nav__header {
    padding: 30px;
    display: flex;
    justify-content: left
}

.c-nav__user {
    height: 100px;
    padding: 30px
}

.c-nav__menu.is-mobile {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFF;
    z-index: 10000;
    transition: opacity .15s ease, transform .3s ease;
    opacity: 1;
    transform: translateX(0);
}
.c-nav.is-closed .c-nav__menu.is-mobile {
    opacity: 0;
    transform: translateX(-100%);
}
.c-nav__menuitem a {
    width: 100%;
    transition: border .10s linear,
    width .25s cubic-bezier(0.4,0.0,0.2,1),
    background-color .25s cubic-bezier(0.4,0.0,0.2,1),
    color .25s cubic-bezier(0.4,0.0,0.2,1);
}
.c-nav__menuitem a svg {
    width: 24px;
    height: 24px;
}
.c-nav .c-nav__menuitem a span { transition: visibility .10s .25s cubic-bezier(0.4,0.0,0.2,1); }
.c-nav.is-closed .c-nav__menuitem a span {
    visibility: hidden;
    transition: visibility .25s cubic-bezier(0.4,0.0,0.2,1);
}

/* Actve state */
.c-nav__menuitem a.is-active {
    @apply  border-l-3 border-solid border-primary-normal bg-primary-light text-primary-normal;
}

@media (min-width: 768px) {
    .c-nav__menuitem a { width: 215px; }
}
</style>