import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cliente } from '../../Models/clienteInterface';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})

export class Clientesservice {
  apiUrl = `${environment.apiUrl}${environment.Cliente}`;

  constructor(private http: HttpClient){}

  GuardarCliente(CLiente: any) {      
    try
    {
      this.http.post<cliente>(this.apiUrl, CLiente)
      .subscribe({
          next: (response) => {   
               Swal.fire('¡Éxito!',
                         'El cliente fue creado '+response.PrimerNombre.toString()
                         + ' ' +response.PrimerApellido.toString(), 
                         'success');           
          },
          error: (error) => {
             Swal.fire('¡Fallo!',
                       'Hubo inconvenientes en el proceso'+ error.message,
                       'error');
          }
      });
    }
    catch(error){
          console.log(error);
    }
  }
  
  ConsultarClientes(): Observable<cliente[]>{
    return this.http.get<cliente[]>(this.apiUrl);
  }
}