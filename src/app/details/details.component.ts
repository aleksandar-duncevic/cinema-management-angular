import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { UserService } from '../user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, CommonModule, MatIconModule, MatCheckboxModule, FormsModule, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  movie: any = {};
  shortUrl: string = "";
  rating: number | null| undefined = undefined;
  watched: boolean = false;
  userRating: number = 0;
  actors: any[] = [];
  // Kreiramo niz od 1 do 10 da prikažemo zvezdice
  stars: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  reservationVisible: boolean = false;
  reservationDate: Date | null = null;
  reservationTime: string = '';
  availableTimes: string[] = ['18:00', '20:00', '22:00'];
  ticketVolume: number = 1;
  ticketPrice: number = 99;
  totalPrice: number = this.ticketPrice; // Početna vrednost

  constructor(private movieService: MovieService, private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.shortUrl = params['shortUrl'];
    })
  }

  ngOnInit(): void {
    this.fetchMovie();
    this.getRating();
    this.loadActors();
  }

  fetchMovie(): void {
    this.movieService.getMovies(this.shortUrl)
      .subscribe((data: any) => {
        this.movie = data[0];
      });
  }

  setUserRating(value: number): void {
    this.userRating = value;
  }

  // Ako korisnik poništi oznaku da je film odgledan, resetujemo korisničku ocenu
  onWatchedChange(): void {
    if (!this.watched) {
      this.userRating = 0;
    }
  }

  getRating() {
    this.rating = this.movieService.getFakeMovieRating();
    /*
    this.movieService.getTmdbMovieRatingByTitle(this.movie['originalTitle']).subscribe((data: any) => {
      if (data.results && data.results.length > 0) {
        this.rating = data.results[0].vote_average;
        console.log('TMDB rating:', this.rating);
      }
    });
    */
  }

  loadActors(): void {
    this.movieService.getActors().subscribe(data => {
      this.actors = data;
      console.log(this.actors);
    });
  }

  getActorsList(actors: any[]): string {
    return actors.map(a => a.actor.name).join(', ');
  }

  getGenresList(genres: any[]): string {
    return genres.map(g => g.genre.name).join(' / ');
  }

  toggleReservationForm(): void {
    this.reservationVisible = !this.reservationVisible;
  }

  confirmReservation(): void {
    /*
    console.log('Rezervacija:', {
      date: this.reservationDate,
      time: this.reservationTime,
      price: this.ticketVolume
    });
    */
    const result = UserService.createOrder({
      id: new Date().getTime(),
      movieId: this.movie!.id,
      movieTitle: this.movie!.title,
      movieRating: this.movieService.getFakeMovieRating(),
      reservationDate: this.reservationDate,
      reservationTime: this.reservationTime,
      ticketVolume: this.ticketVolume,
      ticketPrice: this.ticketPrice,
      totalPrice: this.totalPrice,
      status: 'ordered',
      shortUrl: this.shortUrl
    })
    console.log("confirmReservation()");
    this.reservationVisible = false;
  }

  calculateTotalPrice() {
    this.totalPrice = this.ticketVolume * this.ticketPrice;
  }
}
