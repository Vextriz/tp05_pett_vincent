import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import { environment } from './environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private productsUrl = 'assets/mock/product.json'; 

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
}
