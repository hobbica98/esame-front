<template>
  <div style="max-width:98% ">
    <q-list padding class="text-menu">
      <div class="q-mt-md">
        <div class="flex flex-center q-gutter-xs">
          <img
            style="width: 20%;"
            class="content-center"
            src="../assets/quasar-logo-full.svg"
          />
        </div>
        <br>
      </div>
      <div class="flex flex-center" v-for="link in leftSidebarItems" :key="link.text">
        <template
          v-if="
            (currentUser &&
              (link.role.includes(currentUser.role) ||
                currentUser.role === 'admin')) ||
              link.role.includes('all')
          "
        >
<!--          menu senza sottolivelli LV0-->
          <template v-if="link.lvl === 0">
            <q-separator />
            <q-item style="width: 100%;"   @click="() => navigateTo(link.routeName, link.url)" clickable>
                <q-item-section avatar>
                  <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ link.text }}</q-item-label>
                </q-item-section>
            </q-item>
          </template>
          <template v-else-if="link.lvl === 1">
<!--          se ho dei sottolivelli faccio un v-if e li mostro qui-->
            <q-separator />

            <q-expansion-item style="width: 100%">
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ link.text }}</q-item-label>
                </q-item-section>
              </template>

              <q-card>
                <q-card-section>
                 <div v-for="deepLink in link.subLink" :key="deepLink.text">
                   <q-item style="width: 100%;"   @click="() => navigateTo(deepLink.routeName, deepLink.url)" clickable>
                     <q-item-section avatar>
                       <q-icon :name="deepLink.icon" />
                     </q-item-section>
                     <q-item-section>
                       <q-item-label>{{ deepLink.text }}</q-item-label>
                     </q-item-section>
                   </q-item>
                 </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </template>
        </template>
      </div>

      <div v-if="isAuthenticated">
        <q-item
          @click="logout"
          class="flex flex-center q-gutter-xs phenomenaFont"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon color="secondary" name="exit_to_app"></q-icon>
          </q-item-section>
          <!-- <q-icon name="star" /> -->
          <q-item-section>Logout</q-item-section>
          <!-- <q-icon name="star" /> -->
        </q-item>
      </div>

      <div v-if="!isAuthenticated">
        <q-item
          @click="() => navigateTo('login')"
          class="flex flex-center q-gutter-xs"
          clickable
          v-ripple
        >
        </q-item>
      </div>
      <!--      privacy -->
      <div style="margin-top: 20%" class="q-mt-md">
        <div class="flex flex-center q-gutter-xs phenomenaFont">
          <a
            class="GNL__drawer-footer-link"
            target="_blank"
            href="../statics/pdf/policy.pdf"
            aria-label="Privacy"
            >Privacy</a
          >
          <span> · </span>
          <a
            class="GNL__drawer-footer-link"
            target="_blank"
            href="../statics/pdf/terms.pdf"
            aria-label="Terms"
            >Terms</a
          >
        </div>
      </div>
    </q-list>
  </div>
</template>

<script>

import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {},
  props: ['leftSidebarItems'],
  data () {
    return {
      menutype: '',
      colorLogo: '#B33636'
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser'])
  },
  methods: {
    ...mapMutations(['clearUserData', 'clearStoreInfo']),
    resetToMain: function () {
      const currentRouteName = _.get(this, '$route.name')
      if (currentRouteName === 'MainPage') return
      this.$router.replace('/')
    },
    logout: function () {
      this.clearUserData()
      this.clearStoreInfo()
      this.$router.replace({ name: 'login' })
    },
    navigateTo: function (routeName, url) {
      if (url) {
        window.open(url, '_blank')
        return
      }
      const currentRouteName = _.get(this, '$route.name')
      console.log(this.$router)
      console.log(currentRouteName, routeName)
      if (currentRouteName === routeName) return
      this.$router.push({
        name: routeName
      })
    }
  },
  mounted () {},
  created () {},
  beforeDestroy () {}
}
</script>

<style scoped lang="scss">
.bg-gold-mannarino {
  background-color: #d19106;
}
</style>
