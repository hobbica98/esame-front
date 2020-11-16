<template>
  <q-layout view="hHh lpR fFf">
    <router-view name="header" />
    <!--    <main-header></main-header>-->

    <q-drawer
      v-model="leftDrawerOpenModel"
      show-if-above
      bordered
      content-class="bg-white"
      :width="250"
    >
      <q-scroll-area class="fit">
        <router-view name="leftsidebar" />
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="main-page-container overflow-hidden-y">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import eventBus from '../utils/eventBus'

export default {
  name: 'main',
  components: { },
  data () {
    return {
      leftDrawerOpenModel: false,
      rightDrawerOpenModel: false
    }
  },
  computed: {

  },
  methods: {
    openDrawer: function (drawerStat) {
      this.leftDrawerOpenModel = drawerStat
    },
    openRightDrawer: function (drawerStat) {
      this.rightDrawerOpenModel = drawerStat
    }
  },
  mounted () {},
  created () {
    eventBus.$on('drawer-changed', this.openDrawer)
    eventBus.$on('right-drawer-changed', this.openRightDrawer)
  },
  beforeDestroy () {
    eventBus.$off('drawer-changed')
    eventBus.$off('right-drawer-changed', this.openRightDrawer)
  }
}
</script>

<style  lang="sass">
  .main-page-container
    height: 100vh
    .q-page
      padding-bottom: 120px
      height: 100% !important
      overflow-y: scroll !important

  .GNL

    &__toolbar
      height: 64px

    &__toolbar-input
      width: 55%

    &__drawer-item
      line-height: 24px
      border-radius: 0 24px 24px 0
      margin-right: 12px

      .q-item__section--avatar
        .q-icon
          color: #5f6368

      .q-item__label
        color: #3c4043
        letter-spacing: .01785714em
        font-size: .875rem
        font-weight: 500
        line-height: 1.25rem

    &__drawer-footer-link
      color: inherit
      text-decoration: none
      font-weight: 500
      font-size: .75rem

      &:hover
        color: #000
</style>
