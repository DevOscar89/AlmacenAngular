import { Routes } from '@angular/router';
import {Facturacion} from './Componentes/facturacion/facturacion';
import {Menu} from './Componentes/menu/menu';
import {Usuarios} from './Componentes/usuarios/usuarios';
import {Clientes} from './Componentes/clientes/clientes';
import { Login } from './Componentes/Login/login/login';
import { UsuarioConsulta } from './Componentes/usuario-consulta/usuario-consulta';
import { ClientesConsulta } from './Componentes/clientes-consulta/clientes-consulta';
import { FacturacionConsulta } from './Componentes/facturacion-consulta/facturacion-consulta';
import { Productos } from './Componentes/productos/productos';

export const routes: Routes = [
    {   path: '', component: Login },
    {   path: 'Menu', component:Menu },
    {   path: 'Facturacion', component: Facturacion },   
    {   path: 'Login', component: Login },   
    {   path: 'Usuarios', component: Usuarios },   
    {   path: 'Cliente', component: Clientes },   
    {   path: 'UsuarioConsulta', component: UsuarioConsulta },   
    {   path:'ClientesConsulta', component: ClientesConsulta},
    {   path:'FacturacionConsulta', component: FacturacionConsulta},
    {   path:'Productos', component: Productos},
];
