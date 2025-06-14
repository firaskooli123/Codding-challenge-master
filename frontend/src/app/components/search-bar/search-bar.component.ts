import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="mb-8">
      <label for="search-input" class="sr-only">Rechercher des suggestions</label>
      <input 
        id="search-input"
        type="text" 
        class="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
        placeholder="Rechercher des suggestions..." 
        [(ngModel)]="searchText"
        (ngModelChange)="onSearchChange()"
        aria-label="Rechercher des suggestions"
      />
    </div>
  `,
  styles: []
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  searchText = '';
  private searchTerms = new Subject<string>();

  constructor() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.search.emit(term);
    });
  }

  onSearchChange(): void {
    this.searchTerms.next(this.searchText);
  }
}