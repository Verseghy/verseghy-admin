import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import {
  HeaderModule,
  IconModule,
  InputModule, PlaceholderModule,
  SideNavModule,
  ThemeModule
} from "carbon-components-angular";
import { EmptyComponent } from './layouts/empty/empty.component'
import { FullComponent } from './layouts/full/full.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data'
import { entityConfig } from './entity-metadata'
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor'

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'https://iam.193.verseghy-gimnazium.net/v1/',
}

@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent,
    FullComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HeaderModule,
    ThemeModule,
    IconModule,
    SideNavModule,
    EntityDataModule.forRoot(entityConfig),
    PlaceholderModule
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
