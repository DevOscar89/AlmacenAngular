import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionConsulta } from './facturacion-consulta';

describe('FacturacionConsulta', () => {
  let component: FacturacionConsulta;
  let fixture: ComponentFixture<FacturacionConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturacionConsulta],
    }).compileComponents();

    fixture = TestBed.createComponent(FacturacionConsulta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
