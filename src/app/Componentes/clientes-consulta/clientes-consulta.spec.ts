import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesConsulta } from './clientes-consulta';

describe('ClientesConsulta', () => {
  let component: ClientesConsulta;
  let fixture: ComponentFixture<ClientesConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesConsulta],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesConsulta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
