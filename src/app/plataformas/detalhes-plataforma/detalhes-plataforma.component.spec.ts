import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPlataformaComponent } from './detalhes-plataforma.component';

describe('DetalhesPlataformaComponent', () => {
  let component: DetalhesPlataformaComponent;
  let fixture: ComponentFixture<DetalhesPlataformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesPlataformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesPlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
