import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly apiUrl = 'https://itx-frontend-test.onrender.com/api/cart';
  private readonly STORAGE_KEY = 'cart_count';
  cartCount = signal<number>(this.loadCount());
  private http = inject(HttpClient);

  addToCart(item: CartItem): Observable<{ count: number }> {
    return this.http.post<{ count: number }>(`${this.apiUrl}`, item);
  }

  private loadCount(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? Number(stored) : 0;
  }

  setCount(count: number): void {
    this.cartCount.set(count);
    localStorage.setItem(this.STORAGE_KEY, String(count));
  }
}    
