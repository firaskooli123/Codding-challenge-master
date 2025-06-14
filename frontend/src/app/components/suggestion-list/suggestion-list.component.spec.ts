import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { SuggestionListComponent } from './suggestion-list.component';
import { SuggestionService } from '../../services/suggestion.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SuggestionItemComponent } from '../suggestion-item/suggestion-item.component';
import { ApiResponse } from '../../models/suggestion.model';

describe('SuggestionListComponent', () => {
  let component: SuggestionListComponent;
  let fixture: ComponentFixture<SuggestionListComponent>;
  let suggestionService: jasmine.SpyObj<SuggestionService>;

  const mockApiResponse: ApiResponse = {
    data: [
      { id: '1', title: 'Suggestion 1', content: 'Content 1' }, // Changé de 1 à '1'
      { id: '2', title: 'Suggestion 2', content: 'Content 2' }  // Changé de 2 à '2'
    ]
  };

  beforeEach(async () => {
    const suggestionServiceSpy = jasmine.createSpyObj('SuggestionService', [
      'getSuggestions', 'searchSuggestions'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SuggestionListComponent,
        SearchBarComponent,
        SuggestionItemComponent
      ],
      providers: [
        { provide: SuggestionService, useValue: suggestionServiceSpy }
      ]
    }).compileComponents();

    suggestionService = TestBed.inject(SuggestionService) as jasmine.SpyObj<SuggestionService>;
    suggestionService.getSuggestions.and.returnValue(of(mockApiResponse));
    suggestionService.searchSuggestions.and.returnValue(of(mockApiResponse));

    fixture = TestBed.createComponent(SuggestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load suggestions on init', () => {
    expect(suggestionService.getSuggestions).toHaveBeenCalled();
    expect(component.suggestions).toEqual(mockApiResponse.data);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading suggestions', () => {
    suggestionService.getSuggestions.and.returnValue(throwError(() => new Error('Error')));
    component.loadSuggestions();
    expect(component.loading).toBeFalse();
  });

  it('should search suggestions when onSearch is called with non-empty text', () => {
    const searchText = 'test';
    component.onSearch(searchText);
    expect(suggestionService.searchSuggestions).toHaveBeenCalledWith(searchText);
    expect(component.suggestions).toEqual(mockApiResponse.data);
    expect(component.loading).toBeFalse();
  });

  it('should load all suggestions when onSearch is called with empty text', () => {
    suggestionService.getSuggestions.calls.reset();
    component.onSearch('');
    expect(suggestionService.getSuggestions).toHaveBeenCalled();
    expect(component.suggestions).toEqual(mockApiResponse.data);
  });
});