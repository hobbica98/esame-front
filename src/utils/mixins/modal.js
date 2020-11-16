import _ from 'lodash'

export default {
  computed: {
    header: function () {
      const action = _.get(this, 'action')
      const entity = _.get(this, 'entity')
      const entityName = _.get(this, 'entityName', this.$t(entity))
      return action === 'add'
        ? `Creazione ${entityName}`
        : `Modifica ${entityName}`
    }
  },
  methods: {
    hideModal: function () {

    }
  }
}
