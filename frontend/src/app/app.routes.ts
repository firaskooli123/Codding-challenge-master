import { Routes } from '@angular/router';
import { SuggestionListComponent } from './components/suggestion-list/suggestion-list.component';

export const routes: Routes = [
  { path: '', component: SuggestionListComponent },
  { path: '**', redirectTo: '' }
];