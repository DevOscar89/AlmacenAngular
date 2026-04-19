import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { usuario } from '../../Models/UsuarioInterface';
import { Rol } from '../../Models/rolInterface';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Usuarioservice {
  apiUrl = `${environment.apiUrl}${environment.Usuario}`;
  
  constructor(private http: HttpClient){}

  GuardarUsuario(Usuario: any){
    try
    {
      const HttpOtions ={

        headers: new HttpHeaders ({'content-type':'application/json'})
      }
       this.http.post<usuario>(this.apiUrl, Usuario, HttpOtions).subscribe({
        next: (response) => {
           Swal.fire('¡Ok!','EL Usuario :'+{ response, Usuario: response.Usuario.toString()}+ 'fue creado con exito.', 'success');     
        },
        error: (error) => {
          Swal.fire('Revisar!','Hubo inconvenientes en el proceso'+ error.message,'error');
        }
       });
    }
    catch(error){
       console.log(error);
    }    
  }

 ConsultarUsuarios(): Observable<usuario[]> {
    return this.http.get<usuario[]>(this.apiUrl);
  }

  ConsultarRoles(): Observable<Rol[]>{
    return this.http.get<Rol[]>(`${environment.apiUrl}${environment.Parametros}${environment.Roles}`);
  }

}
