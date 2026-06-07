import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchChange = output<string>();
  searchTerm = signal('');

  onInput(value: string): void {
    this.searchTerm.set(value);
    this.searchChange.emit(value);
  }
}