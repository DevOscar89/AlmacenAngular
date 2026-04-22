import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,NgForm ,FormGroupDirective,AbstractControl} from '@angular/forms';
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
import { MatButton } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {ErrorStateMatcher} from '@angular/material/core';
import { Subject } from 'rxjs'; // Para limpieza de memoria
import { sign } from 'crypto';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: AbstractControl | null, // Cambiado de FormControl a AbstractControl
    form: FormGroupDirective | NgForm | null // Cambiado de FormGroup a FormGroupDirective
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-usuarios',
  imports: [
    CommonModule, 
    MatSelectModule, 
    MatCardModule,      
    FormsModule,    
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatButton,
    MatDividerModule, 
    MatFormFieldModule,
    MatInputModule, 
    ReactiveFormsModule
    ],
  standalone: true,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Usuarios implements OnInit, OnDestroy { //Implementamos los hooks
  private destroy$ = new Subject<void>(); // Notificador para cerrar suscripciones
  //Definimos las señales y servicios injectados....
  private usuarioservice = inject(Usuarioservice);
   Roles = signal<Rol[]>([]);
   hide = signal(true);

  usuarioFormulario = new FormGroup({
    Id: new FormControl(0),
	  Usuario: new FormControl('',[
      Validators.required
    ]), 
	  Password: new FormControl('',[
      Validators.required,
      Validators.minLength(4)      
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
	  Celular: new FormControl('',[
      Validators.pattern('^[0-9]+$'),// Ajusta la regex según tu país
      Validators.minLength(10), // Ajusta el mínimo de dígitos según tu país
      Validators.maxLength(10)  // Ajusta el máximo de dígitos según tu país
    ]), 
	  Rol: new FormControl('',[
      Validators.required
    ]), 
	  FechaRegistro: new FormControl(new Date().toISOString().substring(0, 10)), 
  });

  matcher = new MyErrorStateMatcher();
  
  ngOnInit(): void{
    this.CargarRol();
  }

  CargarRol(): void {
    this.usuarioservice.ConsultarRoles().subscribe({
      next:(data) =>{
         this.Roles.set(data);
      },
      error:(err)=>{
        console.error("Error",err);   
      }
    });
  }

  onSubmit()
  {
    console.log(this.usuarioFormulario.value);
    if(this.usuarioFormulario.invalid == false)
      {         
          this.usuarioservice.GuardarUsuario(this.usuarioFormulario.getRawValue());   
      } else {
        Swal.fire('Revisar!','Por favor, diligencia el formulario','warning');
      }
  }

  soloNumeros(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault(); // Impide escribir si no es un número
    }
  }

  onCancel(){
    this.usuarioFormulario.reset();
  }
   
   // Getter para facilitar el acceso desde el HTML
  get celular() {
    return this.usuarioFormulario.get('Celular');
  }

  get passwordInput() { 
    return this.usuarioFormulario.get('Password'); 
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(); // Activa la detención de todas las suscripciones
    this.destroy$.complete(); // Cierra el flujo del Subject
    console.log('Componente Clientes destruido y suscripciones cerradas.');
  }
}
