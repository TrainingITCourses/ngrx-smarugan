import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListSearchComponent } from './list-search/list-search.component';
import { ItemSearchComponent } from './list-search/item-search/item-search.component';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
