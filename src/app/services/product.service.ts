import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Product} from '../models/product';

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'https://itx-frontend-test.onrender.com/api/product';
  private readonly TTL = 60 * 60 * 1000; // 1 hora en ms
  private readonly CACHE_PRODUCTS_KEY = 'cache_products';
  private readonly CACHE_PRODUCT_ID_KEY = 'cache_product_id_';
  private http = inject(HttpClient);

getProducts(): Observable<Product[]> {
    const cached = this.getFromCache<Product[]>(this.CACHE_PRODUCTS_KEY);
    if (cached) return of(cached);

    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(data => this.saveToCache(this.CACHE_PRODUCTS_KEY, data))
    );
  }

  getProductById(id: string): Observable<Product> {
    const key = `${this.CACHE_PRODUCT_ID_KEY}${id}`;
    const cached = this.getFromCache<Product>(key);
    if (cached) return of(cached);

    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      tap(data => this.saveToCache(key, data))
    );
  }

  private saveToCache<T>(key: string, data: T): void {
    const entry: CacheEntry<T> = {
      data,
      expiresAt: Date.now() + this.TTL
    };
    localStorage.setItem(key, JSON.stringify(entry));
  }

  private getFromCache<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  }
}
