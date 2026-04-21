import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Factura } from '../../Models/FacturaInterface';

@Injectable({
  providedIn: 'root',
})

export class Facturacionservice {
  private apiUrl = `${environment.apiUrl}${environment.Facturacion}${environment.Factura}`;

  constructor(private http: HttpClient) {}

  
  ConsultaFactura(): Observable<Factura[]>{
    return this.http.get<Factura[]>(this.apiUrl);
  }
}