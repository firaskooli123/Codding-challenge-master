import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionItemComponent } from './suggestion-item.component';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { Suggestion } from '../../models/suggestion.model';

describe('SuggestionItemComponent', () => {
  let component: SuggestionItemComponent;
  let fixture: ComponentFixture<SuggestionItemComponent>;
  const mockSuggestion: Suggestion = {
    id: '1', // Changé de 1 à '1' pour correspondre au type string
    title: 'Test Title',
    content: 'Test Content'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionItemComponent, HighlightPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionItemComponent);
    component = fixture.componentInstance;
    component.suggestion = mockSuggestion;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the suggestion title', () => {
    expect(component.title).toBe('Test Title');
  });

  it('should display the suggestion content', () => {
    expect(component.content).toBe('Test Content');
  });

  it('should handle undefined suggestion gracefully', () => {
    component.suggestion = undefined as any;
    expect(component.title).toBe('');
    expect(component.content).toBe('');
  });

  it('should apply highlight pipe to title and content', () => {
    component.searchText = 'Test';
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h2');
    const contentElement = fixture.nativeElement.querySelector('.text-gray-700');
    expect(titleElement.innerHTML).toContain('<mark>Test</mark>');
    expect(contentElement.innerHTML).toContain('<mark>Test</mark>');
  });
});