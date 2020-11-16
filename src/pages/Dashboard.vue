<template>
  <q-page class="flex column flex-center">
    <CustomTable entity-name="repairs" :entity-fields="schema" :records="repairs"
                 search-enabled></CustomTable>
  </q-page>
</template>

<script>
import CustomTable from 'components/CustomTable'
import _ from 'lodash'
import eventBus from 'src/utils/eventBus'

export default {
  name: 'PageIndex',
  components: { CustomTable },
  data () {
    return {
      repairs: [],
      schema: [
        { name: 'startTime', label: _.startCase(this.$i18n.t('startTime')), type: 'date' },
        { name: 'endTime', label: _.startCase(this.$i18n.t('endTime')), type: 'date' },
        { name: 'createAt', label: _.startCase(this.$i18n.t('createAt')), type: 'date' },
        { name: 'device', label: _.startCase(this.$i18n.t('device')), type: 'string' },
        { name: 'totalDuration', label: _.startCase(this.$i18n.t('totalDuration')), type: 'number' },
        { name: 'totalPrice', label: _.startCase(this.$i18n.t('totalPrice')), type: 'number' },
        { name: 'actions', label: _.startCase(this.$i18n.t('action')) }
      ]
    }
  },
  methods: {
    async getData () {
      const response = await this.$axios.get('/repairs')
      this.repairs = response.data
    }
  },
  created () {
    this.getData()
    eventBus.$on('item-delete', this.getData)
    eventBus.$on('item-changed', this.getData)
  },
  beforeDestroy () {
    eventBus.$off('item-delete')
    eventBus.$off('item-changed')
  }
}
</script>
