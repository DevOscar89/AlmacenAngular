import { ChangeDetectionStrategy, Component, inject, signal ,OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuarioservice } from '../../Service/Usuario/usuarioservice';
import { CommonModule } from '@angular/common'; 
import { Rol } from '../../Models/rolInterface';
import Swal from 'sweetalert2';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButton, MatFabButton, MatAnchor } from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-productos',
  imports: [ReactiveFormsModule,
    CommonModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCardModule,
    MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule, MatAnchor, MatButton,MatGridListModule],
  standalone: true,
  templateUrl: './productos.html',
  styleUrl: './productos.css',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Productos {
    
}
