import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../../Models/TipoDocumentoInterface';
import { Pais } from '../../Models/PaisInterface';
import { Municipios } from '../../Models/MunicipiosInterface';
import { environment } from '../../../environments/environment.development';
import { Departamentos } from '../../Models/DepartamentosInterface';
import { Ocupacion } from '../../Models/OcupacionInterface';
import { concat } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Comunesservice {
  private apiUrl = `${environment.apiUrl}${environment.Parametros}`; 

  constructor(private http: HttpClient) {}

  // Método para obtener los datos de tipo de documento desde la API
  obtenerTipoDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.apiUrl}${environment.TipoDocumento}`);
  }

  // Obtener tipo documento por ID
  getTipoDocumentoById(id: number): Observable<TipoDocumento> {
    return this.http.get<TipoDocumento>(`${this.apiUrl}${environment.TipoDocumento}/${id}`);
  }

  obtenerPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.apiUrl}${environment.Pais}`);
  }

  // Obtener país por ID
  getPaisById(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.apiUrl}${environment.Pais}/${id}`);
  }  
  
  // Obtener departamentos por ID de país
  getDepartamentosByPaisId(IdPais: number): Observable<Departamentos[]> {
    if (IdPais) 
      return this.http.get<Departamentos[]>(`${this.apiUrl}${environment.Departamento}/${IdPais}`);
      else
      return new Observable<Departamentos[]>();     
  }

  ObtenerDepartamentos(): Observable<Departamentos[]> { 
    return this.http.get<Departamentos[]>(`${this.apiUrl}${environment.Departamento}`);
  }

  // Obtener municipios por ID de departamento
  getMunicipiosByDepartamentoId(IdDepartamento: number): Observable<Municipios[]> {
    if (IdDepartamento) 
      return this.http.get<Municipios[]>(`${this.apiUrl}${environment.Municipio}/${IdDepartamento}`);
      else
      return new Observable<Municipios[]>();     
  }

  OctenerOcupacion(): Observable<Ocupacion[]> {
    return this.http.get<Ocupacion[]>(`${this.apiUrl}${environment.Ocupacion}`);
  } 

} 

