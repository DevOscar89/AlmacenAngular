import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sexo } from '../../Models/SexoInterface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class Facturacionservice {
  private apiUrl = `${environment.apiUrl}${environment.Parametros}${environment.Sexo}`;

  constructor(private http: HttpClient) {}

  // Método para obtener los datos de sexo desde la API
  obtenerSexo(): Observable<Sexo[]> {
    return this.http.get<Sexo[]>(this.apiUrl);
  }
}