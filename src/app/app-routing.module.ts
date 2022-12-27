import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EmptyComponent } from './layouts/empty/empty.component'
import { FullComponent } from './layouts/full/full.component'
import { RedirectToDashboardGuard } from './guards/redirect-to-dashboard.guard'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { RedirectToLoginGuard } from './guards/redirect-to-login.guard'

const routes: Routes = [
  {
    path: '',
    component: EmptyComponent,
    children: [
      {
        path: '',
        canActivate: [RedirectToDashboardGuard],
        loadChildren: () => import('./modules/auth/auth.module'),
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'admin',
        canActivate: [RedirectToLoginGuard],
        loadChildren: () => import('./modules/admin/admin.module'),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
