import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioConsulta } from './usuario-consulta';

describe('UsuarioConsulta', () => {
  let component: UsuarioConsulta;
  let fixture: ComponentFixture<UsuarioConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioConsulta],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioConsulta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
