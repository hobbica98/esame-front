<template>
  <q-header elevated class="bg-white text-grey-8" height-hint="64">
    <!--    header per schermi sotto di sm-->
    <template v-if="$q.screen.lt.sm">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          v-if="$route.name != 'dashboard'"
          @click="()=> $router.go(-1)"
          aria-label="back"
          icon="keyboard_arrow_left"
          class=""
        />
        <q-btn
          flat
          dense
          round
          @click="openDrawer"
          aria-label="Menu"
          icon="menu"
          class=""
        />
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="26px">
              <img :src="imageProfile" />
            </q-avatar>
            <q-tooltip>{{$t('account')}}</q-tooltip>
            <q-menu transition-show="flip-right" transition-hide="flip-left">
              <q-list v-if="isAuthenticated" style="min-width: 100px">
                <q-item clickable @click="logout">
                  <q-item-section>{{$t('logout')}}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
      <q-space />
      <q-space />
    </template>
    <q-toolbar v-else class="GNL__toolbar">
      <q-btn
        flat
        dense
        round
        @click="openDrawer"
        :aria-label="$t('menu')"
        icon="menu"
        class="q-mr-sm"
      />

      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
        <q-btn round flat>
          <q-avatar size="26px">
            <img :src="imageProfile" />
          </q-avatar>
          <q-tooltip>{{$t('account')}}</q-tooltip>
          <q-menu transition-show="flip-right" transition-hide="flip-left">
            <q-list v-if="isAuthenticated" style="min-width: 100px">
              <q-item clickable @click="logout">
                <q-item-section>{{$t('logout')}}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex'
import _ from 'lodash'
import eventBus from '../utils/eventBus'

export default {
  name: 'mainHeader',
  components: { },
  props: ['searchbar', 'leftDrawer'],
  data () {
    return {
      backButtonHidden: true,
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      search: '',
      pageTitle: '',
      showAdvanced: false,
      showDateOptions: false,
      exactPhrase: '',
      hasWords: '',
      excludeWords: '',
      byWebsite: '',
      byDate: 'Any time',
      toolbar: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated', 'getSearch']),
    imageProfile: function () {
      const email = _.get(this, 'currentUser.email')
      return `https://eu.ui-avatars.com/api/?name=${email}&color=ffffff&background=ef7d44`
    },
    cartButtonVisibility: function () {
      const noCartButtonRouteNames = ['Checkout']
      const { name: currentRouteName } = this.$route
      return !_.includes(noCartButtonRouteNames, currentRouteName)
    },
    onSearchInputHeader: function (searchString) {
      let { search, string } = this
      console.log('searchStringHEADER', searchString)
      if (searchString) {
        string = searchString
        return string
      } else {
        string = search
        return string
      }
    },
    isRouteEstimateDetail () {
      return this.$route.name === 'estimateDetail'
    }
  },
  watch: {
    $route: function (to) {
      const backButtonHidden = _.get(to, 'meta.backButtonHidden')
      this.backButtonHidden = backButtonHidden
    }
  },
  methods: {
    ...mapMutations(['clearUserData']),
    resetToMain: function () {
      const currentRouteName = _.get(this, '$route.name')
      if (currentRouteName === 'MainPage') return
      this.$router.replace('/')
    },
    logout: function () {
      this.clearUserData()
      // this.resetToMain()
      this.goLogin()
    },
    onClear () {
      this.pagetitle = ''
    },
    openDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
      console.log(this.leftDrawerOpen)
      eventBus.$emit('drawer-changed', this.leftDrawerOpen)
    },
    openRightDrawer () {
      console.log('clicked btn right sidebar')
      this.rightDrawerOpen = !this.rightDrawerOpen
      eventBus.$emit('right-drawer-changed', this.rightDrawerOpen)
    },
    goLogin () {
      this.$router.push({
        name: 'login'
      })
    },
    goProfile () {
      this.$router.push({
        name: 'profile'
      })
    },
    onSearchInput (searchString) {
      eventBus.$emit('search-changed', searchString)
    },
    cancelSearch () {
      this.search = ''
      eventBus.$emit('search-changed', '')
    },
    onClickInfo () {
      eventBus.$emit('info-changed')
    },
    closeRightDrawer (payload) {
      this.rightDrawerOpen = payload
    }
  },
  mounted () {
    console.log('siamo in header')
    // this.search="paolo";
  },
  created () {
    eventBus.$on('right-drawer-changed', this.closeRightDrawer)
    // eventBus.$on("search-changed", this.onSearchInputHeader);
  },
  beforeDestroy () {
    eventBus.$off('search-changed')
    eventBus.$off('right-drawer-changed', this.closeRightDrawer)
  }
}

</script>

<style scoped lang="sass">
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
