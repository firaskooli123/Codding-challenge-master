import { HighlightPipe } from './highlight.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;
  let sanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    sanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);
    sanitizer.bypassSecurityTrustHtml.and.callFake((value) => value);
    pipe = new HighlightPipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original text when search term is empty', () => {
    const text = 'This is a test';
    expect(pipe.transform(text, '')).toBe(text);
  });

  it('should highlight the matching text with mark tag', () => {
    const text = 'This is a test';
    const searchTerm = 'test';
    const result = pipe.transform(text, searchTerm);
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('This is a <mark>test</mark>');
  });

  it('should be case insensitive', () => {
    const text = 'This is a Test';
    const searchTerm = 'test';
    const result = pipe.transform(text, searchTerm);
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('This is a <mark>Test</mark>');
  });

  it('should highlight multiple occurrences', () => {
    const text = 'Test this test';
    const searchTerm = 'test';
    const result = pipe.transform(text, searchTerm);
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('<mark>Test</mark> this <mark>test</mark>');
  });
});