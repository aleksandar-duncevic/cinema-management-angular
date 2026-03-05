import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';  
import { UserService } from './user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, CommonModule],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <span><i class="fa-solid fa-clapperboard logo"></i> Нетфликс</span>
      <span class="spacer"></span>
      
      <button mat-button routerLink="/"><i class="fa-solid fa-house"></i> Početna</button>
      <button mat-button routerLink="/movies"><i class="fa-solid fa-film"></i> Filmovi</button>

      <ng-container *ngIf="!service.getActiveUser()">
        <button mat-button routerLink="/login"><i class="fa-solid fa-right-to-bracket"></i> Prijava</button>
      </ng-container>

      <ng-container *ngIf="service.getActiveUser()">
        <button mat-button routerLink="/user"><i class="fa-solid fa-user"></i> Profil</button>
        <button mat-button (click)="doLogout()"><i class="fa-solid fa-right-from-bracket"></i> Odjava</button>
      </ng-container>
    </mat-toolbar>
  `
  ,
  styles: [`
    .navbar {
      top: 0;
      width: 100%;
      z-index: 1000;
    }
    .spacer {
      flex: 1;
    }
    .logo {
      padding-left: 30px;
    }
    
  `]
})
export class NavbarComponent {
  public service = UserService

  public constructor(private router: Router) {}

  public doLogout() {
    localStorage.removeItem('active')
    this.router.navigate(['/login'])
  }
}
