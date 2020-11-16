<template>

    <q-card>
      <!--  toolbar di quasar da componentizzare-->
      <div class="box-ribbon-wrapper q-pt-xs">
      <q-toolbar class="text-white q-my-md">
        <q-ribbon
          position="left"
          color="rgba(0,0,0,.58)"
          background-color="#00588d"
          leaf-color="#a0a0a0"
          leaf-position="bottom"
          decoration="rounded-out"
        >
          <q-toolbar-title
            class="example-title"
          >
            <q-btn
              flat
              round
              dense
              icon="control_point"
              class="q-mr-sm"
              size="md"
              color="white"
              @click="() => openModalCrud(undefined, `${entityName}`, 'add')"
            />
            <q-btn color="white" stretch flat :label="entityName"
                   @click="() => openModalCrud(undefined, `${entityName}`, 'add')"/>
          </q-toolbar-title>
        </q-ribbon>
      </q-toolbar>
      </div>
      <q-card-section>
        <q-table
         :flat="true"
          ref="clientTable"
          v-if="pagination"
          :binary-state-sort="true"
          :data="filteredEntityList"
          :columns="columns"
          row-key="_id"
          :rows-per-page-label="getRowsPerPageLabel"
          :no-data-label="$t('no_data_label')"
          :no-results-label="$t('no_results_label')"
          :pagination-label="getPaginationLabel"
          :pagination.sync="pagination"
          :loading="loading"
          :filter="search"
          @row-click="clickedRow"
        >
          <template v-slot:top>
            <template v-if="searchEnabled">
                <q-input rounded outlined dense debounce="300" color="primary" v-model="search" style="margin-left: 10px">
                    <template v-slot:prepend>
                        <q-icon name="search"></q-icon>
                    </template>
                </q-input>
            </template>

          </template>

        <template v-slot:body-cell="props">
          <q-td :props="props">
              {{ getFieldValue(props) }}
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              size="sm"
              round
              dense
              color="primary"
              icon="edit"
              @click.stop="
                () => openModalCrud(props.row.id, entityName, 'Edit')
              "
              class="q-mr-xs"
            />
            <q-btn
              size="sm"
              round
              dense
              color="secondary"
              icon="delete"
              @click.stop="
                () =>
                  openModalCrud(props.row.id, entityName, 'Delete', props.row)
              "
              class="q-mr-sm"
            />
          </q-td>
        </template>

        </q-table>
      </q-card-section>
    </q-card>

</template>

<script>
import crudModal from '../components/modals/CrudModal'
import _ from 'lodash'
import eventBus from '../utils/eventBus'
import { DateTime } from 'luxon'
import { pickerFormat } from '../utils/const'
import { mapGetters } from 'vuex'

export default {
  name: 'CustomTable',
  props: {
    entityName: {
      default: 'repairs'
    },
    entityFields: {
      type: Array,
      default: () => []
    },
    records: {
      type: Array,
      default: () => []
    },
    dateFilterEnabled: {
      type: Boolean,
      default: true
    },
    searchEnabled: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      // name: this.entityName,
      // entityList: this.records,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: undefined,
        sortBy: undefined,
        descending: undefined
      },
      loading: false,
      search: '',
      filterIsConfirmed: false,
      from: '',
      to: ''
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    _: function () {
      return _
    },
    filteredEntityList: function () {
      let result = this.records
      if (!this.from || !this.to) return result

      const filterField = _.find(this.entityFields, f => f.type === 'date')

      result = _.filter(this.records, e => {
        const entityDateTimeFrom = DateTime.fromISO(e[filterField.name])
        const entityDateTimeTo = DateTime.fromISO(e[filterField.name])
        const filterDateTimeFrom = DateTime.fromFormat(this.from, pickerFormat)
        const filterDateTimeTo = DateTime.fromFormat(this.to, pickerFormat)

        return entityDateTimeFrom > filterDateTimeFrom && entityDateTimeTo < filterDateTimeTo
      })

      return result
    },
    getRowsPerPageLabel: function () {
      return `${this.$i18n.t(this.entityName)} ${this.$i18n.t('per_page')}`
    },
    columns: function () {
      const result = _.map(this.entityFields, f => ({
        name: f.name,
        align: 'center',
        required: true,
        field: f.name,
        label: f.label ? f.label : this.$i18n.t(f.name),
        sortable: true
      }))
      return result
    }
  },
  methods: {
    clickedRow (evt, row, ind) {
      this.$route.name === 'estimatesCategories' && this.$router.push({ name: 'estimatesCategoriesDetail', params: { id: row.id } })
    },
    resetFilter: function () {
      this.from = ''
      this.to = ''
      this.search = ''
    },
    getPaginationLabel: function (firstRowIndex, endRowIndex, totalRowsNumber) {
      return `${firstRowIndex}-${endRowIndex} ${this.$i18n.t(
       'of'
     )} ${totalRowsNumber}`
    },
    getFieldValue: function (props) {
      const currentField = _.get(props, 'col.name')
      const currentFieldType = _.get(_.find(this.entityFields, c => c.name === currentField), 'type', 'string')
      if (currentFieldType === 'date') return this.getFormattedDate(props.value)
      return props.value
    },
    onFilterChanged: function () {
      // date filter changed, do something
      console.log(`from: ${this.from}, to:${this.to}`)
    },
    getFormattedDate: function (date) {
      return DateTime.fromISO(date).toFormat(pickerFormat)
    },
    onSearchChanged: function (val) {
      this.search = val
    },
    openModalCrud: function (id, entity, action, item) {
      this.$q.dialog({
        component: crudModal,
        id: id,
        entity: entity,
        action: action,
        item: item,
        parent: this
      })
    }

  },
  created: async function () {
    eventBus.$on('search-changed', this.onSearchChanged)
  },
  mounted: function () {
  },
  beforeDestroy: function () {
    eventBus.$off('search-changed')
  }
}
</script>

<style scoped lang="stylus"></style>
