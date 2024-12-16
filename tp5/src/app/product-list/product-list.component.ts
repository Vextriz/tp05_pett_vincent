import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; 
  filteredProducts: Product[] = []; 

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  search(term: string) {
    this.filteredProducts = this.products.filter((product) =>
      product.nom.toLowerCase().includes(term.toLowerCase()) ||
      product.categorie.toLowerCase().includes(term.toLowerCase())
    );
  }
}
