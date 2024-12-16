import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ShoppingBagState } from '../store/shopping-bag.state';
import { RemoveFromCart } from '../store/shopping-bag.actions';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.css'],
  standalone: false
})
export class ShoppingBagComponent implements OnInit {
  shoppingBag$: Observable<any[]>;

  constructor(private store: Store) {
    this.shoppingBag$ = this.store.select(ShoppingBagState.getItems);
  }

  ngOnInit(): void {
    this.shoppingBag$ = this.store.select(ShoppingBagState.getItems);
  }

  getTotal(items: any[]): number {
    return items.reduce((total, item) => total + item.product.prix * item.quantity, 0);
  }

  removeFromCart(product: any): void {
    this.store.dispatch(new RemoveFromCart(product));
  }
}
