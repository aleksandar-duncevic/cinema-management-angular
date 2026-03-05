import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';  
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [FormsModule, CommonModule, MatCardModule] 
})
export class HomeComponent implements OnInit {
  isSearchVisible = false;
  movies: any[] = [];
  filteredMovies: any[] = [];
  genres: any[] = [];
  selectedGenre: number = 0;
  searchQuery: string = '';
  actor: string = '';
  actors: any[] = [];
  genre: string = '';
  director: string = '';
  runtime: number = 0;
  userInput: string = ''

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.loadGenres();
    this.loadActors();
  }

  // Dohvatanje filmove u zavisnosti od parametara unetih u formu pretrage
  fetchMovies(): void {
    this.movieService.getMovies(this.searchQuery, this.actor, this.selectedGenre, this.director, this.runtime)
      .subscribe((data: any) => {
        this.movies = data;
      });
    this.loadMovies();
  }

  // Pozivamo kada korisnik klikne na button Pretraga
  onSearch(): void {
    this.fetchMovies();
  }

  openDetails(fligtUrl: string) {
    throw new Error('Method not implemented.');
  }

  // Učitavanje žanrova
  loadGenres(): void {
    this.movieService.getGenres().subscribe(data => {
      this.genres = data;
    });
  }

  // Biranje žanra u pretrazi
  loadActors() {
    this.movieService.getActors().subscribe(data => {
      this.actors = data;
    });
  }

  onGenreChange(event: any) {
    this.selectedGenre = event.target.value;
    this.genre = event.target.value;
    this.doFilterChain();
    console.log("Postavljen žanr (ID):", this.selectedGenre);
  }

  // Otvaranje stranice o filmu
  openMovieDetails(shortUrl: string): void {
    window.open(`/detalji/${shortUrl}`, '_blank');
  }

  // Otvaranje rezervacije NIJE KONAČNO
  openOrder(shortUrl: string): void {
    window.open(`/detalji/rezervacija/${shortUrl}`, '_blank');
  }

  // Kreiranje stringa sa imenima žanrova
  getGenresList(genres: any[]): string {
    return genres.map(g => g.genre.name).join(' / ');
  }

  // Filtriranje
  doFilterChain() {
    this.filteredMovies = this.movies
    .filter(movie => {
      // Input Field Search
      if (this.userInput.trim() === '') return true
      return movie.title.toLowerCase().includes(this.userInput)
    })
    .filter(movie => {
      // Ako nema unosa, vrati sve filmove
      if (this.actor.trim() === '') return true;
      // Provera da li bar jedan glumac ima ime koje sadrži uneti string
      return movie.movieActors.some((actorEntry: { actor: { name: string; }; }) =>
        actorEntry.actor.name.toLowerCase().includes(this.actor.toLowerCase())
      );
    })
    .filter(movie => {
      if (this.genre.trim() === '') return true;
      // Provera zanra
      return movie.movieGenres.some((genreEntry: { genre: { name: string; }; }) =>
        genreEntry.genre.name.toLowerCase().includes(this.genre.toLowerCase())
      );
    })
    .filter(movie => {
      if (this.director.trim() === '') return true;
      // Provera rezisera
      return movie.director.name.toLowerCase().includes(this.director);
    })
    .filter(movie => {
      if (this.runtime === 0) return true;
      // Provera duzine trajanja
      return movie.runTime === this.runtime;
    });
  }

  loadMovies() {
    this.filteredMovies = this.movies;
  }
}


