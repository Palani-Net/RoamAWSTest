import splash from 'components/Splash.vue'
import login from 'components/Login.vue'
import maincomponent from 'components/MainComponent.vue'
import LockoutComponent from 'components/LockoutComponent.vue'
import RequestComponent from 'components/RequestComponent.vue'
import CreateCaseComponent from 'components/CreateCaseComponent.vue'
import ServicesComponent from 'components/ServicesComponent.vue'
import PageLayout from 'layouts/PageLayout.vue'
import LoginLayout from 'layouts/LoginLayout.vue'
import FlatTireComponent from 'components/FlatTireComponent.vue'
import CaseDetailsComponent from 'components/CaseDetailsComponent.vue'
import TrackCaseStatusComponent from 'components/TrackCaseStatusComponent.vue'
import LogoutComponent from 'components/LogoutComponent.vue'


export default [
  {
    path: '/app',
    component: PageLayout,
    children: [
      {path: 'home', name: 'maincomponent', component: maincomponent},
      {path: 'lockoutcomp', name: 'lockoutcomponent', component: LockoutComponent},
      {path: 'requestcomp', name: 'requestcomponent', component: RequestComponent},
      {path: 'createcasecomp', name: 'createcasecomponent', component: CreateCaseComponent},
      {path: 'servicescomp', name: 'servicescomponent', component: ServicesComponent},
      {path: 'flattirecomp', name: 'flattirecomponent', component: FlatTireComponent},
      {path: 'casedetailscomp', name: 'casedetailscomponent', component: CaseDetailsComponent},
      {path: 'trackcasecomp', name: 'trackcasestatuscomponent', component: TrackCaseStatusComponent},
      {path: 'logoutcomp', name: 'logoutcomponent', component: LogoutComponent}
    ]
  },
  {
    path: '/',
    component: LoginLayout,
    children: [
      {path: 'login', name: 'login', component: login},
      {path: '', name: 'splash', component: splash}
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
