import { Routes } from '@angular/router';
import {Facturacion} from './Componentes/facturacion/facturacion';
import {Usuarios} from './Componentes/usuarios/usuarios';
import {Clientes} from './Componentes/clientes/clientes';
import { Login } from './Componentes/Login/login/login';
import { UsuarioConsulta } from './Componentes/usuario-consulta/usuario-consulta';
import { ClientesConsulta } from './Componentes/clientes-consulta/clientes-consulta';
import { FacturacionConsulta } from './Componentes/facturacion-consulta/facturacion-consulta';
import { Productos } from './Componentes/productos/productos';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
     {
        path: '',
        redirectTo: 'Login',
        pathMatch: 'full'
    },
    {
        path: 'Login',
        component: Login
    },

    {   path: '',
        component: MainLayout,
        children:[
              {   path: 'Facturacion', component: Facturacion },            
              {   path: 'Usuarios', component: Usuarios },   
              {   path: 'Cliente', component: Clientes },   
              {   path: 'UsuarioConsulta', component: UsuarioConsulta },   
              {   path:'ClientesConsulta', component: ClientesConsulta},
              {   path:'FacturacionConsulta', component: FacturacionConsulta},
              {   path:'Productos', component: Productos},
              {path: '', redirectTo: 'Usuarios', pathMatch: 'full'}
        ]
     },

     {path: '*', redirectTo: 'Login'}
   
];
