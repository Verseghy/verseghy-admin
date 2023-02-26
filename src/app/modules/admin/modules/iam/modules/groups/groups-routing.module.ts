import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ListComponent } from './components/list/list.component'
import { haveEitherActions } from '../../../../../../guards/have-either-actions.guard'

const routes: Routes = [
  {
    path: '',
    canActivate: [haveEitherActions({ actions: ['iam.group.list'] })],
    component: ListComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
