import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <a class="skip-link" href="#main-content">Passer au contenu principal</a>
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <header>
        <h1 class="text-3xl font-bold text-gray-800 text-center mb-8">Innosabi Suggestion Search</h1>
      </header>
      <main id="main-content" role="main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Innosabi Suggestion Search';
}