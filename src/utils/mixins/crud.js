// other libraries
// import axios from 'axios';

// mixin.js file per il crud

// import _ from 'lodash'

export default {
  created: function () {
    console.log('crud mixins')
  },
  methods: {
    createItem: async function (entity, item) {
      console.log('Create')
      const { data: itemC } = await this.$axios.post(`/${entity}`, item)
      console.log('CreateItem', itemC)
      return Promise.resolve(itemC)
    },
    updateItem: async function (id, entity, item) {
      console.log('entity', entity)
      console.log('item', item)
      const { data: itemUpd } = await this.$axios.put(`/${entity}/${id}`, item)
      console.log('UpdateItem', itemUpd)
      return Promise.resolve(itemUpd)
    },
    getItem: async function (id, entity) {
      const { data: item } = await this.$axios.get(`/${entity}/${id}`)
      this[this.name] = item
      console.log('read item', this[this.name])
      return Promise.resolve(item)
    },
    deleteItem: async function (id, entity) {
      console.log('delete')
      const { data: item } = await this.$axios.delete(`/${entity}/${id}`)
      console.log('delete item', item)
      return Promise.resolve(item)
    },
    list: async function () {
      console.log(`CRUD LIST ${this.entityName}`)
      const { data: list } = await this.$axios.get(`/${this.entityName}`)
      this[this.entityName] = list
      console.log(list)
      return Promise.resolve(list)
    },
    populateList: async function (entity) {
      const { data: populateList } = await this.$axios.get(`/${entity}`)
      console.log('listPop', populateList)
      return Promise.resolve(populateList)
    },
    // openModal: function(id, entity, action) {
    //   this.$q.dialog({
    //     component: crudModal,
    //     params: {id:id, entity:entity, action:action},
    //     parent: this
    //   });
    // },
    gotoDetail: function (id, entity) {
      const params = {}
      params[entity + 'Id'] = id
      console.log('params', params)
      this.$router.push({
        name: `${entity}Detail`,
        params: params
      })
    },
    navigateTo: function (routeName, action) {
      if (action === 'push') {
        this.$router.push({
          name: routeName
        })
      } else {
        this.$router.replace({
          name: routeName
        })
      }
    }
  }
}
