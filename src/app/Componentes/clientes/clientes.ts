import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Facturacionservice} from '../../Service/Facturacion/facturacionservice';
import { Comunesservice } from '../../Service/Comunes/comunesservice';
import { Sexo } from '../../Models/SexoInterface';
import { TipoDocumento } from '../../Models/TipoDocumentoInterface';
import { Pais } from '../../Models/PaisInterface';
import { Departamentos } from '../../Models/DepartamentosInterface';
import { Municipios } from '../../Models/MunicipiosInterface';
import { Ocupacion } from '../../Models/OcupacionInterface';
import { Clientesservice } from '../../Service/Clientes/clientesservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Clientes {    
  private FacturacionService = inject(Facturacionservice);
  private Comunesservice = inject(Comunesservice);
  private ClienteService = inject(Clientesservice );
  sexo = signal<Sexo[]>([]);
  tipoDocumento = signal<TipoDocumento[]>([]);
  paises = signal<Pais[]>([]);
  paisesResidencia = signal<Pais[]>([]);
  departamentos = signal<Departamentos[]>([]); 
  departamentosResidencia = signal<Departamentos[]>([]); 
  municipios = signal<Municipios[]>([]);
  municipiosResidencia = signal<Municipios[]>([]);
  ocupacion = signal<Ocupacion[]>([]);
  cargando = signal<boolean>(true);  
  error = signal<string | null>(null);

  constructor(){  
	this.cargarTipoDocumento();
	this.cargarPaises();
	this.cargarPaisesResidencia();
	this.cargarOcupacion();
  }

clienteFormulario = new FormGroup({
	CodTipoDocumento: new FormControl(''),
	Documento: new FormControl('',
		[
			Validators.required

		]),
	PrimerNombre: new FormControl('',
		[
			Validators.required

		]),
	SegundoNombre: new FormControl(''),
	PrimerApellido: new FormControl('',
		[
			Validators.required

		]),
	SegundoApellido: new FormControl('',
		[
			Validators.required

		]),
	FechaNacimiento: new FormControl('',
		[
			Validators.required

		]),
	PaisNacimiento: new FormControl('',
		[
			Validators.required

		]),
	DepartamentoNacimiento: new FormControl('',
		[
			Validators.required

		]),
	CiudadNacimiento: new FormControl('',
		[
			Validators.required

		]),
	PaisResidencia: new FormControl('',
		[
			Validators.required

		]),
	DepartamentoResidencia: new FormControl('',
		[
			Validators.required

		]),
	CiudadResidencia: new FormControl('',
		[
			Validators.required

		]),
	Direccion: new FormControl('',
		[
			Validators.required

		]),
	Correo: new FormControl('', 
		[
			Validators.email
		]
	),
	Celular: new FormControl('',
		[
			Validators.required

		]),
	Sexo: new FormControl(''),
	Ocupacion: new FormControl(''),
});	

onSubmit(){
	if(this.clienteFormulario.invalid == false){
         this.ClienteService.GuardarCliente(this.clienteFormulario.value);
	} else {
 		Swal.fire('Revisar!','Hubo inconvenientes en el proceso','error');
	}
	
	
}

changePaisNacimiento(event: Event): void {
	const selectElement = event.target as HTMLSelectElement;
	const valorSeleccionado = selectElement.value;
	console.log('Valor seleccionado:', valorSeleccionado);
	if(valorSeleccionado !== '')
		this.cargarDepartamentos(parseInt(valorSeleccionado));
	else
		this.departamentos.set([]);
		this.municipios.set([]);
  }

  changeDepartamentoNacimiento(event: Event): void {
	const selectElement = event.target as HTMLSelectElement;
	const valorSeleccionado = selectElement.value;
	console.log('Valor seleccionado:', valorSeleccionado);
	if(valorSeleccionado !== '')
		this.cargarMunicipios(parseInt(valorSeleccionado));
	else
		this.municipios.set([]);
  }

  changePaisResidencia(event: Event): void {
	const selectElement = event.target as HTMLSelectElement;
	const valorSeleccionado = selectElement.value;
	console.log('Valor seleccionado:', valorSeleccionado);
	if(valorSeleccionado !== '')
		this.cargarDepartamentosResidencia(parseInt(valorSeleccionado));
	else
		this.departamentosResidencia.set([]);
		this.municipiosResidencia.set([]);
  }

  changeDepartamentoResidencia(event: Event): void {
	const selectElement = event.target as HTMLSelectElement;
	const valorSeleccionado = selectElement.value;
	console.log('Valor seleccionado:', valorSeleccionado);
	if(valorSeleccionado !== '')
		this.cargarMunicipiosResidencia(parseInt(valorSeleccionado));
	else
		this.municipiosResidencia.set([]);
  }

  cargarDepartamentos(Id:number) : void {
		this.Comunesservice.getDepartamentosByPaisId(Id).subscribe({
	  next: (data) => {
		this.departamentos.set(data);
		this.cargando.set(false);
	  },
	  error: (err) => {	
		console.error('Error al cargar los departamentos', err);
		this.error.set('Error al cargar los departamentos');
		this.cargando.set(false);
	  }
	});
  }

   cargarDepartamentosResidencia(Id:number) : void {
		this.Comunesservice.getDepartamentosByPaisId(Id).subscribe({
	  next: (data) => {
		this.departamentosResidencia.set(data);
		this.cargando.set(false);
	  },
	  error: (err) => {	
		console.error('Error al cargar los departamentos', err);
		this.error.set('Error al cargar los departamentos');
		this.cargando.set(false);
	  }
	});
  }

   cargarMunicipios(Id:number) : void {
		this.Comunesservice.getMunicipiosByDepartamentoId(Id).subscribe({
	  next: (data) => {
		this.municipios.set(data);
		this.cargando.set(false);
	  },
	  error: (err) => {
		console.error('Error al cargar los municipios', err);
		this.error.set('Error al cargar los municipios');
		this.cargando.set(false);
	  }
	});
  }

  cargarMunicipiosResidencia(Id:number) : void {
		this.Comunesservice.getMunicipiosByDepartamentoId(Id).subscribe({
	  next: (data) => {
		this.municipiosResidencia.set(data);
		this.cargando.set(false);
	  },
	  error: (err) => {
		console.error('Error al cargar los municipios', err);
		this.error.set('Error al cargar los municipios');
		this.cargando.set(false);
	  }
	});
  } 

  cargarTipoDocumento() : void {
	this.Comunesservice.obtenerTipoDocumento().subscribe({
	  next: (data) => {
		this.tipoDocumento.set(data);
		this.cargando.set(false);
	  },
	  error: (err) => {
		console.error('Error al cargar los datos',err);
		this.error.set('Error al cargar los datos');
		this.cargando.set(false);
	  }
	});
  }

  cargarOcupacion() : void {
	this.Comunesservice.OctenerOcupacion().subscribe({
	  next: (data) => {
		this.ocupacion.set(data);
		this.cargando.set(false);
	  },
	  error: (err) => {
		console.error('Error al cargar los datos',err);
		this.error.set('Error al cargar los datos');
		this.cargando.set(false);
	  }
	});	
  }

  cargarPaises() : void {
	this.Comunesservice.obtenerPaises().subscribe({
	  next: (data) => {
		this.paises.set(data);
		this.cargando.set(false);
	  },
	  error: (err) => {
		console.error('Error al cargar los datos',err);
		this.error.set('Error al cargar los datos');
		this.cargando.set(false);
	  }
	});
  }

  cargarPaisesResidencia() : void {
	this.Comunesservice.obtenerPaises().subscribe({
	  next: (data) => {
		this.paisesResidencia.set(data);
		this.cargando.set(false);
	  },
	  error: (err) => {
		console.error('Error al cargar los datos',err);
		this.error.set('Error al cargar los datos');
		this.cargando.set(false);
	  }
	});
  } 
}
