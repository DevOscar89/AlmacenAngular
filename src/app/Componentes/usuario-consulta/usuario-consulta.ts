import { Component,inject,signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // El componente
import { ColDef, ModuleRegistry, AllCommunityModule ,ValueFormatterParams ,themeMaterial, themeAlpine, themeBalham,themeQuartz, RowSelectionOptions, SelectionChangedEvent} from 'ag-grid-community';
import { usuario } from '../../Models/UsuarioInterface';
import { Usuarioservice } from '../../Service/Usuario/usuarioservice';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCard ,MatCardHeader,MatCardTitle,MatCardContent,MatCardSubtitle } from "@angular/material/card";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from "@angular/material/grid-list";

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-usuario-consulta',
  standalone:true,
  imports: [AgGridAngular, MatCard, MatCardHeader, MatCardTitle, MatInputModule,
    MatCardContent, MatFormFieldModule, MatIconModule, MatButtonModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule],
  templateUrl: './usuario-consulta.html',
  styleUrl: './usuario-consulta.css',
})

export class UsuarioConsulta {
  private usuarioservice = inject(Usuarioservice);  
  public theme = themeMaterial;
  
  //Signal almacena la fila seleccionada
   public usuarioSeleccionado = signal<usuario | null>(null);

     public pageSize = signal(5);

//Configuracion de seleeccion ag-grid
  public rowSelection: RowSelectionOptions ={
    mode:'singleRow', // O 'multiRow' para varias
    checkboxes:true, // Pon true si quieres casillas de verificación
    enableClickSelection: true
  };

  public columnDefs: ColDef<usuario>[] = [
     { field:'Id', hide:true},
     { 
      headerName: 'Primer Nombre', 
      field:'PrimerNombre',  
      editable: true, //Celda editable
      cellEditor: 'agTextCellEditor'
     },
     { headerName: 'Segundo Nombre',  field:'SegundoNombre'},
     { headerName: 'Primer Apellido', field:'PrimerApellido'},
     { headerName: 'Segundo Apellido', field:'SegundoApellido'},
     { headerName: 'Usuario', field:'Usuario' , width:100},
     { headerName: 'password', field:'Password', hide: true },
     { headerName: 'Correo',  field:'Correo' },
     { headerName: 'Celular', field:'Celular' ,width:150 },
     { headerName: 'Rol', field:'Rol' },
     { headerName: 'Fecha Resgitro',  field:'FechaRegistro',
             valueFormatter: (params: ValueFormatterParams) => {
       return params.value ? new Date(params.value).toLocaleDateString() : '';
       }  
     }
  ];
  
  public rowData = toSignal(this.usuarioservice.ConsultarUsuarios(),{
    initialValue:[]
  });  

  onSeelectionChanged(event: SelectionChangedEvent){
    const selectRows = event.api.getSelectedRows();
    this.usuarioSeleccionado.set(selectRows.length > 0? selectRows[0]: null);
    console.log('Seleccionado :', this.usuarioSeleccionado());
  }


}