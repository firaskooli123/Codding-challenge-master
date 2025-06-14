import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  
  transform(text: string, search: string): SafeHtml {
    if (!search || !text) {
      return text;
    }
    
    const pattern = search
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') // Échapper les caractères spéciaux
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    
    const regex = new RegExp(`(${pattern})`, 'gi');
    
    // Use mark tags for semantic highlighting
    const highlightedText = text.replace(regex, '<mark>$1</mark>');
    
    // Sanitize the HTML to prevent XSS attacks
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}