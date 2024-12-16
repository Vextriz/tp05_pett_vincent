import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Product } from '../models/product';
import { ApiService } from '../api.service';
import { AddToCart, RemoveFromCart } from '../store/shopping-bag.actions';
import { ShoppingBagState } from '../store/shopping-bag.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false,
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productQuantities: { [productId: number]: number } = {};

  constructor(private apiService: ApiService, private store: Store) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.updateQuantities();
    });

    this.store.select(ShoppingBagState.getItems).subscribe(() => {
      this.updateQuantities();
    });
  }

  updateQuantities(): void {
    const items = this.store.selectSnapshot(ShoppingBagState.getItems);
    this.productQuantities = {};

    this.products.forEach(product => {
      const cartItem = items.find(item => item.product.id === product.id);
      this.productQuantities[product.id] = cartItem ? cartItem.quantity : 0;
    });
  }

  addToCart(product: Product): void {
    this.store.dispatch(new AddToCart(product));
    this.updateQuantities();
  }

  removeFromCart(product: Product): void {
    this.store.dispatch(new RemoveFromCart(product));
    this.updateQuantities();
  }
}
