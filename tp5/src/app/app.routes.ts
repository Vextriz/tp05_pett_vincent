import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';

export const routes: Routes = [
  { path: 'product', component: ProductListComponent },
  { path: 'shoppingBag', component: ShoppingBagComponent },
  { path: '', redirectTo: 'product', pathMatch: 'full' },
];
