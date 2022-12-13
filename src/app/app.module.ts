import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { InputModule } from 'carbon-components-angular'
import { EmptyComponent } from './layouts/empty/empty.component'
import { FullComponent } from './layouts/full/full.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { StoreModule } from '@ngrx/store'

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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
