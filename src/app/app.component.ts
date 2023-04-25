import { UserService } from './_shared/user.service';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule ,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [UserService]
})
export class AppComponent {
}
