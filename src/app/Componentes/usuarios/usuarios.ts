import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuarioservice } from '../../Service/Usuario/usuarioservice';
import { CommonModule } from '@angular/common'; 
import { Rol } from '../../Models/rolInterface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  imports: [ReactiveFormsModule, CommonModule ],
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
      Validators.required,
    ]), 
	  Password: new FormControl(''), 
	  PrimerNombre: new FormControl(''), 
	  SegundoNombre: new FormControl(''), 
	  PrimerApellido: new FormControl(''), 
	  SegundoApellido: new FormControl(''), 
	  Correo: new FormControl('',[
      Validators.required,
      Validators.email
    ]), 
	  Celular: new FormControl(''), 
	  Rol: new FormControl(''), 
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
