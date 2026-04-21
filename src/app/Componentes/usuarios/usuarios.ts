import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
import { MatButton, MatFabButton } from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-usuarios',
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
    MatButton,

    MatDividerModule, MatFabButton],
  standalone: true,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Usuarios {
  private Usuarioservice = inject(Usuarioservice);
   Roles = signal<Rol[]>([]);

   constructor(){
     this.CargarRol();
   }

  usuarioFormulario = new FormGroup({
    Id: new FormControl(0),
	  Usuario: new FormControl('',[
      Validators.required
    ]), 
	  Password: new FormControl('',[
      Validators.required      
    ]), 
	  PrimerNombre: new FormControl('',[
      Validators.required
    ]), 
	  SegundoNombre: new FormControl(''), 
	  PrimerApellido: new FormControl('',[
      Validators.required
    ]), 
	  SegundoApellido: new FormControl('',[
      Validators.required
    ]), 
	  Correo: new FormControl('',[
      Validators.required,
      Validators.email
    ]), 
	  Celular: new FormControl(''), 
	  Rol: new FormControl('',[
      Validators.required
    ]), 
	  FechaRegistro: new FormControl(new Date().toISOString().substring(0, 10)), 
  });

  onSubmit()
  {
    console.log(this.usuarioFormulario.value);
    if(this.usuarioFormulario.invalid == false)
      {         
          this.Usuarioservice.GuardarUsuario(this.usuarioFormulario.value);   
      } else {
        Swal.fire('Revisar!','Por favor, diligencia el formulario','warning');
      }
  }

  onCancel(){
    this.usuarioFormulario.reset();
  }

  CargarRol(): void {
    this.Usuarioservice.ConsultarRoles().subscribe({
      next:(data) =>{
         this.Roles.set(data);
      },
      error:(err)=>{
        console.error("Error",err);   
      }
    });
  }
}
