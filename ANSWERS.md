# ANSWERS.md

## Technical questions

### 1. How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

I spent approximately 15 hours on this coding test, spread across three days. Most of the time was dedicated to setting up the Docker development environment and implementing the core functionalities.

With more time, I would add:

- **More comprehensive testing**: I wrote basic unit tests, but I would have liked to add integration tests and end-to-end tests with Cypress for the frontend.
- **UX improvements**: Add animations for transitions between suggestions, more elaborate loading indicators, and better error handling on the user side.
- **Internationalization**: Implement a translation system with ngx-translate to support multiple languages.
- **Offline mode**: Add a service worker to allow basic application usage without an internet connection.
- **API documentation**: Set up Swagger/OpenAPI to document the backend API interactively.
- **Monitoring and logging**: Integrate a more robust logging system and performance metrics.

### 2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

For Angular (TypeScript), one of the most useful features recently added is "Standalone Components" introduced in Angular 14 and improved in subsequent versions. This feature allows creating components without needing to declare them in a module, which significantly simplifies the application architecture.

```typescript
// suggestion.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SuggestionService } from '../services/suggestion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-suggestion',
  standalone: true, // Standalone component without module
  imports: [CommonModule, HttpClientModule], // Direct imports
  template: `
    <div class="suggestion-container">
      <h2>Suggestions</h2>
      <div *ngIf="suggestions$ | async as suggestions; else loading">
        <div *ngFor="let suggestion of suggestions" class="suggestion-item">
          {{ suggestion.text }}
        </div>
      </div>
      <ng-template #loading>Loading suggestions...</ng-template>
    </div>
  `,
  styles: [`
    .suggestion-container { padding: 1rem; }
    .suggestion-item { margin: 0.5rem 0; padding: 1rem; border-radius: 0.25rem; background-color: #f5f5f5; }
  `]
})
export class SuggestionComponent {
  private suggestionService = inject(SuggestionService); // Simplified dependency injection
  suggestions$ = this.suggestionService.getSuggestions();
}

```


This approach allows:

- Better component encapsulation
- Clearer dependency tree
- Reduced boilerplate code
- Better tree-shakeability to optimize bundle size
### 3. How would you track down a performance issue in production? Have you ever had to do this?
Yes, I have had to track down performance issues in production several times. Here's my approach:

1. Problem identification :
   
   - Use monitoring tools like New Relic, Datadog, or Sentry to identify problematic areas.
   - Analyze logs to spot error patterns or abnormally long response times.
   - Gather user feedback to understand the exact context of slowdowns.
2. Frontend analysis :
   
   - Use browser developer tools (Chrome DevTools, Firefox Developer Tools)
   - Analyze performance with Lighthouse and WebPageTest
   - Examine waterfall charts to identify bottlenecks in loading
   - Profile JavaScript with browser performance tools
3. Backend analysis :
   
   - Use profilers like Blackfire for PHP/Symfony
   - Analyze slow SQL queries with tools like Doctrine Query Logger
   - Check response times of external APIs
   - Examine server resource usage (CPU, memory, I/O)
4. Reproduction and resolution :
   
   - Reproduce the issue in a test environment
   - Implement targeted fixes
   - Measure the impact of changes
   - Deploy corrections gradually
Concrete example: On a previous project, we noticed significant slowdowns when loading a page containing numerous suggestions. Analysis revealed we were making several redundant API calls. The solution was to implement a client-side caching system and group certain requests on the server side, reducing loading time by 60%.

### 4. How would you improve the innosabi APIs that you just used?
After working with the suggestion API, here are the improvements I would propose:

1. Complete documentation :
   
   - Implement interactive OpenAPI/Swagger documentation
   - Add request and response examples for each endpoint
   - Clearly document error codes and their meaning
2. API versioning :
   
   - Introduce an explicit versioning system (e.g., /api/v1/suggestion )
   - Ensure backward compatibility during updates
   - Clearly communicate changes between versions
3. Pagination and filtering :
   
   - Add pagination options for suggestion lists
   - Allow filtering by different criteria (date, category, etc.)
   - Implement result sorting
4. Performance optimization :
   
   - Add appropriate cache headers
   - Implement gzip/brotli compression
   - Support conditional requests (ETag, If-Modified-Since)
5. Enhanced security :
   
   - Implement complete OAuth2 authentication
   - Add rate limiting
   - Strengthen input validation
6. Response improvements :
   
   - Standardize error response format
   - Add useful metadata (processing time, usage limit)
   - Include HATEOAS links for better discoverability
7. Additional features :
   
   - Endpoint for real-time suggestions
   - API for user preference management
   - Webhooks to notify of important changes
These improvements would make the API more robust, easier to use for developers, and more performant for end users.