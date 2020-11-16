import store from '../store'
import MainHeader from '../components/mainHeader'
import LeftSidebar from '../components/LeftSidebar'
import Me from '../pages/profile/Me'
import EditProfile from '../pages/profile/EditProfile'
import { leftSidebarItems } from '../_nav'

export default [
  {
    path: 'me',
    name: 'Me',
    components: {
      default: Me,
      header: MainHeader,
      leftsidebar: LeftSidebar
    },
    props: {
      header: { colorOnScroll: 65 },
      leftsidebar: {
        leftSidebarItems: leftSidebarItems,
        leftDrawerOpen: false
      }
    }
  },
  {
    path: 'edit',
    name: 'EditProfile',
    components: {
      default: EditProfile,
      header: MainHeader,
      leftsidebar: LeftSidebar
    },
    props: {
      header: { colorOnScroll: 65 },
      leftsidebar: {
        leftSidebarItems: leftSidebarItems,
        leftDrawerOpen: false
      }
    }
  }
]
