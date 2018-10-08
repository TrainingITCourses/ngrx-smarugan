import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListSearchComponent } from './list-search/list-search.component';
import { ItemSearchComponent } from './list-search/item-search/item-search.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LaunchEffects } from './reducers/launch/launch.effects';
import { StatusEffects } from './reducers/status/status.effects';
import { AgencyEffects } from './reducers/agency/agency.effects';
import { MissionTypeEffects } from './reducers/mission-type/mission-type.effects';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListSearchComponent,
    ItemSearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([LaunchEffects, StatusEffects, AgencyEffects, MissionTypeEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
