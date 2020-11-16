<template>
  <q-layout class="login-page barlowFont" view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center full-width">
        <div
          class="q-pa-md row items-center q-gutter-md full-width flex flex-center "
          style="padding-bottom: 0px;"
        >
          <q-card flat style="min-width: 25%; min-height: 25%">
            <q-card-section style="padding-bottom: 0px;">
            </q-card-section>
            <q-card-section class="text-center">
              <div class="row justify-center">
                Login
              </div>
            </q-card-section>
            <q-card-section>
              <q-form class="q-gutter-md">
                <div class="row justify-center">
                  <div class="col-xs-12 col-md-12 text-center">
                    <q-input
                      bg-color="white"
                      clearable
                      outlined
                      v-model="userData.email"
                      label="La tua email"
                      @keyup.enter="onClickLogin(userData)"
                    ></q-input>
                  </div>
                </div>
                <div class="row justify-center">
                  <div class="col-xs-12 col-md-12 text-center">
                    <q-input
                      bg-color="white"
                      clearable
                      outlined
                      label="Password"
                      type="password"
                      placeholder="Password"
                      v-model="userData.password"
                      @keyup.enter="onClickLogin(userData)"
                    ></q-input>
                  </div>
                </div>
                <div class="row">
                  <q-btn
                    label="Accedi"
                    @click="() => onClickLogin(userData)"
                    class="col-xs-12 col-md-12"
                    rounded
                    color="primary"
                    unelevated
                  ></q-btn>

                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
        <!--    MODALE DI RESET PASSWRD-->
        <q-dialog v-model="resetPassModal" persistent>
          <q-card class="bg-secondary">
            <q-card-section class="row items-center">
              <q-avatar
                icon="announcement"
                color="primary"
                text-color="white"
              />
              <div class="q-ml-sm">Recupera la tua password</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <q-input
                bg-color="white"
                outlined
                clearable
                v-model="passwordResetMail"
                label="La tua email"
              ></q-input>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Annulla" color="primary" v-close-popup />
              <q-btn
                flat
                label="Recupera Password"
                color="primary"
                @click="onClickPasswordRecover"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
// import router from '../router'
import { Notify } from 'quasar'

export default {
  data () {
    return {
      userData: {
        email: '',
        password: ''
      },
      passwordResetMail: '',
      resetPassModal: false,
      accept: false
    }
  },
  methods: {
    ...mapActions(['login']),
    myClick: function () {},
    onClickPasswordRecover: async function () {
      if (!this.passwordResetMail || !this.$v.passwordResetMail.email) {
        Notify.create({
          color: 'negative',
          message: 'Errore: inserisci una email'
        })
      } else {
        try {
          await this.$masterAxios.post('/password-resets/', {
            email: this.passwordResetMail
          })
          Notify.create({
            message: 'Controlla la tua casella di posta'
          })
        } catch (e) {
          console.log(e)
        }
      }
    },
    onClickFBLogin: function (userData) {
      console.log('FACEBOOK LOGIN')
      console.log({ userData })
    },
    onClickLogin: async function (userData) {
      try {
        const loginResponse = await this.login(userData)
        console.log('loginResponse', loginResponse)
        const message = userData.name
          ? `Benvenuto ${userData.name}!`
          : 'Benvenuto !'
        Notify.create({
          message
        })
        this.$router.replace('/dashboard')
      } catch (e) {
        console.log(e)
        Notify.create({
          color: 'negative',
          message: 'Utente o password errati',
          icon: 'report_problem'
        })
      }
    },
    navigateTo: function (routeName) {
      this.$router.push({
        name: routeName
      })
    }
  },
  mounted: function () {
    if (this.$route.query.pwdResetToast) {
      Notify.create({
        message:
          'Password cambiata con successo, puoi ora accedere con la nuova password'
      })
    }
  },
  beforeMount () {},
  validations: {
    passwordResetMail: {
      email
    },
    userData: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  }
}
</script>

<style scoped>
.login-page {
   background-image: url("https://source.unsplash.com/2000x900/?digital");
  background-color: #ffffff;
  background-position: center;
  background-repeat: no-repeat;
}

</style>
