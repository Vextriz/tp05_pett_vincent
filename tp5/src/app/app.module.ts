import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';
import { ShoppingBagState } from './store/shopping-bag.state';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ShoppingBagComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([ShoppingBagState]),
    NgxsStoragePluginModule.forRoot({ keys: ['shoppingBag'] })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
