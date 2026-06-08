import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, SearchBarComponent],  
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private allProducts = signal<Product[]>([]);
  searchTerm = signal('');
  loading = signal(true);
  error = signal(false);
  private productService = inject(ProductService);
  private router = inject(Router);

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.allProducts();
    return this.allProducts().filter(p =>
      p.brand.toLowerCase().includes(term) ||
      p.model.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.allProducts.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  goToDetail(id: number): void {
    this.router.navigate(['/product', id]);
  }

  formatPrice(price: string): string {
    return `${price} €`;
  }
}