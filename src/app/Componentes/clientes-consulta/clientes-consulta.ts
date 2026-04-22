import { ChangeDetectionStrategy,  Component,  inject,  signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // El componente
import {  FormControl,   FormGroup,   FormsModule,   ReactiveFormsModule,   Validators} from '@angular/forms';
import {   ColDef,   ModuleRegistry,    AllCommunityModule ,
   ValueFormatterParams ,   themeMaterial,    themeAlpine, 
   themeBalham,   themeQuartz,    RowSelectionOptions, 
      SelectionChangedEvent  } from 'ag-grid-community';
import { cliente } from '../../Models/clienteInterface';
import { toSignal } from '@angular/core/rxjs-interop';
import { Clientesservice } from '../../Service/Clientes/clientesservice';
import { MatCard ,MatCardHeader,MatCardTitle,MatCardContent,MatCardSubtitle} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-clientes-consulta',
  imports: [AgGridAngular,MatCard ,MatCardHeader,MatCardTitle,MatCardContent,
    MatCardSubtitle,MatInputModule,MatButtonModule,MatIconModule],
  standalone: true,
  templateUrl: './clientes-consulta.html',
  styleUrl: './clientes-consulta.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ClientesConsulta { 
  private clienteService = inject(Clientesservice);
  public theme = themeAlpine;   
  public ClienteSeleccionado = signal<cliente | null>(null);  
  public pageSize = signal(5);
  Documento = new FormControl('');
    
    //Configuracion de seleeccion ag-grid
  public rowSelection: RowSelectionOptions ={
    mode:'singleRow', // O 'multiRow' para varias
    checkboxes:true, // Pon true si quieres casillas de verificación
    enableClickSelection: true
  };

  public columnDefs: ColDef<cliente>[] = [
     { field:'Id', hide:true},      
     { headerName: 'Tipo Documento',    field:'CodTipoDocumento'},
     { headerName: 'Numero Documento',  field:'Documento'},
     { headerName: 'Primer Nombre',     field:'PrimerNombre'},
     { headerName: 'Segundo Nombre',    field:'SegundoNombre'},
     { headerName: 'Primer Apellido',    field:'PrimerApellido'},
     { headerName: 'Segundo Apellido',    field:'SegundoApellido'},
     { headerName: 'Fecha Nacimiento',  field:'FechaNacimiento',
          valueFormatter: (params: ValueFormatterParams) => {
          return params.value ? new Date(params.value).toLocaleDateString() : '';
         } 
      },      
     { headerName: 'País Nacimiento', field:'PaisNacimiento'},
     { headerName: 'Departamento Nacimiento', field:'DepartamentoNacimiento'},
     { headerName: 'Ciudad Nacimiento', field:'CiudadNacimiento'},   
     { headerName: 'Pais Residencia', field:'PaisResidencia'},
     { headerName: 'Departamento Residencia', field:'DepartamentoResidencia'},
     { headerName: 'Ciudad Residencia', field:'CiudadResidencia' },
     { headerName: 'Dirección',  field:'Direccion' },
     { headerName: 'Correo',  field:'Correo' },
     { headerName: 'Celular', field:'Celular'},
     { headerName: 'Sexo',  field:'Sexo'},
     { headerName: 'Fecha Resgitro',  field:'FechaRegistro',
             valueFormatter: (params: ValueFormatterParams) => {
       return params.value ? new Date(params.value).toLocaleDateString() : '';
      }
    }
  ];

  public rowData = toSignal(this.clienteService.ConsultarClientes(),{
     initialValue:[]
  });    
  
  onSeelectionChanged(event: SelectionChangedEvent){
    const selectRows = event.api.getSelectedRows();
    this.ClienteSeleccionado.set(selectRows.length > 0? selectRows[0]: null);
    console.log('Seleccionado :', this.ClienteSeleccionado());
  }
}
