import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionService } from '../../services/suggestion.service';
import { Suggestion } from '../../models/suggestion.model';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SuggestionItemComponent } from '../suggestion-item/suggestion-item.component';

// Ajoutez ces attributs ARIA à votre template
@Component({
  selector: 'app-suggestion-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, SuggestionItemComponent],
  template: `
    <app-search-bar (search)="onSearch($event)"></app-search-bar>
    
    <div *ngIf="loading" class="text-center py-8 loading-indicator" aria-live="polite" aria-label="Chargement des suggestions">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p>Chargement...</p>
    </div>
    
    <div *ngIf="!loading && suggestions.length === 0" class="text-center py-8 empty-message" aria-live="polite">
      <p>Aucune suggestion trouvée.</p>
    </div>
    
    <div *ngIf="!loading && suggestions.length > 0" role="list" aria-label="Liste des suggestions">
      <app-suggestion-item 
        *ngFor="let suggestion of suggestions" 
        [suggestion]="suggestion"
        [searchText]="searchText"
        role="listitem"
      ></app-suggestion-item>
    </div>
  `
})
export class SuggestionListComponent implements OnInit {
  suggestions: Suggestion[] = [];
  loading = false;
  searchText = '';

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.loading = true;
    this.suggestionService.getSuggestions().subscribe({
      next: (response) => {
        this.suggestions = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des suggestions', error);
        this.loading = false;
      }
    });
  }

  onSearch(searchText: string): void {
    this.searchText = searchText;
    
    if (!searchText.trim()) {
      this.loadSuggestions();
      return;
    }
    
    this.loading = true;
    this.suggestionService.searchSuggestions(searchText).subscribe({
      next: (response) => {
        this.suggestions = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la recherche', error);
        this.loading = false;
      }
    });
  }
}