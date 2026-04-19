import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cliente } from '../../Models/clienteInterface';


@Injectable({
  providedIn: 'root',
})

export class Clientesservice {
  apiUrl = `${environment.apiUrl}${environment.Cliente}`;

  constructor(private http: HttpClient){}

  GuardarCliente(CLiente: any) {      
    try
    {
      this.http.post<cliente>(this.apiUrl, CLiente).subscribe({
        next: (response) => {            
            return response;
        },
        error: (error) => {
          alert(error.message);
        }
        });
    }
    catch(error){
          console.log(error);
    }
  }  
}
