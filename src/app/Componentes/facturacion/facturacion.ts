import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {form, FormField} from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';
import { Facturacionservice } from '../../Service/Facturacion/facturacionservice'; 
import { Comunesservice } from '../../Service/Comunes/comunesservice';
import { Sexo } from '../../Models/SexoInterface';
import { Departamentos } from '../../Models/DepartamentosInterface';
import { Municipios } from '../../Models/MunicipiosInterface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,NgForm ,FormGroupDirective,AbstractControl} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {ErrorStateMatcher} from '@angular/material/core';

import { Subject } from 'rxjs';
import { MatTooltip } from "@angular/material/tooltip"; // Para limpieza de memoria

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
  selector: 'app-facturacion',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  standalone: true,
  templateUrl: './facturacion.html',
  styleUrl: './facturacion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Facturacion implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>(); // Notificador para cerrar suscripciones
  private FacturacionService = inject(Facturacionservice);
  private ComunesService = inject(Comunesservice);
  departamento = signal<Departamentos[]>([]);
  municipio = signal<Municipios[]>([]);
  sexo = signal<Sexo[]>([]);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);


facturacionFormulario = new FormGroup({
  Documento: new FormControl(''),
  Nombre: new FormControl(''),
  Departamento: new FormControl(''),
  Ciudad: new FormControl(''),
  Nofactura: new FormControl(''), 
  Descripcion: new FormControl(''),
  Cantidad: new FormControl(''),
  Valor: new FormControl(''),
  Total: new FormControl(''),
});

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void{
    this.cargarDepartamentos(); 
  }
  
  onSubmit(){
    console.log(this.facturacionFormulario.value);
  }

  ChangeDepartamento(event: any) : void {
    const selectElement = event.target as HTMLSelectElement;
	  const valorSeleccionado = selectElement.value;
	  console.log('Valor seleccionado:', valorSeleccionado);
    if(valorSeleccionado !== '')
	    this.CargarMunicipios(parseInt(valorSeleccionado));
    else
      this.municipio.set([]);
  }

  cargarDepartamentos() : void {
    this.ComunesService.ObtenerDepartamentos().subscribe({
      next: (data) => {
        this.departamento.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar los datos',err);
        this.error.set('Error al cargar los datos');
        this.cargando.set(false);
      }
    });
  }
  
  CargarMunicipios(IdDepartamento: number) : void {
    this.ComunesService.getMunicipiosByDepartamentoId(IdDepartamento).subscribe({
      next: (data) => {
        this.municipio.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar los municipios', err);
        this.cargando.set(false);
      }
    });
  }

   ngOnDestroy(): void {
    this.destroy$.next(); // Activa la detención de todas las suscripciones
    this.destroy$.complete(); // Cierra el flujo del Subject
    console.log('Componente Clientes destruido y suscripciones cerradas.');
  }
}