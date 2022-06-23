import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesStatusCompraComponent } from './detalhes-status-compra.component';

describe('DetalhesStatusCompraComponent', () => {
  let component: DetalhesStatusCompraComponent;
  let fixture: ComponentFixture<DetalhesStatusCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesStatusCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesStatusCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
