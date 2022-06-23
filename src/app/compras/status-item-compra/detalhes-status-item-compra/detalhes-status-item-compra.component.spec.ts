import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesStatusItemCompraComponent } from './detalhes-status-item-compra.component';

describe('DetalhesStatusItemCompraComponent', () => {
  let component: DetalhesStatusItemCompraComponent;
  let fixture: ComponentFixture<DetalhesStatusItemCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesStatusItemCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesStatusItemCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
