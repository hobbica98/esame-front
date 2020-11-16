import VueLodash from 'vue-lodash'
import _ from 'lodash'

export default ({ Vue }) => {
  Vue.use(VueLodash, { lodash: _ })
}
