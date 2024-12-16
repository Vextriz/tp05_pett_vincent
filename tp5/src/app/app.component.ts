import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ShoppingBagState } from './store/shopping-bag.state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone : false,
})
export class AppComponent {
  cartCount$: Observable<number>;

  constructor(private store: Store) {
    this.cartCount$ = this.store.select(ShoppingBagState.getCount);
  }
}
