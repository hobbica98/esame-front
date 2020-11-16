<template>
  <q-card>
    <q-toolbar>
      <q-avatar>
      </q-avatar>

      <q-toolbar-title
        ><span class="text-weight-bold"
          >{{ action }} {{ entity }}</span
        >
      </q-toolbar-title>

      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-section>
      Sei sicuro di voler cancellare permanentemente?
    </q-card-section>

    <q-card-actions align="right">
      <q-btn color="primary" label="Elimina" @click="deleteItem" icon="delete" />
      <q-btn color="primary" label="Cancella" @click="onCancelClick" icon="cancel" />
    </q-card-actions>
  </q-card>
</template>

<script>
import modal from '../../utils/mixins/modal'
import eventBus from '../../utils/eventBus'
import { Notify } from 'quasar'
// import _ from 'lodash'
export default {
  name: 'DeleteModal',
  mixins: [modal],
  props: ['id', 'entity', 'action', 'hide'],
  data: function () {
    return {}
  },
  methods: {
    deleteItem: async function () {
      try {
        const { id, entity } = this
        await this.$axios.delete(`/${entity}/${id}`)
        console.log('[id] ', id)
        eventBus.$emit('item-delete', id)
        Notify.create({
          message: 'cancellato con successo!'
        })
        this.hide()
      } catch (e) {
        Notify.create({
          color: 'negative',
          message: 'Error',
          icon: 'report_problem'
        })
      }
    },
    onCancelClick () {
      // we just need to hide dialogbut i need to create event i think , oltion save us!
      this.hide()
    }
  },
  computed: {},
  mounted: function () {}
}
</script>

<style scoped>
.row {
  margin: 5px 0;
}
</style>
