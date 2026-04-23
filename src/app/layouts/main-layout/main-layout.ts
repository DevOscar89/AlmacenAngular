import { Component ,ViewChild} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [MatToolbarModule,
    MatButtonModule,
     MatSidenavModule, 
    MatListModule, 
    MatIconModule, 
    MatExpansionModule, // Requerido para el submenú
    RouterLink],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
   // @ViewChild busca en el HTML el elemento con la referencia #sidenav
  // y lo asigna a la propiedad 'sidenav' de esta clase.
  @ViewChild('sidenav') sidenav!: MatSidenav;
}
