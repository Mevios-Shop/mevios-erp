import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlataformasComponent } from './listar-plataformas.component';

describe('ListarPlataformasComponent', () => {
  let component: ListarPlataformasComponent;
  let fixture: ComponentFixture<ListarPlataformasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPlataformasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPlataformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
