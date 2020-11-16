<template>
  <q-card>
    <!--CARD BODY-->
    <q-card-section class="  flex-center">
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col">
              <q-input label="Da" readonly outlined dense v-model="repair.startTime">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxyFromda" transition-show="scale" transition-hide="scale">
                      <q-date mask="YYYY-MM-DD HH:mm" v-model="repair.startTime"
                      />
                      <q-time mask="YYYY-MM-DD HH:mm" v-model="repair.startTime"
                              @input="() => $refs.qDateProxyFromda.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col">
            <q-input label="A" readonly outlined dense v-model="repair.endTime">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxyFroma" transition-show="scale"
                                   transition-hide="scale">
                      <q-date mask="YYYY-MM-DD HH:mm" v-model="repair.endTime"
                      />
                      <q-time mask="YYYY-MM-DD HH:mm" v-model="repair.endTime"
                              @input="() => $refs.qDateProxyFroma.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col">
              <q-select dense outlined v-model="repair.device" :options="['notebook', 'desktop', 'tablet']"></q-select>
            </div>
          </div>
    </q-card-section>
    <!--CARD BUTTONS-->
    <q-card-actions align="right">
      <q-btn color="primary" label="Salva" @click="upsertrepairs" icon="save" />
      <q-btn
        color="primary"
        label="Annulla"
        @click="onCancelClick"
        icon="close"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import _ from 'lodash'
import eventBus from '../../utils/eventBus'
import { Notify } from 'quasar'
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'repairsModal',
  props: ['id', 'entity', 'action', 'hide'],
  data: function () {
    return {
      repair: {
        startTime: undefined,
        endTime: undefined,
        device: undefined
      }
    }
  },
  computed: {
    ...mapGetters(['currentrepair', 'currentrepairIsAdmin']),
    isAdd: function () {
      const { action } = this
      return action === 'add'
    }
  },
  methods: {
    upsertrepairs: async function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        const _id = _.get(this, 'id')
        let message, repair
        if (_id) {
          // EDIT
          repair = await this.$axios.put(`/repairs/${_id}`, this.repair)
          message = 'Repair modificato con successo!'
        } else {
          // CREATE
          repair = await this.$axios.post('/repairs', this.repair)
          message = 'Repair creato con successo!'
        }
        eventBus.$emit('item-changed', repair)
        // eventBus.$emit("stationsUpdated");
        Notify.create({
          message
        })
        this.hide()
      } catch (e) {
        console.log(e)
      }
    },
    onCancelClick () {
      // we just need to hide dialogbut i need to create event i think , oltion save us!
      this.hide()
    }
  },
  mounted: async function () {
    const _id = _.get(this, 'id')
    console.log('ID', _.get(this, 'id'))
    if (_id) {
      const { data: repair } = await this.$axios.get(`/repairs/${_id}`)
      this.repair = repair
    }
  },
  validations () {
    const result = {
      repair: {
        startTime: {
          required
        },
        endTime: {
          required
        },
        device: {
          required
        }
      }
    }
    return result
  }
}
</script>

<style scoped>
.row {
  margin: 5px 0;
}

.costs .q-field--labeled {
  margin: 0;
}

.costs .q-btn {
  height: 100%;
}

/* .costs .actions > .q-btn:first-child {
  margin-right: 10px;
} */
</style>
