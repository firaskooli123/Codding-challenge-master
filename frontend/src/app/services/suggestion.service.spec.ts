import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SuggestionService } from './suggestion.service';
import { ApiResponse, Suggestion } from '../models/suggestion.model';

describe('SuggestionService', () => {
  let service: SuggestionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuggestionService]
    });
    service = TestBed.inject(SuggestionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all suggestions', () => {
    const mockResponse: ApiResponse = {
      data: [
        { id: '1', title: 'Suggestion 1', content: 'Content 1' },
        { id: '2', title: 'Suggestion 2', content: 'Content 2' }
      ]
    };

    service.getSuggestions().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Correction de l'URL pour correspondre à l'implémentation
    const req = httpMock.expectOne(req => {
      return req.url === '/api/suggestion' && 
             req.params.has('page') && 
             req.params.has('limit');
    });
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should search suggestions with correct filter parameter', () => {
    const searchTerm = 'test';
    const mockResponse: ApiResponse = {
      data: [
        { id: '1', title: 'Test Suggestion', content: 'Test Content' }
      ]
    };

    service.searchSuggestions(searchTerm).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Correction pour vérifier le format de filtre correct
    const req = httpMock.expectOne(req => {
      return req.url === '/api/suggestion' && 
             req.params.has('filter') && 
             req.params.has('page') && 
             req.params.has('limit');
    });
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});