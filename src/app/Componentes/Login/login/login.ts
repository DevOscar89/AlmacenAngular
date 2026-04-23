import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatCard, MatCardHeader,MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatLabel , MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-login',
  imports: [MatCard,MatCardHeader,MatCardTitle,MatCardSubtitle, 
    MatCardContent,MatLabel,MatFormField,MatIcon,MatInputModule,MatButtonModule,MatIconModule,MatNativeDateModule,MatFormFieldModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
