import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { haveEitherActions } from '../../guards/have-either-actions.guard'
import { actions } from '../../models/actions'

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'users',
    canActivate: [haveEitherActions({ actions: actions.USERS })],
    loadChildren: () => import('./modules/users/users.module'),
  },
  {
    path: 'actions',
    canActivate: [haveEitherActions({ actions: actions.ACTIONS })],
    loadChildren: () => import('./modules/actions/actions.module'),
  },
  {
    path: 'groups',
    canActivate: [haveEitherActions({ actions: actions.GROUPS })],
    loadChildren: () => import('./modules/groups/groups.module'),
  },
  {
    path: 'apps',
    canActivate: [haveEitherActions({ actions: actions.APP })],
    loadChildren: () => import('./modules/apps/apps.module'),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
