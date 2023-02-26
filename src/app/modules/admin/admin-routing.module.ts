import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { haveEitherActions } from '../../guards/have-either-actions.guard'
import { actions, iamActions } from "../../models/actions";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'iam',
    canActivate: [haveEitherActions({ actions: iamActions })],
    loadChildren: () => import('./modules/iam/iam.module'),
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
