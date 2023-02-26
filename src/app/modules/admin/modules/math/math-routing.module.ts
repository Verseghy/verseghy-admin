import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { haveEitherActions } from '../../../../guards/have-either-actions.guard'

const routes: Routes = [
  {
    path: 'problems',
    canActivate: [haveEitherActions({ actions: ['mathcompetition.problems'] })],
    loadChildren: () => import('./modules/problems/problems.module'),
  },
  {
    path: 'results',
    canActivate: [haveEitherActions({ actions: ['mathcompetition.problems'] })],
    loadChildren: () => import('./modules/results/results.module'),
  },
  {
    path: 'teams',
    canActivate: [haveEitherActions({ actions: ['mathcompetition.problems'] })],
    loadChildren: () => import('./modules/teams/teams.module'),
  },
  {
    path: 'time',
    canActivate: [haveEitherActions({ actions: ['mathcompetition.admin'] })],
    loadChildren: () => import('./modules/time/time.module'),
  },
  {
    path: 'users',
    canActivate: [haveEitherActions({ actions: ['mathcompetition.problems'] })],
    loadChildren: () => import('./modules/users/users.module'),
  },
  {
    path: '**',
    redirectTo: 'problems',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MathRoutingModule {}
