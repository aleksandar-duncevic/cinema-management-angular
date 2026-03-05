import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { UserService } from '../user.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-signup',
  imports: [MatCardModule, NgFor, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  genres: any[] = [];
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  address: string = '';
  genre: string = '';

  public constructor(private movieService: MovieService, private router: Router) {
    this.loadGenres();
  }

  loadGenres(): void {
    this.movieService.getGenres().subscribe(data => {
      this.genres = data;
    });
  }

  public doSignup() {
    if (this.email == '' || this.password == '') {
      alert('Email i lozinka su obavezni');
      return;
    }

    if (this.password !== this.repeatPassword) {
      alert('Lozinke se ne podudaraju');
      return;
    }

    const result = UserService.createUser({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      favouriteGenre: this.genre,
      orders: []
    })

    result ? this.router.navigate(['/login']) : alert('Email se već koristi');
  }
}
