import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email: string = '';
  public password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {
    if (UserService.getActiveUser()) {
      console.log("uspesno");
      router.navigate(['']);
      return
    }
  }

  public doLogin() {
    if (UserService.login(this.email, this.password)) {
      // Redirect to user to profile
      this.router.navigate(['/user'])
      return
    }

    this.errorMessage = 'Neispravan email ili lozinka.';
  }
}
