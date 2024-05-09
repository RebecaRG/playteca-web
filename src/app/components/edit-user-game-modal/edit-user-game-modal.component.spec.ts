import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserGameModalComponent } from './edit-user-game-modal.component';

describe('EditUserGameModalComponent', () => {
  let component: EditUserGameModalComponent;
  let fixture: ComponentFixture<EditUserGameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserGameModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
