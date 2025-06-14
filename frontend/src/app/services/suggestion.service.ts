import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Suggestion } from '../models/suggestion.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private apiUrl = `${environment.apiUrl}/suggestion`;

  constructor(private http: HttpClient) {}

  getSuggestions(page: number = 1, limit: number = 10): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }

  searchSuggestions(searchText: string, page: number = 1, limit: number = 10): Observable<ApiResponse> {
    // Création du filtre selon la documentation
    const filter = [
      {
        name: 'any',
        modifiers: [
          {
            name: 'fields',
            params: ['title', 'content']
          },
          {
            name: 'contains',
            params: [searchText]
          }
        ]
      }
    ];

    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('filter', JSON.stringify(filter));

    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }
}