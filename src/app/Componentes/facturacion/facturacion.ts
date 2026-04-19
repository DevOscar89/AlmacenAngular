import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {form, FormField} from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';
import { Facturacionservice } from '../../Service/Facturacion/facturacionservice'; 
import { Comunesservice } from '../../Service/Comunes/comunesservice';
import { Sexo } from '../../Models/SexoInterface';
import { Departamentos } from '../../Models/DepartamentosInterface';
import { Municipios } from '../../Models/MunicipiosInterface';

@Component({
  selector: 'app-facturacion',
  imports: [],
  standalone: true,
  templateUrl: './facturacion.html',
  styleUrl: './facturacion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Facturacion {
  private FacturacionService = inject(Facturacionservice);
  private ComunesService = inject(Comunesservice);
  departamento = signal<Departamentos[]>([]);
  municipio = signal<Municipios[]>([]);
  sexo = signal<Sexo[]>([]);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(){
    this.cargarSexo(); 
    this.cargarDepartamentos(); 
  }

  cargarSexo() : void {
    this.FacturacionService.obtenerSexo().subscribe({
      next: (data) => {
        this.sexo.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar los datos',err);
        this.error.set('Error al cargar los datos');
        this.cargando.set(false);
      }
    });
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
}