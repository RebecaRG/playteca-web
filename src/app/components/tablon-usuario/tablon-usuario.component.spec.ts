import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablonUsuarioComponent } from './tablon-usuario.component';

describe('TablonUsuarioComponent', () => {
  let component: TablonUsuarioComponent;
  let fixture: ComponentFixture<TablonUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablonUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablonUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
