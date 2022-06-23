import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesItemCompraComponent } from './detalhes-item-compra.component';

describe('DetalhesItemCompraComponent', () => {
  let component: DetalhesItemCompraComponent;
  let fixture: ComponentFixture<DetalhesItemCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesItemCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesItemCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
