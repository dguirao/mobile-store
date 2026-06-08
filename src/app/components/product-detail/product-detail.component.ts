import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);
  selectedColor: number | null = null;
  selectedStorage: number | null = null;
  loading = signal(true);
  error = signal(false);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.selectedColor = product.options?.colors?.[0]?.code ?? null;
        this.selectedStorage = product.options?.storages?.[0]?.code ?? null;
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }

   addToCart(): void {    
    const product = this.product();
    if (!product) return; 
    this.cartService.addToCart({
      id: product.id,
      colorCode: Number(this.selectedColor),
      storageCode: Number(this.selectedStorage)
    }).subscribe({
      next: (response) => {
        this.cartService.setCount(response.count);
      }
    });
   } 
}