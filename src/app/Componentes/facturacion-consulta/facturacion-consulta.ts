import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ColDef, ModuleRegistry, AllCommunityModule,themeMaterial, ValueFormatterParams, RowSelectionOptions, SelectionChangedEvent} from 'ag-grid-community';
import { MatCard ,MatCardHeader,MatCardTitle,MatCardContent} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgGridAngular} from 'ag-grid-angular';
import { Facturacionservice } from '../../Service/Facturacion/facturacionservice';  
import { Factura } from '../../Models/FacturaInterface';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-facturacion-consulta',
  imports: [AgGridAngular,MatCard,MatCardHeader,MatCardTitle,MatCardContent,MatInputModule,MatIconModule,MatButtonModule,MatDatepickerModule,MatNativeDateModule],
  standalone: true,
  templateUrl: './facturacion-consulta.html',
  styleUrl: './facturacion-consulta.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FacturacionConsulta {
  private facturacionservice = inject(Facturacionservice);  
  public theme = themeMaterial;  
  public FacturaSeleccionado = signal<Factura | null>(null); //Signal almacena la fila seleccionada
  public pageSize = signal(5);

  public rowSelection: RowSelectionOptions = {
    mode:'singleRow',
    checkboxes:true,
    enableClickSelection: true
  };

  public columnDefs: ColDef<Factura>[] = [
       { field:'Id', hide:true },
       { headerName: 'Numero Factura',  field:'NoFactura'},
       { headerName: 'Cedula', field:'Cedula' },
       { headerName: 'Nombre', field:'Nombre'},
       { headerName: 'Departamento', field:'Departamento'},
       { headerName: 'Ciudad', field:'Ciudad' },
       { headerName: 'Dirección', field:'Direccion'},
       { headerName: 'Descripción', field:'Descripcion' },
       { headerName: 'Cantidad', field:'Cantidad'},
       { headerName: 'Valor', field:'Valor' },
       { headerName: 'Fecha', field:'Fecha',
               valueFormatter: (params: ValueFormatterParams) => {
               return params.value ? new Date(params.value).toLocaleDateString() : '';
        }
      }      
  ];

  public rowData = toSignal(this.facturacionservice.ConsultaFactura(),{
    initialValue:[]
  });

  onSelectionChanged(event: SelectionChangedEvent){
    const selectRows = event.api.getSelectedRows();
    this.FacturaSeleccionado.set(selectRows.length > 0? selectRows[0]: null);
    console.log('Seleccionado :',this.FacturaSeleccionado());
  }
}
