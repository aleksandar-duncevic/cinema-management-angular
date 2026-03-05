import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'https://movie.pequla.com/api';
  
  // TMDB API podešavanja
  private tmdbApiUrl = 'https://api.themoviedb.org/3';
  private tmdbApiKey = '528a8bb82e8e1d6c39d097b74c85db8d';

  constructor(private http: HttpClient) { }

  // Pravljenje URL u zavisnosti od unetih parametara
  getMovies(search: string = '', actor: string = '', genre: number = 0, director: string = '', runtime: number = 0): Observable<any> {
    let params = new HttpParams();
    if (search) params = params.append('search', search);
    if (actor) params = params.append('actor', actor);
    if (genre) params = params.append('genre', genre);
    if (director) params = params.append('director', director);
    if (runtime) params = params.append('runtime', runtime.toString());

    return this.http.get(`${this.apiUrl}/movie`, { params });
  }

  // Pozivanje API pomocu short URL
  getMovieByShortUrl(shortUrl: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/short/${shortUrl}`);
  }

  // Lista žanrova
  getGenres(search: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre`, { params: { search } });
  }

  // Lista glumaca
  getActors(search: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}/actor`, { params: { search } });
  }

  // Lista režisera
  getDirectors(search: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}/director`, { params: { search } });
  }

  getFakeMovieRating(): number {
    return Math.floor(Math.random() * (9 - 6 + 1)) + 6; // Nasumičan broj između 6 i 10
  }  

  // Dopremanje podataka o filmu sa TMDB pomoću id
  getTmdbMovieDetails(tmdbId: number): Observable<any> {
    return this.http.get(`${this.tmdbApiUrl}/movie/${tmdbId}`, {
      params: { api_key: this.tmdbApiKey }
    });
  }

  // Alternativa: Dopremanje podataka o filmu sa TMDB pomoću naslova
  getTmdbMovieRatingByTitle(title: string): Observable<any> {
    return this.http.get(`${this.tmdbApiUrl}/search/movie`, {
      params: { api_key: this.tmdbApiKey, query: title }
    });
  }
}
