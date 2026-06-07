import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
//import { CartService } from '../../services/cart.service';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  breadcrumb = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute.root;
        while (route.firstChild) route = route.firstChild;
        return route.snapshot.data['breadcrumb'] ?? '';
      })
    ),
    { initialValue: this.activatedRoute.snapshot.firstChild?.data['breadcrumb'] ?? '' }
  );
}