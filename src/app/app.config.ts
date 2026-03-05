import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // Updated import
import { FormsModule } from '@angular/forms';  // For two-way binding
import { MovieService } from './movie.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),  // Updated API
    FormsModule,  // Two-way binding
    MovieService,
    provideAnimations(), // Potrebno za Material animacije
    importProvidersFrom(MatToolbarModule, MatButtonModule)
  ]
};
