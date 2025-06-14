import { Component, Input } from '@angular/core';
import { Suggestion } from '../../models/suggestion.model';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggestion-item',
  standalone: true,
  imports: [HighlightPipe, CommonModule],
  template: `
    <article class="bg-white rounded-lg shadow-md p-6 mb-4" [attr.aria-labelledby]="'suggestion-' + suggestion.id">
      <h2 
        id="suggestion-{{suggestion.id}}" 
        class="text-xl font-bold mb-3 text-gray-800" 
        [innerHTML]="title | highlight:searchText"
      ></h2>
      <div 
        class="text-gray-700 leading-relaxed" 
        [innerHTML]="content | highlight:searchText"
        [attr.aria-label]="'Contenu de la suggestion'"
      ></div>
    </article>
  `
})
export class SuggestionItemComponent {
  @Input() suggestion!: Suggestion;
  @Input() searchText = '';

  get title(): string {
    return this.suggestion?.title || '';
  }

  get content(): string {
    return this.suggestion?.content || '';
  }
}